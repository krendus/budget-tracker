import { resendEmailVerification, verifyEmail } from '@/api/auth'
import Button from '@/components/button'
import colors from '@/constants/colorst'
import fonts from '@/constants/fonts'
import { HORIZONTAL_PADDING } from '@/constants/sizes'
import { useUserStore } from '@/store/user.store'
import { handleAPIError } from '@/utils/error-handler'
import { storage } from '@/utils/storage'
import { showToast } from '@/utils/toast'
import { Ionicons } from '@expo/vector-icons'
import { router, useFocusEffect, useLocalSearchParams } from 'expo-router'
import { observer } from 'mobx-react-lite'
import React, { useCallback, useRef, useState } from 'react'
import { Keyboard, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

const VerifyOTP = observer(({ }) => {
  const [loading, setLoading] = useState(false);
  const [otp, setOtp] = useState('');
  const i1Ref: any = useRef(null);
  const i2Ref: any = useRef(null);
  const i3Ref: any = useRef(null);
  const i4Ref: any = useRef(null);
  const [seconds, setSeconds] = useState(10);
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  const [borderColor, setBorderColor] = useState(colors.primary);
  const [resending, setResending] = useState(false);
  const { setUser } = useUserStore();

  let timer: any;
  const startCountDown = () => {
    setSeconds(10);
    if (timer) {
      clearInterval(timer);
    }
    timer = setInterval(() => {
      setSeconds(prevSeconds => {
        if (prevSeconds === 0) {
          clearInterval(timer);
          return 0;
        }
        return prevSeconds - 1;
      });
    }, 1000);
    return timer;
  };

  const { from, email } = useLocalSearchParams<{
    from: string,
    email: string
  }>()

  const handleGoBack = () => {
    router.back();
  }

  const handleVerifyOTP = async () => {
    if (loading) return;
    setLoading(true);
    console.log("wahala", email)
    try {
      const res = await verifyEmail({
        email: email.trim().replace(" ", "+"),
        code: otp
      })
      showToast("success", "Verification successful")
      if (from === "reset-password") {
        router.replace(`/reset-password?otp=${otp}&email=${email.trim().replace(" ", "+")}`);
      } else {
        setUser(res.data.data?.user);
        storage.set("token", res.data.data?.token)
        router.navigate("/");
      }
    } catch (error: any) {
      console.log(error)
      handleAPIError(error)
    } finally {
      setLoading(false);
    }
  }

  const handleFocus = (len?: number) => {
    if (!i1Ref.current || !i2Ref.current || !i3Ref.current || !i4Ref.current) { return; }
    const length = len !== undefined ? len : otp.length;
    switch (length) {
      case 0:
        i1Ref.current?.focus();
        return;
      case 1:
        i2Ref.current?.focus();
        return;
      case 2:
        i3Ref.current?.focus();
        return;
      case 3:
        i4Ref.current?.focus();
        return;
      case 4:
        i4Ref.current?.focus();
        return;
    }
  };

  const handleKeyPress = (key: string, i: number) => {
    if (key === 'Backspace') {
      setOtp((prev: string) => {
        let newOtp = prev.split('');
        if (prev.length === i) {
          handleFocus(prev.length - 1);
        } else {
          newOtp[i] = '';
          handleFocus(prev.length - 2);
        }
        return newOtp.filter((n) => n !== undefined).join('');
      });
    }
  };

  const handleOTPChange = (val: string, i: number) => {
    if (!val.match(/\d+/)) { return; }
    setOtp((prev: string) => {
      let newOtp = prev;
      newOtp += (i === prev.length - 1) ? val.slice(1,) : val;
      handleFocus(newOtp.length);
      if (newOtp.length === 4) {
        if (Keyboard.isVisible()) {
          Keyboard.dismiss();
        }
      }
      return newOtp.slice(0, 4);
    });
  };

  const handleResend = async () => {
    if(resending) return;
    setResending(true);
    try {
      const res = await resendEmailVerification({
        email
      })
      showToast("success", "OTP sent successfully")
      startCountDown();
    } catch (error) {
      console.log(error)
      handleAPIError(error)
    } finally {
      setResending(false)
    }
  }

  useFocusEffect(useCallback(() => {
    const timer = startCountDown();

    return () => clearInterval(timer);
  }, [])
  )

  const resetPasswordHeader = "Enter the OTP sent to your email for password reset";
  const registerHeader = "Enter the OTP sent to your email to verify your account";

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <TouchableOpacity onPress={handleGoBack} style={styles.backIcon}>
          <Ionicons name="arrow-back-outline" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.header}>Verify OTP</Text>
        <Text style={styles.description}>{from === "reset-password" ? resetPasswordHeader : registerHeader}</Text>
        <View style={styles.formContainer}>
          <View style={[styles.inputWrapper, { marginBottom: 24 }]}>
            <TextInput
              keyboardType="decimal-pad"
              cursorColor={'#000'}
              selectionColor={"#000"}
              value={otp[0] ?? ''}
              ref={i1Ref}
              onChangeText={(val) => handleOTPChange(val, 0)}
              style={[styles.otp, [{ borderColor: otp.length == 4 ? borderColor : colors.inputBackground }]]}
              onKeyPress={(e) => handleKeyPress(e.nativeEvent.key, 0)}
            />
            <TextInput
              keyboardType="decimal-pad"
              cursorColor={'#000'}
              selectionColor={"#000"}
              value={otp[1] ?? ''}
              ref={i2Ref}
              onChangeText={(val) => handleOTPChange(val, 1)}
              style={[styles.otp, [{ borderColor: otp.length == 4 ? borderColor : colors.inputBackground }]]}
              onKeyPress={(e) => handleKeyPress(e.nativeEvent.key, 1)}
            />
            <TextInput
              keyboardType="decimal-pad"
              cursorColor={'#000'}
              selectionColor={"#000"}
              value={otp[2] ?? ''}
              ref={i3Ref}
              onChangeText={(val) => handleOTPChange(val, 2)}
              style={[styles.otp, [{ borderColor: otp.length == 4 ? borderColor : colors.inputBackground }]]}
              onKeyPress={(e) => handleKeyPress(e.nativeEvent.key, 2)}
            />
            <TextInput
              keyboardType="decimal-pad"
              cursorColor={'#000'}
              selectionColor={"#000"}
              value={otp[3] ?? ''}
              ref={i4Ref}
              onChangeText={(val) => handleOTPChange(val, 3)}
              style={[styles.otp, [{ borderColor: otp.length == 4 ? borderColor : colors.inputBackground }]]}
              onKeyPress={(e) => handleKeyPress(e.nativeEvent.key, 3)}
            />
          </View>
          <View style={styles.countdown}>
            <Text style={styles.countdownText}>
              {seconds == 0 && <Text onPress={handleResend} style={styles.linkText}>{resending ? "Resending OTP..." : "Click here to resend OTP"}</Text>}{" "}
              {(seconds > 0) && `(${minutes < 10 ? '0' + minutes : minutes}:${remainingSeconds < 10 ? '0' + remainingSeconds : remainingSeconds})`}
            </Text>
          </View>
          <Button
            title='Verify OTP'
            onPress={handleVerifyOTP}
            loading={loading}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  )
})

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff"
  },
  scrollView: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: HORIZONTAL_PADDING
  },
  backIcon: {
    height: 40,
    width: 40,
    justifyContent: "center",
    marginTop: 10
  },
  header: {
    fontFamily: fonts.manrope.semiBold,
    fontSize: 24,
  },
  description: {
    fontSize: 14,
    fontFamily: fonts.manrope.medium,
    color: colors.greyOne
  },
  formContainer: {
    paddingVertical: 20,
    rowGap: 20
  },
  inputWrapper: {
    flexDirection: 'row',
    justifyContent: 'center',
    columnGap: 6,
    marginVertical: 19,
  },
  otp: {
    borderRadius: 8,
    height: 74,
    width: 80,
    fontSize: 18,
    fontFamily: fonts.manrope.regular,
    textAlign: 'center',
    borderWidth: 1.5,
    backgroundColor: colors.inputBackground
  },
  countdown: {

  },
  countdownText: {
    textAlign: "center",
    fontFamily: fonts.manrope.medium
  },
  linkText: {
    color: colors.primary
  },
})

export default VerifyOTP
