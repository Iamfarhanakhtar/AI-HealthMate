import React from 'react';

function Textarea({
  placeholder = '',
  value,
  onChange,
  className = '',
  required = false,
  label = '',
  rows = 4
}) {
  return (
    <div className={`flex flex-col gap-1.5 w-full ${className}`}>
      {label && (
        <label className="text-[11px] font-bold text-outline uppercase tracking-wider text-left">
          {label}
        </label>
      )}
      <textarea
        required={required}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        rows={rows}
        className="w-full bg-[#131b2e]/60 border border-white/10 rounded-xl p-4 text-xs text-on-surface focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary transition-all resize-none shadow-inner"
      />
    </div>
  );
}

export default Textarea;
