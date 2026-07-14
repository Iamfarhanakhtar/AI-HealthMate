import React from 'react';
import ScrollReveal from '../components/UI/ScrollReveal';

// Landing Sections (Storyflow narrative)
import Hero from '../components/landing/Hero';
import WhyHealthcare from '../components/landing/WhyHealthcare';
import WhyHealthMate from '../components/landing/WhyHealthMate';
import CoreFeatures from '../components/landing/CoreFeatures';
import HealthStats from '../components/landing/HealthStats';
import AIAssistantPreview from '../components/landing/AIAssistantPreview';
import CallToAction from '../components/landing/CallToAction';

function Home() {
  return (
    <div className="w-full">
      {/* 1. Hero */}
      <ScrollReveal variant="fade" className="w-full">
        <Hero />
      </ScrollReveal>

      {/* 2. Why Healthcare Matters & Rural Challenges */}
      <ScrollReveal variant="fadeUp" className="w-full">
        <WhyHealthcare />
      </ScrollReveal>

      {/* 3. How AI HealthMate Helps */}
      <ScrollReveal variant="fadeUp" className="w-full">
        <WhyHealthMate />
      </ScrollReveal>

      {/* 4. Core Features Portals */}
      <ScrollReveal variant="scaleUp" className="w-full">
        <CoreFeatures />
      </ScrollReveal>

      {/* 5. Health Statistics Counters */}
      <ScrollReveal variant="fadeUp" className="w-full">
        <HealthStats />
      </ScrollReveal>

      {/* 6. AI Assistant Preview Card */}
      <ScrollReveal variant="scaleUp" className="w-full">
        <AIAssistantPreview />
      </ScrollReveal>

      {/* 7. Call To Action Conclude */}
      <ScrollReveal variant="fade" className="w-full">
        <CallToAction />
      </ScrollReveal>
    </div>
  );
}

export default Home;
