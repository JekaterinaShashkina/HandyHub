import { Feather } from '@expo/vector-icons';
import { useState } from 'react';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';

import type { Category } from '@/data/handyhub-data';

type ExpandableCategoriesProps = {
  categories: Category[];
  selectedCategoryId: number | null;
  onCategoryPress: (category: Category) => void;
};

const categoryIcons: Record<string, number> = {
  manicurist: require('../../../assets/images/categories/manicurist.png'),
  makeup: require('../../../assets/images/categories/makeup.png'),
  electrician: require('../../../assets/images/categories/electrician.png'),
  plumber: require('../../../assets/images/categories/plumber.png'),
  cosmetologist: require('../../../assets/images/categories/cosmetologist.png'),
  handyman: require('../../../assets/images/categories/handyman.png'),
  masseure: require('../../../assets/images/categories/masseure.png'),
  photographer: require('../../../assets/images/categories/photographer.png'),
};

function getCategoryIcon(category: Category) {
  return categoryIcons[category.iconUrl] ?? categoryIcons.handyman;
}

export function ExpandableCategories({
  categories,
  selectedCategoryId,
  onCategoryPress,
}: ExpandableCategoriesProps) {
  const [expanded, setExpanded] = useState(false);

  return (
    <View style={styles.container}>
      <Pressable style={styles.header} onPress={() => setExpanded(!expanded)}>
        <Text style={styles.title}>Categories</Text>
        <Feather
          name={expanded ? 'chevron-up' : 'chevron-down'}
          size={20}
          color="#111111"
        />
      </Pressable>

      {expanded && (
        <View style={styles.list}>
          {categories.map((category) => {
            const isSelected = selectedCategoryId === category.id;

            return (
              <Pressable
                key={category.id}
                style={[styles.row, isSelected && styles.rowSelected]}
                onPress={() => onCategoryPress(category)}
              >
                <Image
                  source={getCategoryIcon(category)}
                  style={styles.icon}
                  resizeMode="contain"
                />

                <Text style={[styles.name, isSelected && styles.nameSelected]}>
                  {category.name}
                </Text>

                {isSelected && (
                  <Feather name="check" size={18} color="#111111" />
                )}
              </Pressable>
            );
          })}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 16,
    marginBottom: 8,
  },
  header: {
    minHeight: 48,
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    paddingVertical: 12,
  },
  title: {
    fontSize: 16,
    fontWeight: '700',
    color: '#111111',
    marginRight: 8,
  },
  list: {
    gap: 12,
    paddingBottom: 12,
  },
  row: {
    minHeight: 36,
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 12,
    paddingHorizontal: 8,
  },
  rowSelected: {
    backgroundColor: '#FFFFFF',
  },
  icon: {
    width: 24,
    height: 24,
    marginRight: 16,
  },
  name: {
    flex: 1,
    fontSize: 16,
    lineHeight: 24,
    color: '#111111',
  },
  nameSelected: {
    fontWeight: '700',
  },
});