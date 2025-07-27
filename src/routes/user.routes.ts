import { Router } from 'express';
import { validateIdParam } from '../middlewares/validateIdParam.middleware';
import validateBody from '../middlewares/validateBody.middeleware';
import { updateUserSchema } from '../schemas/user.schema';
import * as userController from '../controllers/user.controller';

const router = Router();

router.get('/', userController.getAllUsers);
router.get('/:id', validateIdParam, userController.getUserById);
router.put('/:id', validateIdParam, validateBody(updateUserSchema), userController.updateUser);
router.delete('/:id', validateIdParam, userController.deleteUser);

export default router;
