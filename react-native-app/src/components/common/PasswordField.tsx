import { Feather } from '@expo/vector-icons';
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';

import { HandyHubColors } from '@/constants/theme';

type PasswordFieldProps = {
  label: string;
  value: string;
  visible: boolean;
  onChangeText: (value: string) => void;
  onToggleVisible: () => void;
};

export function PasswordField({
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
  label: {
    fontSize: 13,
    color: HandyHubColors.textSecondary,
    marginBottom: 5,
  },
  passwordInput: {
    minHeight: 43,
    borderRadius: 8,
    backgroundColor: HandyHubColors.surface,
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
    color: HandyHubColors.text,
    padding: 0,
  },
});
