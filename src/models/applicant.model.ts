export enum Role {
  ADMIN = 0,
  USER = 1,
}
export interface Applicant {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  password:string;
  createdAt: Date;
  updatedAt:Date;
  role:Role;
}