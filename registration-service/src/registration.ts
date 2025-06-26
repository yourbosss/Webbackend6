import mongoose, { Schema, Document, Model } from 'mongoose';
import { Rabbit } from './rabbit';

interface IRegistration extends Document {
  userId: string;
  courseId: string;
  status: 'processing' | 'confirmed' | 'failed';
  createdAt: Date;
  updatedAt: Date;
}

const registrationSchema = new Schema<IRegistration>({
  userId: { type: String, required: true },
  courseId: { type: String, required: true },
  status: { type: String, enum: ['processing', 'confirmed', 'failed'], default: 'processing' },
}, { timestamps: true });

const RegistrationModel: Model<IRegistration> = mongoose.model('Registration', registrationSchema);

export class Registration {
  constructor(private rabbit: Rabbit) {}

  async submitRegistration(userId: string, courseId: string) {
    await RegistrationModel.create({ userId, courseId, status: 'processing' });
    await this.rabbit.publishRegistration({ userId, courseId });
  }

  async getStatus(userId: string, courseId: string) {
    const registration = await RegistrationModel.findOne({ userId, courseId });
    if (!registration) return { status: 'not_found' };
    return { status: registration.status };
  }

  async updateStatus(userId: string, courseId: string, status: 'processing' | 'confirmed' | 'failed') {
    await RegistrationModel.updateOne({ userId, courseId }, { status, updatedAt: new Date() });
  }

  async deleteRegistration(userId: string, courseId: string) {
    const result = await RegistrationModel.deleteOne({ userId, courseId });
    return result.deletedCount === 1;
  }
}
