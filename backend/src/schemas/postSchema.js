import { z } from 'zod';

export const createPostSchema = z.object({
  id: z.string().optional(),
  title: z.string({ required_error: 'O título é obrigatório.' }).min(3, 'O título deve ter pelo menos 3 caracteres.').trim(),
  content: z.string({ required_error: 'O conteúdo é obrigatório.' }).min(5, 'O conteúdo deve ter pelo menos 5 caracteres.').trim(),
  category: z.string().optional().default('Dicas & Tutoriais'),
  image: z.string().optional().default(''),
  authorId: z.string().optional(),
  authorSnapshot: z
    .object({
      name: z.string().optional(),
      username: z.string().optional(),
      avatar: z.string().optional(),
      verified: z.boolean().optional()
    })
    .optional()
});

export const updatePostSchema = z.object({
  title: z.string().min(3, 'O título deve ter pelo menos 3 caracteres.').trim().optional(),
  content: z.string().min(5, 'O conteúdo deve ter pelo menos 5 caracteres.').trim().optional(),
  category: z.string().optional(),
  image: z.string().optional(),
  moderationStatus: z.enum(['approved', 'pending', 'removed']).optional()
});
