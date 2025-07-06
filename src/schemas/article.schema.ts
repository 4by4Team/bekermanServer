import { z } from 'zod';

export const articleSchema = z.object({
  title: z.string().min(2),
  backgroundUrl: z.string().url(),
  content: z.string().min(5),
  categoryId: z.number(),
  createdBy: z.string().transform((v) => new Date(v)),
  updatedBy: z.string().transform((v) => new Date(v)),
});
