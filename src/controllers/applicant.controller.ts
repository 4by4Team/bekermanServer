import { Request, Response } from "express";
import * as applicantService from "../services/applicant.service";
import { Applicant } from "../models/applicant.model";

export const createApplicant = async (req: Request, res: Response) => {
  try {
    const newApplicant: Applicant = req.body;
    const applicantAdded = await applicantService.createApplicant(newApplicant);
    res.status(201).json(applicantAdded);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const getAllApplicants = async (req: Request, res: Response) => {
  try {
    const applicants = await applicantService.getAllApplicants();
    res.json(applicants);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const getByIdApplicant = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    const applicant = await applicantService.getApplicantById(id);
    if (!applicant) {
      res.status(404).json({ error: "Applicant not found" });
      return;
    }
    res.json(applicant);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const updateApplicant = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    const updatedApplicant = await applicantService.updateApplicant(id, req.body);
    if (!updatedApplicant) {
      res.status(404).json({ error: "Applicant not found" });
      return;
    }
    res.json(updatedApplicant);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const deleteApplicant = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    const existingApplicant = await applicantService.getApplicantById(id);
    if (!existingApplicant) {
      res.status(404).json({ error: "Applicant for remove not found" });
      return;
    }
    await applicantService.deleteApplicant(id);
    res.json({ message: "Applicant deleted" });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};
