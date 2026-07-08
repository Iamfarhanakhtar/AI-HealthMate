import React from 'react';

function Button({
  children,
  onClick,
  variant = 'primary', // 'primary', 'secondary', 'tertiary'
  type = 'button',
  className = '',
  disabled = false,
  loading = false,
  iconLeft = null,
  iconRight = null
}) {
  const baseStyle = "relative inline-flex items-center justify-center gap-2 font-title-md text-title-md font-semibold px-6 py-3 rounded-lg transition-all duration-300 active:scale-95 disabled:opacity-50 disabled:pointer-events-none hover:scale-[1.02]";
  
  const variants = {
    primary: "bg-gradient-to-r from-[#00f2ff] to-[#36ffc4] text-[#00363a] shadow-[0_0_15px_rgba(0,242,255,0.2)] hover:shadow-[0_0_25px_rgba(0,242,255,0.4)] border-none",
    secondary: "glass-panel text-[#e1e2eb] border border-white/15 hover:bg-white/8 hover:border-white/25",
    tertiary: "bg-gradient-to-r from-[#7318ff] to-[#00f2ff] text-white shadow-[0_0_15px_rgba(115,24,255,0.3)] hover:shadow-[0_0_25px_rgba(115,24,255,0.5)] border-none"
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      className={`${baseStyle} ${variants[variant]} ${className}`}
    >
      {loading && (
        <span className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin"></span>
      )}
      {!loading && iconLeft && <span className="flex items-center">{iconLeft}</span>}
      {children}
      {!loading && iconRight && <span className="flex items-center">{iconRight}</span>}
    </button>
  );
}

export default Button;
