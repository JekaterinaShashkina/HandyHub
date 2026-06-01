import type { Review, User } from '@/models';

type NewReviewInput = {
  masterId: number;
  user: User;
  rating: number;
  comment: string;
};

type UpsertReviewResult = {
  review: Review;
  reviews: Review[];
};

export function upsertReviewInList(
  reviews: Review[],
  input: NewReviewInput,
  timestamp: string
): UpsertReviewResult {
  const existingReview = reviews.find(
    (review) =>
      review.masterId === input.masterId && review.userId === input.user.id
  );

  const review: Review = {
    id: existingReview?.id ?? Date.now(),
    userId: input.user.id,
    masterId: input.masterId,
    rating: input.rating,
    comment: input.comment,
    createdAt: timestamp,
  };

  if (existingReview) {
    return {
      review,
      reviews: [
        review,
        ...reviews.filter((item) => item.id !== existingReview.id),
      ],
    };
  }

  return {
    review,
    reviews: [review, ...reviews],
  };
}
