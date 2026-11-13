import { Story } from '../models/Story.js';
import { User } from '../models/User.js';
import { findByIdOrCustomId, deleteByIdOrCustomId, generateId } from '../utils/helpers.js';

export const getStories = async (req, res, next) => {
  try {
    // Retorna stories que ainda não expiraram
    const stories = await Story.find().sort({ createdAt: -1 }).exec();
    res.status(200).json(stories.map(s => s.toJSON()));
  } catch (error) {
    next(error);
  }
};

export const createStory = async (req, res, next) => {
  try {
    const data = { ...req.body };
    if (!data.id) {
      data.id = generateId('story');
    }

    const authorId = data.authorId || req.user?.id || 'usr-1';
    data.authorId = authorId;

    if (!data.authorNameSnapshot || !data.avatarSnapshot) {
      const author = await findByIdOrCustomId(User, authorId);
      if (author) {
        data.authorNameSnapshot = author.name;
        data.avatarSnapshot = author.avatar;
      }
    }

    const story = new Story(data);
    await story.save();
    res.status(201).json(story.toJSON());
  } catch (error) {
    next(error);
  }
};

export const deleteStory = async (req, res, next) => {
  try {
    const deleted = await deleteByIdOrCustomId(Story, req.params.id);
    if (!deleted) {
      return res.status(404).json({ error: 'Story não encontrado' });
    }
    res.status(200).json({ message: 'Story removido com sucesso', id: req.params.id });
  } catch (error) {
    next(error);
  }
};
