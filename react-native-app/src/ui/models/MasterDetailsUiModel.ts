import type { Service } from '@/models';

export type MasterDetailsUiModel = {
  id: number;
  fullName: string;
  email: string;
  phone: string;
  categoryName: string;
  description: string;
  expYears: number;
  priceFrom: number;
  ratingAvg: number;
  reviewsCount: number;
  avatarUrl?: string;
  services: Array<{
    id: number;
    categoryId: number;
    title: string;
    description: string;
    price: number;
    priceType: Service['priceType'];
    durationMin: number;
    isActive: boolean;
    categoryName: string;
  }>;
  reviews: Array<{
    id: number;
    userId: number;
    authorName: string;
    rating: number;
    comment: string;
    createdAt: string;
  }>;
};

export type MasterDetails = MasterDetailsUiModel;
