import Toast, { ToastType } from "react-native-toast-message";

export const showToast = (type: ToastType, message: string) => {
    Toast.show({
        type,
        text1: message,
        visibilityTime: 1500
    })
}