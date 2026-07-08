import React from 'react';
import { Award, BookOpen, Activity, Apple, ShieldCheck, Sparkles, CheckCircle } from 'lucide-react';

const ICON_MAP = {
  CheckCircle: CheckCircle,
  Award: Award,
  BookOpen: BookOpen,
  Activity: Activity,
  Apple: Apple,
  ShieldCheck: ShieldCheck,
  Sparkles: Sparkles
};

export function AchievementCard({ achievement, isUnlocked, language }) {
  const IconComponent = ICON_MAP[achievement.icon] || Award;

  return (
    <div className={`relative p-4 rounded-xl border flex gap-3 items-start transition-all duration-300 transform ${
      isUnlocked 
        ? 'bg-cyan-950/10 border-cyan-500/25 text-cyan-50 shadow-md hover:-translate-y-0.5' 
        : 'bg-surface-container-low/20 border-outline-variant/10 text-outline-variant select-none'
    }`}>
      
      {/* Visual icon container */}
      <div className={`p-2.5 rounded-lg border shrink-0 transition-colors ${
        isUnlocked 
          ? 'bg-cyan-500/10 border-cyan-500/30 text-cyan-400 floating-hologram' 
          : 'bg-surface-container border-outline-variant/10 text-outline-variant'
      }`}>
        <IconComponent className="w-5 h-5" />
      </div>

      <div className="space-y-0.5 flex-1 min-w-0">
        <h4 className={`text-xs font-bold truncate ${isUnlocked ? 'text-on-surface' : 'text-outline-variant'}`}>
          {achievement.title}
        </h4>
        <p className="text-[10px] leading-relaxed text-on-surface-variant line-clamp-2">
          {achievement.desc}
        </p>
      </div>

      {/* Unlock Status tag */}
      <span className="absolute top-2 right-2 text-[8px] font-mono uppercase tracking-widest px-1 py-0.5 rounded font-bold">
        {isUnlocked ? (
          <span className="text-cyan-400">Unlocked</span>
        ) : (
          <span className="text-outline-variant/60">Locked</span>
        )}
      </span>

    </div>
  );
}

export default AchievementCard;
