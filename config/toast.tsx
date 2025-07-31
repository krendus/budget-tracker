import colors from "@/constants/colors";
import fonts from "@/constants/fonts";
import { Feather, Ionicons, MaterialIcons } from "@expo/vector-icons";
import { StyleSheet, View } from "react-native";
import { BaseToast, BaseToastProps, ErrorToast, InfoToast } from "react-native-toast-message";

const TOAST_HEIGHT = 50;

const toastConfig = {
    // Adjusting the success toast
    success: (props: BaseToastProps) => (
        <BaseToast
            {...props}
            style={[styles.toastContainer, { backgroundColor: colors.primary, }]}
            contentContainerStyle={{ paddingHorizontal: 15 }}
            text1Style={styles.textStyle}
            text1NumberOfLines={2}
            renderLeadingIcon={() => (<View style={styles.icon}>
                <Feather name="check" size={24} color="white" />
            </View>)}
        />
    ),
    error: (props: BaseToastProps) => (
        <ErrorToast
            {...props}
            style={[styles.toastContainer, { backgroundColor: "#ED4337", }]}
            contentContainerStyle={{ paddingHorizontal: 15 }}
            text1Style={styles.textStyle}
            text1NumberOfLines={2}
            renderLeadingIcon={() => (<View style={styles.icon}>
                <Ionicons name="close" size={24} color="white" />
            </View>)}
        />
    ),
    info: (props: BaseToastProps) => (
        <InfoToast
            {...props}
            style={[styles.toastContainer, { backgroundColor: "#fff", }]}
            contentContainerStyle={{ paddingHorizontal: 15 }}
            text1Style={[styles.textStyle, {color: "#000"}]}
            text1NumberOfLines={2}
            renderLeadingIcon={() => (<View style={styles.icon}>
                <MaterialIcons name="info-outline" size={24} color="black" />
            </View>)}
        />
    )
}

const styles = StyleSheet.create({
    icon: {
        height: TOAST_HEIGHT,
        width: 40,
        alignItems: "flex-end",
        justifyContent: "center"
    },
    toastContainer: {
        marginTop: 20,
        borderRadius: 9999,
        minWidth: "60%",
        minHeight: TOAST_HEIGHT,
        height: TOAST_HEIGHT,
        borderLeftWidth: 0
    },
    textStyle: {
        fontSize: 14,
        color: "#fff",
        fontFamily: fonts.manrope.regular,
    }
})

export default toastConfig;
