import { Router } from 'express';
import { validateIdParam } from '../middlewares/validateIdParam.middleware';
import validateBody from '../middlewares/validateBody.middeleware';
import { createApplicantSchema, updateApplicantSchema } from '../schemas/applicant.schema';
import * as applicantController from '../controllers/applicant.controller';
import { checkAdmin, checkAuth } from '../middlewares/auth.middleware';

const router = Router();

router.get('/',checkAdmin, applicantController.getAllApplicants);
router.get('/:id',checkAdmin, validateIdParam, applicantController.getByIdApplicant);
router.post(
  '/',
  checkAuth,
  validateBody(createApplicantSchema),
  applicantController.createApplicant
);
router.put(
  '/:id',
  validateIdParam,
  validateBody(updateApplicantSchema),
  applicantController.updateApplicant
);
router.delete('/:id', validateIdParam, applicantController.deleteApplicant);

export default router;
