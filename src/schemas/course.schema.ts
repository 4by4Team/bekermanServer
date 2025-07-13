import { z } from 'zod';

export const courseSchema = z.object({
  title: z.string().min(2, "Title is required"),
  description: z.string().min(5, "Description is required"),
  price: z.number().nonnegative("Price must be positive"),
  linkToCourse: z.string().url("Must be a valid URL"),
  backgroundUrl: z.string().url("Must be a valid URL"),
  createdBy: z.string().min(1, "Creator is required"),
  updatedBy: z.string().min(1, "Updater is required").optional(),
  students: z.number().int().nonnegative().default(0),
});