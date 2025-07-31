import Text from '@/components/text'
import colors from '@/constants/colors'
import fonts from '@/constants/fonts'
import { HORIZONTAL_PADDING } from '@/constants/sizes'
import { useUserStore } from '@/store/user.store'
import { storage } from '@/utils/storage'
import { AntDesign, SimpleLineIcons } from '@expo/vector-icons'
import { router } from 'expo-router'
import { observer } from 'mobx-react-lite'
import React from 'react'
import { Dimensions, Image, ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

const Settings = observer(() => {
  const insets = useSafeAreaInsets();
  const { user, setUser } = useUserStore();
  const { width } = Dimensions.get("screen");
  const handleLogout = () => {
    setUser(null);
    storage.delete("token")
    router.navigate("/");
  }
  return (
    <View style={[styles.container, {
      paddingTop: insets.top + 10
    }]}>
      <View style={styles.headerSection}>
        <View style={styles.profileWrapper}>
          <Image
            source={require("@/assets/images/dummy/profile.jpg")}
            style={styles.profile}
          />
          <View>
            <Text style={styles.name}>Uchenna</Text>
          </View>
        </View>
      </View>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 20 }}>
        <TouchableOpacity style={styles.button}>
          <SimpleLineIcons name="user" size={24} color={colors.darkOne} />
          <View>
            <Text style={styles.title}>Account</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={handleLogout}>
          <AntDesign name="logout" size={24} color={colors.darkOne} />
          <View>
            <Text style={styles.title}>Sign Out</Text>
          </View>
        </TouchableOpacity>
      </ScrollView>
    </View>
  )
})

export default Settings

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: 20
  },
  headerSection: {
    height: 70,
    flexDirection: "row",
    gap: 8,
    alignItems: "center",
    justifyContent: "space-between",
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
    paddingHorizontal: HORIZONTAL_PADDING
  },
  profile: {
    height: 55,
    width: 55,
    borderRadius: 60,
    borderWidth: 2,
    borderColor: colors.primary
  },
  profileWrapper: {
    flexDirection: "row",
    alignItems: "center",
    columnGap: 8
  },
  name: {
    fontFamily: fonts.manrope.bold,
    fontSize: 16
  },
  category: {
    fontFamily: fonts.manrope.medium,
    color: colors.greyOne,
    fontSize: 12
  },
  notificationBtn: {
    width: 40,
    height: 40,
    alignItems: "center",
    justifyContent: "center"
  },
  button: {
    flexDirection: "row",
    alignItems: "center",
    columnGap: 16,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd"
  },
  title: {
    fontFamily: fonts.manrope.semiBold,
    color: colors.darkOne
  },
  subtitle: {
    fontSize: 12,
    color: colors.greyOne
  },
  scrollView: {
    paddingHorizontal: HORIZONTAL_PADDING + 4,
  },
  btn: {
    paddingHorizontal: 16,
    paddingVertical: 6,
    backgroundColor: colors.primary,
    borderRadius: 20
  },
  btnTxt: {
    color: "#fff"
  },
  notAuthenticated: {
    flex: 1,
    alignItems: "center",
    paddingTop: Dimensions.get("screen").height / 10
  },
  promptText: {
    paddingTop: 10,
    fontSize: 18,
    textAlign: "center",
    width: Dimensions.get("screen").width / 2
  }
});
