// // לשימוש עתידי אם תעדכן עדות
// export const updateTestimonySchema = createTestimonySchema.partial();

import { z } from "zod";

// Used for POST (create)
export const createTestimonySchema = z.object({
  title: z.string().min(1, "Title is required"),
  summary: z.string().min(1, "Summary is required"),
  youtubeId: z.string().url("Must be a valid URL"),
  createdBy: z.string().min(1, "Creator is required"),
});

// // Used for PUT (update)
export const updateTestimonySchema = z.object({
  title: z.string().min(1, "Title is required"),
  summary: z.string().min(1, "Summary is required"),
  youtubeId: z.string().url("Must be a valid URL"),
  updatedBy: z.string().min(1, "Creator is required"),
});
