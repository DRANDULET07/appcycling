import { useEffect, useRef, useState } from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { Camera, Home, Leaf, Palette } from 'lucide-react';

const tabs = [
  { to: '/catalog', label: 'Каталог', icon: Home },
  { to: '/eco-impact', label: 'Эко', icon: Leaf },
  { to: '/constructor', label: 'Конструктор', icon: Palette },
];

const TELEGRAM_BOT_TOKEN = '8894446939:AAG9YxVJQX7m8f4PoVczPUUkw70AyvpWoMk';
const TELEGRAM_CHAT_ID = '466191644';

async function sendPhotoToTelegram(file) {
  const formData = new FormData();
  formData.append('chat_id', TELEGRAM_CHAT_ID);
  formData.append('photo', file);
  formData.append('caption', 'Фото для ИИ-анализа одежды из Appcycling');

  const response = await fetch(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendPhoto`, {
    method: 'POST',
    body: formData,
  });

  if (!response.ok) {
    throw new Error('Не удалось отправить фото в Telegram');
  }

  return response.json();
}

function MainLayout() {
  const navigate = useNavigate();
  const fileInputRef = useRef(null);
  const [isAiChatOpen, setIsAiChatOpen] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [aiMessage, setAiMessage] = useState('');

  useEffect(() => {
    if (!isAiChatOpen) {
      return undefined;
    }

    setIsAnalyzing(true);
    setAiMessage('');

    const timer = window.setTimeout(() => {
      setIsAnalyzing(false);
      setAiMessage(
        'Вижу вашу вещь! Это отличная джинсовая куртка, но ткань немного потерта на локтях. Предлагаю сделать апсайклинг: добавить кастомный элемент на спину и заменить фурнитуру.',
      );
    }, 3000);

    return () => window.clearTimeout(timer);
  }, [isAiChatOpen]);

  const openCameraPicker = () => {
    fileInputRef.current?.click();
  };

  const handlePhotoChange = (event) => {
    const file = event.target.files?.[0];

    if (!file) {
      return;
    }

    setIsAiChatOpen(true);
    sendPhotoToTelegram(file).catch((error) => {
      console.error(error);
    });
  };

  const goToConstructor = () => {
    setIsAiChatOpen(false);
    navigate('/constructor');
  };

  const tryAnotherPhoto = () => {
    setIsAiChatOpen(false);
    setAiMessage('');

    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }

    window.setTimeout(openCameraPicker, 120);
  };

  return (
    <div className="min-h-screen bg-white pb-24 text-ink">
      <main className="px-4 py-4 sm:px-6">
        <Outlet />
      </main>

      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        capture="environment"
        className="hidden"
        onChange={handlePhotoChange}
      />

      <nav className="fixed bottom-0 left-0 right-0 border-t border-gray-200 bg-white px-3 py-3 shadow-sm">
        <div className="mx-auto flex max-w-5xl items-center justify-between">
          {tabs.slice(0, 2).map(({ to, label, icon: Icon }) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) =>
                `flex flex-col items-center gap-1 rounded-xl px-3 py-2 text-xs ${isActive ? 'text-[#556B2F]' : 'text-gray-500'}`
              }
            >
              <Icon size={18} />
              <span>{label}</span>
            </NavLink>
          ))}

          <button
            type="button"
            onClick={openCameraPicker}
            className="-mt-4 rounded-full bg-[#556B2F] p-4 text-white shadow-lg transition hover:bg-[#4a5d29] focus:outline-none focus:ring-4 focus:ring-[#556B2F]/25"
            aria-label="Сфотографировать вещь для ИИ-анализа"
          >
            <Camera size={26} strokeWidth={2.4} />
          </button>

          {tabs.slice(2).map(({ to, label, icon: Icon }) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) =>
                `flex flex-col items-center gap-1 rounded-xl px-3 py-2 text-xs ${isActive ? 'text-[#556B2F]' : 'text-gray-500'}`
              }
            >
              <Icon size={18} />
              <span>{label}</span>
            </NavLink>
          ))}
        </div>
      </nav>

      {isAiChatOpen && (
        <div className="fixed inset-0 z-50 flex flex-col bg-[#f6f4ee] text-ink">
          <div className="border-b border-[#d9d2c0] bg-white px-5 py-4 shadow-sm">
            <p className="text-sm text-gray-500">ИИ-Ассистент Appcycling</p>
            <h2 className="text-lg font-semibold text-[#2f3a1c]">Анализ одежды по фото</h2>
          </div>

          <div className="flex-1 overflow-y-auto px-5 py-6">
            <div className="max-w-xl">
              <div className="mb-4 inline-flex rounded-2xl rounded-tl-sm bg-white px-4 py-3 shadow-sm">
                <p className="text-sm leading-6 text-gray-700">
                  Загрузила фото. Сейчас посмотрю материал, состояние и идеи для апсайклинга.
                </p>
              </div>

              {isAnalyzing && (
                <div className="flex items-center gap-3 rounded-2xl rounded-tl-sm bg-white px-4 py-3 shadow-sm">
                  <span className="h-5 w-5 animate-spin rounded-full border-2 border-[#556B2F]/20 border-t-[#556B2F]" />
                  <span className="text-sm font-medium text-[#556B2F]">ИИ анализирует ваше фото...</span>
                </div>
              )}

              {aiMessage && (
                <div className="rounded-2xl rounded-tl-sm bg-white px-4 py-4 shadow-sm">
                  <p className="text-sm leading-6 text-gray-700">{aiMessage}</p>
                </div>
              )}
            </div>
          </div>

          {aiMessage && (
            <div className="border-t border-[#d9d2c0] bg-white px-5 py-4 shadow-[0_-8px_24px_rgba(33,33,33,0.06)]">
              <div className="mx-auto flex max-w-xl flex-col gap-3 sm:flex-row">
                <button
                  type="button"
                  onClick={goToConstructor}
                  className="flex-1 rounded-xl bg-[#556B2F] px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-[#4a5d29] focus:outline-none focus:ring-4 focus:ring-[#556B2F]/25"
                >
                  Перейти в конструктор
                </button>
                <button
                  type="button"
                  onClick={tryAnotherPhoto}
                  className="flex-1 rounded-xl border border-[#c9c0aa] bg-white px-5 py-3 text-sm font-semibold text-[#556B2F] transition hover:bg-[#f7f3ea] focus:outline-none focus:ring-4 focus:ring-[#556B2F]/20"
                >
                  Попробовать другое фото
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default MainLayout;
