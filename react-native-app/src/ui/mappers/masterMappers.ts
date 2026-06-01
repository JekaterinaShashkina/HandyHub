import type {
  Category,
  MasterProfile,
  Review,
  Service,
  User,
} from '@/models';
import type {
  MasterCardItem,
  MasterDetails,
  UserReviewItem,
} from '@/ui/models';

type Collections = {
  categories: Category[];
  users: User[];
  masterProfiles: MasterProfile[];
  services: Service[];
  reviews: Review[];
};

export function getReviewsForMaster(reviews: Review[], masterId: number) {
  return reviews
    .filter((review) => review.masterId === masterId)
    .sort(
      (firstReview, secondReview) =>
        new Date(secondReview.createdAt).getTime() -
        new Date(firstReview.createdAt).getTime()
    );
}

function getRatingAvg({
  masterProfiles,
  reviews,
  masterId,
}: {
  masterProfiles: MasterProfile[];
  reviews: Review[];
  masterId: number;
}) {
  const masterReviews = getReviewsForMaster(reviews, masterId);

  if (masterReviews.length === 0) {
    const profile = masterProfiles.find((master) => master.id === masterId);
    return profile?.ratingAvg ?? 0;
  }

  return (
    masterReviews.reduce((sum, review) => sum + review.rating, 0) /
    masterReviews.length
  );
}

function getServiceSearchText(services: Service[], categories: Category[]) {
  return services
    .map((service) => {
      const category = categories.find((item) => item.id === service.categoryId);

      return [service.title, service.description, category?.name ?? ''].join(' ');
    })
    .join(' ');
}

export function buildMasterCards({
  categories,
  users,
  masterProfiles,
  services,
  reviews,
}: Collections): MasterCardItem[] {
  return masterProfiles.map((master) => {
    const user = users.find((item) => item.id === master.userId);
    const masterServices = services.filter(
      (item) => item.masterId === master.id && item.isActive
    );
    const service = masterServices[0];
    const category = categories.find((item) => item.id === service?.categoryId);
    const masterReviews = getReviewsForMaster(reviews, master.id);

    return {
      id: master.id,
      fullName: `${user?.name ?? ''} ${user?.surname ?? ''}`.trim(),
      categoryName: category?.name ?? 'Specialist',
      categoryIds: masterServices.map((item) => item.categoryId),
      description: master.description,
      searchText: getServiceSearchText(masterServices, categories),
      expYears: master.expYears,
      priceFrom: master.priceFrom,
      ratingAvg: getRatingAvg({ masterProfiles, reviews, masterId: master.id }),
      reviewsCount: masterReviews.length,
      avatarUrl: user?.avatarUrl,
    };
  });
}

export function buildMasterDetails({
  categories,
  users,
  masterProfiles,
  services,
  reviews,
  masterId,
}: Collections & { masterId: number }): MasterDetails | undefined {
  const master = masterProfiles.find((item) => item.id === masterId);

  if (!master) {
    return undefined;
  }

  const user = users.find((item) => item.id === master.userId);
  const masterServices = services.filter((item) => item.masterId === master.id);
  const activeMasterServices = masterServices.filter((service) => service.isActive);
  const mainService = activeMasterServices[0];
  const mainCategory = categories.find(
    (item) => item.id === mainService?.categoryId
  );

  const masterReviews = getReviewsForMaster(reviews, master.id).map((review) => {
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
    ratingAvg: getRatingAvg({ masterProfiles, reviews, masterId: master.id }),
    reviewsCount: masterReviews.length,
    services: masterServices.map((service) => {
      const category = categories.find((item) => item.id === service.categoryId);

      return {
        id: service.id,
        categoryId: service.categoryId,
        title: service.title,
        description: service.description,
        price: service.price,
        priceType: service.priceType,
        durationMin: service.durationMin,
        isActive: service.isActive,
        categoryName: category?.name ?? 'Service',
      };
    }),
    reviews: masterReviews,
    avatarUrl: user?.avatarUrl,
  };
}

export function buildMasterDetailsByUserId(
  collections: Collections & { userId: number }
) {
  const master = collections.masterProfiles.find(
    (item) => item.userId === collections.userId
  );

  if (!master) {
    return undefined;
  }

  return buildMasterDetails({
    ...collections,
    masterId: master.id,
  });
}

export function buildReviewsByUserId({
  categories,
  users,
  masterProfiles,
  services,
  reviews,
  userId,
}: Collections & { userId: number }): UserReviewItem[] {
  return reviews
    .filter((review) => review.userId === userId)
    .map((review) => {
      const master = masterProfiles.find((item) => item.id === review.masterId);
      const user = users.find((item) => item.id === master?.userId);
      const service = services.find((item) => item.masterId === master?.id);
      const category = categories.find((item) => item.id === service?.categoryId);

      return {
        id: review.id,
        masterId: review.masterId,
        masterName: `${user?.name ?? ''} ${user?.surname ?? ''}`.trim() || 'Master',
        categoryName: category?.name ?? 'Service',
        rating: review.rating,
        comment: review.comment,
        createdAt: review.createdAt,
      };
    });
}
