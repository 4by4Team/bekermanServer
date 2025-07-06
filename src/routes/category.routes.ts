import { Router } from 'express';
import * as categoryController from '../controllers/category.controller';
import { validateIdParam } from '../middlewares/validateIdParam.middleware';
import validateBody from '../middlewares/validateBody.middeleware';
import { categorySchema } from '../schemas/category.schema';

const router = Router();

/**
 * @openapi
 * /api/categories:
 *   get:
 *     summary: Get all categories
 *     tags:
 *       - Categories
 *     responses:
 *       200:
 *         description: List of categories
 */
router.get('/', categoryController.getAll);

/**
 * @openapi
 * /api/categories/{id}:
 *   get:
 *     summary: Get category by ID
 *     tags:
 *       - Categories
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Category found
 *       404:
 *         description: Category not found
 */
router.get('/:id',validateIdParam, categoryController.getById);

/**
 * @openapi
 * /api/categories:
 *   post:
 *     summary: Create a new category
 *     tags:
 *       - Categories
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - categoryName
 *               - createdBy
 *               - updatedBy
 *             properties:
 *               categoryName:
 *                 type: string
 *               createdBy:
 *                 type: string
 *                 format: date-time
 *               updatedBy:
 *                 type: string
 *                 format: date-time
 *     responses:
 *       201:
 *         description: Category created
 */
router.post('/',
    validateBody(categorySchema),
     categoryController.create);

/**
 * @openapi
 * /api/categories/{id}:
 *   put:
 *     summary: Update category
 *     tags:
 *       - Categories
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
 *               categoryName:
 *                 type: string
 *               updatedBy:
 *                 type: string
 *                 format: date-time
 *     responses:
 *       200:
 *         description: Category updated
 */
router.put('/:id',validateIdParam, categoryController.update);

/**
 * @openapi
 * /api/categories/{id}:
 *   delete:
 *     summary: Delete category
 *     tags:
 *       - Categories
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       204:
 *         description: Category deleted
 */
router.delete('/:id',validateIdParam, categoryController.remove);

export default router;
