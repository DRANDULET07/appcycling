import { useState } from 'react';

function B2BPortalPage() {
  const [submitted, setSubmitted] = useState(false);

  return (
    <div className="mx-auto flex max-w-2xl flex-col gap-4">
      {!submitted ? (
        <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
          <h2 className="text-2xl font-semibold text-ink">B2B-портал</h2>
          <p className="mt-2 text-sm text-gray-600">Оставьте заявку на массовый апсайклинг для вашей компании.</p>

          <form className="mt-6 space-y-4" onSubmit={(event) => { event.preventDefault(); setSubmitted(true); }}>
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">ИНН</label>
              <input className="w-full rounded-2xl border border-gray-300 px-3 py-2" placeholder="7700000000" />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">Тираж от 50 шт</label>
              <input className="w-full rounded-2xl border border-gray-300 px-3 py-2" placeholder="300" />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">Контакты</label>
              <input className="w-full rounded-2xl border border-gray-300 px-3 py-2" placeholder="name@company.com" />
            </div>
            <button className="w-full rounded-2xl bg-[#556B2F] px-4 py-3 font-medium text-white">
              Отправить заявку
            </button>
          </form>
        </div>
      ) : (
        <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
          <h2 className="text-2xl font-semibold text-[#556B2F]">Заявка отправлена</h2>
          <p className="mt-2 text-sm text-gray-600">Наш менеджер свяжется с вами в течение рабочего дня.</p>
        </div>
      )}
    </div>
  );
}

export default B2BPortalPage;
