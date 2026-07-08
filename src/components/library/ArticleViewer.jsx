import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, 
  BrainCircuit, 
  HelpCircle, 
  Flame, 
  ShieldAlert, 
  CheckCircle,
  FileText,
  Bookmark,
  Sparkles,
  Award
} from 'lucide-react';

export function ArticleViewer({ article, onClose, language, bookmarked, onToggleBookmark }) {
  const navigate = useNavigate();
  const { id, meta, title, sections } = article;
  const displayTitle = language === 'en' ? title.en : title.hi;

  // Track scroll position for active section anchors inside article viewer
  const [activeSection, setActiveSection] = useState('overview');

  useEffect(() => {
    const handleScroll = () => {
      const anchors = ['overview', 'symptoms', 'prevention', 'myths', 'faqs'];
      let current = 'overview';
      for (const id of anchors) {
        const el = document.getElementById(`sec-${id}`);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 140) {
            current = id;
          }
        }
      }
      setActiveSection(current);
    };

    const container = document.getElementById('article-scroll-container');
    if (container) {
      container.addEventListener('scroll', handleScroll);
    }
    return () => container?.removeEventListener('scroll', handleScroll);
  }, []);

  const routeToAssistant = (query) => {
    navigate(`/assistant`, { state: { prefilledQuery: query } });
  };

  const routeToQuiz = () => {
    navigate(`/quiz`);
  };

  // Reusable visual diagram placeholder
  const renderPlaceholder = (type) => {
    return (
      <div className="w-full h-40 sm:h-48 rounded-2xl bg-surface-container/60 border border-outline-variant/20 flex flex-col items-center justify-center text-center p-4 relative overflow-hidden mt-3 select-none">
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/0 to-cyan-500/5 pointer-events-none" />
        <FileText className="w-8 h-8 text-cyan-400 mb-2.5 animate-pulse" />
        <span className="text-[10px] uppercase font-mono font-semibold tracking-wider text-cyan-400">
          Visual Chart / {type} Placeholder
        </span>
        <span className="text-[9px] text-outline mt-1 max-w-xs leading-relaxed">
          Interactive infographic mapping symptoms and prevention pathways.
        </span>
      </div>
    );
  };

  return (
    <div className="flex flex-col h-full bg-[#05070A]">
      
      {/* Article Header Controls */}
      <div className="px-4 py-3 bg-surface-container-lowest/80 border-b border-outline-variant/20 flex items-center justify-between z-10 shrink-0 sticky top-0 backdrop-blur-md">
        <button
          onClick={onClose}
          className="flex items-center gap-2 text-xs font-semibold text-on-surface hover:text-cyan-400 transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>{language === 'en' ? 'Back to Library' : 'लाइब्रेरी पर वापस'}</span>
        </button>

        <div className="flex items-center gap-3">
          <button
            onClick={onToggleBookmark}
            title="Bookmark this article"
            className={`p-2 rounded-lg border transition-colors cursor-pointer ${
              bookmarked 
                ? 'bg-cyan-500/10 border-cyan-500/35 text-cyan-400' 
                : 'bg-surface-container border-outline-variant/20 hover:border-cyan-500/30 text-on-surface-variant'
            }`}
          >
            <Bookmark className={`w-4 h-4 ${bookmarked ? 'fill-cyan-400' : ''}`} />
          </button>

          <span className="text-[10px] uppercase font-mono tracking-widest px-2.5 py-1 rounded bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
            {meta.category}
          </span>
        </div>
      </div>

      {/* Reading Progress Bar */}
      <div className="w-full h-1 bg-surface-container shrink-0 relative">
        <div 
          className="h-full bg-gradient-to-r from-cyan-500 to-emerald-400 transition-all duration-100 absolute left-0 top-0"
          style={{
            width: activeSection === 'overview' ? '20%' : 
                   activeSection === 'symptoms' ? '40%' : 
                   activeSection === 'prevention' ? '60%' : 
                   activeSection === 'myths' ? '80%' : '100%'
          }}
        />
      </div>

      {/* Main Split Layout */}
      <div className="flex-1 flex overflow-hidden">
        
        {/* Left Side: Table of Contents */}
        <div className="hidden lg:block p-6 border-r border-outline-variant/10">
          <nav className="flex flex-col gap-6 sticky top-4 max-h-[calc(100vh-160px)] overflow-y-auto w-[200px]">
            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-outline font-semibold mb-2">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400"></span>
              <span>{language === 'en' ? 'Sections' : 'अनुभाग'}</span>
            </div>
            <div className="flex flex-col gap-1 border-l border-outline-variant/30">
              {['overview', 'symptoms', 'prevention', 'myths', 'faqs'].map((secId) => {
                const isActive = activeSection === secId;
                const labelMap = {
                  overview: { en: 'Overview', hi: 'अवलोकन' },
                  symptoms: { en: 'Symptoms & Causes', hi: 'लक्षण और कारण' },
                  prevention: { en: 'Prevention & Habits', hi: 'रोकथाम और आदतें' },
                  myths: { en: 'Myths vs Facts', hi: 'भ्रम बनाम तथ्य' },
                  faqs: { en: 'FAQs & Qns', hi: 'प्रश्न' }
                };
                return (
                  <button
                    key={secId}
                    onClick={() => {
                      document.getElementById(`sec-${secId}`)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                      setActiveSection(secId);
                    }}
                    className={`text-left text-xs py-2 pl-4 -ml-[1px] border-l transition-all cursor-pointer block truncate ${
                      isActive
                        ? 'border-cyan-400 text-cyan-300 font-semibold bg-cyan-500/5'
                        : 'border-transparent text-on-surface-variant hover:text-white hover:border-outline-variant'
                    }`}
                  >
                    {labelMap[secId][language]}
                  </button>
                );
              })}
            </div>
          </nav>
        </div>

        {/* Center: Article Scroll Area */}
        <div 
          id="article-scroll-container" 
          className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-10 space-y-8 scrollbar-thin"
        >
          <div className="max-w-3xl mx-auto space-y-8">
            
            {/* Topic Title Hero */}
            <div className="space-y-3 pb-6 border-b border-outline-variant/20">
              <h1 className="text-display-lg font-bold text-transparent bg-clip-text bg-gradient-to-r from-white via-cyan-100 to-cyan-200 text-3xl sm:text-4xl tracking-tight leading-tight">
                {displayTitle}
              </h1>
              
              <div className="flex flex-wrap items-center gap-3 text-xs font-mono text-outline">
                <span className="px-2 py-0.5 rounded bg-surface-container text-on-surface-variant font-medium">
                  {meta.readTime}
                </span>
                <span>•</span>
                <span className="px-2 py-0.5 rounded bg-surface-container text-on-surface-variant font-medium">
                  {meta.difficulty}
                </span>
                <span>•</span>
                <div className="flex gap-1.5">
                  {meta.badges?.map((badge, idx) => (
                    <span key={idx} className="text-cyan-400/80">#{badge}</span>
                  ))}
                </div>
              </div>
            </div>

            {/* Standard 10 Blocks Layout */}

            {/* 1. Overview */}
            <section id="sec-overview" className="scroll-mt-6 space-y-3">
              <h2 className="text-lg font-bold text-on-surface flex items-center gap-2">
                <span className="text-cyan-400">01.</span>
                {language === 'en' ? 'Overview' : 'अवलोकन'}
              </h2>
              <p className="text-sm md:text-base leading-relaxed text-on-surface-variant">
                {sections.overview[language]}
              </p>
              {renderPlaceholder("Overview Infographic")}
            </section>

            {/* 2. Symptoms */}
            <section id="sec-symptoms" className="scroll-mt-6 space-y-3">
              <h2 className="text-lg font-bold text-on-surface flex items-center gap-2">
                <span className="text-cyan-400">02.</span>
                {language === 'en' ? 'Symptoms & Identification' : 'लक्षण और पहचान'}
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {sections.symptoms[language].map((symptom, idx) => (
                  <div key={idx} className="p-3.5 rounded-xl bg-surface-container/40 border border-outline-variant/15 flex gap-2.5 items-start">
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 shrink-0 mt-2"></span>
                    <span className="text-xs md:text-sm text-on-surface-variant leading-normal">{symptom}</span>
                  </div>
                ))}
              </div>
              {renderPlaceholder("Symptom Diagram")}
            </section>

            {/* 3. Causes */}
            <section className="space-y-3">
              <h2 className="text-lg font-bold text-on-surface flex items-center gap-2">
                <span className="text-cyan-400">03.</span>
                {language === 'en' ? 'Root Causes' : 'मूल कारण'}
              </h2>
              <p className="text-sm md:text-base leading-relaxed text-on-surface-variant">
                {sections.causes[language]}
              </p>
            </section>

            {/* 4. Risk Factors */}
            <section className="space-y-3">
              <h2 className="text-lg font-bold text-on-surface flex items-center gap-2">
                <span className="text-cyan-400">04.</span>
                {language === 'en' ? 'Risk Factors' : 'जोखिम कारक'}
              </h2>
              <ul className="space-y-2">
                {sections.riskFactors[language].map((risk, idx) => (
                  <li key={idx} className="flex gap-2.5 items-start text-xs md:text-sm text-on-surface-variant">
                    <span className="text-red-400 font-bold shrink-0 mt-0.5">•</span>
                    <span>{risk}</span>
                  </li>
                ))}
              </ul>
            </section>

            {/* 5. Prevention */}
            <section id="sec-prevention" className="scroll-mt-6 space-y-3">
              <h2 className="text-lg font-bold text-on-surface flex items-center gap-2">
                <span className="text-cyan-400">05.</span>
                {language === 'en' ? 'Prevention Protocols' : 'रोकथाम प्रोटोकॉल'}
              </h2>
              <div className="p-5 rounded-2xl bg-emerald-950/10 border border-emerald-500/25 space-y-3">
                <ul className="space-y-3">
                  {sections.prevention[language].map((prev, idx) => (
                    <li key={idx} className="flex gap-3 items-start text-xs md:text-sm text-on-surface-variant">
                      <span className="w-5 h-5 rounded-full bg-emerald-500/10 border border-emerald-500/35 flex items-center justify-center shrink-0 text-[10px] text-emerald-400 font-mono font-bold mt-0.5">{idx + 1}</span>
                      <span className="leading-relaxed">{prev}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </section>

            {/* 6. Healthy Habits */}
            <section className="space-y-3">
              <h2 className="text-lg font-bold text-on-surface flex items-center gap-2">
                <span className="text-cyan-400">06.</span>
                {language === 'en' ? 'Daily Healthy Habits' : 'दैनिक स्वस्थ आदतें'}
              </h2>
              <ul className="space-y-2">
                {sections.habits[language].map((habit, idx) => (
                  <li key={idx} className="flex gap-2.5 items-start text-xs md:text-sm text-on-surface-variant">
                    <span className="text-emerald-400 font-bold shrink-0 mt-0.5">✓</span>
                    <span>{habit}</span>
                  </li>
                ))}
              </ul>
            </section>

            {/* 7. When to Consult a Doctor */}
            <section className="space-y-3">
              <h2 className="text-lg font-bold text-on-surface flex items-center gap-2">
                <span className="text-cyan-400">07.</span>
                {language === 'en' ? 'When to Consult a Physician' : 'डॉक्टर से कब परामर्श लें'}
              </h2>
              <div className="p-4 rounded-xl bg-red-950/10 border border-red-500/25 flex gap-3.5 items-start">
                <ShieldAlert className="w-6 h-6 text-red-400 shrink-0 mt-0.5 animate-pulse" />
                <div>
                  <h4 className="text-xs font-semibold uppercase tracking-wider text-red-400 mb-1">
                    {language === 'en' ? 'Warning Symptoms' : 'चेतावनी के लक्षण'}
                  </h4>
                  <p className="text-xs md:text-sm text-on-surface-variant leading-relaxed">
                    {sections.consult[language]}
                  </p>
                </div>
              </div>
            </section>

            {/* 8. Myths vs Facts */}
            <section id="sec-myths" className="scroll-mt-6 space-y-3">
              <h2 className="text-lg font-bold text-on-surface flex items-center gap-2">
                <span className="text-cyan-400">08.</span>
                {language === 'en' ? 'Myths vs Facts' : 'भ्रम बनाम तथ्य'}
              </h2>
              <div className="space-y-3.5">
                {sections.myths.map((item, idx) => (
                  <div key={idx} className="rounded-xl border border-outline-variant/15 overflow-hidden">
                    <div className="px-4 py-2 bg-red-950/10 border-b border-outline-variant/10 text-xs font-semibold text-red-400 flex gap-2 items-center">
                      <span className="uppercase font-mono tracking-wider text-[10px] bg-red-500/10 border border-red-500/20 px-1.5 py-0.5 rounded">Myth</span>
                      <span>{item.myth[language]}</span>
                    </div>
                    <div className="px-4 py-3 bg-emerald-950/5 text-xs md:text-sm text-on-surface-variant leading-normal flex gap-2 items-start">
                      <span className="uppercase font-mono tracking-wider text-[10px] bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded text-emerald-400 shrink-0 mt-0.5">Fact</span>
                      <p>{item.fact[language]}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* 9. FAQs */}
            <section id="sec-faqs" className="scroll-mt-6 space-y-3">
              <h2 className="text-lg font-bold text-on-surface flex items-center gap-2">
                <span className="text-cyan-400">09.</span>
                {language === 'en' ? 'Frequently Asked Questions' : 'अक्सर पूछे जाने वाले प्रश्न'}
              </h2>
              <div className="space-y-2.5">
                {sections.faqs.map((faq, idx) => (
                  <div key={idx} className="p-4 rounded-xl bg-surface-container-low border border-outline-variant/20 space-y-2">
                    <h4 className="text-sm font-semibold text-on-surface flex gap-2 items-start">
                      <span className="text-cyan-400 shrink-0 mt-0.5">Q.</span>
                      <span>{faq.q[language]}</span>
                    </h4>
                    <p className="text-xs md:text-sm text-on-surface-variant leading-relaxed pl-5 border-l border-cyan-500/10">
                      {faq.a[language]}
                    </p>
                  </div>
                ))}
              </div>
            </section>

            {/* 10. Educational Disclaimer */}
            <section className="text-[10px] text-outline font-mono italic pt-6 border-t border-outline-variant/15 leading-relaxed">
              * {language === 'en' 
                ? "DISCLAIMER: AI HealthMate provides public awareness information only. It is not an active diagnostics system. Seek certified clinic checkups for diagnosis or specific medical prescriptions."
                : "अस्वीकरण: AI HealthMate केवल सार्वजनिक जागरूकता जानकारी प्रदान करता है। यह एक सक्रिय निदान प्रणाली नहीं है। निदान या विशिष्ट चिकित्सा नुस्खे के लिए प्रमाणित नैदानिक जांच करवाएं।"
              }
            </section>

            {/* Topic Completion Section */}
            <div className="p-6 rounded-2xl bg-cyan-950/10 border border-cyan-500/25 text-center space-y-4 shadow-xl">
              <div className="w-12 h-12 rounded-full bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center mx-auto text-cyan-400">
                <CheckCircle className="w-6 h-6 animate-pulse" />
              </div>
              
              <div className="space-y-1">
                <h3 className="font-bold text-base text-on-surface">
                  {language === 'en' ? 'You have completed this topic!' : 'आपने इस विषय को पूरा कर लिया है!'}
                </h3>
                <p className="text-xs text-on-surface-variant max-w-sm mx-auto">
                  {language === 'en' 
                    ? 'Keep building your healthcare awareness. Try starting an interactive chat session or testing your knowledge with a quiz!'
                    : 'अपनी स्वास्थ्य जागरूकता को बढ़ाते रहें। एक चैट सत्र शुरू करें या एक प्रश्नोत्तरी (क्विज) के साथ अपने ज्ञान का परीक्षण करें!'
                  }
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-2.5 justify-center pt-2">
                <button
                  onClick={() => routeToAssistant(`Can you tell me more about ${displayTitle}?`)}
                  className="px-4 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-on-primary font-semibold text-xs transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <BrainCircuit className="w-4 h-4" />
                  {language === 'en' ? 'Ask AI About This' : 'इस विषय पर AI से पूछें'}
                </button>

                <button
                  onClick={routeToQuiz}
                  className="px-4 py-2 rounded-xl bg-surface-container border border-outline-variant/30 hover:border-cyan-500/35 text-on-surface hover:text-white font-semibold text-xs transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <Award className="w-4 h-4 text-cyan-400" />
                  {language === 'en' ? 'Take Health Quiz' : 'स्वास्थ्य प्रश्नोत्तरी लें'}
                </button>
              </div>
            </div>

          </div>
        </div>

        {/* Right Side: AI Assistant Shortcuts Panel */}
        <div className="hidden xl:flex flex-col gap-4 bg-surface-container-lowest/80 border-l border-outline-variant/30 w-[240px] shrink-0 p-4">
          <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-outline font-semibold mb-2">
            <Sparkles className="w-4 h-4 text-cyan-400" />
            <span>AI Assist Portal</span>
          </div>

          <div className="space-y-3">
            <button
              onClick={() => routeToAssistant(`Can you explain ${displayTitle} and its prevention?`)}
              className="w-full p-3 rounded-xl bg-cyan-500/10 border border-cyan-500/20 hover:border-cyan-500/40 text-left text-xs font-semibold text-cyan-300 hover:text-cyan-200 transition-colors flex items-start gap-2.5 cursor-pointer"
            >
              <BrainCircuit className="w-4 h-4 shrink-0 mt-0.5" />
              <div>
                <span>{language === 'en' ? 'Ask AI About This' : 'AI से पूछें'}</span>
                <p className="text-[10px] font-normal text-outline-variant mt-1">Get custom details.</p>
              </div>
            </button>

            <button
              onClick={() => routeToAssistant(`Can you explain ${displayTitle} in very simple terms for a child or villager?`)}
              className="w-full p-3 rounded-xl bg-surface-container/60 border border-outline-variant/20 hover:border-cyan-500/30 text-left text-xs font-semibold text-on-surface-variant hover:text-white transition-colors flex items-start gap-2.5 cursor-pointer"
            >
              <HelpCircle className="w-4 h-4 shrink-0 mt-0.5 text-cyan-400" />
              <div>
                <span>{language === 'en' ? 'Explain Simpler' : 'सरल शब्दों में समझें'}</span>
                <p className="text-[10px] font-normal text-outline-variant mt-1">Simple village terms.</p>
              </div>
            </button>
          </div>

          {/* Quick Related Questions Checklist */}
          <div className="border-t border-outline-variant/20 pt-4 flex-1">
            <span className="text-[10px] uppercase font-mono tracking-widest text-outline px-1 block mb-3">Related Questions</span>
            <div className="space-y-2">
              {[
                { label: `What causes ${displayTitle}?`, q: `What are the primary causes of ${displayTitle}?` },
                { label: `How do I prevent ${displayTitle}?`, q: `What are the most effective prevention steps for ${displayTitle}?` },
                { label: `When to see a doctor for ${displayTitle}?`, q: `What are the danger signs of ${displayTitle} requiring a physician?` }
              ].map((item, idx) => (
                <button
                  key={idx}
                  onClick={() => routeToAssistant(item.q)}
                  className="w-full text-left p-2 rounded-lg bg-surface-container/30 border border-outline-variant/15 hover:border-cyan-500/20 text-[10px] text-on-surface-variant hover:text-white transition-colors truncate block cursor-pointer"
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>
        </div>

      </div>

    </div>
  );
}

export default ArticleViewer;
