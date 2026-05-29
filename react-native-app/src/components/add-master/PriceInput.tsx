import { Feather } from '@expo/vector-icons';
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';

import type { PriceType } from '@/components/add-master/types';

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
          <Feather name={open ? 'chevron-up' : 'chevron-down'} size={22} color="#111111" />
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

      {open && (
        <View style={[styles.dropdown, styles.priceDropdown]}>
          {(['from', 'fixed', 'hourly'] as const).map((type) => (
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
    color: '#3F3F3F',
    marginBottom: 5,
  },
  input: {
    minHeight: 43,
    borderRadius: 8,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 13,
    fontSize: 15,
    color: '#111111',
    marginBottom: 8,
  },
  select: {
    minHeight: 43,
    borderRadius: 8,
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
});
