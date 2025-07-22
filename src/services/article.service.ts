import { prisma } from "../../prisma/client";
import { article } from "../models/article.model";


export const getAllArticales  = () => {
  return prisma.article.findMany();

}

export const getByCategory = (categoryId: number) => {
  return prisma.article.findMany({ where: { categoryId } });
};

export const createArtical = (data: Omit<article, "createdAt">) => {
  return prisma.article.create({
    data: {
      ...data,
      createdAt: new Date(),
    },
  });
};

export const updateArtical = (id: number, data: Partial<article>) => {
  return prisma.article.update({
    where: { id },
    data: {
      ...data,
      updatedAt: new Date()
    }
  });
};
export const deleteArtical = (id: number) => {
  return prisma.article.delete({ where: { id } });
};

