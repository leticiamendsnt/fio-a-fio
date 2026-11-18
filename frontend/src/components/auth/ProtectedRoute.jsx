import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useRole } from '../../context/RoleContext';

export const ProtectedRoute = ({ children, requiredRole }) => {
  const { currentRole, currentUser } = useRole();
  const location = useLocation();

  const isLogged = currentRole !== 'guest' && Boolean(currentUser?.id);

  if (!isLogged) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (requiredRole) {
    const rolesAllowed = Array.isArray(requiredRole) ? requiredRole : [requiredRole];
    const hasRole = rolesAllowed.includes(currentRole);
    if (!hasRole) {
      // Redireciona para o feed caso o usuário não tenha o perfil exigido
      return <Navigate to="/feed" replace />;
    }
  }

  return children;
};
