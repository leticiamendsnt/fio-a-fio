import { Router } from 'express';
import {
  getVideoLessons,
  getVideoLessonById,
  createVideoLesson,
  updateVideoLesson,
  deleteVideoLesson
} from '../controllers/videoLessonController.js';
import { requireAuth, requireRole } from '../middlewares/authMiddleware.js';
import { validate } from '../middlewares/validate.js';
import { createVideoLessonSchema, updateVideoLessonSchema } from '../schemas/videoLessonSchema.js';

const router = Router();

router.get('/', getVideoLessons);
router.get('/:id', getVideoLessonById);
router.post('/', requireAuth, requireRole('creator', 'admin'), validate(createVideoLessonSchema), createVideoLesson);
router.patch('/:id', requireAuth, requireRole('creator', 'admin'), validate(updateVideoLessonSchema), updateVideoLesson);
router.put('/:id', requireAuth, requireRole('creator', 'admin'), validate(updateVideoLessonSchema), updateVideoLesson);
router.delete('/:id', requireAuth, requireRole('creator', 'admin'), deleteVideoLesson);

export default router;
