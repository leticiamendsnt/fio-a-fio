import { z } from 'zod';

export const createUserSchema = z.object({
  id: z.string().optional(),
  name: z.string({ required_error: 'Nome é obrigatório.' }).min(2, 'O nome deve ter pelo menos 2 caracteres.').trim(),
  username: z
    .string()
    .min(3, 'O nome de usuário deve ter pelo menos 3 caracteres.')
    .regex(/^[a-zA-Z0-9_.-]+$/, 'Apenas letras, números, traço, ponto e underline.')
    .trim()
    .optional(),
  email: z.string({ required_error: 'E-mail é obrigatório.' }).email('Formato de e-mail inválido.').trim().toLowerCase(),
  password: z.string().min(4, 'A senha deve ter pelo menos 4 caracteres.').optional(),
  role: z.enum(['user', 'creator', 'admin', 'guest']).optional(),
  avatar: z.string().optional(),
  bio: z.string().optional(),
  location: z.string().optional(),
  status: z.string().optional(),
  isSuspended: z.boolean().optional(),
  suspendedAt: z.union([z.string(), z.date(), z.null()]).optional(),
  verifiedCreator: z.boolean().optional()
});

export const updateUserSchema = z.object({
  name: z.string().min(2, 'O nome deve ter pelo menos 2 caracteres.').trim().optional(),
  username: z
    .string()
    .min(3, 'O nome de usuário deve ter pelo menos 3 caracteres.')
    .regex(/^[a-zA-Z0-9_.-]+$/, 'Apenas letras, números, traço, ponto e underline.')
    .trim()
    .optional(),
  email: z.string().email('Formato de e-mail inválido.').trim().toLowerCase().optional(),
  password: z.string().min(4, 'A senha deve ter pelo menos 4 caracteres.').optional(),
  role: z.enum(['user', 'creator', 'admin', 'guest']).optional(),
  avatar: z.string().optional(),
  bio: z.string().optional(),
  location: z.string().optional(),
  status: z.string().optional(),
  isSuspended: z.boolean().optional(),
  suspendedAt: z.union([z.string(), z.date(), z.null()]).optional(),
  verifiedCreator: z.boolean().optional()
});
