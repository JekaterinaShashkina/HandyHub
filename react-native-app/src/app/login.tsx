import { Feather } from '@expo/vector-icons';
import { Stack, useRouter } from 'expo-router';
import { useState } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';

import { useHandyHub } from '@/state/HandyHubContext';

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
        <Pressable style={styles.backIconButton} onPress={() => router.back()}>
          <Feather name="arrow-left" size={24} color="#111111" />
        </Pressable>

        <Text style={styles.title}>Sign in</Text>

        <Text style={styles.label}>E-mail</Text>
        <TextInput
          value={email}
          onChangeText={(value) => {
            setEmail(value);
            setError('');
          }}
          keyboardType="email-address"
          autoCapitalize="none"
          style={styles.input}
        />

        <Text style={styles.label}>Password</Text>
        <View style={styles.passwordInput}>
          <TextInput
            value={password}
            onChangeText={(value) => {
              setPassword(value);
              setError('');
            }}
            secureTextEntry={!passwordVisible}
            style={styles.passwordTextInput}
          />

          <Pressable onPress={() => setPasswordVisible((value) => !value)}>
            <Feather
              name={passwordVisible ? 'eye' : 'eye-off'}
              size={22}
              color="#B9B9B9"
            />
          </Pressable>
        </View>

        {error ? <Text style={styles.errorText}>{error}</Text> : null}

        <Pressable style={styles.submitButton} onPress={handleLogin}>
          <Text style={styles.submitButtonText}>Sign in</Text>
        </Pressable>
        <Pressable
            style={styles.registerButton}
            onPress={() => router.push('/register' as never)}
            >
            <Text style={styles.registerButtonText}>Create account</Text>
        </Pressable>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F4F4F8',
    paddingTop: 40,
  },
  content: {
    paddingHorizontal: 13,
    paddingBottom: 32,
  },
  title: {
    fontSize: 18,
    color: '#111111',
    textAlign: 'center',
    marginBottom: 24,
  },
  label: {
    fontSize: 13,
    color: '#3F3F3F',
    marginBottom: 5,
  },
  input: {
    minHeight: 43,
    borderRadius: 8,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 13,
    fontSize: 15,
    color: '#111111',
    marginBottom: 8,
  },
  passwordInput: {
    minHeight: 43,
    borderRadius: 8,
    backgroundColor: '#FFFFFF',
    paddingLeft: 13,
    paddingRight: 13,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  passwordTextInput: {
    flex: 1,
    height: '100%',
    fontSize: 15,
    color: '#111111',
    padding: 0,
  },
  submitButton: {
    alignSelf: 'flex-end',
    minHeight: 34,
    borderRadius: 4,
    backgroundColor: '#FFD51E',
    paddingHorizontal: 22,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },
  submitButtonText: {
    fontSize: 14,
    color: '#111111',
  },
  errorText: {
    fontSize: 13,
    color: '#C62828',
    marginTop: 4,
  },
backIconButton: {
  width: 42,
  height: 42,
  alignItems: 'center',
  justifyContent: 'center',
  marginBottom: 8,
},
registerButton: {
  alignSelf: 'flex-end',
  marginTop: 14,
},
registerButtonText: {
  fontSize: 14,
  color: '#111111',
  textDecorationLine: 'underline',
},
});
