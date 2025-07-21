import { prisma } from "../../prisma/client"; // Adjust the import path as necessary
import { category } from "../models/category.model";

export const getAll = () => {
  return prisma.category.findMany();
};

export const getById = (id: number) => {
  return prisma.category.findUnique({
    where: { id },
    include: { articles: true },
  });
};

export const create = (data: category) => {
  

  return prisma.category.create({
    data: {
      ...data,
      createdAt: new Date()
      },
  });
};

  export const update = (id: number, data: Partial<category>) => {
    const {
      createdAt,
      createdBy,
      ...updatableFields
    } = data;

    return prisma.category.update({
      where: { id },
      data: {
        ...updatableFields,
        updatedAt: new Date(),
        updatedBy: data.updatedBy ? String(data.updatedBy) : undefined,
      },
    });
  };

export const remove = (id: number) => {
  return prisma.category.delete({ where: { id } });
};
