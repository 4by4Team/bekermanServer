import { prisma } from "../../prisma/client"; // Adjust the import path as necessary
import { category } from "../models/category.model";

export const getAllCategory = () => {
  return prisma.category.findMany();
};

export const getByIdCategory = (id: number) => {
  return prisma.category.findUnique({
    where: { id },
  });
};

export const createCategory = (data: category) => {
  return prisma.category.create({
    data: {
      ...data,
      createdAt: new Date()
      },
  });
};

  export const updateCategory = (id: number, data: Partial<category>) => {
    console.log("updateCategory- categories service", data);
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
