import { useState, type SubmitEvent } from 'react';

interface AuthFormProps {
  onAuth: () => void;
}

export const AuthForm = ({ onAuth }: AuthFormProps) => {
  const [apiUrl, setApiUrl] = useState('');
  const [idInstance, setIdInstance] = useState('');
  const [apiToken, setApiToken] = useState('');

  const handleSubmit = (e: SubmitEvent) => {
    e.preventDefault();
    if (!idInstance.trim() || !apiToken.trim() || !apiUrl.trim()) return;

    const credentials = {
      idInstance: idInstance.trim(),
      apiToken: apiToken.trim(),
      apiUrl: apiUrl.trim(),
    };
    sessionStorage.setItem('greenApiCredentials', JSON.stringify(credentials));
    onAuth();
  };

  return (
    <form
      autoComplete="on"
      onSubmit={handleSubmit}
      className="w-full max-w-sm bg-[#242f3d] rounded-2xl p-8 shadow-2xl flex flex-col gap-6"
    >
      <div className="text-center">
        <h1 className="text-white text-2xl font-semibold mb-1">Вход</h1>
        <p className="text-[#7f91a4] text-md">Введите данные из GREEN-API</p>
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="apiUrl" className="text-[#7f91a4] text-md">
          Api Url
        </label>
        <input
          id="apiUrl"
          type="text"
          value={apiUrl}
          onChange={(e) => setApiUrl(e.target.value)}
          placeholder="Вставьте ссылку на ваш api"
          className="bg-[#17212b] text-white rounded-lg px-4 py-3 outline-none border border-transparent focus:border-[#5288c1] transition-colors placeholder:text-[#5d6b7a]"
        />
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="idInstance" className="text-[#7f91a4] text-md">
          idInstance
        </label>
        <input
          id="idInstance"
          type="text"
          value={idInstance}
          onChange={(e) => setIdInstance(e.target.value)}
          placeholder="Вставьте id"
          className="bg-[#17212b] text-white rounded-lg px-4 py-3 outline-none border border-transparent focus:border-[#5288c1] transition-colors placeholder:text-[#5d6b7a]"
        />
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="apiToken" className="text-[#7f91a4] text-md">
          apiTokenInstance
        </label>
        <input
          id="apiToken"
          type="password"
          value={apiToken}
          onChange={(e) => setApiToken(e.target.value)}
          placeholder="Вставьте токен"
          className="bg-[#17212b] text-white rounded-lg px-4 py-3 outline-none border border-transparent focus:border-[#5288c1] transition-colors placeholder:text-[#5d6b7a]"
        />
      </div>

      <button
        type="submit"
        disabled={!idInstance.trim() || !apiToken.trim()}
        className="bg-[#5288c1] hover:bg-[#4a7ab0] disabled:bg-[#3a4a5a] disabled:cursor-not-allowed text-white font-medium rounded-lg py-3 transition-colors"
      >
        Войти
      </button>
    </form>
  );
};
