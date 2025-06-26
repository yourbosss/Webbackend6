import mongoose, { Document, Schema, Model } from 'mongoose';

export interface ILesson extends Document {
  courseId: mongoose.Types.ObjectId;
  title: string;
  content: string;
  order: number;
  createdAt: Date;
  updatedAt: Date;
}

const lessonSchema = new Schema<ILesson>(
  {
    courseId: { type: Schema.Types.ObjectId, ref: 'Course', required: true },
    title: { type: String, required: true },
    content: { type: String, required: true },
    order: { type: Number, required: true },
  },
  { timestamps: true }
);

export const Lesson: Model<ILesson> = mongoose.model<ILesson>('Lesson', lessonSchema);
