import { z } from 'zod';
import { ApplicationStatus } from "../models/enums";

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

