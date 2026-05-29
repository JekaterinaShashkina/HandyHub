import { Feather } from '@expo/vector-icons';
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';

import { AvatarPicker } from '@/components/add-master/AvatarPicker';
import { CategorySelect } from '@/components/add-master/CategorySelect';
import { FormField } from '@/components/add-master/FormField';
import { PasswordField } from '@/components/add-master/PasswordField';
import { PriceInput } from '@/components/add-master/PriceInput';
import type { PriceType } from '@/components/add-master/types';
import type { Category } from '@/data/handyhub-data';

type AddMasterFormProps = {
  categories: Category[];
  isExistingUser: boolean;
  name: string;
  surname: string;
  phone: string;
  email: string;
  categoryId: number | null;
  categoryOpen: boolean;
  priceType: PriceType;
  priceOpen: boolean;
  price: string;
  description: string;
  password: string;
  passwordRepeat: string;
  passwordVisible: boolean;
  passwordRepeatVisible: boolean;
  avatarUri: string;
  error: string;
  successMessage: string;
  onBack: () => void;
  onNameChange: (value: string) => void;
  onSurnameChange: (value: string) => void;
  onPhoneChange: (value: string) => void;
  onEmailChange: (value: string) => void;
  onCategoryChange: (value: number) => void;
  onCategoryOpenChange: (value: boolean) => void;
  onPriceTypeChange: (value: PriceType) => void;
  onPriceOpenChange: (value: boolean) => void;
  onPriceChange: (value: string) => void;
  onDescriptionChange: (value: string) => void;
  onPasswordChange: (value: string) => void;
  onPasswordRepeatChange: (value: string) => void;
  onTogglePasswordVisible: () => void;
  onTogglePasswordRepeatVisible: () => void;
  onPickAvatar: () => void;
  onSubmit: () => void;
};

export function AddMasterForm({
  categories,
  isExistingUser,
  name,
  surname,
  phone,
  email,
  categoryId,
  categoryOpen,
  priceType,
  priceOpen,
  price,
  description,
  password,
  passwordRepeat,
  passwordVisible,
  passwordRepeatVisible,
  avatarUri,
  error,
  successMessage,
  onBack,
  onNameChange,
  onSurnameChange,
  onPhoneChange,
  onEmailChange,
  onCategoryChange,
  onCategoryOpenChange,
  onPriceTypeChange,
  onPriceOpenChange,
  onPriceChange,
  onDescriptionChange,
  onPasswordChange,
  onPasswordRepeatChange,
  onTogglePasswordVisible,
  onTogglePasswordRepeatVisible,
  onPickAvatar,
  onSubmit,
}: AddMasterFormProps) {
  return (
    <>
      <View style={styles.header}>
        <Pressable style={styles.backIconButton} onPress={onBack}>
          <Feather name="arrow-left" size={24} color="#111111" />
        </Pressable>

        <Text style={styles.title}>Specialist registration</Text>

        <View style={styles.headerSpacer} />
      </View>

      <FormField label="Name" value={name} onChangeText={onNameChange} />
      <FormField label="Surname" value={surname} onChangeText={onSurnameChange} />
      <FormField
        label="Phone"
        value={phone}
        onChangeText={onPhoneChange}
        keyboardType="phone-pad"
      />
      <FormField
        label="E-mail"
        value={email}
        onChangeText={onEmailChange}
        keyboardType="email-address"
      />

      <View style={styles.spacer} />

      <CategorySelect
        categories={categories}
        selectedCategoryId={categoryId}
        open={categoryOpen}
        onOpenChange={onCategoryOpenChange}
        onSelect={onCategoryChange}
      />

      <PriceInput
        priceType={priceType}
        price={price}
        open={priceOpen}
        onPriceTypeChange={onPriceTypeChange}
        onPriceChange={onPriceChange}
        onOpenChange={onPriceOpenChange}
      />

      <Text style={styles.label}>Service description</Text>
      <TextInput
        value={description}
        onChangeText={onDescriptionChange}
        style={[styles.input, styles.descriptionInput]}
        multiline
        textAlignVertical="top"
      />

      {!isExistingUser && (
        <>
          <View style={styles.spacer} />

          <PasswordField
            label="Password"
            value={password}
            onChangeText={onPasswordChange}
            visible={passwordVisible}
            onToggleVisible={onTogglePasswordVisible}
          />

          <PasswordField
            label="Repeat password"
            value={passwordRepeat}
            onChangeText={onPasswordRepeatChange}
            visible={passwordRepeatVisible}
            onToggleVisible={onTogglePasswordRepeatVisible}
          />
        </>
      )}

      <AvatarPicker avatarUri={avatarUri} onPickAvatar={onPickAvatar} />

      {error ? <Text style={styles.errorText}>{error}</Text> : null}
      {successMessage ? <Text style={styles.successText}>{successMessage}</Text> : null}

      <Pressable style={styles.submitButton} onPress={onSubmit}>
        <Text style={styles.submitButtonText}>Register</Text>
      </Pressable>
    </>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 18,
  },
  backIconButton: {
    width: 42,
    height: 42,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerSpacer: {
    width: 42,
  },
  title: {
    flex: 1,
    fontSize: 18,
    color: '#111111',
    textAlign: 'center',
  },
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
  spacer: {
    height: 22,
  },
  descriptionInput: {
    minHeight: 76,
    paddingTop: 12,
  },
  submitButton: {
    alignSelf: 'flex-end',
    minHeight: 34,
    borderRadius: 4,
    backgroundColor: '#FFD51E',
    paddingHorizontal: 22,
    alignItems: 'center',
    justifyContent: 'center',
  },
  submitButtonText: {
    fontSize: 14,
    color: '#111111',
  },
  errorText: {
    fontSize: 13,
    color: '#C62828',
    marginBottom: 10,
  },
  successText: {
    fontSize: 13,
    color: '#2E7D32',
    marginBottom: 10,
  },
});
