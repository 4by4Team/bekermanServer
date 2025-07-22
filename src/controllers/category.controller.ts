import { Request, Response, NextFunction } from 'express';
import * as categoryService from '../services/category.service';
import { category } from '../models/category.model';

export const getAllCategories = async (req: Request,res: Response,next: NextFunction): Promise<void> => {
    try {
      const items = await categoryService.getAllCategory();
      res.status(200).json(items);
    } catch (error) {
      next(error);
    }
  };

export const getByIdCategory = async (req: Request, res: Response, next: NextFunction): Promise<void>  => {
  try {
    const id = parseInt(req.params.id);
    const category = await categoryService.getByIdCategory(id);
    if (!category) {
      res.status(404).json({ message: 'Category not found' });
      return;
    }
    res.json(category);
  } catch (err) {
    next(err);
  }
};

export const createCategory = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
   
    try {
        const newCategory:category = req.body;
        const category = await categoryService.createCategory(newCategory);
            res.status(201).json(category);

    } catch (error) {
        if (error instanceof Error) {
          res.status(500).json({ message: 'Error creating category', error: error.message });
        } else {
          res.status(500).json({ message: 'Error creating category', error: 'Unknown error' });
        }
    }
}

export const updateCategory = async (req: Request, res: Response, next: NextFunction) => {
  try {
    console.log("updateCategory- categories controllers", req.body);
    const id = parseInt(req.params.id);
    const category = await categoryService.updateCategory(id, req.body);
    res.json(category);
  } catch (err) {
    next(err);
  }
};

export const deleteCategory = async (req: Request, res: Response, next: NextFunction) => {
  try {
    
    const id = parseInt(req.params.id);
    await categoryService.deleteCategory(id);
    res.status(204).send();
  } catch (err) {
    next(err);
  }
};
