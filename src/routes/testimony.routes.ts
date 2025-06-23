import { Router } from "express";
import * as testimonyController from "../controllers/testimony.controller";

const router = Router();

router.post("/", testimonyController.createTestimony);
router.get("/", testimonyController.getAllTestimonies);
// router.get("/:id", testimonyController.getTestimonyById);
// router.put("/:id", testimonyController.updateTestimony);
router.delete("/:id", testimonyController.deleteTestimony);

export default router;
