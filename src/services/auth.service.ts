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

// התחברות משתמש (Login)
export const loginUser = async (email: string, password: string) => {
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) throw new Error('Invalid credentials');

  const valid = await bcrypt.compare(password, user.password);
  if (!valid) throw new Error('Invalid credentials');

  return user;
};

// שינוי סיסמה
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
