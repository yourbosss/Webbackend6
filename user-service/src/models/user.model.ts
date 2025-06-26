import mongoose, { Document, Schema, Model } from 'mongoose';

// Определяем тип ролей пользователя
export type UserRole = 'student' | 'teacher' | 'admin';

// Интерфейс IUser расширяет mongoose.Document и содержит поле _id с типом ObjectId
export interface IUser extends Document {
  _id: mongoose.Types.ObjectId;
  firstName: string;
  lastName: string;
  username: string;
  password: string;
  role: UserRole;
  favoriteCourseIds: mongoose.Types.ObjectId[];
  createdAt: Date;
  updatedAt: Date;
}

const userSchema: Schema<IUser> = new Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: {
      type: String,
      enum: ['student', 'teacher', 'admin'],
      default: 'student',
      required: true,
    },
    favoriteCourseIds: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Course' }],
  },
  {
    timestamps: true,
  }
);

export const User: Model<IUser> = mongoose.model<IUser>('User', userSchema);
