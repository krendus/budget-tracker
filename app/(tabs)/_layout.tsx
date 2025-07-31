import { HapticTab } from '@/components/haptic-tab';
import fonts from '@/constants/fonts';
import { useColorScheme } from '@/hooks/useColorScheme';
import { FontAwesome5, MaterialIcons, Octicons } from '@expo/vector-icons';
import { Tabs } from 'expo-router';
import React from 'react';

// Tab Button
const tabBarButton = (props: any) => (
  <HapticTab
      {...props}
      android_ripple={{ color: 'transparent' }}
  />
);

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: "#02a0de",
        headerShown: false,
        tabBarButton,
        tabBarLabelStyle: {
          fontFamily: fonts.manrope.medium
        },
        tabBarStyle: {
          backgroundColor: "#fff"
        },
      }}>
      <Tabs.Screen
        name="dashboard"
        options={{
          title: 'Dashboard',
          tabBarIcon: ({ color }) => <FontAwesome5 name="chart-pie" size={22} color={color} />,
        }}
      />

      <Tabs.Screen
        name="transactions"
        options={{
          title: 'Transactions',
          tabBarIcon: ({ color }) => <Octicons name="history" size={22} color={color} />
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: 'Settings',
          tabBarIcon: ({ color }) => <MaterialIcons name="settings" size={24} color={color} />,
        }}
      />
    </Tabs>
  );
}
