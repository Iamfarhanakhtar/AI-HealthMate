import React, { useState, useEffect } from 'react';
import { HelpCircle, Sparkles, ShieldAlert, ExternalLink } from 'lucide-react';
import { Link } from 'react-router-dom';

const SUGGESTIONS = [
  "What is dengue?",
  "How can I prevent malaria?",
  "What should I eat during fever?",
  "How much water should I drink?",
  "Why are vaccines important?",
  "How can I avoid food poisoning?",
  "What should I do during heat stroke?",
  "Basic first aid for burns",
  "Snake bite first aid",
  "Mental health tips"
];

const HEALTH_TIPS = [
  "Wash hands with soap for at least 20 seconds before preparing meals to avoid stomach infections.",
  "Clear stagnant water in coolers, containers, and gutters weekly to prevent mosquitoes from breeding.",
  "Drink at least 8 to 10 glasses of clean, filtered or boiled water daily for optimal health.",
  "Ensure children receive timely vaccinations to safeguard them from life-threatening illnesses.",
  "Add green leafy vegetables, lentils, and seasonal fruits to your diet for iron and vitamins.",
  "Always dry sanitary cloths or pads under direct sunlight to kill invisible germs naturally.",
  "For minor burns, pour cool tap water over the injury for 10 minutes. Do not apply toothpaste."
];

export function SuggestedQuestions({ onSelectQuestion }) {
  const [dailyTip, setDailyTip] = useState("");

  // Select a health tip based on the day of the year
  useEffect(() => {
    const today = new Date();
    // Simple hash function for date
    const dateSeed = today.getDate() + today.getMonth() * 31;
    const tipIndex = dateSeed % HEALTH_TIPS.length;
    setDailyTip(HEALTH_TIPS[tipIndex]);
  }, []);

  return (
    <aside className="hidden xl:flex flex-col gap-4 bg-surface-container-lowest/80 border-l border-outline-variant/30 w-[280px] shrink-0 p-4 overflow-y-auto">
      
      {/* 1. Daily Health Tip Box */}
      <div className="p-4 rounded-xl bg-cyan-950/10 border border-cyan-500/20 text-cyan-200">
        <div className="flex items-center gap-2 mb-2 font-semibold text-xs uppercase tracking-wider font-mono text-cyan-400">
          <Sparkles className="w-4 h-4 text-cyan-400 shrink-0" />
          Tip of the Day
        </div>
        <p className="text-xs text-on-surface-variant leading-relaxed">
          {dailyTip || HEALTH_TIPS[0]}
        </p>
      </div>

      {/* 2. Suggested Questions List */}
      <div className="flex flex-col gap-2.5">
        <span className="text-[10px] uppercase font-mono tracking-widest text-outline px-1 flex items-center gap-1">
          <HelpCircle className="w-3.5 h-3.5 text-cyan-400" />
          Suggested Questions
        </span>
        <div className="space-y-1.5">
          {SUGGESTIONS.map((q, idx) => (
            <button
              key={idx}
              onClick={() => onSelectQuestion(q)}
              className="w-full text-left p-2 rounded-lg bg-surface-container/40 border border-outline-variant/15 hover:border-cyan-500/20 hover:bg-cyan-500/5 text-xs text-on-surface-variant hover:text-white transition-all cursor-pointer truncate"
            >
              {q}
            </button>
          ))}
        </div>
      </div>

      {/* 3. Emergency Helper Box */}
      <div className="p-4 rounded-xl bg-red-950/10 border border-red-500/25 mt-auto">
        <div className="flex items-center gap-1.5 text-red-400 font-bold text-xs uppercase tracking-wider mb-1.5">
          <ShieldAlert className="w-4 h-4 animate-pulse shrink-0" />
          Emergency Alert
        </div>
        <p className="text-[11px] text-on-surface-variant leading-relaxed mb-2.5">
          AI HealthMate is an educational tool. For clinical medical emergencies, contact national services immediately.
        </p>
        <div className="flex items-center justify-between text-xs font-mono font-bold bg-red-500/10 text-red-300 py-1.5 px-3 rounded-lg border border-red-500/20">
          <span>AMBULANCE HELP</span>
          <span className="text-red-400">108</span>
        </div>
      </div>

      {/* 4. Quick Links */}
      <div className="border-t border-outline-variant/20 pt-3 flex flex-col gap-1.5 text-xs">
        <span className="text-[10px] uppercase font-mono tracking-widest text-outline px-1 mb-1">Useful Resources</span>
        <Link 
          to="/health-library" 
          className="flex items-center justify-between text-on-surface-variant hover:text-cyan-400 p-1 px-1.5 rounded transition-colors"
        >
          <span>Health Library</span>
          <ExternalLink className="w-3 h-3 text-outline" />
        </Link>
        <Link 
          to="/quiz" 
          className="flex items-center justify-between text-on-surface-variant hover:text-cyan-400 p-1 px-1.5 rounded transition-colors"
        >
          <span>Educational Quizzes</span>
          <ExternalLink className="w-3 h-3 text-outline" />
        </Link>
      </div>

    </aside>
  );
}

export default SuggestedQuestions;
