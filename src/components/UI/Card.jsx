import React from 'react';
import { motion } from 'framer-motion';
import { cardHoverTransition } from '../../utils/animations';

function Card({ children, className = '', onClick }) {
  return (
    <motion.div
      onClick={onClick}
      whileHover="hover"
      variants={cardHoverTransition}
      className={`glass-panel rounded-xl p-6 relative overflow-hidden transition-colors border border-white/8 cursor-pointer group ${className}`}
    >
      {/* Decorative gradient border outline glow on hover */}
      <div className="absolute inset-0 border border-primary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl pointer-events-none"></div>
      
      {/* Soft gradient bottom layer reflection */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/[0.01] to-white/[0.03] pointer-events-none"></div>

      {children}
    </motion.div>
  );
}

export default Card;
