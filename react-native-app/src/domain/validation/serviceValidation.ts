import type { Service } from '@/models';

type ServiceInput = {
  categoryId: number;
  title: string;
  description: string;
  priceType: Service['priceType'];
  price: number;
  durationMin: number;
};

export function normalizeServiceInput(input: ServiceInput) {
  return {
    categoryId: input.categoryId,
    title: input.title.trim(),
    description: input.description.trim(),
    priceType: input.priceType,
    price: input.price,
    durationMin: input.durationMin,
  };
}

export function validateServiceInput(input: ReturnType<typeof normalizeServiceInput>) {
  if (!input.title) {
    return 'Please enter service title.';
  }

  if (!input.categoryId) {
    return 'Please select a category.';
  }

  if (!Number.isFinite(input.price) || input.price <= 0) {
    return 'Please enter a valid price.';
  }

  if (!Number.isFinite(input.durationMin) || input.durationMin <= 0) {
    return 'Please enter a valid duration.';
  }

  if (!input.description) {
    return 'Please enter service description.';
  }

  return undefined;
}
