import { useState } from 'react';
import { useHandyHub } from '@/state/HandyHubContext';
import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
  Image,
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import { RatingStars } from '@/components/common/RatingStars';
import {
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { ReviewCard } from '@/components/master/ReviewCard';
import { ReviewNotice } from '@/components/master/ReviewNotice';
import { ReviewForm } from '@/components/master/ReviewForm';
import {
  canLeaveReview,
} from '@/data/handyhub-data';




export default function MasterDetailsScreen() {
  const router = useRouter();
  const params = useLocalSearchParams<{ id: string }>();
  const masterId = Number(params.id);
  const { currentUser, getMasterDetails, upsertReview } = useHandyHub();

  const master = getMasterDetails(masterId);
  const reviewAllowed = canLeaveReview(currentUser);

    
    const [commentText, setCommentText] = useState('');
    const [selectedRating, setSelectedRating] = useState(0);
    const [reviewError, setReviewError] = useState('');
    const [showAllReviews, setShowAllReviews] = useState(false);

  if (!master) {
    return (
      <View style={styles.safeArea}>
        <Stack.Screen options={{ headerShown: false }} />

        <View style={styles.emptyState}>
          <Text style={styles.emptyTitle}>Specialist not found</Text>

          <Pressable style={styles.backIconButton} onPress={() => router.back()}>
            <Feather name="arrow-left" size={24} color="#111111" />
          </Pressable>
        </View>
      </View>
    );
  }
  const selectedMaster = master;
const activeServices = selectedMaster.services.filter((service) => service.isActive);
const displayedReviews = [...selectedMaster.reviews].sort(
  (firstReview, secondReview) =>
    new Date(secondReview.createdAt).getTime() -
    new Date(firstReview.createdAt).getTime()
);
const visibleReviews = showAllReviews
  ? displayedReviews
  : displayedReviews.slice(0, 3);
const hasHiddenReviews = displayedReviews.length > 3;

const currentUserId = currentUser?.id;

const currentUserReview =
  currentUserId === undefined
    ? undefined
    : displayedReviews.find((review) => review.userId === currentUserId);

const displayReviewsCount = displayedReviews.length;

const displayRatingAvg =
  displayedReviews.length > 0
    ? displayedReviews.reduce((sum, review) => sum + review.rating, 0) /
      displayedReviews.length
    : selectedMaster.ratingAvg;



function handlePublishReview() {
  if (!currentUser) {
    setReviewError('Log in as a client to leave a review.');
    return;
  }

  const user = currentUser;
  const trimmedComment = commentText.trim();
  const currentUserName = `${user.name} ${user.surname}`.trim();
  const currentUserPhone = user.phone.trim();

  if (!currentUserName) {
    setReviewError('User name is missing.');
    return;
  }

  if (!currentUserPhone) {
    setReviewError('User phone is missing.');
    return;
  }

  if (!trimmedComment) {
    setReviewError('Please write a comment.');
    return;
  }

  if (selectedRating === 0) {
    setReviewError('Please select a rating.');
    return;
  }

    upsertReview({
    masterId: selectedMaster.id,
    user,
    rating: selectedRating,
    comment: trimmedComment,
    });

    
  setCommentText('');
  setSelectedRating(0);
  setReviewError('');
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
    <KeyboardAvoidingView
        style={styles.safeArea} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={0}
    >
        <Stack.Screen options={{ headerShown: false }} />

        <ScrollView
        style={styles.container}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
        keyboardDismissMode="interactive"
        >
        <Pressable style={styles.backIconButton} onPress={() => router.back()}>
          <Feather name="arrow-left" size={24} color="#111111" />
        </Pressable>

        <View style={styles.profileCard}>
          <View style={styles.profileTop}>
            <View style={styles.avatar}>
              {selectedMaster.avatarUrl ? (
                <Image source={{ uri: selectedMaster.avatarUrl }} style={styles.avatarImage} />
              ) : (
                <Text style={styles.avatarText}>
                  {selectedMaster.fullName.charAt(0).toUpperCase()}
                </Text>
              )}
            </View>

            <Text style={styles.price}>from {master.priceFrom} EUR</Text>
          </View>

          <Text style={styles.category}>{master.categoryName}</Text>

          <View style={styles.nameRatingRow}>
            <Text style={styles.masterName}>{master.fullName}</Text>

            <View style={styles.ratingWithReviews}>
              <RatingStars rating={displayRatingAvg} />
              <CommentIcon />
              <Text style={styles.reviewsCount}>{displayReviewsCount}</Text>
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
          <Text style={styles.sectionTitle}>Services</Text>

          <View style={styles.servicesList}>
            {activeServices.map((service) => (
              <View key={service.id} style={styles.serviceCard}>
                <View style={styles.serviceHeader}>
                  <Text style={styles.serviceTitle}>{service.title}</Text>
                  <Text style={styles.servicePrice}>
                    {service.priceType} {service.price} EUR
                  </Text>
                </View>

                <Text style={styles.serviceCategory}>{service.categoryName}</Text>
                <Text style={styles.serviceDescription}>
                  {service.description}
                </Text>
                <Text style={styles.serviceDuration}>
                  {service.durationMin} min
                </Text>
              </View>
            ))}

            {activeServices.length === 0 && (
              <Text style={styles.emptyText}>No active services</Text>
            )}
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Reviews</Text>

          <View style={styles.reviewList}>
            {visibleReviews.map((review) => (
            <ReviewCard key={review.id} review={review} />
            ))}

            {displayedReviews.length === 0 && (
              <Text style={styles.emptyText}>No reviews yet</Text>
            )}
          </View>

          {hasHiddenReviews && (
            <Pressable
              style={styles.allReviewsButton}
              onPress={() => setShowAllReviews((value) => !value)}
            >
              <Text style={styles.allReviewsText}>
                {showAllReviews ? 'Hide reviews' : 'All reviews'}
              </Text>
            </Pressable>
          )}
        </View>

        {reviewAllowed && currentUser ? (
        <ReviewForm
            currentUser={currentUser}
            currentUserReview={currentUserReview}
            commentText={commentText}
            selectedRating={selectedRating}
            reviewError={reviewError}
            onCommentChange={(value) => {
            setCommentText(value);
            setReviewError('');
            }}
            onRatingChange={(rating) => {
            setSelectedRating(rating);
            setReviewError('');
            }}
            onSubmit={handlePublishReview}
        />
        ) : (
        <ReviewNotice isLoggedIn={Boolean(currentUser)} />
        )}

      </ScrollView>
    </KeyboardAvoidingView>
  );
}




const styles = StyleSheet.create({
    
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
  backIconButton: {
    width: 42,
    height: 42,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
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
  servicesList: {
    gap: 10,
  },
  serviceCard: {
    padding: 14,
    borderRadius: 6,
    backgroundColor: '#FFFFFF',
  },
  serviceHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    gap: 12,
    marginBottom: 6,
  },
  serviceTitle: {
    flex: 1,
    fontSize: 15,
    fontWeight: '700',
    color: '#111111',
  },
  servicePrice: {
    fontSize: 14,
    fontWeight: '700',
    color: '#111111',
  },
  serviceCategory: {
    marginBottom: 6,
    fontSize: 13,
    color: '#5368C9',
  },
  serviceDescription: {
    fontSize: 13,
    lineHeight: 19,
    color: '#3F3F3F',
  },
  serviceDuration: {
    marginTop: 8,
    fontSize: 13,
    color: '#6B6B6B',
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
    color: '#111111',
    textDecorationLine: 'underline',
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
  avatarImage: {
  width: '100%',
  height: '100%',
  borderRadius: 23,
},




});
