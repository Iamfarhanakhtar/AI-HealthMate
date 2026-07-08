import React from 'react';
import { Link } from 'react-router-dom';

function Footer() {
  return (
    <footer className="bg-surface-container-lowest border-t border-white/8 py-10 relative z-10 text-xs">
      <div className="max-w-[1200px] mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-4 text-center">
        <p className="text-on-surface-variant">
          &copy; {new Date().getFullYear()} AI HealthMate. B.Tech Social Internship Project.
        </p>
        <div className="flex gap-4">
          <Link to="/health-library" className="text-outline hover:text-primary">Library</Link>
          <Link to="/health-guide" className="text-outline hover:text-primary">Triage</Link>
          <Link to="/quiz" className="text-outline hover:text-primary">Quiz</Link>
          <Link to="/contact" className="text-outline hover:text-primary">Feedback</Link>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
