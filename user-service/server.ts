import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import authRoutes from './src/routes/auth.routes';
import userRoutes from './src/routes/user.routes';
import { authenticateToken } from './src/middleware/authenticateToken';
import { loggingMiddleware } from './src/middleware/loggingMiddleware';
import { errorHandlerMiddleware } from './src/middleware/errorHandlerMiddleware';

dotenv.config();

const app = express();

app.use(express.json());
app.use(loggingMiddleware);

app.use('/api/auth', authRoutes);
app.use(authenticateToken);
app.use('/api/users', userRoutes);

app.use(errorHandlerMiddleware);

const PORT = process.env.PORT || 5001;

mongoose.connect(process.env.MONGO_URL || '')
  .then(() => {
    console.log('User-service connected to MongoDB');
    app.listen(PORT, () => console.log(`User-service running on port ${PORT}`));
  })
  .catch(err => {
    console.error('MongoDB connection error:', err);
  });
