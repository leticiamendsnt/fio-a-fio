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
import { Mail, Lock, LogIn } from 'lucide-react';
import { useRole } from '../../context/RoleContext';
import { getUsers } from '../../services/api';

const loginSchema = z.object({
  email: z.string().min(1, 'O e-mail é obrigatório.').email('Formato de e-mail inválido.'),
  password: z.string().min(1, 'A senha é obrigatória.'),
});

export const LoginPage = () => {
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
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const loginMutation = useMutation({
    mutationFn: async ({ email, password }) => {
      const users = await getUsers();
      const user = users.find(
        (item) => item.email.toLowerCase() === email.trim().toLowerCase() && item.password === password
      );
      if (!user) {
        throw new Error('E-mail ou senha inválidos.');
      }
      if (user.isSuspended) {
        throw new Error('Esta conta está suspensa. Entre em contato com a equipe Fio a Fio.');
      }
      return { user, users };
    },
    onSuccess: ({ user, users }) => {
      queryClient.setQueryData(['users'], users);
      selectUser(user);
      setError('');
      setMessage('Login realizado com carinho! Bem-vinda de volta 🧶');
      setTimeout(() => navigate('/feed'), 600);
    },
    onError: (loginError) => {
      setMessage('');
      setError(loginError.message || 'Não foi possível acessar as contas.');
    },
  });

  const onSubmit = (data) => {
    setError('');
    setMessage('');
    loginMutation.mutate(data);
  };

  return (
    <div className="max-w-md mx-auto py-12 px-4 animate-fade-in">
      <Card className="shadow-craft border-[#E8CCD4] bg-white">
        <CardBody className="p-8 space-y-6">
          <div className="text-center space-y-3">
            <div className="flex justify-center mb-2">
              <Logo size="lg" showText={false} />
            </div>
            <h1 className="text-2xl font-black text-[#251D20]">Entrar no Fio a Fio</h1>
            <p className="text-xs font-medium text-[#715B62]">
              Acesse sua conta para ver projetos, vídeos e interagir com a comunidade.
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

            <Button
              type="submit"
              variant="primary"
              fullWidth
              size="lg"
              disabled={loginMutation.isPending}
              className="bg-[#B94F70] text-white"
            >
              <LogIn size={18} />
              {loginMutation.isPending ? 'Verificando...' : 'Entrar'}
            </Button>
          </form>

          <div className="pt-4 border-t border-[#E8CCD4] text-center text-xs text-[#715B62]">
            Ainda não possui uma conta?{' '}
            <Link to="/cadastro" className="font-extrabold text-[#B94F70] hover:underline">
              Criar conta
            </Link>
          </div>
        </CardBody>
      </Card>
    </div>
  );
};
