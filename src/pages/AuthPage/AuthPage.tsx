import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthForm } from './AuthForm';

export const AuthPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const credentials = sessionStorage.getItem('greenApiCredentials');
    if (credentials) {
      navigate('/chat', { replace: true });
    }
  }, [navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#17212b] px-4">
      <AuthForm onAuth={() => navigate('/chat')} />
    </div>
  );
};
