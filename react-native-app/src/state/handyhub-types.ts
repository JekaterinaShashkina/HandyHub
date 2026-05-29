import type {
  Category,
  MasterCardItem,
  MasterDetails,
  Review,
  Service,
  User,
  UserReviewItem,
} from '@/data/handyhub-data';

export type UpdateMasterProfileInput = {
  masterId: number;
  serviceId: number;
  categoryId: number;
  title: string;
  priceType: Service['priceType'];
  price: number;
  durationMin: number;
  description: string;
};

export type AddServiceInput = {
  masterId: number;
  categoryId: number;
  title: string;
  description: string;
  priceType: Service['priceType'];
  price: number;
  durationMin: number;
};

export type SetServiceActiveInput = {
  serviceId: number;
  isActive: boolean;
};

export type NewReviewInput = {
  masterId: number;
  user: User;
  rating: number;
  comment: string;
};

export type AddMasterInput = {
  name: string;
  surname: string;
  phone: string;
  email: string;
  password: string;
  categoryId: number;
  priceType: Service['priceType'];
  price: number;
  description: string;
  avatarUrl?: string;
};

export type RegisterClientInput = {
  name: string;
  surname: string;
  phone: string;
  email: string;
  password: string;
  avatarUrl?: string;
};

export type UpdateProfileInput = {
  name: string;
  surname: string;
  phone: string;
  email: string;
  avatarUrl?: string;
};

export type HandyHubState = {
  categories: Category[];
  currentUser: User | null;
  isDatabaseReady: boolean;
  getMasterCards: () => MasterCardItem[];
  getMasterDetails: (masterId: number) => MasterDetails | undefined;
  getMasterDetailsByUserId: (userId: number) => MasterDetails | undefined;
  upsertReview: (input: NewReviewInput) => void;
  addMaster: (input: AddMasterInput) => { success: boolean; error?: string };
  login: (email: string, password: string) => boolean;
  logout: () => void;
  hasMasterProfile: (userId: number) => boolean;
  registerClient: (input: RegisterClientInput) => { success: boolean; error?: string };
  updateProfile: (input: UpdateProfileInput) => { success: boolean; error?: string };
  updateUserRole: (userId: number, roleId: User['roleId']) => void;
  updateMasterProfile: (
    input: UpdateMasterProfileInput
  ) => { success: boolean; error?: string };
  addService: (input: AddServiceInput) => { success: boolean; error?: string };
  setServiceActive: (
    input: SetServiceActiveInput
  ) => { success: boolean; error?: string };
  getReviewsByUserId: (userId: number) => UserReviewItem[];
};
