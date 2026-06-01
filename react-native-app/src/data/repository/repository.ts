import {
  initializeDatabase,
} from '@/database/database';
import { getAllCategories } from '@/data/local/categoryDao';
import {
  getAllMasterProfiles,
  insertMasterProfile,
  updateMasterProfile as updateMasterProfileInDao,
} from '@/data/local/masterProfileDao';
import { getAllReviews, insertReview } from '@/data/local/reviewDao';
import { getAllRoles } from '@/data/local/roleDao';
import {
  getAllServices,
  insertService,
  updateService,
} from '@/data/local/serviceDao';
import {
  getAllUsers,
  insertUser,
  updateUserProfile as updateUserProfileInDao,
  updateUserRole as updateUserRoleInDao,
} from '@/data/local/userDao';
import type {
  Category,
  MasterProfile,
  Review,
  Role,
  Service,
  User,
} from '@/models';

export type DatabaseSnapshot = {
  roles: Role[];
  categories: Category[];
  users: User[];
  masterProfiles: MasterProfile[];
  services: Service[];
  reviews: Review[];
};

export async function loadAppData(): Promise<DatabaseSnapshot> {
  await initializeDatabase();

  const [
    roles,
    categories,
    users,
    masterProfiles,
    services,
    reviews,
  ] = await Promise.all([
    getAllRoles(),
    getAllCategories(),
    getAllUsers(),
    getAllMasterProfiles(),
    getAllServices(),
    getAllReviews(),
  ]);

  return {
    roles,
    categories,
    users,
    masterProfiles,
    services,
    reviews,
  };
}

export function saveUser(user: User) {
  return insertUser(user);
}

export function saveMasterProfile(master: MasterProfile) {
  return insertMasterProfile(master);
}

export function saveService(service: Service) {
  return insertService(service);
}

export function saveReview(review: Review) {
  return insertReview(review);
}

export function updateUserProfile(user: User) {
  return updateUserProfileInDao(user);
}

export function updateUserRole(
  userId: number,
  roleId: User['roleId'],
  updatedAt: string
) {
  return updateUserRoleInDao(userId, roleId, updatedAt);
}

export function updateMasterProfile(
  master: MasterProfile,
  service: Service
) {
  return Promise.all([
    updateMasterProfileInDao(master),
    updateService(service),
  ]);
}
