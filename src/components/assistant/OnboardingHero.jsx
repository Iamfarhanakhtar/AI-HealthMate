import React from 'react';
import { 
  ShieldAlert, 
  Droplet, 
  Apple, 
  Activity, 
  Heart, 
  Baby, 
  Sparkles, 
  ShieldCheck,
  BrainCircuit
} from 'lucide-react';

const QUICK_CARDS = [
  {
    title: "Learn About Dengue",
    desc: "Symptoms, mosquito control, and safe practices.",
    query: "What is dengue and how can I prevent it?",
    icon: ShieldAlert,
    color: "text-red-400 border-red-500/20 hover:border-red-500/50 bg-red-950/10"
  },
  {
    title: "Healthy Diet & Nutrition",
    desc: "Key foods for building strong body immunity.",
    query: "What is a balanced diet for good immunity and nutrition?",
    icon: Apple,
    color: "text-emerald-400 border-emerald-500/20 hover:border-emerald-500/50 bg-emerald-950/10"
  },
  {
    title: "Vaccination Guide",
    desc: "Essential vaccine schedules for infants & mothers.",
    query: "Why are vaccinations important and what is the schedule?",
    icon: ShieldCheck,
    color: "text-blue-400 border-blue-500/20 hover:border-blue-500/50 bg-blue-950/10"
  },
  {
    title: "Clean Water Tips",
    desc: "Simple water purification methods at home.",
    query: "How can I purify water and make it safe for drinking?",
    icon: Droplet,
    color: "text-cyan-400 border-cyan-500/20 hover:border-cyan-500/50 bg-cyan-950/10"
  },
  {
    title: "First Aid Basics",
    desc: "Immediate steps for burns, cuts, and insect bites.",
    query: "What are the basic first aid guidelines for common emergencies?",
    icon: Activity,
    color: "text-amber-400 border-amber-500/20 hover:border-amber-500/50 bg-amber-950/10"
  },
  {
    title: "Women's Health",
    desc: "Hygiene, pregnancy wellness, and anemia prevention.",
    query: "What are the key nutrition and hygiene guidelines for women's health?",
    icon: Heart,
    color: "text-pink-400 border-pink-500/20 hover:border-pink-500/50 bg-pink-950/10"
  },
  {
    title: "Child Health & Care",
    desc: "Weaning diets, hydration, and developmental play.",
    query: "How do I care for my infant's nutrition and prevent dehydration?",
    icon: Baby,
    color: "text-violet-400 border-violet-500/20 hover:border-violet-500/50 bg-violet-950/10"
  },
  {
    title: "Mental Wellness",
    desc: "Daily stress management & self-care tips.",
    query: "What are simple daily habits to improve mental health and reduce stress?",
    icon: Sparkles,
    color: "text-teal-400 border-teal-500/20 hover:border-teal-500/50 bg-teal-950/10"
  }
];

export function OnboardingHero({ onSelectCard }) {
  return (
    <div className="flex flex-col items-center justify-center py-6 px-4 max-w-4xl mx-auto text-center">
      {/* Visual core icon badge */}
      <div className="w-16 h-16 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center mb-6 floating-hologram">
        <BrainCircuit className="w-8 h-8 text-cyan-400" />
      </div>

      <h1 className="text-display-lg font-bold text-transparent bg-clip-text bg-gradient-to-r from-white via-cyan-100 to-cyan-300 text-3xl md:text-4xl tracking-tight mb-3">
        Welcome to AI HealthMate
      </h1>
      
      <p className="text-on-surface-variant max-w-2xl text-body-lg text-sm md:text-base mb-8">
        Your interactive digital healthcare awareness assistant. Ask me questions about common diseases, nutrition, clean water, first aid, and preventive hygiene.
      </p>

      {/* Grid of predefined actions */}
      <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {QUICK_CARDS.map((card, idx) => {
          const Icon = card.icon;
          return (
            <button
              key={idx}
              onClick={() => onSelectCard(card.query)}
              className={`p-4 rounded-xl border text-left transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg cursor-pointer ${card.color} group`}
            >
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2 rounded-lg bg-white/5 group-hover:bg-white/10 transition-colors">
                  <Icon className="w-5 h-5" />
                </div>
                <h3 className="font-semibold text-sm text-on-surface group-hover:text-white transition-colors">
                  {card.title}
                </h3>
              </div>
              <p className="text-xs text-on-surface-variant/80 leading-relaxed">
                {card.desc}
              </p>
            </button>
          );
        })}
      </div>

      {/* Small Safety Onboarding Card */}
      <div className="w-full p-4 rounded-xl bg-surface-container-low border border-outline-variant/30 text-left max-w-2xl flex gap-3 items-start">
        <ShieldAlert className="w-5 h-5 text-cyan-400 shrink-0 mt-0.5" />
        <div>
          <h4 className="text-xs font-semibold text-cyan-400 uppercase tracking-widest mb-1">
            Important Safety Information
          </h4>
          <p className="text-xs text-on-surface-variant leading-relaxed">
            AI HealthMate is an educational tool built for social internship purposes. It does not provide medical diagnoses, treatment plans, or prescriptions. Always consult a certified local clinic or hospital for professional health issues.
          </p>
        </div>
      </div>
    </div>
  );
}

export default OnboardingHero;
