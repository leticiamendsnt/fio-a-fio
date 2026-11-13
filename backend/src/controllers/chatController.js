import { Conversation } from '../models/Conversation.js';
import { Message } from '../models/Message.js';
import { findByIdOrCustomId, updateByIdOrCustomId, generateId } from '../utils/helpers.js';

export const getConversations = async (req, res, next) => {
  try {
    const { userId } = req.query;
    const filter = userId ? { participantIds: userId } : {};
    const conversations = await Conversation.find(filter).sort({ updatedAt: -1 }).exec();
    res.status(200).json(conversations.map(c => c.toJSON()));
  } catch (error) {
    next(error);
  }
};

export const createConversation = async (req, res, next) => {
  try {
    const data = { ...req.body };
    if (!data.id) {
      data.id = generateId('conv');
    }
    const conversation = new Conversation(data);
    await conversation.save();
    res.status(201).json(conversation.toJSON());
  } catch (error) {
    next(error);
  }
};

export const updateConversation = async (req, res, next) => {
  try {
    const updated = await updateByIdOrCustomId(Conversation, req.params.id, req.body, { new: true });
    if (!updated) {
      return res.status(404).json({ error: 'Conversa não encontrada' });
    }
    res.status(200).json(updated.toJSON());
  } catch (error) {
    next(error);
  }
};

export const getMessages = async (req, res, next) => {
  try {
    const { conversationId } = req.query;
    const filter = conversationId ? { conversationId } : {};
    const messages = await Message.find(filter).sort({ createdAt: 1 }).exec();
    res.status(200).json(messages.map(m => m.toJSON()));
  } catch (error) {
    next(error);
  }
};

export const createMessage = async (req, res, next) => {
  try {
    const data = { ...req.body };
    if (!data.id) {
      data.id = generateId('msg');
    }
    const message = new Message(data);
    await message.save();

    // Atualiza updatedAt e lastMessage na conversa
    if (data.conversationId) {
      await updateByIdOrCustomId(Conversation, data.conversationId, {
        updatedAt: new Date()
      });
    }

    res.status(201).json(message.toJSON());
  } catch (error) {
    next(error);
  }
};

export const updateMessage = async (req, res, next) => {
  try {
    const updated = await updateByIdOrCustomId(Message, req.params.id, req.body, { new: true });
    if (!updated) {
      return res.status(404).json({ error: 'Mensagem não encontrada' });
    }
    res.status(200).json(updated.toJSON());
  } catch (error) {
    next(error);
  }
};
