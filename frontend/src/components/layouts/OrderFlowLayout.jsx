import { Outlet, Link, useLocation } from 'react-router-dom';
import { ChevronLeft } from 'lucide-react';

function OrderFlowLayout() {
  const location = useLocation();

  return (
    <div className="min-h-screen bg-white p-6 text-ink">
      <Link to="/cart" className="mb-6 inline-flex items-center gap-2 text-[color:#556B2F]">
        <ChevronLeft size={20} />
        Назад
      </Link>
      <Outlet />
    </div>
  );
}

export default OrderFlowLayout;
