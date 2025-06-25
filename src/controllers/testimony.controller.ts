import { Request, Response } from "express";
import * as testimonyService from "../services/testimony.service";
import { Testimony } from "../models/testimony.model";

export const createTestimony = async (req: Request, res: Response) => {
  try {
    const newTestimony: Testimony = req.body;
    const testimonyAdded: Testimony = await testimonyService.createTestimony(
      newTestimony
    );
    res.status(201).json(testimonyAdded);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const getAllTestimonies = async (req: Request, res: Response) => {
  try {
    console.log("Fetching all testimonies");
    const testimonies: Testimony[] = await testimonyService.getAllTestimonies();
    res.json(testimonies);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};
export const getTestimonyById = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    const testimony: Testimony = await testimonyService.getTestimonyById(id);
    if (!testimony) {
      res.status(404).json({ error: "Testimony not found" });
      return;
    }
    res.json(testimony);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const updateTestimony = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    const testimony: Testimony = await testimonyService.updateTestimony(
      id,
      req.body
    );
    if (!testimony) {
      res.status(404).json({ error: "Testimony not found" });
      return;
    }
    res.json(testimony);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const deleteTestimony = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    const existingTestimony: Testimony =
      await testimonyService.getTestimonyById(id);
    if (!existingTestimony) {
      res.status(404).json({ error: "Testimony for remove not found" });
      return;
    }
    await testimonyService.deleteTestimony(id);
    res.json({ message: "Testimony deleted" });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};
