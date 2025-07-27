import { User } from '../models/user.model'; 
import { prisma } from '../../prisma/client';
import bcrypt from 'bcrypt';

// יצירת משתמש (Register)
export const createUser = async (data: Omit<User, 'id' | 'createdAt' | 'updatedAt'| 'applicants'>) => {
  const hashedPassword = await bcrypt.hash(data.password, 10);

  return prisma.user.create({
    data: {
      ...data,
      password: hashedPassword,
    },
  });
};

// התחברות משתמש
export const loginUser = async (email: string, password: string) => {
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) throw new Error('Invalid credentials');

  const valid = await bcrypt.compare(password, user.password);
  if (!valid) throw new Error('Invalid credentials');

  return user; 
};

// עדכון פרטי משתמש
export const updateUser = (id: number, data: Partial<Omit<User, 'id' | 'createdAt' | 'updatedAt' | 'password'| 'applicants'>>) => {
  return prisma.user.update({
    where: { id },
    data,
  });
};


export const changePassword = async (id: number, currentPassword: string, newPassword: string) => {
  const user = await prisma.user.findUnique({ where: { id } });
  if (!user) throw new Error('User not found');

  const match = await bcrypt.compare(currentPassword, user.password);
  if (!match) throw new Error('Current password is incorrect');

  const hashed = await bcrypt.hash(newPassword, 10);

  return prisma.user.update({
    where: { id },
    data: { password: hashed },
  });
};

// מחיקת משתמש
export const deleteUser = (id: number) =>
  prisma.user.delete({ where: { id } });


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

// קבלת משתמש לפי ID (אפשר לבחור מה להחזיר)
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
