import { z } from "zod";

export const updateUserSchema = z.object({
  firstName: z.string().min(1, "First name is required").optional(),
  lastName: z.string().min(1, "Last name is required").optional(),
  email: z.string().email("Invalid email address").optional(),
  phone: z.string().min(5, "Phone is required").optional(),
  tz: z.string().min(5, "TZ is required").optional(),
  role: z.enum(["USER", "ADMIN"]).optional(),
});
