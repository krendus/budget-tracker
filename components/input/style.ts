import colors from '@/constants/colors';
import fonts from '@/constants/fonts';
import { HORIZONTAL_PADDING } from '@/constants/sizes';
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    input: {
        height: "100%",
        borderRadius: 8,
        paddingHorizontal: HORIZONTAL_PADDING,
        fontFamily: fonts.manrope.regular,
        backgroundColor: colors.inputBackground
    },
    inputError: {
    },
    errorText: {
        color: "red",
        marginTop: 4
    },
    label: {
        fontFamily: fonts.manrope.medium,
        fontSize: 14,
        marginBottom: 8,
        color: colors.greyOne
    },
    inputWrapper: {
    },
    inputContainer: {
        height: 45,
        position: "relative"
    },
    eyeButton: {
        position: "absolute",
        top: 2,
        right: 2,
        height: 41,
        width: 41,
        alignItems: "center",
        justifyContent: "center"
    }
});

export default styles;
