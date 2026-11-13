import { Router } from 'express';
import { getComments, createComment, deleteComment } from '../controllers/commentController.js';
import { optionalAuth } from '../middlewares/authMiddleware.js';

const router = Router();

router.get('/', getComments);
router.post('/', optionalAuth, createComment);
router.delete('/:id', optionalAuth, deleteComment);

export default router;
