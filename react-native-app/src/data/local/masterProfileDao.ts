import { getDatabase } from '@/database/provider';
import {
  mapMasterProfileRow,
  type MasterProfileRow,
} from '@/database/mappers';
import type { MasterProfile } from '@/models';

export async function getAllMasterProfiles() {
  const db = await getDatabase();
  const rows = await db.getAllAsync<MasterProfileRow>(
    'SELECT * FROM master_profiles'
  );

  return rows.map(mapMasterProfileRow);
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

export async function updateMasterProfile(master: MasterProfile) {
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
}
