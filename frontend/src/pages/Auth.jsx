import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const roleTabs = [
  { value: 'b2c', label: 'Я клиент (B2C)' },
  { value: 'b2b', label: 'Я компания / Бренд (B2B)' },
];

function Auth({ mode: initialMode = 'login' }) {
  const [mode, setMode] = useState(initialMode);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [registerRole, setRegisterRole] = useState('b2c');
  const [brandName, setBrandName] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const isRegister = mode === 'register';

  const saveRole = (role) => {
    localStorage.setItem('appcyclingRole', role);
    if (role === 'b2b') {
      localStorage.setItem('appcyclingBrand', brandName.trim());
    } else {
      localStorage.removeItem('appcyclingBrand');
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');
    setIsSubmitting(true);

    try {
      if (!email.trim() || !password.trim()) {
        throw new Error('Пожалуйста, укажите email и пароль.');
      }

      if (isRegister) {
        if (registerRole === 'b2b' && !brandName.trim()) {
          throw new Error('Название бренда обязательно для B2B.');
        }

        localStorage.setItem('userEmail', email.trim());
        localStorage.setItem('userRole', registerRole);
        if (registerRole === 'b2b') {
          localStorage.setItem('brandName', brandName.trim());
        } else {
          localStorage.removeItem('brandName');
        }
        saveRole(registerRole);
      } else {
        const storedRole = localStorage.getItem('userRole') || 'b2c';
        localStorage.setItem('userEmail', email.trim());
        localStorage.setItem('userRole', storedRole);
        if (storedRole === 'b2b') {
          const storedBrand = localStorage.getItem('brandName') || '';
          localStorage.setItem('brandName', storedBrand);
        }
      }

      localStorage.setItem('appcyclingEmail', email.trim());
      navigate('/catalog');
    } catch (err) {
      setError(err.message || 'Не удалось завершить операцию. Попробуйте снова.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="mx-auto flex min-h-[calc(100vh-96px)] max-w-xl flex-col justify-center px-4 py-6 sm:px-6">
      <div className="overflow-hidden rounded-[2rem] border border-gray-200 bg-[#f7f7ef] shadow-2xl shadow-[#4a5d29]/10">
        <div className="bg-[#556B2F] px-6 py-8 text-white sm:px-10">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-[#d6e4c1]">Appcycling</p>
          <h1 className="mt-5 text-3xl font-semibold sm:text-4xl">
            {isRegister ? 'Создайте аккаунт' : 'Войдите в свой профиль'}
          </h1>
          <p className="mt-3 max-w-2xl text-sm text-[#e6f0d8] sm:text-base">
            {isRegister
              ? 'Регистрация с B2C / B2B ролями и современным доступом через Firebase Auth.'
              : 'Введите email и пароль, чтобы перейти в каталог и продолжить работу.'}
          </p>
        </div>

        <div className="space-y-6 px-6 py-8 sm:px-10">
          <div className="grid grid-cols-2 gap-2 rounded-3xl bg-white p-1 shadow-inner shadow-[#0000000a]">
            <button
              type="button"
              onClick={() => setMode('login')}
              className={`rounded-3xl px-4 py-3 text-sm font-semibold transition ${
                !isRegister ? 'bg-[#556B2F] text-white shadow-sm' : 'bg-transparent text-[#556B2F]'
              }`}
            >
              Вход
            </button>
            <button
              type="button"
              onClick={() => setMode('register')}
              className={`rounded-3xl px-4 py-3 text-sm font-semibold transition ${
                isRegister ? 'bg-[#556B2F] text-white shadow-sm' : 'bg-transparent text-[#556B2F]'
              }`}
            >
              Регистрация
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <label className="block text-sm font-semibold text-[#2f3a1c]">
              Email
              <input
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder="hello@example.com"
                className="mt-2 w-full rounded-3xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-900 outline-none transition focus:border-[#556B2F] focus:ring-2 focus:ring-[#556B2F]/20"
              />
            </label>

            <label className="block text-sm font-semibold text-[#2f3a1c]">
              Пароль
              <input
                type="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                placeholder="Минимум 6 символов"
                className="mt-2 w-full rounded-3xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-900 outline-none transition focus:border-[#556B2F] focus:ring-2 focus:ring-[#556B2F]/20"
              />
            </label>

            {isRegister ? (
              <div className="space-y-4 rounded-3xl border border-gray-200 bg-white p-4 shadow-sm">
                <p className="text-sm font-semibold text-[#2f3a1c]">Выберите тип аккаунта</p>
                <div className="grid grid-cols-2 gap-2">
                  {roleTabs.map((tab) => (
                    <button
                      key={tab.value}
                      type="button"
                      onClick={() => setRegisterRole(tab.value)}
                      className={`rounded-3xl border px-3 py-3 text-sm font-semibold transition ${
                        registerRole === tab.value
                          ? 'border-[#556B2F] bg-[#556B2F] text-white'
                          : 'border-gray-200 bg-white text-[#556B2F]'
                      }`}
                    >
                      {tab.label}
                    </button>
                  ))}
                </div>

                {registerRole === 'b2b' ? (
                  <label className="block text-sm font-semibold text-[#2f3a1c]">
                    Название бренда
                    <input
                      type="text"
                      value={brandName}
                      onChange={(event) => setBrandName(event.target.value)}
                      placeholder="Например, GreenThread"
                      className="mt-2 w-full rounded-3xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-900 outline-none transition focus:border-[#556B2F] focus:ring-2 focus:ring-[#556B2F]/20"
                    />
                  </label>
                ) : null}
              </div>
            ) : null}

            {error ? (
              <div className="rounded-3xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                {error}
              </div>
            ) : null}

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full rounded-3xl bg-[#556B2F] px-5 py-3 text-sm font-semibold text-white shadow-lg transition hover:bg-[#4a5d29] disabled:cursor-not-allowed disabled:opacity-70"
            >
              {isSubmitting
                ? 'Секундочку...'
                : isRegister
                ? 'Создать аккаунт'
                : 'Войти и продолжить'}
            </button>
          </form>

          <p className="text-center text-sm text-gray-600">
            {isRegister ? 'Уже есть аккаунт?' : 'Еще нет аккаунта?'}{' '}
            <button
              type="button"
              onClick={() => setMode(isRegister ? 'login' : 'register')}
              className="font-semibold text-[#556B2F] underline underline-offset-4"
            >
              {isRegister ? 'Войти' : 'Зарегистрироваться'}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Auth;
