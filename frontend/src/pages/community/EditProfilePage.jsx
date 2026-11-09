import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams, Link } from 'react-router-dom';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRole } from '../../context/RoleContext';
import { updateRecord, deleteRecord } from '../../services/api';
import { Card, CardHeader, CardBody } from '../../components/ui/Card';
import { Input } from '../../components/ui/Input';
import { Button } from '../../components/ui/Button';
import { ArrowLeft, User, MapPin, Camera, Sparkles, CheckCircle2, Video, UserCheck, Trash2, AlertTriangle } from 'lucide-react';

export const EditProfilePage = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { currentUser, currentRole, updateCurrentRole, selectUser } = useRole();
  const queryClient = useQueryClient();

  const [name, setName] = useState(currentUser.name || '');
  const [bio, setBio] = useState(currentUser.bio || '');
  const [location, setLocation] = useState(currentUser.location || '');
  const [avatarUrl, setAvatarUrl] = useState(currentUser.avatar || '');
  const [selectedRole, setSelectedRole] = useState(currentRole === 'guest' ? 'user' : currentRole);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const isFocusRole = searchParams.get('focus') === 'role';

  useEffect(() => {
    setName(currentUser.name || '');
    setBio(currentUser.bio || '');
    setLocation(currentUser.location || '');
    setAvatarUrl(currentUser.avatar || '');
    setSelectedRole(currentUser.role === 'guest' ? 'user' : currentUser.role);
    setError('');
  }, [currentUser.id]);

  useEffect(() => {
    if (isFocusRole) {
      setSelectedRole('creator');
    }
  }, [isFocusRole]);

  const updateProfileMutation = useMutation({
    mutationFn: async (updatedData) => {
      return await updateRecord('users', currentUser.id, updatedData);
    },
    onSuccess: async (updatedUser) => {
      queryClient.setQueryData(['users'], (users = []) =>
        users.map((user) => (user.id === updatedUser.id ? updatedUser : user))
      );
      await queryClient.invalidateQueries({ queryKey: ['users'] });
      if (selectedRole !== currentRole) updateCurrentRole(selectedRole);
      setMessage('Perfil e tipo de conta atualizados com sucesso!');
      setTimeout(() => navigate(selectedRole === 'creator' ? '/criador/videoaulas' : '/perfil'), 800);
    },
    onError: (saveError) => {
      setError(saveError.message || 'Não foi possível salvar o perfil. Verifique se o JSON Server está ativo.');
    },
  });

  const deleteAccountMutation = useMutation({
    mutationFn: async () => {
      await deleteRecord('users', currentUser.id);
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['users'] });
      selectUser(null);
      alert('Sua conta foi excluída com sucesso. Sentiremos sua falta!');
      navigate('/');
    },
    onError: (delError) => {
      setError(delError.message || 'Não foi possível excluir a conta. Tente novamente.');
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!currentUser.id) {
      setError('Não foi possível identificar a conta atual.');
      return;
    }
    setError('');
    updateProfileMutation.mutate({
      name,
      bio,
      location,
      avatar: avatarUrl,
      role: selectedRole,
    });
  };

  const handleDeleteAccount = () => {
    if (!currentUser.id) return;
    const confirmed = window.confirm(
      'Atenção: Tem certeza de que deseja excluir permanentemente sua conta no Fio a Fio? Esta ação não pode ser desfeita.'
    );
    if (!confirmed) return;
    deleteAccountMutation.mutate();
  };

  return (
    <div className="max-w-xl mx-auto space-y-6">
      <Link to="/perfil" className="inline-flex items-center gap-1 text-xs font-bold text-[#B94F70] hover:underline">
        <ArrowLeft size={16} />
        Voltar para o Perfil
      </Link>

      <Card>
        <CardHeader>
          <h1 className="text-lg font-extrabold text-zinc-900">Editar Perfil</h1>
          <p className="text-xs text-zinc-500">Atualize suas informações pessoais e tipo de perfil.</p>
        </CardHeader>

        <CardBody className="space-y-4">
          {message && (
            <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold rounded-xl text-center shadow-xs">
              {message}
            </div>
          )}
          {error && (
            <div role="alert" className="p-3 bg-red-50 border border-red-200 text-red-700 text-xs font-bold rounded-xl text-center">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Profile Type Selection Box */}
            <div
              className={`p-4 rounded-2xl border transition-all duration-300 ${
                isFocusRole
                  ? 'bg-[#F6DDE5] border-[#B94F70] ring-2 ring-[#B94F70]/40 shadow-md'
                  : 'bg-[#F6DDE5]/60 border-[#E8CCD4]'
              }`}
            >
              <div className="flex items-center gap-2 mb-1.5">
                <Sparkles className="text-[#B94F70]" size={18} />
                <label className="text-xs font-extrabold uppercase tracking-wider text-[#251D20]">
                  Tipo de Perfil
                </label>
                {isFocusRole && (
                  <span className="ml-auto bg-[#B94F70] text-white text-[10px] font-black px-2 py-0.5 rounded-full uppercase">
                    Altere aqui
                  </span>
                )}
              </div>
              <p className="text-xs text-[#715B62] mb-3 leading-relaxed">
                Escolha seu perfil na plataforma. Como Criadora/Professora você poderá publicar e rentabilizar suas vídeo-aulas de crochê!
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setSelectedRole('user')}
                  className={`p-3.5 rounded-xl border text-left transition-all ${
                    selectedRole === 'user'
                      ? 'bg-white border-[#B94F70] text-[#B94F70] shadow-sm ring-1 ring-[#B94F70]'
                      : 'bg-white/80 border-[#E8CCD4] text-[#715B62] hover:bg-white'
                  }`}
                >
                  <div className="flex items-center justify-between font-extrabold text-xs mb-1 text-[#251D20]">
                    <span className="flex items-center gap-1.5">
                      <UserCheck size={15} className="text-[#B94F70]" />
                      Aluna / Crocheteira
                    </span>
                    {selectedRole === 'user' && <CheckCircle2 size={16} className="text-[#B94F70] fill-[#F6DDE5]" />}
                  </div>
                  <p className="text-[11px] text-[#715B62] font-medium leading-normal">
                    Aprenda, participe da comunidade e salve materiais.
                  </p>
                </button>

                <button
                  type="button"
                  onClick={() => setSelectedRole('creator')}
                  className={`p-3.5 rounded-xl border text-left transition-all ${
                    selectedRole === 'creator'
                      ? 'bg-white border-[#B94F70] text-[#B94F70] shadow-sm ring-1 ring-[#B94F70]'
                      : 'bg-white/80 border-[#E8CCD4] text-[#715B62] hover:bg-white'
                  }`}
                >
                  <div className="flex items-center justify-between font-extrabold text-xs mb-1 text-[#251D20]">
                    <span className="flex items-center gap-1.5">
                      <Video size={15} className="text-[#B94F70]" />
                      Criadora / Professora
                    </span>
                    {selectedRole === 'creator' && <CheckCircle2 size={16} className="text-[#B94F70] fill-[#F6DDE5]" />}
                  </div>
                  <p className="text-[11px] text-[#715B62] font-medium leading-normal">
                    Crie, publique e venda suas vídeo-aulas com 85% de comissão.
                  </p>
                </button>
              </div>
            </div>

            <Input
              label="Nome de Exibição"
              icon={User}
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />

            <div>
              <label className="text-xs font-semibold uppercase tracking-wider text-zinc-700 block mb-1">
                Biografia
              </label>
              <textarea
                rows={3}
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                className="w-full bg-white border border-zinc-200 rounded-xl p-3 text-sm text-zinc-800 outline-none focus:border-[#B94F70]"
              />
            </div>

            <Input
              label="Cidade / Estado"
              icon={MapPin}
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            />

            <Input
              label="URL do Avatar / Foto"
              icon={Camera}
              value={avatarUrl}
              onChange={(e) => setAvatarUrl(e.target.value)}
            />

            <Button
              type="submit"
              variant="primary"
              fullWidth
              size="lg"
              disabled={updateProfileMutation.isPending}
              className="bg-[#B94F70] hover:bg-[#963B58] text-white font-black"
            >
              {updateProfileMutation.isPending ? 'Salvando...' : 'Salvar Alterações'}
            </Button>
          </form>
        </CardBody>
      </Card>

      {/* Danger Zone: Account Deletion */}
      <Card className="border-red-200 bg-red-50/30">
        <CardBody className="p-6 space-y-4">
          <div className="flex items-center gap-2 text-red-700 font-black text-sm">
            <AlertTriangle size={18} />
            <h2>Zona de Perigo — Exclusão de Conta</h2>
          </div>
          <p className="text-xs text-red-800/80 leading-relaxed">
            Ao excluir sua conta, seus dados de perfil serão permanentemente removidos da plataforma Fio a Fio.
          </p>
          <Button
            type="button"
            variant="danger"
            size="md"
            disabled={deleteAccountMutation.isPending}
            onClick={handleDeleteAccount}
            className="w-full sm:w-auto"
          >
            <Trash2 size={16} />
            {deleteAccountMutation.isPending ? 'Excluindo conta...' : 'Excluir Minha Conta'}
          </Button>
        </CardBody>
      </Card>
    </div>
  );
};
