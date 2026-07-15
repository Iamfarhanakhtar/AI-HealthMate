import React from 'react';

function MaterialIcon({ icon, className = "", ariaLabel, ...props }) {
  // If this icon is decorative (most are), hide it from screen readers completely.
  // If it needs to be interactive, we should use aria-label.
  const isDecorative = !ariaLabel;

  return (
    <span
      className={`material-symbols-outlined ${className}`}
      aria-hidden={isDecorative ? "true" : undefined}
      role={isDecorative ? "presentation" : "img"}
      aria-label={ariaLabel}
      translate="no"
      style={{ speak: 'none', userSelect: 'none' }}
      {...props}
    >
      {icon}
    </span>
  );
}

export default MaterialIcon;
