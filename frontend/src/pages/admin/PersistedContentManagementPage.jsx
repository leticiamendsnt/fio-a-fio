import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Eye, Trash2, RotateCcw, AlertTriangle } from 'lucide-react';
import { deleteRecord, getMaterials, getVideoLessons, updateRecord } from '../../services/api';
import { useApiData } from '../../hooks/useApiData';
import { Card, CardBody, CardHeader } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';

export const PersistedContentManagementPage = () => {
  const queryClient = useQueryClient();
  const [error, setError] = useState('');
  const [processingKey, setProcessingKey] = useState('');
  const { data: lessons = [], isLoading: lessonsLoading } = useApiData('videoLessons', getVideoLessons);
  const { data: materials = [], isLoading: materialsLoading } = useApiData('materials', getMaterials);

  const toggleLessonStatusMutation = useMutation({
    mutationFn: async ({ id, isActive }) => {
      return await updateRecord('videoLessons', id, {
        isActive,
        moderationStatus: isActive ? 'approved' : 'removed',
        moderatedAt: new Date().toISOString(),
      });
    },
    onSuccess: async () => {
      await Promise.all([
        queryClient.invalidateQueries({ queryKey: ['videoLessons'] }),
        queryClient.invalidateQueries({ queryKey: ['adminDashboard'] }),
      ]);
    },
    onError: () => {
      setError('Não foi possível atualizar a vídeo-aula. Verifique se o JSON Server está ativo.');
    },
    onSettled: () => {
      setProcessingKey('');
    },
  });

  const deleteLessonMutation = useMutation({
    mutationFn: async (id) => {
      return await deleteRecord('videoLessons', id);
    },
    onSuccess: async () => {
      await Promise.all([
        queryClient.invalidateQueries({ queryKey: ['videoLessons'] }),
        queryClient.invalidateQueries({ queryKey: ['adminDashboard'] }),
      ]);
    },
    onError: () => {
      setError('Não foi possível excluir a vídeo-aula.');
    },
    onSettled: () => {
      setProcessingKey('');
    },
  });

  const deleteMaterialMutation = useMutation({
    mutationFn: async (id) => {
      return await deleteRecord('materials', id);
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['materials'] });
    },
    onError: () => {
      setError('Não foi possível remover o material. Verifique se o JSON Server está ativo.');
    },
    onSettled: () => {
      setProcessingKey('');
    },
  });

  const setLessonStatus = (lesson) => {
    const isActive = lesson.isActive === false;
    const action = isActive ? 'reativar' : 'desativar';
    if (!window.confirm(`Deseja ${action} a vídeo-aula "${lesson.title}"?`)) return;
    setProcessingKey(`lesson-${lesson.id}`);
    setError('');
    toggleLessonStatusMutation.mutate({ id: lesson.id, isActive });
  };

  const permanentlyDeleteLesson = (lesson) => {
    if (!window.confirm(`Atenção: Excluir definitivamente do banco a vídeo-aula "${lesson.title}"?`)) return;
    setProcessingKey(`lesson-del-${lesson.id}`);
    setError('');
    deleteLessonMutation.mutate(lesson.id);
  };

  const removeMaterial = (material) => {
    if (!window.confirm(`Remover definitivamente o material "${material.title}"?`)) return;
    setProcessingKey(`material-${material.id}`);
    setError('');
    deleteMaterialMutation.mutate(material.id);
  };

  const activeLessons = lessons.filter((lesson) => lesson.isActive !== false);
  const archivedLessons = lessons.filter((lesson) => lesson.isActive === false);

  return (
    <div className="mx-auto max-w-5xl space-y-6">
      <header className="space-y-1">
        <span className="text-xs font-extrabold uppercase tracking-wider text-rose-600">Painel de Moderação</span>
        <h1 className="text-2xl font-black text-zinc-900">Gestão de Conteúdos</h1>
        <p className="text-xs text-zinc-500">Desative ou exclua vídeo-aulas; materiais removidos são excluídos do banco local.</p>
      </header>
      {error && <p role="alert" className="rounded-xl border border-red-200 bg-red-50 p-3 text-xs font-semibold text-red-700">{error}</p>}

      <Card>
        <CardHeader><h2 className="text-sm font-extrabold text-zinc-900">Vídeo-aulas ativas ({activeLessons.length})</h2></CardHeader>
        <CardBody className="space-y-3 p-3 sm:p-5">
          {lessonsLoading && <p role="status" className="p-4 text-center text-sm text-zinc-500">Carregando vídeo-aulas...</p>}
          {!lessonsLoading && activeLessons.length === 0 && <p className="p-4 text-center text-sm text-zinc-500">Nenhuma vídeo-aula ativa.</p>}
          {activeLessons.map((lesson) => (
            <article key={lesson.id} className="flex flex-col gap-3 rounded-2xl border border-rose-100 p-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex min-w-0 items-center gap-3">
                <img src={lesson.thumbnail} alt="" className="h-14 w-16 shrink-0 rounded-xl object-cover" />
                <div className="min-w-0">
                  <h3 className="break-words text-xs font-bold text-zinc-900">{lesson.title}</h3>
                  <p className="break-words text-[11px] text-zinc-500">{lesson.creator?.name || 'Criador'} · R$ {Number(lesson.price || 0).toFixed(2)}</p>
                  <Badge variant="green" size="sm">Ativa</Badge>
                </div>
              </div>
              <div className="flex w-full flex-wrap justify-end gap-2 sm:w-auto sm:shrink-0">
                <Link to={`/videoaulas/${lesson.id}`}><Button variant="ghost" size="sm" aria-label="Visualizar aula"><Eye size={16} /></Button></Link>
                <Button variant="secondary" size="sm" disabled={processingKey.startsWith(`lesson-${lesson.id}`)} onClick={() => setLessonStatus(lesson)}>
                  <Trash2 size={14} /><span>{processingKey === `lesson-${lesson.id}` ? 'Salvando...' : 'Desativar'}</span>
                </Button>
                <Button variant="danger" size="sm" disabled={processingKey.startsWith(`lesson-del-${lesson.id}`)} onClick={() => permanentlyDeleteLesson(lesson)} title="Excluir definitivamente">
                  <AlertTriangle size={14} /><span>{processingKey === `lesson-del-${lesson.id}` ? 'Excluindo...' : 'Excluir'}</span>
                </Button>
              </div>
            </article>
          ))}
        </CardBody>
      </Card>

      {archivedLessons.length > 0 && (
        <Card>
          <CardHeader><h2 className="text-sm font-extrabold text-zinc-900">Vídeo-aulas desativadas ({archivedLessons.length})</h2></CardHeader>
          <CardBody className="space-y-3 p-3 sm:p-5">
            {archivedLessons.map((lesson) => (
              <article key={lesson.id} className="flex flex-col gap-3 rounded-2xl border border-zinc-200 p-4 sm:flex-row sm:items-center sm:justify-between">
                <div className="min-w-0"><h3 className="break-words text-xs font-bold text-zinc-700">{lesson.title}</h3><Badge variant="gray" size="sm">Desativada</Badge></div>
                <div className="flex gap-2">
                  <Button variant="secondary" size="sm" disabled={processingKey === `lesson-${lesson.id}`} onClick={() => setLessonStatus(lesson)}>
                    <RotateCcw size={14} /><span>{processingKey === `lesson-${lesson.id}` ? 'Salvando...' : 'Reativar'}</span>
                  </Button>
                  <Button variant="danger" size="sm" disabled={processingKey === `lesson-del-${lesson.id}`} onClick={() => permanentlyDeleteLesson(lesson)}>
                    <Trash2 size={14} /><span>{processingKey === `lesson-del-${lesson.id}` ? 'Excluindo...' : 'Excluir'}</span>
                  </Button>
                </div>
              </article>
            ))}
          </CardBody>
        </Card>
      )}

      <Card>
        <CardHeader><h2 className="text-sm font-extrabold text-zinc-900">Materiais gratuitos ({materials.length})</h2></CardHeader>
        <CardBody className="space-y-3 p-3 sm:p-5">
          {materialsLoading && <p role="status" className="p-4 text-center text-sm text-zinc-500">Carregando materiais...</p>}
          {materials.map((material) => (
            <article key={material.id} className="flex flex-col gap-3 rounded-2xl border border-rose-100 p-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="min-w-0">
                <h3 className="break-words text-xs font-bold text-zinc-900">{material.title}</h3>
                <p className="break-words text-[11px] text-zinc-500">{material.type} · {material.category}</p>
              </div>
              <Button variant="danger" size="sm" disabled={processingKey === `material-${material.id}`} onClick={() => removeMaterial(material)}>
                <Trash2 size={14} /><span>{processingKey === `material-${material.id}` ? 'Removendo...' : 'Excluir'}</span>
              </Button>
            </article>
          ))}
        </CardBody>
      </Card>
    </div>
  );
};
