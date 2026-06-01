import type {
  Category,
  MasterProfile,
  Review,
  Role,
  Service,
  User,
} from '@/models';

export type RoleRow = {
  id: number;
  role_name: Role['roleName'];
};

export type CategoryRow = {
  id: number;
  name: string;
  icon_url: string;
};

export type UserRow = {
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
};

export type MasterProfileRow = {
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
};

export type ServiceRow = {
  id: number;
  master_id: number;
  category_id: number;
  title: string;
  description: string;
  price: number;
  price_type: Service['priceType'];
  duration_min: number;
  is_active: number;
  created_at: string;
  updated_at: string;
};

export type ReviewRow = {
  id: number;
  user_id: number;
  master_id: number;
  rating: number;
  comment: string;
  created_at: string;
};

export function mapRoleRow(row: RoleRow): Role {
  return {
    id: row.id,
    roleName: row.role_name,
  };
}

export function mapCategoryRow(row: CategoryRow): Category {
  return {
    id: row.id,
    name: row.name,
    iconUrl: row.icon_url,
  };
}

export function mapUserRow(row: UserRow): User {
  return {
    id: row.id,
    name: row.name,
    surname: row.surname,
    email: row.email,
    phone: row.phone,
    passwordHash: row.password_hash,
    roleId: row.role_id,
    avatarUrl: row.avatar_url ?? undefined,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };
}

export function mapMasterProfileRow(row: MasterProfileRow): MasterProfile {
  return {
    id: row.id,
    userId: row.user_id,
    description: row.description,
    expYears: row.exp_years,
    priceFrom: row.price_from,
    ratingAvg: row.rating_avg,
    reviewsCount: row.reviews_count,
    isActive: Boolean(row.is_active),
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };
}

export function mapServiceRow(row: ServiceRow): Service {
  return {
    id: row.id,
    masterId: row.master_id,
    categoryId: row.category_id,
    title: row.title,
    description: row.description,
    price: row.price,
    priceType: row.price_type,
    durationMin: row.duration_min,
    isActive: Boolean(row.is_active),
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };
}

export function mapReviewRow(row: ReviewRow): Review {
  return {
    id: row.id,
    userId: row.user_id,
    masterId: row.master_id,
    rating: row.rating,
    comment: row.comment,
    createdAt: row.created_at,
  };
}
