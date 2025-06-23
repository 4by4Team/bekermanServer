import { PrismaClient } from "@prisma/client";
import { Testimony } from "../models/testimony.model";
import prisma from "../../prisma/client";

export const createTestimony = (
  data: Testimony
) =>{
  console.log("Creating in SERCICE testimony with data:", data);
  return prisma.testimony.create({ data });
} 

export const getAllTestimonies = () => prisma.testimony.findMany();

export const getTestimonyById = (id: number) =>
  prisma.testimony.findUnique({ where: { id } });

export const updateTestimony = (id: number, data: Partial<Testimony>) =>
  prisma.testimony.update({ where: { id }, data });

export const deleteTestimony = (id: number) =>
  prisma.testimony.delete({ where: { id } });
