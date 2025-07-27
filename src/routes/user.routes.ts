import { Router } from 'express';
import { validateIdParam } from '../middlewares/validateIdParam.middleware';
import validateBody from '../middlewares/validateBody.middeleware';
import { updateUserSchema } from '../schemas/user.schema';
import * as userController from '../controllers/user.controller';
import { checkAdmin, checkAuth } from '../middlewares/auth.middleware';

const router = Router();

router.get('/',checkAdmin, userController.getAllUsers);
router.get('/:id', validateIdParam, userController.getUserById);
router.put('/:id',checkAuth, validateIdParam, validateBody(updateUserSchema), userController.updateUser);
router.delete('/:id',checkAdmin, validateIdParam, userController.deleteUser);

export default router;
