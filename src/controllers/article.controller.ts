
import { Request, Response, NextFunction } from "express";
import * as articleService from "../services/article.service";
import * as categoryService from "../services/category.service";

import { Article } from "../models/article.model";
export const getAllArticales = async (req: Request, res: Response) => {
  const articles = await articleService.getAllArticales();
  res.json(articles);
};
export const getArticleById = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id, 10);

    if (isNaN(id)) {
       res.status(400).json({ message: "Invalid article ID" });
    }

    const article = await articleService.getArticleById(id);

    if (!article) {
       res.status(404).json({ message: "Article not found" });
    }

    res.json(article);
  } catch (error) {
    console.error("Error fetching article by ID:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};export const getByCategory = async (
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
    const newArticle: Article = req.body;
    const category = await categoryService.getByIdCategory(newArticle.categoryId);
    if (!category) {
      res.status(404).json({ message: "Category not found" });
      return;
    }
    const article = await articleService.createArtical(newArticle);
    if (article.categoryId) {
      await categoryService.updateCategoryCount(article.categoryId, 1);
    }

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
    const article = await articleService.getArticleById(id);
    if (!article) {
     res.status(404).json({ message: "Article not found" });
      return;
    }
    await articleService.deleteArtical(id);
    if (article.categoryId) {
      await categoryService.updateCategoryCount(article.categoryId, -1);
    }

    res.status(204).send();
  } catch (err) {
    next(err);
  }
};

export const updateArtical = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    const existingArticle = await articleService.getArticleById(id);
    if (!existingArticle) {
       res.status(404).json({ error: "Article not found" });
        return;
    }
    const updatedArticle: Article | null = await articleService.updateArtical(id, req.body);
    if (!updatedArticle) {
       res.status(404).json({ error: "Article not found" });
       return;
    }
    if (req.body.categoryId && req.body.categoryId !== existingArticle.categoryId) {
      await categoryService.updateCategoryCount(existingArticle.categoryId, -1);
      await categoryService.updateCategoryCount(req.body.categoryId, 1);
    }

    res.json(updatedArticle);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};



