import React, { forwardRef } from 'react';

export const Input = forwardRef(({
  label,
  error,
  helperText,
  icon: Icon,
  className = '',
  id,
  type = 'text',
  ...props
}, ref) => {
  const inputId = id || (label ? label.toLowerCase().replace(/\s+/g, '-') : undefined);

  return (
    <div className="w-full flex flex-col gap-1.5">
      {label && (
        <label htmlFor={inputId} className="text-xs font-semibold uppercase tracking-wider text-zinc-700">
          {label}
        </label>
      )}
      <div className="relative flex items-center">
        {Icon && (
          <div className="absolute left-3.5 text-zinc-400 pointer-events-none">
            <Icon size={18} />
          </div>
        )}
        <input
          ref={ref}
          id={inputId}
          type={type}
          className={`w-full bg-white border ${
            error ? 'border-red-400 focus:ring-red-400' : 'border-zinc-200 focus:border-rose-400 focus:ring-rose-400'
          } rounded-xl ${Icon ? 'pl-10' : 'px-3.5'} py-2.5 text-sm text-zinc-900 placeholder:text-zinc-400 shadow-sm transition-all outline-none focus:ring-2 focus:ring-opacity-20 ${className}`}
          {...props}
        />
      </div>
      {error && <span className="text-xs font-medium text-red-500">{error}</span>}
      {helperText && !error && <span className="text-xs text-zinc-500">{helperText}</span>}
    </div>
  );
});

Input.displayName = 'Input';
