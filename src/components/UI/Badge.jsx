import React from 'react';

function Badge({ children, variant = 'primary', className = '' }) {
  const variants = {
    primary: "bg-primary/10 text-primary border-primary/20",
    secondary: "bg-secondary-container/10 text-secondary-container border-secondary-container/20",
    tertiary: "bg-tertiary-container/10 text-tertiary-container border-tertiary-container/20",
    error: "bg-error-container/10 text-error border-error-container/20"
  };

  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider border ${variants[variant]} ${className}`}>
      {children}
    </span>
  );
}

export default Badge;
