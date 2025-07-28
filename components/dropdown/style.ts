import colors from '@/constants/colorst';
import fonts from '@/constants/fonts';
import { HORIZONTAL_PADDING } from '@/constants/sizes';
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    dropdown: {
        height: "100%",
        borderRadius: 8,
        paddingHorizontal: HORIZONTAL_PADDING,
        fontFamily: fonts.manrope.regular,
        backgroundColor: colors.inputBackground
    },
    containerStyle: {
        borderRadius: 8,
        fontFamily: fonts.manrope.regular
    },
    dropdownError: {
    },
    errorText: {
    },
    label: {
        fontFamily: fonts.manrope.medium,
        fontSize: 14,
        marginBottom: 8,
        color: colors.greyOne
    },
    dropdownWrapper: {
    },
    dropdownContainer: {
        height: 45,
        position: "relative"
    },
    selectedTextStyle: {
        fontFamily: fonts.manrope.regular,
        fontSize: 14
    },
    placeholderStyle: {
        fontFamily: fonts.manrope.regular,
        fontSize: 14,
        color: colors.greyOne
    }
});

export default styles;
