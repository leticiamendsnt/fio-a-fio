import React, { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { getVideoLessons, createLessonReview } from '../../services/api';
import { useApiData } from '../../hooks/useApiData';
import { useRole } from '../../context/RoleContext';
import { Card, CardHeader, CardBody } from '../../components/ui/Card';
import { StarRating } from '../../components/ui/StarRating';
import { Button } from '../../components/ui/Button';
import { ArrowLeft, Star, CheckCircle2 } from 'lucide-react';

export const RateVideoPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { currentUser } = useRole();
  const { data: lessons = [] } = useApiData('videoLessons', getVideoLessons);
  const lesson = lessons.find((v) => v.id === id) || lessons[0];

  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const reviewMutation = useMutation({
    mutationFn: async (reviewPayload) => {
      return await createLessonReview(lesson.id, reviewPayload);
    },
    onSuccess: (data) => {
      // Invalida o cache para atualizar a nota média e o número de avaliações em todas as telas
      queryClient.invalidateQueries({ queryKey: ['videoLessons'] });
      queryClient.invalidateQueries({ queryKey: ['lessonReviews', lesson.id] });
      setMessage(data?.message || 'Avaliação registrada no banco de dados com sucesso! Muito obrigado pelo seu feedback. 🧶✨');
      setTimeout(() => {
        navigate(`/videoaulas/${lesson.id}`);
      }, 1200);
    },
    onError: (err) => {
      setError(err.message || 'Não foi possível salvar sua avaliação. Tente novamente.');
    }
  });

  if (!lesson) return <p role="status">Carregando aula…</p>;

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    setMessage('');
    if (!comment.trim()) {
      setError('Por favor, escreva um breve comentário sobre a aula.');
      return;
    }

    reviewMutation.mutate({
      rating,
      comment: comment.trim(),
      userId: currentUser?.id || 'usr-1',
      userName: currentUser?.name || 'Aluna Fio a Fio',
      userAvatar: currentUser?.avatar
    });
  };

  return (
    <div className="max-w-md mx-auto space-y-4">
      <Link to="/biblioteca" className="inline-flex items-center gap-1 text-xs font-bold text-rose-600 hover:text-rose-700">
        <ArrowLeft size={16} />
        Voltar para Minha Biblioteca
      </Link>

      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <Star className="text-amber-400 fill-amber-400" size={20} />
            <h1 className="text-lg font-extrabold text-zinc-900">Avaliar Vídeo-aula</h1>
          </div>
          <p className="text-xs text-zinc-500">Sua opinião é fundamental para a professora e para a comunidade.</p>
        </CardHeader>

        <CardBody className="space-y-4">
          <div className="p-3 bg-rose-50/50 rounded-2xl border border-rose-100 flex items-center gap-3">
            <img src={lesson.thumbnail} alt={lesson.title} className="w-14 h-14 rounded-xl object-cover" />
            <div>
              <p className="font-bold text-xs text-zinc-900 line-clamp-1">{lesson.title}</p>
              <p className="text-[11px] text-zinc-500">Professora: {lesson.creator?.name || 'Professora Fio a Fio'}</p>
            </div>
          </div>

          {message && (
            <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold rounded-xl text-center flex items-center justify-center gap-1.5">
              <CheckCircle2 size={16} className="text-emerald-600" />
              <span>{message}</span>
            </div>
          )}

          {error && (
            <div role="alert" className="p-3 bg-red-50 border border-red-200 text-red-700 text-xs font-semibold rounded-xl text-center">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4 text-center">
            <div className="space-y-2">
              <label className="text-xs font-bold text-zinc-700 uppercase tracking-wider block">
                Sua Nota (1 a 5 estrelas)
              </label>
              <div className="flex justify-center">
                <StarRating rating={rating} interactive size={28} onChange={setRating} />
              </div>
            </div>

            <div className="text-left">
              <label className="text-xs font-semibold uppercase tracking-wider text-zinc-700 block mb-1">
                Comentário ou Sugestão
              </label>
              <textarea
                rows={4}
                placeholder="O que você achou das explicações, qualidade de imagem e ritmo das aulas?"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                className="w-full bg-white border border-zinc-200 rounded-xl p-3 text-sm text-zinc-800 outline-none focus:border-rose-400"
                required
              />
            </div>

            <Button
              type="submit"
              variant="primary"
              fullWidth
              size="lg"
              disabled={reviewMutation.isPending}
            >
              {reviewMutation.isPending ? 'Gravando no banco...' : 'Enviar Avaliação'}
            </Button>
          </form>
        </CardBody>
      </Card>
    </div>
  );
};
