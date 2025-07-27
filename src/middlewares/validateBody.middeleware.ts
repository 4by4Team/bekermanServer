import { Request, Response, NextFunction } from "express";
import { ZodSchema } from "zod";

export const validateBody = (schema: ZodSchema<any>) => (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const result = schema.safeParse(req.body);
  if (!result.success) {
    
    const flat = result.error.flatten();
    const allMessages = [
      ...Object.values(flat.fieldErrors).flat(),
      ...flat.formErrors
    ].join(" | ");

    res.status(400).json({ error: allMessages });
    return;
  }

  req.body = result.data; 
  next();
};

export default validateBody;


