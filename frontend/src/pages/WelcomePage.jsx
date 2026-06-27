import { Link } from 'react-router-dom';

function WelcomePage() {
  return (
    <div className="mx-auto flex max-w-md flex-col gap-6 rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
      <div>
        <p className="text-sm font-medium uppercase tracking-[0.2em] text-[#556B2F]">Appcycling</p>
        <h1 className="mt-2 text-3xl font-semibold text-ink">ИИ-экосистема для апсайклинга одежды</h1>
        <p className="mt-3 text-sm text-gray-600">Выберите сценарий использования и начните свою экосессию уже сегодня.</p>
      </div>

      <div className="flex flex-col gap-3">
        <Link to="/catalog" className="rounded-2xl bg-[#556B2F] px-4 py-3 text-center font-medium text-white">
          Я физическое лицо
        </Link>
        <Link to="/b2b-portal" className="rounded-2xl border-2 border-[#556B2F] px-4 py-3 text-center font-medium text-[#556B2F]">
          Я представляю компанию (B2B)
        </Link>
      </div>
    </div>
  );
}

export default WelcomePage;
