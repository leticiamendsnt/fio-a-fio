import { Router } from 'express';
import { getPosts, getPostById, createPost, updatePost, deletePost, toggleLikePost } from '../controllers/postController.js';
import { optionalAuth } from '../middlewares/authMiddleware.js';

const router = Router();

router.get('/', getPosts);
router.get('/:id', getPostById);
router.post('/', optionalAuth, createPost);
router.patch('/:id', optionalAuth, updatePost);
router.put('/:id', optionalAuth, updatePost);
router.delete('/:id', optionalAuth, deletePost);
router.post('/:id/like', optionalAuth, toggleLikePost);

export default router;
