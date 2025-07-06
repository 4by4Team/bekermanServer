import { z } from 'zod';

export const categorySchema = z.object({
  categoryName: z.string().min(2),
  createdBy: z.string().transform((v) => new Date(v)),
  updatedBy: z.string().transform((v) => new Date(v)),
});
