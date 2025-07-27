import { Router } from "express";
import * as testimonyController from "../controllers/testimony.controller";

import { createTestimonySchema, updateTestimonySchema } from "../schemas/testimony.schema";
import validateBody from "../middlewares/validateBody.middeleware";
import { validateIdParam } from "../middlewares/validateIdParam.middleware";
import { checkAdmin } from "../middlewares/auth.middleware";

const router = Router();

router.post(
  "/",
  checkAdmin,
  validateBody(createTestimonySchema),
  testimonyController.createTestimony
);
router.get("/", testimonyController.getAllTestimonies);
router.get("/:id", validateIdParam, testimonyController.getTestimonyById)
router.put(
  "/:id",
  checkAdmin,
  validateIdParam,
  validateBody(updateTestimonySchema),
  testimonyController.updateTestimony
);
router.delete("/:id", checkAdmin, validateIdParam, testimonyController.deleteTestimony);

export default router;
