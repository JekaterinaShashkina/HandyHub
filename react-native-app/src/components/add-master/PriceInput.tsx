import { Feather } from '@expo/vector-icons';
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';

import type { PriceType } from '@/components/add-master/types';
import { HandyHubColors } from '@/constants/theme';

const priceTypes: PriceType[] = ['from', 'fixed', 'hourly'];

type PriceInputProps = {
  priceType: PriceType;
  price: string;
  open: boolean;
  onPriceTypeChange: (value: PriceType) => void;
  onPriceChange: (value: string) => void;
  onOpenChange: (value: boolean) => void;
};

export function PriceInput({
  priceType,
  price,
  open,
  onPriceTypeChange,
  onPriceChange,
  onOpenChange,
}: PriceInputProps) {
  return (
    <>
      <Text style={styles.label}>Price</Text>
      <View style={styles.priceRow}>
        <Pressable
          style={[styles.select, styles.priceTypeSelect]}
          onPress={() => onOpenChange(!open)}
        >
          <Text style={styles.selectText}>{priceType}</Text>
          <Feather
            name={open ? 'chevron-up' : 'chevron-down'}
            size={22}
            color={HandyHubColors.text}
          />
        </Pressable>

        <TextInput
          value={price}
          onChangeText={onPriceChange}
          placeholder="service price"
          placeholderTextColor={HandyHubColors.placeholder}
          keyboardType="numeric"
          style={[styles.input, styles.priceInput]}
        />
      </View>

      {open && (
        <View style={[styles.dropdown, styles.priceDropdown]}>
          {priceTypes.map((type) => (
            <Pressable
              key={type}
              style={styles.dropdownItem}
              onPress={() => {
                onPriceTypeChange(type);
                onOpenChange(false);
              }}
            >
              <Text style={styles.dropdownText}>{type}</Text>
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
  input: {
    minHeight: 43,
    borderRadius: 8,
    backgroundColor: HandyHubColors.surface,
    paddingHorizontal: 13,
    fontSize: 15,
    color: HandyHubColors.text,
    marginBottom: 8,
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
});
