import { Link, Outlet } from 'react-router-dom';
import { ChevronLeft } from 'lucide-react';

function B2BLayout() {
  return (
    <div className="min-h-screen bg-white text-ink">
      <header className="px-4 py-4 sm:px-6">
        <Link to="/" className="inline-flex items-center gap-2 text-[#556B2F]">
          <ChevronLeft size={20} />
          На Welcome
        </Link>
      </header>
      <main className="px-4 py-2 sm:px-6">
        <Outlet />
      </main>
    </div>
  );
}

export default B2BLayout;
