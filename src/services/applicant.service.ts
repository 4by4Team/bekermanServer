import { Applicant } from "../models/applicant.model";
import { prisma } from "../../prisma/client";
export const createApplicant = (data: Omit<Applicant, "id" | "appliedAt" | "updatedAt" | "user" | "course">) => {
  return prisma.applicant.create({
    data: {
      ...data,
    },
  });
};


export const getAllApplicants = () => prisma.applicant.findMany({
  include: {
    user: true,
    course: true,
  },
});


export const getApplicantById = (id: number) => 
  prisma.applicant.findUnique({
    where: { id },
    include: {
      user: true,
      course: true,
    },
  });

export const updateApplicant = (id: number, data: Partial<Omit<Applicant, "id" | "appliedAt" | "updatedAt" | "user" | "course">>) => {
  return prisma.applicant.update({
    where: { id },
    data: {
      ...data,
    },
  });
};


export const deleteApplicant = (id: number) =>
  prisma.applicant.delete({
    where: { id },
  });
