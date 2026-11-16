import { Router } from 'express';
import { getPosts, getPostById, createPost, updatePost, deletePost, toggleLikePost } from '../controllers/postController.js';
import { optionalAuth } from '../middlewares/authMiddleware.js';
import { validate } from '../middlewares/validate.js';
import { createPostSchema, updatePostSchema } from '../schemas/postSchema.js';

const router = Router();

router.get('/', getPosts);
router.get('/:id', getPostById);
router.post('/', optionalAuth, validate(createPostSchema), createPost);
router.patch('/:id', optionalAuth, validate(updatePostSchema), updatePost);
router.put('/:id', optionalAuth, validate(updatePostSchema), updatePost);
router.delete('/:id', optionalAuth, deletePost);
router.post('/:id/like', optionalAuth, toggleLikePost);

export default router;
