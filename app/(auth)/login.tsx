import { login } from '@/api/auth'
import Button from '@/components/button'
import Input from '@/components/input'
import Text from '@/components/text'
import colors from '@/constants/colorst'
import fonts from '@/constants/fonts'
import { HORIZONTAL_PADDING } from '@/constants/sizes'
import useFormFields from '@/hooks/use-form-fields'
import { useUserStore } from '@/store/user.store'
import { handleAPIError } from '@/utils/error-handler'
import { storage } from '@/utils/storage'
import { showToast } from '@/utils/toast'
import { Ionicons } from '@expo/vector-icons'
import { Link, useRouter } from 'expo-router'
import { observer } from 'mobx-react-lite'
import React, { useState } from 'react'
import { Image, ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

const Login = observer(() => {
  const router = useRouter();
  const { setUser } = useUserStore();

  const { fields, errors, onChange } = useFormFields({
    email: "",
    password: ""
  })

  const [loading, setLoading] = useState(false);

  const handleGoBack = () => {
    router.back();
  }

  const handleLogin = async () => {
    if (loading) return;
    setLoading(true);
    try {
      const res = await login(fields);
      console.log(res.data.data);
      setUser(res.data.data?.user);
      storage.set("token", res.data.data?.token)
      showToast("success", "Login successful")
      router.replace("/")
    } catch (error: any) {
      handleAPIError(error);
    } finally {
      setLoading(false);
    }
  }

  const handleGoToRegister = () => {
    router.replace("/register")
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
      >
        <TouchableOpacity onPress={handleGoBack} style={styles.backIcon}>
          <Ionicons name="arrow-back-outline" size={24} color="black" />
        </TouchableOpacity>
        <Image
          source={require('@/assets/images/icon.png')}
          style={styles.logo}
        />
        <Text style={styles.header}>Welcome Back</Text>
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
          <Input
            value={fields.password}
            onChangeText={(text: string) => {
              onChange("password", text)
            }}
            label={"Password"}
            placeholder="Minimum 8 characters"
            error={errors.password}
            inputMode='text'
            accessibilityHint='Enter your password'
            textContentType='password'
            isPassword
            showLabel
          />
          <Link href={"/forgot-password"} style={styles.link}>
            <Text style={styles.linkText}>Forgot Password?</Text>
          </Link>
        </View>
        <View>
          <Button
            title='Login'
            loading={loading}
            onPress={handleLogin}
          />
          <Text style={styles.info}>Don't have an account? <Text style={styles.linkText} onPress={handleGoToRegister}>Register</Text></Text>
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
  logo: {
    height: 100,
    width: 100,
    alignSelf: "center"
  },
  formContainer: {
    paddingVertical: 20,
    rowGap: 20
  },
  header: {
    fontFamily: fonts.manrope.semiBold,
    fontSize: 24,
    textAlign: "center"
  },
  link: {
    flexDirection: "row",
    justifyContent: "flex-end"
  },
  linkText: {
    fontFamily: fonts.manrope.medium,
    color: colors.primary,
    textAlign: "right"
  },
  backIcon: {
    height: 40,
    width: 40,
    justifyContent: "center",
    marginTop: 10
  },
  info: {
    textAlign: "center",
    fontFamily: fonts.manrope.regular,
    marginTop: 8
  }
})

export default Login
