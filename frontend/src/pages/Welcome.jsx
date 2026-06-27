import { Link } from 'react-router-dom';

function Welcome() {
  return (
    <div className="mx-auto flex min-h-[70vh] max-w-2xl flex-col items-center justify-center rounded-2xl border border-gray-100 bg-white px-6 py-10 shadow-sm">
      <div className="max-w-xl text-center">
        <p className="text-sm font-semibold uppercase tracking-[0.25em] text-[#556B2F]">Appcycling</p>
        <h1 className="mt-3 text-3xl font-semibold text-ink sm:text-4xl">
          ИИ-экосистема для апсайклинга одежды
        </h1>
        <p className="mt-4 text-base text-gray-600">
          Выберите путь, который подходит вам лучше всего, и начните свой первый проект уже сегодня.
        </p>
      </div>

      <div className="mt-8 flex w-full flex-col gap-3 sm:max-w-md">
        <Link
          to="/catalog"
          className="rounded-2xl bg-[#556B2F] px-5 py-4 text-center text-base font-semibold text-white shadow-sm transition hover:opacity-95"
        >
          Я физическое лицо
        </Link>
        <Link
          to="/b2b-portal"
          className="rounded-2xl border-2 border-[#556B2F] px-5 py-4 text-center text-base font-semibold text-[#556B2F] transition hover:bg-[#f7f7ef]"
        >
          Я представляю компанию (B2B)
        </Link>
      </div>
    </div>
  );
}

export default Welcome;
