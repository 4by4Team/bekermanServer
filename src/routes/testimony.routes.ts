import { Router } from "express";
import * as testimonyController from "../controllers/testimony.controller";

import { createTestimonySchema } from "../schemas/testimony.schema";
import validateBody from "../middlewares/validateBody.middeleware";
import { validateIdParam } from "../middlewares/validateIdParam.middleware";

const router = Router();

router.post(
  "/",
  validateBody(createTestimonySchema),
  testimonyController.createTestimony
);
router.get("/", testimonyController.getAllTestimonies);
router.get("/:id", validateIdParam, testimonyController.getTestimonyById);
router.put("/:id", validateIdParam, testimonyController.updateTestimony);
router.delete("/:id", validateIdParam, testimonyController.deleteTestimony);
//- change testimonyController.getTestimonyById to getTestimonyById
export default router;
