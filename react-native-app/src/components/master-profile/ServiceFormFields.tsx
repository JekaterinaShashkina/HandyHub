import { Feather } from '@expo/vector-icons';
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';

import type { Category, Service } from '@/data/handyhub-data';

type ServiceFormFieldsProps = {
  categories: Category[];
  title: string;
  categoryId: number | null;
  categoryOpen: boolean;
  priceType: Service['priceType'];
  priceOpen: boolean;
  price: string;
  duration: string;
  description: string;
  onTitleChange: (value: string) => void;
  onCategoryChange: (value: number) => void;
  onCategoryOpenChange: (value: boolean) => void;
  onPriceTypeChange: (value: Service['priceType']) => void;
  onPriceOpenChange: (value: boolean) => void;
  onPriceChange: (value: string) => void;
  onDurationChange: (value: string) => void;
  onDescriptionChange: (value: string) => void;
};

export function ServiceFormFields({
  categories,
  title,
  categoryId,
  categoryOpen,
  priceType,
  priceOpen,
  price,
  duration,
  description,
  onTitleChange,
  onCategoryChange,
  onCategoryOpenChange,
  onPriceTypeChange,
  onPriceOpenChange,
  onPriceChange,
  onDurationChange,
  onDescriptionChange,
}: ServiceFormFieldsProps) {
  const selectedCategory = categories.find((category) => category.id === categoryId);

  return (
    <>
      <Text style={styles.label}>Title</Text>
      <TextInput value={title} onChangeText={onTitleChange} style={styles.input} />

      <Text style={styles.label}>Category</Text>
      <Pressable
        style={styles.select}
        onPress={() => onCategoryOpenChange(!categoryOpen)}
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
                onCategoryChange(category.id);
                onCategoryOpenChange(false);
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
          onPress={() => onPriceOpenChange(!priceOpen)}
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
          onChangeText={onPriceChange}
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
                onPriceTypeChange(type);
                onPriceOpenChange(false);
              }}
            >
              <Text style={styles.dropdownText}>{type}</Text>
            </Pressable>
          ))}
        </View>
      )}

      <Text style={styles.label}>Duration, min</Text>
      <TextInput
        value={duration}
        onChangeText={onDurationChange}
        keyboardType="numeric"
        style={styles.input}
      />

      <Text style={styles.label}>Service description</Text>
      <TextInput
        value={description}
        onChangeText={onDescriptionChange}
        style={[styles.input, styles.descriptionInput]}
        multiline
        textAlignVertical="top"
      />
    </>
  );
}

const styles = StyleSheet.create({
  label: {
    fontSize: 13,
    color: '#3F3F3F',
    marginBottom: 5,
  },
  input: {
    minHeight: 43,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#D8DCE8',
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 13,
    fontSize: 15,
    color: '#111111',
    marginBottom: 8,
  },
  select: {
    minHeight: 43,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#D8DCE8',
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
});
