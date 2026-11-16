import { Router } from 'express';
import {
  getPurchases,
  getPurchaseById,
  createPurchase,
  updatePurchase,
  deletePurchase
} from '../controllers/purchaseController.js';
import { optionalAuth } from '../middlewares/authMiddleware.js';
import { validate } from '../middlewares/validate.js';
import { createPurchaseSchema, updatePurchaseSchema } from '../schemas/purchaseSchema.js';

const router = Router();

router.get('/', getPurchases);
router.get('/:id', getPurchaseById);
router.post('/', optionalAuth, validate(createPurchaseSchema), createPurchase);
router.patch('/:id', optionalAuth, validate(updatePurchaseSchema), updatePurchase);
router.put('/:id', optionalAuth, validate(updatePurchaseSchema), updatePurchase);
router.delete('/:id', optionalAuth, deletePurchase);

export default router;
