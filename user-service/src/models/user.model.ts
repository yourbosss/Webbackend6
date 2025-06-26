import mongoose from 'mongoose';

export type UserRole = 'student' | 'teacher' | 'admin';

export interface IUser extends mongoose.Document {
  firstName: string;
  lastName: string;
  username: string;
  password: string;
  role: UserRole;
  favoriteCourseIds: mongoose.Types.ObjectId[];
  createdAt: Date;
  updatedAt: Date;
}

const userSchema = new mongoose.Schema<IUser>({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { 
    type: String, 
    enum: ['student', 'teacher', 'admin'], 
    default: 'student', 
    required: true 
  },
  favoriteCourseIds: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Course' }],
}, {
  timestamps: true
});

export const User = mongoose.model<IUser>('User', userSchema);
