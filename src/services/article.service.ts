import { prisma } from "../../prisma/client";
import { Article } from "../models/article.model";


export const getAllArticales  = () => {
  return prisma.article.findMany();

}

export const getByCategory = (categoryId: number) => {
  return prisma.article.findMany({ where: { categoryId } });
};

export const createArtical = (data: Omit<Article, "createdAt">) => {
  return prisma.article.create({
    data: {
      ...data,
      createdAt: new Date(),
    },
  });
};

export const updateArtical = (id: number, data: Partial<Article>) => {
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

