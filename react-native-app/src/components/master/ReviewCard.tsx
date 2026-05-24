import { StyleSheet, Text, View } from 'react-native';

import { RatingStars } from '@/components/common/RatingStars';
import type { MasterDetails } from '@/data/handyhub-data';

type ReviewItem = MasterDetails['reviews'][number];

type ReviewCardProps = {
  review: ReviewItem;
};

export function ReviewCard({ review }: ReviewCardProps) {
  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <Text style={styles.author}>{review.authorName}</Text>
        <RatingStars rating={review.rating} />
      </View>

      <Text style={styles.comment} numberOfLines={2}>
        {review.comment}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    paddingHorizontal: 14,
    paddingVertical: 12,
    borderRadius: 6,
    backgroundColor: '#FFFFFF',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  author: {
    flex: 1,
    fontSize: 14,
    color: '#111111',
  },
  comment: {
    fontSize: 13,
    lineHeight: 18,
    color: '#3F3F3F',
  },
});