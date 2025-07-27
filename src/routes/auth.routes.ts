import { Router } from 'express';
import validateBody from '../middlewares/validateBody.middeleware';
import { loginSchema, registerSchema, updatePasswordSchema } from '../schemas/auth.schema';
import * as authController from '../controllers/auth.controller';
import { validateIdParam } from '../middlewares/validateIdParam.middleware';

const router = Router();

router.post('/register', validateBody(registerSchema), authController.register);
router.post('/login', validateBody(loginSchema), authController.login);
router.put('/change-password/:id', validateIdParam, validateBody(updatePasswordSchema), authController.changePassword);

export default router;
