import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import { RatingStars } from '@/components/common/RatingStars';
import {
  canLeaveReview,
  currentUser,
  getMasterDetails,
} from '@/data/handyhub-data';

export default function MasterDetailsScreen() {
  const router = useRouter();
  const params = useLocalSearchParams<{ id: string }>();
  const masterId = Number(params.id);
  const master = getMasterDetails(masterId);
  const reviewAllowed = canLeaveReview(currentUser);


  if (!master) {
    return (
      <View style={styles.safeArea}>
        <Stack.Screen options={{ headerShown: false }} />

        <View style={styles.emptyState}>
          <Text style={styles.emptyTitle}>Specialist not found</Text>

          <Pressable style={styles.publishButton} onPress={() => router.back()}>
            <Text style={styles.publishButtonText}>Go back</Text>
          </Pressable>
        </View>
      </View>
    );
  }

function CommentIcon() {
  return <Feather name="message-circle" size={16} color="#111111" />;
}

function PhoneIcon() {
  return <Feather name="phone" size={20} color="#5368C9" />;
}

function MailIcon() {
  return <Feather name="mail" size={20} color="#5368C9" />;
}

  return (
    <View style={styles.safeArea}>
      <Stack.Screen options={{ headerShown: false }} />

      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <Pressable style={styles.backButton} onPress={() => router.back()}>
          <Text style={styles.backButtonText}>Back</Text>
        </Pressable>

        <View style={styles.profileCard}>
          <View style={styles.profileTop}>
            <View style={styles.avatar}>
              <Text style={styles.avatarText}>
                {master.fullName.charAt(0).toUpperCase()}
              </Text>
            </View>

            <Text style={styles.price}>from {master.priceFrom} EUR</Text>
          </View>

          <Text style={styles.category}>{master.categoryName}</Text>

          <View style={styles.nameRatingRow}>
            <Text style={styles.masterName}>{master.fullName}</Text>

            <View style={styles.ratingWithReviews}>
              <RatingStars rating={master.ratingAvg} />
              <CommentIcon />
              <Text style={styles.reviewsCount}>{master.reviewsCount}</Text>
            </View>
          </View>

          <View style={styles.contactRow}>
            <PhoneIcon />
            <Text style={styles.contactText}>{master.phone}</Text>
          </View>

          <View style={styles.contactRow}>
            <MailIcon />
            <Text style={styles.contactText}>{master.email}</Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>About</Text>
          <Text style={styles.aboutText}>{master.description}</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Reviews</Text>

          <View style={styles.reviewList}>
            {master.reviews.map((review) => (
              <View key={review.id} style={styles.reviewCard}>
                <View style={styles.reviewHeader}>
                  <Text style={styles.reviewAuthor}>{review.authorName}</Text>
                  <RatingStars rating={review.rating} />
                </View>

                <Text style={styles.reviewComment} numberOfLines={2}>
                  {review.comment}
                </Text>
              </View>
            ))}

            {master.reviews.length === 0 && (
              <Text style={styles.emptyText}>No reviews yet</Text>
            )}
          </View>

          <Pressable style={styles.allReviewsButton}>
            <Text style={styles.allReviewsText}>All reviews</Text>
          </Pressable>
        </View>

        {reviewAllowed ? (
  <View style={styles.form}>
    <Text style={styles.inputLabel}>Name</Text>
    <TextInput
      style={styles.input}
      value={
        currentUser
          ? `${currentUser.name} ${currentUser.surname}`.trim()
          : ''
      }
      editable={false}
    />

    <Text style={styles.inputLabel}>Phone</Text>
    <TextInput
      style={styles.input}
      value={currentUser?.phone ?? ''}
      editable={false}
      keyboardType="phone-pad"
    />

    <Text style={styles.inputLabel}>Comment</Text>
    <TextInput
      style={[styles.input, styles.commentInput]}
      multiline
      textAlignVertical="top"
    />

    <Pressable style={styles.publishButton}>
      <Text style={styles.publishButtonText}>Publish review</Text>
    </Pressable>

    <View style={styles.formStars}>
      <RatingStars rating={0} />
    </View>
  </View>
) : (
  <View style={styles.reviewNotice}>
    <Text style={styles.reviewNoticeTitle}>Want to leave a review?</Text>

    <Text style={styles.reviewNoticeText}>
      {currentUser
        ? 'Only clients can leave reviews.'
        : 'Log in as a client to leave a review.'}
    </Text>
  </View>
)}

      </ScrollView>
    </View>
  );
}


const styles = StyleSheet.create({
    reviewNotice: {
  padding: 16,
  borderRadius: 6,
  backgroundColor: '#FFFFFF',
  marginBottom: 24,
},
reviewNoticeTitle: {
  fontSize: 16,
  fontWeight: '700',
  color: '#111111',
  marginBottom: 6,
},
reviewNoticeText: {
  fontSize: 13,
  lineHeight: 18,
  color: '#3F3F3F',
},
  safeArea: {
    flex: 1,
    backgroundColor: '#F4F4F8',
    paddingTop: 40,
  },
  container: {
    flex: 1,
  },
  content: {
    paddingHorizontal: 16,
    paddingBottom: 28,
  },
  backButton: {
    alignSelf: 'flex-start',
    minHeight: 38,
    paddingHorizontal: 14,
    borderRadius: 19,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 14,
  },
  backButtonText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#111111',
  },
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
  
  section: {
    marginBottom: 22,
  },
  sectionTitle: {
    fontSize: 18,
    color: '#111111',
    marginBottom: 12,
  },
  aboutText: {
    fontSize: 13,
    lineHeight: 20,
    color: '#3F3F3F',
  },
  reviewList: {
    gap: 10,
  },
  reviewCard: {
    paddingHorizontal: 14,
    paddingVertical: 12,
    borderRadius: 6,
    backgroundColor: '#FFFFFF',
  },
  reviewHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  reviewAuthor: {
    flex: 1,
    fontSize: 14,
    color: '#111111',
  },
  reviewComment: {
    fontSize: 13,
    lineHeight: 18,
    color: '#3F3F3F',
  },
  allReviewsButton: {
    alignSelf: 'flex-end',
    marginTop: 8,
  },
  allReviewsText: {
    fontSize: 13,
    color: '#111111',
    textDecorationLine: 'underline',
  },
  form: {
    paddingBottom: 24,
  },
  inputLabel: {
    fontSize: 13,
    color: '#3F3F3F',
    marginBottom: 5,
  },
  input: {
    minHeight: 44,
    borderRadius: 6,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 14,
    fontSize: 15,
    color: '#111111',
    marginBottom: 10,
  },
  commentInput: {
    minHeight: 74,
    paddingTop: 12,
  },
  publishButton: {
    alignSelf: 'flex-end',
    minHeight: 34,
    borderRadius: 4,
    backgroundColor: '#FFD51E',
    paddingHorizontal: 18,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },
  publishButtonText: {
    fontSize: 13,
    color: '#111111',
  },
  formStars: {
    alignSelf: 'flex-end',
    marginTop: 16,
  },
  
  emptyText: {
    paddingVertical: 12,
    color: '#6B6B6B',
  },
  emptyState: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  emptyTitle: {
    fontSize: 22,
    fontWeight: '800',
    color: '#111111',
    marginBottom: 16,
  },
  contactEmojiIcon: {
  width: 20,
  fontSize: 18,
  color: '#5368C9',
  textAlign: 'center',
},
});