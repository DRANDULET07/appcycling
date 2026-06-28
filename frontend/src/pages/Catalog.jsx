import { useEffect, useState } from 'react';
import { Bell, Heart, Sparkles } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const services = [
  {
    id: 1,
    serviceKey: 'repair',
    title: 'Ремонт & Апгрейд',
    description: 'Вернём любимой вещи свежесть, комфорт и характер без лишней траты.',
    price: 'от 5 000 ₸',
    icon: '🧵',
  },
  {
    id: 2,
    serviceKey: 'restitch',
    title: 'Полный перешив вещи',
    description: 'Обновим силуэт под новый стиль и сделаем образ завершённым.',
    price: 'от 9 500 ₸',
    icon: '✂️',
  },
  {
    id: 3,
    serviceKey: 'ai',
    title: 'Авторский ИИ-Апсайклинг',
    description: 'Соберём уникальный продукт из переработанного текстиля и материалов.',
    price: 'от 14 000 ₸',
    icon: '✨',
  },
];

const aiIdeas = [
  { id: 1, title: 'Худи', subtitle: 'Лёгкий объем и мягкий принт', badge: 'Новый', target: 'hoodie' },
  { id: 2, title: 'Джинсовка', subtitle: 'Ретро-футуризм с акцентом', badge: 'Тренд', target: 'jacket' },
  { id: 3, title: 'Куртка', subtitle: 'Премиальный апсайклинг', badge: 'Лучшее', target: 'coat' },
];

