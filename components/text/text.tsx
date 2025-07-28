import React from 'react';
import { Text as RNText, TextStyle, TextProps as RNTextProps, StyleProp } from 'react-native';
import styles from './style';

type CustomTextProps = RNTextProps & {
  style?: StyleProp<TextStyle>;
  accessibilityRole?: 'text' | 'header';
  accessibilityHint?: string;
  accessibilityLabel?: string;
  children?: any;
};

const Text: React.FC<CustomTextProps> = ({
  children,
  style,
  accessibilityRole = 'text',
  accessibilityHint,
  accessibilityLabel,
  ...rest
}) => {
  return (
    <RNText
      accessible={true}
      accessibilityRole={accessibilityRole}
      accessibilityLabel={accessibilityLabel ?? "text"}
      accessibilityHint={accessibilityHint}
      style={[styles.text, style]}
      allowFontScaling={false}
      {...rest}
    >
      {children}
    </RNText>
  );
};

export default Text;
