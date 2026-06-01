import type {
  Category,
  MasterProfile,
  Review,
  Role,
  Service,
  User,
} from '@/models';

export const roles: Role[] = [
  { id: 1, roleName: 'client' },
  { id: 2, roleName: 'master' },
  { id: 3, roleName: 'admin' },
];

export const categories: Category[] = [
  { id: 1, name: 'Manicure', iconUrl: 'manicurist' },
  { id: 2, name: 'Hairdresser', iconUrl: 'makeup' },
  { id: 3, name: 'Electrician', iconUrl: 'electrician' },
  { id: 4, name: 'Plumber', iconUrl: 'plumber' },
  { id: 5, name: 'Cosmetologist', iconUrl: 'cosmetologist' },
];

export const users: User[] = [];

export const masterProfiles: MasterProfile[] = [];

export const services: Service[] = [];

export const reviews: Review[] = [];

export const currentUser: User | null = null;
