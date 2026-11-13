import mongoose from 'mongoose';
import { env } from './env.js';

let isConnected = false;

export const connectDB = async (uriOverride) => {
  const uri = uriOverride || env.MONGODB_URI;

  if (isConnected && mongoose.connection.readyState === 1) {
    return mongoose.connection;
  }

  try {
    console.log(`[MongoDB] Conectando ao banco de dados: ${uri}...`);
    const conn = await mongoose.connect(uri, {
      serverSelectionTimeoutMS: 5000,
    });

    isConnected = true;
    console.log(`[MongoDB] Conexão estabelecida com sucesso: ${conn.connection.host}/${conn.connection.name}`);
    return conn.connection;
  } catch (error) {
    console.error(`[MongoDB] Erro ao conectar ao MongoDB (${uri}):`, error.message);
    console.warn(`[MongoDB] DICA: Certifique-se de que o MongoDB esteja em execução (ex: serviço local na porta 27017 ou defina MONGODB_URI no backend/.env para uma instância do MongoDB Atlas).`);
    // Não encerra o processo bruscamente para permitir inicialização e mensagens informativas da API
    return null;
  }
};

mongoose.connection.on('disconnected', () => {
  isConnected = false;
  console.warn('[MongoDB] Desconectado do servidor MongoDB.');
});

mongoose.connection.on('error', (err) => {
  console.error('[MongoDB] Erro na conexão:', err.message);
});

export const closeDB = async () => {
  if (mongoose.connection.readyState !== 0) {
    await mongoose.disconnect();
    isConnected = false;
    console.log('[MongoDB] Conexão encerrada com sucesso.');
  }
};
