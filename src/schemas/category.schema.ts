import { z } from 'zod';

export const createCategorySchema = z.object({
  categoryName: z.string().min(2),
  createdBy: z.string().transform((v) => new Date(v)),
  updatedBy: z.string().transform((v) => new Date(v)),
});
