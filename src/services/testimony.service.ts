import { PrismaClient, Testimony } from "@prisma/client";
const prisma = new PrismaClient();

export const createTestimony = (
  data: Omit<Testimony, "id" | "createdAt" | "updatedAt">
) => prisma.testimony.create({ data });

export const getAllTestimonies = () => prisma.testimony.findMany();

export const getTestimonyById = (id: number) =>
  prisma.testimony.findUnique({ where: { id } });

export const updateTestimony = (id: number, data: Partial<Testimony>) =>
  prisma.testimony.update({ where: { id }, data });

export const deleteTestimony = (id: number) =>
  prisma.testimony.delete({ where: { id } });
