import { Router } from 'express';
import { getStories, createStory, deleteStory } from '../controllers/storyController.js';
import { optionalAuth } from '../middlewares/authMiddleware.js';
import { validate } from '../middlewares/validate.js';
import { createStorySchema } from '../schemas/storySchema.js';

const router = Router();

router.get('/', getStories);
router.post('/', optionalAuth, validate(createStorySchema), createStory);
router.delete('/:id', optionalAuth, deleteStory);

export default router;
