import React, { useState } from 'react';
import { ChevronDown, ChevronUp, Check, X, AlertCircle } from 'lucide-react';

export function QuizReview({ questions, userAnswers, language }) {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleOpen = (idx) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <div className="p-5 rounded-2xl bg-surface-container-low/40 border border-outline-variant/20 space-y-4 max-w-2xl mx-auto text-left">
      
      <div className="space-y-1 pb-3 border-b border-outline-variant/10">
        <h3 className="font-bold text-sm text-on-surface flex items-center gap-2">
          <AlertCircle className="w-4 h-4 text-cyan-400" />
          {language === 'en' ? 'Review Quiz Questions' : 'प्रश्नों की समीक्षा करें'}
        </h3>
        <p className="text-[10px] text-outline">
          {language === 'en' ? 'Expand each question to see explanation detail.' : 'विवरण देखने के लिए प्रत्येक प्रश्न का विस्तार करें।'}
        </p>
      </div>

      <div className="space-y-2">
        {questions.map((q, idx) => {
          const isOpen = openIndex === idx;
          const userAnsIdx = userAnswers[idx];
          const isCorrect = userAnsIdx === q.correct;
          const isSkipped = userAnsIdx === -1;

          let statusIcon = <X className="w-4 h-4 text-red-400 shrink-0" />;
          let statusText = language === 'en' ? "Incorrect" : "गलत";
          let statusBg = "border-red-500/20 hover:border-red-500/30";

          if (isCorrect) {
            statusIcon = <Check className="w-4 h-4 text-emerald-400 shrink-0" />;
            statusText = language === 'en' ? "Correct" : "सही";
            statusBg = "border-emerald-500/20 hover:border-emerald-500/30";
          } else if (isSkipped) {
            statusIcon = <AlertCircle className="w-4 h-4 text-outline shrink-0" />;
            statusText = language === 'en' ? "Skipped" : "छोड़ा गया";
            statusBg = "border-outline-variant/20 hover:border-outline-variant/30";
          }

          return (
            <div 
              key={q.id}
              className={`rounded-xl border bg-surface-container/30 transition-all overflow-hidden ${statusBg}`}
            >
              <button
                onClick={() => toggleOpen(idx)}
                className="flex items-center justify-between w-full p-3.5 text-left text-xs font-semibold cursor-pointer"
              >
                <div className="flex gap-2.5 items-center min-w-0">
                  {statusIcon}
                  <span className="truncate text-on-surface font-semibold flex-1">
                    Q{idx + 1}: {q?.question?.[language] || q?.question?.en || "Missing Question"}
                  </span>
                </div>
                {isOpen ? <ChevronUp className="w-4 h-4 text-outline" /> : <ChevronDown className="w-4 h-4 text-outline" />}
              </button>

              {isOpen && (
                <div className="px-4 pb-4 pt-1 text-xs text-on-surface-variant leading-relaxed space-y-3 border-t border-outline-variant/10 bg-surface-container-low/10">
                  
                  {/* Options List */}
                  <div className="space-y-1.5 mb-4">
                    {(q?.options?.[language] || q?.options?.en || []).map((option, optIdx) => {
                      const isCorrectOpt = q.correct === optIdx;
                      const isSelectedOpt = userAnsIdx === optIdx;
                      
                      let textStyle = "text-outline-variant";
                      if (isCorrectOpt) textStyle = "text-emerald-400 font-bold";
                      else if (isSelectedOpt) textStyle = "text-red-400 font-bold";

                      return (
                        <div key={optIdx} className="flex gap-2 items-center">
                          <span className="w-1.5 h-1.5 rounded-full bg-surface-container-high shrink-0"></span>
                          <span className={textStyle}>{option}</span>
                        </div>
                      );
                    })}
                  </div>

                  {/* Explanation */}
                  <div className="p-3 rounded-lg bg-surface-container-low/40 border border-outline-variant/10">
                    <span className="font-mono text-[9px] uppercase tracking-wider text-cyan-400 font-semibold block mb-0.5">Explanation</span>
                    <p>{q?.explanation?.[language] || q?.explanation?.en || "No explanation provided."}</p>
                  </div>
                </div>
              )}

            </div>
          );
        })}
      </div>

    </div>
  );
}

export default QuizReview;
