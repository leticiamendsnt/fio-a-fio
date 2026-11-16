import { z } from 'zod';

export const createPurchaseSchema = z.object({
  id: z.string().optional(),
  lessonId: z.string({ required_error: 'ID da aula é obrigatório.' }).min(1, 'ID da aula é obrigatório.'),
  userId: z.string().optional(),
  paymentMethod: z.string().optional().default('PIX'),
  amount: z.coerce.number().min(0).optional(),
  status: z.enum(['Concluído', 'Pendente', 'Cancelado']).optional(),
  lessonProgressPercent: z.number().min(0).max(100).optional(),
  date: z.string().optional()
});

export const updatePurchaseSchema = z.object({
  lessonProgressPercent: z.number().min(0).max(100).optional(),
  status: z.enum(['Concluído', 'Pendente', 'Cancelado']).optional()
});
