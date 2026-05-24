import { Feather } from '@expo/vector-icons';
import { StyleSheet, TextInput, View } from 'react-native';

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
        placeholderTextColor="#B9B9B9"
        style={styles.input}
      />

      <Feather name="search" size={28} color="#111111" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 52,
    borderRadius: 6,
    backgroundColor: '#FFFFFF',
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
    color: '#111111',
    padding: 0,
  },
});