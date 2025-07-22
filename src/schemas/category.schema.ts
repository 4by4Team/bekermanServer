import { z } from "zod";

export const createCategorySchema = z.object({
  categoryName: z.string().min(2, "Category name is required"),
  createdBy: z.string().min(1, "Creator is required"),
});

export const updateCategorySchema = z.object({
  categoryName: z.string().min(2, "Category name is required"),
  updatedBy: z.string().min(1, "Updater is required")
});
