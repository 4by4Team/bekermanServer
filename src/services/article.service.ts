import { prisma } from '../../prisma/client';
import { article } from '../models/article.model';

export const getAll = () => {
  return prisma.article.findMany({ include: { category: true } });
};

export const getByCategory = (categoryId: number) => {
  return prisma.article.findMany({ where: { categoryId } });
};

export const create = (data: article) => {
  return prisma.article.create({ data });
};

export const update = (id: number, data: Partial<article>) => {
  return prisma.article.update({ where: { id }, data });
};

export const remove = (id: number) => {
  return prisma.article.delete({ where: { id } });
};
