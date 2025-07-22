import { Router } from 'express';
import * as categoryController from '../controllers/category.controller';
import { validateIdParam } from '../middlewares/validateIdParam.middleware';
import validateBody from '../middlewares/validateBody.middeleware';
import { createCategorySchema, updateCategorySchema } from '../schemas/category.schema';

const router = Router();
router.get('/', categoryController.getAllCategories);
router.get('/:id',validateIdParam, categoryController.getByIdCategory);
router.post('/',
    validateBody(createCategorySchema),
     categoryController.createCategory);
router.put('/:id',validateIdParam,validateBody(updateCategorySchema), categoryController.updateCategory);
router.delete('/:id',validateIdParam, categoryController.deleteCategory);

export default router;
