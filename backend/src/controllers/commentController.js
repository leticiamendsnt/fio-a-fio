import { Comment } from '../models/Comment.js';
import { Post } from '../models/Post.js';
import { User } from '../models/User.js';
import { findByIdOrCustomId, deleteByIdOrCustomId, generateId } from '../utils/helpers.js';

export const getComments = async (req, res, next) => {
  try {
    const { postId } = req.query;
    const filter = postId ? { postId } : {};
    const comments = await Comment.find(filter).sort({ createdAt: 1 }).exec();
    res.status(200).json(comments.map(c => c.toJSON()));
  } catch (error) {
    next(error);
  }
};

export const createComment = async (req, res, next) => {
  try {
    const data = { ...req.body };
    if (!data.id) {
      data.id = generateId('c');
    }

    const authorId = data.authorId || req.user?.id || 'usr-1';
    data.authorId = authorId;

    if (!data.authorSnapshot) {
      const author = await findByIdOrCustomId(User, authorId);
      if (author) {
        data.authorSnapshot = {
          name: author.name,
          username: author.username,
          avatar: author.avatar
        };
      }
    }

    const comment = new Comment(data);
    await comment.save();

    // Atualiza contagem de comentários no post
    if (data.postId) {
      await Post.updateOne({ id: data.postId }, { $inc: { commentsCount: 1 } });
    }

    res.status(201).json(comment.toJSON());
  } catch (error) {
    next(error);
  }
};

export const deleteComment = async (req, res, next) => {
  try {
    const deleted = await deleteByIdOrCustomId(Comment, req.params.id);
    if (!deleted) {
      return res.status(404).json({ error: 'Comentário não encontrado' });
    }

    if (deleted.postId) {
      await Post.updateOne({ id: deleted.postId }, { $inc: { commentsCount: -1 } });
    }

    res.status(200).json({ message: 'Comentário removido com sucesso', id: req.params.id });
  } catch (error) {
    next(error);
  }
};
