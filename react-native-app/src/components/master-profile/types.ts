import type { MasterDetails, Service } from '@/data/handyhub-data';

export type MasterService = MasterDetails['services'][number];

export type ServiceFormValues = {
  categoryId: number;
  title: string;
  description: string;
  priceType: Service['priceType'];
  price: number;
  durationMin: number;
};
