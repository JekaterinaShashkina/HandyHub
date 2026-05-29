import { Feather } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useMemo, useState } from 'react';
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

import type { Service } from '@/data/handyhub-data';
import { useHandyHub } from '@/state/HandyHubContext';

export default function EditMasterProfileScreen() {
  const router = useRouter();
  const {
    categories,
    currentUser,
    getMasterDetailsByUserId,
    updateMasterProfile,
  } = useHandyHub();

  const master = currentUser
    ? getMasterDetailsByUserId(currentUser.id)
    : undefined;

  const firstService = master?.services[0];

  const initialCategoryId = useMemo(() => {
    const category = categories.find(
      (item) => item.name === firstService?.categoryName
    );

    return category?.id ?? null;
  }, [categories, firstService?.categoryName]);

  const [categoryId, setCategoryId] = useState<number | null>(initialCategoryId);
  const [categoryOpen, setCategoryOpen] = useState(false);
  const [priceType, setPriceType] = useState<Service['priceType']>(
    firstService?.priceType ?? 'from'
  );
  const [priceOpen, setPriceOpen] = useState(false);
  const [price, setPrice] = useState(
    String(firstService?.price ?? master?.priceFrom ?? '')
  );
  const [description, setDescription] = useState(
    firstService?.description ?? master?.description ?? ''
  );
  const [error, setError] = useState('');

  const selectedCategory = categories.find(
    (category) => category.id === categoryId
  );

  function handleSave() {
    if (!master || !firstService) {
      setError('Master profile not found.');
      return;
    }

    if (!categoryId) {
      setError('Please select a category.');
      return;
    }

    if (!price.trim() || !Number.isFinite(Number(price)) || Number(price) <= 0) {
      setError('Please enter a valid price.');
      return;
    }

    if (!description.trim()) {
      setError('Please enter service description.');
      return;
    }

    const result = updateMasterProfile({
      masterId: master.id,
      serviceId: firstService.id,
      categoryId,
      priceType,
      price: Number(price),
      description,
    });

    if (!result.success) {
      setError(result.error ?? 'Master profile update failed.');
      return;
    }

    setError('');
    router.back();
  }

  if (!currentUser || !master) {
    return (
      <View style={styles.safeArea}>
        <Pressable style={styles.backIconButton} onPress={() => router.back()}>
          <Feather name="arrow-left" size={24} color="#111111" />
        </Pressable>

        <Text style={styles.title}>Edit master profile</Text>
        <Text style={styles.noticeText}>Master profile not found.</Text>
      </View>
    );
  }

  return (
    <KeyboardAvoidingView
      style={styles.safeArea}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
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

          <Text style={styles.title}>Edit master profile</Text>

          <View style={styles.headerSpacer} />
        </View>

        <Text style={styles.label}>Category</Text>
        <Pressable
          style={styles.select}
          onPress={() => setCategoryOpen((value) => !value)}
        >
          <Text style={[styles.selectText, !selectedCategory && styles.placeholder]}>
            {selectedCategory?.name ?? 'Select category'}
          </Text>
          <Feather
            name={categoryOpen ? 'chevron-up' : 'chevron-down'}
            size={22}
            color="#111111"
          />
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
                  setError('');
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
            <Feather
              name={priceOpen ? 'chevron-up' : 'chevron-down'}
              size={22}
              color="#111111"
            />
          </Pressable>

          <TextInput
            value={price}
            onChangeText={(value) => {
              setPrice(value);
              setError('');
            }}
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
                  setError('');
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
          onChangeText={(value) => {
            setDescription(value);
            setError('');
          }}
          style={[styles.input, styles.descriptionInput]}
          multiline
          textAlignVertical="top"
        />

        {error ? <Text style={styles.errorText}>{error}</Text> : null}

        <Pressable style={styles.submitButton} onPress={handleSave}>
          <Text style={styles.submitButtonText}>Save changes</Text>
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
    minHeight: 96,
    paddingTop: 12,
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
  noticeText: {
    paddingHorizontal: 16,
    textAlign: 'center',
    fontSize: 16,
    color: '#6B6B6B',
  },
});