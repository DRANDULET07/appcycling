import { NavLink, Outlet } from 'react-router-dom';
import { Home, Leaf, Palette } from 'lucide-react';

const tabs = [
  { to: '/catalog', label: 'Каталог', icon: Home },
  { to: '/eco-impact', label: 'Эко', icon: Leaf },
  { to: '/constructor', label: 'Конструктор', icon: Palette },
];

function MainLayout() {
  return (
    <div className="min-h-screen bg-white pb-24 text-ink">
      <main className="px-4 py-4 sm:px-6">
        <Outlet />
      </main>

      <nav className="fixed bottom-0 left-0 right-0 border-t border-gray-200 bg-white px-3 py-3 shadow-sm">
        <div className="mx-auto flex max-w-5xl items-center justify-between">
          {tabs.map(({ to, label, icon: Icon }) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) =>
                `flex flex-col items-center gap-1 rounded-xl px-3 py-2 text-xs ${isActive ? 'text-[#556B2F]' : 'text-gray-500'}`
              }
            >
              <Icon size={18} />
              <span>{label}</span>
            </NavLink>
          ))}
        </div>
      </nav>
    </div>
  );
}

export default MainLayout;
