import { Router } from 'express';
import {
  getVideoLessons,
  getVideoLessonById,
  createVideoLesson,
  updateVideoLesson,
  deleteVideoLesson
} from '../controllers/videoLessonController.js';
import { optionalAuth } from '../middlewares/authMiddleware.js';

const router = Router();

router.get('/', getVideoLessons);
router.get('/:id', getVideoLessonById);
router.post('/', optionalAuth, createVideoLesson);
router.patch('/:id', optionalAuth, updateVideoLesson);
router.put('/:id', optionalAuth, updateVideoLesson);
router.delete('/:id', optionalAuth, deleteVideoLesson);

export default router;
