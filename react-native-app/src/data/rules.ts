import type { User } from '@/models';

export function canLeaveReview(user: User | null | undefined) {
  return user?.roleId === 1;
}

export function canAddMaster(user: User | null | undefined) {
  return user?.roleId === 2;
}
