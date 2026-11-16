import { Router } from 'express';
import { getUsers, getUserById, createUser, updateUser, deleteUser, toggleFollow } from '../controllers/userController.js';
import { requireAuth, requireRole, optionalAuth } from '../middlewares/authMiddleware.js';
import { validate } from '../middlewares/validate.js';
import { createUserSchema, updateUserSchema } from '../schemas/userSchema.js';

const router = Router();

router.get('/', getUsers);
router.get('/:id', getUserById);
router.post('/', validate(createUserSchema), createUser);
router.patch('/:id', validate(updateUserSchema), updateUser);
router.put('/:id', validate(updateUserSchema), updateUser);
router.delete('/:id', requireAuth, requireRole('admin', 'user', 'creator'), deleteUser);
router.post('/:id/follow', requireAuth, requireRole('user', 'creator', 'admin'), toggleFollow);

export default router;
