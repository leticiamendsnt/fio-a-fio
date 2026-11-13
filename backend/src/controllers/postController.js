import { Post } from '../models/Post.js';
import { User } from '../models/User.js';
import { Comment } from '../models/Comment.js';
import { findByIdOrCustomId, updateByIdOrCustomId, deleteByIdOrCustomId, generateId } from '../utils/helpers.js';

export const getPosts = async (req, res, next) => {
  try {
    const { category, authorId, includeRemoved, q } = req.query;
    const filter = {};

    if (!includeRemoved || includeRemoved === 'false') {
      filter.moderationStatus = { $nin: ['removed', 'pending'] };
    }

    if (category && category !== 'Todas') {
      filter.category = category;
    }

    if (authorId) {
      filter.authorId = authorId;
    }

    if (q) {
      filter.$or = [
        { title: { $regex: q, $options: 'i' } },
        { content: { $regex: q, $options: 'i' } }
      ];
    }

    const posts = await Post.find(filter).sort({ createdAt: -1 }).exec();
    res.status(200).json(posts.map(p => p.toJSON()));
  } catch (error) {
    next(error);
  }
};

export const getPostById = async (req, res, next) => {
  try {
    const post = await findByIdOrCustomId(Post, req.params.id);
    if (!post) {
      return res.status(404).json({ error: 'Publicação não encontrada' });
    }
    res.status(200).json(post.toJSON());
  } catch (error) {
    next(error);
  }
};

export const createPost = async (req, res, next) => {
  try {
    const data = { ...req.body };
    if (!data.id) {
      data.id = generateId('post');
    }

    // Se temos autor logado ou informado, popula snapshot do autor
    const authorId = data.authorId || req.user?.id || 'usr-1';
    data.authorId = authorId;

    if (!data.authorSnapshot) {
      const author = await findByIdOrCustomId(User, authorId);
      if (author) {
        data.authorSnapshot = {
          name: author.name,
          username: author.username,
          avatar: author.avatar,
          verified: Boolean(author.verifiedCreator)
        };
      }
    }

    const post = new Post(data);
    await post.save();
    res.status(201).json(post.toJSON());
  } catch (error) {
    next(error);
  }
};

export const updatePost = async (req, res, next) => {
  try {
    const updated = await updateByIdOrCustomId(Post, req.params.id, req.body, { new: true, runValidators: true });
    if (!updated) {
      return res.status(404).json({ error: 'Publicação não encontrada' });
    }
    res.status(200).json(updated.toJSON());
  } catch (error) {
    next(error);
  }
};

export const deletePost = async (req, res, next) => {
  try {
    const deleted = await deleteByIdOrCustomId(Post, req.params.id);
    if (!deleted) {
      return res.status(404).json({ error: 'Publicação não encontrada' });
    }

    // Também limpa os comentários associados
    await Comment.deleteMany({ postId: req.params.id });

    res.status(200).json({ message: 'Publicação removida com sucesso', id: req.params.id });
  } catch (error) {
    next(error);
  }
};

export const toggleLikePost = async (req, res, next) => {
  try {
    const post = await findByIdOrCustomId(Post, req.params.id);
    if (!post) {
      return res.status(404).json({ error: 'Publicação não encontrada' });
    }

    const userId = req.user?.id || req.body.userId || 'usr-1';
    const hasLiked = post.likedBy?.includes(userId) || false;

    if (hasLiked) {
      post.likedBy = post.likedBy.filter(id => id !== userId);
      post.likesCount = Math.max(0, post.likesCount - 1);
      post.isLiked = false;
    } else {
      if (!post.likedBy) post.likedBy = [];
      post.likedBy.push(userId);
      post.likesCount += 1;
      post.isLiked = true;
    }

    await post.save();
    res.status(200).json(post.toJSON());
  } catch (error) {
    next(error);
  }
};
