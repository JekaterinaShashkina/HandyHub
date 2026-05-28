import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react';

import {
  categories as initialCategories,
  currentUser as initialCurrentUser,
  masterProfiles as initialMasterProfiles,
  reviews as initialReviews,
  services as initialServices,
  users as initialUsers,
  type Category,
  type MasterCardItem,
  type MasterDetails,
  type MasterProfile,
  type Review,
  type Service,
  type User,
} from '@/data/handyhub-data';
import {
  initializeDatabase,
  insertMasterProfile,
  insertReview,
  insertService,
  insertUser,
  loadDatabaseSnapshot,
} from '@/database/handyhub-db';

type NewReviewInput = {
  masterId: number;
  user: User;
  rating: number;
  comment: string;
};

type AddMasterInput = {
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
type RegisterClientInput = {
  name: string;
  surname: string;
  phone: string;
  email: string;
  password: string;
  avatarUrl?: string;
};

type HandyHubState = {
  categories: Category[];
  currentUser: User | null;
  isDatabaseReady: boolean;
  getMasterCards: () => MasterCardItem[];
  getMasterDetails: (masterId: number) => MasterDetails | undefined;
  upsertReview: (input: NewReviewInput) => void;
  addMaster: (input: AddMasterInput) => { success: boolean; error?: string };
  login: (email: string, password: string) => boolean;
  logout: () => void;
  hasMasterProfile: (userId: number) => boolean;
  registerClient: (input: RegisterClientInput) => { success: boolean; error?: string };
  
};


const HandyHubContext = createContext<HandyHubState | undefined>(undefined);

export function HandyHubProvider({ children }: { children: ReactNode }) {
  const [categories, setCategories] = useState<Category[]>(initialCategories);
  const [users, setUsers] = useState<User[]>(initialUsers);
  const [masterProfiles, setMasterProfiles] = useState<MasterProfile[]>(
    initialMasterProfiles
  );
  const [services, setServices] = useState<Service[]>(initialServices);
  const [reviews, setReviews] = useState<Review[]>(initialReviews);
  const [currentUser, setCurrentUser] = useState<User | null>(initialCurrentUser);
  const [isDatabaseReady, setIsDatabaseReady] = useState(false);

  useEffect(() => {
    let isMounted = true;

    async function loadFromDatabase() {
      try {
        await initializeDatabase();
        const snapshot = await loadDatabaseSnapshot();

        if (!isMounted) {
          return;
        }

        setCategories(snapshot.categories);
        setUsers(snapshot.users);
        setMasterProfiles(snapshot.masterProfiles);
        setServices(snapshot.services);
        setReviews(snapshot.reviews);
      } catch (error) {
        console.warn('Failed to initialize HandyHub database', error);
      } finally {
        if (isMounted) {
          setIsDatabaseReady(true);
        }
      }
    }

    loadFromDatabase();

    return () => {
      isMounted = false;
    };
  }, []);

  const value = useMemo<HandyHubState>(() => {

    function getReviewsForMaster(masterId: number) {
      return reviews.filter((review) => review.masterId === masterId);
    }

    function hasMasterProfile(userId: number) {
      return masterProfiles.some((master) => master.userId === userId);
    }

    function getRatingAvg(masterId: number) {
      const masterReviews = getReviewsForMaster(masterId);

      if (masterReviews.length === 0) {
        const profile = masterProfiles.find((master) => master.id === masterId);
        return profile?.ratingAvg ?? 0;
      }

      return (
        masterReviews.reduce((sum, review) => sum + review.rating, 0) /
        masterReviews.length
      );
    }

    function getMasterCards(): MasterCardItem[] {
      return masterProfiles.map((master) => {
        const user = users.find((item) => item.id === master.userId);
        const service = services.find((item) => item.masterId === master.id);
        const category = categories.find(
          (item) => item.id === service?.categoryId
        );
        const masterReviews = getReviewsForMaster(master.id);

        return {
          id: master.id,
          fullName: `${user?.name ?? ''} ${user?.surname ?? ''}`.trim(),
          categoryName: category?.name ?? 'Specialist',
          description: master.description,
          expYears: master.expYears,
          priceFrom: master.priceFrom,
          ratingAvg: getRatingAvg(master.id),
          reviewsCount: masterReviews.length,
          avatarUrl: user?.avatarUrl,
        };
      });
    }

    function getMasterDetails(masterId: number): MasterDetails | undefined {
      const master = masterProfiles.find((item) => item.id === masterId);

      if (!master) {
        return undefined;
      }

      const user = users.find((item) => item.id === master.userId);
      const masterServices = services.filter((item) => item.masterId === master.id);
      const mainService = masterServices[0];
      const mainCategory = categories.find(
        (item) => item.id === mainService?.categoryId
      );

      const masterReviews = getReviewsForMaster(master.id).map((review) => {
        const author = users.find((item) => item.id === review.userId);

        return {
          id: review.id,
          userId: review.userId,
          authorName: `${author?.name ?? 'Client'} ${author?.surname ?? ''}`.trim(),
          rating: review.rating,
          comment: review.comment,
          createdAt: review.createdAt,
          avatarUrl: user?.avatarUrl,
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
        ratingAvg: getRatingAvg(master.id),
        reviewsCount: masterReviews.length,
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
        avatarUrl: user?.avatarUrl,
      };
    }

    function upsertReview(input: NewReviewInput) {
      setReviews((prevReviews) => {
        const existingReview = prevReviews.find(
          (review) =>
            review.masterId === input.masterId && review.userId === input.user.id
        );

        const payload: Review = {
          id: existingReview?.id ?? Date.now(),
          userId: input.user.id,
          masterId: input.masterId,
          rating: input.rating,
          comment: input.comment,
          createdAt: existingReview?.createdAt ?? new Date().toISOString(),
        };

        insertReview(payload).catch((error) => {
          console.warn('Failed to save review', error);
        });

        if (existingReview) {
          return prevReviews.map((review) =>
            review.id === existingReview.id ? payload : review
          );
        }

        return [payload, ...prevReviews];
      });
    }

    function addMaster(input: AddMasterInput) {
      const name = input.name.trim();
      const surname = input.surname.trim();
      const normalizedPhone = input.phone.trim();
      const normalizedEmail = input.email.trim().toLowerCase();
      const password = input.password.trim();
      const description = input.description.trim();

      if (
        !name ||
        !surname ||
        !normalizedPhone ||
        !normalizedEmail ||
        !password ||
        !description ||
        !input.categoryId ||
        !Number.isFinite(input.price) || input.price <= 0
      ) {
        return {
          success: false,
          error: 'Please fill in all fields correctly.',
        };
      }

      const emailExists = users.some(
        (user) => user.email.toLowerCase() === normalizedEmail
      );

      if (emailExists) {
        return {
          success: false,
          error: 'User with this email already exists.',
        };
      }

      const phoneExists = users.some((user) => user.phone.trim() === normalizedPhone);

      if (phoneExists) {
        return {
          success: false,
          error: 'User with this phone already exists.',
        };
      }

      const userId = Date.now();
      const masterId = userId + 1;
      const serviceId = userId + 2;
      const timestamp = new Date().toISOString();

      const newUser: User = {
        id: userId,
        name,
        surname,
        email: normalizedEmail,
        phone: normalizedPhone,
        passwordHash: password,
        roleId: 2,
        avatarUrl: input.avatarUrl,
        createdAt: timestamp,
        updatedAt: timestamp,

      };

      const newMaster: MasterProfile = {
        id: masterId,
        userId,
        description,
        expYears: 0,
        priceFrom: input.price,
        ratingAvg: 0,
        reviewsCount: 0,
        isActive: true,
        createdAt: timestamp,
        updatedAt: timestamp,
      };

      const newService: Service = {
        id: serviceId,
        masterId,
        categoryId: input.categoryId,
        title: description.slice(0, 32) || 'Service',
        description,
        price: input.price,
        priceType: input.priceType,
        durationMin: 60,
        createdAt: timestamp,
        updatedAt: timestamp,
      };

      insertUser(newUser).catch((error) => {
        console.warn('Failed to save user', error);
      });
      insertMasterProfile(newMaster).catch((error) => {
        console.warn('Failed to save master profile', error);
      });
      insertService(newService).catch((error) => {
        console.warn('Failed to save service', error);
      });

      setUsers((prevUsers) => [...prevUsers, newUser]);
      setMasterProfiles((prevMasters) => [...prevMasters, newMaster]);
      setServices((prevServices) => [...prevServices, newService]);
      setCurrentUser(newUser);

      return { success: true };
    }

    function registerClient(input: RegisterClientInput) {
      const name = input.name.trim();
      const surname = input.surname.trim();
      const normalizedEmail = input.email.trim().toLowerCase();
      const normalizedPhone = input.phone.trim();
      const password = input.password.trim();

      if (!name || !surname || !normalizedEmail || !normalizedPhone || !password) {
        return {
          success: false,
          error: 'Please fill in all fields.',
        };
      }

      const emailExists = users.some(
        (user) => user.email.toLowerCase() === normalizedEmail
      );

      if (emailExists) {
        return {
          success: false,
          error: 'User with this email already exists.',
        };
      }

      const phoneExists = users.some((user) => user.phone.trim() === normalizedPhone);

      if (phoneExists) {
        return {
          success: false,
          error: 'User with this phone already exists.',
        };
      }

      const timestamp = new Date().toISOString();

      const newUser: User = {
        id: Date.now(),
        name,
        surname,
        email: normalizedEmail,
        phone: normalizedPhone,
        passwordHash: password,
        roleId: 1,
        createdAt: timestamp,
        updatedAt: timestamp,
          avatarUrl: input.avatarUrl,
      };

      insertUser(newUser).catch((error) => {
        console.warn('Failed to save client user', error);
      });

      setUsers((prevUsers) => [...prevUsers, newUser]);
      setCurrentUser(newUser);

      return { success: true };
    }
    function login(email: string, password: string) {
      const normalizedEmail = email.trim().toLowerCase();

      const foundUser = users.find(
        (user) =>
          user.email.toLowerCase() === normalizedEmail &&
          user.passwordHash === password
      );

      if (!foundUser) {
        return false;
      }

      setCurrentUser(foundUser);
      return true;
    }

    function logout() {
      setCurrentUser(null);
    }

    return {
      categories,
      currentUser,
      isDatabaseReady,
      getMasterCards,
      getMasterDetails,
      upsertReview,
      addMaster,
      login,
      logout,
      hasMasterProfile,
      registerClient,
    };
  }, [
    categories,
    currentUser,
    isDatabaseReady,
    masterProfiles,
    reviews,
    services,
    users,
  ]);

  return (
    <HandyHubContext.Provider value={value}>
      {children}
    </HandyHubContext.Provider>
  );
}

export function useHandyHub() {
  const context = useContext(HandyHubContext);

  if (!context) {
    throw new Error('useHandyHub must be used inside HandyHubProvider');
  }

  return context;
}