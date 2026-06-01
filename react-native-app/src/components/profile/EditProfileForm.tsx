import { StyleSheet } from 'react-native';

import { AvatarPicker } from '@/components/add-master/AvatarPicker';
import { FormMessage } from '@/components/common/FormMessage';
import { FormTextInput } from '@/components/common/FormTextInput';
import { PrimaryButton } from '@/components/common/PrimaryButton';
import { ScreenHeader } from '@/components/common/ScreenHeader';

type EditProfileFormProps = {
  name: string;
  surname: string;
  phone: string;
  email: string;
  avatarUri: string;
  error: string;
  successMessage: string;
  onBack: () => void;
  onNameChange: (value: string) => void;
  onSurnameChange: (value: string) => void;
  onPhoneChange: (value: string) => void;
  onEmailChange: (value: string) => void;
  onPickAvatar: () => void;
  onSubmit: () => void;
};

export function EditProfileForm({
  name,
  surname,
  phone,
  email,
  avatarUri,
  error,
  successMessage,
  onBack,
  onNameChange,
  onSurnameChange,
  onPhoneChange,
  onEmailChange,
  onPickAvatar,
  onSubmit,
}: EditProfileFormProps) {
  return (
    <>
      <ScreenHeader title="Edit profile" onBack={onBack} />

      <AvatarPicker
        avatarUri={avatarUri}
        onPickAvatar={onPickAvatar}
        mode="large"
        uploadText="Upload avatar"
        changeText="Change avatar"
      />

      <FormTextInput label="Name" value={name} onChangeText={onNameChange} />
      <FormTextInput
        label="Surname"
        value={surname}
        onChangeText={onSurnameChange}
      />
      <FormTextInput
        label="Phone"
        value={phone}
        onChangeText={onPhoneChange}
        keyboardType="phone-pad"
      />
      <FormTextInput
        label="E-mail"
        value={email}
        onChangeText={onEmailChange}
        keyboardType="email-address"
      />

      <FormMessage message={error} type="error" style={styles.errorText} />
      <FormMessage
        message={successMessage}
        type="success"
        style={styles.successText}
      />

      <PrimaryButton title="Save changes" onPress={onSubmit} />
    </>
  );
}

const styles = StyleSheet.create({
  errorText: {
    marginTop: 4,
  },
  successText: {
    marginTop: 4,
  },
});
