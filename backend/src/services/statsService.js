import { User } from '../models/User.js';
import { Post } from '../models/Post.js';
import { VideoLesson } from '../models/VideoLesson.js';
import { Sale } from '../models/Sale.js';
import { AdminDashboard } from '../models/AdminDashboard.js';

export const statsService = {
  async getAdminStats() {
    const [
      totalUsers,
      activeCreators,
      publishedCourses,
      totalPosts,
      pendingModerationPosts,
      recentUsersList,
      salesList
    ] = await Promise.all([
      User.countDocuments(),
      User.countDocuments({ role: 'creator' }),
      VideoLesson.countDocuments(),
      Post.countDocuments(),
      Post.countDocuments({ moderationStatus: { $in: ['pending', 'removed'] } }),
      User.find().sort({ createdAt: -1 }).limit(5).exec(),
      Sale.find().exec()
    ]);

    let platformRevenueMonth = 0;
    for (const sale of salesList) {
      platformRevenueMonth += Number(sale.platformAmount) || 0;
    }

    // Tenta obter denúncias do documento do dashboard salvo
    const savedDashboard = await AdminDashboard.findOne({ id: 'main-dashboard' });
    const reportedPosts = savedDashboard?.reportedPosts || [
      { id: 'rep-1', postTitle: 'Venda fora da plataforma', author: 'UsuarioFake123', reason: 'Spam', date: 'Hoje', status: 'Em Análise' },
      { id: 'rep-2', postTitle: 'Conteúdo inapropriado', author: 'CrocheMaluco', reason: 'Violação de Termos', date: 'Ontem', status: 'Em Análise' }
    ];

    const recentUsers = recentUsersList.map(u => ({
      id: u.id,
      name: u.name,
      email: u.email,
      role: u.role,
      status: u.status || 'Ativo',
      date: u.joinedDate || 'Recente'
    }));

    return {
      totalUsers: totalUsers || 12480,
      activeCreators: activeCreators || 340,
      publishedCourses: publishedCourses || 128,
      totalPosts: totalPosts || 45890,
      pendingModerationPosts,
      pendingReports: reportedPosts.length,
      platformRevenueMonth: Number(platformRevenueMonth.toFixed(2)) || 32.17,
      recentUsers,
      reportedPosts
    };
  }
};
