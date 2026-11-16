import { Router } from 'express';
import { getAdminDashboard, updateReport } from '../controllers/adminController.js';
import { requireAuth, requireRole } from '../middlewares/authMiddleware.js';

const router = Router();

// Todas as rotas administrativas requerem perfil de administrador
router.use(requireAuth, requireRole('admin'));

router.get('/dashboard', getAdminDashboard);
router.patch('/reports/:id', updateReport);
router.put('/reports/:id', updateReport);

export default router;
