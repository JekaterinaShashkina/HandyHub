import { StyleSheet, Text, View } from 'react-native';

import { BackButton } from '@/components/common/BackButton';
import { PrimaryButton } from '@/components/common/PrimaryButton';
import { HandyHubColors } from '@/constants/theme';

type AddMasterNoticeProps = {
  onBack: () => void;
};

export function AddMasterNotice({ onBack }: AddMasterNoticeProps) {
  return (
    <View style={styles.notice}>
      <BackButton onPress={onBack} marginBottom={14} />

      <Text style={styles.noticeTitle}>Specialist registration</Text>
      <Text style={styles.noticeText}>
        Only users with a master role can register a specialist profile.
      </Text>

      <PrimaryButton title="Back" onPress={onBack} />
    </View>
  );
}

const styles = StyleSheet.create({
  notice: {
    margin: 16,
    padding: 16,
    borderRadius: 8,
    backgroundColor: HandyHubColors.surface,
  },
  noticeTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: HandyHubColors.text,
    marginBottom: 8,
  },
  noticeText: {
    fontSize: 14,
    lineHeight: 20,
    color: HandyHubColors.textSecondary,
    marginBottom: 16,
  },
});
