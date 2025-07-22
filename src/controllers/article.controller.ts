
import { Request, Response, NextFunction } from "express";
import * as articleService from "../services/article.service";
import { Article } from "@prisma/client";

export const getAllArticales = async (req: Request, res: Response) => {
  console.log("getAll- categories controllers");
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
    console.log("newArticle- categories controllers", newArticle);
    const article = await articleService.createArtical(newArticle);
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
    await articleService.deleteArtical(id);
    res.status(204).send();
  } catch (err) {
    next(err);
  }
};
export const updateArtical = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);

    const article: Article | null = await articleService.updateArtical(id, req.body);

    if (!article) {
      res.status(404).json({ error: "Article not found" });
      return;
    }

    res.json(article);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};


