import { z } from 'zod';

export const registerSchema = z.object({
  name: z.string({ required_error: 'Nome é obrigatório.' }).min(2, 'O nome deve ter pelo menos 2 caracteres.').trim(),
  username: z
    .string()
    .min(3, 'O nome de usuário deve ter pelo menos 3 caracteres.')
    .regex(/^[a-zA-Z0-9_.-]+$/, 'Apenas letras, números, traço, ponto e underline.')
    .trim()
    .optional(),
  email: z.string({ required_error: 'E-mail é obrigatório.' }).email('Formato de e-mail inválido.').trim().toLowerCase(),
  password: z.string({ required_error: 'Senha é obrigatória.' }).min(4, 'A senha deve ter pelo menos 4 caracteres.'),
  role: z.enum(['user', 'creator', 'admin', 'guest']).optional(),
  isCreator: z.boolean().optional(),
  avatar: z.string().optional(),
  bio: z.string().optional(),
  location: z.string().optional()
});

export const loginSchema = z.object({
  email: z.string({ required_error: 'E-mail é obrigatório.' }).min(1, 'E-mail é obrigatório.').trim(),
  password: z.string({ required_error: 'Senha é obrigatória.' }).min(1, 'Senha é obrigatória.')
});
