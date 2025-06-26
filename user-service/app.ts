import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import cors from 'cors';

import authRoutes from './src/routes/auth.routes';
import userRoutes from './src/routes/user.routes';

import { authenticateToken } from './src/middleware/authenticateToken';
import { loggingMiddleware } from './src/middleware/loggingMiddleware';
import { errorHandlerMiddleware } from './src/middleware/errorHandlerMiddleware';

dotenv.config();

const app = express();

app.use(express.json());
app.use(cors());
app.use(loggingMiddleware);


app.use('/api/auth', authRoutes);
app.use(authenticateToken);
app.use('/api/users', userRoutes);
app.use(errorHandlerMiddleware);

export default app;
