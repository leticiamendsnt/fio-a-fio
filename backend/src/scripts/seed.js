import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { connectDB, closeDB } from '../config/db.js';
import { User } from '../models/User.js';
import { Post } from '../models/Post.js';
import { Comment } from '../models/Comment.js';
import { Story } from '../models/Story.js';
import { VideoLesson } from '../models/VideoLesson.js';
import { Material } from '../models/Material.js';
import { Purchase } from '../models/Purchase.js';
import { Sale } from '../models/Sale.js';
import { Conversation } from '../models/Conversation.js';
import { Message } from '../models/Message.js';
import { AdminDashboard } from '../models/AdminDashboard.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const seedDatabase = async () => {
  try {
    const conn = await connectDB();
    if (!conn) {
      console.error('[Seed] Falha ao conectar ao MongoDB. Verifique se o serviço está rodando.');
      process.exit(1);
    }

    const dbJsonPath = path.resolve(__dirname, '../../db.json');
    if (!fs.existsSync(dbJsonPath)) {
      console.error(`[Seed] Arquivo de dados não encontrado em: ${dbJsonPath}`);
      process.exit(1);
    }

    const rawData = fs.readFileSync(dbJsonPath, 'utf-8');
    const db = JSON.parse(rawData);

    console.log('[Seed] Limpando dados anteriores...');
    await Promise.all([
      User.deleteMany({}),
      Post.deleteMany({}),
      Comment.deleteMany({}),
      Story.deleteMany({}),
      VideoLesson.deleteMany({}),
      Material.deleteMany({}),
      Purchase.deleteMany({}),
      Sale.deleteMany({}),
      Conversation.deleteMany({}),
      Message.deleteMany({}),
      AdminDashboard.deleteMany({}),
    ]);

    console.log('[Seed] Inserindo dados de db.json...');

    if (db.users?.length) {
      await User.insertMany(db.users);
      console.log(`[Seed] ✓ ${db.users.length} usuários inseridos.`);
    }

    if (db.posts?.length) {
      await Post.insertMany(db.posts);
      console.log(`[Seed] ✓ ${db.posts.length} posts inseridos.`);
    }

    if (db.comments?.length) {
      await Comment.insertMany(db.comments);
      console.log(`[Seed] ✓ ${db.comments.length} comentários inseridos.`);
    }

    if (db.stories?.length) {
      await Story.insertMany(db.stories);
      console.log(`[Seed] ✓ ${db.stories.length} stories inseridos.`);
    }

    if (db.videoLessons?.length) {
      await VideoLesson.insertMany(db.videoLessons);
      console.log(`[Seed] ✓ ${db.videoLessons.length} vídeo-aulas inseridas.`);
    }

    if (db.materials?.length) {
      await Material.insertMany(db.materials);
      console.log(`[Seed] ✓ ${db.materials.length} materiais inseridos.`);
    }

    if (db.purchases?.length) {
      await Purchase.insertMany(db.purchases);
      console.log(`[Seed] ✓ ${db.purchases.length} compras inseridas.`);
    }

    if (db.sales?.length) {
      await Sale.insertMany(db.sales);
      console.log(`[Seed] ✓ ${db.sales.length} vendas inseridas.`);
    }

    if (db.conversations?.length) {
      await Conversation.insertMany(db.conversations);
      console.log(`[Seed] ✓ ${db.conversations.length} conversas inseridas.`);
    }

    if (db.messages?.length) {
      await Message.insertMany(db.messages);
      console.log(`[Seed] ✓ ${db.messages.length} mensagens inseridas.`);
    }

    if (db.adminDashboard) {
      const dashboardData = {
        id: 'main-dashboard',
        ...db.adminDashboard,
      };
      await AdminDashboard.create(dashboardData);
      console.log(`[Seed] ✓ Dashboard administrativo inicializado.`);
    }

    console.log('\n[Seed] 🎉 Banco MongoDB povoado com sucesso a partir de db.json!\n');
    await closeDB();
    process.exit(0);
  } catch (error) {
    console.error('[Seed] Erro ao povoar o banco:', error);
    process.exit(1);
  }
};

seedDatabase();

