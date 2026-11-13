import { Router } from 'express';
import {
  getMaterials,
  getMaterialById,
  createMaterial,
  updateMaterial,
  deleteMaterial
} from '../controllers/materialController.js';
import { optionalAuth } from '../middlewares/authMiddleware.js';

const router = Router();

router.get('/', getMaterials);
router.get('/:id', getMaterialById);
router.post('/', optionalAuth, createMaterial);
router.patch('/:id', optionalAuth, updateMaterial);
router.put('/:id', optionalAuth, updateMaterial);
router.delete('/:id', optionalAuth, deleteMaterial);

export default router;
