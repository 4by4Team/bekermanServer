import { Request, Response } from "express";
import { createOrder, captureOrder } from "../services/payment.service";

// יצירת הזמנה
export async function createOrderController(req: Request, res: Response) {
  try {
    const orderData = await createOrder();
    res.json(orderData); // מחזירים את ה-ID של ההזמנה
  } catch (error) {
    res.status(500).json({ message: (error instanceof Error ? error.message : String(error)) });
  }
}

// אישור תשלום
export async function captureOrderController(req: Request, res: Response) {
  const { orderID } = req.body;
  try {
    const captureData = await captureOrder(orderID);
    res.json(captureData); 
  } catch (error) {
    res.status(500).json({ message: error instanceof Error ? error.message : String(error) });
  }
}
