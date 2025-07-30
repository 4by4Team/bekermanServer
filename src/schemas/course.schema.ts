import { z } from 'zod';

export const createCourseSchema = z.object({
  title: z.string({
    required_error: "Title is required",
  }).min(2, "Title is required"),
  description: z.string({
    required_error: "Description is required",
  }).min(5, "Description is required"),
  price: z.number({
    required_error: "Price is required",
  }).nonnegative("Price must be positive"),
  linkToCourse: z.string({
    required_error: "Link to course is required",
  }).url("Must be a valid URL"),
  backgroundUrl: z.string({
    required_error: "Background URL is required",
  }).url("Must be a valid URL"),
  createdBy: z.string({
    required_error: "Creator is required",
  }).min(1, "Creator is required"),
  updatedBy: z.string({
    required_error: "Updater is required",
  }).min(1, "Updater is required").optional(),
  students: z.number().int().nonnegative().default(0),
});

export const updateCourseSchema = z.object({
  title: z.string({
    required_error: "Title is required",
  }).min(2, "Title is required"),
  description: z.string({
    required_error: "Description is required",
  }).min(5, "Description is required"),
  price: z.number({
    required_error: "Price is required",
  }).nonnegative("Price must be positive"),
  linkToCourse: z.string({
    required_error: "Link to course is required",
  }).url("Must be a valid URL"),
  updatedBy: z.string({
    required_error: "Updater is required",
  }).min(1, "Updater is required"),
});
