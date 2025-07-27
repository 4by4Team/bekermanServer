import { Router } from 'express';
import { validateIdParam } from '../middlewares/validateIdParam.middleware';
import validateBody from '../middlewares/validateBody.middeleware';
import { createApplicantSchema, updateApplicantSchema } from '../schemas/applicant.schema';
import * as applicantController from '../controllers/applicant.controller';

const router = Router();

router.get('/', applicantController.getAllApplicants);
router.get('/:id', validateIdParam, applicantController.getByIdApplicant);
router.post(
  '/',
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
