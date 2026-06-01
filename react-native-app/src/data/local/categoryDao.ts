import { getDatabase } from '@/database/provider';
import { mapCategoryRow, type CategoryRow } from '@/database/mappers';
import type { Category } from '@/models';

export async function getAllCategories() {
  const db = await getDatabase();
  const rows = await db.getAllAsync<CategoryRow>(
    'SELECT id, name, icon_url FROM categories'
  );

  return rows.map(mapCategoryRow);
}

export async function insertCategory(category: Category) {
  const db = await getDatabase();

  await db.runAsync(
    'INSERT INTO categories (id, name, icon_url) VALUES (?, ?, ?)',
    category.id,
    category.name,
    category.iconUrl
  );
}
