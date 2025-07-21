import { prisma } from "../../prisma/client";
import { article } from "../models/article.model";

export const getAll = () => {
  return prisma.article.findMany();
};

export const getByCategory = (categoryId: number) => {
  return prisma.article.findMany({ where: { categoryId } });
};

export const create = (data: Omit<article, "createdAt">) => {
  return prisma.article.create({
    data: {
      ...data,
      createdAt: new Date(),
    },
  });
};

// export const update = (id: number, data: Partial<article>) => {
//   return prisma.article.update({ where: { id }, data });
// };

export const remove = (id: number) => {
  return prisma.article.delete({ where: { id } });
};
