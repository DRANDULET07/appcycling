import { useEffect, useMemo, useState } from 'react';
import {
  Check,
  CheckCircle2,
  ClipboardList,
  Palette,
  Paperclip,
  RefreshCcw,
  Sparkles,
  Type,
  X,
} from 'lucide-react';
import { useLocation } from 'react-router-dom';

const tools = [
  { id: 'color', label: 'Цвет', icon: Palette },
  { id: 'details', label: 'Детали', icon: Paperclip },
  { id: 'text', label: 'Текст', icon: Type },
];

const colorSwatches = [
  { id: 'olive', value: '#556B2F', label: 'Оливковый' },
  { id: 'indigo', value: '#4B5563', label: 'Индиго' },
  { id: 'terracotta', value: '#C96A3D', label: 'Терракотовый' },
  { id: 'graphite', value: '#2F2F2F', label: 'Графит' },
];

const detailTags = [
  { id: 'zipper', label: 'Молния', bom: 'Металлическая молния YKK', quantity: '1 шт.' },
  { id: 'pockets', label: 'Карманы', bom: 'Комплект накладных карманов', quantity: '2 шт.' },
  { id: 'hood', label: 'Капюшон', bom: 'Съемный капюшон с подкладом', quantity: '1 шт.' },
];

const basePrices = {
  Куртка: 14000,
  Худи: 12000,
  Джинсовка: 15000,
};

const formatPrice = (value) => `${value.toLocaleString('ru-RU')} ₸`;

const getInitialType = (locationState) => {
  const selectedItem = locationState?.selectedItem;
  const selectedTarget = locationState?.selectedTarget;

  if (selectedItem === 'Худи' || selectedTarget === 'hoodie') {
    return 'Худи';
  }

  if (selectedItem === 'Джинсовка' || selectedTarget === 'jacket') {
    return 'Джинсовка';
  }

  return 'Куртка';
};

