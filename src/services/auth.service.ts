import { prisma } from '../../prisma/client';
import { User } from '../models/user.model';
import bcrypt from 'bcrypt';
export const createUser = async (
  data: Omit<User, 'id' | 'createdAt' | 'updatedAt' | 'applicants'>
) => {
  const hashedPassword = await bcrypt.hash(data.password, 10);

  const newUser = await prisma.user.create({
    data: {
      ...data,
      password: hashedPassword,
    },
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

  return newUser;
};

export const loginUser = async (email: string, password: string) => {
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) throw new Error('Invalid credentials');

  const valid = await bcrypt.compare(password, user.password);
  if (!valid) throw new Error('Invalid credentials');
  const { password: _, ...safeUser } = user;
  return safeUser;
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
