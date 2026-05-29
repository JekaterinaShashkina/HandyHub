import { Feather } from '@expo/vector-icons';
import { Image, Pressable, StyleSheet, Text, TextInput, View } from 'react-native';

import { HandyHubColors } from '@/constants/theme';

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
      <View style={styles.header}>
        <Pressable style={styles.backIconButton} onPress={onBack}>
          <Feather name="arrow-left" size={24} color={HandyHubColors.text} />
        </Pressable>

        <Text style={styles.title}>Edit profile</Text>

        <View style={styles.headerSpacer} />
      </View>

      <View style={styles.avatarBlock}>
        {avatarUri ? (
          <Image source={{ uri: avatarUri }} style={styles.avatarPreview} />
        ) : (
          <View style={styles.avatarFallback}>
            <Feather name="user" size={34} color={HandyHubColors.text} />
          </View>
        )}

        <Pressable style={styles.uploadButton} onPress={onPickAvatar}>
          <Text style={styles.uploadButtonText}>
            {avatarUri ? 'Change avatar' : 'Upload avatar'}
          </Text>
        </Pressable>
      </View>

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

      {error ? <Text style={styles.errorText}>{error}</Text> : null}
      {successMessage ? (
        <Text style={styles.successText}>{successMessage}</Text>
      ) : null}

      <Pressable style={styles.submitButton} onPress={onSubmit}>
        <Text style={styles.submitButtonText}>Save changes</Text>
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
    color: HandyHubColors.text,
    textAlign: 'center',
  },
  avatarBlock: {
    alignItems: 'center',
    marginBottom: 24,
  },
  avatarPreview: {
    width: 92,
    height: 92,
    borderRadius: 46,
    backgroundColor: HandyHubColors.avatarBackground,
    marginBottom: 12,
  },
  avatarFallback: {
    width: 92,
    height: 92,
    borderRadius: 46,
    backgroundColor: HandyHubColors.avatarBackground,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  uploadButton: {
    minHeight: 34,
    paddingHorizontal: 18,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#16D83E',
    backgroundColor: HandyHubColors.surface,
    alignItems: 'center',
    justifyContent: 'center',
  },
  uploadButtonText: {
    fontSize: 14,
    color: HandyHubColors.text,
  },
  label: {
    fontSize: 13,
    color: HandyHubColors.textSecondary,
    marginBottom: 5,
  },
  input: {
    minHeight: 43,
    borderRadius: 8,
    backgroundColor: HandyHubColors.surface,
    paddingHorizontal: 13,
    fontSize: 15,
    color: HandyHubColors.text,
    marginBottom: 8,
  },
  errorText: {
    fontSize: 13,
    color: HandyHubColors.error,
    marginTop: 4,
  },
  successText: {
    fontSize: 13,
    color: HandyHubColors.success,
    marginTop: 4,
  },
  submitButton: {
    alignSelf: 'flex-end',
    minHeight: 38,
    borderRadius: 4,
    backgroundColor: HandyHubColors.primary,
    paddingHorizontal: 22,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },
  submitButtonText: {
    fontSize: 14,
    color: HandyHubColors.text,
  },
});
