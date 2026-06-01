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
