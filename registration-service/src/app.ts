import express, { Request, Response, NextFunction } from 'express';
import mongoose from 'mongoose';
import { Rabbit } from './rabbit';
import { Registration } from './registration';

const app = express();
app.use(express.json());

const rabbit = new Rabbit();
const registration = new Registration(rabbit);

rabbit.connect(process.env.RABBITMQ_URL || 'amqp://localhost').catch(console.error);

mongoose.connect(process.env.MONGO_URL || 'mongodb://localhost:27017/registrationdb')
  .then(() => console.log('Connected to MongoDB'))
  .catch(console.error);

app.post('/register', async (req: Request, res: Response, next: NextFunction) => {
  const { userId, courseId } = req.body;
  if (!userId || !courseId) {
    res.status(400).json({ message: 'userId and courseId are required' });
    return;
  }

  try {
    await registration.submitRegistration(userId, courseId);
    res.status(200).json({ message: 'Registration request accepted' });
  } catch (error) {
    next(error);
  }
});

app.get('/status', async (req: Request, res: Response, next: NextFunction) => {
  const { userId, courseId } = req.query as { userId?: string; courseId?: string };
  if (!userId || !courseId) {
    res.status(400).json({ message: 'userId and courseId query params required' });
    return;
  }

  try {
    const status = await registration.getStatus(userId, courseId);
    res.json(status);
  } catch (error) {
    next(error);
  }
});

app.put('/status', async (req: Request, res: Response, next: NextFunction) => {
  const { userId, courseId, status } = req.body;
  if (!userId || !courseId || !status) {
    res.status(400).json({ message: 'userId, courseId and status are required' });
    return;
  }

  if (!['confirmed', 'failed', 'processing'].includes(status)) {
    res.status(400).json({ message: 'Invalid status value' });
    return;
  }

  try {
    await registration.updateStatus(userId, courseId, status);
    res.status(200).json({ message: 'Status updated successfully' });
  } catch (error) {
    next(error);
  }
});

app.delete('/registration', async (req: Request, res: Response, next: NextFunction) => {
  const { userId, courseId } = req.body;
  if (!userId || !courseId) {
    res.status(400).json({ message: 'userId and courseId are required' });
    return;
  }

  try {
    const deleted = await registration.deleteRegistration(userId, courseId);
    if (deleted) {
      res.status(200).json({ message: 'Registration deleted successfully' });
    } else {
      res.status(404).json({ message: 'Registration not found' });
    }
  } catch (error) {
    next(error);
  }
});

// Глобальный обработчик ошибок
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  console.error('Unhandled error:', err);
  res.status(500).json({ message: 'Internal server error' });
});

export { app };
