function Card({ children, className = '', hover = true }) {
  return (
    <div
      className={`rounded-2xl border border-gray-100 bg-white p-4 shadow-sm ${hover ? 'transition hover:-translate-y-0.5 hover:shadow-md' : ''} ${className}`}
    >
      {children}
    </div>
  );
}

export default Card;
