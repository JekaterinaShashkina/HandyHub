import { Feather } from '@expo/vector-icons';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { HandyHubColors } from '@/constants/theme';
import type { Category } from '@/models';

type CategorySelectProps = {
  categories: Category[];
  selectedCategoryId: number | null;
  open: boolean;
  onOpenChange: (value: boolean) => void;
  onSelect: (value: number) => void;
};

export function CategorySelect({
  categories,
  selectedCategoryId,
  open,
  onOpenChange,
  onSelect,
}: CategorySelectProps) {
  const selectedCategory = categories.find(
    (category) => category.id === selectedCategoryId
  );

  return (
    <>
      <Text style={styles.label}>Category</Text>
      <Pressable style={styles.select} onPress={() => onOpenChange(!open)}>
        <Text style={[styles.selectText, !selectedCategory && styles.placeholder]}>
          {selectedCategory?.name ?? 'Select category'}
        </Text>
        <Feather
          name={open ? 'chevron-up' : 'chevron-down'}
          size={22}
          color={HandyHubColors.text}
        />
      </Pressable>

      {open && (
        <View style={styles.dropdown}>
          {categories.map((category) => (
            <Pressable
              key={category.id}
              style={styles.dropdownItem}
              onPress={() => {
                onSelect(category.id);
                onOpenChange(false);
              }}
            >
              <Text style={styles.dropdownText}>{category.name}</Text>
            </Pressable>
          ))}
        </View>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  label: {
    fontSize: 13,
    color: HandyHubColors.textSecondary,
    marginBottom: 5,
  },
  select: {
    minHeight: 43,
    borderRadius: 8,
    backgroundColor: HandyHubColors.surface,
    paddingHorizontal: 13,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  selectText: {
    flex: 1,
    fontSize: 14,
    color: HandyHubColors.text,
  },
  placeholder: {
    color: HandyHubColors.placeholder,
  },
  dropdown: {
    borderRadius: 8,
    backgroundColor: HandyHubColors.surface,
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
    color: HandyHubColors.text,
  },
});
