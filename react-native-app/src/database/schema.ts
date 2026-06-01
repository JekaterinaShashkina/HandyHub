import type * as SQLite from 'expo-sqlite';

export const CREATE_TABLES_SQL = `
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
    phone TEXT NOT NULL UNIQUE,
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
    is_active INTEGER NOT NULL DEFAULT 1,
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
`;

export async function migrateDatabase(db: SQLite.SQLiteDatabase) {
  const serviceColumns = await db.getAllAsync<{ name: string }>(
    'PRAGMA table_info(services)'
  );
  const hasServiceIsActive = serviceColumns.some(
    (column) => column.name === 'is_active'
  );

  if (!hasServiceIsActive) {
    await db.execAsync(
      'ALTER TABLE services ADD COLUMN is_active INTEGER NOT NULL DEFAULT 1'
    );
  }
}
