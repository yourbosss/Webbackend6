import express from 'express';
import { userProxy, courseProxy, registrationProxy } from './proxy';

const app = express();

app.use(express.json());

app.use('/api/users', userProxy);
app.use('/api/courses', courseProxy);
app.use('/api/registration', registrationProxy);

export default app;
