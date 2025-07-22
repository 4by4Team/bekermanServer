import { z } from "zod";

export const createCategorySchema = z.object({
  categoryName: z.string({
    required_error: "Category name is required",
  }).min(2, "Category name is required"),
  createdBy: z.string({
    required_error: "Creator is required",
  }).min(1, "Creator is required"),
});

export const updateCategorySchema = z.object({
  categoryName: z.string({
    required_error: "Category name is required",
  }).min(2, "Category name is required"),
  updatedBy: z.string({
    required_error: "Updater is required",
  }).min(1, "Updater is required"),
});
