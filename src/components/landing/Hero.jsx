import React, { Suspense, lazy } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import Button from '../UI/Button';
import Container from '../UI/Container';

const ThreeSphere = lazy(() => import('../ThreeSphere'));

function Hero() {
  const navigate = useNavigate();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
  };

  return (
    <Container className="min-h-[85vh] flex items-center pt-8 pb-16 relative overflow-hidden">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center w-full z-10">
        
        {/* Left Side: Information & Action */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="flex flex-col gap-6 text-left"
        >
          <motion.div variants={itemVariants} className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-primary/20 bg-primary/5 w-fit">
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
            <span className="font-label-caps text-label-caps text-primary uppercase tracking-widest text-[10px]">
              B.Tech Social Internship Project
            </span>
          </motion.div>
          
          <motion.h1 
            variants={itemVariants} 
            className="font-display-lg text-[40px] md:text-[58px] leading-tight text-primary text-glow font-bold tracking-tight"
          >
            AI HealthMate
          </motion.h1>
          
          <motion.p 
            variants={itemVariants} 
            className="font-title-md text-base md:text-lg text-on-surface-variant font-light max-w-xl leading-relaxed"
          >
            Empowering Rural & Public Communities with Healthcare Education. Bridging the gap between technology and biological harmony.
          </motion.p>
          
          <motion.div variants={itemVariants} className="flex flex-wrap gap-4 pt-2">
            <Button
              onClick={() => navigate('/assistant')}
              variant="primary"
              iconLeft={<span className="material-symbols-outlined text-sm" aria-hidden="true">smart_toy</span>}
            >
              Try AI Assistant
            </Button>
            <Button
              onClick={() => navigate('/health-library')}
              variant="secondary"
              iconRight={<span className="material-symbols-outlined text-sm" aria-hidden="true">arrow_forward</span>}
            >
              Explore Library
            </Button>
          </motion.div>

          {/* Stats quick overview */}
          <motion.div 
            variants={itemVariants} 
            className="flex items-center gap-8 pt-8 mt-4 border-t border-white/10 opacity-80"
          >
            <div className="flex flex-col">
              <span className="font-display-lg text-2xl text-primary font-bold">99.8%</span>
              <span className="font-body-sm text-xs text-on-surface-variant uppercase tracking-wider font-mono-data">Model Uptime</span>
            </div>
            <div className="h-8 w-px bg-white/10"></div>
            <div className="flex flex-col">
              <span className="font-display-lg text-2xl text-primary font-bold">24/7</span>
              <span className="font-body-sm text-xs text-on-surface-variant uppercase tracking-wider font-mono-data">Continuous Access</span>
            </div>
          </motion.div>
        </motion.div>

        {/* Right Side: Visual Placeholders for Three.js Elements */}
        <div className="relative flex justify-center items-center h-[350px] md:h-[480px] w-full">
          <div className="absolute inset-0 bg-gradient-to-tr from-primary/5 to-tertiary-container/5 rounded-2xl filter blur-xl opacity-40"></div>
          
          <div className="relative w-full h-full max-w-[450px] rounded-2xl border border-white/10 bg-white/[0.02] backdrop-blur-md flex flex-col justify-center items-center p-8 overflow-hidden shadow-2xl group hover:border-primary/25 transition-all duration-300">
            {/* Soft decorative background circles */}
            <div className="absolute w-56 h-56 rounded-full bg-primary/5 filter blur-3xl -top-10 -left-10"></div>
            <div className="absolute w-44 h-44 rounded-full bg-tertiary-container/5 filter blur-3xl -bottom-10 -right-10"></div>

            {/* Lazy Loaded 3D Sphere */}
            <div className="w-full flex-1 flex items-center justify-center min-h-[200px] mb-6">
              <Suspense fallback={
                <div className="w-48 h-48 rounded-full border-2 border-dashed border-primary/30 flex items-center justify-center relative animate-[spin_40s_linear_infinite]">
                  <div className="w-36 h-36 rounded-full border border-dashed border-[#36ffc4]/40 flex items-center justify-center animate-[spin_20s_linear_infinite_reverse]">
                    <div className="w-24 h-24 rounded-full bg-gradient-to-tr from-primary/10 to-tertiary-container/10 border border-white/10 flex items-center justify-center shadow-lg">
                      <span className="material-symbols-outlined text-primary text-4xl animate-pulse" aria-hidden="true">
                        hologram
                      </span>
                    </div>
                  </div>
                </div>
              }>
                <ThreeSphere />
              </Suspense>
            </div>

            {/* Layout Extension Info Slots */}
            <div className="grid grid-cols-2 gap-3 w-full relative z-10">
              <div className="p-3 rounded-lg border border-white/5 bg-white/[0.01] text-left flex flex-col gap-1">
                <span className="text-[9px] uppercase tracking-wider text-primary font-bold">Slot A: AI Sphere</span>
                <span className="text-[10px] text-on-surface-variant leading-tight">Interactive R3F Mesh Canvas</span>
              </div>
              <div className="p-3 rounded-lg border border-white/5 bg-white/[0.01] text-left flex flex-col gap-1">
                <span className="text-[9px] uppercase tracking-wider text-secondary-container font-bold">Slot B: DNA Helix</span>
                <span className="text-[10px] text-on-surface-variant leading-tight">Vector Particle Orbit Grid</span>
              </div>
              <div className="p-3 rounded-lg border border-white/5 bg-white/[0.01] text-left flex flex-col gap-1 col-span-2 text-center">
                <span className="text-[9px] uppercase tracking-wider text-[#e3d4ff] font-bold">Slot C: Particle System</span>
                <span className="text-[10px] text-on-surface-variant leading-tight">Compilation space for background mouse hover glows</span>
              </div>
            </div>
          </div>
        </div>

      </div>
    </Container>
  );
}

export default Hero;
