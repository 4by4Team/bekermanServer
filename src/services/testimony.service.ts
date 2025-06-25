import { Testimony } from "../models/testimony.model";
import prisma from "../../prisma/client";

export const createTestimony = (data: Omit<Testimony, "createdAt">) => {
  const fullData: Testimony = {
    ...data,
    createdAt: new Date(),
  };
  console.log("Creating in SERCICE testimony with data:", fullData);
  return prisma.testimony.create({ data: fullData });
};

export const getAllTestimonies = () => prisma.testimony.findMany();

export const getTestimonyById = (id: number) =>
  prisma.testimony.findUnique({ where: { id } });

export const updateTestimony = (id: number, data: Partial<Testimony>) =>
  prisma.testimony.update({ where: { id }, data });

export const deleteTestimony = (id: number) =>
  prisma.testimony.delete({ where: { id } });
