import React from 'react';
import { BookOpen, ShieldAlert, ArrowRight, ShieldCheck, Heart, Sparkles, Droplet } from 'lucide-react';

export function HealthCard({ article, onOpen, language }) {
  const { id, meta, title, sections } = article;
  const displayTitle = language === 'en' ? title.en : title.hi;
  
  // Custom description or fallback overview text
  const rawOverview = sections.overview[language];
  const shortDesc = rawOverview.substring(0, 110) + (rawOverview.length > 110 ? '...' : '');

  // Select category badge colors & icons
  let badgeColor = "text-cyan-400 bg-cyan-500/10 border-cyan-500/20";
  let iconColor = "text-cyan-400";
  let Icon = BookOpen;

  switch (meta.category) {
    case "Infectious Diseases":
      badgeColor = "text-red-400 bg-red-500/10 border-red-500/20";
      iconColor = "text-red-400";
      Icon = ShieldAlert;
      break;
    case "Lifestyle Diseases":
      badgeColor = "text-amber-400 bg-amber-500/10 border-amber-500/20";
      iconColor = "text-amber-400";
      Icon = Heart;
      break;
    case "Nutrition & Child Care":
      badgeColor = "text-emerald-400 bg-emerald-500/10 border-emerald-500/20";
      iconColor = "text-emerald-400";
      Icon = ShieldCheck;
      break;
    case "Water & Hygiene":
      badgeColor = "text-blue-400 bg-blue-500/10 border-blue-500/20";
      iconColor = "text-blue-400";
      Icon = Droplet;
      break;
    case "First Aid":
      badgeColor = "text-rose-400 bg-rose-500/10 border-rose-500/20";
      iconColor = "text-rose-400";
      Icon = Sparkles;
      break;
    case "Women's Health":
      badgeColor = "text-pink-400 bg-pink-500/10 border-pink-500/20";
      iconColor = "text-pink-400";
      Icon = Heart;
      break;
    case "Mental Health":
      badgeColor = "text-violet-400 bg-violet-500/10 border-violet-500/20";
      iconColor = "text-violet-400";
      Icon = Sparkles;
      break;
    default:
      break;
  }

  // Difficulty badge styling
  const diffColor = meta.difficulty === 'Beginner' 
    ? 'text-emerald-400 bg-emerald-500/5' 
    : 'text-amber-400 bg-amber-500/5';

  return (
    <div 
      onClick={onOpen}
      className="group relative flex flex-col justify-between p-5 rounded-2xl bg-surface-container-low/40 border border-outline-variant/20 hover:border-cyan-500/40 hover:-translate-y-1 hover:shadow-xl transition-all duration-300 cursor-pointer"
    >
      
      {/* Background glow overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/0 via-cyan-500/0 to-cyan-500/0 group-hover:to-cyan-500/5 rounded-2xl transition-all pointer-events-none" />

      <div>
        {/* Header Badges */}
        <div className="flex items-center justify-between mb-4">
          <span className={`text-[10px] uppercase font-mono font-bold tracking-wider px-2 py-0.5 rounded-md border ${badgeColor}`}>
            {meta.category}
          </span>
          <div className="flex items-center gap-1.5 text-[10px] text-outline font-mono">
            <span>{meta.readTime}</span>
            <span>•</span>
            <span className={`px-1.5 py-0.5 rounded ${diffColor}`}>{meta.difficulty}</span>
          </div>
        </div>

        {/* Title & Description */}
        <h3 className="text-base font-bold text-on-surface group-hover:text-cyan-300 transition-colors mb-2 line-clamp-1">
          {displayTitle}
        </h3>
        
        <p className="text-xs text-on-surface-variant leading-relaxed line-clamp-3 mb-6">
          {shortDesc}
        </p>
      </div>

      {/* Footer info & CTA */}
      <div className="flex items-center justify-between pt-4 border-t border-outline-variant/10 text-[10px] text-outline">
        <div className="flex flex-wrap gap-1">
          {meta.badges?.slice(0, 2).map((badge, idx) => (
            <span key={idx} className="bg-surface-container px-2 py-0.5 rounded">
              {badge}
            </span>
          ))}
        </div>

        <span className="flex items-center gap-1 text-xs text-cyan-400 font-semibold group-hover:text-cyan-300 transition-colors">
          {language === 'en' ? 'Open' : 'खोलें'}
          <ArrowRight className="w-3.5 h-3.5 transform group-hover:translate-x-0.5 transition-transform" />
        </span>
      </div>

    </div>
  );
}

export default HealthCard;
