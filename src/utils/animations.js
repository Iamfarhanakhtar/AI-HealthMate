// Shared animation durations and easings matching Apple/Vercel styling
export const ANIM_EASE = [0.25, 0.1, 0.25, 1.0]; // Premium cubic-bezier easeOut
export const ANIM_DURATION_FAST = 0.2;
export const ANIM_DURATION_NORMAL = 0.4;
export const ANIM_DURATION_SLOW = 0.6;

// Reusable Framer Motion Variants
export const heroStaggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.2 }
  }
};

export const heroItemFadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: ANIM_DURATION_SLOW, ease: ANIM_EASE }
  }
};

export const buttonMicroInteraction = {
  hover: { scale: 1.03, transition: { duration: ANIM_DURATION_FAST } },
  tap: { scale: 0.97, transition: { duration: ANIM_DURATION_FAST } }
};

export const cardHoverTransition = {
  hover: {
    y: -4,
    scale: 1.015,
    backgroundColor: "rgba(255, 255, 255, 0.05)",
    boxShadow: "0 12px 35px rgba(0, 0, 0, 0.5)",
    transition: { duration: ANIM_DURATION_FAST, ease: "easeOut" }
  }
};
