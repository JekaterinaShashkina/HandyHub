import {
  StyleSheet,
  Text,
  TextInput,
  type KeyboardTypeOptions,
  type StyleProp,
  type TextStyle,
} from 'react-native';

import { HandyHubColors } from '@/constants/theme';

type FormTextInputProps = {
  label: string;
  value: string;
  onChangeText: (value: string) => void;
  keyboardType?: KeyboardTypeOptions;
  multiline?: boolean;
  placeholder?: string;
  inputStyle?: StyleProp<TextStyle>;
};

export function FormTextInput({
  label,
  value,
  onChangeText,
  keyboardType = 'default',
  multiline = false,
  placeholder,
  inputStyle,
}: FormTextInputProps) {
  return (
    <>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        value={value}
        onChangeText={onChangeText}
        keyboardType={keyboardType}
        autoCapitalize={keyboardType === 'email-address' ? 'none' : 'sentences'}
        multiline={multiline}
        placeholder={placeholder}
        style={[styles.input, multiline && styles.multilineInput, inputStyle]}
        textAlignVertical={multiline ? 'top' : 'center'}
      />
    </>
  );
}

const styles = StyleSheet.create({
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
  multilineInput: {
    paddingTop: 12,
  },
});
