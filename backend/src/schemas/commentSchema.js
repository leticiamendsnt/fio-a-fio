import { z } from 'zod';

export const createCommentSchema = z.object({
  id: z.string().optional(),
  postId: z.string({ required_error: 'ID da publicação é obrigatório.' }).min(1, 'ID da publicação é obrigatório.'),
  text: z.string({ required_error: 'O comentário é obrigatório.' }).min(1, 'O comentário não pode ser vazio.').trim(),
  authorId: z.string().optional(),
  authorSnapshot: z
    .object({
      name: z.string().optional(),
      username: z.string().optional(),
      avatar: z.string().optional()
    })
    .optional()
});
