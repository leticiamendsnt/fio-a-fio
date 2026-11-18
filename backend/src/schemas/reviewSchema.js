import { z } from 'zod';

export const createReviewSchema = z.object({
  rating: z.coerce
    .number({ required_error: 'A nota é obrigatória.' })
    .min(1, 'A nota deve ser de pelo menos 1 estrela.')
    .max(5, 'A nota máxima é de 5 estrelas.'),
  comment: z
    .string({ required_error: 'O comentário é obrigatório.' })
    .min(2, 'O comentário deve ter pelo menos 2 caracteres.')
    .trim(),
  userId: z.string().optional(),
  userName: z.string().optional(),
  userAvatar: z.string().optional()
});
