import React, { createContext, useContext, useState } from 'react';
import { getUsers } from '../services/api';
import { useApiData } from '../hooks/useApiData';

const RoleContext = createContext();

export const RoleProvider = ({ children }) => {
  // 'guest' | 'user' | 'creator' | 'admin'
  const [currentRole, setCurrentRole] = useState(() => localStorage.getItem('fioafio_role') || 'user');
  const [currentUserId, setCurrentUserId] = useState(() => localStorage.getItem('fioafio_userId') || 'usr-1');
  const { data: users = [], isLoading, isError } = useApiData('users', getUsers);

  const currentUser = users.find(user => user.id === currentUserId) || users.find(user => user.role === currentRole) || {
    id: null,
    name: 'Visitante',
    role: 'guest',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    username: 'visitante'
  };

  const switchRole = (role) => {
    setCurrentRole(role);
    localStorage.setItem('fioafio_role', role);
    if (role !== 'guest') {
      const roleUser = users.find(user => user.role === role);
      if (roleUser) {
        setCurrentUserId(roleUser.id);
        localStorage.setItem('fioafio_userId', roleUser.id);
      }
    } else {
      localStorage.removeItem('fioafio_userId');
    }
  };

  const selectUser = (user) => {
    if (!user) {
      setCurrentUserId(null);
      setCurrentRole('guest');
      localStorage.removeItem('fioafio_userId');
      localStorage.setItem('fioafio_role', 'guest');
      return;
    }
    setCurrentUserId(user.id);
    setCurrentRole(user.role);
    localStorage.setItem('fioafio_userId', user.id);
    localStorage.setItem('fioafio_role', user.role);
  };

  const updateCurrentRole = (role) => {
    setCurrentRole(role);
    localStorage.setItem('fioafio_role', role);
  };

  if (isLoading) return <div className="p-8 text-center" role="status">Conectando à API local do Fio a Fio…</div>;
  if (isError) return <div className="p-8 text-center" role="alert">Não foi possível acessar a API mock. Inicie o JSON Server com <code>npm run dev --prefix backend</code>.</div>;

  return (
    <RoleContext.Provider value={{ currentRole, currentUser, switchRole, selectUser, updateCurrentRole }}>
      {children}
    </RoleContext.Provider>
  );
};

export const useRole = () => useContext(RoleContext);
