import React from 'react';
import {
    TouchableOpacity,
    Text,
    GestureResponderEvent,
    ViewStyle,
    TextStyle,
    ActivityIndicator,
    View,
} from 'react-native';
import styles from './style';
import BarIndicator from '../bar-indicator';

type ButtonProps = {
    title: string;
    onPress: (event: GestureResponderEvent) => void;
    disabled?: boolean;
    loading?: boolean;
    accessibilityHint?: string;
    buttonStyle?: ViewStyle;
    textStyle?: TextStyle;
    iconLeft?: React.ReactNode;
    iconRight?: React.ReactNode;
};

const Button: React.FC<ButtonProps> = ({
    title,
    onPress,
    disabled = false,
    loading = false,
    accessibilityHint,
    buttonStyle,
    textStyle,
    iconLeft,
    iconRight,
}) => {
    return (
        <TouchableOpacity
            accessible={true}
            accessibilityRole="button"
            accessibilityLabel={title}
            accessibilityHint={accessibilityHint}
            accessibilityState={{ disabled, busy: loading }}
            onPress={onPress}
            disabled={disabled || loading}
            style={[
                styles.button,
                (disabled || loading) ? styles.disabledButton : null,
                buttonStyle,
            ]}
        >
            {loading ? (
                <BarIndicator color='white'size={20} />
            ) : (
                <View style={styles.content}>
                    {iconLeft && <View style={styles.icon}>{iconLeft}</View>}
                    <Text style={[styles.buttonText, textStyle]}>{title}</Text>
                    {iconRight && <View style={styles.icon}>{iconRight}</View>}
                </View>
            )}
        </TouchableOpacity>
    );
};

export default Button;
