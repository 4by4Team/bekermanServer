import { Request, Response } from "express";
import { createOrder, captureOrder } from "../services/payment.service";

// יצירת הזמנה
export async function createOrderController(req: Request, res: Response) {
  try {
   const { amount } = req.body;
    if (!amount)  res.status(400).json({ message: "Missing amount" });
    const orderData = await createOrder(amount);
    res.json(orderData); // מחזירים את ה-ID של ההזמנה
  } catch (error) {
    res.status(500).json({ message: (error instanceof Error ? error.message : String(error)) });
  }
}

// אישור תשלום
// export async function captureOrderController(req: Request, res: Response) {
//   const { orderID } = req.body;
//   try {
//     const captureData = await captureOrder(orderID);
//     res.json(captureData); 
//   } catch (error) {
//     res.status(500).json({ message: error instanceof Error ? error.message : String(error) });
//   }
// }
// Controller לאישור תשלום עם החזרת מידע מפורט ללקוח
export async function captureOrderController(req: Request, res: Response) {
  const { orderID } = req.body;

  if (!orderID) {
    res.status(400).json({ message: "Missing orderID" });
  }

  try {
    const captureData = await captureOrder(orderID);

    // מחזיר רק את השדות החשובים ל-Frontend
    res.json({
      status: captureData.status,
      payer: captureData.payer,
      purchaseUnits: captureData.details,
    });
  } catch (error: any) {
    res.status(500).json({
      message: error.message || "Error capturing order",
    });
  }
}
