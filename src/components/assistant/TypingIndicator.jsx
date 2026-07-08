import React from 'react';
import { BrainCircuit } from 'lucide-react';

export function TypingIndicator() {
  return (
    <div className="flex items-start gap-4 p-4 md:p-6 bg-surface-container-low/30 border-y border-outline-variant/10">
      <div className="w-8 h-8 rounded-lg bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center shrink-0">
        <BrainCircuit className="w-4 h-4 text-cyan-400" />
      </div>
      
      <div className="flex flex-col gap-1 mt-1">
        <span className="text-xs font-semibold text-on-surface-variant">AI HealthMate</span>
        <div className="flex items-center gap-1.5 py-2 px-3 rounded-xl bg-surface-container/60 border border-outline-variant/20 w-fit">
          <span className="w-2.5 h-2.5 rounded-full bg-cyan-400/60 animate-bounce" style={{ animationDelay: '0ms' }}></span>
          <span className="w-2.5 h-2.5 rounded-full bg-cyan-400/60 animate-bounce" style={{ animationDelay: '150ms' }}></span>
          <span className="w-2.5 h-2.5 rounded-full bg-cyan-400/60 animate-bounce" style={{ animationDelay: '300ms' }}></span>
        </div>
      </div>
    </div>
  );
}

export default TypingIndicator;
