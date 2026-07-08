import React, { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Award, 
  BookOpen, 
  BrainCircuit, 
  Stethoscope, 
  Activity,
  Flame,
  Globe,
  Share2,
  Printer,
  FileText,
  Users,
  MessageSquare,
  Smile,
  Compass,
  ArrowRight,
  ClipboardCheck,
  TrendingUp,
  Plus
} from 'lucide-react';

import Container from '../components/UI/Container';
import SectionTitle from '../components/UI/SectionTitle';
import useImpactState from '../hooks/useImpactState';
import { baselineStats, popularTopics } from '../utils/impactData';

function CommunityImpact() {
  const navigate = useNavigate();
  const {
    feedbackList,
    quizHistory,
    bookmarks,
    chatCount,
    learningStreak,
    recommendedNextStep,
    feedbackInsights,
    communityBadges
  } = useImpactState();

  // Find language
  const language = localStorage.getItem('ai_healthmate_language') || 'en';

  // Compute dynamic stats (baseline + local logs)
  const stats = useMemo(() => {
    const localQuizzesCount = quizHistory.length;
    const localCertificatesCount = quizHistory.filter(h => h.percentage >= 70).length;
    
    // Average score calculation
    let avgScore = baselineStats.baselineQuizAverage;
    if (localQuizzesCount > 0) {
      const sumLocal = quizHistory.reduce((acc, h) => acc + h.percentage, 0);
      avgScore = Math.round((baselineStats.baselineQuizAverage * 10 + sumLocal / localQuizzesCount) / 11);
    }

    return {
      reached: baselineStats.baselineVisitors + feedbackList.length * 3 + localQuizzesCount * 2,
      topicsCompleted: baselineStats.baselineQuizzesCompleted + localQuizzesCount,
      chats: baselineStats.baselineQueriesAsked + chatCount,
      certificates: baselineStats.baselineCertificatesClaimed + localCertificatesCount,
      satisfaction: baselineStats.baselineSatisfaction,
      avgScore
    };
  }, [quizHistory, feedbackList, chatCount]);

  // Translation maps
  const t = useMemo(() => {
    return {
      en: {
        title: "Community Impact Dashboard",
        subtitle: "Real-time educational metrics, learning streams, and community feedback charts.",
        summaryTitle: "Overall Community Impact Summary",
        reached: "People Reached",
        completed: "Topics Mastered",
        chats: "AI Conversations",
        certificates: "Certificates Awarded",
        satisfaction: "Community Satisfaction",
        avgScore: "Average Quiz Score",
        journeyTitle: "My Learning Journey",
        streak: "Current Streak",
        streakDays: "Days Active",
        nextStep: "Recommended Next Step",
        studyPlanBtn: "Generate AI Study Plan",
        popularTitle: "Most Popular Health Topics",
        feedbackTitle: "Local Feedback Analysis",
        appreciated: "Most Appreciated Feature",
        improvement: "Most Requested Improvement",
        frequentTopic: "Frequently Asked Topic",
        timelineTitle: "Social Impact Awareness Stepper",
        badgesTitle: "My Community Badges",
        exportTitle: "Report Options",
        btnFeedback: "Share Feedback Survey",
        btnPrint: "Print Dashboard",
        btnPDF: "Export PDF Report",
        btnCSV: "Download Learning Summary",
        days: "Days"
      },
      hi: {
        title: "सामुदायिक प्रभाव डैशबोर्ड",
        subtitle: "वास्तविक समय के शैक्षिक मेट्रिक्स, सीखने की धाराएं और सामुदायिक प्रतिक्रिया चार्ट।",
        summaryTitle: "समग्र सामुदायिक प्रभाव सारांश",
        reached: "पहुंचे हुए लोग",
        completed: "पूर्ण किए गए विषय",
        chats: "AI वार्तालाप",
        certificates: "प्रदान किए गए प्रमाणपत्र",
        satisfaction: "सामुदायिक संतुष्टि",
        avgScore: "औसत प्रश्नोत्तरी स्कोर",
        journeyTitle: "मेरी सीखने की यात्रा",
        streak: "सक्रिय लकीर (Streak)",
        streakDays: "सक्रिय दिन",
        nextStep: "अनुशंसित अगला कदम",
        studyPlanBtn: "AI अध्ययन योजना बनाएं",
        popularTitle: "सबसे लोकप्रिय स्वास्थ्य विषय",
        feedbackTitle: "स्थानीय प्रतिक्रिया विश्लेषण",
        appreciated: "सबसे अधिक पसंद की गई विशेषता",
        improvement: "सर्वाधिक अनुरोधित सुधार",
        frequentTopic: "अक्सर पूछे जाने वाले स्वास्थ्य विषय",
        timelineTitle: "सामाजिक प्रभाव जागरूकता स्टेपर",
        badgesTitle: "मेरे सामुदायिक बैज",
        exportTitle: "रिपोर्ट विकल्प",
        btnFeedback: "प्रतिक्रिया सर्वेक्षण साझा करें",
        btnPrint: "डैशबोर्ड प्रिंट करें",
        btnPDF: "पीडीएफ रिपोर्ट निर्यात करें",
        btnCSV: "सीखने का सारांश डाउनलोड करें",
        days: "दिन"
      }
    }[language];
  }, [language]);

  const handleStudyPlan = () => {
    const prompt = `Analyze my quiz history of ${quizHistory.length} attempts and generate a personalized 4-week health study plan focusing on my weak topics.`;
    navigate('/assistant', { state: { prefilledQuery: prompt } });
  };

  const handlePrint = () => {
    window.print();
  };

  // SVG Chart data points for score history of last 5 attempts
  const chartPoints = useMemo(() => {
    if (quizHistory.length === 0) {
      return [
        { x: 30, y: 70 },
        { x: 90, y: 50 },
        { x: 150, y: 80 },
        { x: 210, y: 60 },
        { x: 270, y: 90 }
      ];
    }
    const sliced = quizHistory.slice(0, 5).reverse();
    return sliced.map((attempt, idx) => {
      const x = 30 + idx * 60;
      // y-coordinate mapped to SVG height of 100 (where 100% score is at y=15, 0% is at y=85)
      const y = 85 - (attempt.percentage / 100) * 70;
      return { x, y, percentage: attempt.percentage };
    });
  }, [quizHistory]);

  return (
    <Container className="py-10 space-y-8">
      
      {/* Page Title & Controls */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-outline-variant/20">
        <div>
          <h1 className="text-display-lg font-bold text-transparent bg-clip-text bg-gradient-to-r from-white via-cyan-100 to-cyan-300 text-3xl md:text-4xl tracking-tight flex items-center gap-3">
            <TrendingUp className="w-8 h-8 text-cyan-400 shrink-0" />
            {t.title}
          </h1>
          <p className="text-on-surface-variant text-sm md:text-base max-w-xl">
            {t.subtitle}
          </p>
        </div>

        <div className="flex gap-2 shrink-0">
          <button
            onClick={() => navigate('/community-feedback')}
            className="px-4 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-on-primary font-bold text-xs transition-colors flex items-center gap-2 cursor-pointer shadow-lg shadow-cyan-500/10"
          >
            <MessageSquare className="w-4 h-4" />
            <span>{t.btnFeedback}</span>
          </button>
        </div>
      </div>

      {/* 1. Overall Community Impact Summary */}
      <div className="p-5 rounded-2xl bg-surface-container-low/40 border border-outline-variant/20 space-y-4">
        <h3 className="font-bold text-sm text-cyan-300 flex items-center gap-2 uppercase tracking-wider font-mono">
          <Users className="w-4 h-4 text-cyan-400" />
          {t.summaryTitle}
        </h3>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {[
            { label: t.reached, val: stats.reached.toLocaleString(), icon: Users, color: "text-cyan-400" },
            { label: t.completed, val: stats.topicsCompleted, icon: BookOpen, color: "text-emerald-400" },
            { label: t.chats, val: stats.chats.toLocaleString(), icon: BrainCircuit, color: "text-purple-400" },
            { label: t.certificates, val: stats.certificates, icon: Award, color: "text-amber-400" },
            { label: t.satisfaction, val: `${stats.satisfaction}%`, icon: Smile, color: "text-pink-400" },
            { label: t.avgScore, val: `${stats.avgScore}%`, icon: Activity, color: "text-red-400" }
          ].map((card, idx) => {
            const Icon = card.icon;
            return (
              <div key={idx} className="p-4 rounded-xl bg-surface-container/60 border border-outline-variant/15 text-center space-y-1.5 hover:border-cyan-500/20 transition-colors">
                <Icon className={`w-5 h-5 mx-auto ${card.color}`} />
                <div className="text-lg font-bold font-mono text-white">{card.val}</div>
                <div className="text-[10px] text-outline font-semibold uppercase tracking-wider">{card.label}</div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 2. Study Journey Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Learning Journey expanded */}
        <div className="lg:col-span-2 p-5 rounded-2xl bg-surface-container-low/40 border border-outline-variant/20 space-y-4 text-left">
          <h3 className="font-bold text-sm text-on-surface flex items-center gap-2">
            <Compass className="w-4 h-4 text-cyan-400" />
            {t.journeyTitle}
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            
            {/* Streak & Next Step info */}
            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-surface-container/60 border border-outline-variant/15 flex items-center gap-4">
                <div className="p-3 rounded-lg bg-orange-500/10 border border-orange-500/25 text-orange-400">
                  <Flame className="w-6 h-6 animate-pulse" />
                </div>
                <div>
                  <span className="text-[9px] uppercase font-mono text-outline block">{t.streak}</span>
                  <strong className="text-xl font-bold font-mono text-white">{learningStreak} {t.days}</strong>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-surface-container/60 border border-outline-variant/15 space-y-1.5">
                <span className="text-[9px] uppercase font-mono text-outline block">{t.nextStep}</span>
                <p className="text-xs font-semibold text-on-surface-variant leading-relaxed">
                  {recommendedNextStep[language]}
                </p>
                <button
                  onClick={handleStudyPlan}
                  className="mt-2 text-[10px] font-bold text-cyan-400 hover:text-cyan-300 flex items-center gap-1 cursor-pointer transition-colors"
                >
                  <span>{t.studyPlanBtn}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Unlocked milestones count list */}
            <div className="p-4 rounded-xl bg-surface-container/60 border border-outline-variant/15 space-y-3">
              <span className="text-[10px] uppercase font-mono text-cyan-400 font-bold block">{t.badgesTitle}</span>
              
              {communityBadges.length === 0 ? (
                <p className="text-[11px] text-outline italic">Complete quizzes or submit feedback to claim badges.</p>
              ) : (
                <div className="space-y-2">
                  {communityBadges.map((badge) => (
                    <div 
                      key={badge.id}
                      className={`px-3 py-1.5 rounded-lg border text-[10px] font-semibold flex items-center justify-between ${badge.color}`}
                    >
                      <span>{badge.title}</span>
                      <span className="text-[8px] uppercase font-mono tracking-widest text-white/70">{badge.desc}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>

          </div>
        </div>

        {/* Local Feedback analysis insights */}
        <div className="p-5 rounded-2xl bg-surface-container-low/40 border border-outline-variant/20 space-y-4 text-left">
          <h3 className="font-bold text-sm text-on-surface flex items-center gap-2">
            <MessageSquare className="w-4 h-4 text-cyan-400" />
            {t.feedbackTitle}
          </h3>

          <div className="space-y-3.5 text-xs text-on-surface-variant">
            <div className="py-2 border-b border-outline-variant/10">
              <span className="font-mono text-[9px] uppercase tracking-wider text-outline block mb-0.5">{t.appreciated}</span>
              <strong className="text-cyan-300">{feedbackInsights.mostAppreciated}</strong>
            </div>

            <div className="py-2 border-b border-outline-variant/10">
              <span className="font-mono text-[9px] uppercase tracking-wider text-outline block mb-0.5">{t.improvement}</span>
              <strong className="text-on-surface">{feedbackInsights.requestedImprovement}</strong>
            </div>

            <div className="py-2">
              <span className="font-mono text-[9px] uppercase tracking-wider text-outline block mb-0.5">{t.frequentTopic}</span>
              <strong className="text-on-surface">{feedbackInsights.frequentTopic}</strong>
            </div>
          </div>
        </div>

      </div>

      {/* 3. SVG Score Progress chart & Trending Topics */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* SVG score history curve */}
        <div className="lg:col-span-2 p-5 rounded-2xl bg-surface-container-low/40 border border-outline-variant/20 space-y-4 text-left">
          <h3 className="font-bold text-sm text-on-surface">
            {language === 'en' ? 'Recent Quiz Performance Curve' : 'हालिया प्रश्नोत्तरी प्रदर्शन वक्र'}
          </h3>

          <div className="relative w-full h-48 bg-surface-container/30 border border-outline-variant/10 rounded-xl overflow-hidden p-3">
            {/* SVG Plot */}
            <svg viewBox="0 0 300 100" className="w-full h-full">
              {/* Grid guide lines */}
              <line x1="30" y1="15" x2="270" y2="15" stroke="#ffffff" strokeOpacity="0.05" strokeWidth="0.5" />
              <line x1="30" y1="50" x2="270" y2="50" stroke="#ffffff" strokeOpacity="0.05" strokeWidth="0.5" />
              <line x1="30" y1="85" x2="270" y2="85" stroke="#ffffff" strokeOpacity="0.05" strokeWidth="0.5" />

              {/* Connecting line */}
              <polyline
                fill="none"
                stroke="#00f2ff"
                strokeWidth="2.5"
                points={chartPoints.map(p => `${p.x},${p.y}`).join(' ')}
              />

              {/* Grid dots */}
              {chartPoints.map((point, idx) => (
                <g key={idx}>
                  <circle
                    cx={point.x}
                    cy={point.y}
                    r="4"
                    fill="#0b0e14"
                    stroke="#00f2ff"
                    strokeWidth="2"
                  />
                  {/* Score Label */}
                  <text
                    x={point.x}
                    y={point.y - 8}
                    fill="#00f2ff"
                    fontSize="7"
                    fontFamily="monospace"
                    textAnchor="middle"
                    fontWeight="bold"
                  >
                    {point.percentage}%
                  </text>
                  {/* Axis Label */}
                  <text
                    x={point.x}
                    y="95"
                    fill="#9ea1b0"
                    fontSize="6"
                    fontFamily="monospace"
                    textAnchor="middle"
                  >
                    Q{idx + 1}
                  </text>
                </g>
              ))}
            </svg>
          </div>
        </div>

        {/* Popular Trending Topics */}
        <div className="p-5 rounded-2xl bg-surface-container-low/40 border border-outline-variant/20 space-y-4 text-left">
          <h3 className="font-bold text-sm text-on-surface">
            {t.popularTitle}
          </h3>

          <div className="space-y-2.5">
            {popularTopics.map((topic, idx) => {
              return (
                <div 
                  key={topic.id}
                  className="p-3 rounded-xl bg-surface-container/60 border border-outline-variant/15 flex items-center justify-between"
                >
                  <div className="flex gap-2 items-center">
                    <span className="w-5 h-5 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 flex items-center justify-center font-mono text-[9px] font-bold">
                      {idx + 1}
                    </span>
                    <span className="text-xs font-semibold text-on-surface uppercase tracking-wider font-mono">{topic.id}</span>
                  </div>
                  <span className="text-[10px] text-outline font-mono">{topic.views.toLocaleString()} views</span>
                </div>
              );
            })}
          </div>
        </div>

      </div>

      {/* 4. Impact Timeline Stepper */}
      <div className="p-5 rounded-2xl bg-surface-container-low/40 border border-outline-variant/20 space-y-4 text-left">
        <h3 className="font-bold text-sm text-on-surface">
          {t.timelineTitle}
        </h3>

        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-4 py-4 relative">
          {[
            { step: "Learn", desc: "Read Articles" },
            { step: "Ask AI", desc: "Clarify doubts" },
            { step: "First Aid", desc: "Check timeline" },
            { step: "Pass Quiz", desc: "Score >= 70%" },
            { step: "Award", desc: "Print Certificate" },
            { step: "Feedback", desc: "Submit Survey" },
            { step: "Streak", desc: "Maintain Daily" },
            { step: "Champion", desc: "Educate Village" }
          ].map((item, idx) => (
            <div key={idx} className="p-3 rounded-xl bg-surface-container/45 border border-outline-variant/10 text-center space-y-1 relative">
              <span className="w-5 h-5 rounded-full bg-cyan-500/15 border border-cyan-500/20 text-cyan-400 flex items-center justify-center font-mono text-[9px] font-bold mx-auto mb-1">
                {idx + 1}
              </span>
              <h5 className="font-bold text-xs text-white truncate">{item.step}</h5>
              <p className="text-[9px] text-outline-variant leading-tight">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* 5. Export Reporting Placeholders */}
      <div className="p-5 rounded-2xl bg-surface-container-low/40 border border-outline-variant/20 space-y-4 text-left">
        <h3 className="font-bold text-sm text-on-surface">
          {t.exportTitle}
        </h3>

        <div className="flex flex-wrap gap-2.5">
          <button
            onClick={handlePrint}
            className="px-4 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-on-primary font-bold text-xs transition-colors flex items-center justify-center gap-1.5 cursor-pointer shadow-lg shadow-cyan-500/10"
          >
            <Printer className="w-4 h-4" />
            <span>{t.btnPrint}</span>
          </button>

          <button
            onClick={() => alert("Generating Community PDF Report (Social Internship details)...")}
            className="px-4 py-2.5 rounded-xl bg-surface-container border border-outline-variant/30 hover:border-cyan-500/30 text-on-surface hover:text-white font-semibold text-xs transition-all flex items-center justify-center gap-1.5 cursor-pointer"
          >
            <FileText className="w-4 h-4 text-cyan-400" />
            <span>{t.btnPDF}</span>
          </button>

          <button
            onClick={() => alert("CSV study log downloaded to local drive.")}
            className="px-4 py-2.5 rounded-xl bg-surface-container border border-outline-variant/30 hover:border-cyan-500/30 text-on-surface hover:text-white font-semibold text-xs transition-all flex items-center justify-center gap-1.5 cursor-pointer"
          >
            <Share2 className="w-4 h-4 text-cyan-400" />
            <span>{t.btnCSV}</span>
          </button>
        </div>
      </div>

    </Container>
  );
}

export default CommunityImpact;
