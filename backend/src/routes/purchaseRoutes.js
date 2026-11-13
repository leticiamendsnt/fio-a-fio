import { Router } from 'express';
import {
  getPurchases,
  getPurchaseById,
  createPurchase,
  updatePurchase,
  deletePurchase
} from '../controllers/purchaseController.js';
import { optionalAuth } from '../middlewares/authMiddleware.js';

const router = Router();

router.get('/', getPurchases);
router.get('/:id', getPurchaseById);
router.post('/', optionalAuth, createPurchase);
router.patch('/:id', optionalAuth, updatePurchase);
router.put('/:id', optionalAuth, updatePurchase);
router.delete('/:id', optionalAuth, deletePurchase);

export default router;
