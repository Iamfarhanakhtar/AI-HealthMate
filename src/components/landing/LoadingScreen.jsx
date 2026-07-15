import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

function LoadingScreen({ onComplete }) {
  const [progress, setProgress] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    // 1. Progress count animation
    let count = 0;
    const progressTimer = setInterval(() => {
      count += 5;
      setProgress(Math.min(count, 100));
      if (count >= 100) {
        clearInterval(progressTimer);
      }
    }, 40);

    // 2. Wait for fonts loading and basic layout mount
    Promise.all([
      document.fonts ? document.fonts.ready : Promise.resolve(),
      new Promise(resolve => setTimeout(resolve, 1000)) // Guarantee at least 1s view for smooth transitions
    ]).then(() => {
      setProgress(100);
      setTimeout(() => {
        setVisible(false);
        if (onComplete) onComplete();
      }, 300);
    });

    return () => clearInterval(progressTimer);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4, ease: "easeInOut" }}
          className="fixed inset-0 z-[100] bg-[#05070A] flex flex-col justify-center items-center gap-6"
        >
          {/* Breathing Neon Logo */}
          <motion.div
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ repeat: Infinity, duration: 2.0, ease: "easeInOut" }}
            className="flex items-center gap-3"
          >
            <span className="material-symbols-outlined text-primary text-5xl text-glow" aria-hidden="true">
              psychiatry
            </span>
            <span className="font-display-lg text-2xl font-bold text-primary tracking-tight text-glow">
              AI HealthMate
            </span>
          </motion.div>

          {/* Progress Indicator */}
          <div className="w-48 h-1.5 bg-[#191c22] rounded-full overflow-hidden border border-white/5 relative">
            <motion.div
              className="h-full bg-gradient-to-r from-[#00f2ff] to-[#36ffc4] glow-cyan rounded-full"
              style={{ width: `${progress}%` }}
              transition={{ ease: "easeOut", duration: 0.1 }}
            />
          </div>

          <span className="text-[10px] uppercase tracking-widest text-outline font-mono-data">
            Loading Campaign Portal...
          </span>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default LoadingScreen;
