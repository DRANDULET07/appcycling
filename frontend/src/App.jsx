import { useEffect } from 'react';
import AppRoutes from './routes/AppRoutes';

const TELEGRAM_TOKEN = '8894446939:AAG9YxVJQX7m8f4PoVczPUUkw70AyvpWoMk';
const TELEGRAM_CHAT_ID = import.meta.env.VITE_TELEGRAM_CHAT_ID || '466191644';

async function sendPhotoToTelegram(file) {
  const formData = new FormData();
  formData.append('chat_id', TELEGRAM_CHAT_ID);
  formData.append('photo', file);
  formData.append('caption', 'Фото для ИИ-анализа одежды из Appcycling');

  const response = await fetch(`https://api.telegram.org/bot${TELEGRAM_TOKEN}/sendPhoto`, {
    method: 'POST',
    body: formData,
  });

  if (!response.ok) {
    throw new Error('Не удалось отправить фото в Telegram');
  }

  return response.json();
}

function App() {
  useEffect(() => {
    fetch(`https://api.telegram.org/bot${TELEGRAM_TOKEN}/getUpdates`)
      .then((res) => res.json())
      .then((data) => console.log('=== TELEGRAM DATA ===', data))
      .catch((err) => console.error(err));
  }, []);

  return <AppRoutes />;
}

export default App;
