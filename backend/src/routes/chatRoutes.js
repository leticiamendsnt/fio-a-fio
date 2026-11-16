import { Router } from 'express';
import {
  getConversations,
  createConversation,
  updateConversation,
  getMessages,
  createMessage,
  updateMessage
} from '../controllers/chatController.js';
import { optionalAuth } from '../middlewares/authMiddleware.js';
import { validate } from '../middlewares/validate.js';
import {
  createConversationSchema,
  updateConversationSchema,
  createMessageSchema
} from '../schemas/chatSchema.js';

export const conversationRouter = Router();
conversationRouter.get('/', getConversations);
conversationRouter.post('/', optionalAuth, validate(createConversationSchema), createConversation);
conversationRouter.patch('/:id', optionalAuth, validate(updateConversationSchema), updateConversation);
conversationRouter.put('/:id', optionalAuth, validate(updateConversationSchema), updateConversation);

export const messageRouter = Router();
messageRouter.get('/', getMessages);
messageRouter.post('/', optionalAuth, validate(createMessageSchema), createMessage);
messageRouter.patch('/:id', optionalAuth, updateMessage);
messageRouter.put('/:id', optionalAuth, updateMessage);
