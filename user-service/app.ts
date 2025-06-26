import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import cors from 'cors';

import authRoutes from './routes/auth.routes';
import userRoutes from './routes/user.routes';

import { authenticateToken } from './middleware/authenticateToken';
import { loggingMiddleware } from './middleware/loggingMiddleware';
import { errorHandlerMiddleware } from './middleware/errorHandlerMiddleware';

dotenv.config();

const app = express();

// Парсинг JSON тела запросов
app.use(express.json());

// Разрешить CORS (если нужно)
app.use(cors());

// Логирование запросов
app.use(loggingMiddleware);

// Публичные маршруты (регистрация, логин)
app.use('/api/auth', authRoutes);

// Middleware аутентификации JWT
app.use(authenticateToken);

// Защищённые маршруты пользователя
app.use('/api/users', userRoutes);

// Обработчик ошибок (последним)
app.use(errorHandlerMiddleware);

export default app;
