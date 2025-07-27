import { User } from './user.model';
import { Course } from './course.model';
import { ApplicationStatus } from './enums';

export interface Applicant {
  id: number;
  userId: number;
  courseId: number;
  status: ApplicationStatus;
  appliedAt: Date;
  updatedAt: Date;
  user: User;
  course: Course;
}
