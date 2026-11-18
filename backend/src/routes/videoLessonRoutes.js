import { Router } from 'express';
import {
  getVideoLessons,
  getVideoLessonById,
  createVideoLesson,
  updateVideoLesson,
  deleteVideoLesson,
  createLessonReview,
  getLessonReviews
} from '../controllers/videoLessonController.js';
import { requireAuth, requireRole, optionalAuth } from '../middlewares/authMiddleware.js';
import { validate } from '../middlewares/validate.js';
import { createVideoLessonSchema, updateVideoLessonSchema } from '../schemas/videoLessonSchema.js';
import { createReviewSchema } from '../schemas/reviewSchema.js';

const router = Router();

router.get('/', getVideoLessons);
router.get('/:id', getVideoLessonById);
router.post('/', requireAuth, requireRole('creator', 'admin'), validate(createVideoLessonSchema), createVideoLesson);
router.patch('/:id', requireAuth, requireRole('creator', 'admin'), validate(updateVideoLessonSchema), updateVideoLesson);
router.put('/:id', requireAuth, requireRole('creator', 'admin'), validate(updateVideoLessonSchema), updateVideoLesson);
router.delete('/:id', requireAuth, requireRole('creator', 'admin'), deleteVideoLesson);

// Rotas de Avaliação (Reviews)
router.get('/:id/reviews', getLessonReviews);
router.post('/:id/reviews', optionalAuth, validate(createReviewSchema), createLessonReview);

export default router;
