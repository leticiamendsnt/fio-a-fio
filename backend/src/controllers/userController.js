import { User } from '../models/User.js';
import { findByIdOrCustomId, updateByIdOrCustomId, deleteByIdOrCustomId, generateId } from '../utils/helpers.js';

export const getUsers = async (req, res, next) => {
  try {
    const { role, q } = req.query;
    const filter = {};

    if (role) {
      filter.role = role;
    }

    if (q) {
      filter.$or = [
        { name: { $regex: q, $options: 'i' } },
        { username: { $regex: q, $options: 'i' } },
        { email: { $regex: q, $options: 'i' } }
      ];
    }

    const users = await User.find(filter).sort({ createdAt: -1 }).exec();
    res.status(200).json(users.map(u => u.toJSON()));
  } catch (error) {
    next(error);
  }
};

export const getUserById = async (req, res, next) => {
  try {
    const user = await findByIdOrCustomId(User, req.params.id);
    if (!user) {
      return res.status(404).json({ error: 'Usuário não encontrado' });
    }
    res.status(200).json(user.toJSON());
  } catch (error) {
    next(error);
  }
};

export const createUser = async (req, res, next) => {
  try {
    const data = { ...req.body };
    if (!data.id) {
      data.id = generateId('usr');
    }
    const user = new User(data);
    await user.save();
    res.status(201).json(user.toJSON());
  } catch (error) {
    next(error);
  }
};

export const updateUser = async (req, res, next) => {
  try {
    const updated = await updateByIdOrCustomId(User, req.params.id, req.body, { new: true, runValidators: true });
    if (!updated) {
      return res.status(404).json({ error: 'Usuário não encontrado' });
    }
    res.status(200).json(updated.toJSON());
  } catch (error) {
    next(error);
  }
};

export const deleteUser = async (req, res, next) => {
  try {
    const deleted = await deleteByIdOrCustomId(User, req.params.id);
    if (!deleted) {
      return res.status(404).json({ error: 'Usuário não encontrado' });
    }
    res.status(200).json({ message: 'Usuário removido com sucesso', id: req.params.id });
  } catch (error) {
    next(error);
  }
};

export const toggleFollow = async (req, res, next) => {
  try {
    const targetUserId = req.params.id;
    const currentUserId = req.user?.id || req.body.currentUserId;

    if (!currentUserId) {
      return res.status(400).json({ error: 'ID do usuário seguidor é obrigatório' });
    }

    const targetUser = await findByIdOrCustomId(User, targetUserId);
    const currentUser = await findByIdOrCustomId(User, currentUserId);

    if (!targetUser || !currentUser) {
      return res.status(404).json({ error: 'Usuário não encontrado' });
    }

    const isFollowing = currentUser.following.includes(targetUser.id);

    if (isFollowing) {
      currentUser.following = currentUser.following.filter(id => id !== targetUser.id);
      currentUser.followingCount = Math.max(0, currentUser.followingCount - 1);

      targetUser.followers = targetUser.followers.filter(id => id !== currentUser.id);
      targetUser.followersCount = Math.max(0, targetUser.followersCount - 1);
    } else {
      currentUser.following.push(targetUser.id);
      currentUser.followingCount += 1;

      targetUser.followers.push(currentUser.id);
      targetUser.followersCount += 1;
    }

    await currentUser.save();
    await targetUser.save();

    res.status(200).json({
      isFollowing: !isFollowing,
      followersCount: targetUser.followersCount
    });
  } catch (error) {
    next(error);
  }
};
