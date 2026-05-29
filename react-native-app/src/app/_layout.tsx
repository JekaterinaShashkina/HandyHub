import { Stack } from 'expo-router';

import { HandyHubProvider } from '@/state/HandyHubContext';

export default function RootLayout() {
  return (
    <HandyHubProvider>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="index" />
        <Stack.Screen name="login" />
        <Stack.Screen name="register" />
        <Stack.Screen name="profile" />
        <Stack.Screen name="edit-profile" />
        <Stack.Screen name="add-master" />
        <Stack.Screen name="edit-master-profile" />
        <Stack.Screen name="master/[id]" />
        
      </Stack>
    </HandyHubProvider>
  );
}