import React from 'react';
import { Link, useLocation } from 'react-router-dom';

function Navbar() {
  const location = useLocation();

  const links = [
    { label: "Home", path: "/" },
    { label: "Health Library", path: "/health-library" },
    { label: "AI Assistant", path: "/assistant" },
    { label: "Symptom Triage", path: "/health-guide" },
    { label: "Quiz Portal", path: "/quiz" },
    { label: "Social Impact", path: "/community-impact" },
    { label: "Feedback", path: "/contact" }
  ];

  return (
    <nav className="fixed top-0 w-full z-50 bg-surface/60 backdrop-blur-xl border-b border-white/10 py-4">
      <div className="max-w-[1200px] mx-auto px-6 flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 group">
          <span className="material-symbols-outlined text-primary text-3xl">psychiatry</span>
          <span className="font-display-lg text-[20px] font-bold text-primary tracking-tight">
            AI HealthMate
          </span>
        </Link>

        {/* Links */}
        <div className="hidden lg:flex items-center gap-6">
          {links.map((link, idx) => (
            <Link
              key={idx}
              to={link.path}
              className={`text-xs font-semibold uppercase tracking-wider transition-colors hover:text-primary ${
                location.pathname === link.path ? 'text-primary' : 'text-on-surface-variant'
              }`}
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Action button stub */}
        <Link
          to="/awareness-session"
          className="px-5 py-2.5 rounded-lg bg-gradient-to-r from-primary to-secondary-container text-on-primary text-xs font-bold shadow-[0_0_12px_rgba(0,242,255,0.2)]"
        >
          Start Session
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;
