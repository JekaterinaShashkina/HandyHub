import { getDatabase } from '@/database/provider';
import { mapReviewRow, type ReviewRow } from '@/database/mappers';
import type { Review } from '@/models';

export async function getAllReviews() {
  const db = await getDatabase();
  const rows = await db.getAllAsync<ReviewRow>('SELECT * FROM reviews');

  return rows.map(mapReviewRow);
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
