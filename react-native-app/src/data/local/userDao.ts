import { getDatabase } from '@/database/provider';
import { mapUserRow, type UserRow } from '@/database/mappers';
import type { User } from '@/models';

export async function getUsersCount() {
  const db = await getDatabase();
  const row = await db.getFirstAsync<{ count: number }>(
    'SELECT COUNT(*) as count FROM users'
  );

  return row?.count ?? 0;
}

export async function getAllUsers() {
  const db = await getDatabase();
  const rows = await db.getAllAsync<UserRow>('SELECT * FROM users');

  return rows.map(mapUserRow);
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

export async function updateUserProfile(user: User) {
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

export async function updateUserRole(
  userId: number,
  roleId: User['roleId'],
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
