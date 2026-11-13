import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import {
  User,
  Post,
  Comment,
  Story,
  VideoLesson,
  Material,
  Purchase,
  Sale,
  Conversation,
  Message,
  AdminDashboard
} from '../models/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const seederService = {
  async seedDatabase({ dropExisting = true } = {}) {
    const dbJsonPath = path.resolve(__dirname, '../../../backend/db.json');
    if (!fs.existsSync(dbJsonPath)) {
      throw new Error(`Arquivo db.json não encontrado em: ${dbJsonPath}`);
    }

    const rawData = fs.readFileSync(dbJsonPath, 'utf8');
    const dbData = JSON.parse(rawData);

    console.log('[Seeder] Iniciando migração de dados do db.json para o MongoDB...');

    if (dropExisting) {
      console.log('[Seeder] Limpando coleções existentes...');
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
        AdminDashboard.deleteMany({})
      ]);
    }

    const report = {};

    // 1. Usuários
    if (Array.isArray(dbData.users) && dbData.users.length > 0) {
      // Salva individualmente para acionar o hook pre-save de hash bcrypt das senhas
      for (const u of dbData.users) {
        const user = new User({
          id: u.id,
          name: u.name,
          username: u.username || u.name.toLowerCase().replace(/\s+/g, ''),
          email: u.email,
          password: u.password || '1234',
          role: u.role || 'user',
          avatar: u.avatar,
          bio: u.bio || '',
          followersCount: u.followersCount || 0,
          followingCount: u.followingCount || 0,
          location: u.location || '',
          joinedDate: u.joinedDate,
          verifiedCreator: Boolean(u.verifiedCreator)
        });
        await user.save();
      }
      report.users = dbData.users.length;
    }

    // 2. Publicações (Posts)
    if (Array.isArray(dbData.posts) && dbData.posts.length > 0) {
      await Post.insertMany(dbData.posts.map(p => ({
        id: p.id,
        authorId: p.authorId,
        authorSnapshot: p.authorSnapshot,
        title: p.title,
        content: p.content,
        category: p.category || 'Vestuário',
        image: p.image || '',
        likesCount: p.likesCount || 0,
        isLiked: Boolean(p.isLiked),
        commentsCount: p.commentsCount || 0,
        timeAgo: p.timeAgo || 'Recente',
        moderationStatus: p.moderationStatus || 'active'
      })));
      report.posts = dbData.posts.length;
    }

    // 3. Comentários
    if (Array.isArray(dbData.comments) && dbData.comments.length > 0) {
      await Comment.insertMany(dbData.comments);
      report.comments = dbData.comments.length;
    }

    // 4. Stories
    if (Array.isArray(dbData.stories) && dbData.stories.length > 0) {
      await Story.insertMany(dbData.stories);
      report.stories = dbData.stories.length;
    }

    // 5. Vídeo-aulas
    if (Array.isArray(dbData.videoLessons) && dbData.videoLessons.length > 0) {
      await VideoLesson.insertMany(dbData.videoLessons);
      report.videoLessons = dbData.videoLessons.length;
    }

    // 6. Materiais Gratuitos
    if (Array.isArray(dbData.materials) && dbData.materials.length > 0) {
      await Material.insertMany(dbData.materials);
      report.materials = dbData.materials.length;
    }

    // 7. Compras
    if (Array.isArray(dbData.purchases) && dbData.purchases.length > 0) {
      await Purchase.insertMany(dbData.purchases);
      report.purchases = dbData.purchases.length;
    }

    // 8. Vendas
    if (Array.isArray(dbData.sales) && dbData.sales.length > 0) {
      await Sale.insertMany(dbData.sales);
      report.sales = dbData.sales.length;
    }

    // 9. Conversas
    if (Array.isArray(dbData.conversations) && dbData.conversations.length > 0) {
      await Conversation.insertMany(dbData.conversations);
      report.conversations = dbData.conversations.length;
    }

    // 10. Mensagens
    if (Array.isArray(dbData.messages) && dbData.messages.length > 0) {
      await Message.insertMany(dbData.messages);
      report.messages = dbData.messages.length;
    }

    // 11. Dashboard / Denúncias Administrativas
    if (dbData.adminDashboard) {
      const adminDash = new AdminDashboard({
        id: 'main-dashboard',
        ...dbData.adminDashboard
      });
      await adminDash.save();
      report.adminDashboard = 1;
    }

    console.log('[Seeder] Migração finalizada com sucesso! Relatório de entidades migradas:');
    for (const [key, count] of Object.entries(report)) {
      console.log(` - ${key}: ${count} registros`);
    }

    return report;
  }
};
