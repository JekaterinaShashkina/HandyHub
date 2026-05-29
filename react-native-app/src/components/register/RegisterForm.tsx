import { Feather } from '@expo/vector-icons';
import { Image, Pressable, StyleSheet, Text, TextInput, View } from 'react-native';

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
      <Pressable style={styles.backIconButton} onPress={onBack}>
        <Feather name="arrow-left" size={24} color="#111111" />
      </Pressable>

      <Text style={styles.title}>Create account</Text>

      <Field label="Name" value={name} onChangeText={onNameChange} />
      <Field label="Surname" value={surname} onChangeText={onSurnameChange} />
      <Field
        label="Phone"
        value={phone}
        onChangeText={onPhoneChange}
        keyboardType="phone-pad"
      />
      <Field
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

      {error ? <Text style={styles.errorText}>{error}</Text> : null}

      <Pressable style={styles.submitButton} onPress={onSubmit}>
        <Text style={styles.submitButtonText}>Register</Text>
      </Pressable>
    </>
  );
}

type FieldProps = {
  label: string;
  value: string;
  onChangeText: (value: string) => void;
  keyboardType?: 'default' | 'phone-pad' | 'email-address';
};

function Field({
  label,
  value,
  onChangeText,
  keyboardType = 'default',
}: FieldProps) {
  return (
    <>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        value={value}
        onChangeText={onChangeText}
        keyboardType={keyboardType}
        autoCapitalize={keyboardType === 'email-address' ? 'none' : 'sentences'}
        style={styles.input}
      />
    </>
  );
}

type PasswordFieldProps = {
  label: string;
  value: string;
  visible: boolean;
  onChangeText: (value: string) => void;
  onToggleVisible: () => void;
};

function PasswordField({
  label,
  value,
  visible,
  onChangeText,
  onToggleVisible,
}: PasswordFieldProps) {
  return (
    <>
      <Text style={styles.label}>{label}</Text>
      <View style={styles.passwordInput}>
        <TextInput
          value={value}
          onChangeText={onChangeText}
          secureTextEntry={!visible}
          style={styles.passwordTextInput}
        />

        <Pressable onPress={onToggleVisible}>
          <Feather name={visible ? 'eye' : 'eye-off'} size={22} color="#B9B9B9" />
        </Pressable>
      </View>
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
});
