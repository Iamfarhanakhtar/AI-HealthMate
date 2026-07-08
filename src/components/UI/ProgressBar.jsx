import React from 'react';

function ProgressBar({ value = 0, glowColor = 'cyan', height = 'h-2' }) {
  const clampedValue = Math.max(0, Math.min(100, value));

  const glows = {
    cyan: "bg-gradient-to-r from-[#00f2ff] to-[#36ffc4] glow-cyan",
    violet: "bg-gradient-to-r from-[#7318ff] to-[#00f2ff] glow-violet"
  };

  return (
    <div className={`w-full bg-[#191c22] rounded-full overflow-hidden ${height} border border-white/5`}>
      <div
        className={`h-full rounded-full transition-all duration-500 ease-out ${glows[glowColor]}`}
        style={{ width: `${clampedValue}%` }}
      />
    </div>
  );
}

export default ProgressBar;
