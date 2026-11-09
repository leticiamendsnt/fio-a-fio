import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRole } from '../../context/RoleContext';
import { createRecord } from '../../services/api';
import { Card, CardHeader, CardBody } from '../../components/ui/Card';
import { Input } from '../../components/ui/Input';
import { Button } from '../../components/ui/Button';
import { ArrowLeft, Camera, Sparkles } from 'lucide-react';

export const CreateStoryPage = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { currentUser } = useRole();
  const [caption, setCaption] = useState('');
  const [mediaUrl, setMediaUrl] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const createStoryMutation = useMutation({
    mutationFn: async (storyData) => {
      return await createRecord('stories', storyData);
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['stories'] });
      setMessage('Story publicado com sucesso! (Visível por 24 horas)');
      setTimeout(() => {
        navigate('/feed');
      }, 800);
    },
    onError: () => {
      setError('Não foi possível publicar o story.');
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!currentUser?.id) {
      setError('Você precisa estar conectada para criar um story.');
      return;
    }
    setError('');
    createStoryMutation.mutate({
      authorId: currentUser.id,
      mediaUrl,
      caption,
      createdAt: 'Agora',
      hasStory: true,
      hasUnseen: true,
    });
  };

  return (
    <div className="max-w-md mx-auto space-y-4">
      <Link to="/feed" className="inline-flex items-center gap-1 text-xs font-bold text-rose-600 hover:text-rose-700">
        <ArrowLeft size={16} />
        Voltar para o Feed
      </Link>

      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <Camera className="text-rose-500" size={20} />
            <h1 className="text-lg font-extrabold text-zinc-900">Novo Story</h1>
          </div>
          <p className="text-xs text-zinc-500">Publicação rápida que dura 24 horas.</p>
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

          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              label="URL da Imagem do Story"
              placeholder="https://exemplo.com/story-foto.jpg"
              value={mediaUrl}
              onChange={(e) => setMediaUrl(e.target.value)}
              required
            />

            <div>
              <label className="text-xs font-semibold uppercase tracking-wider text-zinc-700 block mb-1">
                Legenda
              </label>
              <input
                type="text"
                placeholder="Ex: Cantinho de crochê hoje 🧶"
                value={caption}
                onChange={(e) => setCaption(e.target.value)}
                className="w-full bg-white border border-zinc-200 rounded-xl px-3.5 py-2.5 text-sm text-zinc-800 outline-none focus:border-rose-400"
              />
            </div>

            <Button
              type="submit"
              variant="primary"
              fullWidth
              size="lg"
              disabled={createStoryMutation.isPending}
            >
              {createStoryMutation.isPending ? 'Publicando...' : 'Publicar Story'}
            </Button>
          </form>
        </CardBody>
      </Card>
    </div>
  );
};
