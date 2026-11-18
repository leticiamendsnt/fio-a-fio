import { VideoLesson } from '../models/VideoLesson.js';
import { User } from '../models/User.js';
import { Review } from '../models/Review.js';
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

/**
 * Registra uma nova avaliação (Review) para a vídeo-aula no MongoDB
 * e recalcula a média geral de estrelas da aula.
 */
export const createLessonReview = async (req, res, next) => {
  try {
    const lesson = await findByIdOrCustomId(VideoLesson, req.params.id);
    if (!lesson) {
      return res.status(404).json({ error: 'Vídeo-aula não encontrada' });
    }

    const userId = req.user?.id || req.body.userId || 'usr-1';
    let userName = req.user?.name || req.body.userName;
    let userAvatar = req.user?.avatar || req.body.userAvatar;

    if (!userName) {
      const userDoc = await findByIdOrCustomId(User, userId);
      if (userDoc) {
        userName = userDoc.name;
        userAvatar = userDoc.avatar;
      }
    }

    const reviewId = generateId('rev');
    const newReview = new Review({
      id: reviewId,
      lessonId: lesson.id,
      userId,
      userName: userName || 'Aluna Fio a Fio',
      userAvatar: userAvatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
      rating: Number(req.body.rating),
      comment: req.body.comment.trim()
    });

    await newReview.save();

    // Recalcula a média real de avaliações da vídeo-aula
    const allReviews = await Review.find({ lessonId: lesson.id }).exec();
    const totalRating = allReviews.reduce((sum, r) => sum + Number(r.rating || 0), 0);
    const avgRating = allReviews.length > 0 ? Number((totalRating / allReviews.length).toFixed(1)) : 5.0;

    lesson.rating = avgRating;
    lesson.reviewsCount = allReviews.length;
    await lesson.save();

    res.status(201).json({
      message: 'Avaliação registrada com sucesso no banco de dados!',
      review: newReview.toJSON(),
      updatedRating: lesson.rating,
      reviewsCount: lesson.reviewsCount
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Retorna todas as avaliações registradas no banco para uma vídeo-aula
 */
export const getLessonReviews = async (req, res, next) => {
  try {
    const lesson = await findByIdOrCustomId(VideoLesson, req.params.id);
    if (!lesson) {
      return res.status(404).json({ error: 'Vídeo-aula não encontrada' });
    }

    const reviews = await Review.find({ lessonId: lesson.id }).sort({ createdAt: -1 }).exec();
    res.status(200).json(reviews.map(r => r.toJSON()));
  } catch (error) {
    next(error);
  }
};
