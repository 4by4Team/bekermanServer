
import { Request, Response, NextFunction } from "express";
import * as articleService from "../services/article.service";
import { articleSchema } from "../schemas/article.schema";
import { article } from "../models/article.model";

export const getAllArticales = async (req: Request, res: Response) => {
  console.log("getAll- categories controllers");
  const articles = await articleService.getAll();
  res.json(articles);
};

export const getByCategory = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const categoryId = parseInt(req.params.categoryId);
    const articles = await articleService.getByCategory(categoryId);
    res.json(articles);
  } catch (err) {
    next(err);
  }
};


export const createArtical = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {

  try {
    const newArticle: article = req.body;
    console.log("newArticle- categories controllers", newArticle);
    const article = await articleService.create(newArticle);
    res.status(201).json(article);
  } catch (error) {
    if (error instanceof Error) {
      res
        .status(500)
        .json({ message: "Error creating article", error: error.message });
    } else {
      res
        .status(500)
        .json({ message: "Error creating article", error: "Unknown error" });
    }
  }
};


export const deleteArtical = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const id = parseInt(req.params.id);
    await articleService.remove(id);
    res.status(204).send();
  } catch (err) {
    next(err);
  }
};
export const updateArtical = async (
  req: Request, 
  res: Response,
  next: NextFunction
 ) => {
 
};