function Catalog() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState('');
  const [likedIdeas, setLikedIdeas] = useState({});
  const [showNotifications, setShowNotifications] = useState(false);
  const [aiResult, setAiResult] = useState('');

  const role = window.localStorage.getItem('appcyclingRole') || 'b2c';
  const isB2B = role === 'b2b';
  const catalogTitle = isB2B ? 'Оптовая переработка остатков текстиля' : 'Подберите подходящий сервис';
  const catalogSubtitle = isB2B
    ? 'B2B Апсайклинг партий для промышленных объемов.'
    : 'Выберите услугу для индивидуального апсайклинга и ремонта.';

  useEffect(() => {
    const timer = window.setTimeout(() => setIsLoading(false), 800);
    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!showNotifications) {
      return undefined;
    }

    const timer = window.setTimeout(() => setShowNotifications(false), 4500);
    return () => window.clearTimeout(timer);
  }, [showNotifications]);

  const handleGenerateIdeas = async () => {
    setIsGenerating(true);
    setError('');
    setAiResult('');

    try {
      // fetch logic removed for stable demo
      // const response = await fetch(`${BASE_URL}/ai/generate`, {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({
      //     prompt: 'Создай 5 ИИ-концептов для ремонта и апсайклинга одежды из переработанного текстиля',
      //   }),
      // });
      // if (!response.ok) {
      //   throw new Error('Не удалось сгенерировать идеи');
      // }
      // const data = await response.json();
      // navigate('/ai-results', {
      //   state: {
      //     generatedIdeas: data.generated_ideas ?? [],
      //   },
      // });
      setAiResult('ИИ-дизайнер рекомендует: Оливковый цвет + нашивки из переработанного денима');
    } catch (err) {
      // keep UX stable: не показываем alert и не логируем ошибки
      setError('');
    } finally {
      setIsGenerating(false);
    }
  };

  const handleSelectService = (serviceKey) => {
    navigate(`/constructor?service=${serviceKey}`);
  };

  const handleOpenNotifications = () => {
    setShowNotifications(true);
  };

  const handleOpenIdea = (item) => {
    if (item.title === 'Худи') {
      navigate('/constructor?type=hoodie&color=olive');
      return;
    }

    navigate('/constructor', {
      state: {
        selectedItem: item.title,
        selectedTarget: item.target,
      },
    });
  };

  const toggleLike = (id) => {
    setLikedIdeas((current) => ({ ...current, [id]: !current[id] }));
  };

  return (
    <div className="mx-auto flex min-h-screen max-w-md flex-col gap-4 bg-gray-50 px-4 pb-24 pt-4 shadow-xl relative">
      <div className="rounded-2xl border border-gray-100 bg-white p-4 shadow-sm">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-500">Каталог услуг</p>
            <h2 className="text-xl font-semibold text-ink">{catalogTitle}</h2>
            <p className="mt-1 text-sm text-gray-500">{catalogSubtitle}</p>
          </div>
          <button
            type="button"
            onClick={handleOpenNotifications}
            className="relative flex h-10 w-10 items-center justify-center rounded-full bg-[#f7f7ef] text-[#556B2F] transition hover:bg-[#e5f0dc]"
            aria-label="Открыть уведомления"
          >
            <Bell size={20} />
            <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-[#556B2F]" />
          </button>
        </div>
      </div>

      {showNotifications && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/50 p-4">
          <div className="bg-white rounded-2xl p-6 w-full max-w-sm shadow-xl relative">
            <button
              onClick={() => setShowNotifications(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-black font-bold"
            >
              ✕
            </button>
            <h2 className="text-xl font-bold mb-4">Уведомления</h2>
            <div className="space-y-4">
              <div className="bg-stone-50 p-3 rounded-lg">
                <p className="font-semibold text-sm">Мастер принял ваш заказ №7492 в работу!</p>
                <span className="text-xs text-gray-400">10 мин назад</span>
              </div>
              <div className="bg-stone-50 p-3 rounded-lg">
                <p className="font-semibold text-sm">ИИ сгенерировал новые идеи для вашей джинсовки.</p>
                <span className="text-xs text-gray-400">1 час назад</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {error ? (
        <div className="rounded-2xl border border-red-200 bg-red-50 p-3 text-sm text-red-700">{error}</div>
      ) : null}

      {isLoading ? (
        <div className="grid gap-3">
          {services.map((service) => (
            <div key={service.id} className="rounded-2xl border border-gray-100 bg-white p-4 shadow-sm">
              <div className="h-8 w-8 animate-pulse rounded-full bg-gray-200" />
              <div className="mt-4 h-4 w-32 animate-pulse rounded bg-gray-200" />
              <div className="mt-3 h-3 w-full animate-pulse rounded bg-gray-100" />
              <div className="mt-2 h-3 w-4/5 animate-pulse rounded bg-gray-100" />
            </div>
          ))}
        </div>
      ) : (
        <div className="grid gap-3">
          {services.map((service) => (
            <div key={service.id} className="rounded-2xl border border-gray-100 bg-white p-4 shadow-sm">
              <div className="flex items-start justify-between gap-3">
                <div className="text-3xl">{service.icon}</div>
                <div className="rounded-full bg-[#f7f7ef] px-3 py-1 text-xs font-semibold text-[#556B2F]">
                  {service.price}
                </div>
              </div>
              <h3 className="mt-3 text-lg font-semibold text-ink">{service.title}</h3>
              <p className="mt-2 text-sm text-gray-600">{service.description}</p>
              <button
                type="button"
                onClick={() => handleSelectService(service.serviceKey)}
                className="mt-4 w-full rounded-2xl bg-[#556B2F] px-4 py-2.5 text-sm font-semibold text-white"
              >
                Выбрать услугу
              </button>
            </div>
          ))}
        </div>
      )}

      <div className="rounded-2xl border border-gray-100 bg-white p-4 shadow-sm">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-semibold text-ink">Популярные идеи от ИИ</p>
            <p className="text-sm text-gray-500">Тапай по сердцу, чтобы сохранить фавориты</p>
          </div>
          <div className="rounded-full bg-[#f7f7ef] p-2 text-[#556B2F]">
            <Sparkles size={16} />
          </div>
        </div>

        <div className="mt-3 flex gap-3 overflow-x-auto pb-1">
          {aiIdeas.map((idea) => {
            const isLiked = Boolean(likedIdeas[idea.id]);
            return (
              <div key={idea.id} className="min-w-[160px] rounded-2xl border border-[#eef4db] bg-[#f7f7ef] p-3">
                <div className="flex items-center justify-between">
                  <span className="rounded-full bg-white px-2 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-[#556B2F]">
                    {idea.badge}
                  </span>
                  <button
                    type="button"
                    onClick={() => toggleLike(idea.id)}
                    className="rounded-full p-1.5 transition"
                  >
                    <Heart
                      size={16}
                      className={isLiked ? 'fill-[#556B2F] text-[#556B2F]' : 'text-gray-400'}
                    />
                  </button>
                </div>
                <h4 className="mt-3 text-sm font-semibold text-ink">{idea.title}</h4>
                <p className="mt-1 text-xs text-gray-600">{idea.subtitle}</p>
                <button
                  type="button"
                  onClick={() => handleOpenIdea(idea)}
                  className="mt-3 rounded-full border border-[#556B2F] px-3 py-1 text-xs font-semibold text-[#556B2F]"
                >
                  Смотреть
                </button>
              </div>
            );
          })}
        </div>
      </div>

      {aiResult ? (
        <div className="mt-4 rounded-2xl border border-[#eef4db] bg-[#f7faf0] p-4 text-sm text-[#33402a]">
          <p className="font-semibold text-[#111827]">{aiResult}</p>
        </div>
      ) : null}

      <button
        onClick={handleGenerateIdeas}
        disabled={isGenerating}
        className="fixed bottom-24 right-6 flex h-14 w-14 items-center justify-center rounded-full bg-[#556B2F] text-white shadow-lg disabled:opacity-70"
      >
        {isGenerating ? (
          <span className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent" />
        ) : (
          <Sparkles size={20} />
        )}
      </button>
    </div>
  );
}

export default Catalog;
