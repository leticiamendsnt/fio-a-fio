import React from 'react';
import { Link } from 'react-router-dom';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteRecord, getVideoLessons } from '../../services/api';
import { useApiData } from '../../hooks/useApiData';
import { useRole } from '../../context/RoleContext';
import { Card, CardHeader, CardBody } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { EmptyState } from '../../components/ui/EmptyState';
import { PlusCircle, Edit, Trash2, Eye, Sparkles, Video } from 'lucide-react';

export const ManageVideosPage = () => {
  const { currentUser } = useRole();
  const queryClient = useQueryClient();
  const { data: lessons = [] } = useApiData('videoLessons', getVideoLessons);

  const deleteLessonMutation = useMutation({
    mutationFn: async (id) => {
      return await deleteRecord('videoLessons', id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['videoLessons'] });
    },
    onError: () => {
      alert('Não foi possível excluir a vídeo-aula. Verifique o servidor local.');
    },
  });

  const handleDelete = (lesson) => {
    if (!window.confirm(`Tem certeza que deseja excluir a vídeo-aula "${lesson.title}"? Ela será removida do catálogo.`)) {
      return;
    }
    deleteLessonMutation.mutate(lesson.id);
  };

  // Filter lessons created by this specific creator
  const myLessons = currentUser?.id
    ? lessons.filter((l) => l.creatorId === currentUser.id || l.creator?.id === currentUser.id)
    : lessons;

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-purple-700 via-indigo-700 to-purple-800 rounded-3xl p-8 text-white shadow-lg flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 text-xs font-bold uppercase tracking-wider text-white mb-2">
            <Sparkles size={14} />
            Painel da Criadora: {currentUser?.name || 'Professora'}
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold">Minhas Vídeo-aulas</h1>
          <p className="text-xs text-purple-100 mt-1">Gerencie seu catálogo de cursos, altere preços e cadastre novas vídeo-aulas.</p>
        </div>
        <Link to="/criador/videoaulas/cadastrar">
          <Button variant="secondary" size="md" className="bg-white text-purple-900 hover:bg-purple-50 font-extrabold border-none shadow-sm">
            <PlusCircle size={16} />
            <span>Cadastrar Nova Aula</span>
          </Button>
        </Link>
      </div>

      {/* Videos List Table / Cards */}
      <Card>
        <CardHeader className="flex items-center justify-between">
          <h3 className="font-extrabold text-sm text-zinc-900">Catálogo Publicado ({myLessons.length})</h3>
          <span className="text-xs text-zinc-500">Divisão: 85% Criador / 15% Plataforma</span>
        </CardHeader>

        <CardBody className="p-0">
          {myLessons.length === 0 ? (
            <div className="p-8">
              <EmptyState
                icon={Video}
                title="Você ainda não cadastrou nenhuma vídeo-aula"
                description="Comece a monetizar seu conhecimento em crochê publicando sua primeira aula na plataforma."
                actionText="Cadastrar Minha Primeira Aula"
                actionTo="/criador/videoaulas/cadastrar"
              />
            </div>
          ) : (
            <div className="divide-y divide-rose-50">
              {myLessons.map((lesson) => (
                <div key={lesson.id} className="p-4 sm:p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 hover:bg-rose-50/20 transition-colors">
                  <div className="flex items-center gap-4">
                    <img src={lesson.thumbnail} alt={lesson.title} className="w-20 h-16 rounded-xl object-cover bg-zinc-900" />
                    <div>
                      <div className="flex items-center gap-2">
                        <Badge variant="purple" size="sm">{lesson.category}</Badge>
                        <span className="text-xs text-zinc-400">• {lesson.studentsCount || 0} alunos</span>
                      </div>
                      <h4 className="font-bold text-sm text-zinc-900 line-clamp-1 mt-0.5">{lesson.title}</h4>
                      <p className="text-xs font-extrabold text-[#B94F70]">
                        R$ {Number(lesson.price || 0).toFixed(2).replace('.', ',')}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
                    <Link to={`/videoaulas/${lesson.id}`}>
                      <Button variant="ghost" size="sm" title="Visualizar página pública">
                        <Eye size={16} />
                      </Button>
                    </Link>
                    <Link to={`/criador/videoaulas/editar/${lesson.id}`}>
                      <Button variant="outline" size="sm">
                        <Edit size={14} />
                        <span>Editar</span>
                      </Button>
                    </Link>
                    <Button
                      variant="danger"
                      size="sm"
                      disabled={deleteLessonMutation.isPending}
                      onClick={() => handleDelete(lesson)}
                      title="Excluir aula"
                    >
                      <Trash2 size={14} />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardBody>
      </Card>
    </div>
  );
};
