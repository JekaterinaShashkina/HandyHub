import { Pressable, StyleSheet, Text } from 'react-native';

import { HandyHubColors } from '@/constants/theme';
import type { Category } from '@/data/handyhub-data';

type CategoryChipProps = {
  category: Category;
  isSelected: boolean;
  onPress: () => void;
};

export function CategoryChip({ category, isSelected, onPress }: CategoryChipProps) {
  return (
    <Pressable
      style={[styles.categoryChip, isSelected && styles.categoryChipSelected]}
      onPress={onPress}
    >
      <Text
        style={[
          styles.categoryText,
          isSelected && styles.categoryTextSelected,
        ]}
      >
        {category.name}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  categoryChip: {
    minHeight: 42,
    paddingHorizontal: 16,
    borderRadius: 21,
    backgroundColor: HandyHubColors.background,
    alignItems: 'center',
    justifyContent: 'center',
  },
  categoryChipSelected: {
    backgroundColor: HandyHubColors.text,
  },
  categoryText: {
    fontSize: 15,
    fontWeight: '600',
    color: HandyHubColors.text,
  },
  categoryTextSelected: {
    color: HandyHubColors.surface,
  },
});
