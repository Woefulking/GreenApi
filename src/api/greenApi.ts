export interface GreenApiCredentials {
  idInstance: string;
  apiToken: string;
  apiUrl: string;
}

interface SendMessageParams {
  credentials: GreenApiCredentials;
  phone: string;
  message: string;
}

export const getCredentials = (): GreenApiCredentials | null => {
  const saved = sessionStorage.getItem('greenApiCredentials');

  if (!saved) return null;

  try {
    return JSON.parse(saved);
  } catch {
    return null;
  }
};

export const sendMessage = async ({ credentials, phone, message }: SendMessageParams) => {
  const response = await fetch(
    `${credentials.apiUrl}/waInstance${credentials.idInstance}/sendMessage/${credentials.apiToken}`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        chatId: `${phone}@c.us`,
        message,
      }),
    },
  );

  if (!response.ok) {
    throw new Error('Не удалось отправить сообщение');
  }

  return response.json();
};

export const receiveNotification = async (credentials: GreenApiCredentials, receiveTimeout = 5) => {
  const response = await fetch(
    `${credentials.apiUrl}/waInstance${credentials.idInstance}/receiveNotification/${credentials.apiToken}?receiveTimeout=${receiveTimeout}`,
  );

  if (!response.ok) {
    throw new Error('Не удалось получить уведомления');
  }

  return response.json();
};

export const deleteNotification = async (credentials: GreenApiCredentials, receiptId: number) => {
  await fetch(
    `${credentials.apiUrl}/waInstance${credentials.idInstance}/deleteNotification/${credentials.apiToken}/${receiptId}`,
    {
      method: 'DELETE',
    },
  );
};
