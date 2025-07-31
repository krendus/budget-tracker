import Button from '@/components/button'
import Input from '@/components/input'
import Text from '@/components/text'
import colors from '@/constants/colors'
import fonts from '@/constants/fonts'
import { HORIZONTAL_PADDING } from '@/constants/sizes'
import useFormFields from '@/hooks/use-form-fields'
import { useUserStore } from '@/store/user.store'
import { handleAPIError } from '@/utils/error-handler'
import { showToast } from '@/utils/toast'
import { Ionicons } from '@expo/vector-icons'
import { useRouter } from 'expo-router'
import { observer } from 'mobx-react-lite'
import React, { useState } from 'react'
import { Image, ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

const Register = observer(() => {
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
      // Use this when you want to integrate the API
      // const res = await register(fields);
      // console.log(res.data.data);
      // setUser(res.data.data?.user);
      // storage.set("token", res.data.data?.token)
      // remove this when you want to integrate the API. I am just using it for simulation
      await new Promise((resolve) => {
        setTimeout(resolve, 2000)
      })
      showToast("success", "Registration Successful")
      router.replace("/")
    } catch (error: any) {
      handleAPIError(error);
    } finally {
      setLoading(false);
    }
  }

  const handleGoToLogin = () => {
    router.replace("/login")
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
        <Text style={styles.header}>Budget Tracker Register</Text>
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
        </View>
        <View>
          <Button
            title='Register'
            loading={loading}
            onPress={handleLogin}
            buttonStyle={{
              marginTop: 20
            }}
          />
          <Text style={styles.info}>Already have an account? <Text style={styles.linkText} onPress={handleGoToLogin}>Login</Text></Text>
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

export default Register
