import { z } from 'zod';

export const createVideoLessonSchema = z.object({
  id: z.string().optional(),
  title: z.string({ required_error: 'O título é obrigatório.' }).min(3, 'O título deve ter pelo menos 3 caracteres.').trim(),
  subtitle: z.string().min(3, 'O subtítulo deve ter pelo menos 3 caracteres.').trim().optional().or(z.literal('')),
  category: z.string({ required_error: 'A categoria é obrigatória.' }).min(1, 'Selecione uma categoria.'),
  price: z.coerce.number({ required_error: 'O preço é obrigatório.' }).min(0, 'O preço deve ser maior ou igual a zero.'),
  level: z.string().optional().default('Iniciante'),
  duration: z.string().optional().default('1h 30min'),
  description: z.string({ required_error: 'A descrição é obrigatória.' }).min(5, 'A descrição deve ter pelo menos 5 caracteres.').trim(),
  thumbnail: z.string().optional(),
  videoUrl: z.string().optional(),
  creatorId: z.string().optional(),
  creatorBio: z.string().optional(),
  modules: z
    .array(
      z.object({
        title: z.string(),
        lessons: z
          .array(
            z.object({
              id: z.string().optional(),
              title: z.string(),
              duration: z.string().optional(),
              videoUrl: z.string().optional()
            })
          )
          .optional()
      })
    )
    .optional()
});

export const updateVideoLessonSchema = z.object({
  title: z.string().min(3, 'O título deve ter pelo menos 3 caracteres.').trim().optional(),
  subtitle: z.string().trim().optional(),
  category: z.string().optional(),
  price: z.coerce.number().min(0, 'O preço deve ser maior ou igual a zero.').optional(),
  level: z.string().optional(),
  duration: z.string().optional(),
  description: z.string().min(5, 'A descrição deve ter pelo menos 5 caracteres.').trim().optional(),
  thumbnail: z.string().optional(),
  videoUrl: z.string().optional(),
  isActive: z.boolean().optional()
});
