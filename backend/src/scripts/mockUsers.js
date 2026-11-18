import { User } from '../models/User.js';

export const README_MOCK_USERS = [
  {
    id: 'usr-1',
    name: 'Ana Silva',
    username: 'anacroche',
    email: 'ana@fioafio.com',
    password: '1234',
    role: 'user',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    bio: 'Apaixonada por amigurumis e fios de algodão natural 🧶💫',
    followersCount: 142,
    followingCount: 89,
    location: 'São Paulo, SP',
    joinedDate: 'Março 2024',
    status: 'Ativo',
    isSuspended: false
  },
  {
    id: 'usr-2',
    name: 'Maria Bordadeira',
    username: 'mariabordadeira',
    email: 'maria@fioafio.com',
    password: '1234',
    role: 'creator',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80',
    bio: 'Professora de crochê com mais de 10 anos de experiência. Especialista em cardigans e vestuário.',
    followersCount: 3450,
    followingCount: 120,
    location: 'Belo Horizonte, MG',
    joinedDate: 'Janeiro 2023',
    verifiedCreator: true,
    status: 'Ativo',
    isSuspended: false
  },
  {
    id: 'usr-3',
    name: 'Júlia Crocheteira',
    username: 'juliacroche',
    email: 'julia@fioafio.com',
    password: '1234',
    role: 'user',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80',
    bio: 'Crocheteira nas horas vagas 🌸 Amante de mantas de sofás.',
    followersCount: 88,
    followingCount: 210,
    location: 'Curitiba, PR',
    joinedDate: 'Fevereiro 2024',
    status: 'Ativo',
    isSuspended: false
  },
  {
    id: 'usr-4',
    name: 'Admin Fio a Fio',
    username: 'admin',
    email: 'admin@fioafio.com',
    password: 'admin123',
    role: 'admin',
    avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80',
    bio: 'Conta oficial de moderação e administração da comunidade Fio a Fio.',
    followersCount: 10500,
    followingCount: 0,
    location: 'São Paulo, SP',
    joinedDate: 'Janeiro 2023',
    status: 'Ativo',
    isSuspended: false
  }
];

export const ensureMockUsersInDB = async () => {
  try {
    for (const userData of README_MOCK_USERS) {
      const existing = await User.findOne({ email: userData.email.toLowerCase() });
      if (!existing) {
        const user = new User(userData);
        await user.save();
        console.log(`[MongoDB] Usuário mock criado com sucesso: ${userData.email} (${userData.role})`);
      } else {
        // Se a senha estiver vazia ou incompatível, atualiza
        if (!existing.password) {
          existing.password = userData.password;
          await existing.save();
        }
      }
    }
  } catch (err) {
    console.warn('[MongoDB] Aviso ao verificar usuários mock no banco:', err.message);
  }
};
