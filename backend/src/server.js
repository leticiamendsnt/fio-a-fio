import { createApp } from './app.js';
import { connectDB } from './config/db.js';
import { env } from './config/env.js';
import { setupWebSocketServer } from './services/websocketService.js';
import { ensureMockUsersInDB, ensureInitialReviewsInDB } from './scripts/mockUsers.js';

const startServer = async () => {
  // Inicializa conexão com o MongoDB
  const conn = await connectDB();
  if (conn) {
    // Garante que os usuários mockados do README.md existam no banco para testes
    await ensureMockUsersInDB();
    // Garante que a coleção Review exista e tenha avaliações de exemplo
    await ensureInitialReviewsInDB();
  }

  const app = createApp();

  const server = app.listen(env.PORT, () => {
    console.log(`\n🧵 ===============================================`);
    console.log(`🧶 Fio a Fio Backend API iniciado com sucesso!`);
    console.log(`🚀 Servidor rodando em: http://localhost:${env.PORT}`);
    console.log(`💬 WebSocket ativo em: ws://localhost:${env.PORT}/ws`);
    console.log(`📦 Banco de dados: MongoDB (${env.MONGODB_URI})`);
    console.log(`🌐 Ambiente: ${env.NODE_ENV}`);
    console.log(`🧵 ===============================================\n`);
  });

  server.on('error', (err) => {
    if (err.code === 'EADDRINUSE') {
      console.error(`\n❌ [Servidor] A porta ${env.PORT} já está em uso por outro processo!`);
      console.error(`👉 DICA: Finalize o processo que está usando a porta ${env.PORT} ou execute:`);
      console.error(`   netstat -ano | findstr :${env.PORT}   (e depois taskkill /PID <PID> /F)\n`);
    } else {
      console.error('[Servidor] Erro no servidor HTTP:', err.message);
    }
  });

  // Inicializa o servidor WebSocket de mensagens em tempo real
  setupWebSocketServer(server);

  const gracefulShutdown = () => {
    console.log('\n[Servidor] Encerrando graciosamente...');
    server.close(() => {
      console.log('[Servidor] Servidor HTTP finalizado.');
      process.exit(0);
    });
  };

  process.on('SIGINT', gracefulShutdown);
  process.on('SIGTERM', gracefulShutdown);
};

startServer().catch((err) => {
  console.error('[Servidor] Falha crítica ao iniciar:', err);
});
