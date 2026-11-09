import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Card, CardBody } from '../../components/ui/Card';
import { Input } from '../../components/ui/Input';
import { Button } from '../../components/ui/Button';
import { Logo } from '../../components/ui/Logo';
import { User, Mail, Lock, UserPlus } from 'lucide-react';
import { useRole } from '../../context/RoleContext';
import { createRecord, getUsers } from '../../services/api';

const registerSchema = z.object({
  name: z.string().min(2, 'O nome deve ter pelo menos 2 caracteres.'),
  username: z
    .string()
    .min(3, 'O nome de usuário deve ter pelo menos 3 caracteres.')
    .regex(/^[a-zA-Z0-9_.-]+$/, 'Apenas letras, números, traço, ponto e underline.'),
  email: z.string().min(1, 'O e-mail é obrigatório.').email('Formato de e-mail inválido.'),
  password: z.string().min(4, 'A senha deve ter pelo menos 4 caracteres.'),
  isCreator: z.boolean().default(false),
});

export const RegisterPage = () => {
  const navigate = useNavigate();
  const { selectUser } = useRole();
  const queryClient = useQueryClient();
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: '',
      username: '',
      email: '',
      password: '',
      isCreator: false,
    },
  });

  const registerMutation = useMutation({
    mutationFn: async (formData) => {
      const users = await getUsers();
      const username = formData.username.trim().replace(/^@/, '');
      if (users.some((user) => user.email.toLowerCase() === formData.email.trim().toLowerCase())) {
        throw new Error('Este e-mail já está cadastrado.');
      }
      if (users.some((user) => user.username.toLowerCase() === username.toLowerCase())) {
        throw new Error('Este nome de usuário já está em uso.');
      }
      const createdUser = await createRecord('users', {
        name: formData.name.trim(),
        username,
        email: formData.email.trim().toLowerCase(),
        password: formData.password,
        role: formData.isCreator ? 'creator' : 'user',
        joinedDate: new Intl.DateTimeFormat('pt-BR', { month: 'long', year: 'numeric' }).format(new Date()),
      });
      return { createdUser, users };
    },
    onSuccess: ({ createdUser, users }) => {
      queryClient.setQueryData(['users'], [...users, createdUser]);
      queryClient.invalidateQueries({ queryKey: ['users'] });
      selectUser(createdUser);
      setMessage('Conta criada com carinho! Redirecionando...');
      setTimeout(() => navigate('/feed'), 800);
    },
    onError: (createError) => {
      setError(createError.message || 'Não foi possível criar a conta. Verifique se o JSON Server está ativo.');
    },
  });

  const onSubmit = (data) => {
    setError('');
    setMessage('');
    registerMutation.mutate(data);
  };

  return (
    <div className="max-w-md mx-auto py-8 px-4 animate-fade-in">
      <Card className="shadow-craft border-[#E8CCD4] bg-white">
        <CardBody className="p-8 space-y-6">
          <div className="text-center space-y-3">
            <div className="flex justify-center mb-2">
              <Logo size="lg" showText={false} />
            </div>
            <h1 className="text-2xl font-black text-[#251D20]">Criar Minha Conta</h1>
            <p className="text-xs font-medium text-[#715B62]">
              Faça parte da maior comunidade de crochê e artesanato.
            </p>
          </div>

          {message && (
            <div className="p-3.5 bg-[#F6DDE5] border border-[#D98CA1] text-[#B94F70] text-xs font-extrabold rounded-2xl text-center">
              {message}
            </div>
          )}
          {error && (
            <div role="alert" className="p-3.5 bg-red-50 border border-red-200 text-red-700 text-xs font-bold rounded-2xl text-center">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
            <Input
              label="Nome Completo"
              icon={User}
              placeholder="Maria das Dores"
              error={errors.name?.message}
              {...register('name')}
            />

            <Input
              label="Nome de Usuário (@username)"
              icon={User}
              placeholder="mariacroche"
              error={errors.username?.message}
              {...register('username')}
            />

            <Input
              label="E-mail"
              type="email"
              icon={Mail}
              placeholder="seuemail@exemplo.com"
              error={errors.email?.message}
              {...register('email')}
            />

            <Input
              label="Senha"
              type="password"
              icon={Lock}
              placeholder="••••••••"
              error={errors.password?.message}
              {...register('password')}
            />

            <label className="flex items-center gap-2.5 p-3.5 bg-[#F6DDE5]/70 rounded-2xl border border-[#E8CCD4] cursor-pointer hover:bg-[#F6DDE5] transition-all">
              <input
                type="checkbox"
                className="w-4 h-4 text-[#B94F70] rounded-md focus:ring-[#B94F70] accent-[#B94F70]"
                {...register('isCreator')}
              />
              <span className="text-xs font-bold text-[#251D20]">
                Desejo também vender minhas vídeo-aulas (Perfil de Criador)
              </span>
            </label>

            <Button
              type="submit"
              variant="primary"
              fullWidth
              size="lg"
              disabled={registerMutation.isPending}
              className="bg-[#B94F70] text-white"
            >
              <UserPlus size={18} />
              {registerMutation.isPending ? 'Criando conta...' : 'Concluir Cadastro'}
            </Button>
          </form>

          <div className="pt-4 border-t border-[#E8CCD4] text-center text-xs text-[#715B62]">
            Já possui uma conta?{' '}
            <Link to="/login" className="font-extrabold text-[#B94F70] hover:underline">
              Fazer login
            </Link>
          </div>
        </CardBody>
      </Card>
    </div>
  );
};
