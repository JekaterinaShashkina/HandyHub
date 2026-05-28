import { useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { RatingStars } from '@/components/common/RatingStars';
import type { MasterDetails } from '@/data/handyhub-data';

type ReviewItem = MasterDetails['reviews'][number];

type ReviewCardProps = {
  review: ReviewItem;
};

const COLLAPSED_LINES = 2;

export function ReviewCard({ review }: ReviewCardProps) {
  const [expanded, setExpanded] = useState(false);
  const [lineCount, setLineCount] = useState(0);

  const isLongComment = lineCount > COLLAPSED_LINES;

  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <Text style={styles.author}>{review.authorName}</Text>
        <RatingStars rating={review.rating} />
      </View>

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
          style={styles.comment}
          numberOfLines={expanded ? undefined : COLLAPSED_LINES}
        >
          {review.comment}
        </Text>
      </View>

      {isLongComment && (
        <Pressable onPress={() => setExpanded((value) => !value)}>
          <Text style={styles.toggleText}>
            {expanded ? 'Collapse' : 'Expand'}
          </Text>
        </Pressable>
      )}
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
  hiddenMeasureText: {
    position: 'absolute',
    opacity: 0,
    zIndex: -1,
    fontSize: 13,
    lineHeight: 18,
    color: '#3F3F3F',
  },
  comment: {
    fontSize: 13,
    lineHeight: 18,
    color: '#3F3F3F',
  },
  toggleText: {
    alignSelf: 'flex-start',
    fontSize: 13,
    color: '#111111',
    textDecorationLine: 'underline',
    marginTop: 2,
  },
});