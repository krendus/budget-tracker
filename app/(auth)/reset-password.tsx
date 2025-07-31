import { resetPassword } from '@/api/auth'
import Button from '@/components/button'
import Input from '@/components/input'
import Text from '@/components/text'
import colors from '@/constants/colors'
import fonts from '@/constants/fonts'
import { HORIZONTAL_PADDING } from '@/constants/sizes'
import useFormFields from '@/hooks/use-form-fields'
import { handleAPIError } from '@/utils/error-handler'
import { showToast } from '@/utils/toast'
import { Ionicons } from '@expo/vector-icons'
import { router, useLocalSearchParams } from 'expo-router'
import React, { useState } from 'react'
import { ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

const ResetPassword = () => {
  const [loading, setLoading] = useState(false)
  const { fields, errors, onChange } = useFormFields({
    password: "",
    confirmPassword: ""
  })

  const { otp, email } = useLocalSearchParams<{
    otp: string,
    email: string
  }>()

  const handleGoBack = () => {
    router.back();
  }

  const handleResetPassword = async () => {
    if (loading) return;
    setLoading(true);
    try {
      await resetPassword({
        email: email.trim().replace(" ", "+"),
        code: otp,
        password: fields.password,
        password_confirmation: fields.confirmPassword
      })
      showToast("success", "Password reset successfully")
      router.dismissTo("/login")
    } catch (error: any) {
      handleAPIError(error)
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
        <Text style={styles.header}>Reset Password</Text>
        <Text style={styles.description}>Enter your new password</Text>
        <View style={styles.formContainer}>
          <Input
            value={fields.password}
            onChangeText={(text: string) => {
              onChange("password", text)
            }}
            label={"New password"}
            placeholder="Enter new password"
            error={errors.password}
            inputMode='text'
            textContentType='newPassword'
            accessibilityHint='Enter your new password'
            isPassword
            showLabel
          />
          <Input
            value={fields.confirmPassword}
            onChangeText={(text: string) => {
              onChange("confirmPassword", text)
            }}
            label={"Confirm new password"}
            placeholder="Confirm new password"
            error={errors.password}
            inputMode='text'
            textContentType='newPassword'
            accessibilityHint='Confirm new password'
            isPassword
            showLabel
          />
          <Button
            title='Reset Password'
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

export default ResetPassword
