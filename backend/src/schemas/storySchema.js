import { z } from 'zod';

export const createStorySchema = z.object({
  id: z.string().optional(),
  mediaUrl: z.string({ required_error: 'URL da mídia é obrigatória.' }).min(1, 'URL da mídia é obrigatória.'),
  caption: z.string().trim().optional().default(''),
  authorId: z.string().nullable().optional(),
  authorNameSnapshot: z.string().optional(),
  avatarSnapshot: z.string().optional(),
  hasStory: z.boolean().optional(),
  hasUnseen: z.boolean().optional(),
  isOwn: z.boolean().optional(),
  createdAt: z.string().optional(),
  expiresAt: z.union([z.string(), z.date()]).optional()
});
