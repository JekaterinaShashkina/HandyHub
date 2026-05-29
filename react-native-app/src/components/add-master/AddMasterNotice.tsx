import { Pressable, StyleSheet, Text, View } from 'react-native';

type AddMasterNoticeProps = {
  onBack: () => void;
};

export function AddMasterNotice({ onBack }: AddMasterNoticeProps) {
  return (
    <View style={styles.notice}>
      <Pressable style={styles.backButtonLight} onPress={onBack}>
        <Text style={styles.backButtonLightText}>Back</Text>
      </Pressable>

      <Text style={styles.noticeTitle}>Specialist registration</Text>
      <Text style={styles.noticeText}>
        Only users with a master role can register a specialist profile.
      </Text>

      <Pressable style={styles.backButton} onPress={onBack}>
        <Text style={styles.backButtonText}>Back</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  notice: {
    margin: 16,
    padding: 16,
    borderRadius: 8,
    backgroundColor: '#FFFFFF',
  },
  noticeTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#111111',
    marginBottom: 8,
  },
  noticeText: {
    fontSize: 14,
    lineHeight: 20,
    color: '#3F3F3F',
    marginBottom: 16,
  },
  backButton: {
    alignSelf: 'flex-start',
    minHeight: 36,
    borderRadius: 18,
    backgroundColor: '#FFD51E',
    paddingHorizontal: 18,
    alignItems: 'center',
    justifyContent: 'center',
  },
  backButtonText: {
    fontSize: 14,
    color: '#111111',
  },
  backButtonLight: {
    alignSelf: 'flex-start',
    minHeight: 38,
    paddingHorizontal: 14,
    borderRadius: 19,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 14,
  },
  backButtonLightText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#111111',
  },
});
