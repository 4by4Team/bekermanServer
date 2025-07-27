import { Router } from 'express';
import * as courseController from '../controllers/course.controller';
import { validateIdParam } from '../middlewares/validateIdParam.middleware';
import validateBody from '../middlewares/validateBody.middeleware';
import { createCourseSchema, updateCourseSchema } from '../schemas/course.schema';
import { checkAdmin } from '../middlewares/auth.middleware';

const router = Router();

router.get('/', courseController.getAllCourses);

router.get('/:id', validateIdParam, courseController.getCourseById);

router.post('/',checkAdmin, validateBody(createCourseSchema), courseController.createCourse);

router.put('/:id', validateIdParam,checkAdmin, validateBody(updateCourseSchema), courseController.updateCourse);

router.delete('/:id', validateIdParam, checkAdmin, courseController.deleteCourse);

export default router;