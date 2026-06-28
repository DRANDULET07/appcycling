import { useEffect, useMemo, useState } from 'react';
import { Award, ChevronDown, ChevronUp, Droplet, Leaf, Scale, Share2, Sparkles } from 'lucide-react';

const achievements = [
  {
    id: 'first',
    title: 'Первый шаг',
    description: 'Вы готовы сдать хотя бы одну вещь и уже запускаете цикл повторного использования.',
    threshold: 1,
  },
  {
    id: 'planet',
    title: 'Спаситель планеты',
    description: 'Пять вещей превращают личный вклад в заметную экономию ресурсов.',
    threshold: 5,
  },
  {
    id: 'master',
    title: 'Эко-мастер',
    description: 'Максимальный вклад: медали активированы, прогресс закрыт на 100%.',
    threshold: 5,
  },
];

const formatNumber = (value) =>
  Number.isInteger(value) ? value.toLocaleString('ru-RU') : value.toLocaleString('ru-RU', { maximumFractionDigits: 1 });

function EcoImpact() {
  const role = window.localStorage.getItem('appcyclingRole') || 'b2c';
  const isB2B = role === 'b2b';
  const [itemsCount, setItemsCount] = useState(1);
  const [batchCount, setBatchCount] = useState(1);
  const [isSharing, setIsSharing] = useState(false);
  const [selectedAchievement, setSelectedAchievement] = useState(achievements[0]);
  const [isFormulaOpen, setIsFormulaOpen] = useState(false);
  const [toast, setToast] = useState(null);

  const textile = useMemo(() => {
    if (isB2B) {
      return (batchCount * 50 * 2.5) / 1000;
    }
    return itemsCount * 2.5;
  }, [itemsCount, batchCount, isB2B]);

  const water = useMemo(() => {
    if (isB2B) {
      return (batchCount * 50 * 700) / 1000;
    }
    return itemsCount * 700;
  }, [itemsCount, batchCount, isB2B]);

  const progress = useMemo(() => {
    const current = isB2B ? batchCount : itemsCount;
    return Math.min(100, Math.round((current / 5) * 100));
  }, [itemsCount, batchCount, isB2B]);

  const level = isB2B
    ? batchCount >= 5
      ? 'Промышленный лидер'
      : batchCount >= 3
      ? 'ESG-инициатор'
      : 'Запуск цепочки'
    : itemsCount >= 5
    ? 'Эко-мастер'
    : itemsCount >= 3
    ? 'Эко-активист'
    : 'Эко-новичок';

  const activityCount = isB2B ? batchCount : itemsCount;
  const unlockedAchievements = achievements.map((achievement) => ({
    ...achievement,
    active: activityCount >= achievement.threshold,
  }));

  useEffect(() => {
    const current = unlockedAchievements.find((achievement) => achievement.id === selectedAchievement.id);
    if (current?.active) {
      setSelectedAchievement(current);
      return;
    }

    const bestAvailable = [...unlockedAchievements].reverse().find((achievement) => achievement.active) ?? unlockedAchievements[0];
    setSelectedAchievement(bestAvailable);
  }, [itemsCount]);

  useEffect(() => {
    if (!toast) {
      return undefined;
    }

    const timer = window.setTimeout(() => setToast(null), 3000);
    return () => window.clearTimeout(timer);
  }, [toast]);

  const handleShare = async () => {
    const shareText = `Я сдаю ${itemsCount} вещей в Appcycling: это ${formatNumber(textile)} кг текстиля и ${formatNumber(water)} л воды.`;
    setIsSharing(true);

    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Appcycling eco impact',
          text: shareText,
          url: window.location.href,
        });
        setToast('Результат эко-вклада отправлен');
      } catch (error) {
        setToast('Поделиться не получилось, но расчет уже готов');
      }
    } else {
      setToast(shareText);
    }

    window.setTimeout(() => setIsSharing(false), 1000);
  };

  return (
    <>
      <style>{`@keyframes slideUp{from{opacity:0;transform:translate(-50%,8px)}to{opacity:1;transform:translate(-50%,0)}}`}</style>
      <div className="relative mx-auto flex min-h-screen max-w-md flex-col gap-4 bg-gray-50 px-4 pb-24 pt-4 shadow-xl">
        <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
          <div className="flex items-center gap-2 text-[#556B2F]">
            <Sparkles size={18} />
            <p className="text-sm font-semibold uppercase tracking-[0.2em]">{isB2B ? 'ESG-отчетность компании' : 'Эко-вклад'}</p>
          </div>
          <h2 className="mt-2 text-2xl font-semibold text-ink">
            {isB2B ? 'Отчетная аналитика для корпоративного устойчивого развития' : 'Ваш прогресс пересчитывается вживую'}
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            {isB2B
              ? 'Прокручивайте объемы партий, чтобы увидеть эффект на тонны текстиля и воды.'
              : 'Двигайте ползунок и смотрите, как меняются ресурсы, уровень и достижения.'}
          </p>
        </div>

        <div className="rounded-2xl border border-gray-100 bg-white p-4 shadow-sm">
          <div className="flex items-center justify-between gap-3">
            <div>
              <p className="text-sm font-semibold text-ink">
                {isB2B ? 'Сколько партий по 50 шт. вы готовы переработать?' : 'Сколько старых вещей вы готовы сдать?'}
              </p>
              <p className="mt-1 text-sm text-gray-500">
                {isB2B ? '1 партия = 50 изделий. Мы считаем результат в тоннах.' : '1 вещь = 2.5 кг текстиля и 700 л воды'}
              </p>
            </div>
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#eef4db] text-xl font-bold text-[#556B2F]">
              {isB2B ? batchCount : itemsCount}
            </div>
          </div>
          <input
            type="range"
            min={isB2B ? '1' : '1'}
            max={isB2B ? '20' : '10'}
            value={isB2B ? batchCount : itemsCount}
            onChange={(event) => {
              const value = Number(event.target.value);
              if (isB2B) {
                setBatchCount(value);
              } else {
                setItemsCount(value);
              }
            }}
            className="mt-5 w-full accent-[#556B2F]"
          />
          <div className="mt-2 flex justify-between text-xs text-gray-500">
            <span>{isB2B ? '1 партия' : '1 вещь'}</span>
            <span>{isB2B ? '20 партий' : '10 вещей'}</span>
          </div>
        </div>

        <div className="grid gap-3">
          <div className="rounded-2xl border border-[#eef4db] bg-[#f7f7ef] p-4 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Сохранено текстиля</p>
                <p className="mt-2 text-3xl font-semibold text-[#556B2F]">{formatNumber(textile)} кг</p>
              </div>
              <div className="rounded-2xl bg-white p-3 text-[#556B2F] shadow-sm">
                <Scale size={20} />
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-[#eef4db] bg-[#f7f7ef] p-4 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Сэкономлено воды</p>
                <p className="mt-2 text-3xl font-semibold text-[#556B2F]">{formatNumber(water)} л</p>
              </div>
              <div className="rounded-2xl bg-white p-3 text-[#556B2F] shadow-sm">
                <Droplet size={20} />
              </div>
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-gray-100 bg-white p-4 shadow-sm">
          <div className="flex items-center justify-between text-sm text-gray-700">
            <span>Текущий уровень</span>
            <span className="font-semibold text-[#556B2F]">{level}</span>
          </div>
          <div className="mt-3 h-3 rounded-full bg-gray-100">
            <div className="h-3 rounded-full bg-[#556B2F] transition-all duration-300" style={{ width: `${progress}%` }} />
          </div>
          <p className="mt-2 text-sm text-gray-500">Прогресс до Эко-мастера: {progress}%</p>

          <button
            onClick={handleShare}
            className="mt-4 inline-flex items-center gap-2 rounded-2xl border border-[#556B2F] px-4 py-2 text-sm font-semibold text-[#556B2F]"
          >
            {isSharing ? (
              <span className="h-4 w-4 animate-spin rounded-full border-2 border-[#556B2F] border-t-transparent" />
            ) : (
              <Share2 size={16} />
            )}
            Поделиться результатом
          </button>
        </div>

        <div className="rounded-2xl border border-gray-100 bg-white p-4 shadow-sm">
          <p className="text-sm font-semibold text-ink">Достижения и награды</p>
          <div className="mt-4 flex items-center justify-between gap-2">
            {unlockedAchievements.map((achievement) => {
              const isActive = selectedAchievement.id === achievement.id;
              return (
                <button
                  key={achievement.id}
                  type="button"
                  onClick={() => {
                    setSelectedAchievement(
                      achievement.active
                        ? achievement
                        : {
                            ...achievement,
                            description: `Сдайте ${achievement.threshold} вещей, чтобы разблокировать эту медаль.`,
                          },
                    );
                  }}
                  className={`flex h-14 w-14 items-center justify-center rounded-full border transition ${
                    achievement.active
                      ? isActive
                        ? 'border-[#d6a800] bg-[#f6c945] text-white shadow-sm'
                        : 'border-[#b6d88b] bg-[#eef4db] text-[#556B2F]'
                      : 'border-gray-200 bg-gray-100 text-gray-400'
                  }`}
                  title={achievement.title}
                >
                  {achievement.id === 'master' && achievement.active ? <Leaf size={18} /> : <Award size={18} />}
                </button>
              );
            })}
          </div>
          <div className="mt-3 rounded-2xl bg-[#f7f7ef] p-3 text-sm text-gray-700">
            <p className="font-semibold text-ink">{selectedAchievement.title}</p>
            <p className="mt-1 text-gray-600">{selectedAchievement.description}</p>
          </div>
        </div>

        {toast ? (
          <div className="fixed bottom-20 left-1/2 z-50 flex -translate-x-1/2 items-center gap-2 rounded-xl bg-[#212121] px-4 py-3 text-white shadow-2xl animate-[slideUp_0.2s_ease-out]">
            <Sparkles size={16} />
            <span className="text-sm">{toast}</span>
          </div>
        ) : null}

        <div className="rounded-2xl border border-gray-100 bg-white p-4 shadow-sm">
          <button
            type="button"
            onClick={() => setIsFormulaOpen((current) => !current)}
            className="flex w-full items-center justify-between text-left"
          >
            <span className="text-sm font-semibold text-ink">Как рассчитывается вклад?</span>
            {isFormulaOpen ? <ChevronUp size={18} className="text-[#556B2F]" /> : <ChevronDown size={18} className="text-[#556B2F]" />}
          </button>

          {isFormulaOpen ? (
            <div className="mt-3 rounded-2xl bg-[#f7f7ef] p-3 text-sm text-gray-700">
              <p className="font-medium text-ink">Текущая формула:</p>
              <ul className="mt-2 space-y-2 text-gray-600">
                <li>• Сохраненный текстиль = {itemsCount} × 2.5 кг = {formatNumber(textile)} кг</li>
                <li>• Экономия воды = {itemsCount} × 700 л = {formatNumber(water)} л</li>
                <li>• Прогресс = {itemsCount} вещей из 5 до уровня «Эко-мастер»</li>
              </ul>
            </div>
          ) : null}
        </div>
      </div>
    </>
  );
}

export default EcoImpact;
