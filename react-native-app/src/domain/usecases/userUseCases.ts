import type { User } from '@/models';
import type { normalizeUserContact } from '@/domain/validation/userValidation';

type NormalizedUserContact = ReturnType<typeof normalizeUserContact>;

type CreateClientUserInput = {
  contact: NormalizedUserContact;
  password: string;
  avatarUrl?: string;
  timestamp: string;
};

type UpdateUserProfileInput = {
  user: User;
  contact: NormalizedUserContact;
  avatarUrl?: string;
  timestamp: string;
};

export function upsertUserInList(users: User[], userToSave: User) {
  const userExists = users.some((user) => user.id === userToSave.id);

  if (userExists) {
    return users.map((user) =>
      user.id === userToSave.id ? userToSave : user
    );
  }

  return [...users, userToSave];
}

export function createClientUser({
  contact,
  password,
  avatarUrl,
  timestamp,
}: CreateClientUserInput): User {
  return {
    id: Date.now(),
    name: contact.name,
    surname: contact.surname,
    email: contact.normalizedEmail,
    phone: contact.normalizedPhone,
    passwordHash: password,
    roleId: 1,
    createdAt: timestamp,
    updatedAt: timestamp,
    avatarUrl,
  };
}

export function findUserForLogin(
  users: User[],
  email: string,
  password: string
) {
  const normalizedEmail = email.trim().toLowerCase();

  return users.find(
    (user) =>
      user.email.toLowerCase() === normalizedEmail &&
      user.passwordHash === password
  );
}

export function updateUserProfile({
  user,
  contact,
  avatarUrl,
  timestamp,
}: UpdateUserProfileInput): User {
  return {
    ...user,
    name: contact.name,
    surname: contact.surname,
    email: contact.normalizedEmail,
    phone: contact.normalizedPhone,
    avatarUrl: avatarUrl ?? user.avatarUrl,
    updatedAt: timestamp,
  };
}

export function updateUserRoleInList(
  users: User[],
  userId: number,
  roleId: User['roleId'],
  timestamp: string
) {
  return users.map((user) =>
    user.id === userId ? { ...user, roleId, updatedAt: timestamp } : user
  );
}

export function updateCurrentUserRole(
  currentUser: User | null,
  userId: number,
  roleId: User['roleId'],
  timestamp: string
) {
  if (currentUser?.id !== userId) {
    return currentUser;
  }

  return {
    ...currentUser,
    roleId,
    updatedAt: timestamp,
  };
}
