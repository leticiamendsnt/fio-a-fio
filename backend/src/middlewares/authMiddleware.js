import { verifyToken } from '../utils/jwt.js';
import { User } from '../models/User.js';
import { findByIdOrCustomId } from '../utils/helpers.js';
import { env } from '../config/env.js';

/**
 * Middleware para exigir autenticação via JWT ou header de desenvolvimento x-user-id.
 */
export const requireAuth = async (req, res, next) => {
  try {
    let token = null;
    const authHeader = req.headers.authorization;

    if (authHeader && authHeader.startsWith('Bearer ')) {
      token = authHeader.split(' ')[1];
    }

    if (token) {
      const decoded = verifyToken(token);
      if (decoded && decoded.id) {
        const user = await findByIdOrCustomId(User, decoded.id);
        if (user) {
          req.user = user;
          return next();
        }
      }
    }

    // Suporte a x-user-id exclusivamente em ambiente de desenvolvimento ou testes
    const isDevOrTest = ['development', 'test'].includes(env.NODE_ENV || 'development');
    const customUserId = req.headers['x-user-id'];
    if (isDevOrTest && customUserId) {
      const user = await findByIdOrCustomId(User, customUserId);
      if (user) {
        req.user = user;
        return next();
      }
    }

    return res.status(401).json({
      error: 'Não autorizado',
      message: 'Token de autenticação ausente ou inválido.'
    });
  } catch (error) {
    return next(error);
  }
};

/**
 * Middleware para anexar o usuário autenticado caso exista, sem bloquear visitantes.
 */
export const optionalAuth = async (req, res, next) => {
  try {
    let token = null;
    const authHeader = req.headers.authorization;

    if (authHeader && authHeader.startsWith('Bearer ')) {
      token = authHeader.split(' ')[1];
    }

    if (token) {
      const decoded = verifyToken(token);
      if (decoded && decoded.id) {
        const user = await findByIdOrCustomId(User, decoded.id);
        if (user) {
          req.user = user;
          return next();
        }
      }
    }

    // Em dev/test, permite também ler perfil associado via x-user-id se presente
    const isDevOrTest = ['development', 'test'].includes(env.NODE_ENV || 'development');
    const customUserId = req.headers['x-user-id'];
    if (isDevOrTest && customUserId) {
      const user = await findByIdOrCustomId(User, customUserId);
      if (user) {
        req.user = user;
      }
    }

    return next();
  } catch (error) {
    return next();
  }
};

/**
 * Middleware para restringir acesso por papel de usuário (role).
 */
export const requireRole = (...roles) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({ error: 'Não autorizado', message: 'Faça login para continuar.' });
    }

    if (!roles.includes(req.user.role)) {
      return res.status(403).json({
        error: 'Acesso negado',
        message: `Esta operação requer privilégios de: ${roles.join(' ou ')}.`
      });
    }

    next();
  };
};
