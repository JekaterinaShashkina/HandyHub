import { Stack, useRouter } from 'expo-router';
import * as FileSystem from 'expo-file-system/legacy';
import * as ImagePicker from 'expo-image-picker';
import { useState } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';

import { AddMasterForm } from '@/components/add-master/AddMasterForm';
import { AddMasterNotice } from '@/components/add-master/AddMasterNotice';
import type { PriceType } from '@/components/add-master/types';
import { canAddMaster } from '@/data/handyhub-data';
import { useHandyHub } from '@/state/HandyHubContext';
import { isValidEmail } from '@/utils/validation';

export default function AddMasterScreen() {
  const router = useRouter();
  const { categories, currentUser, addMaster } = useHandyHub();
  const allowed = canAddMaster(currentUser);
  const isExistingUser = currentUser !== null;

  const [name, setName] = useState(currentUser?.name ?? '');
  const [surname, setSurname] = useState(currentUser?.surname ?? '');
  const [phone, setPhone] = useState(currentUser?.phone ?? '');
  const [email, setEmail] = useState(currentUser?.email ?? '');
  const [categoryId, setCategoryId] = useState<number | null>(null);
  const [categoryOpen, setCategoryOpen] = useState(false);
  const [priceType, setPriceType] = useState<PriceType>('from');
  const [priceOpen, setPriceOpen] = useState(false);
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [password, setPassword] = useState('');
  const [passwordRepeat, setPasswordRepeat] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [passwordRepeatVisible, setPasswordRepeatVisible] = useState(false);
  const [avatarUri, setAvatarUri] = useState('');
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  function clearMessages() {
    setError('');
    setSuccessMessage('');
  }

  async function handlePickAvatar() {
    const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (!permission.granted) {
      setError('Permission to access photos is required.');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.8,
    });

    if (result.canceled) {
      return;
    }

    const asset = result.assets[0];
    const fileName = `avatar-${Date.now()}.jpg`;
    const destination = `${FileSystem.documentDirectory}${fileName}`;

    await FileSystem.copyAsync({
      from: asset.uri,
      to: destination,
    });

    setAvatarUri(destination);
    clearMessages();
  }

  function handleSubmit() {
    const requiredFields = [
      name.trim(),
      surname.trim(),
      phone.trim(),
      email.trim(),
      price.trim(),
      description.trim(),
    ];

    if (!allowed) {
      setError('Only masters can register a specialist profile.');
      return;
    }

    if (requiredFields.some((field) => !field)) {
      setError('Please fill in all fields.');
      return;
    }

    if (!categoryId) {
      setError('Please select a category.');
      return;
    }

    if (!isExistingUser && (!password.trim() || !passwordRepeat.trim())) {
      setError('Please fill in all fields.');
      return;
    }

    if (!isExistingUser && password !== passwordRepeat) {
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

    if (!Number.isFinite(Number(price)) || Number(price) <= 0) {
      setError('Please enter a valid price.');
      return;
    }

    if (!isExistingUser && password.length < 4) {
      setError('Password must be at least 4 characters.');
      return;
    }

    const result = addMaster({
      name: name.trim(),
      surname: surname.trim(),
      phone: phone.trim(),
      email: email.trim(),
      password: password.trim(),
      categoryId,
      priceType,
      price: Number(price),
      description: description.trim(),
      avatarUrl: avatarUri || undefined,
    });

    if (!result.success) {
      setError(result.error ?? 'Specialist registration failed.');
      return;
    }

    setError('');
    setSuccessMessage('Specialist profile saved.');

    setTimeout(() => {
      router.replace('/');
    }, 600);
  }

  if (!allowed) {
    return (
      <View style={styles.safeArea}>
        <Stack.Screen options={{ headerShown: false }} />
        <AddMasterNotice onBack={() => router.back()} />
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
        style={styles.container}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
        keyboardDismissMode="interactive"
      >
        <AddMasterForm
          categories={categories}
          isExistingUser={isExistingUser}
          name={name}
          surname={surname}
          phone={phone}
          email={email}
          categoryId={categoryId}
          categoryOpen={categoryOpen}
          priceType={priceType}
          priceOpen={priceOpen}
          price={price}
          description={description}
          password={password}
          passwordRepeat={passwordRepeat}
          passwordVisible={passwordVisible}
          passwordRepeatVisible={passwordRepeatVisible}
          avatarUri={avatarUri}
          error={error}
          successMessage={successMessage}
          onBack={() => router.back()}
          onNameChange={(value) => {
            setName(value);
            clearMessages();
          }}
          onSurnameChange={(value) => {
            setSurname(value);
            clearMessages();
          }}
          onPhoneChange={(value) => {
            setPhone(value);
            clearMessages();
          }}
          onEmailChange={(value) => {
            setEmail(value);
            clearMessages();
          }}
          onCategoryChange={(value) => {
            setCategoryId(value);
            clearMessages();
          }}
          onCategoryOpenChange={setCategoryOpen}
          onPriceTypeChange={(value) => {
            setPriceType(value);
            clearMessages();
          }}
          onPriceOpenChange={setPriceOpen}
          onPriceChange={(value) => {
            setPrice(value);
            clearMessages();
          }}
          onDescriptionChange={(value) => {
            setDescription(value);
            clearMessages();
          }}
          onPasswordChange={(value) => {
            setPassword(value);
            clearMessages();
          }}
          onPasswordRepeatChange={(value) => {
            setPasswordRepeat(value);
            clearMessages();
          }}
          onTogglePasswordVisible={() =>
            setPasswordVisible((value) => !value)
          }
          onTogglePasswordRepeatVisible={() =>
            setPasswordRepeatVisible((value) => !value)
          }
          onPickAvatar={handlePickAvatar}
          onSubmit={handleSubmit}
        />
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
  container: {
    flex: 1,
  },
  content: {
    paddingHorizontal: 13,
    paddingBottom: 32,
  },
});
