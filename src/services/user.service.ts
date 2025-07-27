import { User } from '../models/user.model';
import { prisma } from '../../prisma/client';


export const updateUser = (id: number, data: Partial<Omit<User, 'id' | 'createdAt' | 'updatedAt' | 'password'| 'applicants'>>) => {
  return prisma.user.update({
    where: { id },
    data,
  });
};


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
