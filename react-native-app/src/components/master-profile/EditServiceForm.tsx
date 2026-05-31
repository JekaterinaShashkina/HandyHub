import { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { FormMessage } from '@/components/common/FormMessage';
import { PrimaryButton } from '@/components/common/PrimaryButton';
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

      <FormMessage message={error} type="error" style={styles.errorText} />

      <PrimaryButton
        title="Save changes"
        onPress={handleSave}
        size="medium"
        style={styles.submitButton}
      />
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
    marginTop: 20,
  },
  errorText: {
    marginTop: 4,
  },
});
