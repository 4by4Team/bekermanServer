import { prisma } from '../../prisma/client'; // Adjust the import path as necessary
import { category } from '../models/category.model';

export const getAll = () => {
  return prisma.category.findMany({ include: { articles: true } });
};

export const getById = (id: number) => {
  return prisma.category.findUnique({ where: { id }, include: { articles: true } });
};

export const create = (data: category) => {
    const {
      id,               // אסור לשלוח כי זה autoincrement
      createdAt,        // ניצור חדש
      updatedAt,        // לא צריך ביצירה
      updatedBy,        // נוסיף אם קיים
      ...rest
    } = data;
  
    return prisma.category.create({
      data: {
        ...rest,
        createdAt: new Date(),
        createdBy: String(data.createdBy), // כאן חובה לוודא שזה string
        updatedBy: data.updatedBy ? String(data.updatedBy) : undefined,
      },
    });
  };
  



  export const update = (id: number, data: Partial<category>) => {
    const {
      createdAt,
      createdBy,
      ...updatableFields
    } = data;
  
    return prisma.category.update({
      where: { id },
      data: {
        ...updatableFields,
        updatedAt: new Date(),
        updatedBy: data.updatedBy ? String(data.updatedBy) : undefined,
      },
    });
  };

export const remove = (id: number) => {
  return prisma.category.delete({ where: { id } });
};