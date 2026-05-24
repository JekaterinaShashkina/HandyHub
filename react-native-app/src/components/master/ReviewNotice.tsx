import { StyleSheet, Text, View } from 'react-native';

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
    backgroundColor: '#FFFFFF',
    marginBottom: 24,
  },
  title: {
    fontSize: 16,
    fontWeight: '700',
    color: '#111111',
    marginBottom: 6,
  },
  text: {
    fontSize: 13,
    lineHeight: 18,
    color: '#3F3F3F',
  },
});