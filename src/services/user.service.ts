import { User } from '../models/user.model';
import { prisma } from '../../prisma/client';

// עדכון פרטי משתמש
export const updateUser = (id: number, data: Partial<Omit<User, 'id' | 'createdAt' | 'updatedAt' | 'password'| 'applicants'>>) => {
  return prisma.user.update({
    where: { id },
    data,
  });
};

// מחיקת משתמש
export const deleteUser = (id: number) =>
  prisma.user.delete({ where: { id } });

// קבלת כל המשתמשים (עם שדות נבחרים)
export const getAllUsers = () => {
  return prisma.user.findMany({
    select: {
      id: true,
      firstName: true,
      lastName: true,
      email: true,
      phone: true,
      tz: true,
      role: true,
      createdAt: true,
      updatedAt: true,
    },
  });
};

// קבלת משתמש לפי ID (עם שדות נבחרים)
export const getUserById = (id: number) => {
  return prisma.user.findUnique({
    where: { id },
    select: {
      id: true,
      firstName: true,
      lastName: true,
      email: true,
      phone: true,
      tz: true,
      role: true,
      createdAt: true,
      updatedAt: true,
    },
  });
};
