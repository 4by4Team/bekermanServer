import { Router } from 'express';
import validateBody from '../middlewares/validateBody.middeleware';
import { loginSchema, registerSchema, updatePasswordSchema } from '../schemas/auth.schema';
import * as authController from '../controllers/auth.controller';
import { validateIdParam } from '../middlewares/validateIdParam.middleware';
import passport from '../config/passport';
// import passport from 'passport';

const router = Router();

router.post('/register', validateBody(registerSchema), authController.register);
router.post('/login', validateBody(loginSchema), authController.login);
router.put('/change-password/:id', validateIdParam, validateBody(updatePasswordSchema), authController.changePassword);

// Google OAuth routes
router.get('/google',
    passport.authenticate('google', { scope: ['profile', 'email'] })
);

router.get('/google/callback',
    passport.authenticate('google', { failureRedirect: '/login' }),
    (req, res, next) => {
        authController.googleAuthCallback(req, res).catch(next);
    }
);

export default router;
