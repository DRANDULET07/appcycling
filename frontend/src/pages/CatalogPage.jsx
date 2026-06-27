import { Bell, Sparkles } from 'lucide-react';
import { catalogServices } from '../data/mockData';

function CatalogPage() {
  return (
    <div className="mx-auto flex max-w-5xl flex-col gap-4">
      <div className="flex items-center justify-between rounded-2xl border border-gray-100 bg-white p-4 shadow-sm">
        <div>
          <p className="text-sm text-gray-500">Каталог услуг</p>
          <h2 className="text-xl font-semibold text-ink">Подберите подходящий сервис</h2>
        </div>
        <div className="relative">
          <Bell size={20} className="text-[#556B2F]" />
          <span className="absolute -right-1 -top-1 h-2.5 w-2.5 rounded-full bg-[#556B2F]" />
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        {catalogServices.map((service) => (
          <div key={service.id} className="rounded-2xl border border-gray-100 bg-white p-4 shadow-sm">
            <div className="text-3xl">{service.icon}</div>
            <h3 className="mt-3 font-semibold text-ink">{service.title}</h3>
            <p className="mt-2 text-sm text-gray-600">{service.description}</p>
          </div>
        ))}
      </div>

      <button className="fixed bottom-24 right-6 flex h-14 w-14 items-center justify-center rounded-full bg-[#556B2F] text-white shadow-lg">
        <Sparkles size={20} />
      </button>
    </div>
  );
}

export default CatalogPage;
