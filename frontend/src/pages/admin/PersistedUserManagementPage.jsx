import React, { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Ban, CheckCircle, Trash2 } from 'lucide-react';
import { getUsers, updateRecord, deleteRecord } from '../../services/api';
import { useApiData } from '../../hooks/useApiData';
import { useRole } from '../../context/RoleContext';
import { Card, CardBody, CardHeader } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';
import { SearchInput } from '../../components/ui/SearchInput';

export const PersistedUserManagementPage = () => {
  const queryClient = useQueryClient();
  const { currentUser } = useRole();
  const { data: users = [], isLoading } = useApiData('users', getUsers);
  const [query, setQuery] = useState('');
  const [processingId, setProcessingId] = useState(null);
  const [error, setError] = useState('');
  const [notice, setNotice] = useState('');

  const filtered = users.filter((user) =>
    `${user.name || ''} ${user.username || ''} ${user.email || ''}`.toLowerCase().includes(query.toLowerCase())
  );

  const toggleSuspensionMutation = useMutation({
    mutationFn: async ({ id, suspend }) => {
      return await updateRecord('users', id, {
        isSuspended: suspend,
        suspendedAt: suspend ? new Date().toISOString() : null,
      });
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['users'] });
      setNotice(`Conta de @${variables.username} ${variables.suspend ? 'suspensa' : 'reativada'}.`);
    },
    onError: () => {
      setError('Não foi possível atualizar esta conta. Verifique se o JSON Server está ativo.');
    },
    onSettled: () => {
      setProcessingId(null);
    },
  });

  const deleteUserMutation = useMutation({
    mutationFn: async (id) => {
      return await deleteRecord('users', id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] });
      setNotice('Usuário excluído com sucesso.');
    },
    onError: () => {
      setError('Não foi possível excluir o usuário.');
    },
    onSettled: () => {
      setProcessingId(null);
    },
  });

  const toggleSuspension = (user) => {
    const suspend = !user.isSuspended;
    if (!window.confirm(`Deseja ${suspend ? 'suspender' : 'reativar'} a conta de @${user.username}?`)) return;
    setProcessingId(user.id);
    setError('');
    setNotice('');
    toggleSuspensionMutation.mutate({ id: user.id, username: user.username, suspend });
  };

  const handleDeleteUser = (user) => {
    if (!window.confirm(`Tem certeza que deseja excluir permanentemente o usuário @${user.username}?`)) return;
    setProcessingId(user.id);
    setError('');
    setNotice('');
    deleteUserMutation.mutate(user.id);
  };

  return (
    <div className="mx-auto max-w-5xl space-y-6">
      <header className="space-y-1">
        <span className="text-xs font-extrabold uppercase tracking-wider text-rose-600">Painel de Moderação</span>
        <h1 className="text-2xl font-black text-zinc-900">Gestão de Usuários</h1>
        <p className="text-xs text-zinc-500">Suspenda, reative ou exclua contas. Uma conta suspensa não poderá entrar novamente.</p>
      </header>
      <Card>
        <CardHeader className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
          <h2 className="text-sm font-extrabold text-zinc-900">Usuários ({filtered.length})</h2>
          <div className="w-full sm:w-72">
            <SearchInput value={query} onChange={setQuery} placeholder="Buscar nome, usuário ou e-mail..." />
          </div>
        </CardHeader>
        <CardBody className="space-y-3 p-3 sm:p-5">
          {error && <p role="alert" className="rounded-xl border border-red-200 bg-red-50 p-3 text-xs font-semibold text-red-700">{error}</p>}
          {notice && <p role="status" className="rounded-xl border border-emerald-200 bg-emerald-50 p-3 text-xs font-semibold text-emerald-800">{notice}</p>}
          {isLoading && <p role="status" className="p-5 text-center text-sm text-zinc-500">Carregando usuários...</p>}
          {!isLoading && filtered.length === 0 && <p className="p-5 text-center text-sm text-zinc-500">Nenhum usuário encontrado.</p>}
          {filtered.map((user) => (
            <article key={user.id} className="space-y-3 rounded-2xl border border-rose-100 p-4 sm:flex sm:items-center sm:justify-between sm:gap-5">
              <div className="min-w-0 space-y-1">
                <p className="break-words text-sm font-bold text-zinc-900">{user.name}</p>
                <p className="break-all text-xs text-zinc-500">@{user.username} · {user.email}</p>
                <div className="flex flex-wrap items-center gap-2 pt-1">
                  <Badge variant={user.role === 'admin' ? 'purple' : user.role === 'creator' ? 'rose' : 'gray'} size="sm">{user.role}</Badge>
                  <Badge variant={user.isSuspended ? 'amber' : 'green'} size="sm">{user.isSuspended ? 'Suspenso' : 'Ativo'}</Badge>
                </div>
              </div>
              <div className="flex flex-wrap items-center justify-end gap-2 sm:shrink-0">
                <Button
                  variant={user.isSuspended ? 'secondary' : 'danger'}
                  size="sm"
                  disabled={processingId === user.id || currentUser?.id === user.id}
                  onClick={() => toggleSuspension(user)}
                >
                  {user.isSuspended ? <CheckCircle size={14} /> : <Ban size={14} />}
                  <span>{processingId === user.id ? 'Salvando...' : user.isSuspended ? 'Reativar' : 'Suspender'}</span>
                </Button>
                {currentUser?.id !== user.id && (
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-red-600 hover:bg-red-50"
                    disabled={processingId === user.id}
                    onClick={() => handleDeleteUser(user)}
                    title="Excluir usuário permanentemente"
                  >
                    <Trash2 size={14} />
                  </Button>
                )}
              </div>
            </article>
          ))}
        </CardBody>
      </Card>
    </div>
  );
};
