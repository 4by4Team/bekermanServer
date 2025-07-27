import { Applicant, Role } from "./applicant.model";

export interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  tz: string;
  password: string;
  role: Role;
  createdAt: Date;
  updatedAt: Date;
  applicants: Applicant[];
}