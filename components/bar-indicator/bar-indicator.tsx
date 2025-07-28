import React, { PureComponent } from 'react';
import { View, Animated, StyleProp, ViewStyle } from 'react-native';

import Indicator from './indicator'; // Assuming indicator.tsx exports a properly typed component
import styles from './styles';

interface BarIndicatorProps {
  count?: number;
  color?: string;
  size?: number;
  animationDuration?: number;
  style?: StyleProp<ViewStyle>;
  [key: string]: any; // allow extra props to spread into <Indicator />
}

export default class BarIndicator extends PureComponent<BarIndicatorProps> {
  static defaultProps = {
    count: 3,
    color: 'rgb(0, 0, 0)',
    size: 40,
  };

  constructor(props: BarIndicatorProps) {
    super(props);

    this.renderComponent = this.renderComponent.bind(this);
  }

  outputRange(base: number, index: number, count: number, samples: number): number[] {
    let range = Array.from({ length: samples }, (_, idx) => (
      base * Math.abs(Math.cos(Math.PI * idx / (samples - 1)))
    ));

    for (let j = 0; j < index * (samples / count); j++) {
      range.unshift(range.pop()!); // non-null assertion since pop can return undefined
    }

    range.unshift(...range.slice(-1));

    return range;
  }

  renderComponent({ index, count, progress }: { index: number; count: number; progress: Animated.AnimatedInterpolation<any> }) {
    const { color: backgroundColor = 'black', size = 40, animationDuration = 1200 } = this.props;

    let frames = 60 * animationDuration / 1000;
    let samples = 0;

    do samples += count;
    while (samples < frames);

    const inputRange = Array.from({ length: samples + 1 }, (_, idx) => idx / samples);

    const width = Math.floor(size / 5);
    const height = Math.floor(size / 2);
    const radius = Math.ceil(width / 2);

    const containerStyle: ViewStyle = {
      height: size,
      width: width,
      marginHorizontal: radius,
    };

    const topStyle: ViewStyle = {
      width,
      height,
      backgroundColor,
      borderTopLeftRadius: radius,
      borderTopRightRadius: radius,
      transform: [{
        translateY: progress.interpolate({
          inputRange,
          outputRange: this.outputRange((height - radius) / 2, index, count, samples),
        }),
      }],
    };

    const bottomStyle: ViewStyle = {
      width,
      height,
      backgroundColor,
      borderBottomLeftRadius: radius,
      borderBottomRightRadius: radius,
      transform: [{
        translateY: progress.interpolate({
          inputRange,
          outputRange: this.outputRange(-(height - radius) / 2, index, count, samples),
        }),
      }],
    };

    return (
      <View style={containerStyle} key={index}>
        <Animated.View style={topStyle} />
        <Animated.View style={bottomStyle} />
      </View>
    );
  }

  render() {
    const { style, ...props } = this.props;

    return (
      <Indicator
        style={[styles.container, style]}
        renderComponent={this.renderComponent}
        {...props}
      />
    );
  }
}
