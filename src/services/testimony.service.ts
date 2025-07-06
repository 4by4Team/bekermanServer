import { Testimony } from "../models/testimony.model";
import {prisma} from "../../prisma/client";


export const createTestimony = (data: Omit<Testimony, "createdAt">) => {
  return prisma.testimony.create({
    data: {
      ...data,
      createdAt: new Date(),
    },
  });
};

export const getAllTestimonies = () => prisma.testimony.findMany();

export const getTestimonyById = (id: number) =>
  prisma.testimony.findUnique({ where: { id } });

export const updateTestimony = (id: number, data: Partial<Testimony>) => {
  return prisma.testimony.update({
    where: { id },
    data: {
      ...data,
      updatedAt: new Date(),
    },
  });
};

export const deleteTestimony = (id: number) =>
  prisma.testimony.delete({ where: { id } });
