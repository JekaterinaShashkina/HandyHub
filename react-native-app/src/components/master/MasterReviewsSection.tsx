import { Pressable, StyleSheet, Text, View } from 'react-native';

import { ReviewCard } from '@/components/master/ReviewCard';
import { HandyHubColors } from '@/constants/theme';
import type { MasterDetails } from '@/data/handyhub-data';

type ReviewItem = MasterDetails['reviews'][number];

type MasterReviewsSectionProps = {
  reviews: ReviewItem[];
  hasHiddenReviews: boolean;
  showAllReviews: boolean;
  onToggleReviews: () => void;
};

export function MasterReviewsSection({
  reviews,
  hasHiddenReviews,
  showAllReviews,
  onToggleReviews,
}: MasterReviewsSectionProps) {
  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Reviews</Text>

      <View style={styles.reviewList}>
        {reviews.map((review) => (
          <ReviewCard key={review.id} review={review} />
        ))}

        {reviews.length === 0 && (
          <Text style={styles.emptyText}>No reviews yet</Text>
        )}
      </View>

      {hasHiddenReviews && (
        <Pressable style={styles.allReviewsButton} onPress={onToggleReviews}>
          <Text style={styles.allReviewsText}>
            {showAllReviews ? 'Hide reviews' : 'All reviews'}
          </Text>
        </Pressable>
      )}
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
  reviewList: {
    gap: 10,
  },
  allReviewsButton: {
    alignSelf: 'flex-end',
    marginTop: 8,
  },
  allReviewsText: {
    fontSize: 13,
    color: HandyHubColors.text,
    textDecorationLine: 'underline',
  },
  emptyText: {
    paddingVertical: 12,
    color: HandyHubColors.muted,
  },
});
