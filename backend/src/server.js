import { createApp } from './app.js';
import { connectDB } from './config/db.js';
import { env } from './config/env.js';

const startServer = async () => {
  // Inicializa conexão com o MongoDB
  await connectDB();

  const app = createApp();

  const server = app.listen(env.PORT, () => {
    console.log(`\n🧵 ===============================================`);
    console.log(`🧶 Fio a Fio Backend API iniciado com sucesso!`);
    console.log(`🚀 Servidor rodando em: http://localhost:${env.PORT}`);
    console.log(`📦 Banco de dados: MongoDB (${env.MONGODB_URI})`);
    console.log(`🌐 Ambiente: ${env.NODE_ENV}`);
    console.log(`🧵 ===============================================\n`);
  });

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
