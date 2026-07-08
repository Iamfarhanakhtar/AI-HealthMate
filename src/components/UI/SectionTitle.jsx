import React from 'react';

function SectionTitle({ title, subtitle, className = '', align = 'center' }) {
  const alignments = {
    left: "text-left",
    center: "text-center",
    right: "text-right"
  };

  return (
    <div className={`mb-10 ${alignments[align]} ${className}`}>
      {subtitle && (
        <span className="font-label-caps text-label-caps text-primary uppercase tracking-widest bg-primary/5 px-3 py-1 rounded-full border border-primary/20">
          {subtitle}
        </span>
      )}
      <h2 className="font-headline-lg text-headline-lg mt-3 text-secondary font-bold tracking-tight">
        {title}
      </h2>
    </div>
  );
}

export default SectionTitle;
