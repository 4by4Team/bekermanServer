import { Router } from 'express';
import * as articleController from '../controllers/article.controller';
import { validateIdParam } from '../middlewares/validateIdParam.middleware';
import validateBody from '../middlewares/validateBody.middeleware';
import { articleSchema } from '../schemas/article.schema';

const router = Router();
router.get('/', articleController.getAllArticales);
router.get('/by-category/:categoryId', articleController.getByCategory);
router.post('/', 
    validateBody(articleSchema),
    articleController.createArtical);
router.delete('/:id',validateIdParam, articleController.deleteArtical);
router.put('/:id', validateIdParam, validateBody(articleSchema), articleController.updateArtical);
export default router;
