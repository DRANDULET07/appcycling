import { Outlet, Link, useLocation } from 'react-router-dom';
import { ChevronLeft } from 'lucide-react';

function AuthLayout() {
  const location = useLocation();
  const showBack = location.pathname !== '/';

  return (
    <div className="min-h-screen bg-white text-ink">
      <header className="px-6 pt-6">
        {showBack ? (
          <Link to="/" className="inline-flex items-center gap-2 text-[color:#556B2F]">
            <ChevronLeft size={20} />
            Назад
          </Link>
        ) : null}
      </header>
      <main className="px-6 py-6">
        <Outlet />
      </main>
    </div>
  );
}

export default AuthLayout;
