import { z } from 'zod';

export const createMaterialSchema = z.object({
  id: z.string().optional(),
  title: z.string({ required_error: 'O título é obrigatório.' }).min(2, 'O título deve ter pelo menos 2 caracteres.').trim(),
  description: z.string().trim().optional().default(''),
  category: z.string().optional().default('Vestuário'),
  type: z.string().optional().default('PDF / Revista'),
  author: z.string().optional().default('Equipe Fio a Fio'),
  authorId: z.string().optional(),
  fileSize: z.string().optional().default('3.2 MB'),
  thumbnail: z.string().optional(),
  downloadUrl: z.string().optional().default('')
});

export const updateMaterialSchema = z.object({
  title: z.string().min(2, 'O título deve ter pelo menos 2 caracteres.').trim().optional(),
  description: z.string().trim().optional(),
  category: z.string().optional(),
  type: z.string().optional(),
  thumbnail: z.string().optional(),
  downloadUrl: z.string().optional()
});
