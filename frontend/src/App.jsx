import { useEffect } from 'react';
import AppRoutes from './routes/AppRoutes';

const TELEGRAM_TOKEN = import.meta.env.VITE_TELEGRAM_TOKEN;
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
    if (!TELEGRAM_TOKEN) {
      console.warn('VITE_TELEGRAM_TOKEN не настроен для getUpdates');
      return;
    }

    fetch(`https://api.telegram.org/bot${TELEGRAM_TOKEN}/getUpdates`)
      .then((res) => res.json())
      .then((data) => console.log('=== TELEGRAM DATA ===', data))
      .catch((err) => console.error(err));
  }, []);

  return <AppRoutes />;
}

export default App;
