import { StyleSheet, Text, View } from 'react-native';

import { HandyHubColors } from '@/constants/theme';

type ReviewNoticeProps = {
  isLoggedIn: boolean;
};

export function ReviewNotice({ isLoggedIn }: ReviewNoticeProps) {
  return (
    <View style={styles.notice}>
      <Text style={styles.title}>Want to leave a review?</Text>

      <Text style={styles.text}>
        {isLoggedIn
          ? 'Only clients can leave reviews.'
          : 'Log in as a client to leave a review.'}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  notice: {
    padding: 16,
    borderRadius: 6,
    backgroundColor: HandyHubColors.surface,
    marginBottom: 24,
  },
  title: {
    fontSize: 16,
    fontWeight: '700',
    color: HandyHubColors.text,
    marginBottom: 6,
  },
  text: {
    fontSize: 13,
    lineHeight: 18,
    color: HandyHubColors.textSecondary,
  },
});
