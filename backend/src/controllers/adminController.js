import { statsService } from '../services/statsService.js';
import { AdminDashboard } from '../models/AdminDashboard.js';

export const getAdminDashboard = async (req, res, next) => {
  try {
    const stats = await statsService.getAdminStats();
    res.status(200).json(stats);
  } catch (error) {
    next(error);
  }
};

export const updateReport = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const dashboard = await AdminDashboard.findOne({ id: 'main-dashboard' });
    if (dashboard) {
      const reportIndex = dashboard.reportedPosts.findIndex(r => r.id === id);
      if (reportIndex !== -1) {
        dashboard.reportedPosts[reportIndex].status = status || 'Resolvido';
        await dashboard.save();
      }
    }

    res.status(200).json({ message: 'Denúncia atualizada com sucesso', id });
  } catch (error) {
    next(error);
  }
};
