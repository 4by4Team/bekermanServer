import { Request, Response } from "express";
import * as applicantService from "../services/applicant.service";
import * as userService from "../services/user.service";
import * as courseService from "../services/course.service";
import { Applicant } from "../models/applicant.model";

const _validateApplicant = async (applicant: Applicant) => {
    const user = await userService.getUserById(applicant.userId);
    if (!user) {
        throw new Error("User does not exist");
    }
    const course = await courseService.getCourseById(applicant.courseId);
    if (!course) {
        throw new Error("Course does not exist");
    }
    return { user, course };
};

export const createApplicant = async (req: Request, res: Response) => {
    try {
        const newApplicant: Applicant = req.body;
        await _validateApplicant(newApplicant);
        await courseService.updateCourseStudents(newApplicant.courseId, 1);
        const applicantAdded = await applicantService.createApplicant(newApplicant);
        res.status(201).json(applicantAdded);
    } catch (error: any) {
        if (error instanceof Error) {
            res.status(400).json({ error: error.message });
            return;
        }
        res.status(500).json({ error: "Internal server error" });
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
