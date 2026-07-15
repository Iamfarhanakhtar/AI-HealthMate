import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

function Navbar() {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  const links = [
    { label: "Home", path: "/" },
    { label: "Health Library", path: "/health-library" },
    { label: "AI Assistant", path: "/assistant" },
    { label: "Health Guide", path: "/health-guide" },
    { label: "Quiz", path: "/quiz" },
    { label: "Community Impact", path: "/community-impact" },
    { label: "Feedback", path: "/contact" }
  ];

  const mobileLinks = [
    ...links,
    { label: "Awareness Session", path: "/awareness-session" }
  ];

  // Close menu on route change
  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  // Handle escape key
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape') setIsOpen(false);
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, []);

  // Prevent scrolling when mobile menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  return (
    <>
      <nav className="fixed top-0 w-full z-50 bg-surface/60 backdrop-blur-xl border-b border-white/10 py-4">
        <div className="max-w-[1200px] mx-auto px-6 flex justify-between items-center">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group" aria-label="Go to homepage">
            <span className="material-symbols-outlined text-primary text-3xl" aria-hidden="true">psychiatry</span>
            <span className="font-display-lg text-[20px] font-bold text-primary tracking-tight">
              AI HealthMate
            </span>
          </Link>

          {/* Desktop Links */}
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

          <div className="flex items-center gap-4">
            {/* Action button stub (Desktop) */}
            <Link
              to="/awareness-session"
              className="hidden lg:inline-block px-5 py-2.5 rounded-lg bg-gradient-to-r from-primary to-secondary-container text-on-primary text-xs font-bold shadow-[0_0_12px_rgba(0,242,255,0.2)]"
            >
              Start Session
            </Link>

            {/* Mobile Menu Toggle */}
            <button
              className="lg:hidden p-2 text-on-surface flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-primary/50 rounded-lg"
              onClick={() => setIsOpen(true)}
              aria-label="Open mobile menu"
              aria-expanded={isOpen}
            >
              <span className="material-symbols-outlined text-2xl" aria-hidden="true">menu</span>
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-black/60 z-[60] lg:hidden backdrop-blur-sm"
              aria-hidden="true"
            />

            {/* Drawer */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 h-full w-[80%] max-w-[320px] bg-surface/95 backdrop-blur-xl border-l border-white/10 shadow-2xl z-[70] lg:hidden flex flex-col"
              role="dialog"
              aria-modal="true"
              aria-label="Mobile navigation menu"
            >
              {/* Header */}
              <div className="flex items-center justify-between p-6 border-b border-white/10">
                <span className="font-display-lg text-lg font-bold text-primary">Menu</span>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-2 text-on-surface-variant hover:text-white focus:outline-none focus:ring-2 focus:ring-primary/50 rounded-lg transition-colors"
                  aria-label="Close menu"
                >
                  <span className="material-symbols-outlined text-2xl" aria-hidden="true">close</span>
                </button>
              </div>

              {/* Links */}
              <div className="flex-1 overflow-y-auto py-6 px-4 flex flex-col gap-2">
                {mobileLinks.map((link, idx) => (
                  <Link
                    key={idx}
                    to={link.path}
                    onClick={() => setIsOpen(false)}
                    className={`p-4 rounded-xl text-sm font-semibold uppercase tracking-wider transition-all ${
                      location.pathname === link.path 
                        ? 'bg-primary/10 text-primary border border-primary/20' 
                        : 'text-on-surface hover:bg-white/5 border border-transparent'
                    }`}
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}

export default Navbar;
