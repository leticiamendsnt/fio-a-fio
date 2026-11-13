import { Router } from 'express';
import { getSales, getSalesSummary, getSalesReport, createSale } from '../controllers/saleController.js';
import { optionalAuth } from '../middlewares/authMiddleware.js';

const router = Router();

router.get('/', getSales);
router.post('/', optionalAuth, createSale);
router.get('/summary', getSalesSummary);
router.get('/report', getSalesReport);

export default router;
