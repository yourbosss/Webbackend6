import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

import courseRoutes from './src/routes/course.routes';
import lessonRoutes from './src/routes/lesson.routes';

import { authenticateToken } from './src/middleware/authenticateToken';
import { loggingMiddleware } from './src/middleware/loggingMiddleware';
import { errorHandlerMiddleware } from './src/middleware/errorHandlerMiddleware';

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use(loggingMiddleware);

app.use('/api/courses', courseRoutes);
app.use('/api/lessons', lessonRoutes);

app.use(errorHandlerMiddleware);

export default app;
