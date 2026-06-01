import { Feather } from '@expo/vector-icons';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';

import { RatingStars } from '@/components/common/RatingStars';
import { HandyHubColors } from '@/constants/theme';
import type { MasterCardItem } from '@/ui/models';

type MasterCardProps = {
  master: MasterCardItem;
  onPress: () => void;
};

export function MasterCard({ master, onPress }: MasterCardProps) {
  return (
    <Pressable style={styles.masterCard} onPress={onPress}>
      <View style={styles.leftColumn}>
        <View style={styles.avatar}>
          {master.avatarUrl ? (
            <Image source={{ uri: master.avatarUrl }} style={styles.avatarImage} />
          ) : (
            <Text style={styles.avatarText}>
              {master.fullName.charAt(0).toUpperCase()}
            </Text>
          )}
        </View>

        <Text style={styles.masterCategory}>{master.categoryName}</Text>
        <Text style={styles.masterName}>{master.fullName}</Text>
      </View>

      <View style={styles.rightColumn}>
        <View style={styles.priceRow}>
          <Text style={styles.pricePrefix}>from</Text>
          <Text style={styles.priceValue}>{master.priceFrom} EUR</Text>
        </View>

        <View style={styles.ratingRow}>
          <RatingStars rating={master.ratingAvg} />

          <View style={styles.reviewsRow}>
            <CommentIcon />
            <Text style={styles.reviews}>{master.reviewsCount}</Text>
          </View>
        </View>
      </View>
    </Pressable>
  );
}

function CommentIcon() {
  return (
    <Feather name="message-circle" size={16} color={HandyHubColors.text} />
  );
}

const styles = StyleSheet.create({
  masterCard: {
    minHeight: 172,
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 16,
    borderRadius: 20,
    backgroundColor: HandyHubColors.surface,
  },
  leftColumn: {
    alignItems: 'center',
    width: 120,
  },
  avatar: {
    width: 84,
    height: 84,
    borderRadius: 42,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: HandyHubColors.avatarBackground,
    marginBottom: 12,
  },
  avatarText: {
    fontSize: 30,
    fontWeight: '800',
    color: HandyHubColors.text,
  },
  masterCategory: {
    fontSize: 16,
    fontWeight: '700',
    color: HandyHubColors.text,
    textAlign: 'center',
  },
  masterName: {
    fontSize: 14,
    color: HandyHubColors.muted,
    textAlign: 'center',
    marginTop: 4,
  },
  rightColumn: {
    flex: 1,
    alignItems: 'flex-end',
    justifyContent: 'space-between',
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  reviewsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  reviews: {
    fontSize: 14,
    color: HandyHubColors.text,
  },
  priceRow: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    gap: 4,
  },
  pricePrefix: {
    fontSize: 13,
    lineHeight: 18,
    color: HandyHubColors.muted,
  },
  priceValue: {
    fontSize: 24,
    lineHeight: 24,
    fontWeight: '700',
    color: HandyHubColors.text,
  },
  avatarImage: {
    width: '100%',
    height: '100%',
    borderRadius: 42,
  },
});
