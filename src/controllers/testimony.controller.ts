import { Request, Response } from "express";
import * as testimonyService from "../services/testimony.service";
import { Testimony } from "../models/testimony.model";


export const createTestimony = async (req: Request, res: Response) => {
  try {
    const newTestimony: Testimony = req.body;
    const testimonyAdded = await testimonyService.createTestimony(newTestimony);
    res.status(201).json(testimonyAdded);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const getAllTestimonies = async (req: Request, res: Response) => {
  try {
    console.log("Fetching all testimonies");
    const testimonies = await testimonyService.getAllTestimonies();
    res.json(testimonies);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const getTestimonyById = async (req: Request, res: Response) => {
  try {
    const testimony = await testimonyService.getTestimonyById(
      Number(req.params.id)
    );
    if (!testimony)
      return res.status(404).json({ error: "Testimony not found" });
    res.json(testimony);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const updateTestimony = async (req: Request, res: Response) => {
  try {
    const testimony = await testimonyService.updateTestimony(
      Number(req.params.id),
      req.body
    );
    if (!testimony)
      return res.status(404).json({ error: "Testimony not found" });
    res.json(testimony);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const deleteTestimony = async (req: Request, res: Response) => {
  try {
    await testimonyService.deleteTestimony(Number(req.params.id));
    res.json({ message: "Testimony deleted" });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};
