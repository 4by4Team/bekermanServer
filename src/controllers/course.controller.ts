import { Request, Response } from 'express'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export const getAllCourses = async (req: Request, res: Response) => {
  const courses = await prisma.course.findMany()
  res.json(courses)
}

export const createCourse = async (req: Request, res: Response) => {
  const { title, price, linkToCourse, backgroundUrl, description, createdBy, updatedBy } = req.body
  const course = await prisma.course.create({
    data: {
      title,
      price,
      linkToCourse,
      backgroundUrl,
      description,
      createdBy: new Date(createdBy),
      updatedBy: new Date(updatedBy)
    }
  })
  res.status(201).json(course)
}
