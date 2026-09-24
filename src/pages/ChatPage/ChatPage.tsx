import { useState } from 'react';
import { getCredentials } from 'api/greenApi';
import { CreateChat } from './CreateChat';
import { ChatWindow } from './ChatWindow';

export const ChatPage = () => {
  const [phone, setPhone] = useState('');
  const [credentials] = useState(() => getCredentials());

  if (!credentials) return null;

  return (
    <div className="min-h-screen bg-[#17212b] flex items-center justify-center px-4">
      {!phone ? (
        <CreateChat onCreateChat={setPhone} />
      ) : (
        <ChatWindow
          key={phone}
          phone={phone}
          credentials={credentials}
          onBack={() => setPhone('')}
        />
      )}
    </div>
  );
};
