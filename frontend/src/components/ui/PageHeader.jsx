import { ChevronLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

function PageHeader({ title, backTo = -1 }) {
  const navigate = useNavigate();

  return (
    <div className="mb-4 flex items-center gap-3 rounded-2xl border border-gray-100 bg-white p-4 shadow-sm">
      <button
        onClick={() => navigate(backTo)}
        className="flex h-9 w-9 items-center justify-center rounded-full text-[#556B2F] transition hover:bg-[#f7f7ef]"
        aria-label="Назад"
      >
        <ChevronLeft size={20} />
      </button>
      <h2 className="text-lg font-semibold text-ink">{title}</h2>
    </div>
  );
}

export default PageHeader;
