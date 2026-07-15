import React from 'react';
import MaterialIcon from '../UI/MaterialIcon';

import { useNavigate } from 'react-router-dom';
import Container from '../UI/Container';
import GlassPanel from '../UI/GlassPanel';
import Button from '../UI/Button';

function CallToAction() {
  const navigate = useNavigate();

  return (
    <section className="py-20 md:py-28 border-t border-white/5 relative z-10">
      <Container>
        <GlassPanel glowVariant="violet" className="p-8 md:p-12 text-center relative overflow-hidden">
          {/* Decorative radial lighting */}
          <div className="absolute -top-24 -left-24 w-80 h-80 rounded-full bg-primary/5 filter blur-3xl"></div>
          <div className="absolute -bottom-24 -right-24 w-80 h-80 rounded-full bg-tertiary-container/5 filter blur-3xl"></div>
          
          <div className="relative z-10 flex flex-col items-center gap-6 max-w-xl mx-auto">
            <span className="material-symbols-outlined text-primary text-5xl animate-pulse" aria-hidden="true">
              campaign
            </span>
            
            <h2 className="font-display-lg text-2xl md:text-3xl font-extrabold text-secondary tracking-tight">
              Host a Community Awareness Session
            </h2>
            
            <p className="text-body-sm text-on-surface-variant text-[14px] leading-relaxed">
              Are you a teacher, volunteer, or health camp organizer? Launch our guided slideshow mode to present prevention tutorials, test the group, and print certificates of achievement.
            </p>
            
            <Button
              onClick={() => navigate('/awareness-session')}
              variant="tertiary"
              iconLeft={<MaterialIcon icon="school" className="text-sm" />}
            >
              Start Guided Session Mode
            </Button>
          </div>
        </GlassPanel>
      </Container>
    </section>
  );
}

export default CallToAction;
