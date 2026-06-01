import {
  Pressable,
  StyleSheet,
  Text,
  type StyleProp,
  type ViewStyle,
} from 'react-native';

import { HandyHubColors } from '@/constants/theme';

type PrimaryButtonProps = {
  title: string;
  onPress: () => void;
  fullWidth?: boolean;
  size?: 'compact' | 'medium' | 'large';
  style?: StyleProp<ViewStyle>;
};

export function PrimaryButton({
  title,
  onPress,
  fullWidth = false,
  size = 'compact',
  style,
}: PrimaryButtonProps) {
  return (
    <Pressable
      style={[
        styles.button,
        size === 'medium' && styles.mediumButton,
        size === 'large' && styles.largeButton,
        fullWidth ? styles.fullWidth : styles.alignEnd,
        style,
      ]}
      onPress={onPress}
    >
      <Text style={[styles.text, size === 'large' && styles.largeText]}>
        {title}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    minHeight: 34,
    borderRadius: 4,
    backgroundColor: HandyHubColors.primary,
    paddingHorizontal: 22,
    alignItems: 'center',
    justifyContent: 'center',
  },
  mediumButton: {
    minHeight: 38,
  },
  largeButton: {
    minHeight: 48,
    borderRadius: 6,
  },
  fullWidth: {
    alignSelf: 'stretch',
  },
  alignEnd: {
    alignSelf: 'flex-end',
  },
  text: {
    fontSize: 14,
    color: HandyHubColors.text,
  },
  largeText: {
    fontSize: 16,
    fontWeight: '600',
  },
});
