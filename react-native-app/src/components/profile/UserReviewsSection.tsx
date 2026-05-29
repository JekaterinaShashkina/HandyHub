import { StyleSheet, Text, View } from 'react-native';

import type { UserReviewItem } from '@/data/handyhub-data';
import { UserReviewCard } from '@/components/profile/UserReviewCard';

type UserReviewsSectionProps = {
  reviews: UserReviewItem[];
  onOpenMaster: (masterId: number) => void;
};

export function UserReviewsSection({
  reviews,
  onOpenMaster,
}: UserReviewsSectionProps) {
  return (
    <View style={styles.reviewsSection}>
      <Text style={styles.sectionTitle}>My reviews</Text>

      {reviews.length === 0 ? (
        <Text style={styles.emptyText}>You have not left any reviews yet.</Text>
      ) : (
        <View style={styles.reviewList}>
          {reviews.map((review) => (
            <UserReviewCard
              key={review.id}
              review={review}
              onOpenMaster={() => onOpenMaster(review.masterId)}
            />
          ))}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  reviewsSection: {
    marginTop: 28,
  },
  sectionTitle: {
    marginBottom: 12,
    fontSize: 18,
    fontWeight: '700',
    color: '#111111',
  },
  emptyText: {
    paddingVertical: 12,
    fontSize: 14,
    color: '#6B6B6B',
  },
  reviewList: {
    gap: 10,
  },
});
