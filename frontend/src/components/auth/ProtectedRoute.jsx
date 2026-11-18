import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useRole } from '../../context/RoleContext';

export const ProtectedRoute = ({ children }) => {
  const { currentRole, currentUser } = useRole();
  const location = useLocation();

  const isLogged = currentRole !== 'guest' && Boolean(currentUser?.id);

  if (!isLogged) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
};