function Constructor() {
  const location = useLocation();
  const initialType = useMemo(() => getInitialType(location.state), [location.state]);
  const [activeTool, setActiveTool] = useState('color');
  const [design, setDesign] = useState({
    type: initialType,
    color: 'Оливковый',
    details: [],
    customText: '',
  });
  const [isGeneratingTechPack, setIsGeneratingTechPack] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [toast, setToast] = useState(null);
  const [isOrdered, setIsOrdered] = useState(false);

  useEffect(() => {
    setDesign((current) => ({ ...current, type: initialType }));
  }, [initialType]);

  useEffect(() => {
    if (!toast) {
      return undefined;
    }

    const timer = window.setTimeout(() => setToast(null), 2600);
    return () => window.clearTimeout(timer);
  }, [toast]);

  const selectedColor = colorSwatches.find((color) => color.label === design.color) ?? colorSwatches[0];
  const selectedDetails = detailTags.filter((detail) => design.details.includes(detail.id));

  const pricing = useMemo(() => {
    const base = basePrices[design.type] ?? basePrices.Куртка;
    const detailsCost = design.details.length * 1500;
    const textCost = design.customText.trim() ? 2000 : 0;
    const total = base + detailsCost + textCost;

    const bom = [
      {
        material: `${design.type}: переработанный деним и хлопок`,
        quantity: '1 изделие',
        price: base,
      },
      ...selectedDetails.map((detail) => ({
        material: detail.bom,
        quantity: detail.quantity,
        price: 1500,
      })),
      ...(design.customText.trim()
        ? [
            {
              material: `Кастомный текст: "${design.customText.trim()}"`,
              quantity: '1 принт',
              price: 2000,
            },
          ]
        : []),
    ];

    return { base, detailsCost, textCost, total, bom };
  }, [design, selectedDetails]);

  const toggleDetail = (detailId) => {
    setDesign((current) => ({
      ...current,
      details: current.details.includes(detailId)
        ? current.details.filter((item) => item !== detailId)
        : [...current.details, detailId],
    }));
  };

  const handleGenerateTechPack = () => {
    setIsModalOpen(true);
    setIsGeneratingTechPack(true);
    window.setTimeout(() => {
      setIsGeneratingTechPack(false);
      setToast('Tech Pack пересчитан по текущему дизайну');
    }, 650);
  };

  const handleCompleteOrder = () => {
    setIsOrdered(true);
    setIsModalOpen(false);
    setToast('Заказ сформирован и готов к производству');
  };

  const handleResetDesign = () => {
    setDesign({
      type: initialType,
      color: 'Оливковый',
      details: [],
      customText: '',
    });
    setActiveTool('color');
    setIsOrdered(false);
    setToast(null);
  };

  const techPackView = (
    <div className="space-y-4">
      <div className="rounded-2xl bg-[#f7f7ef] p-3 text-sm text-gray-700">
        <p className="font-semibold text-ink">Design ID: APC-7492</p>
        <p className="mt-1">
          Тип: {design.type} · Цвет: {design.color} · Деталей: {design.details.length}
        </p>
      </div>

      <div className="overflow-hidden rounded-2xl border border-gray-100">
        <div className="bg-[#556B2F] px-3 py-2 text-sm font-semibold text-white">BOM и стоимость</div>
        <div className="divide-y divide-gray-100 text-sm">
          {pricing.bom.map((item, index) => (
            <div key={`${item.material}-${index}`} className="grid grid-cols-[1fr_auto] gap-3 px-3 py-2">
              <div>
                <p className="font-medium text-ink">{item.material}</p>
                <p className="text-xs text-gray-500">{item.quantity}</p>
              </div>
              <span className="font-semibold text-[#556B2F]">{formatPrice(item.price)}</span>
            </div>
          ))}
          <div className="flex items-center justify-between bg-[#f7f7ef] px-3 py-3 font-semibold">
            <span>Итого</span>
            <span className="text-[#556B2F]">{formatPrice(pricing.total)}</span>
          </div>
        </div>
      </div>

      <div className="rounded-2xl border border-gray-100 p-3 text-sm text-gray-700">
        <div className="flex items-center gap-2 font-semibold text-ink">
          <Check size={16} className="text-[#556B2F]" />
          Производственная карта
        </div>
        <div className="mt-3 grid gap-2 text-sm text-gray-600">
          <div className="rounded-xl bg-[#f7f7ef] p-2">Крой: oversize base, усиленные плечевые швы</div>
          <div className="rounded-xl bg-[#f7f7ef] p-2">Фурнитура: {selectedDetails.map((item) => item.label).join(', ') || 'без доп. деталей'}</div>
          <div className="rounded-xl bg-[#f7f7ef] p-2">Маркировка: {design.customText.trim() || 'без текста'}</div>
        </div>
      </div>
    </div>
  );

  if (isOrdered) {
    return (
      <div className="mx-auto flex min-h-screen max-w-md flex-col gap-4 bg-gray-50 px-4 pb-24 pt-4 shadow-xl">
        <div className="rounded-2xl border border-[#dfeac4] bg-white p-5 text-center shadow-sm">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#eef4db] text-[#556B2F]">
            <CheckCircle2 size={34} />
          </div>
          <h2 className="mt-4 text-2xl font-semibold text-ink">Заказ №7492 успешно сформирован!</h2>
          <p className="mt-2 text-sm text-gray-600">
            Финальный Tech Pack закреплен за производством. Можно показать расчет, состав и выбранные параметры.
          </p>
        </div>

        <div className="rounded-2xl border border-gray-100 bg-white p-4 shadow-sm">
          <div className="mb-4 flex items-center gap-2 text-[#556B2F]">
            <ClipboardList size={18} />
            <p className="text-sm font-semibold uppercase tracking-[0.16em]">Final Tech Pack</p>
          </div>
          {techPackView}
        </div>

        <button
          type="button"
          onClick={handleResetDesign}
          className="inline-flex items-center justify-center gap-2 rounded-2xl bg-[#556B2F] px-5 py-4 text-base font-semibold text-white shadow-sm"
        >
          <RefreshCcw size={18} />
          Создать новый дизайн
        </button>
      </div>
    );
  }

  return (
    <>
      <style>{`@keyframes fadeIn{from{opacity:0;transform:translateY(4px)}to{opacity:1;transform:translateY(0)}}@keyframes slideUp{from{opacity:0;transform:translate(-50%,8px)}to{opacity:1;transform:translate(-50%,0)}}`}</style>
      <div className="relative mx-auto flex min-h-screen max-w-md flex-col gap-4 bg-gray-50 px-4 pb-24 pt-4 shadow-xl">
        <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
          <h2 className="text-2xl font-semibold text-ink">Инженерная панель дизайна</h2>
          <p className="mt-2 text-sm text-gray-600">
            Соберите изделие, проверьте AI Preview и получите динамический Tech Pack с BOM и финальной стоимостью.
          </p>
        </div>

        <div className="rounded-2xl border border-gray-100 bg-white p-4 shadow-sm">
          <div
            className="rounded-2xl bg-gradient-to-br from-[#eef4db] via-[#dce8bb] to-[#556B2F] p-5"
            style={{ border: `3px solid ${selectedColor.value}` }}
          >
            <div className="flex items-center justify-between gap-3">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-white/80">AI Preview</p>
                <h3 className="mt-2 text-xl font-semibold text-white">
                  {design.type} · {design.color}
                </h3>
              </div>
              <div className="rounded-full bg-white/20 p-2 text-white">
                <Sparkles size={18} />
              </div>
            </div>

            <div className="mt-6 rounded-2xl border border-white/30 bg-white/25 p-4 shadow-sm backdrop-blur-sm">
              <div className="mx-auto flex min-h-[170px] max-w-[230px] flex-col items-center justify-center rounded-[32px] px-5 py-6 text-center text-white shadow-inner" style={{ backgroundColor: selectedColor.value }}>
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-white/75">{design.type}</p>
                <div className="my-4 h-16 w-24 rounded-b-[28px] rounded-t-xl border-2 border-white/55 bg-white/10" />
                {design.customText.trim() ? (
                  <p className="max-w-full break-words rounded-lg bg-white/90 px-3 py-1 text-sm font-bold text-[#212121]">
                    {design.customText}
                  </p>
                ) : (
                  <p className="text-xs text-white/70">Текст появится здесь</p>
                )}
              </div>

              <div className="mt-4">
                <p className="text-sm font-semibold text-[#212121]">Добавленная фурнитура</p>
                <div className="mt-3 flex flex-wrap gap-2 text-xs">
                  <span className="rounded-full bg-[#556B2F] px-2.5 py-1 font-semibold text-white shadow-md">
                    {design.color}
                  </span>
                  {selectedDetails.length ? (
                    selectedDetails.map((detail) => (
                      <span key={detail.id} className="rounded-full bg-white/90 px-2.5 py-1 font-medium text-[#212121] shadow-sm">
                        {detail.label}
                      </span>
                    ))
                  ) : (
                    <span className="rounded-full bg-white/70 px-2.5 py-1 font-medium text-gray-600">
                      Детали не выбраны
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-gray-100 bg-white p-4 shadow-sm">
          <div className="flex gap-2">
            {tools.map((tool) => {
              const Icon = tool.icon;
              const isActive = activeTool === tool.id;
              return (
                <button
                  key={tool.id}
                  type="button"
                  onClick={() => setActiveTool(tool.id)}
                  className={`flex items-center gap-2 rounded-2xl px-3 py-2 text-sm font-medium ${
                    isActive ? 'bg-[#556B2F] text-white' : 'border border-gray-200 text-gray-600'
                  }`}
                >
                  <Icon size={16} />
                  {tool.label}
                </button>
              );
            })}
          </div>

          {activeTool === 'color' ? (
            <div className="mt-4 grid grid-cols-4 gap-2 animate-[fadeIn_0.2s_ease-out]">
              {colorSwatches.map((swatch) => (
                <button
                  key={swatch.id}
                  type="button"
                  onClick={() => setDesign((current) => ({ ...current, color: swatch.label }))}
                  className={`flex items-center justify-center rounded-2xl border p-2 ${
                    design.color === swatch.label ? 'border-[#556B2F] ring-2 ring-[#eef4db]' : 'border-gray-200'
                  }`}
                  title={swatch.label}
                >
                  <span className="h-8 w-8 rounded-full border border-white/60" style={{ backgroundColor: swatch.value }} />
                </button>
              ))}
            </div>
          ) : null}

          {activeTool === 'details' ? (
            <div className="mt-4 flex flex-wrap gap-2 animate-[fadeIn_0.2s_ease-out]">
              {detailTags.map((tag) => {
                const isActive = design.details.includes(tag.id);
                return (
                  <button
                    key={tag.id}
                    type="button"
                    onClick={() => toggleDetail(tag.id)}
                    className={`rounded-full px-3 py-2 text-sm font-medium ${
                      isActive ? 'bg-[#556B2F] text-white' : 'border border-gray-200 text-gray-600'
                    }`}
                  >
                    {isActive ? '✓ ' : '+ '}
                    {tag.label}
                  </button>
                );
              })}
            </div>
          ) : null}

          {activeTool === 'text' ? (
            <div className="mt-4 animate-[fadeIn_0.2s_ease-out]">
              <label className="mb-1 block text-sm font-medium text-gray-700">Кастомный текст на изделии</label>
              <textarea
                value={design.customText}
                onChange={(event) => setDesign((current) => ({ ...current, customText: event.target.value }))}
                placeholder="Например: Reborn 2026"
                rows={3}
                maxLength={80}
                className="w-full resize-none rounded-2xl border border-gray-300 px-3 py-3 text-sm outline-none focus:border-[#556B2F]"
              />
              <p className="mt-1 text-xs text-gray-500">{design.customText.length}/80 символов</p>
            </div>
          ) : null}
        </div>

        <div className="rounded-2xl border border-[#eef4db] bg-white p-4 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-sm font-semibold text-ink">Текущая стоимость</span>
            <span className="text-lg font-bold text-[#556B2F]">{formatPrice(pricing.total)}</span>
          </div>
          <div className="mt-3 grid grid-cols-3 gap-2 text-center text-xs text-gray-600">
            <div className="rounded-xl bg-[#f7f7ef] p-2">База<br />{formatPrice(pricing.base)}</div>
            <div className="rounded-xl bg-[#f7f7ef] p-2">Детали<br />{formatPrice(pricing.detailsCost)}</div>
            <div className="rounded-xl bg-[#f7f7ef] p-2">Текст<br />{formatPrice(pricing.textCost)}</div>
          </div>
        </div>

        <div className="flex flex-col gap-3">
          <button
            type="button"
            onClick={handleGenerateTechPack}
            className="rounded-2xl bg-[#556B2F] px-5 py-4 text-center text-base font-semibold text-white shadow-sm"
          >
            {isGeneratingTechPack ? (
              <span className="inline-flex items-center justify-center gap-2">
                <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                Генерация...
              </span>
            ) : (
              'Сгенерировать Tech Pack'
            )}
          </button>

          <button
            type="button"
            onClick={handleCompleteOrder}
            className="rounded-2xl border border-[#556B2F] px-5 py-4 text-center text-base font-semibold text-[#556B2F] shadow-sm"
          >
            Готово к заказу
          </button>
        </div>

        {toast ? (
          <div className="fixed bottom-20 left-1/2 z-50 flex -translate-x-1/2 items-center gap-2 rounded-xl bg-[#212121] px-4 py-3 text-white shadow-2xl animate-[slideUp_0.2s_ease-out]">
            <Sparkles size={16} />
            <span className="text-sm">{toast}</span>
          </div>
        ) : null}

        {isModalOpen ? (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/45 px-3">
            <div className="max-h-[88vh] w-full max-w-md overflow-y-auto rounded-3xl bg-white p-4 shadow-2xl">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-semibold text-[#556B2F]">Технологическая карта</p>
                  <h3 className="text-lg font-semibold text-ink">Динамический Tech Pack</h3>
                </div>
                <button type="button" onClick={() => setIsModalOpen(false)} className="rounded-full bg-gray-100 p-2 text-gray-600">
                  <X size={16} />
                </button>
              </div>

              {isGeneratingTechPack ? (
                <div className="mt-4 rounded-2xl bg-[#f7f7ef] p-4 text-center text-sm text-gray-700">
                  <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-full border-2 border-[#556B2F] border-t-transparent animate-spin" />
                  <p className="mt-3 font-semibold text-ink">Собираем техпак...</p>
                  <p className="mt-1 text-gray-600">Пересчитываем материалы, фурнитуру и себестоимость.</p>
                </div>
              ) : (
                <div className="mt-4">{techPackView}</div>
              )}
            </div>
          </div>
        ) : null}
      </div>
    </>
  );
}

export default Constructor;
