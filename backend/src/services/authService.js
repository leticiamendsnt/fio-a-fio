import { User } from '../models/User.js';
import { generateId } from '../utils/helpers.js';
import { generateToken } from '../utils/jwt.js';

export const authService = {
  async register({ name, username, email, password, role, isCreator, avatar, bio, location }) {
    if (!email || !password || !name) {
      throw new Error('Nome, e-mail e senha são obrigatórios.');
    }

    const cleanEmail = email.toLowerCase().trim();
    const cleanUsername = (username || email.split('@')[0]).toLowerCase().trim();

    const existingUser = await User.findOne({
      $or: [{ email: cleanEmail }, { username: cleanUsername }]
    });

    if (existingUser) {
      const field = existingUser.email === cleanEmail ? 'E-mail' : 'Nome de usuário';
      const error = new Error(`${field} já cadastrado no sistema.`);
      error.statusCode = 409;
      throw error;
    }

    const assignedRole = role || (isCreator ? 'creator' : 'user');
    const customId = generateId('usr');

    const newUser = new User({
      id: customId,
      name: name.trim(),
      username: cleanUsername,
      email: cleanEmail,
      password, // O hash é feito automaticamente pelo pre('save') do schema
      role: assignedRole,
      avatar: avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
      bio: bio || '',
      location: location || '',
      verifiedCreator: assignedRole === 'creator'
    });

    await newUser.save();

    const token = generateToken({
      id: newUser.id,
      email: newUser.email,
      role: newUser.role
    });

    return {
      user: newUser.toJSON(),
      token
    };
  },

  async login({ email, password }) {
    if (!email || !password) {
      const error = new Error('E-mail e senha são obrigatórios.');
      error.statusCode = 400;
      throw error;
    }

    const cleanEmail = email.toLowerCase().trim();
    const user = await User.findOne({
      $or: [{ email: cleanEmail }, { username: cleanEmail }]
    });

    if (!user) {
      const error = new Error('Credenciais inválidas. Usuário não encontrado.');
      error.statusCode = 401;
      throw error;
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      const error = new Error('Credenciais inválidas. Senha incorreta.');
      error.statusCode = 401;
      throw error;
    }

    const token = generateToken({
      id: user.id,
      email: user.email,
      role: user.role
    });

    return {
      user: user.toJSON(),
      token
    };
  }
};
