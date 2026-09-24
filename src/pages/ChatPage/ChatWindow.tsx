import { useEffect, useRef, useState } from 'react';
import {
  deleteNotification,
  receiveNotification,
  sendMessage,
  type GreenApiCredentials,
} from 'api/greenApi';
import { ArrowLeft, Send, User } from 'lucide-react';

interface ChatWindowProps {
  phone: string;
  credentials: GreenApiCredentials;
  onBack: () => void;
}

export const ChatWindow = ({ phone, credentials, onBack }: ChatWindowProps) => {
  const [messageText, setMessageText] = useState('');
  const [messages, setMessages] = useState<
    {
      id: string;
      text: string;
      sender: 'me' | 'other';
    }[]
  >([]);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [chatName, setChatName] = useState(phone);

  const handleSendMessage = async () => {
    if (!messageText.trim()) return;

    const text = messageText.trim();

    try {
      await sendMessage({
        credentials,
        phone,
        message: text,
      });

      setMessages((prev) => [
        ...prev,
        {
          id: Date.now().toString(),
          text,
          sender: 'me',
        },
      ]);

      setMessageText('');
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    let isMounted = true;

    const listenMessages = async () => {
      while (isMounted) {
        try {
          const notification = await receiveNotification(credentials);

          if (!notification) continue;

          if (notification.body?.typeWebhook === 'incomingMessageReceived') {
            const text = notification.body.messageData?.textMessageData?.textMessage;
            const name = notification.body.senderData?.chatName;

            if (name) {
              setChatName(name);
            }

            if (text) {
              setMessages((prev) => {
                const exists = prev.some(
                  (message) => message.id === notification.receiptId.toString(),
                );

                if (exists) return prev;

                return [
                  ...prev,
                  {
                    id: notification.receiptId.toString(),
                    text,
                    sender: 'other',
                  },
                ];
              });
            }
          }

          if (isMounted) {
            await deleteNotification(credentials, notification.receiptId);
          }
        } catch (error) {
          console.error(error);

          await new Promise((resolve) => setTimeout(resolve, 1000));
        }
      }
    };

    listenMessages();

    return () => {
      isMounted = false;
    };
  }, [credentials]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({
      behavior: 'smooth',
    });
  }, [messages]);

  return (
    <div className="w-full max-w-4xl h-[80vh] bg-[#242f3d] rounded-2xl shadow-2xl overflow-hidden flex flex-col">
      <div className="h-16 border-b border-[#34404d] flex items-center px-5 gap-3 bg-[#242f3d]">
        <button
          onClick={onBack}
          className="w-9 h-9 rounded-full hover:bg-[#34404d] transition-colors flex items-center justify-center text-white text-xl"
          aria-label="Назад"
        >
          <ArrowLeft size={22} />
        </button>

        <div className="w-10 h-10 rounded-full bg-[#5288c1] flex items-center justify-center text-white font-semibold">
          <User size={20} />
        </div>

        <div>
          <p className="text-white font-medium">{chatName}</p>
          <p className="text-[#7f91a4] text-sm">Telegram</p>
        </div>
      </div>

      <div className="flex-1 bg-[#17212b] p-4 overflow-y-auto">
        {messages.length === 0 ? (
          <div className="h-full flex items-center justify-center">
            <p className="text-[#7f91a4] text-lg">Начните переписку</p>
          </div>
        ) : (
          <div className="flex flex-col gap-3">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`max-w-[70%] rounded-2xl px-4 py-3 ${
                  message.sender === 'me'
                    ? 'self-end bg-[#5288c1] text-white'
                    : 'self-start bg-[#34404d] text-white'
                }`}
              >
                {message.text}
              </div>
            ))}

            <div ref={messagesEndRef} />
          </div>
        )}
      </div>

      <div className="p-4 border-t border-[#34404d] bg-[#242f3d]">
        <div className="flex gap-3">
          <input
            type="text"
            value={messageText}
            onChange={(e) => setMessageText(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault();
                handleSendMessage();
              }
            }}
            placeholder="Введите сообщение..."
            className="flex-1 bg-[#17212b] text-white rounded-full px-5 py-3 outline-none border border-transparent focus:border-[#5288c1] transition-colors placeholder:text-[#7f91a4]"
          />

          <button
            onClick={handleSendMessage}
            className="w-12 h-12 rounded-full bg-[#5288c1] text-white text-xl hover:bg-[#4a7ab0] transition-colors flex items-center justify-center"
          >
            <Send size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};
