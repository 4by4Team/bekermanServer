import { Router } from "express";
import * as testimonyController from "../controllers/testimony.controller";
import validate from "../middlewares/validate.middeleware";
import { createTestimonySchema } from "../schemas/testimony.schema";

const router = Router();

router.post(
    "/",
    validate(createTestimonySchema),
    testimonyController.createTestimony
  );
router.get("/", testimonyController.getAllTestimonies);
// router.get("/:id", testimonyController.getTestimonyById);
// router.put("/:id", testimonyController.updateTestimony);
router.delete("/:id", testimonyController.deleteTestimony);

export default router;
