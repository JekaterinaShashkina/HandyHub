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
} from '@/data/seed';
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
import {
  loadAppData,
  saveMasterProfile,
  saveReview,
  saveService,
  saveUser,
  updateMasterProfile as updateMasterProfileInRepository,
  updateUserProfile as updateUserProfileInRepository,
  updateUserRole as updateUserRoleInRepository,
} from '@/data/repository/repository';
import {
  createMasterRegistrationBundle,
  hasMasterProfile as hasMasterProfileInList,
  upsertMasterProfileInList,
} from '@/domain/usecases/masterUseCases';
import { upsertReviewInList } from '@/domain/usecases/reviewUseCases';
import {
  addServiceToMaster,
  setServiceActiveForMaster,
  updateMasterService,
} from '@/domain/usecases/serviceUseCases';
import {
  createClientUser,
  findUserForLogin,
  updateCurrentUserRole,
  updateUserProfile,
  updateUserRoleInList,
  upsertUserInList,
} from '@/domain/usecases/userUseCases';
import {
  buildMasterCards,
  buildMasterDetails,
  buildMasterDetailsByUserId,
  buildReviewsByUserId,
} from '@/ui/mappers/masterMappers';
import {
  normalizeServiceInput,
  validateServiceInput,
} from '@/domain/validation/serviceValidation';
import type {
  AddMasterInput,
  AddServiceInput,
  HandyHubState,
  NewReviewInput,
  RegisterClientInput,
  SetServiceActiveInput,
  UpdateMasterProfileInput,
  UpdateProfileInput,
} from '@/state/types';
import {
  getContactConflict,
  normalizeUserContact,
  validateEmail,
  validatePhoneLength,
} from '@/domain/validation/userValidation';

