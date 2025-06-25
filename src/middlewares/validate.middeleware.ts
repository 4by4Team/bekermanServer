import { Request, Response, NextFunction } from "express";
import { ZodSchema } from "zod";

export const validate = (schema: ZodSchema<any>) => (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const result = schema.safeParse(req.body);

  if (!result.success) {
    const flat = result.error.flatten();

    // Combine all error messages into a single string
    const allMessages = [
      ...Object.values(flat.fieldErrors).flat(),
      ...flat.formErrors
    ].join(" | ");

    res.status(400).json({ error: allMessages });
    return;
  }

  req.body = result.data; // safe and parsed
  console.log("MIDD req.body:", req.body);
  next();
};

export default validate;



// // {
// //   "error": "Title is required | Invalid YouTube link"
// // }


// import { Request, Response, NextFunction, RequestHandler } from "express";
// import { ZodSchema } from "zod";

// export const validate = (schema: ZodSchema<any>): RequestHandler => {
//   return (req: Request, res: Response, next: NextFunction): void => {
//     const result = schema.safeParse(req.body);

//     if (!result.success) {
//       const flat = result.error.flatten();
//       const allMessages = [
//         ...Object.values(flat.fieldErrors).flat(),
//         ...flat.formErrors
//       ].join(" | ");

//       // מחזירים את התגובה ושומרים שהפונקציה מסתיימת כאן
//        res.status(400).json({ error: allMessages });
//       return;
//     }

//     req.body = result.data;
//     next();
//   };
// };

