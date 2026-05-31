import { Image, Pressable, StyleSheet, Text, View } from 'react-native';

import { BackButton } from '@/components/common/BackButton';
import { FormMessage } from '@/components/common/FormMessage';
import { FormTextInput } from '@/components/common/FormTextInput';
import { PasswordField } from '@/components/common/PasswordField';
import { PrimaryButton } from '@/components/common/PrimaryButton';

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

      <Text style={styles.label}>Set avatar</Text>
      <View style={styles.avatarRow}>
        {avatarUri ? (
          <Image source={{ uri: avatarUri }} style={styles.avatarPreview} />
        ) : null}

        <Pressable style={styles.uploadButton} onPress={onPickAvatar}>
          <Text style={styles.uploadButtonText}>
            {avatarUri ? 'Change file' : 'Upload file'}
          </Text>
        </Pressable>
      </View>

      <FormMessage message={error} type="error" style={styles.errorText} />

      <PrimaryButton title="Register" onPress={onSubmit} />
    </>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 18,
    color: '#111111',
    textAlign: 'center',
    marginBottom: 24,
  },
  label: {
    fontSize: 13,
    color: '#3F3F3F',
    marginBottom: 5,
  },
  avatarRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginTop: 8,
    marginBottom: 28,
  },
  avatarPreview: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: '#D9DCE5',
  },
  uploadButton: {
    alignSelf: 'flex-start',
    minHeight: 34,
    paddingHorizontal: 18,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#16D83E',
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  uploadButtonText: {
    fontSize: 14,
    color: '#111111',
  },
  errorText: {
    marginTop: 4,
  },
});
