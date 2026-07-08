import React from 'react';
import Container from '../UI/Container';
import SectionTitle from '../UI/SectionTitle';
import Card from '../UI/Card';

function WhyHealthMate() {
  const disciplines = [
    {
      title: "Disease Prevention",
      desc: "Learn mosquito lifecycles and simple actions to disrupt breeding sites around buckets, flowerpots, and local ponds.",
      icon: "pest_control",
      color: "text-primary"
    },
    {
      title: "Clean Water & Sanitation",
      desc: "Detailed guides on household water purification, boiling timelines, safe food handling, and ORS recipes.",
      icon: "water_drop",
      color: "text-secondary-container"
    },
    {
      title: "Nutrition & Balanced Meals",
      desc: "Prevent anemia and vitamin deficiencies using affordable, locally sourced vegetable diets and breast feeding guidelines.",
      icon: "restaurant",
      color: "text-tertiary-container"
    },
    {
      title: "Emergency First Aid",
      desc: "Instant instructions on managing thermal burns, snake bites, choking, and performing cardiopulmonary resuscitation.",
      icon: "emergency",
      color: "text-[#ffb4ab]"
    },
    {
      title: "Community Engagement",
      desc: "Giving local teachers, volunteers, and campaign leaders a digital slideshow tool to conduct structured wellness classes.",
      icon: "groups",
      color: "text-primary"
    }
  ];

  return (
    <section className="py-20 md:py-28 border-t border-white/5 relative z-10">
      <Container>
        <SectionTitle
          title="How AI HealthMate Helps"
          subtitle="Core Awareness Pillars"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {disciplines.map((disc, idx) => (
            <Card
              key={idx}
              className="flex flex-col justify-between items-start gap-4 min-h-[200px]"
            >
              <span className={`material-symbols-outlined text-3xl ${disc.color} p-2 bg-white/5 rounded-lg`}>
                {disc.icon}
              </span>
              <div className="text-left flex flex-col gap-1">
                <h3 className="font-title-md text-[17px] font-bold text-secondary">
                  {disc.title}
                </h3>
                <p className="text-body-sm text-on-surface-variant text-[13px] leading-relaxed">
                  {disc.desc}
                </p>
              </div>
            </Card>
          ))}
        </div>
      </Container>
    </section>
  );
}

export default WhyHealthMate;
