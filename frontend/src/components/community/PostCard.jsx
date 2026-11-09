import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardHeader, CardBody, CardFooter } from '../ui/Card';
import { Avatar } from '../ui/Avatar';
import { Button } from '../ui/Button';
import { Heart, MessageCircle, Share2, Edit3, Trash2 } from 'lucide-react';
import { PostCommentsModal } from './PostCommentsModal';
import { EditPostModal } from './EditPostModal';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateRecord, deleteRecord } from '../../services/api';
import { useRole } from '../../context/RoleContext';

export const PostCard = ({ post }) => {
  const queryClient = useQueryClient();
  const { currentUser, currentRole } = useRole();
  const [isLiked, setIsLiked] = useState(post.isLiked || false);
  const [likesCount, setLikesCount] = useState(post.likesCount || 0);
  const [isCommentsOpen, setIsCommentsOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [comments, setComments] = useState(post.comments || []);

  const isAuthor = Boolean(currentUser?.id && (currentUser.id === post.authorId || currentUser.id === post.author?.id));
  const canManage = isAuthor || currentRole === 'admin';

  const likeMutation = useMutation({
    mutationFn: async ({ nextIsLiked, nextLikesCount }) => {
      return await updateRecord('posts', post.id, { isLiked: nextIsLiked, likesCount: nextLikesCount });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['posts'] });
    },
  });

  const deletePostMutation = useMutation({
    mutationFn: async (id) => {
      return await deleteRecord('posts', id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['posts'] });
    },
    onError: () => {
      alert('Não foi possível excluir a publicação. Verifique o servidor local.');
    },
  });

  const toggleLike = () => {
    const nextIsLiked = !isLiked;
    const nextLikesCount = likesCount + (isLiked ? -1 : 1);
    setIsLiked(nextIsLiked);
    setLikesCount(nextLikesCount);
    likeMutation.mutate({ nextIsLiked, nextLikesCount });
  };

  const handleDelete = () => {
    if (!window.confirm('Tem certeza que deseja excluir esta publicação? Esta ação não pode ser desfeita.')) {
      return;
    }
    deletePostMutation.mutate(post.id);
  };

  const handleCommentAdded = (postId, updatedComments) => {
    setComments(updatedComments);
  };

  const currentPostWithComments = {
    ...post,
    comments: comments,
    commentsCount: comments.length,
    isLiked,
    likesCount,
  };

  const authorProfileLink = `/perfil?user=${post.author?.username || post.author?.id || ''}`;

  return (
    <>
      <Card className="mb-6 border-[#E8CCD4] hover:border-[#D98CA1] transition-all duration-300 shadow-craft bg-white">
        <CardHeader className="flex flex-wrap items-center justify-between gap-3 pb-2">
          <Link to={authorProfileLink} className="flex items-center gap-3 group hover:opacity-85 transition-opacity">
            <Avatar src={post.author?.avatar} alt={post.author?.name} size="md" className="border-2 border-[#D98CA1] group-hover:scale-105 transition-transform" />
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-extrabold text-sm text-[#251D20] group-hover:text-[#B94F70] transition-colors">
                  {post.author?.name}
                </span>
                {post.author?.verified && (
                  <span className="text-[10px] bg-[#F6DDE5] text-[#B94F70] px-2 py-0.5 rounded-full font-extrabold border border-[#D98CA1]">
                    Professora 🧶
                  </span>
                )}
              </div>
              <p className="text-[11px] font-medium text-[#715B62]">{post.timeAgo} • @{post.author?.username}</p>
            </div>
          </Link>

          <div className="flex items-center gap-2">
            {post.category && (
              <span className="max-w-full break-words text-center text-[11px] font-extrabold px-3 py-1 bg-[#F6DDE5] text-[#B94F70] rounded-full border border-[#D98CA1] shadow-2xs">
                {post.category}
              </span>
            )}

            {canManage && (
              <div className="flex items-center gap-1">
                <button
                  type="button"
                  onClick={() => setIsEditOpen(true)}
                  className="p-1.5 text-zinc-400 hover:text-[#B94F70] hover:bg-[#F6DDE5]/60 rounded-lg transition-colors"
                  title="Editar publicação"
                  aria-label="Editar publicação"
                >
                  <Edit3 size={15} />
                </button>
                <button
                  type="button"
                  onClick={handleDelete}
                  disabled={deletePostMutation.isPending}
                  className="p-1.5 text-zinc-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                  title="Excluir publicação"
                  aria-label="Excluir publicação"
                >
                  <Trash2 size={15} />
                </button>
              </div>
            )}
          </div>
        </CardHeader>

        <CardBody className="py-3.5 space-y-2.5">
          <h3
            className="break-words font-extrabold text-base text-[#251D20] leading-snug cursor-pointer hover:text-[#B94F70] transition-colors"
            onClick={() => setIsCommentsOpen(true)}
          >
            {post.title}
          </h3>
          <p className="break-words text-sm text-[#251D20]/85 leading-relaxed">{post.content}</p>
          {post.image && (
            <div
              className="rounded-2xl overflow-hidden border border-[#E8CCD4] my-3 cursor-pointer group shadow-2xs"
              onClick={() => setIsCommentsOpen(true)}
            >
              <img
                src={post.image}
                alt={post.title}
                className="w-full max-h-96 object-cover group-hover:scale-[1.01] transition-transform duration-300"
              />
            </div>
          )}
        </CardBody>

        <CardFooter className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-[#E8CCD4]">
          <div className="flex min-w-0 flex-wrap items-center gap-1 sm:gap-2">
            <Button
              variant={isLiked ? 'secondary' : 'ghost'}
              size="sm"
              onClick={toggleLike}
              disabled={likeMutation.isPending}
              className={isLiked ? 'text-[#B94F70] bg-[#F6DDE5] border-[#D98CA1] font-extrabold shadow-2xs' : 'text-[#715B62] hover:text-[#B94F70] hover:bg-[#F6DDE5]/50'}
            >
              <Heart size={16} className={isLiked ? 'fill-[#B94F70] text-[#B94F70]' : ''} />
              <span>{likesCount} Curtidas</span>
            </Button>

            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsCommentsOpen(true)}
              className="text-[#715B62] hover:text-[#B94F70] hover:bg-[#F6DDE5]/50"
            >
              <MessageCircle size={16} />
              <span>{comments.length} Comentários</span>
            </Button>
          </div>

          <div className="flex items-center gap-1">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => alert('Link copiado para compartilhamento!')}
              className="text-[#715B62] hover:text-[#B94F70] hover:bg-[#F6DDE5]/50"
              aria-label="Compartilhar publicação"
            >
              <Share2 size={16} />
            </Button>
          </div>
        </CardFooter>
      </Card>

      <PostCommentsModal
        isOpen={isCommentsOpen}
        onClose={() => setIsCommentsOpen(false)}
        post={currentPostWithComments}
        onCommentAdded={handleCommentAdded}
      />

      <EditPostModal
        isOpen={isEditOpen}
        onClose={() => setIsEditOpen(false)}
        post={post}
      />
    </>
  );
};
