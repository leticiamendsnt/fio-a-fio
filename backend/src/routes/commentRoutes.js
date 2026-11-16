import { Router } from 'express';
import { getComments, createComment, deleteComment } from '../controllers/commentController.js';
import { optionalAuth } from '../middlewares/authMiddleware.js';
import { validate } from '../middlewares/validate.js';
import { createCommentSchema } from '../schemas/commentSchema.js';

const router = Router();

router.get('/', getComments);
router.post('/', optionalAuth, validate(createCommentSchema), createComment);
router.delete('/:id', optionalAuth, deleteComment);

export default router;
