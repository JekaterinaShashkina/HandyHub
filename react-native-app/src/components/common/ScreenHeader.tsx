import { StyleSheet, Text, View } from 'react-native';

import { BackButton } from '@/components/common/BackButton';
import { HandyHubColors } from '@/constants/theme';

type ScreenHeaderProps = {
  title: string;
  onBack: () => void;
};

export function ScreenHeader({ title, onBack }: ScreenHeaderProps) {
  return (
    <View style={styles.header}>
      <BackButton onPress={onBack} marginBottom={0} />

      <Text style={styles.title}>{title}</Text>

      <View style={styles.headerSpacer} />
    </View>
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
});
