const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';

const request = async (path, options) => {
  const token = typeof window !== 'undefined' ? localStorage.getItem('fioafio_token') : null;
  const userId = typeof window !== 'undefined' ? localStorage.getItem('fioafio_userId') : null;
  const authHeaders = {};
  if (token) authHeaders['Authorization'] = `Bearer ${token}`;
  if (userId) authHeaders['x-user-id'] = userId;

  const response = await fetch(`${API_BASE_URL}${path}`, {
    headers: { 'Content-Type': 'application/json', ...authHeaders, ...options?.headers },
    ...options,
  });

  if (!response.ok) {
    throw new Error(`Falha na API (${response.status}) ao acessar ${path}`);
  }

  return response.status === 204 ? null : response.json();
};

const get = (resource) => request(`/${resource}`);
export const getById = (resource, id) => request(`/${resource}/${id}`);
export const createRecord = (resource, data) => request(`/${resource}`, { method: 'POST', body: JSON.stringify(data) });
export const updateRecord = (resource, id, data) => request(`/${resource}/${id}`, { method: 'PATCH', body: JSON.stringify(data) });
export const deleteRecord = (resource, id) => request(`/${resource}/${id}`, { method: 'DELETE' });

export const loginApi = async (email, password) => {
  try {
    const data = await request('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email: email.trim(), password }),
    });
    if (data?.token) {
      localStorage.setItem('fioafio_token', data.token);
    }
    if (data?.user?.id) {
      localStorage.setItem('fioafio_userId', data.user.id);
    }
    return data;
  } catch (err) {
    // Fallback caso a API esteja em modo JSON Server legada
    const users = await getUsers();
    const user = users.find(
      (item) => item.email?.toLowerCase() === email.trim().toLowerCase() && (item.password ? item.password === password : false)
    );
    if (!user) {
      throw new Error(err.message || 'E-mail ou senha inválidos.');
    }
    if (user.isSuspended) {
      throw new Error('Esta conta está suspensa. Entre em contato com a equipe Fio a Fio.');
    }
    return { user };
  }
};

export const registerApi = async (userData) => {
  try {
    const data = await request('/auth/register', {
      method: 'POST',
      body: JSON.stringify(userData),
    });
    if (data?.token) {
      localStorage.setItem('fioafio_token', data.token);
    }
    if (data?.user?.id) {
      localStorage.setItem('fioafio_userId', data.user.id);
    }
    return data;
  } catch (err) {
    // Fallback para JSON Server legado
    const createdUser = await createRecord('users', userData);
    return { user: createdUser };
  }
};

export const likePost = async (postId, userId) => {
  try {
    return await request(`/posts/${postId}/like`, {
      method: 'POST',
      body: JSON.stringify({ userId }),
    });
  } catch (err) {
    // Fallback gracioso para compatibilidade com JSON Server caso não seja o backend Express
    return await request(`/posts/${postId}`, {
      method: 'PATCH',
      body: JSON.stringify({ isLiked: true }),
    });
  }
};

export const toggleFollowUser = async (targetUserId, currentUserId) => {
  return await request(`/users/${targetUserId}/follow`, {
    method: 'POST',
    body: JSON.stringify({ currentUserId }),
  });
};

export const getUsers = () => get('users');
export const getPosts = async ({ includeRemoved = false } = {}) => {
  const [posts, comments, users] = await Promise.all([get('posts'), get('comments'), getUsers()]);
  const userById = new Map(users.map(user => [user.id, user]));

  return posts
    .filter(post => includeRemoved || !['removed', 'pending'].includes(post.moderationStatus))
    .map(post => ({
      ...post,
      author: {
        ...(userById.get(post.authorId) || post.authorSnapshot),
        verified: Boolean(userById.get(post.authorId)?.verifiedCreator || post.authorSnapshot?.verified),
      },
      comments: comments.filter(comment => comment.postId === post.id).map(comment => ({
        ...comment,
        author: userById.get(comment.authorId) || comment.authorSnapshot,
      })),
    }));
};

export const getStories = async () => {
  const [stories, users] = await Promise.all([get('stories'), getUsers()]);
  const userById = new Map(users.map(user => [user.id, user]));

  return stories.map(story => {
    const author = userById.get(story.authorId);
    return {
      ...story,
      authorName: author?.name || story.authorNameSnapshot,
      avatar: author?.avatar || story.avatarSnapshot,
    };
  });
};

export const getConversations = async () => {
  const [conversations, messages, users] = await Promise.all([get('conversations'), get('messages'), getUsers()]);
  const userById = new Map(users.map(user => [user.id, user]));

  return conversations.map(conversation => {
    const conversationMessages = messages.filter(message => message.conversationId === conversation.id);
    const lastMessage = conversationMessages.at(-1);
    return {
      ...conversation,
      participants: conversation.participantIds.map(id => userById.get(id)).filter(Boolean),
      messages: conversationMessages,
      lastMessage: lastMessage ? {
        text: lastMessage.text,
        timestamp: lastMessage.timestamp,
        senderId: lastMessage.senderId,
        read: lastMessage.read ?? true,
      } : null,
    };
  });
};

export const getMaterials = () => get('materials');
export const getVideoLessons = async () => {
  const [lessons, users] = await Promise.all([get('videoLessons'), getUsers()]);
  const userById = new Map(users.map(user => [user.id, user]));

  return lessons.map(({ creatorId, creatorBio, ...lesson }) => ({
    ...lesson,
    creator: {
      ...userById.get(creatorId),
      bio: creatorBio || userById.get(creatorId)?.bio,
    },
  }));
};

export const getPurchases = async () => {
  const [purchases, lessons] = await Promise.all([get('purchases'), getVideoLessons()]);
  const lessonById = new Map(lessons.map(lesson => [lesson.id, lesson]));

  return purchases.map(({ lessonId, lessonProgressPercent, ...purchase }) => ({
    ...purchase,
    lesson: { ...lessonById.get(lessonId), progressPercent: lessonProgressPercent },
  }));
};

export const getSalesReport = async () => {
  const [summary, recentSales] = await Promise.all([get('salesSummary'), get('sales')]);
  return { ...summary, recentSales };
};

export const getAdminDashboard = () => get('adminDashboard');
