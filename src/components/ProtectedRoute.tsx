import { Navigate } from 'react-router-dom';
import type { ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

export const ProtectedRoute = ({ children }: Props) => {
  const credentials = localStorage.getItem('greenApiCredentials');

  if (!credentials) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
};
