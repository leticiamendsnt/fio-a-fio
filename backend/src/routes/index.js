import { Router } from 'express';
import authRoutes from './authRoutes.js';
import userRoutes from './userRoutes.js';
import postRoutes from './postRoutes.js';
import commentRoutes from './commentRoutes.js';
import storyRoutes from './storyRoutes.js';
import videoLessonRoutes from './videoLessonRoutes.js';
import materialRoutes from './materialRoutes.js';
import purchaseRoutes from './purchaseRoutes.js';
import saleRoutes from './saleRoutes.js';
import { conversationRouter, messageRouter } from './chatRoutes.js';
import adminRoutes from './adminRoutes.js';
import { getSalesSummary } from '../controllers/saleController.js';
import { getAdminDashboard } from '../controllers/adminController.js';

export const setupRoutes = (app) => {
  // Rotas de Autenticação
  app.use('/auth', authRoutes);
  app.use('/api/auth', authRoutes);

  // Rotas compatíveis com JSON Server e REST padrão
  app.use('/users', userRoutes);
  app.use('/api/users', userRoutes);

  app.use('/posts', postRoutes);
  app.use('/api/posts', postRoutes);

  app.use('/comments', commentRoutes);
  app.use('/api/comments', commentRoutes);

  app.use('/stories', storyRoutes);
  app.use('/api/stories', storyRoutes);

  app.use('/videoLessons', videoLessonRoutes);
  app.use('/api/videoLessons', videoLessonRoutes);
  app.use('/api/videos', videoLessonRoutes);

  app.use('/materials', materialRoutes);
  app.use('/api/materials', materialRoutes);

  app.use('/purchases', purchaseRoutes);
  app.use('/api/purchases', purchaseRoutes);

  app.use('/sales', saleRoutes);
  app.use('/api/sales', saleRoutes);

  // Endpoints especiais legados do JSON Server
  app.get('/salesSummary', getSalesSummary);
  app.get('/api/salesSummary', getSalesSummary);

  app.use('/conversations', conversationRouter);
  app.use('/api/conversations', conversationRouter);

  app.use('/messages', messageRouter);
  app.use('/api/messages', messageRouter);

  app.get('/adminDashboard', getAdminDashboard);
  app.get('/api/adminDashboard', getAdminDashboard);
  app.use('/admin', adminRoutes);
  app.use('/api/admin', adminRoutes);

  // Health check
  app.get('/health', (req, res) => {
    res.status(200).json({
      status: 'ok',
      service: 'Fio a Fio Backend API',
      timestamp: new Date().toISOString()
    });
  });
  app.get('/api/health', (req, res) => {
    res.status(200).json({
      status: 'ok',
      service: 'Fio a Fio Backend API',
      timestamp: new Date().toISOString()
    });
  });
};
