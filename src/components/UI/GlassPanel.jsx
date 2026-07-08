import React from 'react';

function GlassPanel({ children, className = '', glowVariant = 'none' }) {
  const glows = {
    none: "",
    cyan: "shadow-[0_0_20px_rgba(0,242,255,0.08)] border-[#00f2ff]/20",
    violet: "shadow-[0_0_20px_rgba(115,24,255,0.08)] border-[#e3d4ff]/20"
  };

  return (
    <div className={`glass-panel rounded-xl overflow-hidden ${glows[glowVariant]} ${className}`}>
      {children}
    </div>
  );
}

export default GlassPanel;
