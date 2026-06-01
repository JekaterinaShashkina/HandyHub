import type { User } from '@/models';
import { isValidEmail } from '@/utils/validation';

type UserContactInput = {
  name: string;
  surname: string;
  email: string;
  phone: string;
};

type ContactConflictInput = {
  users: User[];
  email: string;
  phone: string;
  ignoredUserId?: number;
};

export function normalizeUserContact(input: UserContactInput) {
  return {
    name: input.name.trim(),
    surname: input.surname.trim(),
    normalizedEmail: input.email.trim().toLowerCase(),
    normalizedPhone: input.phone.trim(),
  };
}

export function validateEmail(value: string) {
  if (!isValidEmail(value)) {
    return 'Please enter a valid email address.';
  }

  return undefined;
}

export function validatePhoneLength(value: string) {
  if (value.length < 6) {
    return 'Please enter a valid phone number.';
  }

  return undefined;
}

export function getContactConflict({
  users,
  email,
  phone,
  ignoredUserId,
}: ContactConflictInput) {
  const emailExists = users.some(
    (user) =>
      user.id !== ignoredUserId &&
      user.email.toLowerCase() === email
  );

  if (emailExists) {
    return 'User with this email already exists.';
  }

  const phoneExists = users.some(
    (user) => user.id !== ignoredUserId && user.phone.trim() === phone
  );

  if (phoneExists) {
    return 'User with this phone already exists.';
  }

  return undefined;
}
