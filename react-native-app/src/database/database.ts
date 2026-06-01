import { categories, masterProfiles, reviews, roles, services, users } from '@/data/seed';
import { insertCategory } from '@/data/local/categoryDao';
import { insertMasterProfile } from '@/data/local/masterProfileDao';
import { insertReview } from '@/data/local/reviewDao';
import { insertRole } from '@/data/local/roleDao';
import { insertService } from '@/data/local/serviceDao';
import { getUsersCount, insertUser } from '@/data/local/userDao';
import { getDatabase } from '@/database/provider';
import { CREATE_TABLES_SQL, migrateDatabase } from '@/database/schema';

export async function initializeDatabase() {
  const db = await getDatabase();

  await db.execAsync(CREATE_TABLES_SQL);

  await migrateDatabase(db);
  await seedDatabaseIfEmpty();
}

async function seedDatabaseIfEmpty() {
  const usersCount = await getUsersCount();

  if (usersCount > 0) {
    return;
  }

  for (const role of roles) {
    await insertRole(role);
  }

  for (const category of categories) {
    await insertCategory(category);
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
