import { getDatabase } from '@/database/provider';
import { mapRoleRow, type RoleRow } from '@/database/mappers';
import type { Role } from '@/models';

export async function getAllRoles() {
  const db = await getDatabase();
  const rows = await db.getAllAsync<RoleRow>('SELECT id, role_name FROM roles');

  return rows.map(mapRoleRow);
}

export async function insertRole(role: Role) {
  const db = await getDatabase();

  await db.runAsync(
    'INSERT INTO roles (id, role_name) VALUES (?, ?)',
    role.id,
    role.roleName
  );
}
