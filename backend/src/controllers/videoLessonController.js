import { VideoLesson } from '../models/VideoLesson.js';
import { User } from '../models/User.js';
import { findByIdOrCustomId, updateByIdOrCustomId, deleteByIdOrCustomId, generateId } from '../utils/helpers.js';

export const getVideoLessons = async (req, res, next) => {
  try {
    const { category, level, creatorId, q } = req.query;
    const filter = {};

    if (category && category !== 'Todas') {
      filter.category = category;
    }

    if (level && level !== 'Todos') {
      filter.level = level;
    }

    if (creatorId) {
      filter.creatorId = creatorId;
    }

    if (q) {
      filter.$or = [
        { title: { $regex: q, $options: 'i' } },
        { subtitle: { $regex: q, $options: 'i' } },
        { description: { $regex: q, $options: 'i' } }
      ];
    }

    const lessons = await VideoLesson.find(filter).sort({ createdAt: -1 }).exec();
    res.status(200).json(lessons.map(v => v.toJSON()));
  } catch (error) {
    next(error);
  }
};

export const getVideoLessonById = async (req, res, next) => {
  try {
    const lesson = await findByIdOrCustomId(VideoLesson, req.params.id);
    if (!lesson) {
      return res.status(404).json({ error: 'Vídeo-aula não encontrada' });
    }
    res.status(200).json(lesson.toJSON());
  } catch (error) {
    next(error);
  }
};

export const createVideoLesson = async (req, res, next) => {
  try {
    const data = { ...req.body };
    if (!data.id) {
      data.id = generateId('aula');
    }

    const creatorId = data.creatorId || req.user?.id || 'usr-2';
    data.creatorId = creatorId;

    if (!data.creatorBio) {
      const creator = await findByIdOrCustomId(User, creatorId);
      if (creator) {
        data.creatorBio = creator.bio;
      }
    }

    const lesson = new VideoLesson(data);
    await lesson.save();
    res.status(201).json(lesson.toJSON());
  } catch (error) {
    next(error);
  }
};

export const updateVideoLesson = async (req, res, next) => {
  try {
    const updated = await updateByIdOrCustomId(VideoLesson, req.params.id, req.body, { new: true, runValidators: true });
    if (!updated) {
      return res.status(404).json({ error: 'Vídeo-aula não encontrada' });
    }
    res.status(200).json(updated.toJSON());
  } catch (error) {
    next(error);
  }
};

export const deleteVideoLesson = async (req, res, next) => {
  try {
    const deleted = await deleteByIdOrCustomId(VideoLesson, req.params.id);
    if (!deleted) {
      return res.status(404).json({ error: 'Vídeo-aula não encontrada' });
    }
    res.status(200).json({ message: 'Vídeo-aula removida com sucesso', id: req.params.id });
  } catch (error) {
    next(error);
  }
};
