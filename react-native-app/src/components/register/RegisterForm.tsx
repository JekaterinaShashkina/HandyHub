import { StyleSheet, Text } from 'react-native';

import { AvatarPicker } from '@/components/add-master/AvatarPicker';
import { BackButton } from '@/components/common/BackButton';
import { FormMessage } from '@/components/common/FormMessage';
import { FormTextInput } from '@/components/common/FormTextInput';
import { PasswordField } from '@/components/common/PasswordField';
import { PrimaryButton } from '@/components/common/PrimaryButton';
import { HandyHubColors } from '@/constants/theme';

type RegisterFormProps = {
  name: string;
  surname: string;
  phone: string;
  email: string;
  password: string;
  passwordRepeat: string;
  passwordVisible: boolean;
  passwordRepeatVisible: boolean;
  avatarUri: string;
  error: string;
  onBack: () => void;
  onNameChange: (value: string) => void;
  onSurnameChange: (value: string) => void;
  onPhoneChange: (value: string) => void;
  onEmailChange: (value: string) => void;
  onPasswordChange: (value: string) => void;
  onPasswordRepeatChange: (value: string) => void;
  onTogglePasswordVisible: () => void;
  onTogglePasswordRepeatVisible: () => void;
  onPickAvatar: () => void;
  onSubmit: () => void;
};

export function RegisterForm({
  name,
  surname,
  phone,
  email,
  password,
  passwordRepeat,
  passwordVisible,
  passwordRepeatVisible,
  avatarUri,
  error,
  onBack,
  onNameChange,
  onSurnameChange,
  onPhoneChange,
  onEmailChange,
  onPasswordChange,
  onPasswordRepeatChange,
  onTogglePasswordVisible,
  onTogglePasswordRepeatVisible,
  onPickAvatar,
  onSubmit,
}: RegisterFormProps) {
  return (
    <>
      <BackButton onPress={onBack} />

      <Text style={styles.title}>Create account</Text>

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

      <PasswordField
        label="Password"
        value={password}
        visible={passwordVisible}
        onChangeText={onPasswordChange}
        onToggleVisible={onTogglePasswordVisible}
      />

      <PasswordField
        label="Repeat password"
        value={passwordRepeat}
        visible={passwordRepeatVisible}
        onChangeText={onPasswordRepeatChange}
        onToggleVisible={onTogglePasswordRepeatVisible}
      />

      <AvatarPicker avatarUri={avatarUri} onPickAvatar={onPickAvatar} />

      <FormMessage message={error} type="error" style={styles.errorText} />

      <PrimaryButton title="Register" onPress={onSubmit} />
    </>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 18,
    color: HandyHubColors.text,
    textAlign: 'center',
    marginBottom: 24,
  },
  errorText: {
    marginTop: 4,
  },
});
