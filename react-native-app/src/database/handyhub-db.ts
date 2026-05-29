import * as SQLite from 'expo-sqlite';

import {
  categories,
  masterProfiles,
  reviews,
  roles,
  services,
  users,
  type Category,
  type MasterProfile,
  type Review,
  type Role,
  type Service,
  type User,
  
} from '@/data/handyhub-data';
import {
  mapCategoryRow,
  mapMasterProfileRow,
  mapReviewRow,
  mapRoleRow,
  mapServiceRow,
  mapUserRow,
  type CategoryRow,
  type MasterProfileRow,
  type ReviewRow,
  type RoleRow,
  type ServiceRow,
  type UserRow,
} from '@/database/handyhub-db-mappers';
import { CREATE_TABLES_SQL, migrateDatabase } from '@/database/handyhub-db-schema';

const DATABASE_NAME = 'handyhub.db';

let databasePromise: Promise<SQLite.SQLiteDatabase> | null = null;

export type HandyHubDatabaseSnapshot = {
  roles: Role[];
  categories: Category[];
  users: User[];
  masterProfiles: MasterProfile[];
  services: Service[];
  reviews: Review[];
};

export function getDatabase() {
  if (!databasePromise) {
    databasePromise = SQLite.openDatabaseAsync(DATABASE_NAME);
  }

  return databasePromise;
}

export async function initializeDatabase() {
  const db = await getDatabase();

  await db.execAsync(CREATE_TABLES_SQL);

  await migrateDatabase(db);
  await seedDatabaseIfEmpty();
}

async function seedDatabaseIfEmpty() {
  const db = await getDatabase();
  const row = await db.getFirstAsync<{ count: number }>(
    'SELECT COUNT(*) as count FROM users'
  );

  if ((row?.count ?? 0) > 0) {
    return;
  }

  for (const role of roles) {
    await db.runAsync(
      'INSERT INTO roles (id, role_name) VALUES (?, ?)',
      role.id,
      role.roleName
    );
  }

  for (const category of categories) {
    await db.runAsync(
      'INSERT INTO categories (id, name, icon_url) VALUES (?, ?, ?)',
      category.id,
      category.name,
      category.iconUrl
    );
  }

  for (const user of users) {
    await insertUser(user);
  }

  for (const master of masterProfiles) {
    await insertMasterProfile(master);
  }

  for (const service of services) {
    await insertService(service);
  }

  for (const review of reviews) {
    await insertReview(review);
  }
}

export async function loadDatabaseSnapshot(): Promise<HandyHubDatabaseSnapshot> {
  const db = await getDatabase();

  const dbRoles = await db.getAllAsync<RoleRow>(
    'SELECT id, role_name FROM roles'
  );
  const dbCategories = await db.getAllAsync<CategoryRow>(
    'SELECT id, name, icon_url FROM categories'
  );
  const dbUsers = await db.getAllAsync<UserRow>('SELECT * FROM users');
  const dbMasters = await db.getAllAsync<MasterProfileRow>(
    'SELECT * FROM master_profiles'
  );
  const dbServices = await db.getAllAsync<ServiceRow>('SELECT * FROM services');
  const dbReviews = await db.getAllAsync<ReviewRow>('SELECT * FROM reviews');

  return {
    roles: dbRoles.map(mapRoleRow),
    categories: dbCategories.map(mapCategoryRow),
    users: dbUsers.map(mapUserRow),
    masterProfiles: dbMasters.map(mapMasterProfileRow),
    services: dbServices.map(mapServiceRow),
    reviews: dbReviews.map(mapReviewRow),
  };
}

export async function insertUser(user: User) {
  const db = await getDatabase();

  await db.runAsync(
    `INSERT OR REPLACE INTO users
      (id, name, surname, email, phone, password_hash, role_id, avatar_url, created_at, updated_at)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    user.id,
    user.name,
    user.surname,
    user.email,
    user.phone,
    user.passwordHash,
    user.roleId,
    user.avatarUrl ?? null,
    user.createdAt,
    user.updatedAt
  );
}

export async function insertMasterProfile(master: MasterProfile) {
  const db = await getDatabase();

  await db.runAsync(
    `INSERT OR REPLACE INTO master_profiles
      (id, user_id, description, exp_years, price_from, rating_avg, reviews_count, is_active, created_at, updated_at)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    master.id,
    master.userId,
    master.description,
    master.expYears,
    master.priceFrom,
    master.ratingAvg,
    master.reviewsCount,
    master.isActive ? 1 : 0,
    master.createdAt,
    master.updatedAt
  );
}

export async function insertService(service: Service) {
  const db = await getDatabase();

  await db.runAsync(
    `INSERT OR REPLACE INTO services
      (id, master_id, category_id, title, description, price, price_type, duration_min, is_active, created_at, updated_at)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    service.id,
    service.masterId,
    service.categoryId,
    service.title,
    service.description,
    service.price,
    service.priceType,
    service.durationMin,
    service.isActive ? 1 : 0,
    service.createdAt,
    service.updatedAt
  );
}

export async function insertReview(review: Review) {
  const db = await getDatabase();

  await db.runAsync(
    `INSERT OR REPLACE INTO reviews
      (id, user_id, master_id, rating, comment, created_at)
     VALUES (?, ?, ?, ?, ?, ?)`,
    review.id,
    review.userId,
    review.masterId,
    review.rating,
    review.comment,
    review.createdAt
  );
}

export async function updateUserRoleInDatabase(
  userId: number,
  roleId: number,
  updatedAt: string
) {
  const db = await getDatabase();

  await db.runAsync(
    'UPDATE users SET role_id = ?, updated_at = ? WHERE id = ?',
    roleId,
    updatedAt,
    userId
  );
}

export async function updateUserProfileInDatabase(user: User) {
  const db = await getDatabase();

  await db.runAsync(
    `UPDATE users
     SET name = ?, surname = ?, email = ?, phone = ?, avatar_url = ?, updated_at = ?
     WHERE id = ?`,
    user.name,
    user.surname,
    user.email,
    user.phone,
    user.avatarUrl ?? null,
    user.updatedAt,
    user.id
  );
}

export async function updateMasterProfileInDatabase(
  master: MasterProfile,
  service: Service
) {
  const db = await getDatabase();

  await db.runAsync(
    `UPDATE master_profiles
     SET description = ?, price_from = ?, updated_at = ?
     WHERE id = ?`,
    master.description,
    master.priceFrom,
    master.updatedAt,
    master.id
  );

  await db.runAsync(
    `UPDATE services
     SET category_id = ?, title = ?, description = ?, price = ?, price_type = ?, duration_min = ?, is_active = ?, updated_at = ?
     WHERE id = ?`,
    service.categoryId,
    service.title,
    service.description,
    service.price,
    service.priceType,
    service.durationMin,
    service.isActive ? 1 : 0,
    service.updatedAt,
    service.id
  );
}
