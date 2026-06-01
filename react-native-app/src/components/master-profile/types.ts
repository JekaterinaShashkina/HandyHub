import type { Service } from '@/models';
import type { MasterDetails } from '@/ui/models';

export type MasterService = MasterDetails['services'][number];

export type ServiceFormValues = {
  categoryId: number;
  title: string;
  description: string;
  priceType: Service['priceType'];
  price: number;
  durationMin: number;
};
