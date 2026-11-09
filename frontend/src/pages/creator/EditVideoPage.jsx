import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { getVideoLessons, updateRecord, deleteRecord } from '../../services/api';
import { useApiData } from '../../hooks/useApiData';
import { Card, CardHeader, CardBody } from '../../components/ui/Card';
import { Input } from '../../components/ui/Input';
import { Button } from '../../components/ui/Button';
import { ArrowLeft, Save, Trash2 } from 'lucide-react';

const editVideoSchema = z.object({
  title: z.string().min(3, 'O título deve ter pelo menos 3 caracteres.'),
  price: z.coerce.number().min(0.01, 'O preço deve ser maior que zero.'),
  description: z.string().min(5, 'A descrição deve ter pelo menos 5 caracteres.'),
});

export const EditVideoPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { data: lessons = [] } = useApiData('videoLessons', getVideoLessons);
  const lesson = lessons.find((v) => v.id === id);

  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(editVideoSchema),
    defaultValues: {
      title: '',
      price: '',
      description: '',
    },
  });

  useEffect(() => {
    if (lesson) {
      reset({
        title: lesson.title || '',
        price: lesson.price ?? '',
        description: lesson.description || '',
      });
    }
  }, [lesson, reset]);

  const updateLessonMutation = useMutation({
    mutationFn: async (formData) => {
      return await updateRecord('videoLessons', id, {
        title: formData.title.trim(),
        price: Number(formData.price),
        description: formData.description.trim(),
      });
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['videoLessons'] });
      setMessage('Informações da vídeo-aula atualizadas com sucesso!');
      setTimeout(() => {
        navigate('/criador/videoaulas');
      }, 800);
    },
    onError: (err) => {
      setError(err.message || 'Erro ao atualizar aula.');
    },
  });

  const deleteLessonMutation = useMutation({
    mutationFn: async () => {
      return await deleteRecord('videoLessons', id);
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['videoLessons'] });
      alert('Vídeo-aula excluída com sucesso.');
      navigate('/criador/videoaulas');
    },
    onError: (err) => {
      setError(err.message || 'Erro ao excluir aula.');
    },
  });

  const onSubmit = (data) => {
    setMessage('');
    setError('');
    updateLessonMutation.mutate(data);
  };

  const handleDelete = () => {
    if (!window.confirm(`Tem certeza que deseja excluir a vídeo-aula "${lesson?.title}"? Esta ação não pode ser desfeita.`)) {
      return;
    }
    deleteLessonMutation.mutate();
  };

  if (!lesson) return <p role="status" className="p-8 text-center text-zinc-500">Carregando aula…</p>;

  return (
    <div className="max-w-xl mx-auto space-y-4">
      <Link to="/criador/videoaulas" className="inline-flex items-center gap-1 text-xs font-bold text-rose-600 hover:text-rose-700">
        <ArrowLeft size={16} />
        Voltar para Minhas Aulas
      </Link>

      <Card>
        <CardHeader>
          <h1 className="text-lg font-extrabold text-zinc-900">Editar Vídeo-aula</h1>
          <p className="text-xs text-zinc-500">Altere o preço, descrição ou conteúdo do curso.</p>
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
              error={errors.title?.message}
              {...register('title')}
            />

            <Input
              label="Preço do Curso (R$)"
              type="number"
              step="0.01"
              error={errors.price?.message}
              {...register('price')}
            />

            <div>
              <label className="text-xs font-semibold uppercase tracking-wider text-zinc-700 block mb-1">
                Descrição
              </label>
              <textarea
                rows={4}
                className="w-full bg-white border border-zinc-200 rounded-xl p-3 text-sm text-zinc-800 outline-none focus:border-rose-400"
                {...register('description')}
              />
              {errors.description && (
                <span className="text-xs text-red-500">{errors.description.message}</span>
              )}
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
              <Button
                type="submit"
                variant="primary"
                fullWidth
                size="lg"
                disabled={updateLessonMutation.isPending}
              >
                <Save size={18} />
                {updateLessonMutation.isPending ? 'Salvando...' : 'Salvar Alterações'}
              </Button>

              <Button
                type="button"
                variant="danger"
                size="lg"
                className="w-full sm:w-auto"
                disabled={deleteLessonMutation.isPending}
                onClick={handleDelete}
              >
                <Trash2 size={18} />
                {deleteLessonMutation.isPending ? 'Excluindo...' : 'Excluir Aula'}
              </Button>
            </div>
          </form>
        </CardBody>
      </Card>
    </div>
  );
};
