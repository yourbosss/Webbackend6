import { Course, ICourse } from '../models/course.model';
import mongoose from 'mongoose';

export class CourseService {
  async createCourse(data: Partial<ICourse>): Promise<ICourse> {
    const course = new Course(data);
    return course.save();
  }

  async getCourseById(id: string): Promise<ICourse | null> {
    if (!mongoose.Types.ObjectId.isValid(id)) return null;
    return Course.findById(id).populate('lessons').exec();
  }

  async updateCourse(id: string, data: Partial<ICourse>): Promise<ICourse | null> {
    if (!mongoose.Types.ObjectId.isValid(id)) return null;
    return Course.findByIdAndUpdate(id, data, { new: true }).exec();
  }

  async deleteCourse(id: string): Promise<ICourse | null> {
    if (!mongoose.Types.ObjectId.isValid(id)) return null;
    return Course.findByIdAndDelete(id).exec();
  }
}
