import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { X, Edit3, Save } from 'lucide-react';
import { Input } from '../ui/Input';
import { Button } from '../ui/Button';
import { updateRecord } from '../../services/api';

const editPostSchema = z.object({
  title: z.string().min(3, 'O título deve ter pelo menos 3 caracteres.'),
  category: z.string().min(1, 'Selecione uma categoria.'),
  content: z.string().min(5, 'O conteúdo deve ter pelo menos 5 caracteres.'),
});

export const EditPostModal = ({ isOpen, onClose, post }) => {
  const queryClient = useQueryClient();
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(editPostSchema),
    defaultValues: {
      title: '',
      category: 'Dicas & Tutoriais',
      content: '',
    },
  });

  useEffect(() => {
    if (post) {
      reset({
        title: post.title || '',
        category: post.category || 'Dicas & Tutoriais',
        content: post.content || '',
      });
    }
  }, [post, reset]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      const prev = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
      return () => {
        document.body.style.overflow = prev;
        window.removeEventListener('keydown', handleKeyDown);
      };
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  const updatePostMutation = useMutation({
    mutationFn: async (formData) => {
      return await updateRecord('posts', post.id, {
        title: formData.title.trim(),
        category: formData.category,
        content: formData.content.trim(),
        updatedAt: new Date().toISOString(),
      });
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['posts'] });
      setMessage('Publicação atualizada com sucesso! ✨');
      setTimeout(() => {
        setMessage('');
        setError('');
        onClose();
      }, 700);
    },
    onError: () => {
      setError('Não foi possível salvar as alterações. Verifique o servidor local.');
    },
  });

  if (!isOpen || !post) return null;

  const onSubmit = (data) => {
    setError('');
    updatePostMutation.mutate(data);
  };

  return (
    <div
      className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center sm:p-6 bg-slate-950/75 backdrop-blur-2xl backdrop-saturate-150 animate-fadeIn"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="relative w-full max-w-lg bg-white backdrop-blur-2xl rounded-t-3xl sm:rounded-3xl shadow-2xl border border-[#E8CCD4] overflow-hidden flex flex-col h-[min(92dvh,48rem)] sm:h-auto sm:max-h-[90dvh] animate-scaleUp">
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#E8CCD4] bg-[#F8E9ED]/70">
          <div className="flex items-center gap-2">
            <Edit3 className="text-[#B94F70]" size={20} />
            <h2 className="text-base font-black text-[#251D20]">Editar Publicação</h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-[#715B62] hover:text-[#251D20] hover:bg-[#F6DDE5] rounded-full transition-colors"
            aria-label="Fechar"
          >
            <X size={18} />
          </button>
        </div>

        <div className="min-h-0 flex-1 p-4 sm:p-6 overflow-y-auto overscroll-contain space-y-4">
          {message && (
            <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold rounded-2xl text-center">
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

            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-[#251D20] block mb-1">
                Texto da Publicação
              </label>
              <textarea
                rows={5}
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
                disabled={updatePostMutation.isPending}
                className="rounded-2xl font-black bg-[#B94F70] hover:bg-[#963B58] text-white shadow-md"
              >
                <Save size={16} />
                <span>{updatePostMutation.isPending ? 'Salvando...' : 'Salvar Alterações'}</span>
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

