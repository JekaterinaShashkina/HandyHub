import { useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { RatingStars } from '@/components/common/RatingStars';
import { HandyHubColors } from '@/constants/theme';
import type { UserReviewItem } from '@/ui/models';

type UserReviewCardProps = {
  review: UserReviewItem;
  onOpenMaster: () => void;
};

const COLLAPSED_REVIEW_LINES = 2;

export function UserReviewCard({ review, onOpenMaster }: UserReviewCardProps) {
  const [expanded, setExpanded] = useState(false);
  const [lineCount, setLineCount] = useState(0);

  const isLongComment = lineCount > COLLAPSED_REVIEW_LINES;

  return (
    <View style={styles.reviewCard}>
      <View style={styles.reviewHeader}>
        <View style={styles.reviewTitleBlock}>
          <Text style={styles.reviewLabel}>Review for</Text>
          <Text style={styles.reviewMasterName}>{review.masterName}</Text>
          <Text style={styles.reviewCategory}>{review.categoryName}</Text>
        </View>

        <RatingStars rating={review.rating} />
      </View>

      <Text style={styles.myCommentLabel}>My comment</Text>

      <View>
        <Text
          style={styles.hiddenMeasureText}
          onTextLayout={(event) => {
            setLineCount(event.nativeEvent.lines.length);
          }}
        >
          {review.comment}
        </Text>

        <Text
          style={styles.reviewComment}
          numberOfLines={expanded ? undefined : COLLAPSED_REVIEW_LINES}
        >
          {review.comment}
        </Text>
      </View>

      {isLongComment && (
        <Pressable onPress={() => setExpanded((value) => !value)}>
          <Text style={styles.expandText}>
            {expanded ? 'Hide' : 'Show more'}
          </Text>
        </Pressable>
      )}

      <Pressable style={styles.openMasterButton} onPress={onOpenMaster}>
        <Text style={styles.openMasterText}>Open master</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  reviewCard: {
    padding: 14,
    borderRadius: 8,
    backgroundColor: HandyHubColors.surface,
  },
  reviewHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    gap: 12,
    marginBottom: 8,
  },
  reviewTitleBlock: {
    flex: 1,
  },
  reviewLabel: {
    marginBottom: 2,
    fontSize: 12,
    color: HandyHubColors.muted,
  },
  reviewMasterName: {
    fontSize: 15,
    fontWeight: '700',
    color: HandyHubColors.text,
  },
  reviewCategory: {
    marginTop: 2,
    fontSize: 13,
    color: HandyHubColors.muted,
  },
  myCommentLabel: {
    marginBottom: 4,
    fontSize: 12,
    fontWeight: '700',
    color: HandyHubColors.muted,
  },
  hiddenMeasureText: {
    position: 'absolute',
    opacity: 0,
    zIndex: -1,
    fontSize: 14,
    lineHeight: 20,
    color: HandyHubColors.textSecondary,
  },
  reviewComment: {
    fontSize: 14,
    lineHeight: 20,
    color: HandyHubColors.textSecondary,
  },
  expandText: {
    marginTop: 4,
    fontSize: 13,
    color: HandyHubColors.text,
    textDecorationLine: 'underline',
  },
  openMasterButton: {
    alignSelf: 'flex-end',
    marginTop: 10,
  },
  openMasterText: {
    fontSize: 13,
    color: HandyHubColors.text,
    textDecorationLine: 'underline',
  },
});
