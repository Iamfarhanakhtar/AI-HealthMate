import React from 'react';
import { BrainCircuit, HelpCircle, AlertCircle, Sparkles, Check, X } from 'lucide-react';

export function QuestionCard({ 
  question, 
  selectedOption, 
  isAnswerChecked, 
  onSelectOption, 
  onCheckAnswer, 
  onSkip, 
  onNext, 
  isLast, 
  language 
}) {
  const displayQuestion = question?.question?.[language] || question?.question?.en || "Question text unavailable";
  const options = question?.options?.[language] || question?.options?.en || [];

  return (
    <div className="p-5 sm:p-6 rounded-2xl bg-surface-container-low/40 border border-outline-variant/20 space-y-6 max-w-2xl mx-auto shadow-2xl backdrop-blur-md">
      
      {/* 1. Header info */}
      <div className="flex items-center justify-between">
        <span className="text-[10px] uppercase font-mono tracking-widest text-cyan-400 font-semibold px-2 py-0.5 rounded bg-cyan-500/10 border border-cyan-500/20">
          {question.difficulty}
        </span>
        <span className="text-[10px] text-outline font-mono uppercase">
          {question.type} Question
        </span>
      </div>

      {/* 2. Question Text */}
      <h3 className="text-base sm:text-lg font-bold text-on-surface leading-snug">
        {displayQuestion}
      </h3>

      {/* 3. Option Selection Grid (With keyboard indexing support) */}
      <div className="space-y-2.5">
        {options.map((option, idx) => {
          const isSelected = selectedOption === idx;
          const isCorrect = question.correct === idx;
          
          let optionStyle = "border-outline-variant/20 bg-surface-container/45 hover:border-cyan-500/30 text-on-surface-variant";
          let checkIcon = null;

          if (isAnswerChecked) {
            if (isCorrect) {
              optionStyle = "border-emerald-500 bg-emerald-950/15 text-emerald-300";
              checkIcon = <Check className="w-4 h-4 text-emerald-400" />;
            } else if (isSelected) {
              optionStyle = "border-red-500 bg-red-950/15 text-red-300";
              checkIcon = <X className="w-4 h-4 text-red-400" />;
            } else {
              optionStyle = "border-outline-variant/10 bg-transparent text-outline-variant opacity-60";
            }
          } else if (isSelected) {
            optionStyle = "border-cyan-500 bg-cyan-500/5 text-cyan-300";
          }

          const handleKeyDown = (e) => {
            if (e.key === ' ' || e.key === 'Enter') {
              e.preventDefault();
              onSelectOption(idx);
            }
          };

          return (
            <button
              key={idx}
              disabled={isAnswerChecked}
              onClick={() => onSelectOption(idx)}
              onKeyDown={handleKeyDown}
              tabIndex={isAnswerChecked ? -1 : 0}
              className={`w-full text-left p-3.5 rounded-xl border transition-all duration-300 flex items-center justify-between text-xs sm:text-sm font-semibold cursor-pointer focus:outline-none focus:ring-1 focus:ring-cyan-500/50 ${optionStyle}`}
            >
              <div className="flex gap-3 items-center">
                <span className="text-[10px] font-mono text-outline shrink-0">
                  {String.fromCharCode(65 + idx)}.
                </span>
                <span>{option}</span>
              </div>
              {checkIcon}
            </button>
          );
        })}
      </div>

      {/* 4. Correct/Incorrect inline explanation drawer */}
      {isAnswerChecked && (
        <div className="p-4 rounded-xl bg-surface-container/60 border border-outline-variant/20 space-y-2 animate-fade-in text-xs leading-relaxed text-on-surface-variant">
          <div className="flex items-center gap-1.5 font-bold uppercase tracking-wider text-[10px]">
            {selectedOption === question.correct ? (
              <span className="text-emerald-400">✓ Correct</span>
            ) : (
              <span className="text-red-400">✗ Incorrect</span>
            )}
          </div>
          <p>{question?.explanation?.[language] || question?.explanation?.en || "No explanation provided."}</p>
        </div>
      )}

      {/* 5. Navigation Control Bar */}
      <div className="flex gap-2 justify-end pt-4 border-t border-outline-variant/10 shrink-0">
        
        {/* Skip Button */}
        {!isAnswerChecked && (
          <button
            onClick={onSkip}
            className="px-4 py-2 rounded-xl bg-surface-container border border-outline-variant/30 hover:border-cyan-500/30 text-on-surface-variant hover:text-white text-xs font-semibold transition-all cursor-pointer"
          >
            {language === 'en' ? 'Skip' : 'छोड़ें'}
          </button>
        )}

        {/* Check Answer Trigger */}
        {!isAnswerChecked ? (
          <button
            disabled={selectedOption === null}
            onClick={onCheckAnswer}
            className={`px-4 py-2 rounded-xl font-semibold text-xs transition-all cursor-pointer ${
              selectedOption !== null 
                ? 'bg-cyan-500 text-on-primary hover:bg-cyan-400' 
                : 'bg-surface-container/50 text-outline cursor-not-allowed border border-outline-variant/10'
            }`}
          >
            {language === 'en' ? 'Check Answer' : 'जांचें'}
          </button>
        ) : (
          <button
            onClick={onNext}
            className="px-4 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-on-primary font-semibold text-xs transition-colors cursor-pointer"
          >
            {isLast ? (language === 'en' ? 'Finish' : 'समाप्त') : (language === 'en' ? 'Next' : 'अगला')}
          </button>
        )}
      </div>

    </div>
  );
}

export default QuestionCard;
