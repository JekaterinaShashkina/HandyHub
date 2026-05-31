import { Feather } from '@expo/vector-icons';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';

import { BackButton } from '@/components/common/BackButton';
import { FormMessage } from '@/components/common/FormMessage';
import { FormTextInput } from '@/components/common/FormTextInput';
import { PrimaryButton } from '@/components/common/PrimaryButton';
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
        <BackButton onPress={onBack} marginBottom={0} />

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
  errorText: {
    marginTop: 4,
  },
  successText: {
    marginTop: 4,
  },
});
