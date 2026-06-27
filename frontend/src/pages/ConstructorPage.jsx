import { Palette, Paperclip, Type } from 'lucide-react';

function ConstructorPage() {
  return (
    <div className="mx-auto flex max-w-5xl flex-col gap-4">
      <div className="rounded-2xl border border-gray-100 bg-white p-4 shadow-sm">
        <h2 className="text-xl font-semibold text-ink">Конструктор дизайна</h2>
        <p className="mt-2 text-sm text-gray-600">Соберите готовый образ и подготовьте техпак к заказу.</p>
      </div>

      <div className="rounded-2xl border border-gray-100 bg-white p-4 shadow-sm">
        <div className="mb-4 flex items-center gap-3">
          <button className="rounded-full bg-[#556B2F] p-2 text-white">
            <Palette size={18} />
          </button>
          <button className="rounded-full border border-gray-300 p-2 text-gray-600">
            <Paperclip size={18} />
          </button>
          <button className="rounded-full border border-gray-300 p-2 text-gray-600">
            <Type size={18} />
          </button>
        </div>
        <div className="h-56 rounded-2xl bg-gradient-to-br from-[#e9efdb] to-[#556B2F]" />
      </div>
    </div>
  );
}

export default ConstructorPage;
