import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ANIM_EASE, ANIM_DURATION_SLOW } from '../../utils/animations';

function ScrollReveal({ children, className = '', variant = 'fadeUp', delay = 0 }) {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);

    const handleChange = (e) => setPrefersReducedMotion(e.matches);
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  // Standard variants
  const variants = {
    fadeUp: {
      hidden: { opacity: 0, y: prefersReducedMotion ? 0 : 30 },
      visible: { opacity: 1, y: 0 }
    },
    fade: {
      hidden: { opacity: 0 },
      visible: { opacity: 1 }
    },
    scaleUp: {
      hidden: { opacity: 0, scale: prefersReducedMotion ? 1 : 0.95 },
      visible: { opacity: 1, scale: 1 }
    }
  };

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      variants={variants[prefersReducedMotion ? 'fade' : variant]}
      transition={{
        duration: ANIM_DURATION_SLOW,
        ease: ANIM_EASE,
        delay: delay
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export default ScrollReveal;
