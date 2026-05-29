import { Feather } from '@expo/vector-icons';
import * as FileSystem from 'expo-file-system/legacy';
import * as ImagePicker from 'expo-image-picker';
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

export default function EditProfileScreen() {
  const router = useRouter();
  const { currentUser, updateProfile } = useHandyHub();

  const [name, setName] = useState(currentUser?.name ?? '');
  const [surname, setSurname] = useState(currentUser?.surname ?? '');
  const [phone, setPhone] = useState(currentUser?.phone ?? '');
  const [email, setEmail] = useState(currentUser?.email ?? '');
  const [avatarUri, setAvatarUri] = useState(currentUser?.avatarUrl ?? '');
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

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
    const fileName = `profile-avatar-${Date.now()}.jpg`;
    const destination = `${FileSystem.documentDirectory}${fileName}`;

    await FileSystem.copyAsync({
      from: asset.uri,
      to: destination,
    });

    setAvatarUri(destination);
    setError('');
    setSuccessMessage('');
  }

  function handleSave() {
    const result = updateProfile({
      name,
      surname,
      phone,
      email,
      avatarUrl: avatarUri || undefined,
    });

    if (!result.success) {
      setSuccessMessage('');
      setError(result.error ?? 'Profile update failed.');
      return;
    }

    setError('');
    setSuccessMessage('Profile saved.');

    setTimeout(() => {
      router.back();
    }, 500);
  }

  if (!currentUser) {
    return (
      <View style={styles.safeArea}>
        <Pressable style={styles.backIconButton} onPress={() => router.back()}>
          <Feather name="arrow-left" size={24} color="#111111" />
        </Pressable>

        <Text style={styles.title}>Edit profile</Text>
        <Text style={styles.noticeText}>Log in to edit your profile.</Text>
      </View>
    );
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
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <Pressable style={styles.backIconButton} onPress={() => router.back()}>
            <Feather name="arrow-left" size={24} color="#111111" />
          </Pressable>

          <Text style={styles.title}>Edit profile</Text>

          <View style={styles.headerSpacer} />
        </View>

        <View style={styles.avatarBlock}>
          {avatarUri ? (
            <Image source={{ uri: avatarUri }} style={styles.avatarPreview} />
          ) : (
            <View style={styles.avatarFallback}>
              <Feather name="user" size={34} color="#111111" />
            </View>
          )}

          <Pressable style={styles.uploadButton} onPress={handlePickAvatar}>
            <Text style={styles.uploadButtonText}>
              {avatarUri ? 'Change avatar' : 'Upload avatar'}
            </Text>
          </Pressable>
        </View>

        <Field label="Name" value={name} onChangeText={setName} />
        <Field label="Surname" value={surname} onChangeText={setSurname} />
        <Field
          label="Phone"
          value={phone}
          onChangeText={setPhone}
          keyboardType="phone-pad"
        />
        <Field
          label="E-mail"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
        />

        {error ? <Text style={styles.errorText}>{error}</Text> : null}
        {successMessage ? (
          <Text style={styles.successText}>{successMessage}</Text>
        ) : null}

        <Pressable style={styles.submitButton} onPress={handleSave}>
          <Text style={styles.submitButtonText}>Save changes</Text>
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

function Field({
  label,
  value,
  onChangeText,
  keyboardType = 'default',
}: FieldProps) {
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
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 18,
  },
  backIconButton: {
    width: 42,
    height: 42,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerSpacer: {
    width: 42,
  },
  title: {
    flex: 1,
    fontSize: 18,
    color: '#111111',
    textAlign: 'center',
  },
  avatarBlock: {
    alignItems: 'center',
    marginBottom: 24,
  },
  avatarPreview: {
    width: 92,
    height: 92,
    borderRadius: 46,
    backgroundColor: '#D9DCE5',
    marginBottom: 12,
  },
  avatarFallback: {
    width: 92,
    height: 92,
    borderRadius: 46,
    backgroundColor: '#D9DCE5',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  uploadButton: {
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
  submitButton: {
    alignSelf: 'flex-end',
    minHeight: 38,
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
  successText: {
    fontSize: 13,
    color: '#2E7D32',
    marginTop: 4,
  },
  noticeText: {
    paddingHorizontal: 16,
    textAlign: 'center',
    fontSize: 16,
    color: '#6B6B6B',
  },
});