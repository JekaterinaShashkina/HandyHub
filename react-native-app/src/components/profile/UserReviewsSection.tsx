import { StyleSheet, Text, View } from 'react-native';

import { HandyHubColors } from '@/constants/theme';
import type { UserReviewItem } from '@/ui/models';
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
    color: HandyHubColors.text,
  },
  emptyText: {
    paddingVertical: 12,
    fontSize: 14,
    color: HandyHubColors.muted,
  },
  reviewList: {
    gap: 10,
  },
});
