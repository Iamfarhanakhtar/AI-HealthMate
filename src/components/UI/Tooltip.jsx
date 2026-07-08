import React from 'react';

function Tooltip({ children, text = '', className = '' }) {
  return (
    <div className={`relative group inline-block ${className}`}>
      {children}
      <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-1.5 rounded-lg bg-surface-container-high border border-white/10 text-on-surface text-[11px] leading-normal opacity-0 pointer-events-none group-hover:opacity-100 group-focus:opacity-100 transition-opacity duration-200 shadow-xl whitespace-nowrap z-50">
        {text}
      </div>
    </div>
  );
}

export default Tooltip;
