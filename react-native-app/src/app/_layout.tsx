import { Stack } from 'expo-router';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';

import { HandyHubColors } from '@/constants/theme';
import { HandyHubProvider, useHandyHub } from '@/state/HandyHubContext';

export default function RootLayout() {
  return (
    <HandyHubProvider>
      <AppRoutes />
    </HandyHubProvider>
  );
}

function AppRoutes() {
  const { isDatabaseReady } = useHandyHub();

  if (!isDatabaseReady) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={HandyHubColors.primary} />
        <Text style={styles.loadingText}>Loading HandyHub...</Text>
      </View>
    );
  }

  return (
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
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: HandyHubColors.background,
    paddingHorizontal: 24,
  },
  loadingText: {
    marginTop: 12,
    fontSize: 15,
    color: HandyHubColors.text,
  },
});
