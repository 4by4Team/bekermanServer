import { Applicant } from "./applicant.model";

export interface Course {
  id: number;
  title: string;
  description: string;
  price: number;
  linkToCourse: string;
  backgroundUrl?: string;
  createdAt: Date;
  createdBy: string;
  updatedAt: Date;
  updatedBy?: string|null;
  students: number;
  applicants?: Applicant[]|null;
}
