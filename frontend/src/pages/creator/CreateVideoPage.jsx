import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRole } from '../../context/RoleContext';
import { createRecord } from '../../services/api';
import { Card, CardHeader, CardBody } from '../../components/ui/Card';
import { Input } from '../../components/ui/Input';
import { Button } from '../../components/ui/Button';
import { ArrowLeft, Sparkles, PlusCircle } from 'lucide-react';

const createVideoSchema = z.object({
  title: z.string().min(3, 'O título deve ter pelo menos 3 caracteres.'),
  subtitle: z.string().min(3, 'O subtítulo deve ter pelo menos 3 caracteres.'),
  category: z.string().min(1, 'Selecione uma categoria.'),
  price: z.coerce.number().min(0.01, 'O preço deve ser maior que zero.'),
  level: z.string().default('Iniciante'),
  duration: z.string().optional(),
  description: z.string().min(5, 'A descrição deve ter pelo menos 5 caracteres.'),
  thumbnail: z.string().optional(),
  videoUrl: z.string().optional(),
});

export const CreateVideoPage = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { currentUser } = useRole();
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(createVideoSchema),
    defaultValues: {
      title: '',
      subtitle: '',
      category: 'Vestuário',
      price: '',
      level: 'Iniciante',
      duration: '1h 30min',
      description: '',
      thumbnail: 'https://images.unsplash.com/photo-1619252584172-a83a949b6efd?w=800&auto=format&fit=crop&q=80',
      videoUrl: '',
    },
  });

  const createLessonMutation = useMutation({
    mutationFn: async (formData) => {
      const { videoUrl, ...lesson } = formData;
      return await createRecord('videoLessons', {
        ...lesson,
        price: Number(formData.price),
        creatorId: currentUser.id,
        creatorBio: currentUser.bio,
        thumbnail: formData.thumbnail || 'https://images.unsplash.com/photo-1619252584172-a83a949b6efd?w=800&auto=format&fit=crop&q=80',
        videoUrl: videoUrl || '',
        rating: 5.0,
        reviewsCount: 1,
        studentsCount: 0,
        requirements: ['Agulha de crochê', 'Fio adequado'],
        whatYouWillLearn: ['Pontos essenciais', 'Confecção completa'],
        modules: [],
        isActive: true,
        moderationStatus: 'approved',
      });
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['videoLessons'] });
      setMessage('Vídeo-aula cadastrada com sucesso! Ela já está disponível no catálogo.');
      setTimeout(() => {
        navigate('/criador/videoaulas');
      }, 900);
    },
    onError: (err) => {
      setError(err.message || 'Erro ao cadastrar a vídeo-aula.');
    },
  });

  const onSubmit = (data) => {
    setMessage('');
    setError('');
    createLessonMutation.mutate(data);
  };

  return (
    <div className="max-w-2xl mx-auto space-y-4">
      <Link to="/criador/videoaulas" className="inline-flex items-center gap-1 text-xs font-bold text-rose-600 hover:text-rose-700">
        <ArrowLeft size={16} />
        Voltar para Minhas Aulas
      </Link>

      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <Sparkles className="text-purple-600" size={20} />
            <h1 className="text-lg font-extrabold text-zinc-900">Cadastrar Nova Vídeo-aula</h1>
          </div>
          <p className="text-xs text-zinc-500">Disponibilize um novo curso pago para a comunidade.</p>
        </CardHeader>

        <CardBody className="space-y-4">
          {message && (
            <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold rounded-xl text-center">
              {message}
            </div>
          )}
          {error && (
            <div role="alert" className="p-3 bg-red-50 border border-red-200 text-red-700 text-xs font-semibold rounded-xl text-center">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
            <Input
              label="Título do Curso"
              placeholder="Ex: Manta de Crochê em Ponto Pipoca"
              error={errors.title?.message}
              {...register('title')}
            />

            <Input
              label="Subtítulo / Resumo"
              placeholder="Ex: Aprenda do zero a criar peças de decoração aconchegantes."
              error={errors.subtitle?.message}
              {...register('subtitle')}
            />

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label className="text-xs font-semibold uppercase tracking-wider text-zinc-700 block mb-1">
                  Categoria
                </label>
                <select
                  className="w-full bg-white border border-zinc-200 rounded-xl px-3 py-2.5 text-sm text-zinc-800 outline-none focus:border-rose-400"
                  {...register('category')}
                >
                  <option value="Vestuário">Vestuário</option>
                  <option value="Amigurumi">Amigurumi</option>
                  <option value="Decoração">Decoração</option>
                  <option value="Acessórios">Acessórios</option>
                  <option value="Técnicas">Técnicas</option>
                </select>
              </div>

              <div>
                <label className="text-xs font-semibold uppercase tracking-wider text-zinc-700 block mb-1">
                  Nível
                </label>
                <select
                  className="w-full bg-white border border-zinc-200 rounded-xl px-3 py-2.5 text-sm text-zinc-800 outline-none focus:border-rose-400"
                  {...register('level')}
                >
                  <option value="Iniciante">Iniciante</option>
                  <option value="Intermediário">Intermediário</option>
                  <option value="Avançado">Avançado</option>
                </select>
              </div>

              <Input
                label="Preço (R$)"
                type="number"
                step="0.01"
                placeholder="29.90"
                error={errors.price?.message}
                {...register('price')}
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <Input
                label="Duração Estimada"
                placeholder="Ex: 2h 15min"
                error={errors.duration?.message}
                {...register('duration')}
              />

              <Input
                label="URL da Capa / Imagem"
                placeholder="https://..."
                error={errors.thumbnail?.message}
                {...register('thumbnail')}
              />
            </div>

            <div>
              <label className="text-xs font-semibold uppercase tracking-wider text-zinc-700 block mb-1">
                Descrição Completa
              </label>
              <textarea
                rows={3}
                placeholder="Detalhe o conteúdo das aulas, materiais necessários e dicas especiais..."
                className="w-full bg-white border border-zinc-200 rounded-xl p-3 text-sm text-zinc-800 outline-none focus:border-rose-400"
                {...register('description')}
              />
              {errors.description && (
                <span className="text-xs text-red-500">{errors.description.message}</span>
              )}
            </div>

            <Button
              type="submit"
              variant="primary"
              fullWidth
              size="lg"
              disabled={createLessonMutation.isPending}
            >
              <PlusCircle size={18} />
              {createLessonMutation.isPending ? 'Cadastrando aula...' : 'Publicar Vídeo-aula'}
            </Button>
          </form>
        </CardBody>
      </Card>
    </div>
  );
};
