import { Router } from 'express';
import {
  createCourse,
  getCourse,
  updateCourse,
  deleteCourse,
  uploadCourseImage
} from '../controllers/course.controller';
import { authenticateToken } from '../middleware/authenticateToken';
import { upload } from '../middleware/upload.middleware';

const router = Router();

router.post('/', authenticateToken, createCourse);
router.get('/:id', getCourse);
router.put('/:id', authenticateToken, updateCourse);
router.delete('/:id', authenticateToken, deleteCourse);
router.post('/:id/image', authenticateToken, upload.single('image'), uploadCourseImage);

export default router;
