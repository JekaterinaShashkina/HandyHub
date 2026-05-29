import { Feather } from '@expo/vector-icons';
import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import { useState } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import { MasterAboutSection } from '@/components/master/MasterAboutSection';
import { MasterProfileCard } from '@/components/master/MasterProfileCard';
import { MasterReviewsSection } from '@/components/master/MasterReviewsSection';
import { MasterServicesSection } from '@/components/master/MasterServicesSection';
import { ReviewForm } from '@/components/master/ReviewForm';
import { ReviewNotice } from '@/components/master/ReviewNotice';
import { canLeaveReview } from '@/data/handyhub-data';
import { useHandyHub } from '@/state/HandyHubContext';

export default function MasterDetailsScreen() {
  const router = useRouter();
  const params = useLocalSearchParams<{ id: string }>();
  const masterId = Number(params.id);
  const { currentUser, getMasterDetails, upsertReview } = useHandyHub();

  const [commentText, setCommentText] = useState('');
  const [selectedRating, setSelectedRating] = useState(0);
  const [reviewError, setReviewError] = useState('');
  const [showAllReviews, setShowAllReviews] = useState(false);

  const master = getMasterDetails(masterId);
  const reviewAllowed = canLeaveReview(currentUser);

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
  const currentUserReview = currentUser
    ? displayedReviews.find((review) => review.userId === currentUser.id)
      : undefined;

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

    const trimmedComment = commentText.trim();
    const currentUserName = `${currentUser.name} ${currentUser.surname}`.trim();
    const currentUserPhone = currentUser.phone.trim();

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
      user: currentUser,
      rating: selectedRating,
      comment: trimmedComment,
    });

    setCommentText('');
    setSelectedRating(0);
    setReviewError('');
  }

  return (
    <KeyboardAvoidingView
      style={styles.safeArea}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
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

        <MasterProfileCard
          master={master}
          ratingAvg={displayRatingAvg}
          reviewsCount={displayReviewsCount}
        />

        <MasterAboutSection description={master.description} />
        <MasterServicesSection services={activeServices} />
        <MasterReviewsSection
          reviews={visibleReviews}
          hasHiddenReviews={hasHiddenReviews}
          showAllReviews={showAllReviews}
          onToggleReviews={() => setShowAllReviews((value) => !value)}
        />

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
});
