import React, { useState, useEffect } from 'react';
import Container from '../UI/Container';
import SectionTitle from '../UI/SectionTitle';
import GlassPanel from '../UI/GlassPanel';

function StatCounter({ target, suffix = '', duration = 1500 }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const end = parseInt(target, 10);
    if (isNaN(end) || end === 0) return;

    const totalMiliseconds = duration;
    const incrementTime = Math.max(Math.floor(totalMiliseconds / end), 15);
    
    const timer = setInterval(() => {
      start += 1;
      setCount(start);
      if (start >= end) {
        clearInterval(timer);
      }
    }, incrementTime);

    return () => clearInterval(timer);
  }, [target, duration]);

  return (
    <span className="font-mono-data text-3xl md:text-4xl font-bold text-secondary text-glow">
      {count}{suffix}
    </span>
  );
}

function HealthStats() {
  const statsList = [
    { label: "Health Topics", target: "12", icon: "menu_book", color: "text-primary" },
    { label: "First Aid Guides", target: "8", icon: "medical_services", color: "text-secondary-container" },
    { label: "Sessions Conducted", target: "15", icon: "campaign", color: "text-tertiary-container" },
    { label: "Members Reached", target: "450", suffix: "+", icon: "groups", color: "text-primary" }
  ];

  return (
    <section className="py-20 md:py-28 border-t border-white/5 relative z-10">
      <Container>
        <SectionTitle
          title="Campaign Impact Statistics"
          subtitle="Metrics of Wellness Education"
        />

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {statsList.map((stat, idx) => (
            <GlassPanel
              key={idx}
              className="p-6 flex flex-col justify-between items-center text-center gap-3 relative"
            >
              <span className={`material-symbols-outlined text-3xl ${stat.color} p-3 rounded-full bg-white/5`} aria-hidden="true">
                {stat.icon}
              </span>
              
              <div className="flex flex-col gap-1 mt-2">
                <StatCounter target={stat.target} suffix={stat.suffix} />
                <span className="text-[10px] font-semibold uppercase tracking-wider text-on-surface-variant opacity-75">
                  {stat.label}
                </span>
              </div>
            </GlassPanel>
          ))}
        </div>
      </Container>
    </section>
  );
}

export default HealthStats;
