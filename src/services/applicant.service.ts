// import { prisma } from '../../prisma/client';
// import { Applicant } from '../models/applicant.model';

// export const getAllApplicants = () => {
//   return prisma.applicant.findMany();
// };

// export const getApplicantById = (id: number) => {
//   return prisma.applicant.findUnique({ where: { id } });
// };


// export const createApplicant = (data: Omit<Applicant, 'id' | 'createdAt' | 'updatedAt'>) => {
//   return prisma.applicant.create({ data });}

// export const updateApplicant = (id: number, data: Partial<Applicant>) => {
//   const { id: _, ...updateData } = data;
//   return prisma.applicant.update({
//     where: { id },
//     data: updateData,
//   });
// };

// export const deleteApplicant = (id: number) => {
//   return prisma.applicant.delete({
//     where: { id },
//   });
// };
