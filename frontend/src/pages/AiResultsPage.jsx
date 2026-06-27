import { Link, useLocation } from 'react-router-dom';
import { aiResults } from '../data/mockData';

function AiResultsPage() {
  const location = useLocation();
  const generatedIdeas = location.state?.generatedIdeas ?? [];

  const items = generatedIdeas.length
    ? generatedIdeas.map((idea, index) => ({
        id: index + 1,
        title: `Концепт ${index + 1}`,
        subtitle: idea,
        image: aiResults[index % aiResults.length].image,
      }))
    : aiResults;

  return (
    <div className="mx-auto flex max-w-5xl flex-col gap-4">
      <div className="rounded-2xl border border-gray-100 bg-white p-4 shadow-sm">
        <h2 className="text-xl font-semibold text-ink">Результаты ИИ</h2>
        <p className="mt-2 text-sm text-gray-600">Вот готовые концепты, которые можно доработать в конструкторе.</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {items.map((item) => (
          <div key={item.id} className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm">
            <img src={item.image} alt={item.title} className="h-48 w-full object-cover" />
            <div className="p-4">
              <h3 className="font-semibold text-ink">{item.title}</h3>
              <p className="mt-1 text-sm text-gray-600">{item.subtitle}</p>
              <Link to="/constructor" className="mt-3 inline-flex text-sm font-medium text-[#556B2F]">
                Открыть конструктор
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AiResultsPage;
