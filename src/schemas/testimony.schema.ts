import { z } from "zod";

export const createTestimonySchema = z.object({
  title: z.string({
    required_error: "Title is required",
  }).min(1, "Title is required"),
  summary: z.string({
    required_error: "Summary is required",
  }).min(1, "Summary is required"),
  youtubeId: z.string({
    required_error: "YouTube ID is required",
  }),
  createdBy: z.string({
    required_error: "Creator is required",
  }).min(1, "Creator is required"),
});


export const updateTestimonySchema = z.object({
  title: z.string({
    required_error: "Title is required",
  }).min(1, "Title is required"),
  summary: z.string({
    required_error: "Summary is required",
  }).min(1, "Summary is required"),
  youtubeId: z.string({
    required_error: "YouTube ID is required",
  }),
  updatedBy: z.string({
    required_error: "Updater is required",
  }).min(1, "Updater is required"),
});
