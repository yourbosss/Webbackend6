import { Router } from 'express';
import {
  createLesson,
  getLesson,
  updateLesson,
  deleteLesson
} from '../controllers/lesson.controller';
import { authenticateToken } from '../middleware/authenticateToken.ts';

const router = Router();

router.post('/', authenticateToken, createLesson);
router.get('/:id', getLesson);
router.put('/:id', authenticateToken, updateLesson);
router.delete('/:id', authenticateToken, deleteLesson);

export default router;
