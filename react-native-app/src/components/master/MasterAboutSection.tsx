import { StyleSheet, Text, View } from 'react-native';

import { HandyHubColors } from '@/constants/theme';

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
    color: HandyHubColors.text,
    marginBottom: 12,
  },
  aboutText: {
    fontSize: 13,
    lineHeight: 20,
    color: HandyHubColors.textSecondary,
  },
});
