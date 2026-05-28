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

  await db.execAsync(`
    PRAGMA journal_mode = WAL;

    CREATE TABLE IF NOT EXISTS roles (
      id INTEGER PRIMARY KEY NOT NULL,
      role_name TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS categories (
      id INTEGER PRIMARY KEY NOT NULL,
      name TEXT NOT NULL,
      icon_url TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY NOT NULL,
      name TEXT NOT NULL,
      surname TEXT NOT NULL,
      email TEXT NOT NULL UNIQUE,
      phone TEXT NOT NULL,
      password_hash TEXT NOT NULL,
      role_id INTEGER NOT NULL,
      avatar_url TEXT,
      created_at TEXT NOT NULL,
      updated_at TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS master_profiles (
      id INTEGER PRIMARY KEY NOT NULL,
      user_id INTEGER NOT NULL,
      description TEXT NOT NULL,
      exp_years INTEGER NOT NULL,
      price_from REAL NOT NULL,
      rating_avg REAL NOT NULL,
      reviews_count INTEGER NOT NULL,
      is_active INTEGER NOT NULL,
      created_at TEXT NOT NULL,
      updated_at TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS services (
      id INTEGER PRIMARY KEY NOT NULL,
      master_id INTEGER NOT NULL,
      category_id INTEGER NOT NULL,
      title TEXT NOT NULL,
      description TEXT NOT NULL,
      price REAL NOT NULL,
      price_type TEXT NOT NULL,
      duration_min INTEGER NOT NULL,
      created_at TEXT NOT NULL,
      updated_at TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS reviews (
      id INTEGER PRIMARY KEY NOT NULL,
      user_id INTEGER NOT NULL,
      master_id INTEGER NOT NULL,
      rating INTEGER NOT NULL,
      comment TEXT NOT NULL,
      created_at TEXT NOT NULL,
      UNIQUE(user_id, master_id)
    );
  `);

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

  const dbRoles = await db.getAllAsync<{
    id: number;
    role_name: Role['roleName'];
  }>('SELECT id, role_name FROM roles');

  const dbCategories = await db.getAllAsync<{
    id: number;
    name: string;
    icon_url: string;
  }>('SELECT id, name, icon_url FROM categories');

  const dbUsers = await db.getAllAsync<{
    id: number;
    name: string;
    surname: string;
    email: string;
    phone: string;
    password_hash: string;
    role_id: number;
    avatar_url: string | null;
    created_at: string;
    updated_at: string;
  }>('SELECT * FROM users');

  const dbMasters = await db.getAllAsync<{
    id: number;
    user_id: number;
    description: string;
    exp_years: number;
    price_from: number;
    rating_avg: number;
    reviews_count: number;
    is_active: number;
    created_at: string;
    updated_at: string;
  }>('SELECT * FROM master_profiles');

  const dbServices = await db.getAllAsync<{
    id: number;
    master_id: number;
    category_id: number;
    title: string;
    description: string;
    price: number;
    price_type: Service['priceType'];
    duration_min: number;
    created_at: string;
    updated_at: string;
  }>('SELECT * FROM services');

  const dbReviews = await db.getAllAsync<{
    id: number;
    user_id: number;
    master_id: number;
    rating: number;
    comment: string;
    created_at: string;
  }>('SELECT * FROM reviews');

  return {
    roles: dbRoles.map((role) => ({
      id: role.id,
      roleName: role.role_name,
    })),
    categories: dbCategories.map((category) => ({
      id: category.id,
      name: category.name,
      iconUrl: category.icon_url,
    })),
    users: dbUsers.map((user) => ({
      id: user.id,
      name: user.name,
      surname: user.surname,
      email: user.email,
      phone: user.phone,
      passwordHash: user.password_hash,
      roleId: user.role_id,
      avatarUrl: user.avatar_url ?? undefined,
      createdAt: user.created_at,
      updatedAt: user.updated_at,
    })),
    masterProfiles: dbMasters.map((master) => ({
      id: master.id,
      userId: master.user_id,
      description: master.description,
      expYears: master.exp_years,
      priceFrom: master.price_from,
      ratingAvg: master.rating_avg,
      reviewsCount: master.reviews_count,
      isActive: Boolean(master.is_active),
      createdAt: master.created_at,
      updatedAt: master.updated_at,
    })),
    services: dbServices.map((service) => ({
      id: service.id,
      masterId: service.master_id,
      categoryId: service.category_id,
      title: service.title,
      description: service.description,
      price: service.price,
      priceType: service.price_type,
      durationMin: service.duration_min,
      createdAt: service.created_at,
      updatedAt: service.updated_at,
    })),
    reviews: dbReviews.map((review) => ({
      id: review.id,
      userId: review.user_id,
      masterId: review.master_id,
      rating: review.rating,
      comment: review.comment,
      createdAt: review.created_at,
    })),
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
      (id, master_id, category_id, title, description, price, price_type, duration_min, created_at, updated_at)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    service.id,
    service.masterId,
    service.categoryId,
    service.title,
    service.description,
    service.price,
    service.priceType,
    service.durationMin,
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