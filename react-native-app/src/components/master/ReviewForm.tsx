import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';

import { InteractiveRating } from '@/components/master/InteractiveRating';
import type { MasterDetails, User } from '@/data/handyhub-data';

type ReviewItem = MasterDetails['reviews'][number];

type ReviewFormProps = {
  currentUser: User;
  currentUserReview?: ReviewItem;
  commentText: string;
  selectedRating: number;
  reviewError: string;
  onCommentChange: (value: string) => void;
  onRatingChange: (rating: number) => void;
  onSubmit: () => void;
};

export function ReviewForm({
  currentUser,
  currentUserReview,
  commentText,
  selectedRating,
  reviewError,
  onCommentChange,
  onRatingChange,
  onSubmit,
}: ReviewFormProps) {
  const currentUserName = `${currentUser.name} ${currentUser.surname}`.trim();

  return (
    <View style={styles.form}>
      {currentUserReview && (
        <Text style={styles.updateHint}>
          You already reviewed this specialist. Publishing again will update your review.
        </Text>
      )}

      <Text style={styles.inputLabel}>Name</Text>
      <TextInput
        style={styles.input}
        value={currentUserName}
        editable={false}
        placeholder="Name"
      />

      <Text style={styles.inputLabel}>Phone</Text>
      <TextInput
        style={styles.input}
        value={currentUser.phone}
        editable={false}
        keyboardType="phone-pad"
        placeholder="Phone"
      />

      <Text style={styles.inputLabel}>Comment</Text>
      <TextInput
        style={[styles.input, styles.commentInput]}
        value={commentText}
        onChangeText={onCommentChange}
        placeholder="Write your review"
        multiline
        textAlignVertical="top"
      />

      {reviewError ? (
        <Text style={styles.errorText}>{reviewError}</Text>
      ) : null}

      <Pressable style={styles.publishButton} onPress={onSubmit}>
        <Text style={styles.publishButtonText}>
          {currentUserReview ? 'Update review' : 'Publish review'}
        </Text>
      </Pressable>

      <View style={styles.formStars}>
        <InteractiveRating rating={selectedRating} onChange={onRatingChange} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  form: {
    paddingBottom: 24,
  },
  updateHint: {
    fontSize: 13,
    lineHeight: 18,
    color: '#6B6B6B',
    marginBottom: 12,
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
  errorText: {
    fontSize: 13,
    color: '#C62828',
    marginTop: -4,
    marginBottom: 8,
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
});