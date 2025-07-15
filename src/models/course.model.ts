import { Applicant } from "./applicant.model";

export interface Course {
  id: number;
  title: string;
  description: string;
  price: number;
  linkToCourse: string;
  backgroundUrl: string;
  createdAt: Date;
  createdBy: Date;
  updatedAt: Date;
  updatedBy: Date;
  students: number;
  applicants: Applicant[];
}
