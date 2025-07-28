import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import { Animated, Easing, ViewProps } from 'react-native';

// Define a TypeScript interface for props
interface IndicatorProps extends ViewProps {
  animationEasing?: (value: number) => number;
  animationDuration?: number;
  hideAnimationDuration?: number;

  animating?: boolean;
  interaction?: boolean;
  hidesWhenStopped?: boolean;

  renderComponent?: (params: { index: number; count: number; progress: Animated.Value }) => React.ReactNode;
  count?: number;
}

interface IndicatorState {
  progress: Animated.Value;
  hideAnimation: Animated.Value;
}

export default class Indicator extends PureComponent<IndicatorProps, IndicatorState> {
  static defaultProps: Partial<IndicatorProps> = {
    animationEasing: Easing.linear,
    animationDuration: 1200,
    hideAnimationDuration: 200,

    animating: true,
    interaction: true,
    hidesWhenStopped: true,

    count: 1,
  };

  static propTypes = {
    animationEasing: PropTypes.func,
    animationDuration: PropTypes.number,
    hideAnimationDuration: PropTypes.number,

    animating: PropTypes.bool,
    interaction: PropTypes.bool,
    hidesWhenStopped: PropTypes.bool,

    renderComponent: PropTypes.func,
    count: PropTypes.number,
  };

  private animationState: number;
  private savedValue: number;

  constructor(props: IndicatorProps) {
    super(props);

    this.animationState = 0;
    this.savedValue = 0;

    const { animating } = this.props;

    this.state = {
      progress: new Animated.Value(0),
      hideAnimation: new Animated.Value(animating ? 1 : 0),
    };
  }

  componentDidMount() {
    const { animating } = this.props;

    if (animating) {
      this.startAnimation();
    }
  }

  componentDidUpdate(prevProps: IndicatorProps) {
    const { animating, hideAnimationDuration } = this.props;

    if (animating && !prevProps.animating) {
      this.resumeAnimation();
    }

    if (!animating && prevProps.animating) {
      this.stopAnimation();
    }

    if (animating !== prevProps.animating) {
      Animated.timing(this.state.hideAnimation, {
        toValue: animating ? 1 : 0,
        duration: hideAnimationDuration,
        useNativeDriver: true,
      }).start();
    }
  }

  startAnimation() {
    const { progress } = this.state;
    const { interaction, animationEasing, animationDuration } = this.props;

    if (this.animationState !== 0) {
      return;
    }

    const animation = Animated.timing(progress, {
      duration: animationDuration,
      easing: animationEasing,
      useNativeDriver: true,
      isInteraction: interaction,
      toValue: 1,
    });

    Animated.loop(animation).start();

    this.animationState = 1;
  }

  stopAnimation() {
    const { progress } = this.state;

    if (this.animationState !== 1) {
      return;
    }

    const listener = progress.addListener(({ value }) => {
      progress.removeListener(listener);
      progress.stopAnimation(() => this.saveAnimation(value));
    });

    this.animationState = -1;
  }

  saveAnimation(value: number) {
    const { animating } = this.props;

    this.savedValue = value;
    this.animationState = 0;

    if (animating) {
      this.resumeAnimation();
    }
  }

  resumeAnimation() {
    const { progress } = this.state;
    const { interaction, animationDuration } = this.props;

    if (this.animationState !== 0) {
      return;
    }

    Animated.timing(progress, {
      useNativeDriver: true,
      isInteraction: interaction,
      duration: (1 - this.savedValue) * (animationDuration ?? 1200),
      toValue: 1,
    }).start(({ finished }) => {
      if (finished) {
        progress.setValue(0);
        this.animationState = 0;
        this.startAnimation();
      }
    });

    this.savedValue = 0;
    this.animationState = 1;
  }

  renderComponent = (_: unknown, index: number) => {
    const { progress } = this.state;
    const { renderComponent, count = 1 } = this.props;

    if (typeof renderComponent === 'function') {
      return renderComponent({ index, count, progress });
    }

    return null;
  };

  render() {
    const { hideAnimation } = this.state;
    const { count = 1, hidesWhenStopped, style, ...restProps } = this.props;

    const containerStyle = hidesWhenStopped
      ? ([] as any[]).concat(style || [], { opacity: hideAnimation })
      : style;

    return (
      <Animated.View {...restProps} style={containerStyle}>
        {Array.from({ length: count }, this.renderComponent)}
      </Animated.View>
    );
  }
}
