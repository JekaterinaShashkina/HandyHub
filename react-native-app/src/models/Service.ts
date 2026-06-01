export type Service = {
  id: number;
  masterId: number;
  categoryId: number;
  title: string;
  description: string;
  price: number;
  priceType: 'fixed' | 'from' | 'hourly';
  durationMin: number;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
};
