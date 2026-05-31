import { Feather } from '@expo/vector-icons';
import {
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
  type StyleProp,
  type ViewStyle,
} from 'react-native';

import { FormTextInput } from '@/components/common/FormTextInput';
import { HandyHubColors } from '@/constants/theme';
import type { Category, Service } from '@/data/handyhub-data';

const priceTypes: Service['priceType'][] = ['from', 'fixed', 'hourly'];
const priceOptions = priceTypes.map((type) => ({
  label: type,
  value: type,
}));

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
      <FormTextInput
        label="Title"
        value={title}
        onChangeText={onTitleChange}
        inputStyle={styles.borderedInput}
      />

      <SelectField
        label="Category"
        open={categoryOpen}
        selectedLabel={selectedCategory?.name}
        placeholder="Select category"
        options={categories.map((category) => ({
          label: category.name,
          value: category.id,
        }))}
        onOpenChange={onCategoryOpenChange}
        onSelect={onCategoryChange}
      />

      <PriceField
        priceType={priceType}
        priceOpen={priceOpen}
        price={price}
        onPriceTypeChange={onPriceTypeChange}
        onPriceOpenChange={onPriceOpenChange}
        onPriceChange={onPriceChange}
      />

      <FormTextInput
        label="Duration, min"
        value={duration}
        onChangeText={onDurationChange}
        keyboardType="numeric"
        inputStyle={styles.borderedInput}
      />

      <FormTextInput
        label="Service description"
        value={description}
        onChangeText={onDescriptionChange}
        multiline
        inputStyle={[styles.borderedInput, styles.descriptionInput]}
      />
    </>
  );
}

type SelectOption<TValue extends string | number> = {
  label: string;
  value: TValue;
};

type PriceFieldProps = {
  priceType: Service['priceType'];
  priceOpen: boolean;
  price: string;
  onPriceTypeChange: (value: Service['priceType']) => void;
  onPriceOpenChange: (value: boolean) => void;
  onPriceChange: (value: string) => void;
};

function PriceField({
  priceType,
  priceOpen,
  price,
  onPriceTypeChange,
  onPriceOpenChange,
  onPriceChange,
}: PriceFieldProps) {
  return (
    <>
      <Text style={styles.label}>Price</Text>
      <View style={styles.priceRow}>
        <SelectField
          open={priceOpen}
          selectedLabel={priceType}
          options={priceOptions}
          onOpenChange={onPriceOpenChange}
          onSelect={onPriceTypeChange}
          selectStyle={styles.priceTypeSelect}
          renderDropdown={false}
        />

        <TextInput
          value={price}
          onChangeText={onPriceChange}
          placeholder="service price"
          placeholderTextColor={HandyHubColors.placeholder}
          keyboardType="numeric"
          style={[styles.input, styles.priceInput]}
        />
      </View>

      {priceOpen && (
        <SelectDropdown
          options={priceOptions}
          onSelect={(type) => {
            onPriceTypeChange(type);
            onPriceOpenChange(false);
          }}
          style={styles.priceDropdown}
        />
      )}
    </>
  );
}

type SelectFieldProps<TValue extends string | number> = {
  label?: string;
  open: boolean;
  selectedLabel?: string;
  placeholder?: string;
  options: SelectOption<TValue>[];
  onOpenChange: (value: boolean) => void;
  onSelect: (value: TValue) => void;
  selectStyle?: StyleProp<ViewStyle>;
  dropdownStyle?: StyleProp<ViewStyle>;
  renderDropdown?: boolean;
};

function SelectField<TValue extends string | number>({
  label,
  open,
  selectedLabel,
  placeholder,
  options,
  onOpenChange,
  onSelect,
  selectStyle,
  dropdownStyle,
  renderDropdown = true,
}: SelectFieldProps<TValue>) {
  return (
    <>
      {label ? <Text style={styles.label}>{label}</Text> : null}

      <Pressable
        style={[styles.select, selectStyle]}
        onPress={() => onOpenChange(!open)}
      >
        <Text style={[styles.selectText, !selectedLabel && styles.placeholder]}>
          {selectedLabel ?? placeholder}
        </Text>
        <Feather
          name={open ? 'chevron-up' : 'chevron-down'}
          size={22}
          color={HandyHubColors.text}
        />
      </Pressable>

      {open && renderDropdown && (
        <SelectDropdown
          options={options}
          onSelect={(value) => {
            onSelect(value);
            onOpenChange(false);
          }}
          style={dropdownStyle}
        />
      )}
    </>
  );
}

type SelectDropdownProps<TValue extends string | number> = {
  options: SelectOption<TValue>[];
  onSelect: (value: TValue) => void;
  style?: StyleProp<ViewStyle>;
};

function SelectDropdown<TValue extends string | number>({
  options,
  onSelect,
  style,
}: SelectDropdownProps<TValue>) {
  return (
    <View style={[styles.dropdown, style]}>
      {options.map((option) => (
        <Pressable
          key={String(option.value)}
          style={styles.dropdownItem}
          onPress={() => onSelect(option.value)}
        >
          <Text style={styles.dropdownText}>{option.label}</Text>
        </Pressable>
      ))}
    </View>
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
    borderWidth: 1,
    borderColor: HandyHubColors.border,
    backgroundColor: HandyHubColors.surface,
    paddingHorizontal: 13,
    fontSize: 15,
    color: HandyHubColors.text,
    marginBottom: 8,
  },
  borderedInput: {
    borderWidth: 1,
    borderColor: HandyHubColors.border,
  },
  select: {
    minHeight: 43,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: HandyHubColors.border,
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
