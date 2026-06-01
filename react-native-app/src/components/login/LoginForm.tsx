import { Pressable, StyleSheet, Text } from 'react-native';

import { BackButton } from '@/components/common/BackButton';
import { FormMessage } from '@/components/common/FormMessage';
import { FormTextInput } from '@/components/common/FormTextInput';
import { PasswordField } from '@/components/common/PasswordField';
import { PrimaryButton } from '@/components/common/PrimaryButton';
import { HandyHubColors } from '@/constants/theme';

type LoginFormProps = {
  email: string;
  password: string;
  passwordVisible: boolean;
  error: string;
  onBack: () => void;
  onEmailChange: (value: string) => void;
  onPasswordChange: (value: string) => void;
  onTogglePasswordVisible: () => void;
  onSubmit: () => void;
  onRegisterPress: () => void;
};

export function LoginForm({
  email,
  password,
  passwordVisible,
  error,
  onBack,
  onEmailChange,
  onPasswordChange,
  onTogglePasswordVisible,
  onSubmit,
  onRegisterPress,
}: LoginFormProps) {
  return (
    <>
      <BackButton onPress={onBack} />

      <Text style={styles.title}>Sign in</Text>

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

      <FormMessage message={error} type="error" style={styles.errorText} />

      <PrimaryButton title="Sign in" onPress={onSubmit} />

      <Pressable style={styles.registerButton} onPress={onRegisterPress}>
        <Text style={styles.registerButtonText}>Create account</Text>
      </Pressable>
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
  registerButton: {
    alignSelf: 'flex-end',
    marginTop: 14,
  },
  registerButtonText: {
    fontSize: 14,
    color: HandyHubColors.text,
    textDecorationLine: 'underline',
  },
});
