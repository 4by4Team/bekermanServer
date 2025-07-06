import { prisma } from '../../prisma/client'; // Adjust the import path as necessary
import { category } from '../dtos/category.dto';

export const getAll = () => {
  return prisma.category.findMany({ include: { articles: true } });
};

export const getById = (id: number) => {
  return prisma.category.findUnique({ where: { id }, include: { articles: true } });
};

export const create = (data: category) => {
  return prisma.category.create({ data });
};

export const update = (id: number, data: Partial<category>) => {
  return prisma.category.update({ where: { id }, data });
};

export const remove = (id: number) => {
  return prisma.category.delete({ where: { id } });
};