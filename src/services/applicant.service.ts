import { Applicant } from "../models/applicant.model";
import { prisma } from "../../prisma/client";

// יצירה של מועמד חדש
export const createApplicant = (data: Omit<Applicant, "id" | "appliedAt" | "updatedAt" | "user" | "course">) => {
  return prisma.applicant.create({
    data: {
      ...data,
    },
  });
};

// קבלת כל המועמדים
export const getAllApplicants = () => prisma.applicant.findMany({
  include: {
    user: true,
    course: true,
  },
});

// קבלת מועמד לפי מזהה
export const getApplicantById = (id: number) => 
  prisma.applicant.findUnique({
    where: { id },
    include: {
      user: true,
      course: true,
    },
  });

// עדכון מועמד
export const updateApplicant = (id: number, data: Partial<Omit<Applicant, "id" | "appliedAt" | "updatedAt" | "user" | "course">>) => {
  return prisma.applicant.update({
    where: { id },
    data: {
      ...data,
    },
  });
};

// מחיקת מועמד
export const deleteApplicant = (id: number) =>
  prisma.applicant.delete({
    where: { id },
  });
