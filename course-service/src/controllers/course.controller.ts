import { Request, Response, NextFunction } from 'express';
import { CourseService } from '../services/course.service';
import { processImage } from '../middleware/imageProcessor';

const courseService = new CourseService();

export const createCourse = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const teacherId = req.user?.userId;
    if (!teacherId) {
      res.status(401).json({ message: 'Unauthorized' });
      return;
    }

    const data = { ...req.body, teacherId };
    const course = await courseService.createCourse(data);
    res.status(201).json(course);
  } catch (error) {
    next(error);
  }
};

export const getCourse = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const course = await courseService.getCourseById(req.params.id);
    if (!course) {
      res.status(404).json({ message: 'Course not found' });
      return;
    }
    res.json(course);
  } catch (error) {
    next(error);
  }
};

export const updateCourse = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const updated = await courseService.updateCourse(req.params.id, req.body);
    if (!updated) {
      res.status(404).json({ message: 'Course not found' });
      return;
    }
    res.json(updated);
  } catch (error) {
    next(error);
  }
};

export const deleteCourse = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const deleted = await courseService.deleteCourse(req.params.id);
    if (!deleted) {
      res.status(404).json({ message: 'Course not found' });
      return;
    }
    res.json({ message: 'Course deleted successfully' });
  } catch (error) {
    next(error);
  }
};

export const uploadCourseImage = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    if (!req.file) {
      res.status(400).json({ message: 'No file uploaded' });
      return;
    }

    const processedPath = await processImage(req.file.path);

    const courseId = req.params.id;
    const updated = await courseService.updateCourse(courseId, { imagePath: processedPath });
    if (!updated) {
      res.status(404).json({ message: 'Course not found' });
      return;
    }

    res.status(201).json({ message: 'Image uploaded and processed', imagePath: processedPath });
  } catch (error) {
    next(error);
  }
};
