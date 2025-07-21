export interface Applicant {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  age: string;
  medicalConditions?: string | null;
  goals: string;
  experience?: string | null;
  createdAt: Date;
  courseId: number;
  // course?: Course;
}