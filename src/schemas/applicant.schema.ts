// import { z } from 'zod';

// export const registerSchema = z.object({
//   firstName: z.string({
//     required_error: "First name is required",
//   }).min(2, "First name must be at least 2 characters"),

//   lastName: z.string({
//     required_error: "Last name is required",
//   }).min(2, "Last name must be at least 2 characters"),

//   email: z.string({
//     required_error: "Email is required",
//   }).email("Invalid email address"),

//   phone: z.string({
//     required_error: "Phone number is required",
//   }).min(7, "Phone number must be at least 7 characters"),

//   password: z.string({
//     required_error: "Password is required",
//   }).min(6, "Password must be at least 6 characters"),

// });

// export const loginSchema = z.object({
//     email: z.string({
//       required_error: "Email is required",
//     }).email("Invalid email address"),
  
//     password: z.string({
//       required_error: "Password is required",
//     }).min(6, "Password must be at least 6 characters"),
//   });
  
// export const updateApplicantSchema = z.object({
//     firstName: z.string({
//       required_error: "First name is required",
//     }).min(2, "First name must be at least 2 characters"),
  
//     lastName: z.string({
//       required_error: "Last name is required",
//     }).min(2, "Last name must be at least 2 characters"),
  
//     email: z.string({
//       required_error: "Email is required",
//     }).email("Invalid email address"),
  
//     phone: z.string({
//       required_error: "Phone number is required",
//     }).min(7, "Phone number must be at least 7 characters"),
//   });
// schemas/applicant.schema.ts

import { z } from 'zod';
import { ApplicationStatus } from "../models/enums"; // הנתיב בהתאם למבנה הפרויקט שלך

export const ApplicationStatusEnum = z.nativeEnum(ApplicationStatus);
export const createApplicantSchema = z.object({
  userId: z.number({
    required_error: 'User ID is required',
    invalid_type_error: 'User ID must be a number',
  }).int('User ID must be an integer').positive('User ID must be positive'),

  courseId: z.number({
    required_error: 'Course ID is required',
    invalid_type_error: 'Course ID must be a number',
  }).int('Course ID must be an integer').positive('Course ID must be positive'),

  status: z.nativeEnum(ApplicationStatus, {
    required_error: 'Status is required',
    invalid_type_error: 'Status must be a valid enum value (PENDING, APPROVED, REJECTED)',
  }).optional(),
});


export const updateApplicantSchema = z.object({
  status: z.nativeEnum(ApplicationStatus, {
    required_error: 'Status is required',
    invalid_type_error: 'Status must be one of: PENDING, APPROVED, REJECTED',
  }).optional(),
});

