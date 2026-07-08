import React, { useMemo } from 'react';
import { BookOpen, BrainCircuit, Stethoscope, Award, ClipboardCheck } from 'lucide-react';

export function LearningJourney({ quizHistory, language }) {
  // Compute user progress dynamically based on localStorage markers
  const journeyProgress = useMemo(() => {
    const hasLibrary = !!localStorage.getItem('ai_healthmate_bookmarks');
    const hasAssistant = !!localStorage.getItem('ai_healthmate_chat_history_v1');
    const hasGuide = !!localStorage.getItem('ai_healthmate_guide_bookmarks');
    const hasQuiz = quizHistory.length > 0;
    const hasCertificate = quizHistory.some(h => h.percentage >= 70);

    return [
      { id: "library", en: "Health Library", hi: "स्वास्थ्य लाइब्रेरी", active: hasLibrary, icon: BookOpen },
      { id: "assistant", en: "AI Assistant", hi: "AI सहायक", active: hasAssistant, icon: BrainCircuit },
      { id: "guide", en: "Health Guide", hi: "स्वास्थ्य गाइड", active: hasGuide, icon: Stethoscope },
      { id: "quiz", en: "Knowledge Quiz", hi: "ज्ञान प्रश्नोत्तरी", active: hasQuiz, icon: ClipboardCheck },
      { id: "certificate", en: "Certificate", hi: "प्रमाणपत्र", active: hasCertificate, icon: Award }
    ];
  }, [quizHistory]);

  const activeNodesCount = journeyProgress.filter(node => node.active).length;
  const progressPercent = Math.round((activeNodesCount / journeyProgress.length) * 100);

  const titleText = language === 'en' ? "Your Healthcare Learning Journey" : "आपका स्वास्थ्य सीखने का सफर";
  const descText = language === 'en' 
    ? `You have activated ${activeNodesCount} out of 5 healthcare modules. Explore the platform to complete your journey.`
    : `आपने 5 में से ${activeNodesCount} स्वास्थ्य मॉड्यूल सक्रिय किए हैं। अपना सफर पूरा करने के लिए प्लेटफॉर्म का अन्वेषण करें।`;

  return (
    <div className="p-5 rounded-2xl bg-surface-container-low/40 border border-outline-variant/20 space-y-6">
      
      <div className="space-y-1">
        <h3 className="font-bold text-sm text-on-surface flex items-center gap-2">
          <Award className="w-4 h-4 text-cyan-400" />
          {titleText}
        </h3>
        <p className="text-xs text-on-surface-variant leading-relaxed">
          {descText}
        </p>
      </div>

      {/* Stepper visual nodes line */}
      <div className="relative flex justify-between items-center max-w-2xl mx-auto py-4">
        
        {/* Connector line background */}
        <div className="absolute left-0 right-0 h-0.5 bg-surface-container top-1/2 -translate-y-1/2 z-0" />
        
        {/* Active connector fill */}
        <div 
          className="absolute left-0 h-0.5 bg-gradient-to-r from-cyan-500 to-emerald-400 top-1/2 -translate-y-1/2 z-0 transition-all duration-500"
          style={{ width: `${(Math.max(activeNodesCount - 1, 0) / (journeyProgress.length - 1)) * 100}%` }}
        />

        {journeyProgress.map((node, index) => {
          const Icon = node.icon;
          const label = language === 'en' ? node.en : node.hi;
          return (
            <div key={node.id} className="flex flex-col items-center gap-2 z-10 relative">
              <div 
                className={`w-9 h-9 rounded-full flex items-center justify-center border transition-all duration-300 ${
                  node.active 
                    ? 'bg-cyan-950 border-cyan-400 text-cyan-300 shadow-md shadow-cyan-500/10' 
                    : 'bg-surface-container border-outline-variant/30 text-outline'
                }`}
                title={label}
              >
                <Icon className="w-4 h-4" />
              </div>
              <span className={`text-[9px] font-semibold font-mono uppercase tracking-wider ${node.active ? 'text-cyan-300' : 'text-outline-variant'}`}>
                {label}
              </span>
            </div>
          );
        })}

      </div>

    </div>
  );
}

export default LearningJourney;
