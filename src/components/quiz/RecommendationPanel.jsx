import React, { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Sparkles, BrainCircuit, Stethoscope, BookOpen } from 'lucide-react';

export function RecommendationPanel({ missedTopics, language }) {
  const navigate = useNavigate();

  const handleAskAI = (query) => {
    navigate('/assistant', { state: { prefilledQuery: query } });
  };

  const handleReadLibrary = () => {
    navigate('/health-library');
  };

  const handleReadGuide = () => {
    navigate('/health-guide');
  };

  // Convert topic IDs to readable names
  const readableNames = useMemo(() => {
    const map = {
      dengue: "Dengue Fever",
      malaria: "Malaria Control",
      firstaid: "First Aid Basics",
      nutrition: "Nutrition & Diet",
      vaccination: "Vaccinations",
      cleanwater: "Clean Water Habits",
      sanitation: "Sanitation & Waste Care",
      mentalhealth: "Mental Wellness",
      lifestyle: "Healthy Lifestyle",
      hygiene: "Personal Hygiene",
      hypertension: "High Blood Pressure"
    };
    return missedTopics.map(id => map[id] || id);
  }, [missedTopics]);

  if (missedTopics.length === 0) {
    return (
      <div className="p-5 rounded-2xl bg-emerald-950/10 border border-emerald-500/25 text-center max-w-2xl mx-auto space-y-2">
        <Sparkles className="w-8 h-8 text-emerald-400 mx-auto animate-pulse" />
        <h4 className="font-bold text-sm text-emerald-400">Perfect Score / Outstanding Performance!</h4>
        <p className="text-xs text-on-surface-variant max-w-sm mx-auto leading-relaxed">
          You demonstrated excellent healthcare awareness. Keep exploring the library to stay updated on other topics!
        </p>
      </div>
    );
  }

  const titleText = language === 'en' ? "Personalized Study Recommendations" : "व्यक्तिगत अध्ययन सिफारिशें";

  return (
    <div className="p-5 rounded-2xl bg-surface-container-low/40 border border-outline-variant/20 space-y-4 max-w-2xl mx-auto text-left">
      
      <div className="space-y-1">
        <h3 className="font-bold text-sm text-cyan-400 flex items-center gap-2 uppercase tracking-wider font-mono">
          <Sparkles className="w-4 h-4 text-cyan-400 shrink-0" />
          {titleText}
        </h3>
        <p className="text-[10px] text-outline">
          {language === 'en' 
            ? "Based on your incorrect answers, we recommend reviewing these specific modules:" 
            : "आपके गलत उत्तरों के आधार पर, हम इन विशिष्ट मॉड्यूलों की समीक्षा करने की सलाह देते हैं:"}
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
        
        {/* 1. Health Library Card */}
        <div className="p-3.5 rounded-xl bg-surface-container/60 border border-outline-variant/15 flex flex-col justify-between items-start gap-3">
          <div className="space-y-1">
            <BookOpen className="w-5 h-5 text-cyan-400" />
            <h4 className="font-semibold text-xs text-on-surface">Health Library</h4>
            <p className="text-[9px] text-on-surface-variant leading-relaxed">
              Read comprehensive articles on {readableNames.slice(0, 2).join(', ')}.
            </p>
          </div>
          <button
            onClick={handleReadLibrary}
            className="text-[10px] font-bold text-cyan-400 hover:text-cyan-300 transition-colors cursor-pointer"
          >
            Open Library →
          </button>
        </div>

        {/* 2. Health Guide Card */}
        <div className="p-3.5 rounded-xl bg-surface-container/60 border border-outline-variant/15 flex flex-col justify-between items-start gap-3">
          <div className="space-y-1">
            <Stethoscope className="w-5 h-5 text-cyan-400" />
            <h4 className="font-semibold text-xs text-on-surface">First Aid Guide</h4>
            <p className="text-[9px] text-on-surface-variant leading-relaxed">
              Check emergency timeline procedures and symptom red flags.
            </p>
          </div>
          <button
            onClick={handleReadGuide}
            className="text-[10px] font-bold text-cyan-400 hover:text-cyan-300 transition-colors cursor-pointer"
          >
            Open Guides →
          </button>
        </div>

        {/* 3. AI Assistant Questions Card */}
        <div className="p-3.5 rounded-xl bg-surface-container/60 border border-outline-variant/15 flex flex-col justify-between items-start gap-3">
          <div className="space-y-1">
            <BrainCircuit className="w-5 h-5 text-cyan-400 animate-pulse" />
            <h4 className="font-semibold text-xs text-on-surface">AI Assistant</h4>
            <p className="text-[9px] text-on-surface-variant leading-relaxed">
              Ask AI about missed concepts to clarify reasons why options failed.
            </p>
          </div>
          <button
            onClick={() => handleAskAI(`Can you explain why the symptoms of ${readableNames[0]} occur and how to manage them?`)}
            className="text-[10px] font-bold text-cyan-400 hover:text-cyan-300 transition-colors cursor-pointer"
          >
            Ask AI Assistant →
          </button>
        </div>

      </div>

    </div>
  );
}

export default RecommendationPanel;
