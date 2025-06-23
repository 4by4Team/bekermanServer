import { prisma } from '../../prisma/client';
import { articleDTO } from '../dtos/article.dto';

export const getAll = () => {
  return prisma.article.findMany({ include: { category: true } });
};

export const getByCategory = (categoryId: number) => {
  return prisma.article.findMany({ where: { categoryId } });
};

export const create = (data: articleDTO) => {
  return prisma.article.create({ data });
};

export const update = (id: number, data: Partial<articleDTO>) => {
  return prisma.article.update({ where: { id }, data });
};

export const remove = (id: number) => {
  return prisma.article.delete({ where: { id } });
};
