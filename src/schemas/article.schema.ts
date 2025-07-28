import { z } from 'zod';

export const createArticleSchema = z.object({
  title: z.string({
    required_error: "Title is required",
    invalid_type_error: "Title must be a string",
  }).min(2, "Title is required"),
  backgroundUrl: z.string({
    required_error: "Background URL is required",
  }).url("Must be a valid URL"),
  content: z.string({
    required_error: "Content is required",
  }).min(5, "Content is required"),
  categoryId: z.number({
    required_error: "Category ID is required",
  }),
  createdBy: z.string({
    required_error: "Creator is required",
  }).min(1, "Creator is required"),
  readTime: z.number({
    required_error: "Read time is required",
  }).min(1, "Read time is required"),
});

export const updateArticleSchema = z.object({
  title: z.string({
    required_error: "Title is required",
    invalid_type_error: "Title must be a string",
  }).min(2, "Title is required"),
  content: z.string({
    required_error: "Content is required",
  }).min(5, "Content is required"),
  categoryId: z.number({
    required_error: "Category ID is required",
  }),
  updatedBy: z.string({
    required_error: "Updater is required",
  }).min(1, "Updater is required"),
  readTime: z.number({
    required_error: "Read time is required",
  }).min(1, "Read time is required"),
});
