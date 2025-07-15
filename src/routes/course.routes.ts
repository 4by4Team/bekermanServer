import { Router } from 'express';
import * as courseController from '../controllers/course.controller';
import { validateIdParam } from '../middlewares/validateIdParam.middleware';
import validateBody from '../middlewares/validateBody.middeleware';
import { courseSchema } from '../schemas/course.schema';

const router = Router();

router.get('/', courseController.getAllCourses);

router.get('/:id', validateIdParam, courseController.getCourseById);

router.post('/', validateBody(courseSchema), courseController.createCourse);

router.put('/:id', validateIdParam, validateBody(courseSchema), courseController.updateCourse);

router.delete('/:id', validateIdParam, courseController.deleteCourse);

export default router;