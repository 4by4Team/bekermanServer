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
        const { id } = req.params;
        const updatedData: Applicant = req.body;


        const existingApplicant = await applicantService.getApplicantById(Number(id));
        if (!existingApplicant) {
            return res.status(404).json({ error: 'Applicant not found' });
        }
        await _validateApplicant(updatedData);
        // בדיקה אם הקורס השתנה
        // if (existingApplicant.courseId !== updatedData.courseId) {
        //   await courseService.updateCourseStudents(existingApplicant.courseId, -1); 
        //   await courseService.updateCourseStudents(updatedData.courseId, 1);       
        // }
        const updatedApplicant = await applicantService.updateApplicant(Number(id), updatedData);
       return res.status(200).json(updatedApplicant);
    } catch (error: any) {
       return res.status(500).json({ error: error.message });  
    }
};


export const deleteApplicant = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const existingApplicant = await applicantService.getApplicantById(Number(id));
        if (!existingApplicant) {
            return res.status(404).json({ error: 'Applicant not found' });
        }
        await applicantService.deleteApplicant(Number(id));
        await courseService.updateCourseStudents(existingApplicant.courseId, -1);

        return res.status(200).json({ message: 'Applicant deleted successfully' });
    } catch (error: any) {
        return res.status(500).json({ error: error.message });

    }
};

