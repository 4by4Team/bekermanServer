import { prisma } from '../../prisma/client';
import { Course } from '../models/course.model';

export const getAllCourses = () => {
    return prisma.course.findMany();
};

export const getCourseById = (id: number) => {
    return prisma.course.findUnique({ where: { id } });
};

export const createCourse = (data: Omit < Course, 'id' | 'createdAt' | 'updatedAt'>) => {
    return prisma.course.create({ data: {
      ...data,
    } });
};

export const updateCourse = (id: number, data: Partial<Course>) => {
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