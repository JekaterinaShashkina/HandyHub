import { StyleSheet, Text, View } from 'react-native';

type MasterAboutSectionProps = {
  description: string;
};

export function MasterAboutSection({ description }: MasterAboutSectionProps) {
  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>About</Text>
      <Text style={styles.aboutText}>{description}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  section: {
    marginBottom: 22,
  },
  sectionTitle: {
    fontSize: 18,
    color: '#111111',
    marginBottom: 12,
  },
  aboutText: {
    fontSize: 13,
    lineHeight: 20,
    color: '#3F3F3F',
  },
});
