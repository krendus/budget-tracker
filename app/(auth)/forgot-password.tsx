import { forgotPassword } from '@/api/auth'
import Button from '@/components/button'
import Input from '@/components/input'
import Text from '@/components/text'
import colors from '@/constants/colors'
import fonts from '@/constants/fonts'
import { HORIZONTAL_PADDING } from '@/constants/sizes'
import useFormFields from '@/hooks/use-form-fields'
import { showToast } from '@/utils/toast'
import { Ionicons } from '@expo/vector-icons'
import { router } from 'expo-router'
import React, { useState } from 'react'
import { ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

const ForgotPassword = () => {
  const [loading, setLoading] = useState(false)
  const { fields, errors, onChange } = useFormFields({
    email: ""
  })

  const handleGoBack = () => {
    router.back();
  }

  const handleResetPassword = async () => {
    if (loading) return;
    setLoading(true);
    try {
      await forgotPassword({
        email: fields.email
      })
      showToast("success", "OTP sent")
      router.navigate(`/verify-otp?from=reset-password&email=${fields.email}`)
    } catch (error: any) {

    } finally {
      setLoading(false);
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <TouchableOpacity onPress={handleGoBack} style={styles.backIcon}>
          <Ionicons name="arrow-back-outline" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.header}>Forgot Password</Text>
        <Text style={styles.description}>Enter your email and we will send you an OTP to reset your password</Text>
        <View style={styles.formContainer}>
          <Input
            value={fields.email}
            onChangeText={(text: string) => {
              onChange("email", text)
            }}
            label={"Email"}
            placeholder="Enter email address"
            error={errors.email}
            inputMode='email'
            textContentType='emailAddress'
            accessibilityHint='Enter your email address'
            showLabel
          />
          <Button
            title='Send OTP'
            onPress={handleResetPassword}
            loading={loading}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

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
})

export default ForgotPassword
