import { Feather } from '@expo/vector-icons';
import { Image, StyleSheet, Text, View } from 'react-native';

import { RatingStars } from '@/components/common/RatingStars';
import type { MasterDetails } from '@/data/handyhub-data';

type MasterProfileCardProps = {
  master: MasterDetails;
  ratingAvg: number;
  reviewsCount: number;
};

export function MasterProfileCard({
  master,
  ratingAvg,
  reviewsCount,
}: MasterProfileCardProps) {
  return (
    <View style={styles.profileCard}>
      <View style={styles.profileTop}>
        <View style={styles.avatar}>
          {master.avatarUrl ? (
            <Image source={{ uri: master.avatarUrl }} style={styles.avatarImage} />
          ) : (
            <Text style={styles.avatarText}>
              {master.fullName.charAt(0).toUpperCase()}
            </Text>
          )}
        </View>

        <Text style={styles.price}>from {master.priceFrom} EUR</Text>
      </View>

      <Text style={styles.category}>{master.categoryName}</Text>

      <View style={styles.nameRatingRow}>
        <Text style={styles.masterName}>{master.fullName}</Text>

        <View style={styles.ratingWithReviews}>
          <RatingStars rating={ratingAvg} />
          <Feather name="message-circle" size={16} color="#111111" />
          <Text style={styles.reviewsCount}>{reviewsCount}</Text>
        </View>
      </View>

      <View style={styles.contactRow}>
        <Feather name="phone" size={20} color="#5368C9" />
        <Text style={styles.contactText}>{master.phone}</Text>
      </View>

      <View style={styles.contactRow}>
        <Feather name="mail" size={20} color="#5368C9" />
        <Text style={styles.contactText}>{master.email}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  profileCard: {
    padding: 16,
    borderRadius: 6,
    backgroundColor: '#FFFFFF',
    marginBottom: 22,
  },
  profileTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 10,
  },
  avatar: {
    width: 46,
    height: 46,
    borderRadius: 23,
    backgroundColor: '#D9DCE5',
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarImage: {
    width: '100%',
    height: '100%',
    borderRadius: 23,
  },
  avatarText: {
    fontSize: 20,
    fontWeight: '800',
    color: '#111111',
  },
  price: {
    fontSize: 17,
    color: '#111111',
    marginTop: 6,
  },
  category: {
    fontSize: 17,
    color: '#111111',
    marginBottom: 10,
  },
  nameRatingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 18,
  },
  masterName: {
    flex: 1,
    fontSize: 14,
    color: '#4B4B4B',
  },
  ratingWithReviews: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  reviewsCount: {
    fontSize: 13,
    color: '#111111',
  },
  contactRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 7,
    gap: 10,
  },
  contactText: {
    fontSize: 13,
    color: '#3B3B3B',
  },
});
