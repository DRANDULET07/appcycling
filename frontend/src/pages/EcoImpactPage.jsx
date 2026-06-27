import { Share2 } from 'lucide-react';
import { useEffect, useState } from 'react';

function EcoImpactPage() {
  const [savedTextile, setSavedTextile] = useState(0);
  const [savedWater, setSavedWater] = useState(0);

  useEffect(() => {
    const textileTimer = setInterval(() => setSavedTextile((value) => (value < 142 ? value + 1 : value)), 20);
    const waterTimer = setInterval(() => setSavedWater((value) => (value < 540 ? value + 6 : value)), 20);
    return () => {
      clearInterval(textileTimer);
      clearInterval(waterTimer);
    };
  }, []);

  return (
    <div className="mx-auto flex max-w-5xl flex-col gap-4">
      <div className="rounded-2xl border border-gray-100 bg-white p-4 shadow-sm">
        <h2 className="text-xl font-semibold text-ink">Эко-вклад</h2>
        <p className="mt-2 text-sm text-gray-600">Каждый заказ помогает сохранить ресурсы планеты.</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div className="rounded-2xl border border-gray-100 bg-white p-4 shadow-sm">
          <p className="text-sm text-gray-500">Сохранено текстиля</p>
          <p className="mt-2 text-3xl font-semibold text-[#556B2F]">{savedTextile} кг</p>
        </div>
        <div className="rounded-2xl border border-gray-100 bg-white p-4 shadow-sm">
          <p className="text-sm text-gray-500">Сэкономлено воды</p>
          <p className="mt-2 text-3xl font-semibold text-[#556B2F]">{savedWater} л</p>
        </div>
      </div>

      <div className="rounded-2xl border border-gray-100 bg-white p-4 shadow-sm">
        <div className="mb-2 flex items-center justify-between text-sm text-gray-700">
          <span>До статуса «Эко-гуру»</span>
          <span className="font-semibold text-[#556B2F]">72%</span>
        </div>
        <div className="h-3 rounded-full bg-gray-100">
          <div className="h-3 w-[72%] rounded-full bg-[#556B2F]" />
        </div>
        <button className="mt-4 inline-flex items-center gap-2 rounded-2xl border border-[#556B2F] px-4 py-2 text-sm font-medium text-[#556B2F]">
          <Share2 size={16} />
          Поделиться прогрессом
        </button>
      </div>
    </div>
  );
}

export default EcoImpactPage;
