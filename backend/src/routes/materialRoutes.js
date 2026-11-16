import { Router } from 'express';
import {
  getMaterials,
  getMaterialById,
  createMaterial,
  updateMaterial,
  deleteMaterial
} from '../controllers/materialController.js';
import { requireAuth, requireRole } from '../middlewares/authMiddleware.js';
import { validate } from '../middlewares/validate.js';
import { createMaterialSchema, updateMaterialSchema } from '../schemas/materialSchema.js';

const router = Router();

router.get('/', getMaterials);
router.get('/:id', getMaterialById);
router.post('/', requireAuth, requireRole('creator', 'admin'), validate(createMaterialSchema), createMaterial);
router.patch('/:id', requireAuth, requireRole('creator', 'admin'), validate(updateMaterialSchema), updateMaterial);
router.put('/:id', requireAuth, requireRole('creator', 'admin'), validate(updateMaterialSchema), updateMaterial);
router.delete('/:id', requireAuth, requireRole('creator', 'admin'), deleteMaterial);

export default router;
