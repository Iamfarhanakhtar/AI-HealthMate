import React from 'react';
import { useNavigate } from 'react-router-dom';
import Container from '../UI/Container';
import SectionTitle from '../UI/SectionTitle';
import Card from '../UI/Card';

function CoreFeatures() {
  const navigate = useNavigate();

  const features = [
    {
      title: "Disease Awareness Hub",
      desc: "Visual articles explaining malaria symptoms, Dengue preventative checklists, and hygiene rules.",
      icon: "menu_book",
      path: "/health-library",
      color: "text-primary"
    },
    {
      title: "Guided Session Camp Mode",
      desc: "Structured slideshow sequence designed for local volunteers to run health awareness workshops.",
      icon: "school",
      path: "/awareness-session",
      color: "text-secondary-container"
    },
    {
      title: "Symptom Checker Triage",
      desc: "Educational tool mapping symptom selections to health guides, warning signs, and first aid tips.",
      icon: "medical_services",
      path: "/health-guide",
      color: "text-tertiary-container"
    },
    {
      title: "Interactive Health Quizzes",
      desc: "Gamified trivia sheets checking comprehension on hygiene, with downloadable Champion Certificates.",
      icon: "workspace_premium",
      path: "/quiz",
      color: "text-primary"
    }
  ];

  return (
    <section className="py-20 md:py-28 border-t border-white/5 relative z-10">
      <Container>
        <SectionTitle
          title="Interactive Educational Portals"
          subtitle="Explore the Core Features"
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {features.map((feat, idx) => (
            <Card
              key={idx}
              onClick={() => navigate(feat.path)}
              className="flex flex-col justify-between items-start gap-4 min-h-[180px]"
            >
              <div className="flex gap-4 items-center w-full">
                <span className={`material-symbols-outlined text-3xl ${feat.color} p-2 bg-white/5 rounded-lg`}>
                  {feat.icon}
                </span>
                <h3 className="font-title-md text-lg font-bold text-secondary text-left">
                  {feat.title}
                </h3>
              </div>
              <p className="text-body-sm text-on-surface-variant text-[13px] text-left leading-relaxed">
                {feat.desc}
              </p>
            </Card>
          ))}
        </div>
      </Container>
    </section>
  );
}

export default CoreFeatures;
