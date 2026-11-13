import { Router } from 'express';
import { getAdminDashboard, updateReport } from '../controllers/adminController.js';
import { optionalAuth } from '../middlewares/authMiddleware.js';

const router = Router();

router.get('/dashboard', getAdminDashboard);
router.patch('/reports/:id', optionalAuth, updateReport);
router.put('/reports/:id', optionalAuth, updateReport);

export default router;
