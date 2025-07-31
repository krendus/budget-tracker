import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';

import toastConfig from '@/config/toast';
import colors from '@/constants/colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import { Platform } from 'react-native';
import Toast from 'react-native-toast-message';

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    'Manrope-Regular': require('../assets/fonts/Manrope-Regular.ttf'),
    'Manrope-Medium': require('../assets/fonts/Manrope-Medium.ttf'),
    'Manrope-Bold': require('../assets/fonts/Manrope-Bold.ttf'),
    'Manrope-SemiBold': require('../assets/fonts/Manrope-SemiBold.ttf'),
  });

  if (!loaded) {
    // Async font loading only occurs in development.
    return null;
  }

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <Stack>
        <Stack.Screen name='(auth)' options={{ headerShown: false }}/>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="(dashboard)" options={{ headerShown: false }} />
        <Stack.Screen name="+not-found" />
      </Stack>
      <StatusBar backgroundColor={colors.primary} style={Platform.select({ ios: "dark", android: 'light' })} />
      <Toast
            config={toastConfig}
          />
    </ThemeProvider>
  );
}
