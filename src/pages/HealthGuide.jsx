import React, { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Stethoscope, 
  PlusCircle, 
  PhoneCall, 
  CheckSquare, 
  Search, 
  ShieldAlert, 
  BrainCircuit, 
  HelpCircle, 
  Bookmark, 
  Share2, 
  Printer, 
  AlertTriangle,
  Globe,
  FileText,
  X
} from 'lucide-react';

import useGuideState from '../hooks/useGuideState';
import { symptoms, firstAidGuides, emergencyHelplines, healthyHabits } from '../utils/guideData';

function HealthGuide() {
  const navigate = useNavigate();
  const {
    activeTab,
    setActiveTab,
    searchQuery,
    setSearchQuery,
    selectedSymptomId,
    setSelectedSymptomId,
    selectedFirstAidId,
    setSelectedFirstAidId,
    bookmarkedGuides,
    toggleBookmark,
    language,
    changeLanguage
  } = useGuideState();

  // Translation mapping
  const t = useMemo(() => {
    return {
      en: {
        title: "First Aid & Health Guide",
        subtitle: "Interactive emergency guides, symptom checklists, and healthy habits. Educational only.",
        symptomsTab: "Symptom Awareness",
        firstAidTab: "First Aid Guides",
        contactsTab: "Helplines",
        habitsTab: "Healthy Habits",
        searchPlaceholder: "Search symptoms, guides, or habits...",
        emergencyTitle: "National Medical Alert",
        emergencyDesc: "This guide is for educational awareness and first aid. In serious emergencies, do not delay clinical care.",
        ambulanceCall: "Ambulance: 108",
        whatNotToDo: "What NOT To Do",
        commonMistakes: "Common Mistakes",
        call108Warning: "When to Call 108 Hotline",
        immediateSteps: "Immediate First Aid Steps",
        askAI: "Ask AI About This",
        explainSimpler: "Explain Simpler",
        benefits: "Health Benefits",
        routine: "Daily Routine",
        tips: "Quick Tips",
        noResults: "No guides matched your search term.",
        warningTitle: "Emergency Red Flags",
        disclaimer: "Disclaimer: This information is for educational first-aid training. Seek physician care for diagnoses.",
        tapToCall: "Tap to Call",
        print: "Print Guide",
        share: "Copy Link",
        bookmarked: "Saved"
      },
      hi: {
        title: "प्राथमिक चिकित्सा और स्वास्थ्य गाइड",
        subtitle: "इंटरैक्टिव आपातकालीन गाइड, लक्षण चेकलिस्ट और स्वस्थ आदतें। केवल शैक्षिक जानकारी।",
        symptomsTab: "लक्षण जागरूकता",
        firstAidTab: "प्राथमिक चिकित्सा गाइड",
        contactsTab: "हेल्पलाइन नंबर",
        habitsTab: "स्वस्थ आदतें",
        searchPlaceholder: "लक्षणों, गाइडों या आदतों की खोज करें...",
        emergencyTitle: "राष्ट्रीय चिकित्सा चेतावनी",
        emergencyDesc: "यह गाइड केवल शैक्षिक जागरूकता और प्राथमिक चिकित्सा के लिए है। गंभीर आपातकाल में डॉक्टर से मिलने में देरी न करें।",
        ambulanceCall: "एम्बुलेंस: 108",
        whatNotToDo: "क्या न करें",
        commonMistakes: "आम गलतियाँ",
        call108Warning: "कब 108 हेल्पलाइन पर कॉल करें",
        immediateSteps: "तत्काल प्राथमिक चिकित्सा कदम",
        askAI: "AI से इस बारे में पूछें",
        explainSimpler: "सरल शब्दों में समझें",
        benefits: "स्वास्थ्य लाभ",
        routine: "दैनिक दिनचर्या",
        tips: "त्वरित सुझाव",
        noResults: "आपकी खोज से कोई गाइड मेल नहीं खाती।",
        warningTitle: "आपातकालीन रेड फ्लैग्स",
        disclaimer: "अस्वीकरण: यह जानकारी प्राथमिक चिकित्सा प्रशिक्षण के लिए है। निदान के लिए डॉक्टर की सलाह लें।",
        tapToCall: "कॉल करने के लिए टैप करें",
        print: "प्रिंट गाइड",
        share: "लिंक कॉपी करें",
        bookmarked: "सुरक्षित"
      }
    }[language];
  }, [language]);

  // Route queries to AI Assistant
  const handleAskAI = (topicName, simpler = false) => {
    const prompt = simpler 
      ? `Explain the first aid and care guidelines for ${topicName} in simple terms for a villager or child.`
      : `Provide detailed educational guide, symptoms, and prevention tips for ${topicName}.`;
    navigate(`/assistant`, { state: { prefilledQuery: prompt } });
  };

  // Copy and print utilities
  const handleShare = (title) => {
    navigator.clipboard.writeText(window.location.href);
    alert(`Link to ${title} copied!`);
  };

  const handlePrint = () => {
    window.print();
  };

  // Filter logic based on query & active tab
  const filteredSymptoms = useMemo(() => {
    if (activeTab !== "symptoms") return [];
    return symptoms.filter(s => {
      const q = searchQuery.toLowerCase();
      return s.title.en.toLowerCase().includes(q) || 
             s.title.hi.toLowerCase().includes(q) || 
             s.overview[language].toLowerCase().includes(q);
    });
  }, [activeTab, searchQuery, language]);

  const filteredFirstAid = useMemo(() => {
    if (activeTab !== "firstaid") return [];
    return firstAidGuides.filter(g => {
      const q = searchQuery.toLowerCase();
      return g.title.en.toLowerCase().includes(q) || 
             g.title.hi.toLowerCase().includes(q) || 
             g.overview[language].toLowerCase().includes(q);
    });
  }, [activeTab, searchQuery, language]);

  const filteredHabits = useMemo(() => {
    if (activeTab !== "habits") return [];
    return healthyHabits.filter(h => {
      const q = searchQuery.toLowerCase();
      return h.title.en.toLowerCase().includes(q) || 
             h.title.hi.toLowerCase().includes(q) || 
             h.benefits[language].toLowerCase().includes(q);
    });
  }, [activeTab, searchQuery, language]);

  return (
    <div className="min-h-screen bg-background py-8 px-4 md:px-8">
      <div className="max-w-6xl mx-auto space-y-8">
        
        {/* 1. Header Banner & Language Toggle */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-outline-variant/20">
          <div className="space-y-2">
            <h1 className="text-display-lg font-bold text-transparent bg-clip-text bg-gradient-to-r from-white via-cyan-100 to-cyan-300 text-3xl md:text-4xl tracking-tight flex items-center gap-3">
              <Stethoscope className="w-8 h-8 text-cyan-400 shrink-0" />
              {t.title}
            </h1>
            <p className="text-on-surface-variant text-sm md:text-base max-w-xl">
              {t.subtitle}
            </p>
          </div>

          {/* Bilingual Toggle */}
          <div className="flex flex-col gap-1.5 shrink-0 self-start md:self-center">
            <span className="text-[10px] uppercase font-mono tracking-widest text-outline font-semibold flex items-center gap-1.5">
              <Globe className="w-3.5 h-3.5 text-cyan-400" />
              {language === 'en' ? 'Language' : 'भाषा'}
            </span>
            <div className="flex bg-surface-container rounded-lg p-0.5 border border-outline-variant/30">
              <button
                onClick={() => changeLanguage('en')}
                className={`px-3 py-1 text-xs font-semibold rounded-md cursor-pointer transition-all ${
                  language === 'en' ? 'bg-cyan-500 text-on-primary' : 'text-on-surface-variant hover:text-white'
                }`}
              >
                English
              </button>
              <button
                onClick={() => changeLanguage('hi')}
                className={`px-3 py-1 text-xs font-semibold rounded-md cursor-pointer transition-all ${
                  language === 'hi' ? 'bg-cyan-500 text-on-primary' : 'text-on-surface-variant hover:text-white'
                }`}
              >
                हिंदी
              </button>
            </div>
          </div>
        </div>

        {/* 2. Emergency Hotline Banner */}
        <div className="p-4 rounded-2xl bg-red-950/15 border border-red-500/25 flex flex-col md:flex-row gap-4 items-start md:items-center justify-between shadow-lg">
          <div className="flex gap-3 items-start">
            <ShieldAlert className="w-6 h-6 text-red-400 shrink-0 mt-0.5 animate-pulse" />
            <div>
              <h4 className="font-bold text-sm text-red-400 uppercase tracking-wider">
                {t.emergencyTitle}
              </h4>
              <p className="text-xs text-on-surface-variant leading-relaxed">
                {t.emergencyDesc}
              </p>
            </div>
          </div>
          <a
            href="tel:108"
            className="px-4 py-2 rounded-xl bg-red-500 hover:bg-red-400 text-white font-mono font-bold text-sm shrink-0 self-stretch sm:self-auto text-center flex items-center justify-center gap-2 shadow-lg shadow-red-500/10 cursor-pointer"
          >
            <PhoneCall className="w-4 h-4 animate-bounce" />
            {t.ambulanceCall}
          </a>
        </div>

        {/* 3. Search Bar */}
        <div className="relative bg-surface-container-lowest/80 border border-outline-variant/30 rounded-2xl focus-within:border-cyan-500/50 shadow-md transition-colors flex items-center max-w-2xl mx-auto z-10">
          <Search className="w-5 h-5 text-on-surface-variant absolute left-4 pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={t.searchPlaceholder}
            className="w-full bg-transparent py-4 pl-12 pr-12 text-sm text-on-surface placeholder-outline outline-none"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="absolute right-4 text-on-surface-variant hover:text-white p-1 hover:bg-white/5 rounded-lg cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* 4. Tab Menu Selectors */}
        <div className="flex border-b border-outline-variant/20 overflow-x-auto gap-2 pb-2 scrollbar-none">
          {[
            { id: "symptoms", label: t.symptomsTab, icon: Stethoscope },
            { id: "firstaid", label: t.firstAidTab, icon: PlusCircle },
            { id: "contacts", label: t.contactsTab, icon: PhoneCall },
            { id: "habits", label: t.habitsTab, icon: CheckSquare }
          ].map((tab) => {
            const IconComponent = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => {
                  setActiveTab(tab.id);
                  setSearchQuery(""); // Clear query when changing tabs
                }}
                className={`flex items-center gap-2 px-5 py-3 border-b-2 font-semibold text-xs uppercase tracking-wider shrink-0 transition-all cursor-pointer ${
                  isActive 
                    ? 'border-cyan-400 text-cyan-300 bg-cyan-500/5' 
                    : 'border-transparent text-on-surface-variant hover:text-white'
                }`}
              >
                <IconComponent className="w-4 h-4" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* 5. Dynamic Tab View Content */}
        <div className="space-y-6">

          {/* TAB A: SYMPTOM AWARENESS ACCORDIONS */}
          {activeTab === "symptoms" && (
            <div className="space-y-4 max-w-4xl mx-auto">
              {filteredSymptoms.length === 0 ? (
                <p className="text-center text-xs text-outline py-8">{t.noResults}</p>
              ) : (
                filteredSymptoms.map((sym) => {
                  const isOpen = selectedSymptomId === sym.id;
                  const displayTitle = language === 'en' ? sym.title.en : sym.title.hi;
                  return (
                    <div 
                      key={sym.id} 
                      className={`p-4 rounded-2xl bg-surface-container-low/40 border transition-all duration-300 ${
                        isOpen ? 'border-cyan-500/30 shadow-lg' : 'border-outline-variant/20 hover:border-cyan-500/25'
                      }`}
                    >
                      <button
                        onClick={() => setSelectedSymptomId(isOpen ? null : sym.id)}
                        className="flex items-center justify-between w-full text-left font-bold text-sm sm:text-base text-on-surface hover:text-cyan-300 transition-colors cursor-pointer"
                      >
                        <span className="flex items-center gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-cyan-400"></span>
                          {displayTitle}
                        </span>
                        <span className="text-xs text-cyan-400">
                          {isOpen ? (language === 'en' ? 'Hide Details' : 'विवरण छुपाएं') : (language === 'en' ? 'Show Details' : 'विवरण दिखाएं')}
                        </span>
                      </button>

                      {isOpen && (
                        <div className="mt-4 pt-4 border-t border-outline-variant/15 space-y-4 text-xs md:text-sm text-on-surface-variant leading-relaxed">
                          
                          {/* Overview */}
                          <div>
                            <h5 className="font-bold text-on-surface mb-1 uppercase tracking-wider text-[10px] text-cyan-400">Overview</h5>
                            <p>{sym.overview[language]}</p>
                          </div>

                          {/* Possible Causes */}
                          <div>
                            <h5 className="font-bold text-on-surface mb-1 uppercase tracking-wider text-[10px] text-cyan-400">Possible Causes</h5>
                            <p>{sym.causes[language]}</p>
                          </div>

                          {/* Home Care */}
                          <div className="p-3.5 rounded-xl bg-surface-container/60 border border-outline-variant/15">
                            <h5 className="font-bold text-on-surface mb-1.5 uppercase tracking-wider text-[10px] text-cyan-400">Home Care & First Aid</h5>
                            <p>{sym.homeCare[language]}</p>
                          </div>

                          {/* Prevention */}
                          <div>
                            <h5 className="font-bold text-on-surface mb-1 uppercase tracking-wider text-[10px] text-cyan-400">Prevention Guidelines</h5>
                            <p>{sym.prevention[language]}</p>
                          </div>

                          {/* Warning red callout */}
                          <div className="p-3.5 rounded-xl bg-red-950/15 border border-red-500/25 flex gap-2.5 items-start">
                            <AlertTriangle className="w-5 h-5 text-red-400 shrink-0 mt-0.5 animate-pulse" />
                            <div>
                              <h5 className="font-bold text-red-400 uppercase tracking-wider text-[10px] mb-1">{t.warningTitle}</h5>
                              <p className="text-xs">{sym.warningSigns[language]}</p>
                              <p className="text-[11px] font-semibold text-red-300/90 mt-1">{sym.consult[language]}</p>
                            </div>
                          </div>

                          {/* AI Integrations Portal */}
                          <div className="flex gap-2 pt-2 border-t border-outline-variant/10">
                            <button
                              onClick={() => handleAskAI(displayTitle)}
                              className="px-3 py-1.5 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-on-primary text-[10px] sm:text-xs font-semibold transition-colors flex items-center gap-1 cursor-pointer"
                            >
                              <BrainCircuit className="w-3.5 h-3.5" />
                              {t.askAI}
                            </button>
                            <button
                              onClick={() => handleAskAI(displayTitle, true)}
                              className="px-3 py-1.5 rounded-lg bg-surface-container border border-outline-variant/30 hover:border-cyan-500/35 text-on-surface text-[10px] sm:text-xs font-semibold transition-all flex items-center gap-1 cursor-pointer"
                            >
                              <HelpCircle className="w-3.5 h-3.5 text-cyan-400" />
                              {t.explainSimpler}
                            </button>
                          </div>

                          {/* Disclaimer */}
                          <p className="text-[9px] text-outline font-mono italic pt-2">* {t.disclaimer}</p>
                        </div>
                      )}
                    </div>
                  );
                })
              )}
            </div>
          )}

          {/* TAB B: FIRST AID GUIDES */}
          {activeTab === "firstaid" && (
            <div className="space-y-6 max-w-4xl mx-auto">
              {filteredFirstAid.length === 0 ? (
                <p className="text-center text-xs text-outline py-8">{t.noResults}</p>
              ) : (
                filteredFirstAid.map((guide) => {
                  const isSelected = selectedFirstAidId === guide.id;
                  const displayTitle = language === 'en' ? guide.title.en : guide.title.hi;
                  const isBookmarked = bookmarkedGuides.includes(guide.id);
                  return (
                    <div 
                      key={guide.id}
                      className={`p-5 rounded-2xl bg-surface-container-low/40 border transition-all duration-300 ${
                        isSelected ? 'border-cyan-500/35 shadow-2xl' : 'border-outline-variant/20 hover:border-cyan-500/20'
                      }`}
                    >
                      
                      {/* Guide Header controls */}
                      <div className="flex items-center justify-between gap-4">
                        <button
                          onClick={() => setSelectedFirstAidId(isSelected ? null : guide.id)}
                          className="flex-1 text-left font-bold text-base text-on-surface hover:text-cyan-300 transition-colors cursor-pointer"
                        >
                          <h3 className="flex items-center gap-2.5">
                            <span className="w-2 h-2 rounded-full bg-cyan-500 animate-pulse"></span>
                            {displayTitle}
                          </h3>
                          <p className="text-xs text-on-surface-variant font-normal mt-1">{guide.overview[language]}</p>
                        </button>

                        {/* Top quick bookmark button */}
                        <button
                          onClick={() => toggleBookmark(guide.id)}
                          className={`p-2 rounded-lg border transition-colors cursor-pointer ${
                            isBookmarked 
                              ? 'bg-cyan-500/10 border-cyan-500/35 text-cyan-400' 
                              : 'bg-surface-container border-outline-variant/20 hover:border-cyan-500/20 text-on-surface-variant'
                          }`}
                        >
                          <Bookmark className={`w-4 h-4 ${isBookmarked ? 'fill-cyan-400' : ''}`} />
                        </button>
                      </div>

                      {/* Detail Visual timelines & blocks */}
                      {isSelected && (
                        <div className="mt-6 pt-6 border-t border-outline-variant/15 space-y-6">
                          
                          {/* Visual Step-by-Step Vertical Timeline */}
                          <div className="space-y-4">
                            <h4 className="text-xs font-bold font-mono uppercase tracking-wider text-cyan-400 flex items-center gap-2">
                              <CheckSquare className="w-4 h-4 text-cyan-400" />
                              {t.immediateSteps}
                            </h4>
                            
                            <div className="relative border-l border-outline-variant/30 pl-6 ml-3 space-y-5">
                              {guide.steps[language].map((step, idx) => (
                                <div key={idx} className="relative">
                                  {/* Numbered timeline node */}
                                  <span className="absolute -left-[35px] top-0.5 w-6 h-6 rounded-full bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-[10px] font-mono font-bold text-cyan-400">
                                    {idx + 1}
                                  </span>
                                  <p className="text-xs sm:text-sm text-on-surface-variant leading-relaxed">
                                    {step}
                                  </p>
                                </div>
                              ))}
                            </div>
                          </div>

                          {/* visual infographic placeholder stubs */}
                          <div className="w-full h-32 rounded-xl bg-surface-container/60 border border-outline-variant/15 flex flex-col items-center justify-center text-center p-3 select-none">
                            <FileText className="w-6 h-6 text-cyan-400 mb-1.5 animate-pulse" />
                            <span className="text-[10px] uppercase font-mono tracking-wider text-cyan-400 font-semibold">Visual Infographic Guideline</span>
                            <span className="text-[9px] text-outline mt-0.5">Illustrating immediate patient posture and chest positioning.</span>
                          </div>

                          {/* What NOT To Do (Red Warning Block) */}
                          <div className="p-4 rounded-xl bg-red-950/15 border border-red-500/25 space-y-2">
                            <h4 className="text-xs font-bold uppercase tracking-wider text-red-400 flex items-center gap-2">
                              <AlertTriangle className="w-4 h-4 text-red-400 shrink-0" />
                              {t.whatNotToDo}
                            </h4>
                            <p className="text-xs text-on-surface-variant leading-relaxed">
                              {guide.whatNotToDo[language]}
                            </p>
                            {guide.mistakes && (
                              <div className="text-[11px] text-red-300 pt-1 border-t border-red-500/10">
                                <strong>{t.commonMistakes}:</strong> {guide.mistakes[language]}
                              </div>
                            )}
                          </div>

                          {/* When To Call 108 Block */}
                          <div className="p-4 rounded-xl bg-cyan-950/15 border border-cyan-500/25 space-y-2">
                            <h4 className="text-xs font-bold uppercase tracking-wider text-cyan-300 flex items-center gap-2">
                              <ShieldAlert className="w-4 h-4 text-cyan-400 shrink-0" />
                              {t.call108Warning}
                            </h4>
                            <p className="text-xs text-on-surface-variant leading-relaxed">
                              {guide.whenToCall108[language]}
                            </p>
                            <p className="text-[11px] font-semibold text-cyan-300">
                              {guide.emergencyTips[language]}
                            </p>
                          </div>

                          {/* Print, share, ask AI shortcuts */}
                          <div className="flex flex-wrap gap-2.5 pt-3 border-t border-outline-variant/10">
                            <button
                              onClick={() => handleAskAI(displayTitle)}
                              className="px-3.5 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-on-primary text-xs font-semibold transition-colors flex items-center gap-1.5 cursor-pointer"
                            >
                              <BrainCircuit className="w-4 h-4" />
                              {t.askAI}
                            </button>
                            <button
                              onClick={() => handleAskAI(displayTitle, true)}
                              className="px-3.5 py-2 rounded-xl bg-surface-container border border-outline-variant/30 hover:border-cyan-500/35 text-on-surface text-xs font-semibold transition-all flex items-center gap-1.5 cursor-pointer"
                            >
                              <HelpCircle className="w-4 h-4 text-cyan-400" />
                              {t.explainSimpler}
                            </button>
                            
                            <button
                              onClick={() => handleShare(displayTitle)}
                              className="p-2 px-3.5 rounded-xl bg-surface-container hover:bg-white/5 border border-outline-variant/20 hover:border-cyan-500/20 text-on-surface-variant hover:text-white transition-all text-xs font-semibold flex items-center gap-1.5 cursor-pointer"
                            >
                              <Share2 className="w-3.5 h-3.5" />
                              <span>{t.share}</span>
                            </button>
                            
                            <button
                              onClick={handlePrint}
                              className="p-2 px-3.5 rounded-xl bg-surface-container hover:bg-white/5 border border-outline-variant/20 hover:border-cyan-500/20 text-on-surface-variant hover:text-white transition-all text-xs font-semibold flex items-center gap-1.5 cursor-pointer"
                            >
                              <Printer className="w-3.5 h-3.5" />
                              <span>{t.print}</span>
                            </button>
                          </div>

                          <p className="text-[9px] text-outline font-mono italic">* {t.disclaimer}</p>
                        </div>
                      )}

                    </div>
                  );
                })
              )}
            </div>
          )}

          {/* TAB C: EMERGENCY CONTACTS */}
          {activeTab === "contacts" && (
            <div className="space-y-6 max-w-4xl mx-auto">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {emergencyHelplines.map((item) => (
                  <div 
                    key={item.id}
                    className="p-5 rounded-2xl bg-surface-container-low/40 border border-outline-variant/20 hover:border-red-500/25 transition-all duration-300 flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-[10px] uppercase font-mono font-bold tracking-wider px-2 py-0.5 rounded-md border text-red-400 bg-red-500/10 border-red-500/20">
                          {item.badge}
                        </span>
                        <span className="text-lg font-bold font-mono text-red-400">{item.number}</span>
                      </div>
                      
                      <h4 className="font-bold text-sm text-on-surface mb-1.5">{language === 'en' ? item.title.en : item.title.hi}</h4>
                      <p className="text-xs text-on-surface-variant leading-relaxed mb-6">
                        {language === 'en' ? item.desc.en : item.desc.hi}
                      </p>
                    </div>

                    <a 
                      href={`tel:${item.number}`}
                      className="w-full py-2.5 rounded-xl bg-surface-container border border-outline-variant/30 hover:border-red-500/35 text-on-surface font-semibold text-xs text-center flex items-center justify-center gap-2 hover:bg-red-500/5 transition-all cursor-pointer"
                    >
                      <PhoneCall className="w-3.5 h-3.5 text-red-400" />
                      <span>{t.tapToCall} ({item.number})</span>
                    </a>
                  </div>
                ))}

                {/* Local Hospital Placeholder Card */}
                <div className="p-5 rounded-2xl bg-surface-container-low/20 border border-dashed border-outline-variant/35 flex flex-col items-center justify-center text-center">
                  <ShieldAlert className="w-8 h-8 text-outline mb-2.5 animate-pulse" />
                  <h4 className="font-semibold text-sm text-on-surface mb-1">Local Clinic Placeholder</h4>
                  <p className="text-xs text-outline-variant max-w-xs leading-relaxed mb-4">
                    NGO awareness programs will map local district hospital helpline coordinates directly into this container slot.
                  </p>
                  <button 
                    disabled 
                    className="px-4 py-2 rounded-xl bg-surface-container/60 border border-outline-variant/15 text-outline text-xs font-semibold cursor-not-allowed"
                  >
                    Hospital Coordinates
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* TAB D: HEALTHY HABITS */}
          {activeTab === "habits" && (
            <div className="space-y-6 max-w-4xl mx-auto">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {filteredHabits.length === 0 ? (
                  <p className="text-center text-xs text-outline py-8">{t.noResults}</p>
                ) : (
                  filteredHabits.map((habit) => {
                    const displayTitle = language === 'en' ? habit.title.en : habit.title.hi;
                    return (
                      <div 
                        key={habit.id}
                        className="p-5 rounded-2xl bg-surface-container-low/40 border border-outline-variant/20 hover:border-cyan-500/25 transition-all duration-300 space-y-4"
                      >
                        <h4 className="font-bold text-sm text-on-surface flex items-center gap-2 border-b border-outline-variant/10 pb-2">
                          <CheckSquare className="w-4 h-4 text-cyan-400" />
                          {displayTitle}
                        </h4>

                        <div className="space-y-3 text-xs">
                          {/* Benefits */}
                          <div>
                            <span className="font-mono text-[9px] uppercase tracking-wider text-cyan-400 block mb-0.5">{t.benefits}</span>
                            <p className="text-on-surface-variant leading-relaxed font-medium">{habit.benefits[language]}</p>
                          </div>

                          {/* Routine */}
                          <div>
                            <span className="font-mono text-[9px] uppercase tracking-wider text-cyan-400 block mb-0.5">{t.routine}</span>
                            <p className="text-on-surface-variant leading-relaxed">{habit.routine[language]}</p>
                          </div>

                          {/* Tips */}
                          <div>
                            <span className="font-mono text-[9px] uppercase tracking-wider text-cyan-400 block mb-0.5">{t.tips}</span>
                            <p className="text-on-surface-variant leading-relaxed italic">{habit.tips[language]}</p>
                          </div>
                        </div>

                        {/* Ask AI Shortcut */}
                        <div className="pt-2 border-t border-outline-variant/10 flex gap-2">
                          <button
                            onClick={() => handleAskAI(displayTitle)}
                            className="px-2.5 py-1 rounded bg-cyan-500/10 border border-cyan-500/20 text-cyan-300 hover:text-cyan-200 text-[10px] font-semibold transition-colors flex items-center gap-1 cursor-pointer"
                          >
                            <BrainCircuit className="w-3.5 h-3.5" />
                            {t.askAI}
                          </button>
                        </div>

                      </div>
                    );
                  })
                )}
              </div>
            </div>
          )}

        </div>

      </div>
    </div>
  );
}

export default HealthGuide;
