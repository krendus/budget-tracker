import colors from '@/constants/colors';
import fonts from '@/constants/fonts';
import React, { useState } from 'react';
import {
    View
} from 'react-native';
import { Dropdown as DropdownElement } from 'react-native-element-dropdown';
import Text from '../text';
import styles from './style';

type DropdownProps = {
    value: string;
    onChangeText: (text: string) => void;
    label: string;
    items: {
        label: string,
        value: string
    }[],
    error?: string;
    showLabel?: boolean;
    placeholder: string,
    dropdownPosition?: "auto" | "top" | "bottom"
};

const Dropdown: React.FC<DropdownProps> = ({
    label,
    onChangeText,
    error,
    showLabel = true,
    placeholder,
    items,
    value,
    dropdownPosition
}) => {
    const [borderWidth, setBorderWidth] = useState(1);

    return (
        <View
            accessible={true}
            accessibilityLabel={`${label} input container`}
            accessibilityHint={`Input field for ${label}`}
            accessibilityRole="text"
            style={styles.dropdownWrapper}
        >
            {showLabel ? <Text style={styles.label}>{label}</Text> : null}
            <View style={styles.dropdownContainer}>
                <DropdownElement
                    data={items}
                    labelField={"label"}
                    valueField={"value"}
                    value={value}
                    style={[
                        styles.dropdown,
                        error ? styles.dropdownError : null,
                        {
                            borderWidth: 2,
                            borderColor: borderWidth === 1 ? colors.inputBackground : "#333"
                        }
                    ]}
                    selectedTextStyle={styles.selectedTextStyle}
                    placeholderStyle={styles.placeholderStyle}
                    containerStyle={styles.containerStyle}
                    itemTextStyle={styles.selectedTextStyle}
                    onChange={(item) => {
                        onChangeText(item.value)
                    }}
                    fontFamily={fonts.manrope.regular}
                    placeholder={placeholder}
                    onFocus={() => {
                        setBorderWidth(2)
                    }}
                    onBlur={() => {
                        setBorderWidth(1)
                    }}
                    keyboardAvoiding
                    dropdownPosition={dropdownPosition}
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

export default Dropdown;
