import { Router } from 'express';
import { getSales, getSalesSummary, getSalesReport, createSale } from '../controllers/saleController.js';
import { requireAuth, requireRole } from '../middlewares/authMiddleware.js';

const router = Router();

router.get('/', requireAuth, requireRole('creator', 'admin'), getSales);
router.post('/', requireAuth, requireRole('user', 'creator', 'admin'), createSale);
router.get('/summary', requireAuth, requireRole('creator', 'admin'), getSalesSummary);
router.get('/report', requireAuth, requireRole('creator', 'admin'), getSalesReport);

export default router;
