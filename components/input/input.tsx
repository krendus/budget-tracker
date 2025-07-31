import colors from '@/constants/colors';
import { Feather } from '@expo/vector-icons';
import React, { useState } from 'react';
import {
    TextInput,
    TextInputProps,
    TouchableOpacity,
    View,
} from 'react-native';
import Text from '../text';
import styles from './style';

type InputProps = {
    value: string;
    onChangeText: (text: string) => void;
    label: string;
    error?: string;
    isPassword?: boolean;
    accessibilityHint?: string;
    showLabel?: boolean;
} & TextInputProps;

const Input: React.FC<InputProps> = ({
    label,
    value,
    onChangeText,
    error,
    accessibilityHint,
    showLabel = true,
    isPassword,
    ...rest
}) => {
    const [borderWidth, setBorderWidth] = useState(1);
    const [hidePassword, setHidePassword] = useState(isPassword);

    const togglePasswordVisibility = () => {
        setHidePassword((hidePassword) => !hidePassword)
    }

    return (
        <View
            accessible={true}
            accessibilityLabel={`${label} input container`}
            accessibilityHint={`Input field for ${label}`}
            accessibilityRole="text"
            style={styles.inputWrapper}
        >
            {showLabel ? <Text style={styles.label}>{label}</Text> : null}
            <View style={styles.inputContainer}>
                <TextInput
                    style={[
                        styles.input,
                        error ? styles.inputError : null,
                        {
                            borderWidth: 2,
                            borderColor: borderWidth === 1 ? colors.inputBackground : "#222"
                        }
                    ]}
                    value={value}
                    onChangeText={onChangeText}
                    accessible={true}
                    accessibilityLabel={label}
                    accessibilityHint={accessibilityHint}
                    accessibilityRole="text"
                    autoCapitalize='none'
                    placeholderTextColor={colors.greyOne}
                    secureTextEntry={hidePassword}
                    allowFontScaling={false}
                    onFocus={() => {
                        setBorderWidth(2)
                    }}
                    onBlur={() => {
                        setBorderWidth(1)
                    }}
                    cursorColor={"#000"}
                    selectionColor={colors.primary}
                    {...rest}
                />
                {isPassword ? <TouchableOpacity style={styles.eyeButton} onPress={togglePasswordVisibility}>
                    <Feather name={hidePassword ? "eye" : "eye-off"} size={20} color={colors.greyOne} />
                </TouchableOpacity> : null}
            </View>

            {error ? (
                <Text
                    style={styles.errorText}
                    accessible={true}
                    accessibilityLabel={`Error: ${error}`}
                >
                    {error}
                </Text>
            ) : null}
        </View>
    );
};

export default Input;
