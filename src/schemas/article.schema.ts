import { z } from 'zod';

export const articleSchema = z.object({
  title: z.string().min(2,"Title is required"),
  backgroundUrl: z.string().url(),
  content: z.string().min(5),
  categoryId: z.number(),
  createdBy: z.string().min(1, "Creator is required"),
  readTime: z.number().min(1, "Read time is required"),
});