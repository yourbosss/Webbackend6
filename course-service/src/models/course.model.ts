import mongoose, { Document, Schema, Model } from 'mongoose';

export interface ICourse extends Document {
  title: string;
  description: string;
  teacherId: mongoose.Types.ObjectId;
  lessons: mongoose.Types.ObjectId[];
  imagePath?: string;
  createdAt: Date;
  updatedAt: Date;
}

const courseSchema = new Schema<ICourse>(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    teacherId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    lessons: [{ type: Schema.Types.ObjectId, ref: 'Lesson' }],
    imagePath: { type: String },
  },
  { timestamps: true }
);

export const Course: Model<ICourse> = mongoose.model<ICourse>('Course', courseSchema);