const AppContext = createContext<HandyHubState | undefined>(undefined);

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
        const snapshot = await loadAppData();

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
    function hasMasterProfile(userId: number) {
      return hasMasterProfileInList(masterProfiles, userId);
    }

    function getMasterCards(): MasterCardItem[] {
      return buildMasterCards({
        categories,
        users,
        masterProfiles,
        services,
        reviews,
      });
    }

    function getMasterDetails(masterId: number): MasterDetails | undefined {
      return buildMasterDetails({
        categories,
        users,
        masterProfiles,
        services,
        reviews,
        masterId,
      });
    }

    function getMasterDetailsByUserId(userId: number) {
      return buildMasterDetailsByUserId({
        categories,
        users,
        masterProfiles,
        services,
        reviews,
        userId,
      });
    }

    function getReviewsByUserId(userId: number): UserReviewItem[] {
      return buildReviewsByUserId({
        categories,
        users,
        masterProfiles,
        services,
        reviews,
        userId,
      });
    }

    function upsertReview(input: NewReviewInput) {
      setReviews((prevReviews) => {
        const { review, reviews: nextReviews } = upsertReviewInList(
          prevReviews,
          input,
          new Date().toISOString()
        );

        saveReview(review).catch((error) => {
          console.warn('Failed to save review', error);
        });

        return nextReviews;
      });
    }

    function addMaster(input: AddMasterInput) {
      const {
        name,
        surname,
        normalizedEmail,
        normalizedPhone,
      } = normalizeUserContact(input);
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

      const emailError = validateEmail(normalizedEmail);

      if (emailError) {
        return {
          success: false,
          error: emailError,
        };
      }

      const existingUserId = currentUser?.id;
      const contactConflict = getContactConflict({
        users,
        email: normalizedEmail,
        phone: normalizedPhone,
        ignoredUserId: existingUserId,
      });

      if (contactConflict) {
        return {
          success: false,
          error: contactConflict,
        };
      }

      if (currentUser && hasMasterProfile(currentUser.id)) {
        return {
          success: false,
          error: 'Master profile already exists.',
        };
      }

      const timestamp = new Date().toISOString();
      const { newUser, newMaster, newService } = createMasterRegistrationBundle({
        contact: {
          name,
          surname,
          normalizedEmail,
          normalizedPhone,
        },
        input,
        password,
        description,
        currentUser,
        timestampId: Date.now(),
        timestamp,
      });

      saveUser(newUser).catch((error) => {
        console.warn('Failed to save user', error);
      });
      saveMasterProfile(newMaster).catch((error) => {
        console.warn('Failed to save master profile', error);
      });
      saveService(newService).catch((error) => {
        console.warn('Failed to save service', error);
      });

      setUsers((prevUsers) => upsertUserInList(prevUsers, newUser));
      setMasterProfiles((prevMasters) =>
        upsertMasterProfileInList(prevMasters, newMaster)
      );
      setServices((prevServices) => [...prevServices, newService]);
      setCurrentUser(newUser);

      return { success: true };
    }

    function registerClient(input: RegisterClientInput) {
      const {
        name,
        surname,
        normalizedEmail,
        normalizedPhone,
      } = normalizeUserContact(input);
      const password = input.password.trim();

      if (!name || !surname || !normalizedEmail || !normalizedPhone || !password) {
        return {
          success: false,
          error: 'Please fill in all fields.',
        };
      }

      const emailError = validateEmail(normalizedEmail);

      if (emailError) {
        return {
          success: false,
          error: emailError,
        };
      }

      const contactConflict = getContactConflict({
        users,
        email: normalizedEmail,
        phone: normalizedPhone,
      });

      if (contactConflict) {
        return {
          success: false,
          error: contactConflict,
        };
      }

      const timestamp = new Date().toISOString();

      const newUser = createClientUser({
        contact: {
          name,
          surname,
          normalizedEmail,
          normalizedPhone,
        },
        password,
        avatarUrl: input.avatarUrl,
        timestamp,
      });

      saveUser(newUser).catch((error) => {
        console.warn('Failed to save client user', error);
      });

      setUsers((prevUsers) => upsertUserInList(prevUsers, newUser));

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

      const {
        name,
        surname,
        normalizedEmail,
        normalizedPhone,
      } = normalizeUserContact(input);

      if (!name || !surname || !normalizedEmail || !normalizedPhone) {
        return {
          success: false,
          error: 'Please fill in all fields.',
        };
      }

      const emailError = validateEmail(normalizedEmail);

      if (emailError) {
        return {
          success: false,
          error: emailError,
        };
      }

      const phoneError = validatePhoneLength(normalizedPhone);

      if (phoneError) {
        return {
          success: false,
          error: phoneError,
        };
      }

      const contactConflict = getContactConflict({
        users,
        email: normalizedEmail,
        phone: normalizedPhone,
        ignoredUserId: currentUser.id,
      });

      if (contactConflict) {
        return {
          success: false,
          error: contactConflict,
        };
      }

      const updatedUser = updateUserProfile({
        user: currentUser,
        contact: {
          name,
          surname,
          normalizedEmail,
          normalizedPhone,
        },
        avatarUrl: input.avatarUrl,
        timestamp: new Date().toISOString(),
      });

      updateUserProfileInRepository(updatedUser).catch((error) => {
        console.warn('Failed to update user profile', error);
      });

      setUsers((prevUsers) => upsertUserInList(prevUsers, updatedUser));
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

      const serviceInput = normalizeServiceInput(input);
      const serviceError = validateServiceInput(serviceInput);

      if (serviceError) {
        return {
          success: false,
          error: serviceError,
        };
      }

      const timestamp = new Date().toISOString();
      const {
        updatedMaster,
        updatedService,
        services: nextServices,
      } = updateMasterService({
        master,
        service,
        services,
        serviceInput,
        timestamp,
      });

      updateMasterProfileInRepository(updatedMaster, updatedService).catch((error) => {
        console.warn('Failed to update master profile', error);
      });

      setMasterProfiles((prevMasters) =>
        upsertMasterProfileInList(prevMasters, updatedMaster)
      );

      setServices(nextServices);

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

      const serviceInput = normalizeServiceInput(input);
      const serviceError = validateServiceInput(serviceInput);

      if (serviceError) {
        return {
          success: false,
          error: serviceError,
        };
      }

      const timestamp = new Date().toISOString();

      const {
        newService,
        updatedMaster,
        services: nextServices,
      } = addServiceToMaster({
        master,
        services,
        serviceInput,
        timestamp,
      });

      saveService(newService).catch((error) => {
        console.warn('Failed to save service', error);
      });

      saveMasterProfile(updatedMaster).catch((error) => {
        console.warn('Failed to update master profile price', error);
      });

      setServices(nextServices);
      setMasterProfiles((prevMasters) =>
        upsertMasterProfileInList(prevMasters, updatedMaster)
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

      const timestamp = new Date().toISOString();
      const result = setServiceActiveForMaster({
        master,
        service,
        services,
        isActive: input.isActive,
        timestamp,
      });

      if (!result.success) {
        return {
          success: false,
          error: result.error,
        };
      }

      saveService(result.updatedService).catch((error) => {
        console.warn('Failed to update service status', error);
      });

      saveMasterProfile(result.updatedMaster).catch((error) => {
        console.warn('Failed to update master profile price', error);
      });

      setServices(result.services);
      setMasterProfiles((prevMasters) =>
        upsertMasterProfileInList(prevMasters, result.updatedMaster)
      );

      return { success: true };
    }
    
    function login(email: string, password: string) {
      const foundUser = findUserForLogin(users, email, password);

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
        updateUserRoleInList(prevUsers, userId, roleId, timestamp)
      );

      setCurrentUser((prevUser) =>
        updateCurrentUserRole(prevUser, userId, roleId, timestamp)
      );

      updateUserRoleInRepository(userId, roleId, timestamp).catch((error) => {
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
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
}

export function useHandyHub() {
  const context = useContext(AppContext);

  if (!context) {
    throw new Error('useHandyHub must be used inside HandyHubProvider');
  }

  return context;
}
