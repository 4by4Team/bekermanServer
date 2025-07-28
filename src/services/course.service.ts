import { prisma } from '../../prisma/client';
import { Course } from '../models/course.model';

export const getAllCourses = () => {
    return prisma.course.findMany();
};

export const getCourseById = (id: number) => {
    return prisma.course.findUnique({ where: { id } });
};

export const createCourse = (data: Omit < Course, 'id' | 'updatedAt' | 'createdAt'|'applicants'>) => {
    return prisma.course.create({ data: {
      ...data,
     applicants: {
        create: [],  
      },
    } });
};

export const updateCourse = (id: number, data: Partial<Omit<Course, 'applicants'>>) => {
  return prisma.course.update({
    where: { id },
    data: {
      ...data,
    },
  });
};


export const deleteCourse = (id: number) => {
    return prisma.course.delete({ where: { id } });
};

export const updateCourseStudents = async (id: number, student: number) => {
  return prisma.course.update({
    where: { id },
    data: {
      students: { increment: student },
    },
  });
};