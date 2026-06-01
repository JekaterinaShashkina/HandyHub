export type UserReviewUiModel = {
  id: number;
  masterId: number;
  masterName: string;
  categoryName: string;
  rating: number;
  comment: string;
  createdAt: string;
};

export type UserReviewItem = UserReviewUiModel;
