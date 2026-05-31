import { Feather } from '@expo/vector-icons';
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';

import { BackButton } from '@/components/common/BackButton';
import { FormMessage } from '@/components/common/FormMessage';
import { PrimaryButton } from '@/components/common/PrimaryButton';
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
        <BackButton onPress={onBack} marginBottom={0} />

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

      <FormMessage message={error} type="error" style={styles.errorText} />
      <FormMessage
        message={successMessage}
        type="success"
        style={styles.successText}
      />

      <PrimaryButton title="Register" onPress={onSubmit} />
    </>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 18,
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
  errorText: {
    marginBottom: 10,
  },
  successText: {
    marginBottom: 10,
  },
});
