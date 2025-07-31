import colors from '@/constants/colors';
import React, { useState } from 'react';
import {
    TouchableOpacity,
    View
} from 'react-native';
import RNDatePicker from 'react-native-date-picker';
import Text from '../text';
import styles from './style';

type DatePickerProps = {
    value: Date;
    onChangeText: (date: Date) => void;
    label: string;
    error?: string;
    accessibilityHint?: string;
    showLabel?: boolean;
};

const DatePicker: React.FC<DatePickerProps> = ({
    label,
    value,
    onChangeText,
    error,
    accessibilityHint,
    showLabel = true,
}) => {
    const [open, setOpen] = useState(false);
    const [borderWidth, setBorderWidth] = useState(1);

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
                <TouchableOpacity
                    style={[
                        styles.input,
                        error ? styles.inputError : null,
                        {
                            borderWidth: 2,
                            borderColor: borderWidth === 1 ? colors.inputBackground : "#222"
                        }
                    ]}
                    accessible={true}
                    accessibilityLabel={label}
                    accessibilityHint={accessibilityHint}
                    onFocus={() => {
                        setBorderWidth(2)
                    }}
                    onBlur={() => {
                        setBorderWidth(1)
                    }}
                    onPress={() => setOpen(true)}
                >
                    <Text style={styles.inputText}>{value.getDate()}/{value.getMonth()}/{value.getFullYear()}</Text>
                </TouchableOpacity>
                <RNDatePicker
                    mode='date'
                    modal
                    date={value}
                    open={open}
                    accessibilityHint={accessibilityHint}
                    onConfirm={(date) => {
                        setOpen(false);
                        onChangeText(date)
                    }}
                    onCancel={() => {
                        setOpen(false);
                    }}
                />
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

export default DatePicker;
