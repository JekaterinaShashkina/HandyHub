import { useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import type { Category } from '@/data/handyhub-data';
import { ServiceFormFields } from '@/components/master-profile/ServiceFormFields';
import type { MasterService, ServiceFormValues } from '@/components/master-profile/types';

type EditServiceFormProps = {
  categories: Category[];
  service: MasterService;
  onSave: (values: ServiceFormValues) => { success: boolean; error?: string };
};

export function EditServiceForm({
  categories,
  service,
  onSave,
}: EditServiceFormProps) {
  const initialCategory = categories.find(
    (category) => category.name === service.categoryName
  );

  const [title, setTitle] = useState(service.title);
  const [categoryId, setCategoryId] = useState<number | null>(
    initialCategory?.id ?? null
  );
  const [categoryOpen, setCategoryOpen] = useState(false);
  const [priceType, setPriceType] = useState(service.priceType);
  const [priceOpen, setPriceOpen] = useState(false);
  const [price, setPrice] = useState(String(service.price));
  const [duration, setDuration] = useState(String(service.durationMin));
  const [description, setDescription] = useState(service.description);
  const [error, setError] = useState('');

  function clearError() {
    setError('');
  }

  function handleSave() {
    if (!title.trim()) {
      setError('Please enter service title.');
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

    if (
      !duration.trim() ||
      !Number.isFinite(Number(duration)) ||
      Number(duration) <= 0
    ) {
      setError('Please enter a valid duration.');
      return;
    }

    if (!description.trim()) {
      setError('Please enter service description.');
      return;
    }

    const result = onSave({
      categoryId,
      title,
      description,
      priceType,
      price: Number(price),
      durationMin: Number(duration),
    });

    if (!result.success) {
      setError(result.error ?? 'Master profile update failed.');
      return;
    }

    setError('');
  }

  return (
    <View style={styles.form}>
      <Text style={styles.formTitle}>Edit service</Text>

      <ServiceFormFields
        categories={categories}
        title={title}
        categoryId={categoryId}
        categoryOpen={categoryOpen}
        priceType={priceType}
        priceOpen={priceOpen}
        price={price}
        duration={duration}
        description={description}
        onTitleChange={(value) => {
          setTitle(value);
          clearError();
        }}
        onCategoryChange={(value) => {
          setCategoryId(value);
          clearError();
        }}
        onCategoryOpenChange={setCategoryOpen}
        onPriceTypeChange={(value) => {
          setPriceType(value);
          clearError();
        }}
        onPriceOpenChange={setPriceOpen}
        onPriceChange={(value) => {
          setPrice(value);
          clearError();
        }}
        onDurationChange={(value) => {
          setDuration(value);
          clearError();
        }}
        onDescriptionChange={(value) => {
          setDescription(value);
          clearError();
        }}
      />

      {error ? <Text style={styles.errorText}>{error}</Text> : null}

      <Pressable style={styles.submitButton} onPress={handleSave}>
        <Text style={styles.submitButtonText}>Save changes</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  form: {
    marginTop: 14,
    paddingTop: 14,
    borderTopWidth: 1,
    borderTopColor: '#D8DCE8',
    backgroundColor: '#FFFFFF',
  },
  formTitle: {
    marginBottom: 12,
    fontSize: 18,
    color: '#111111',
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
});
