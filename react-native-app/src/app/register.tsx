import { Stack, useRouter } from 'expo-router';
import { useState } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
} from 'react-native';

import { HandyHubColors } from '@/constants/theme';
import { RegisterForm } from '@/components/register/RegisterForm';
import { useHandyHub } from '@/state/AppContext';
import { isValidEmail } from '@/utils/validation';
import * as FileSystem from 'expo-file-system/legacy';
import * as ImagePicker from 'expo-image-picker';

export default function RegisterScreen() {
  const router = useRouter();
  const { registerClient } = useHandyHub();

  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordRepeat, setPasswordRepeat] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [passwordRepeatVisible, setPasswordRepeatVisible] = useState(false);
  const [error, setError] = useState('');
  const [avatarUri, setAvatarUri] = useState('');

  function handleRegister() {
    const fields = [
      name.trim(),
      surname.trim(),
      phone.trim(),
      email.trim(),
      password.trim(),
      passwordRepeat.trim(),
    ];

    if (fields.some((field) => !field)) {
      setError('Please fill in all fields.');
      return;
    }

    if (password !== passwordRepeat) {
      setError('Passwords do not match.');
      return;
    }

    if (!isValidEmail(email)) {
      setError('Please enter a valid email address.');
      return;
    }

    if (phone.trim().length < 6) {
      setError('Please enter a valid phone number.');
      return;
    }

    if (password.length < 4) {
      setError('Password must be at least 4 characters.');
      return;
    }

    const result = registerClient({
      name: name.trim(),
      surname: surname.trim(),
      phone: phone.trim(),
      email: email.trim(),
      password,
      avatarUrl: avatarUri || undefined,
    });

    if (!result.success) {
      setError(result.error ?? 'Registration failed.');
      return;
    }

    router.replace('/' as never);
  }

  async function handlePickAvatar() {
    const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (!permission.granted) {
      setError('Permission to access photos is required.');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.8,
    });

    if (result.canceled) {
        return;
    }

    const asset = result.assets[0];
    const fileName = `client-avatar-${Date.now()}.jpg`;
    const destination = `${FileSystem.documentDirectory}${fileName}`;

    await FileSystem.copyAsync({
      from: asset.uri,
      to: destination,
    });

    setAvatarUri(destination);
    setError('');
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
        <RegisterForm
          name={name}
          surname={surname}
          phone={phone}
          email={email}
          password={password}
          passwordRepeat={passwordRepeat}
          passwordVisible={passwordVisible}
          passwordRepeatVisible={passwordRepeatVisible}
          avatarUri={avatarUri}
          error={error}
          onBack={() => router.back()}
          onNameChange={setName}
          onSurnameChange={setSurname}
          onPhoneChange={setPhone}
          onEmailChange={setEmail}
          onPasswordChange={setPassword}
          onPasswordRepeatChange={setPasswordRepeat}
          onTogglePasswordVisible={() =>
            setPasswordVisible((value) => !value)
          }
          onTogglePasswordRepeatVisible={() =>
            setPasswordRepeatVisible((value) => !value)
          }
          onPickAvatar={handlePickAvatar}
          onSubmit={handleRegister}
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
