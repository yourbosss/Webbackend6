import { Lesson, ILesson } from '../models/lesson.model';
import mongoose from 'mongoose';

export class LessonService {
  async createLesson(data: Partial<ILesson>): Promise<ILesson> {
    const lesson = new Lesson(data);
    return lesson.save();
  }

  async getLessonById(id: string): Promise<ILesson | null> {
    if (!mongoose.Types.ObjectId.isValid(id)) return null;
    return Lesson.findById(id).exec();
  }

  async updateLesson(id: string, data: Partial<ILesson>): Promise<ILesson | null> {
    if (!mongoose.Types.ObjectId.isValid(id)) return null;
    return Lesson.findByIdAndUpdate(id, data, { new: true }).exec();
  }

  async deleteLesson(id: string): Promise<ILesson | null> {
    if (!mongoose.Types.ObjectId.isValid(id)) return null;
    return Lesson.findByIdAndDelete(id).exec();
  }
}
