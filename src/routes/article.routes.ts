import { Router } from 'express';
import * as articleController from '../controllers/article.controller';
import { validateIdParam } from '../middlewares/validateIdParam.middleware';
import validateBody from '../middlewares/validateBody.middeleware';
import { articleSchema } from '../schemas/article.schema';

const router = Router();

/**
 * @openapi
 * /api/articles:
 *   get:
 *     summary: Get all articles
 *     tags:
 *       - Articles
 *     responses:
 *       200:
 *         description: List of articles
 */
router.get('/', articleController.getAll);

/**
 * @openapi
 * /api/articles/by-category/{categoryId}:
 *   get:
 *     summary: Get articles by category ID
 *     tags:
 *       - Articles
 *     parameters:
 *       - name: categoryId
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Articles by category
 *       404:
 *         description: Category not found
 */
router.get('/by-category/:categoryId', articleController.getByCategory);

/**
 * @openapi
 * /api/articles:
 *   post:
 *     summary: Create a new article
 *     tags:
 *       - Articles
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - backgroundUrl
 *               - content
 *               - categoryId
 *               - createdBy
 *               - updatedBy
 *             properties:
 *               title:
 *                 type: string
 *               backgroundUrl:
 *                 type: string
 *               content:
 *                 type: string
 *               categoryId:
 *                 type: integer
 *               createdBy:
 *                 type: string
 *                 format: date-time
 *               updatedBy:
 *                 type: string
 *                 format: date-time
 *     responses:
 *       201:
 *         description: Article created
 */
router.post('/', 
    validateBody(articleSchema),
    articleController.create);

/**
 * @openapi
 * /api/articles/{id}:
 *   put:
 *     summary: Update article
 *     tags:
 *       - Articles
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               backgroundUrl:
 *                 type: string
 *               content:
 *                 type: string
 *               categoryId:
 *                 type: integer
 *               updatedBy:
 *                 type: string
 *                 format: date-time
 *     responses:
 *       200:
 *         description: Article updated
 */
router.put('/:id',validateIdParam,
    validateBody(articleSchema),
     articleController.update);

/**
 * @openapi
 * /api/articles/{id}:
 *   delete:
 *     summary: Delete article
 *     tags:
 *       - Articles
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       204:
 *         description: Article deleted
 */
router.delete('/:id',validateIdParam, articleController.remove);

export default router;
