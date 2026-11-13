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

export const conversationRouter = Router();
conversationRouter.get('/', getConversations);
conversationRouter.post('/', optionalAuth, createConversation);
conversationRouter.patch('/:id', optionalAuth, updateConversation);
conversationRouter.put('/:id', optionalAuth, updateConversation);

export const messageRouter = Router();
messageRouter.get('/', getMessages);
messageRouter.post('/', optionalAuth, createMessage);
messageRouter.patch('/:id', optionalAuth, updateMessage);
messageRouter.put('/:id', optionalAuth, updateMessage);
