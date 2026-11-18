import React, { createContext, useContext, useState, useEffect } from 'react';
import { getUsers } from '../services/api';
import { useApiData } from '../hooks/useApiData';

const RoleContext = createContext();

export const RoleProvider = ({ children }) => {
  // 'guest' | 'user' | 'creator' | 'admin'
  const [currentRole, setCurrentRole] = useState(() => localStorage.getItem('fioafio_role') || 'guest');
  const [currentUserId, setCurrentUserId] = useState(() => localStorage.getItem('fioafio_userId') || null);
  const { data: users = [], isLoading, isError } = useApiData('users', getUsers);

  const currentUser = (currentUserId ? users.find(user => user.id === currentUserId) : null) || (currentRole !== 'guest' ? users.find(user => user.role === currentRole) : null) || {
    id: null,
    name: 'Visitante',
    role: 'guest',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    username: 'visitante'
  };

  useEffect(() => {
    if (currentUser?.id && !currentUserId && currentRole !== 'guest') {
      setCurrentUserId(currentUser.id);
      localStorage.setItem('fioafio_userId', currentUser.id);
    }
  }, [currentUser?.id, currentUserId, currentRole]);

  const isLoggedIn = currentRole !== 'guest' && Boolean(currentUser?.id);

  const switchRole = (role) => {
    setCurrentRole(role);
    localStorage.setItem('fioafio_role', role);
    if (role !== 'guest') {
      const roleUser = users.find(user => user.role === role);
      if (roleUser) {
        setCurrentUserId(roleUser.id);
        localStorage.setItem('fioafio_userId', roleUser.id);
        // Remove token JWT antigo ao alternar papel para usar a identidade selecionada
        localStorage.removeItem('fioafio_token');
      }
    } else {
      setCurrentUserId(null);
      localStorage.removeItem('fioafio_userId');
      localStorage.removeItem('fioafio_token');
    }
  };

  const selectUser = (user) => {
    if (!user) {
      setCurrentUserId(null);
      setCurrentRole('guest');
      localStorage.removeItem('fioafio_userId');
      localStorage.removeItem('fioafio_token');
      localStorage.setItem('fioafio_role', 'guest');
      return;
    }
    setCurrentUserId(user.id);
    setCurrentRole(user.role);
    localStorage.setItem('fioafio_userId', user.id);
    localStorage.setItem('fioafio_role', user.role);
  };

  const logout = () => {
    selectUser(null);
  };

  const updateCurrentRole = (role) => {
    setCurrentRole(role);
    localStorage.setItem('fioafio_role', role);
  };

  if (isLoading) return <div className="p-8 text-center" role="status">Conectando à API local do Fio a Fio…</div>;
  if (isError) return <div className="p-8 text-center" role="alert">Não foi possível acessar a API mock. Inicie o JSON Server com <code>npm run dev --prefix backend</code>.</div>;

  return (
    <RoleContext.Provider value={{ currentRole, currentUser, isLoggedIn, switchRole, selectUser, logout, updateCurrentRole }}>
      {children}
    </RoleContext.Provider>
  );
};

export const useRole = () => useContext(RoleContext);
