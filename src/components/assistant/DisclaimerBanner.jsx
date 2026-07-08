import React, { useState, useEffect } from 'react';
import { AlertCircle, X } from 'lucide-react';

export function DisclaimerBanner() {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const isDismissed = sessionStorage.getItem('ai_healthmate_disclaimer_dismissed');
    if (isDismissed) {
      setVisible(false);
    }
  }, []);

  const handleDismiss = () => {
    sessionStorage.setItem('ai_healthmate_disclaimer_dismissed', 'true');
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className="w-full bg-cyan-950/20 border-b border-cyan-500/20 px-4 py-3 flex items-center justify-between gap-3 text-cyan-200">
      <div className="flex items-center gap-2.5 text-xs md:text-sm">
        <AlertCircle className="w-4 h-4 text-cyan-400 shrink-0" />
        <p className="leading-relaxed">
          <strong className="font-semibold text-cyan-300">Educational Disclaimer:</strong> AI HealthMate provides public health information only and is not a substitute for professional medical advice, diagnosis, or treatment.
        </p>
      </div>
      <button 
        onClick={handleDismiss} 
        aria-label="Dismiss disclaimer"
        className="p-1 rounded-md hover:bg-cyan-500/10 text-cyan-400 hover:text-cyan-200 transition-colors shrink-0 cursor-pointer"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  );
}

export default DisclaimerBanner;
