import { z } from 'zod';

export const categorySchema = z.object({
  categoryName: z.string().min(2),
  createdBy: z.string().min(1, "Creator is required"),
  
});
