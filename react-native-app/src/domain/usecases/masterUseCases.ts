import type { MasterProfile, Service, User } from '@/models';
import type { normalizeUserContact } from '@/domain/validation/userValidation';

type NormalizedUserContact = ReturnType<typeof normalizeUserContact>;

type AddMasterInput = {
  categoryId: number;
  priceType: Service['priceType'];
  price: number;
  description: string;
  avatarUrl?: string;
};

type CreateMasterRegistrationInput = {
  contact: NormalizedUserContact;
  input: AddMasterInput;
  password: string;
  description: string;
  currentUser: User | null;
  timestampId: number;
  timestamp: string;
};

type MasterRegistrationBundle = {
  newUser: User;
  newMaster: MasterProfile;
  newService: Service;
};

export function createMasterRegistrationBundle({
  contact,
  input,
  password,
  description,
  currentUser,
  timestampId,
  timestamp,
}: CreateMasterRegistrationInput): MasterRegistrationBundle {
  const userId = currentUser?.id ?? timestampId;
  const masterId = timestampId + 1;
  const serviceId = timestampId + 2;

  const newUser: User = {
    id: userId,
    name: contact.name,
    surname: contact.surname,
    email: contact.normalizedEmail,
    phone: contact.normalizedPhone,
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

  return {
    newUser,
    newMaster,
    newService,
  };
}

export function hasMasterProfile(
  masterProfiles: MasterProfile[],
  userId: number
) {
  return masterProfiles.some((master) => master.userId === userId);
}

export function upsertMasterProfileInList(
  masterProfiles: MasterProfile[],
  masterToSave: MasterProfile
) {
  const masterExists = masterProfiles.some(
    (master) => master.id === masterToSave.id
  );

  if (masterExists) {
    return masterProfiles.map((master) =>
      master.id === masterToSave.id ? masterToSave : master
    );
  }

  return [...masterProfiles, masterToSave];
}
