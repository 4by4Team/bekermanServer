import { z } from 'zod';
import { Role } from '../models/enums';

export const createUserSchema = z.object({
  firstName: z.string({
    required_error: 'First name is required',
    invalid_type_error: 'First name must be a string',
  }).min(1, 'First name is required'),

  lastName: z.string({
    required_error: 'Last name is required',
    invalid_type_error: 'Last name must be a string',
  }).min(1, 'Last name is required'),

  email: z.string({
    required_error: 'Email is required',
    invalid_type_error: 'Email must be a string',
  }).email('Email must be a valid email'),

  phone: z.string({
    required_error: 'Phone number is required',
  }).min(6, 'Phone number is too short'),

  tz: z.string({
    required_error: 'TZ is required',
  }).min(5, 'TZ is too short'),

  password: z.string({
    required_error: 'Password is required',
  }).min(6, 'Password must be at least 6 characters'),

  role: z.nativeEnum(Role, {
    invalid_type_error: 'Role must be either USER or ADMIN',
  }).optional(),
});
export const loginSchema = z.object({
  email: z.string({
    required_error: 'Email is required',
    invalid_type_error: 'Email must be a string',
  }).email('Email must be valid'),

  password: z.string({
    required_error: 'Password is required',
    invalid_type_error: 'Password must be a string',
  }).min(1, 'Password is required'),
});
export const updateUserSchema = z.object({
  firstName: z.string().min(1, 'First name is required').optional(),
  lastName: z.string().min(1, 'Last name is required').optional(),
  email: z.string().email('Must be a valid email').optional(),
  phone: z.string().min(6, 'Phone number is too short').optional(),
  tz: z.string().min(5, 'TZ is too short').optional(),
  password: z.string().min(6, 'Password must be at least 6 characters').optional(),
  role: z.nativeEnum(Role, {
    invalid_type_error: 'Role must be either USER or ADMIN',
  }).optional(),
});
export const changePasswordSchema = z.object({
  currentPassword: z.string({
    required_error: 'Current password is required',
  }).min(1, 'Current password is required'),

  newPassword: z.string({
    required_error: 'New password is required',
  }).min(6, 'New password must be at least 6 characters'),

  confirmPassword: z.string({
    required_error: 'Password confirmation is required',
  }).min(6, 'Confirm password must be at least 6 characters'),
}).refine((data) => data.newPassword === data.confirmPassword, {
  message: 'Passwords do not match',
  path: ['confirmPassword'],
});
export const resetPasswordSchema = z.object({
  token: z.string({
    required_error: 'Reset token is required',
  }),

  newPassword: z.string({
    required_error: 'New password is required',
  }).min(6, 'New password must be at least 6 characters'),

  confirmPassword: z.string({
    required_error: 'Confirm password is required',
  }).min(6, 'Confirm password must be at least 6 characters'),
}).refine((data) => data.newPassword === data.confirmPassword, {
  message: 'Passwords do not match',
  path: ['confirmPassword'],
});
