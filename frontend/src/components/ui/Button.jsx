import { Loader2 } from 'lucide-react';

function Button({
  children,
  variant = 'solid',
  isLoading = false,
  className = '',
  disabled = false,
  ...props
}) {
  const baseClasses = 'inline-flex items-center justify-center rounded-2xl px-4 py-3 text-sm font-semibold transition focus:outline-none';
  const variants = {
    solid: 'bg-[#556B2F] text-white hover:opacity-95',
    outline: 'border border-[#556B2F] text-[#556B2F] bg-white hover:bg-[#f7f7ef]',
  };

  return (
    <button
      type="button"
      disabled={isLoading || disabled}
      className={`${baseClasses} ${variants[variant] || variants.solid} ${className}`}
      {...props}
    >
      {isLoading ? (
        <span className="flex items-center gap-2">
          <Loader2 size={16} className="animate-spin" />
          <span>{children}</span>
        </span>
      ) : (
        children
      )}
    </button>
  );
}

export default Button;
