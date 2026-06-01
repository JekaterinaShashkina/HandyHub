import { Feather } from '@expo/vector-icons';
import { Pressable, StyleSheet } from 'react-native';

import { HandyHubColors } from '@/constants/theme';

type BackButtonProps = {
  onPress: () => void;
  marginBottom?: number;
};

export function BackButton({ onPress, marginBottom = 8 }: BackButtonProps) {
  return (
    <Pressable
      style={[styles.button, { marginBottom }]}
      onPress={onPress}
    >
      <Feather name="arrow-left" size={24} color={HandyHubColors.text} />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    width: 42,
    height: 42,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
