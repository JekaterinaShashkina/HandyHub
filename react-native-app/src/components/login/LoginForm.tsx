import { Feather } from '@expo/vector-icons';
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';

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
      <Pressable style={styles.backIconButton} onPress={onBack}>
        <Feather name="arrow-left" size={24} color="#111111" />
      </Pressable>

      <Text style={styles.title}>Sign in</Text>

      <Text style={styles.label}>E-mail</Text>
      <TextInput
        value={email}
        onChangeText={onEmailChange}
        keyboardType="email-address"
        autoCapitalize="none"
        style={styles.input}
      />

      <Text style={styles.label}>Password</Text>
      <View style={styles.passwordInput}>
        <TextInput
          value={password}
          onChangeText={onPasswordChange}
          secureTextEntry={!passwordVisible}
          style={styles.passwordTextInput}
        />

        <Pressable onPress={onTogglePasswordVisible}>
          <Feather
            name={passwordVisible ? 'eye' : 'eye-off'}
            size={22}
            color="#B9B9B9"
          />
        </Pressable>
      </View>

      {error ? <Text style={styles.errorText}>{error}</Text> : null}

      <Pressable style={styles.submitButton} onPress={onSubmit}>
        <Text style={styles.submitButtonText}>Sign in</Text>
      </Pressable>

      <Pressable style={styles.registerButton} onPress={onRegisterPress}>
        <Text style={styles.registerButtonText}>Create account</Text>
      </Pressable>
    </>
  );
}

const styles = StyleSheet.create({
  backIconButton: {
    width: 42,
    height: 42,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
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
  input: {
    minHeight: 43,
    borderRadius: 8,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 13,
    fontSize: 15,
    color: '#111111',
    marginBottom: 8,
  },
  passwordInput: {
    minHeight: 43,
    borderRadius: 8,
    backgroundColor: '#FFFFFF',
    paddingLeft: 13,
    paddingRight: 13,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  passwordTextInput: {
    flex: 1,
    height: '100%',
    fontSize: 15,
    color: '#111111',
    padding: 0,
  },
  errorText: {
    fontSize: 13,
    color: '#C62828',
    marginTop: 4,
  },
  submitButton: {
    alignSelf: 'flex-end',
    minHeight: 34,
    borderRadius: 4,
    backgroundColor: '#FFD51E',
    paddingHorizontal: 22,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },
  submitButtonText: {
    fontSize: 14,
    color: '#111111',
  },
  registerButton: {
    alignSelf: 'flex-end',
    marginTop: 14,
  },
  registerButtonText: {
    fontSize: 14,
    color: '#111111',
    textDecorationLine: 'underline',
  },
});
