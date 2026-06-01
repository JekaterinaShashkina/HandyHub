import {
  StyleSheet,
  Text,
  type StyleProp,
  type TextStyle,
} from 'react-native';

import { HandyHubColors } from '@/constants/theme';

type FormMessageProps = {
  message: string;
  type: 'error' | 'success';
  style?: StyleProp<TextStyle>;
};

export function FormMessage({ message, type, style }: FormMessageProps) {
  if (!message) {
    return null;
  }

  return (
    <Text
      style={[
        styles.message,
        type === 'error' ? styles.error : styles.success,
        style,
      ]}
    >
      {message}
    </Text>
  );
}

const styles = StyleSheet.create({
  message: {
    fontSize: 13,
  },
  error: {
    color: HandyHubColors.error,
  },
  success: {
    color: HandyHubColors.success,
  },
});
