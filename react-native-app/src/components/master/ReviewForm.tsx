import { StyleSheet, Text, TextInput, View } from 'react-native';

import { FormMessage } from '@/components/common/FormMessage';
import { PrimaryButton } from '@/components/common/PrimaryButton';
import { InteractiveRating } from '@/components/master/InteractiveRating';
import { HandyHubColors } from '@/constants/theme';
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

      <FormMessage
        message={reviewError}
        type="error"
        style={styles.errorText}
      />

      <PrimaryButton
        title={currentUserReview ? 'Update review' : 'Publish review'}
        onPress={onSubmit}
        style={styles.publishButton}
      />

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
    color: HandyHubColors.muted,
    marginBottom: 12,
  },
  inputLabel: {
    fontSize: 13,
    color: HandyHubColors.textSecondary,
    marginBottom: 5,
  },
  input: {
    minHeight: 44,
    borderRadius: 6,
    backgroundColor: HandyHubColors.surface,
    paddingHorizontal: 14,
    fontSize: 15,
    color: HandyHubColors.text,
    marginBottom: 10,
  },
  commentInput: {
    minHeight: 74,
    paddingTop: 12,
  },
  errorText: {
    marginTop: -4,
    marginBottom: 8,
  },
  publishButton: {
    marginTop: 20,
  },
  formStars: {
    alignSelf: 'flex-end',
    marginTop: 16,
  },
});
