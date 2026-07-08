import React, { useContext } from 'react';
import { motion } from 'framer-motion';
import { PlatformContext } from '../context/PlatformContext';
import GlassPanel from './UI/GlassPanel';

function ImpactDashboard() {
  const { impactMetrics } = useContext(PlatformContext);

  const stats = [
    {
      label: "People Educated",
      value: impactMetrics.peopleEducated,
      icon: "groups",
      color: "text-primary",
      glow: "cyan"
    },
    {
      label: "Certificates Generated",
      value: impactMetrics.certificatesGenerated,
      icon: "workspace_premium",
      color: "text-secondary-container",
      glow: "cyan"
    },
    {
      label: "Quiz Attempts",
      value: impactMetrics.quizAttempts,
      icon: "quiz",
      color: "text-tertiary-container",
      glow: "violet"
    },
    {
      label: "Questions Asked to AI",
      value: impactMetrics.questionsAsked,
      icon: "forum",
      color: "text-primary",
      glow: "cyan"
    },
    {
      label: "Sessions Conducted",
      value: impactMetrics.sessionsConducted,
      icon: "campaign",
      color: "text-secondary-container",
      glow: "cyan"
    },
    {
      label: "Community Rating",
      value: `${impactMetrics.averageRating} / 5.0`,
      icon: "thumb_up",
      color: "text-tertiary-container",
      glow: "violet"
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    show: { y: 0, opacity: 1, transition: { type: "spring", stiffness: 100 } }
  };

  return (
    <div className="w-full">
      <div className="text-center mb-10 max-w-xl mx-auto">
        <span className="font-label-caps text-label-caps text-primary uppercase tracking-widest bg-primary/5 px-3 py-1 rounded-full border border-primary/20">
          Live Platform Stats
        </span>
        <h2 className="font-headline-lg text-headline-lg mt-3 text-secondary font-bold">
          Social Internship Impact
        </h2>
        <p className="text-body-sm text-on-surface-variant mt-2 leading-relaxed">
          Measuring the real-world awareness and educational reach generated across schools, villages, and community camps.
        </p>
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-100px" }}
        className="grid grid-cols-2 md:grid-cols-3 gap-6"
      >
        {stats.map((stat, index) => (
          <motion.div key={index} variants={itemVariants}>
            <GlassPanel
              hoverLift
              glowVariant={stat.glow}
              className="p-6 h-full flex flex-col justify-between items-center text-center gap-3 relative group"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-white/[0.01] to-white/[0.03] pointer-events-none"></div>
              
              <span className={`material-symbols-outlined text-4xl ${stat.color} p-3 rounded-full bg-white/5`}>
                {stat.icon}
              </span>
              
              <div className="flex flex-col gap-1">
                <span className="font-mono-data text-2xl md:text-3xl font-bold text-secondary text-glow">
                  {stat.value}
                </span>
                <span className="text-[11px] md:text-xs font-semibold uppercase tracking-wider text-on-surface-variant opacity-75">
                  {stat.label}
                </span>
              </div>
            </GlassPanel>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}

export default ImpactDashboard;
