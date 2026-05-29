import { Feather } from '@expo/vector-icons';
import { Stack, useRouter } from 'expo-router';
import { useState } from 'react';
import {
    Image,
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
        <Pressable style={styles.backIconButton} onPress={() => router.back()}>
          <Feather name="arrow-left" size={24} color="#111111" />
        </Pressable>

        <Text style={styles.title}>Create account</Text>

        <Field label="Name" value={name} onChangeText={setName} />
        <Field label="Surname" value={surname} onChangeText={setSurname} />
        <Field label="Phone" value={phone} onChangeText={setPhone} keyboardType="phone-pad" />
        <Field label="E-mail" value={email} onChangeText={setEmail} keyboardType="email-address" />

        <PasswordField
          label="Password"
          value={password}
          visible={passwordVisible}
          onChangeText={setPassword}
          onToggleVisible={() => setPasswordVisible((value) => !value)}
        />

        <PasswordField
          label="Repeat password"
          value={passwordRepeat}
          visible={passwordRepeatVisible}
          onChangeText={setPasswordRepeat}
          onToggleVisible={() => setPasswordRepeatVisible((value) => !value)}
        />
        <Text style={styles.label}>Set avatar</Text>
        <View style={styles.avatarRow}>
        {avatarUri ? (
            <Image source={{ uri: avatarUri }} style={styles.avatarPreview} />
        ) : null}

        <Pressable style={styles.uploadButton} onPress={handlePickAvatar}>
            <Text style={styles.uploadButtonText}>
            {avatarUri ? 'Change file' : 'Upload file'}
            </Text>
        </Pressable>
        </View>

        {error ? <Text style={styles.errorText}>{error}</Text> : null}

        <Pressable style={styles.submitButton} onPress={handleRegister}>
          <Text style={styles.submitButtonText}>Register</Text>
        </Pressable>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

type FieldProps = {
  label: string;
  value: string;
  onChangeText: (value: string) => void;
  keyboardType?: 'default' | 'phone-pad' | 'email-address';
};

function Field({ label, value, onChangeText, keyboardType = 'default' }: FieldProps) {
  return (
    <>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        value={value}
        onChangeText={onChangeText}
        keyboardType={keyboardType}
        autoCapitalize={keyboardType === 'email-address' ? 'none' : 'sentences'}
        style={styles.input}
      />
    </>
  );
}

type PasswordFieldProps = {
  label: string;
  value: string;
  visible: boolean;
  onChangeText: (value: string) => void;
  onToggleVisible: () => void;
};

function PasswordField({
  label,
  value,
  visible,
  onChangeText,
  onToggleVisible,
}: PasswordFieldProps) {
  return (
    <>
      <Text style={styles.label}>{label}</Text>
      <View style={styles.passwordInput}>
        <TextInput
          value={value}
          onChangeText={onChangeText}
          secureTextEntry={!visible}
          style={styles.passwordTextInput}
        />

        <Pressable onPress={onToggleVisible}>
          <Feather name={visible ? 'eye' : 'eye-off'} size={22} color="#B9B9B9" />
        </Pressable>
      </View>
    </>
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
  backIconButton: {
    width: 42,
    height: 42,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
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
  avatarRow: {
  flexDirection: 'row',
  alignItems: 'center',
  gap: 12,
  marginTop: 8,
  marginBottom: 28,
},
avatarPreview: {
  width: 52,
  height: 52,
  borderRadius: 26,
  backgroundColor: '#D9DCE5',
},
uploadButton: {
  alignSelf: 'flex-start',
  minHeight: 34,
  paddingHorizontal: 18,
  borderRadius: 4,
  borderWidth: 1,
  borderColor: '#16D83E',
  backgroundColor: '#FFFFFF',
  alignItems: 'center',
  justifyContent: 'center',
},
uploadButtonText: {
  fontSize: 14,
  color: '#111111',
},
});
