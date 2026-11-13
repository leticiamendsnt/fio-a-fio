import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import { env } from './config/env.js';
import { setupRoutes } from './routes/index.js';
import { notFoundHandler, errorHandler } from './middlewares/errorMiddleware.js';

export const createApp = () => {
  const app = express();

  // Middlewares globais
  app.use(cors({
    origin: env.CORS_ORIGIN === '*' ? true : env.CORS_ORIGIN,
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'x-user-id']
  }));

  app.use(express.json({ limit: '15mb' }));
  app.use(express.urlencoded({ extended: true, limit: '15mb' }));

  if (env.NODE_ENV !== 'test') {
    app.use(morgan('dev'));
  }

  // Raiz informativa
  app.get('/', (req, res) => {
    res.json({
      name: 'Fio a Fio API — Backend com Node.js, Express e MongoDB',
      version: '1.0.0',
      status: 'online',
      documentation: '/DocumentacaoFioAFio.md',
      endpoints: [
        '/users',
        '/posts',
        '/comments',
        '/stories',
        '/videoLessons',
        '/materials',
        '/purchases',
        '/sales',
        '/salesSummary',
        '/conversations',
        '/messages',
        '/adminDashboard',
        '/auth/login',
        '/auth/register',
        '/auth/me'
      ]
    });
  });

  // Configura rotas da API
  setupRoutes(app);

  // Tratamento de rotas inexistentes (404)
  app.use(notFoundHandler);

  // Tratamento centralizado de erros (500)
  app.use(errorHandler);

  return app;
};

export default createApp;
