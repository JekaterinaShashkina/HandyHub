import { Feather } from '@expo/vector-icons';
import { useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import type { Category, Service } from '@/data/handyhub-data';
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
  const [successMessage, setSuccessMessage] = useState('');

  function clearMessages() {
    setError('');
    setSuccessMessage('');
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
      setSuccessMessage('');
      setError(result.error ?? 'Service creation failed.');
      return;
    }

    resetForm();
    setOpen(false);
    setError('');
    setSuccessMessage('Service added.');
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
          <Feather name={open ? 'minus' : 'plus'} size={24} color="#111111" />
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

          {error ? <Text style={styles.errorText}>{error}</Text> : null}

          <Pressable style={styles.addButton} onPress={handleAdd}>
            <Text style={styles.addButtonText}>Add service</Text>
          </Pressable>
        </View>
      )}

      {successMessage ? (
        <Text style={styles.successText}>{successMessage}</Text>
      ) : null}
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
    color: '#111111',
  },
  fab: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: '#FFD51E',
    alignItems: 'center',
    justifyContent: 'center',
  },
  form: {
    padding: 12,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#D8DCE8',
    backgroundColor: '#FFFFFF',
    marginBottom: 24,
  },
  formTitle: {
    marginBottom: 12,
    fontSize: 18,
    color: '#111111',
  },
  addButton: {
    alignSelf: 'flex-end',
    minHeight: 38,
    borderRadius: 4,
    backgroundColor: '#FFD51E',
    paddingHorizontal: 22,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 12,
  },
  addButtonText: {
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
});
