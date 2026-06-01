import { Feather } from '@expo/vector-icons';
import { StyleSheet, TextInput, View } from 'react-native';

import { HandyHubColors } from '@/constants/theme';

type SearchBarProps = {
  value: string;
  onChangeText: (value: string) => void;
};

export function SearchBar({ value, onChangeText }: SearchBarProps) {
  return (
    <View style={styles.container}>
      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder="Search specialist"
        placeholderTextColor={HandyHubColors.inputPlaceholder}
        style={styles.input}
      />

      <Feather name="search" size={28} color={HandyHubColors.text} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 52,
    borderRadius: 6,
    backgroundColor: HandyHubColors.surface,
    paddingLeft: 18,
    paddingRight: 16,
    marginBottom: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    flex: 1,
    height: '100%',
    fontSize: 16,
    color: HandyHubColors.text,
    padding: 0,
  },
});
