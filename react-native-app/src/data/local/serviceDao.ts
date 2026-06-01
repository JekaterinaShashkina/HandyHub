import { getDatabase } from '@/database/provider';
import { mapServiceRow, type ServiceRow } from '@/database/mappers';
import type { Service } from '@/models';

export async function getAllServices() {
  const db = await getDatabase();
  const rows = await db.getAllAsync<ServiceRow>('SELECT * FROM services');

  return rows.map(mapServiceRow);
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

export async function updateService(service: Service) {
  const db = await getDatabase();

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
