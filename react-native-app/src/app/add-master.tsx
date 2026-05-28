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
  Image,
} from 'react-native';

import {
  canAddMaster,
} from '@/data/handyhub-data';
import { useHandyHub } from '@/state/HandyHubContext';
import * as FileSystem from 'expo-file-system/legacy';
import * as ImagePicker from 'expo-image-picker';


export default function AddMasterScreen() {
  const router = useRouter();
  const { categories, currentUser, addMaster } = useHandyHub();
  const allowed = canAddMaster(currentUser);

  const [name, setName] = useState(currentUser?.name ?? '');
  const [surname, setSurname] = useState(currentUser?.surname ?? '');
  const [phone, setPhone] = useState(currentUser?.phone ?? '');
  const [email, setEmail] = useState(currentUser?.email ?? '');
  const [categoryId, setCategoryId] = useState<number | null>(null);
  const [categoryOpen, setCategoryOpen] = useState(false);
  const [priceType, setPriceType] = useState<'from' | 'fixed' | 'hourly'>('from');
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

  const selectedCategory = categories.find((category) => category.id === categoryId);

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
  setError('');
}

  function handleSubmit() {
    const requiredFields = [
      name.trim(),
      surname.trim(),
      phone.trim(),
      email.trim(),
      price.trim(),
      description.trim(),
      password.trim(),
      passwordRepeat.trim(),
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

    if (password !== passwordRepeat) {
      setError('Passwords do not match.');
      return;
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailPattern.test(email.trim())) {
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

    if (password.length < 4) {
      setError('Password must be at least 4 characters.');
      return;
    }

    const result = addMaster({
      name: name.trim(),
      surname: surname.trim(),
      phone: phone.trim(),
      email: email.trim(),
      password,
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

        <View style={styles.notice}>
          <Pressable style={styles.backButtonLight} onPress={() => router.back()}>
            <Text style={styles.backButtonLightText}>Back</Text>
          </Pressable>
          <Text style={styles.noticeTitle}>Specialist registration</Text>
          <Text style={styles.noticeText}>
            Only users with a master role can register a specialist profile.
          </Text>

          <Pressable style={styles.backButton} onPress={() => router.back()}>
            <Text style={styles.backButtonText}>Back</Text>
          </Pressable>
        </View>
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
        <Text style={styles.title}>Specialist registration</Text>

        <Field label="Name" value={name} onChangeText={setName} />
        <Field label="Surname" value={surname} onChangeText={setSurname} />
        <Field label="Phone" value={phone} onChangeText={setPhone} keyboardType="phone-pad" />
        <Field label="E-mail" value={email} onChangeText={setEmail} keyboardType="email-address" />

        <View style={styles.spacer} />

        <Text style={styles.label}>Category</Text>
        <Pressable
          style={styles.select}
          onPress={() => setCategoryOpen((value) => !value)}
        >
          <Text style={[styles.selectText, !selectedCategory && styles.placeholder]}>
            {selectedCategory?.name ?? 'Select category'}
          </Text>
          <Feather name={categoryOpen ? 'chevron-up' : 'chevron-down'} size={22} color="#111111" />
        </Pressable>

        {categoryOpen && (
          <View style={styles.dropdown}>
            {categories.map((category) => (
              <Pressable
                key={category.id}
                style={styles.dropdownItem}
                onPress={() => {
                  setCategoryId(category.id);
                  setCategoryOpen(false);
                }}
              >
                <Text style={styles.dropdownText}>{category.name}</Text>
              </Pressable>
            ))}
          </View>
        )}

        <Text style={styles.label}>Price</Text>
        <View style={styles.priceRow}>
          <Pressable
            style={[styles.select, styles.priceTypeSelect]}
            onPress={() => setPriceOpen((value) => !value)}
          >
            <Text style={styles.selectText}>{priceType}</Text>
            <Feather name={priceOpen ? 'chevron-up' : 'chevron-down'} size={22} color="#111111" />
          </Pressable>

          <TextInput
            value={price}
            onChangeText={setPrice}
            placeholder="service price"
            placeholderTextColor="#C3C3C3"
            keyboardType="numeric"
            style={[styles.input, styles.priceInput]}
          />
        </View>

        {priceOpen && (
          <View style={[styles.dropdown, styles.priceDropdown]}>
            {(['from', 'fixed', 'hourly'] as const).map((type) => (
              <Pressable
                key={type}
                style={styles.dropdownItem}
                onPress={() => {
                  setPriceType(type);
                  setPriceOpen(false);
                }}
              >
                <Text style={styles.dropdownText}>{type}</Text>
              </Pressable>
            ))}
          </View>
        )}

        <Text style={styles.label}>Service description</Text>
        <TextInput
          value={description}
          onChangeText={setDescription}
          style={[styles.input, styles.descriptionInput]}
          multiline
          textAlignVertical="top"
        />

        <View style={styles.spacer} />

        <PasswordField
          label="Password"
          value={password}
          onChangeText={setPassword}
          visible={passwordVisible}
          onToggleVisible={() => setPasswordVisible((value) => !value)}
        />

        <PasswordField
          label="Repeat password"
          value={passwordRepeat}
          onChangeText={setPasswordRepeat}
          visible={passwordRepeatVisible}
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
        {successMessage ? <Text style={styles.successText}>{successMessage}</Text> : null}

        <Pressable style={styles.submitButton} onPress={handleSubmit}>
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
  keyboardType?: 'default' | 'phone-pad' | 'email-address' | 'numeric';
};

function Field({ label, value, onChangeText, keyboardType = 'default' }: FieldProps) {
  return (
    <>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        value={value}
        onChangeText={onChangeText}
        keyboardType={keyboardType}
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
  container: {
    flex: 1,
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
  spacer: {
    height: 22,
  },
  select: {
    minHeight: 43,
    borderRadius: 8,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 13,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  selectText: {
    flex: 1,
    fontSize: 14,
    color: '#111111',
  },
  placeholder: {
    color: '#C3C3C3',
  },
  dropdown: {
    borderRadius: 8,
    backgroundColor: '#FFFFFF',
    marginTop: -4,
    marginBottom: 8,
    overflow: 'hidden',
  },
  dropdownItem: {
    minHeight: 38,
    justifyContent: 'center',
    paddingHorizontal: 13,
  },
  dropdownText: {
    fontSize: 14,
    color: '#111111',
  },
  priceRow: {
    flexDirection: 'row',
    gap: 6,
  },
  priceTypeSelect: {
    width: 91,
  },
  priceInput: {
    flex: 1,
  },
  priceDropdown: {
    width: 91,
  },
  descriptionInput: {
    minHeight: 76,
    paddingTop: 12,
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
  submitButton: {
    alignSelf: 'flex-end',
    minHeight: 34,
    borderRadius: 4,
    backgroundColor: '#FFD51E',
    paddingHorizontal: 22,
    alignItems: 'center',
    justifyContent: 'center',
  },
  submitButtonText: {
    fontSize: 14,
    color: '#111111',
  },
  errorText: {
    fontSize: 13,
    color: '#C62828',
    marginBottom: 10,
  },
  successText: {
    fontSize: 13,
    color: '#2E7D32',
    marginBottom: 10,
  },
  notice: {
    margin: 16,
    padding: 16,
    borderRadius: 8,
    backgroundColor: '#FFFFFF',
  },
  noticeTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#111111',
    marginBottom: 8,
  },
  noticeText: {
    fontSize: 14,
    lineHeight: 20,
    color: '#3F3F3F',
    marginBottom: 16,
  },
  backButton: {
    alignSelf: 'flex-start',
    minHeight: 36,
    borderRadius: 18,
    backgroundColor: '#FFD51E',
    paddingHorizontal: 18,
    alignItems: 'center',
    justifyContent: 'center',
  },
  backButtonText: {
    fontSize: 14,
    color: '#111111',
  },
  backButtonLight: {
  alignSelf: 'flex-start',
  minHeight: 38,
  paddingHorizontal: 14,
  borderRadius: 19,
  backgroundColor: '#FFFFFF',
  alignItems: 'center',
  justifyContent: 'center',
  marginBottom: 14,
},
backButtonLightText: {
  fontSize: 14,
  fontWeight: '700',
  color: '#111111',
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
});