import { createBrowserRouter } from 'react-router-dom';
import { ProtectedRoute } from 'components/ProtectedRoute';
import { AuthPage } from 'pages/AuthPage/AuthPage';
import { ChatPage } from 'pages/ChatPage/ChatPage';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <AuthPage />,
  },
  {
    path: '/chat',
    element: (
      <ProtectedRoute>
        <ChatPage />
      </ProtectedRoute>
    ),
  },
]);
