import { useState, type SubmitEvent } from 'react';

interface CreateChatProps {
  onCreateChat: (phone: string) => void;
}

export const CreateChat = ({ onCreateChat }: CreateChatProps) => {
  const [phone, setPhone] = useState('');

  const handleSubmit = (e: SubmitEvent) => {
    e.preventDefault();

    const formattedPhone = phone.replace(/\D/g, '').replace(/^8/, '7');
    if (!formattedPhone) return;

    onCreateChat(formattedPhone);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full max-w-sm bg-[#242f3d] rounded-2xl p-8 shadow-2xl flex flex-col gap-6"
    >
      <div className="text-center">
        <h1 className="text-white text-2xl font-semibold mb-1">Создать чат</h1>
        <p className="text-[#7f91a4] text-md">Введите номер телефона получателя</p>
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="phone" className="text-[#7f91a4] text-md">
          Номер телефона
        </label>

        <input
          id="phone"
          type="text"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          placeholder="Введите номер телефона"
          autoComplete="tel"
          className="bg-[#17212b] text-white rounded-lg px-4 py-3 outline-none border border-transparent focus:border-[#5288c1] transition-colors placeholder:text-[#5d6b7a]"
        />
      </div>

      <button
        type="submit"
        disabled={!phone.trim()}
        className="bg-[#5288c1] hover:bg-[#4a7ab0] disabled:bg-[#3a4a5a] disabled:cursor-not-allowed text-white font-medium rounded-lg py-3 transition-colors"
      >
        Открыть чат
      </button>
    </form>
  );
};
