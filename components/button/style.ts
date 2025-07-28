import colors from '@/constants/colorst';
import fonts from '@/constants/fonts';
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    button: {
        height: 45,
        backgroundColor: colors.primary,
        borderRadius: 8,
        alignItems: "center",
        flexDirection: "row",
        justifyContent: "center",
        columnGap: 8,
        flex: 1
    },
    disabledButton: {
    },
    buttonText: {
        textAlign: "center",
        fontFamily: fonts.manrope.semiBold,
        color: "#fff"
    },
    content: {
    },
    icon: {
    },
});

export default styles;
