export type Role = {
  id: number;
  roleName: 'client' | 'master' | 'admin';
};

export type User = {
  id: number;
  name: string;
  surname: string;
  email: string;
  phone: string;
  passwordHash: string;
  roleId: number;
  avatarUrl?: string;
  createdAt: string;
  updatedAt: string;
};

export type MasterProfile = {
  id: number;
  userId: number;
  description: string;
  expYears: number;
  priceFrom: number;
  ratingAvg: number;
  reviewsCount: number;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
};

export type Category = {
  id: number;
  name: string;
  iconUrl: string;
};

export type Service = {
  id: number;
  masterId: number;
  categoryId: number;
  title: string;
  description: string;
  price: number;
  priceType: 'fixed' | 'from' | 'hourly';
  durationMin: number;
  createdAt: string;
  updatedAt: string;
};

export type Review = {
  id: number;
  userId: number;
  masterId: number;
  rating: number;
  comment: string;
  createdAt: string;
};

export type MasterCardItem = {
  id: number;
  fullName: string;
  categoryName: string;
  description: string;
  expYears: number;
  priceFrom: number;
  ratingAvg: number;
  reviewsCount: number;
};

const now = new Date().toISOString();

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

export const users: User[] = [
  {
    id: 1,
    name: 'Anna',
    surname: 'Petrova',
    email: 'anna@example.com',
    phone: '+37255550001',
    passwordHash: 'hash1',
    roleId: 2,
    createdAt: now,
    updatedAt: now,
  },
  {
    id: 2,
    name: 'Maksim',
    surname: 'Ivanov',
    email: 'maksim@example.com',
    phone: '+37255550002',
    passwordHash: 'hash2',
    roleId: 2,
    createdAt: now,
    updatedAt: now,
  },
  {
    id: 3,
    name: 'Olga',
    surname: 'Smirnova',
    email: 'olga@example.com',
    phone: '+37255550003',
    passwordHash: 'hash3',
    roleId: 1,
    createdAt: now,
    updatedAt: now,
  },
];

export const masterProfiles: MasterProfile[] = [
  {
    id: 1,
    userId: 1,
    description: 'Professional manicure master with 5 years of experience.',
    expYears: 5,
    priceFrom: 25,
    ratingAvg: 3,
    reviewsCount: 12,
    isActive: true,
    createdAt: now,
    updatedAt: now,
  },
  {
    id: 2,
    userId: 2,
    description: 'Certified electrician for apartments and houses.',
    expYears: 8,
    priceFrom: 40,
    ratingAvg: 4.6,
    reviewsCount: 8,
    isActive: true,
    createdAt: now,
    updatedAt: now,
  },
];

export const services: Service[] = [
  {
    id: 1,
    masterId: 1,
    categoryId: 1,
    title: 'Gel Polish',
    description: 'Long-lasting gel polish manicure.',
    price: 30,
    priceType: 'fixed',
    durationMin: 90,
    createdAt: now,
    updatedAt: now,
  },
  {
    id: 2,
    masterId: 2,
    categoryId: 3,
    title: 'Socket Installation',
    description: 'Installation and replacement of electrical sockets.',
    price: 45,
    priceType: 'hourly',
    durationMin: 60,
    createdAt: now,
    updatedAt: now,
  },
];

export const reviews: Review[] = [
  {
    id: 1,
    userId: 3,
    masterId: 1,
    rating: 2,
    comment: 'Very professional and friendly master.',
    createdAt: now,
  },
  {
    id: 2,
    userId: 3,
    masterId: 2,
    rating: 4,
    comment: 'Work was completed quickly and neatly.',
    createdAt: now,
  },
];

export function getMasterCards(): MasterCardItem[] {
  return masterProfiles.map((master) => {
    const user = users.find((item) => item.id === master.userId);
    const service = services.find((item) => item.masterId === master.id);
    const category = categories.find((item) => item.id === service?.categoryId);

    return {
      id: master.id,
      fullName: `${user?.name ?? ''} ${user?.surname ?? ''}`.trim(),
      categoryName: category?.name ?? 'Specialist',
      description: master.description,
      expYears: master.expYears,
      priceFrom: master.priceFrom,
      ratingAvg: master.ratingAvg,
      reviewsCount: master.reviewsCount,
    };
  });
}

export const currentUser: User | null = users[2];

//export const currentUser: User | null = null; // not autozired


//export const currentUser: User | null = users[0]; //master

export function canLeaveReview(user: User | null | undefined) {
  return user?.roleId === 1;
}

export type MasterDetails = {
  id: number;
  fullName: string;
  email: string;
  phone: string;
  categoryName: string;
  description: string;
  expYears: number;
  priceFrom: number;
  ratingAvg: number;
  reviewsCount: number;
  services: Array<{
    id: number;
    title: string;
    description: string;
    price: number;
    priceType: Service['priceType'];
    durationMin: number;
    categoryName: string;
  }>;
  reviews: Array<{
    id: number;
    userId: number;
    authorName: string;
    rating: number;
    comment: string;
    createdAt: string;
  }>;
};

export function getMasterDetails(masterId: number): MasterDetails | undefined {
  const master = masterProfiles.find((item) => item.id === masterId);

  if (!master) {
    return undefined;
  }

  const user = users.find((item) => item.id === master.userId);
  const masterServices = services.filter((item) => item.masterId === master.id);
  const mainService = masterServices[0];
  const mainCategory = categories.find((item) => item.id === mainService?.categoryId);

  const masterReviews = reviews
    .filter((item) => item.masterId === master.id)
    .map((review) => {
      const author = users.find((item) => item.id === review.userId);

     return {
      id: review.id,
      userId: review.userId,
      authorName: `${author?.name ?? 'Client'} ${author?.surname ?? ''}`.trim(),
      rating: review.rating,
      comment: review.comment,
      createdAt: review.createdAt,
    };
    });

  return {
    id: master.id,
    fullName: `${user?.name ?? ''} ${user?.surname ?? ''}`.trim(),
    email: user?.email ?? '',
    phone: user?.phone ?? '',
    categoryName: mainCategory?.name ?? 'Specialist',
    description: master.description,
    expYears: master.expYears,
    priceFrom: master.priceFrom,
    ratingAvg: master.ratingAvg,
    reviewsCount: master.reviewsCount,
    services: masterServices.map((service) => {
      const category = categories.find((item) => item.id === service.categoryId);

      return {
        id: service.id,
        title: service.title,
        description: service.description,
        price: service.price,
        priceType: service.priceType,
        durationMin: service.durationMin,
        categoryName: category?.name ?? 'Service',
      };
    }),
    reviews: masterReviews,
  };
}