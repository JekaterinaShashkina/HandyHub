import { Feather } from '@expo/vector-icons';
import { useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { FormMessage } from '@/components/common/FormMessage';
import { PrimaryButton } from '@/components/common/PrimaryButton';
import { HandyHubColors } from '@/constants/theme';
import type { Category, Service } from '@/models';
import { ServiceFormFields } from '@/components/master-profile/ServiceFormFields';
import type { ServiceFormValues } from '@/components/master-profile/types';

type AddServiceFormProps = {
  categories: Category[];
  onAdd: (values: ServiceFormValues) => { success: boolean; error?: string };
};

export function AddServiceForm({ categories, onAdd }: AddServiceFormProps) {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [categoryId, setCategoryId] = useState<number | null>(null);
  const [categoryOpen, setCategoryOpen] = useState(false);
  const [priceType, setPriceType] = useState<Service['priceType']>('from');
  const [priceOpen, setPriceOpen] = useState(false);
  const [price, setPrice] = useState('');
  const [duration, setDuration] = useState('60');
  const [description, setDescription] = useState('');
  const [error, setError] = useState('');

  function clearMessages() {
    setError('');
  }

  function resetForm() {
    setTitle('');
    setCategoryId(null);
    setCategoryOpen(false);
    setPriceType('from');
    setPriceOpen(false);
    setPrice('');
    setDuration('60');
    setDescription('');
  }

  function handleAdd() {
    const result = onAdd({
      categoryId: categoryId ?? 0,
      title,
      description,
      priceType,
      price: Number(price),
      durationMin: Number(duration),
    });

    if (!result.success) {
      setError(result.error ?? 'Service creation failed.');
      return;
    }

    resetForm();
    setOpen(false);
    setError('');
  }

  return (
    <>
      <View style={styles.header}>
        <Text style={styles.sectionTitle}>Add service</Text>

        <Pressable
          style={styles.fab}
          onPress={() => {
            setOpen((value) => !value);
            clearMessages();
          }}
        >
          <Feather
            name={open ? 'minus' : 'plus'}
            size={24}
            color={HandyHubColors.text}
          />
        </Pressable>
      </View>

      {open && (
        <View style={styles.form}>
          <Text style={styles.formTitle}>New service</Text>

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
            onDurationChange={(value) => {
              setDuration(value);
              clearMessages();
            }}
            onDescriptionChange={(value) => {
              setDescription(value);
              clearMessages();
            }}
          />

          <FormMessage message={error} type="error" style={styles.errorText} />

          <PrimaryButton
            title="Add service"
            onPress={handleAdd}
            size="medium"
            style={styles.addButton}
          />
        </View>
      )}

    </>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  sectionTitle: {
    marginBottom: 12,
    fontSize: 18,
    fontWeight: '700',
    color: HandyHubColors.text,
  },
  fab: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: HandyHubColors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  form: {
    padding: 12,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: HandyHubColors.border,
    backgroundColor: HandyHubColors.surface,
    marginBottom: 24,
  },
  formTitle: {
    marginBottom: 12,
    fontSize: 18,
    color: HandyHubColors.text,
  },
  addButton: {
    marginTop: 12,
  },
  errorText: {
    marginTop: 4,
  },
});
