// middlewares/validateId.middleware.ts
import { Request, Response, NextFunction } from "express";

export const validateIdParam = (req: Request, res: Response, next: NextFunction) => {

  console.log("hello middlewra")
  const id = Number(req.params.id);
  if (isNaN(id) || id <= 0) {
     res.status(400).json({ error: "Invalid ID" });
     return;
  }
  next();
};
