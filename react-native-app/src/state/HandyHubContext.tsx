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
  type UserReviewItem,
} from '@/data/handyhub-data';

import {
  initializeDatabase,
  insertMasterProfile,
  insertReview,
  insertService,
  insertUser,
  loadDatabaseSnapshot,
  updateMasterProfileInDatabase,
  updateUserProfileInDatabase,
  updateUserRoleInDatabase,
} from '@/database/handyhub-db';
import { isValidEmail } from '@/utils/validation';

type UpdateMasterProfileInput = {
  masterId: number;
  serviceId: number;
  categoryId: number;
  title: string;
  priceType: Service['priceType'];
  price: number;
  durationMin: number;
  description: string;
};

type AddServiceInput = {
  masterId: number;
  categoryId: number;
  title: string;
  description: string;
  priceType: Service['priceType'];
  price: number;
  durationMin: number;
};

type SetServiceActiveInput = {
  serviceId: number;
  isActive: boolean;
};

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

type UpdateProfileInput = {
  name: string;
  surname: string;
  phone: string;
  email: string;
  avatarUrl?: string;
};

type HandyHubState = {
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
  updateMasterProfile: (  input: UpdateMasterProfileInput) => { success: boolean; error?: string };
  addService: (input: AddServiceInput) => { success: boolean; error?: string };
  setServiceActive: (input: SetServiceActiveInput) => { success: boolean; error?: string };
  getReviewsByUserId: (userId: number) => UserReviewItem[];
  
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
        const masterServices = services.filter(
          (item) => item.masterId === master.id && item.isActive
        );
        const service = masterServices[0];
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
      const activeMasterServices = masterServices.filter((service) => service.isActive);
      const mainService = activeMasterServices[0];
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
            isActive: service.isActive,
            categoryName: category?.name ?? 'Service',
          };
        }),
        reviews: masterReviews,
        avatarUrl: user?.avatarUrl,
      };
    }

    function getMasterDetailsByUserId(userId: number) {
      const master = masterProfiles.find((item) => item.userId === userId);

      if (!master) {
        return undefined;
      }

      return getMasterDetails(master.id);
}

    function getReviewsByUserId(userId: number): UserReviewItem[] {
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
        (!currentUser && !password) ||
        !description ||
        !input.categoryId ||
        !Number.isFinite(input.price) || input.price <= 0
      ) {
        return {
          success: false,
          error: 'Please fill in all fields correctly.',
        };
      }

      if (!isValidEmail(normalizedEmail)) {
        return {
          success: false,
          error: 'Please enter a valid email address.',
        };
      }

      const existingUserId = currentUser?.id;

      const emailExists = users.some(
        (user) =>
          user.id !== existingUserId &&
          user.email.toLowerCase() === normalizedEmail
      );

      if (emailExists) {
        return {
          success: false,
          error: 'User with this email already exists.',
        };
      }

      const phoneExists = users.some(
        (user) =>
          user.id !== existingUserId && user.phone.trim() === normalizedPhone
      );

      if (phoneExists) {
        return {
          success: false,
          error: 'User with this phone already exists.',
        };
      }

      if (currentUser && hasMasterProfile(currentUser.id)) {
        return {
          success: false,
          error: 'Master profile already exists.',
        };
      }

      const timestampId = Date.now();
      const userId = currentUser?.id ?? timestampId;
      const masterId = timestampId + 1;
      const serviceId = timestampId + 2;
      const timestamp = new Date().toISOString();



      const newUser: User = {
        id: userId,
        name,
        surname,
        email: normalizedEmail,
        phone: normalizedPhone,
        passwordHash: password || currentUser?.passwordHash || '',
        roleId: 2,
        avatarUrl: input.avatarUrl ?? currentUser?.avatarUrl,
        createdAt: currentUser?.createdAt ?? timestamp,
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
        isActive: true,
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

      setUsers((prevUsers) => {
        const userExists = prevUsers.some((user) => user.id === newUser.id);

        if (userExists) {
          return prevUsers.map((user) =>
            user.id === newUser.id ? newUser : user
          );
        }

        return [...prevUsers, newUser];
      });
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

      if (!isValidEmail(normalizedEmail)) {
        return {
          success: false,
          error: 'Please enter a valid email address.',
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

      setUsers((prevUsers) => {
        const userExists = prevUsers.some((user) => user.id === newUser.id);

        if (userExists) {
          return prevUsers.map((user) =>
            user.id === newUser.id ? newUser : user
          );
        }

        return [...prevUsers, newUser];
      });

      setCurrentUser(newUser);

      return { success: true };
    }

    function updateProfile(input: UpdateProfileInput) {
      if (!currentUser) {
        return {
          success: false,
          error: 'Log in to edit your profile.',
        };
      }

      const name = input.name.trim();
      const surname = input.surname.trim();
      const normalizedEmail = input.email.trim().toLowerCase();
      const normalizedPhone = input.phone.trim();

      if (!name || !surname || !normalizedEmail || !normalizedPhone) {
        return {
          success: false,
          error: 'Please fill in all fields.',
        };
      }

      if (!isValidEmail(normalizedEmail)) {
        return {
          success: false,
          error: 'Please enter a valid email address.',
        };
      }

      if (normalizedPhone.length < 6) {
        return {
          success: false,
          error: 'Please enter a valid phone number.',
        };
      }

      const emailExists = users.some(
        (user) =>
          user.id !== currentUser.id &&
          user.email.toLowerCase() === normalizedEmail
      );

      if (emailExists) {
        return {
          success: false,
          error: 'User with this email already exists.',
        };
      }

      const phoneExists = users.some(
        (user) =>
          user.id !== currentUser.id && user.phone.trim() === normalizedPhone
      );

      if (phoneExists) {
        return {
          success: false,
          error: 'User with this phone already exists.',
        };
      }

      const updatedUser: User = {
        ...currentUser,
        name,
        surname,
        email: normalizedEmail,
        phone: normalizedPhone,
        avatarUrl: input.avatarUrl ?? currentUser.avatarUrl,
        updatedAt: new Date().toISOString(),
      };

      updateUserProfileInDatabase(updatedUser).catch((error) => {
        console.warn('Failed to update user profile', error);
      });

      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          user.id === updatedUser.id ? updatedUser : user
        )
      );
      setCurrentUser(updatedUser);

      return { success: true };
    }

    function updateMasterProfile(input: UpdateMasterProfileInput) {
      const master = masterProfiles.find((item) => item.id === input.masterId);
      const service = services.find((item) => item.id === input.serviceId);

      if (!master || !service) {
        return {
          success: false,
          error: 'Master profile not found.',
        };
      }

      const title = input.title.trim();

      if (!title) {
        return {
          success: false,
          error: 'Please enter service title.',
        };
      }

      if (!input.categoryId) {
        return {
          success: false,
          error: 'Please select a category.',
        };
      }

      if (!Number.isFinite(input.price) || input.price <= 0) {
        return {
          success: false,
          error: 'Please enter a valid price.',
        };
      }

      if (!Number.isFinite(input.durationMin) || input.durationMin <= 0) {
        return {
          success: false,
          error: 'Please enter a valid duration.',
        };
      }

      const description = input.description.trim();

      if (!description) {
        return {
          success: false,
          error: 'Please enter service description.',
        };
      }

      const timestamp = new Date().toISOString();
      const updatedServicePrices = services.map((item) =>
        item.id === service.id ? input.price : item.price
      );
      const masterServicePrices = updatedServicePrices.filter((_, index) => {
        const item = services[index];
        return item.masterId === master.id && item.isActive;
      });

      const updatedMaster: MasterProfile = {
        ...master,
        description,
        priceFrom: Math.min(...masterServicePrices),
        updatedAt: timestamp,
      };

      const updatedService: Service = {
        ...service,
        categoryId: input.categoryId,
        title,
        description,
        price: input.price,
        priceType: input.priceType,
        durationMin: input.durationMin,
        isActive: service.isActive,
        updatedAt: timestamp,
      };

      updateMasterProfileInDatabase(updatedMaster, updatedService).catch((error) => {
        console.warn('Failed to update master profile', error);
      });

      setMasterProfiles((prevMasters) =>
        prevMasters.map((item) =>
          item.id === updatedMaster.id ? updatedMaster : item
        )
      );

      setServices((prevServices) =>
        prevServices.map((item) =>
          item.id === updatedService.id ? updatedService : item
        )
      );

      return { success: true };
    }

    function addService(input: AddServiceInput) {
      const master = masterProfiles.find((item) => item.id === input.masterId);

      if (!master) {
        return {
          success: false,
          error: 'Master profile not found.',
        };
      }

      const title = input.title.trim();
      const description = input.description.trim();

      if (!input.categoryId || !title || !description) {
        return {
          success: false,
          error: 'Please fill in all service fields.',
        };
      }

      if (!Number.isFinite(input.price) || input.price <= 0) {
        return {
          success: false,
          error: 'Please enter a valid price.',
        };
      }

      if (!Number.isFinite(input.durationMin) || input.durationMin <= 0) {
        return {
          success: false,
          error: 'Please enter a valid duration.',
        };
      }

      const timestamp = new Date().toISOString();

      const newService: Service = {
        id: Date.now(),
        masterId: input.masterId,
        categoryId: input.categoryId,
        title,
        description,
        price: input.price,
        priceType: input.priceType,
        durationMin: input.durationMin,
        isActive: true,
        createdAt: timestamp,
        updatedAt: timestamp,
      };

      const masterServicePrices = services
        .filter((service) => service.masterId === input.masterId)
        .map((service) => service.price);

      const updatedMaster: MasterProfile = {
        ...master,
        priceFrom: Math.min(...masterServicePrices, input.price),
        updatedAt: timestamp,
      };

      insertService(newService).catch((error) => {
        console.warn('Failed to save service', error);
      });

      insertMasterProfile(updatedMaster).catch((error) => {
        console.warn('Failed to update master profile price', error);
      });

      setServices((prevServices) => [...prevServices, newService]);
      setMasterProfiles((prevMasters) =>
        prevMasters.map((item) =>
          item.id === updatedMaster.id ? updatedMaster : item
        )
      );

      return { success: true };
    }

    function setServiceActive(input: SetServiceActiveInput) {
      const service = services.find((item) => item.id === input.serviceId);

      if (!service) {
        return {
          success: false,
          error: 'Service not found.',
        };
      }

      const master = masterProfiles.find((item) => item.id === service.masterId);

      if (!master) {
        return {
          success: false,
          error: 'Master profile not found.',
        };
      }

      const activeServices = services.filter(
        (item) => item.masterId === service.masterId && item.isActive
      );

      if (!input.isActive && activeServices.length <= 1 && service.isActive) {
        return {
          success: false,
          error: 'At least one active service is required.',
        };
      }

      const timestamp = new Date().toISOString();
      const updatedService: Service = {
        ...service,
        isActive: input.isActive,
        updatedAt: timestamp,
      };

      const servicesAfterUpdate = services.map((item) =>
        item.id === updatedService.id ? updatedService : item
      );
      const activePrices = servicesAfterUpdate
        .filter((item) => item.masterId === master.id && item.isActive)
        .map((item) => item.price);

      const updatedMaster: MasterProfile = {
        ...master,
        priceFrom: Math.min(...activePrices),
        updatedAt: timestamp,
      };

      insertService(updatedService).catch((error) => {
        console.warn('Failed to update service status', error);
      });

      insertMasterProfile(updatedMaster).catch((error) => {
        console.warn('Failed to update master profile price', error);
      });

      setServices(servicesAfterUpdate);
      setMasterProfiles((prevMasters) =>
        prevMasters.map((item) =>
          item.id === updatedMaster.id ? updatedMaster : item
        )
      );

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

    function updateUserRole(userId: number, roleId: User['roleId']) {
      const timestamp = new Date().toISOString();

      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          user.id === userId
            ? { ...user, roleId, updatedAt: timestamp }
            : user
        )
      );

      setCurrentUser((prevUser) =>
        prevUser?.id === userId
          ? { ...prevUser, roleId, updatedAt: timestamp }
          : prevUser
      );

      updateUserRoleInDatabase(userId, roleId, timestamp).catch((error) => {
        console.warn('Failed to update user role', error);
      });
    }

    return {
      categories,
      currentUser,
      isDatabaseReady,
      getMasterCards,
      getMasterDetails,
      getMasterDetailsByUserId,
      upsertReview,
      addMaster,
      login,
      logout,
      hasMasterProfile,
      registerClient,
      updateProfile,
      updateMasterProfile,
      addService,
      setServiceActive,
      updateUserRole,
      getReviewsByUserId,
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
