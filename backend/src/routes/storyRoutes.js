import { Router } from 'express';
import { getStories, createStory, deleteStory } from '../controllers/storyController.js';
import { optionalAuth } from '../middlewares/authMiddleware.js';

const router = Router();

router.get('/', getStories);
router.post('/', optionalAuth, createStory);
router.delete('/:id', optionalAuth, deleteStory);

export default router;
