import { Router } from "express";
import { createOrderController, captureOrderController } from "../controllers/payment.controller";

const router = Router();

// Route ליצירת הזמנה
router.post("/create-order", createOrderController);

// Route לאישור תשלום
router.post("/capture-order", captureOrderController);

export default router;
