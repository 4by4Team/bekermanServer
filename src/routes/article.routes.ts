import { Router } from 'express';
import * as articleController from '../controllers/article.controller';
import { validateIdParam } from '../middlewares/validateIdParam.middleware';
import validateBody from '../middlewares/validateBody.middeleware';
import { createArticleSchema, updateArticleSchema } from '../schemas/article.schema';
import { checkAdmin } from '../middlewares/auth.middleware';

const router = Router();
router.get('/', articleController.getAllArticales);
router.get('/:id',validateIdParam, articleController.getArticleById);
router.get('/by-category/:categoryId', articleController.getByCategory);
router.post('/', 
    checkAdmin,
    validateBody(createArticleSchema),
    articleController.createArtical);
router.delete('/:id',validateIdParam,checkAdmin, articleController.deleteArtical);
router.put('/:id', validateIdParam, checkAdmin,  validateBody(updateArticleSchema), articleController.updateArtical);
export default router;
