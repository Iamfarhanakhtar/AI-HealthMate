import React from 'react';

function Input({
  type = 'text',
  placeholder = '',
  value,
  onChange,
  className = '',
  required = false,
  label = ''
}) {
  return (
    <div className={`flex flex-col gap-1.5 w-full ${className}`}>
      {label && (
        <label className="text-[11px] font-bold text-outline uppercase tracking-wider text-left">
          {label}
        </label>
      )}
      <input
        type={type}
        required={required}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className="w-full bg-[#131b2e]/60 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-on-surface focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary transition-all shadow-inner"
      />
    </div>
  );
}

export default Input;
