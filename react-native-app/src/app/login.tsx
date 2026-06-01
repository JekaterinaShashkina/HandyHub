import { Stack, useRouter } from 'expo-router';
import { useState } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
} from 'react-native';

import { HandyHubColors } from '@/constants/theme';
import { LoginForm } from '@/components/login/LoginForm';
import { useHandyHub } from '@/state/AppContext';

export default function LoginScreen() {
  const router = useRouter();
  const { login } = useHandyHub();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [error, setError] = useState('');

  function handleLogin() {
    if (!email.trim() || !password.trim()) {
      setError('Please fill in all fields.');
      return;
    }

    const success = login(email, password);

    if (!success) {
      setError('Invalid email or password.');
      return;
    }

    setError('');
    router.replace('/' as never);
  }

  return (
    <KeyboardAvoidingView
      style={styles.safeArea}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <Stack.Screen options={{ headerShown: false }} />

      <ScrollView
        contentContainerStyle={styles.content}
        keyboardShouldPersistTaps="handled"
        keyboardDismissMode="interactive"
      >
        <LoginForm
          email={email}
          password={password}
          passwordVisible={passwordVisible}
          error={error}
          onBack={() => router.back()}
          onEmailChange={(value) => {
            setEmail(value);
            setError('');
          }}
          onPasswordChange={(value) => {
            setPassword(value);
            setError('');
          }}
          onTogglePasswordVisible={() =>
            setPasswordVisible((value) => !value)
          }
          onSubmit={handleLogin}
          onRegisterPress={() => router.push('/register' as never)}
        />
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: HandyHubColors.background,
    paddingTop: 40,
  },
  content: {
    paddingHorizontal: 13,
    paddingBottom: 32,
  },
});
