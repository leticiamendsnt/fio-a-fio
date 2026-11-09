import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { X, Sparkles, MessageSquare, ImagePlus, Trash2 } from 'lucide-react';
import { Input } from '../ui/Input';
import { Button } from '../ui/Button';
import { useRole } from '../../context/RoleContext';
import { createRecord } from '../../services/api';

const postSchema = z.object({
  title: z.string().min(3, 'O título deve ter pelo menos 3 caracteres.'),
  category: z.string().min(1, 'Selecione uma categoria.'),
  content: z.string().min(5, 'O conteúdo deve ter pelo menos 5 caracteres.'),
});

export const CreatePostModal = ({ isOpen, onClose, onPostCreated }) => {
  const queryClient = useQueryClient();
  const { currentUser, currentRole } = useRole();
  const [image, setImage] = useState('');
  const [imageName, setImageName] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(postSchema),
    defaultValues: {
      title: '',
      category: 'Dicas & Tutoriais',
      content: '',
    },
  });

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      const previousOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
      return () => {
        document.body.style.overflow = previousOverflow;
        window.removeEventListener('keydown', handleKeyDown);
      };
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  const createPostMutation = useMutation({
    mutationFn: async (formData) => {
      return await createRecord('posts', {
        authorId: currentUser.id,
        moderationStatus: 'approved',
        title: formData.title.trim(),
        content: formData.content.trim(),
        ...(image ? { image, imageName } : {}),
        category: formData.category,
        likesCount: 0,
        isLiked: false,
        commentsCount: 0,
        timeAgo: 'Agora mesmo',
        createdAt: new Date().toISOString(),
      });
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['posts'] });
      setMessage('Publicação compartilhada com carinho no feed! 🧶✨');
      setTimeout(() => {
        if (onPostCreated) onPostCreated();
        reset();
        setImage('');
        setImageName('');
        setMessage('');
        setError('');
        onClose();
      }, 700);
    },
    onError: () => {
      setError('Não foi possível salvar a publicação. Verifique se o JSON Server está rodando.');
    },
  });

  if (!isOpen) return null;

  const handleImageChange = async (event) => {
    const file = event.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith('image/')) {
      setError('Selecione um arquivo de imagem válido.');
      event.target.value = '';
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      setError('A imagem deve ter no máximo 5 MB.');
      event.target.value = '';
      return;
    }
    let blob;
    try {
      const bitmap = await createImageBitmap(file);
      const canvas = document.createElement('canvas');
      let scale = Math.min(1, 1200 / Math.max(bitmap.width, bitmap.height));
      do {
        canvas.width = Math.round(bitmap.width * scale);
        canvas.height = Math.round(bitmap.height * scale);
        canvas.getContext('2d').drawImage(bitmap, 0, 0, canvas.width, canvas.height);
        blob = await new Promise((resolve) => canvas.toBlob(resolve, 'image/jpeg', 0.72));
        scale *= 0.82;
      } while (blob && blob.size > 55 * 1024 && scale > 0.2);
      bitmap.close();
    } catch {
      setError('Não foi possível processar essa imagem.');
      event.target.value = '';
      return;
    }
    if (!blob || blob.size > 55 * 1024) {
      setError('Esta imagem não pôde ser reduzida para o tamanho aceito. Tente outra foto.');
      event.target.value = '';
      return;
    }
    const reader = new FileReader();
    reader.onload = () => {
      setImage(String(reader.result));
      setImageName(file.name);
      setError('');
    };
    reader.onerror = () => setError('Não foi possível carregar essa imagem.');
    reader.readAsDataURL(blob);
  };

  const onSubmit = (data) => {
    if (currentRole === 'guest' || !currentUser?.id) {
      setError('Você precisa estar conectada para criar uma publicação.');
      return;
    }
    setError('');
    createPostMutation.mutate(data);
  };

  return (
    <div
      className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center sm:p-6 bg-slate-950/75 backdrop-blur-2xl backdrop-saturate-150 animate-fadeIn"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="relative w-full max-w-lg bg-white backdrop-blur-2xl rounded-t-3xl sm:rounded-3xl shadow-2xl border border-[#E8CCD4] overflow-hidden flex flex-col h-[min(92dvh,48rem)] sm:h-auto sm:max-h-[90dvh] animate-scaleUp">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#E8CCD4] bg-[#F8E9ED]/70">
          <div className="flex items-center gap-2">
            <Sparkles className="text-[#B94F70]" size={20} />
            <div>
              <h2 className="text-base font-black text-[#251D20]">Nova Publicação</h2>
              {currentUser?.name && (
                <p className="text-[11px] text-[#715B62]">Publicando como <b>{currentUser.name}</b></p>
              )}
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-[#715B62] hover:text-[#251D20] hover:bg-[#F6DDE5] rounded-full transition-colors"
            aria-label="Fechar"
          >
            <X size={18} />
          </button>
        </div>

        {/* Content Body */}
        <div className="min-h-0 flex-1 p-4 sm:p-6 overflow-y-auto overscroll-contain space-y-4">
          <p className="text-xs text-[#715B62]">
            Compartilhe dicas, dúvidas sobre pontos, receitas ou converse com outras crocheteiras da comunidade.
          </p>

          {message && (
            <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold rounded-2xl text-center animate-fadeIn">
              {message}
            </div>
          )}

          {error && (
            <div role="alert" className="p-3 bg-red-50 border border-red-200 text-red-700 text-xs font-bold rounded-2xl text-center">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
            <Input
              label="Título da Publicação"
              placeholder="Ex: Dúvida sobre quantidade de pontos para manta"
              error={errors.title?.message}
              {...register('title')}
            />

            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-[#251D20] block mb-1">
                Categoria do Conteúdo
              </label>
              <select
                className="w-full bg-white border border-[#E8CCD4] rounded-2xl px-3.5 py-2.5 text-xs text-[#251D20] font-semibold outline-none focus:border-[#B94F70] focus:ring-2 focus:ring-[#B94F70]/20 transition-all"
                {...register('category')}
              >
                <option value="Dicas & Tutoriais">Dicas & Tutoriais</option>
                <option value="Vestuário">Vestuário</option>
                <option value="Amigurumi">Amigurumi</option>
                <option value="Decoração">Decoração</option>
                <option value="Acessórios">Acessórios</option>
                <option value="Comunidade">Comunidade & Dúvidas</option>
              </select>
              {errors.category && (
                <span className="text-xs text-red-500">{errors.category.message}</span>
              )}
            </div>

            <div className="space-y-2">
              <label htmlFor="post-image" className="inline-flex min-h-11 cursor-pointer items-center gap-2 rounded-xl border border-[#E8CCD4] px-4 text-sm font-bold text-[#B94F70] hover:bg-[#F8E9ED]">
                <ImagePlus size={18} /> Adicionar foto
              </label>
              <input id="post-image" type="file" accept="image/*" onChange={handleImageChange} className="sr-only" />
              {image && (
                <div className="relative overflow-hidden rounded-2xl border border-[#E8CCD4]">
                  <img src={image} alt="Prévia da imagem da publicação" className="max-h-56 w-full object-contain bg-[#F8E9ED]" />
                  <div className="flex items-center justify-between gap-2 p-2 text-xs text-[#715B62]">
                    <span className="truncate">{imageName}</span>
                    <button type="button" onClick={() => { setImage(''); setImageName(''); }} className="inline-flex min-h-10 items-center gap-1 rounded-lg px-2 text-red-700 hover:bg-red-50" aria-label="Remover foto">
                      <Trash2 size={15} /> Remover
                    </button>
                  </div>
                </div>
              )}
              <p className="text-[11px] text-[#715B62]">Imagem JPG, PNG ou outro formato compatível, até 5 MB.</p>
            </div>

            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-[#251D20] block mb-1">
                Texto da Publicação
              </label>
              <textarea
                rows={5}
                placeholder="Escreva sua dúvida, receita ou dica para a comunidade..."
                className="w-full bg-white border border-[#E8CCD4] rounded-2xl p-3.5 text-xs text-[#251D20] placeholder:text-[#715B62]/60 outline-none focus:border-[#B94F70] focus:ring-2 focus:ring-[#B94F70]/20 transition-all leading-relaxed"
                {...register('content')}
              />
              {errors.content && (
                <span className="text-xs text-red-500">{errors.content.message}</span>
              )}
            </div>

            <div className="pt-2">
              <Button
                type="submit"
                variant="primary"
                fullWidth
                size="lg"
                disabled={createPostMutation.isPending}
                className="rounded-2xl font-black bg-[#B94F70] hover:bg-[#963B58] text-white shadow-md"
              >
                <MessageSquare size={16} />
                <span>{createPostMutation.isPending ? 'Publicando...' : 'Publicar no Feed'}</span>
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
