import { Redirect } from 'expo-router';

export default function Index() {
  return <Redirect href="/(auth)/login" />; // Replace with your desired screen path
}