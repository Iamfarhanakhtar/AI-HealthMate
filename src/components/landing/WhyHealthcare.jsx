import React from 'react';
import { motion } from 'framer-motion';
import Container from '../UI/Container';
import SectionTitle from '../UI/SectionTitle';
import GlassPanel from '../UI/GlassPanel';

function WhyHealthcare() {
  const challenges = [
    {
      title: "Geographical Distance",
      desc: "Many villagers live hours away from primary clinics, turning minor symptoms into severe, late-diagnosed conditions.",
      icon: "distance"
    },
    {
      title: "Misinformation Spreads",
      desc: "Superstitions or unverified claims often override clinical first aid advice, leading to incorrect wound treatments.",
      icon: "warning"
    },
    {
      title: "Critical Shortages",
      desc: "Healthcare workers cannot visit every village constantly. People lack daily guidance on basic hygiene and sanitation.",
      icon: "clinical_notes"
    }
  ];

  return (
    <section className="py-20 md:py-28 border-t border-white/5 relative z-10">
      <Container>
        {/* Why Healthcare Matters */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
          <div className="text-left flex flex-col gap-4">
            <span className="font-label-caps text-label-caps text-primary uppercase tracking-widest bg-primary/5 px-3 py-1 rounded-full border border-primary/20 w-fit">
              Prevention is Protection
            </span>
            <h2 className="font-headline-lg text-[32px] md:text-[40px] text-secondary font-bold tracking-tight">
              Why Public Health Awareness Matters
            </h2>
            <p className="text-body-sm text-on-surface-variant leading-relaxed">
              Medical cures are expensive, but prevention is accessible. By educating teachers, students, and community heads on water cleanliness, mosquito breeding control, and basic nutrition, we build a shield of wellness directly in the household.
            </p>
            <p className="text-body-sm text-on-surface-variant leading-relaxed">
              Our B.Tech Social Internship campaign focuses on transferring medical knowledge from clinic portals into simple, visual, and bilingual awareness guides.
            </p>
          </div>

          <div className="relative p-8 rounded-2xl border border-[#36ffc4]/15 bg-gradient-to-br from-[#36ffc4]/5 to-transparent text-left">
            <span className="material-symbols-outlined text-[#36ffc4] text-4xl mb-4">
              health_and_safety
            </span>
            <h3 className="font-title-md text-lg font-bold text-secondary mb-2">
              Primary Objective
            </h3>
            <p className="text-body-sm text-on-surface-variant text-[13px] leading-relaxed">
              Reduce the outbreak rates of waterborne infections (Typhoid, cholera) and mosquito vector spreads (Dengue, Malaria) by up to 40% through community-led prevention campaigns.
            </p>
          </div>
        </div>

        {/* Rural Healthcare Challenges */}
        <div className="mt-16">
          <SectionTitle
            title="Rural Healthcare Challenges"
            subtitle="The Unseen Barriers"
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {challenges.map((chal, index) => (
              <GlassPanel key={index} className="p-6 text-left flex flex-col gap-3 relative">
                <span className="material-symbols-outlined text-primary text-3xl p-2 bg-white/5 rounded-lg w-fit">
                  {chal.icon}
                </span>
                <h4 className="font-title-md text-[16px] font-bold text-secondary">
                  {chal.title}
                </h4>
                <p className="text-body-sm text-on-surface-variant text-[13px] leading-relaxed">
                  {chal.desc}
                </p>
              </GlassPanel>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}

export default WhyHealthcare;
