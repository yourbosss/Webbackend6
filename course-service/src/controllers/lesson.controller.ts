import { Request, Response, NextFunction } from 'express';
import { LessonService } from '../services/lesson.service';

const lessonService = new LessonService();

export const createLesson = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const lesson = await lessonService.createLesson(req.body);
    res.status(201).json(lesson);
  } catch (error) {
    next(error);
  }
};

export const getLesson = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const lesson = await lessonService.getLessonById(req.params.id);
    if (!lesson) {
      res.status(404).json({ message: 'Lesson not found' });
      return;
    }
    res.json(lesson);
  } catch (error) {
    next(error);
  }
};

export const updateLesson = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const updated = await lessonService.updateLesson(req.params.id, req.body);
    if (!updated) {
      res.status(404).json({ message: 'Lesson not found' });
      return;
    }
    res.json(updated);
  } catch (error) {
    next(error);
  }
};

export const deleteLesson = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const deleted = await lessonService.deleteLesson(req.params.id);
    if (!deleted) {
      res.status(404).json({ message: 'Lesson not found' });
      return;
    }
    res.json({ message: 'Lesson deleted successfully' });
  } catch (error) {
    next(error);
  }
};
