import { Feather } from '@expo/vector-icons';
import { useState } from 'react';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';

import { HandyHubColors } from '@/constants/theme';
import type { Category } from '@/models';

type ExpandableCategoriesProps = {
  categories: Category[];
  selectedCategoryId: number | null;
  onCategoryPress: (category: Category) => void;
  onShowAllPress: () => void;
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
  onShowAllPress,
}: ExpandableCategoriesProps) {
  const [expanded, setExpanded] = useState(false);
  const allCategoriesSelected = selectedCategoryId === null;

  return (
    <View style={styles.container}>
      <Pressable style={styles.header} onPress={() => setExpanded(!expanded)}>
        <Text style={styles.title}>Categories</Text>
        <Feather
          name={expanded ? 'chevron-up' : 'chevron-down'}
          size={20}
          color={HandyHubColors.text}
        />
      </Pressable>

      {expanded && (
        <View style={styles.list}>
          <Pressable
            style={[styles.row, allCategoriesSelected && styles.rowSelected]}
            onPress={onShowAllPress}
          >
            <View style={styles.allIcon}>
              <Feather name="grid" size={18} color={HandyHubColors.text} />
            </View>

            <Text
              style={[
                styles.name,
                allCategoriesSelected && styles.nameSelected,
              ]}
            >
              All categories
            </Text>

            {allCategoriesSelected && (
              <Feather name="check" size={18} color={HandyHubColors.text} />
            )}
          </Pressable>

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
                  <Feather name="check" size={18} color={HandyHubColors.text} />
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
    color: HandyHubColors.text,
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
    backgroundColor: HandyHubColors.surface,
  },
  icon: {
    width: 24,
    height: 24,
    marginRight: 16,
  },
  allIcon: {
    width: 24,
    height: 24,
    marginRight: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  name: {
    flex: 1,
    fontSize: 16,
    lineHeight: 24,
    color: HandyHubColors.text,
  },
  nameSelected: {
    fontWeight: '700',
  },
});
