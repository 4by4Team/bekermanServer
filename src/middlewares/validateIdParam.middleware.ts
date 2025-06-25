// middlewares/validateId.middleware.ts
import { Request, Response, NextFunction } from "express";

export const validateIdParam = (req: Request, res: Response, next: NextFunction) => {

  const id = Number(req.params.id);
  if (isNaN(id) || id <= 0) {
     res.status(400).json({ error: "Invalid ID" });
     return;
  }
  next();
};
