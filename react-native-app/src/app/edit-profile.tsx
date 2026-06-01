import * as FileSystem from 'expo-file-system/legacy';
import * as ImagePicker from 'expo-image-picker';
import { Stack, useRouter } from 'expo-router';
import { useState } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import { BackButton } from '@/components/common/BackButton';
import { HandyHubColors } from '@/constants/theme';
import { EditProfileForm } from '@/components/profile/EditProfileForm';
import { useHandyHub } from '@/state/AppContext';

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
        <BackButton onPress={() => router.back()} marginBottom={0} />

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
        <EditProfileForm
          name={name}
          surname={surname}
          phone={phone}
          email={email}
          avatarUri={avatarUri}
          error={error}
          successMessage={successMessage}
          onBack={() => router.back()}
          onNameChange={setName}
          onSurnameChange={setSurname}
          onPhoneChange={setPhone}
          onEmailChange={setEmail}
          onPickAvatar={handlePickAvatar}
          onSubmit={handleSave}
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
  title: {
    flex: 1,
    fontSize: 18,
    color: HandyHubColors.text,
    textAlign: 'center',
  },
  noticeText: {
    paddingHorizontal: 16,
    textAlign: 'center',
    fontSize: 16,
    color: HandyHubColors.muted,
  },
});
