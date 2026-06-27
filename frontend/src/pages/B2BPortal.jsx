import { useState } from 'react';
import { ArrowUpRight, Send } from 'lucide-react';

const BASE_URL = 'http://127.0.0.1:8000';

function B2BPortal() {
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    inn: '',
    quantity: '',
    contacts: '',
  });

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const response = await fetch(`${BASE_URL}/users/b2b/leads`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          inn: formData.inn,
          quantity: Number(formData.quantity),
          contacts: formData.contacts,
        }),
      });

      if (!response.ok) {
        throw new Error('Не удалось отправить заявку');
      }

      setIsSuccess(true);
    } catch (err) {
      const message = err.message || 'Сервер недоступен';
      setError(message);
      window.alert(message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="mx-auto flex min-h-[80vh] max-w-2xl items-center justify-center px-4 py-6">
      {!isSuccess ? (
        <div className="w-full rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
          <div className="mb-6">
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-[#556B2F]">B2B Portal</p>
            <h2 className="mt-2 text-2xl font-semibold text-ink">Заявка на массовый апсайклинг</h2>
            <p className="mt-2 text-sm text-gray-600">
              Заполните форму, и наш менеджер свяжется с вами в ближайшее время.
            </p>
          </div>

          {error ? (
            <div className="mb-4 rounded-2xl border border-red-200 bg-red-50 p-3 text-sm text-red-700">{error}</div>
          ) : null}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">ИНН</label>
              <input
                className="w-full rounded-2xl border border-gray-300 px-3 py-3 outline-none focus:border-[#556B2F]"
                placeholder="7700000000"
                value={formData.inn}
                onChange={(event) => setFormData((current) => ({ ...current, inn: event.target.value }))}
              />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">Тираж (от 50 шт)</label>
              <input
                className="w-full rounded-2xl border border-gray-300 px-3 py-3 outline-none focus:border-[#556B2F]"
                placeholder="300"
                type="number"
                value={formData.quantity}
                onChange={(event) => setFormData((current) => ({ ...current, quantity: event.target.value }))}
              />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">Контакты</label>
              <input
                className="w-full rounded-2xl border border-gray-300 px-3 py-3 outline-none focus:border-[#556B2F]"
                placeholder="name@company.com"
                value={formData.contacts}
                onChange={(event) => setFormData((current) => ({ ...current, contacts: event.target.value }))}
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="flex w-full items-center justify-center gap-2 rounded-2xl bg-[#556B2F] px-4 py-3 text-base font-semibold text-white disabled:opacity-70"
            >
              {isLoading ? (
                <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
              ) : (
                <Send size={16} />
              )}
              Отправить заявку
            </button>
          </form>
        </div>
      ) : (
        <div className="w-full rounded-2xl border border-gray-100 bg-white p-6 text-center shadow-sm">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-[#eef4db] text-[#556B2F]">
            <Send size={20} />
          </div>
          <h3 className="mt-4 text-2xl font-semibold text-ink">Заявка отправлена</h3>
          <p className="mt-2 text-sm text-gray-600">
            Наш менеджер уже получил ваши данные и свяжется с вами в течение рабочего дня.
          </p>
          <a
            href="https://t.me/AppcyclingSupport"
            target="_blank"
            rel="noreferrer"
            className="mt-6 inline-flex items-center gap-2 rounded-2xl border border-[#556B2F] px-4 py-2 text-sm font-semibold text-[#556B2F]"
          >
            Перейти в Telegram менеджера
            <ArrowUpRight size={16} />
          </a>
        </div>
      )}
    </div>
  );
}

export default B2BPortal;
