import { Router } from 'express';
import { getUserProfile, deleteUser, toggleFavorite, getCreatedCourses } from '../controllers/user.controller';
import { checkAuthentication } from '../middleware/checkAuthentication';

const router = Router();

router.get('/profile', checkAuthentication, getUserProfile);
router.delete('/:id', checkAuthentication, deleteUser);
router.post('/favorites/:courseId', checkAuthentication, toggleFavorite);
router.get('/my-courses', checkAuthentication, getCreatedCourses);

export default router;
