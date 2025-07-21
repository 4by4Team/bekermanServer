import { Request, Response, NextFunction } from 'express';
import * as categoryService from '../services/category.service';
import { categorySchema } from '../schemas/category.schema';
import { category } from '../models/category.model';

export const getAll = async (req: Request,res: Response,next: NextFunction): Promise<void> => {
    try {
      const items = await categoryService.getAll();
      res.status(200).json(items);
    } catch (error) {
      next(error);
    }
  };

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

export const create = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
   
    try {
        const newCategory:category = req.body;
        const category = await categoryService.create(newCategory);
            res.status(201).json(category);

    } catch (error) {
        if (error instanceof Error) {
          res.status(500).json({ message: 'Error creating category', error: error.message });
        } else {
          res.status(500).json({ message: 'Error creating category', error: 'Unknown error' });
        }
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
