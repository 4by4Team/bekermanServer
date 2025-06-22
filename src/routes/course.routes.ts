import { Router } from 'express'
import { getAllCourses, createCourse } from '../controllers/course.controller'

const router = Router()

router.get('/', getAllCourses)
router.post('/', createCourse)

export default router
