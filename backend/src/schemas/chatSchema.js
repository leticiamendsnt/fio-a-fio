import { z } from 'zod';

export const createConversationSchema = z.object({
  id: z.string().optional(),
  participantIds: z.array(z.string()).min(1, 'A conversa deve conter pelo menos 1 participante.'),
  lastMessage: z.union([z.string(), z.record(z.any())]).optional(),
  lastMessageTime: z.string().optional(),
  unreadCount: z.number().optional()
});

export const updateConversationSchema = z.object({
  lastMessage: z.union([z.string(), z.record(z.any())]).optional(),
  lastMessageTime: z.string().optional(),
  unreadCount: z.number().optional(),
  participantIds: z.array(z.string()).optional()
});

export const createMessageSchema = z.object({
  id: z.string().optional(),
  conversationId: z.string({ required_error: 'ID da conversa é obrigatório.' }).min(1, 'ID da conversa é obrigatório.'),
  text: z.string({ required_error: 'O texto da mensagem é obrigatório.' }).min(1, 'A mensagem não pode ser vazia.').trim(),
  senderId: z.string().optional(),
  time: z.string().optional(),
  timestamp: z.string().optional(),
  read: z.boolean().optional(),
  isOwn: z.boolean().optional()
});
