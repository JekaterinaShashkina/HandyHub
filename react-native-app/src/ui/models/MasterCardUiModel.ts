export type MasterCardUiModel = {
  id: number;
  fullName: string;
  categoryName: string;
  categoryIds: number[];
  description: string;
  searchText: string;
  expYears: number;
  priceFrom: number;
  ratingAvg: number;
  reviewsCount: number;
  avatarUrl?: string;
};

export type MasterCardItem = MasterCardUiModel;
