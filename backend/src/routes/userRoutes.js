import { Router } from 'express';
import { getUsers, getUserById, createUser, updateUser, deleteUser, toggleFollow } from '../controllers/userController.js';
import { optionalAuth } from '../middlewares/authMiddleware.js';

const router = Router();

router.get('/', getUsers);
router.get('/:id', getUserById);
router.post('/', createUser);
router.patch('/:id', updateUser);
router.put('/:id', updateUser);
router.delete('/:id', deleteUser);
router.post('/:id/follow', optionalAuth, toggleFollow);

export default router;
