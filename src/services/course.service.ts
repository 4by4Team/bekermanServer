import { prisma } from '../../prisma/client';
import { Course } from '../models/course.model';

export const getAllCourses = () => {
    return prisma.course.findMany();
};

export const getCourseById = (id: number) => {
    return prisma.course.findUnique({ where: { id } });
};

export const createCourse = (data: Course) => {
    const { applicants, ...courseData } = data;
    return prisma.course.create({ data: {
      ...courseData,
      createdAt: new Date(),
    } });
};

export const updateCourse = (id: number, data: Partial<Course>) => {
    const { id: _, applicants, ...updateData } = data;
    return prisma.course.update({ where: { id }, data: updateData });
};

export const deleteCourse = (id: number) => {
    return prisma.course.delete({ where: { id } });
};