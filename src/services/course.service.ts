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
    const { id, ...updateData } = data;
    // Remove keys with value null (Prisma does not accept null for non-nullable fields)
    const filteredData = Object.fromEntries(
        Object.entries(updateData).filter(([_, v]) => v !== null)
    );
    return prisma.course.update({ where: { id }, data: filteredData });
};

export const deleteCourse = (id: number) => {
    return prisma.course.delete({ where: { id } });
};