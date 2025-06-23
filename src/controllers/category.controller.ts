import { Request, Response, NextFunction } from 'express';
import * as categoryService from '../services/category.service';
import { categorySchema } from '../schemas/category.schema';

export const getAll = async (req: Request,res: Response,next: NextFunction): Promise<void> => {
    try {
      const items = await categoryService.getAll();
      res.status(200).json(items);
    } catch (error) {
      next(error);
    }
  };

  // please check if getById and creat are correct
export const getById = async (req: Request, res: Response, next: NextFunction): Promise<void>  => {
  try {
    const id = parseInt(req.params.id);
    const category = await categoryService.getById(id);
    if (!category) {
      res.status(404).json({ message: 'Category not found' });
      return;
    }
    res.json(category);
  } catch (err) {
    next(err);
  }
};


// export const create = async (req: Request, res: Response, next: NextFunction) => {
//   const parsed = categorySchema.safeParse(req.body);
//   if (!parsed.success) return res.status(400).json(parsed.error);
//   try {
//     const category = await categoryService.create(parsed.data);
//     res.status(201).json(category);
//   } catch (err) {
//     next(err);
//   }
// };

export const create = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const parsed = categorySchema.safeParse(req.body);
      if (!parsed.success) {
        res.status(400).json(parsed.error);
        return;
      }
    try {
        const category = await categoryService.create(parsed.data);
            res.status(201).json(category);

    } catch (error) {
    next(error);
    }
}

export const update = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = parseInt(req.params.id);
    const category = await categoryService.update(id, req.body);
    res.json(category);
  } catch (err) {
    next(err);
  }
};

export const remove = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = parseInt(req.params.id);
    await categoryService.remove(id);
    res.status(204).send();
  } catch (err) {
    next(err);
  }
};
