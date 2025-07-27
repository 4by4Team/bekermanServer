import { Request, Response } from "express";
import * as courseService from "../services/course.service";
import { Course } from "../models/course.model";

export const createCourse = async (req: Request, res: Response) => {
  try {
    const newCourseData = {
      ...req.body,
      applicants: Array.isArray(req.body.applicants) ? req.body.applicants : [],
    };
    const courseAdded = await courseService.createCourse(newCourseData);
    res.status(201).json(courseAdded);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const getAllCourses = async (req: Request, res: Response) => {
  try {
    const courses: Course[] | null[] = await courseService.getAllCourses();
    res.json(courses);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const getCourseById = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    const course: Course | null = await courseService.getCourseById(id);
    if (!course) {
      res.status(404).json({ error: "Course not found" });
      return;
    }
    res.json(course);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const updateCourse = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    const updatedCourse = await courseService.updateCourse(id, req.body);
    if (!updatedCourse) {
      res.status(404).json({ error: "Course not found" });
      return;
    }
    const courseWithApplicants: Course = {
      ...updatedCourse,
      applicants: Array.isArray((updatedCourse as any).applicants) ? (updatedCourse as any).applicants : [],
    };
    res.json(courseWithApplicants);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const deleteCourse = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    const existingCourse: Course | null = await courseService.getCourseById(id);
    if (!existingCourse) {
      res.status(404).json({ error: "Course for remove not found" });
      return;
    }
    await courseService.deleteCourse(id);
    res.json({ message: "Course deleted" });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};