import { prisma } from "../../prisma/client"; 
import { Category } from "../models/category.model";

export const getAllCategory = () => {
  return prisma.category.findMany();
};

export const getByIdCategory = (id: number) => {
  return prisma.category.findUnique({
    where: { id },
  });
};

export const createCategory = (data: Category) => {
  return prisma.category.create({
    data: {
      ...data,
      createdAt: new Date()
      },
  });
};

  export const updateCategory = (id: number, data: Partial<Category>) => {
    return prisma.category.update({
      where: { id },
      data: {
        ...data,
        updatedAt: new Date(),
      },
    });
  };

export const deleteCategory = (id: number) => {
  return prisma.category.delete({ where: { id } });
};
export const updateCategoryCount = async (id: number, count: number) => {
  return prisma.category.update({
    where: { id },
    data: {
      count: { increment: count },
      updatedAt: new Date(),
    },
  });
};

