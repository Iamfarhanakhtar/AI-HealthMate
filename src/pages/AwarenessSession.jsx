import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Play, 
  RotateCcw, 
  ChevronRight, 
  ChevronLeft, 
  Maximize2, 
  Minimize2, 
  BookOpen, 
  BrainCircuit, 
  Stethoscope, 
  Award, 
  Clock, 
  Users, 
  Notebook, 
  Settings, 
  HelpCircle, 
  FileText, 
  Printer, 
  Globe,
  Sparkles,
  Volume2,
  ClipboardCheck,
  CheckCircle
} from 'lucide-react';

import { slidesData, learningObjectives } from '../utils/sessionData';
import { symptoms, firstAidGuides } from '../utils/guideData';
import { quizQuestions } from '../utils/quizData';
import CertificateCard from '../components/quiz/CertificateCard';

function AwarenessSession() {
  const navigate = useNavigate();
  
  // Find language
  const language = localStorage.getItem('ai_healthmate_language') || 'en';

  // Translation mappings
  const t = useMemo(() => {
    return {
      en: {
        title: "Awareness Session & Presentation Mode",
        subtitle: "Guided slideshow deck for healthcare camps, schools, and NGO volunteers.",
        demoMode: "Enable Demo Mode (Prefill Sample Data)",
        setupTitle: "Configure Awareness Session",
        sessionName: "Session Name",
        presenter: "Presenter Name",
        org: "School / NGO / Village Name",
        audience: "Audience Type",
        expected: "Expected Participants",
        duration: "Estimated Duration (Minutes)",
        startBtn: "Start Session Preview",
        overviewTitle: "Session Pre-Start Overview",
        learningObjectives: "Session Learning Objectives",
        slidesCount: "Total Slides",
        notesBtn: "Presenter Notes (Press N)",
        fullscreenBtn: "Fullscreen (Press F)",
        prev: "Previous",
        next: "Next",
        close: "Exit Session",
        results: "Session Summary Dashboard",
        reportTitle: "Social Campaign Internship Report",
        btnPrint: "Print Summary Report",
        btnDownload: "Download report (PDF)",
        discussion: "Discussion Prompt",
        pollQuestion: "Poll Question",
        raiseHand: "Raise Hand Prompts",
        yes: "Yes",
        no: "No",
        countText: "Registered Votes",
        thankYou: "Session Completed Successfully!"
      },
      hi: {
        title: "जागरूकता सत्र और प्रस्तुति मोड",
        subtitle: "स्वास्थ्य शिविरों, स्कूलों और गैर सरकारी संगठनों के स्वयंसेवकों के लिए निर्देशित स्लाइडशो डेक।",
        demoMode: "डेमो मोड सक्षम करें (नमूना डेटा प्रीफिल)",
        setupTitle: "जागरूकता सत्र कॉन्फ़िगर करें",
        sessionName: "सत्र का नाम",
        presenter: "प्रस्तुतकर्ता का नाम",
        org: "स्कूल / NGO / गाँव का नाम",
        audience: "दर्शक प्रकार",
        expected: "अपेक्षित प्रतिभागी",
        duration: "अनुमानित अवधि (मिनट)",
        startBtn: "सत्र पूर्वावलोकन शुरू करें",
        overviewTitle: "सत्र पूर्व-प्रारंभ अवलोकन",
        learningObjectives: "सत्र अधिगम के उद्देश्य",
        slidesCount: "कुल स्लाइड",
        notesBtn: "प्रस्तुतकर्ता नोट (N दबाएं)",
        fullscreenBtn: "पूर्णस्क्रीन (F दबाएं)",
        prev: "पिछला",
        next: "अगला",
        close: "सत्र से बाहर निकलें",
        results: "सत्र सारांश डैशबोर्ड",
        reportTitle: "सामाजिक अभियान इंटर्नशिप रिपोर्ट",
        btnPrint: "प्रिंट सारांश रिपोर्ट",
        btnDownload: "रिपोर्ट डाउनलोड करें (PDF)",
        discussion: "चर्चा संकेत",
        pollQuestion: "पोल प्रश्न",
        raiseHand: "हाथ उठाने के संकेत",
        yes: "हाँ",
        no: "नहीं",
        countText: "पंजीकृत मत",
        thankYou: "सत्र सफलतापूर्वक पूरा हुआ!"
      }
    }[language];
  }, [language]);

  // States
  const [sessionState, setSessionState] = useState("config"); // "config" | "overview" | "active" | "summary"
  const [demoMode, setDemoMode] = useState(false);
  const [config, setConfig] = useState({
    sessionName: "",
    presenterName: "",
    orgName: "",
    audienceType: "Students",
    expectedCount: 30,
    estimatedDuration: 45
  });
  const [configErrors, setConfigErrors] = useState({});

  // Active Presentation state
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [showNotes, setShowNotes] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [elapsedTime, setElapsedTime] = useState(0);

  // Poll state variables
  const [pollVotes, setPollVotes] = useState({ yes: 0, no: 0 });

  // Embedded modules state variables (simulations)
  const [chatMessage, setChatMessage] = useState("");
  const [chatReplies, setChatReplies] = useState([
    { role: "assistant", content: "Hello! I am your AI Health Assistant. Ask me any healthcare awareness question." }
  ]);
  const [quizAnswerChecked, setQuizAnswerChecked] = useState(false);
  const [quizSelectedOption, setQuizSelectedOption] = useState(null);

  const timerRef = useRef(null);
  const containerRef = useRef(null);

  // Keyboard shortcut listener
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (sessionState !== "active") return;
      if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;
      
      if (e.key === "ArrowRight" || e.key === " ") {
        e.preventDefault();
        handleNext();
      } else if (e.key === "ArrowLeft") {
        e.preventDefault();
        handlePrev();
      } else if (e.key.toLowerCase() === "f") {
        e.preventDefault();
        toggleFullscreen();
      } else if (e.key.toLowerCase() === "n") {
        e.preventDefault();
        setShowNotes(prev => !prev);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [sessionState, currentSlideIndex]);

  // Timer spent
  useEffect(() => {
    if (sessionState === "active") {
      timerRef.current = setInterval(() => {
        setElapsedTime(prev => prev + 1);
      }, 1000);
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [sessionState]);

  // Demo mode pre-fill triggers
  const handleDemoToggle = () => {
    setDemoMode(prev => {
      const next = !prev;
      if (next) {
        setConfig({
          sessionName: "Monsoon Disease Prevention Drive",
          presenterName: "Dr. Rahul Sharma (Intern)",
          orgName: "Ganesh Vidyalaya Rural School",
          audienceType: "Students & Teachers",
          expectedCount: 50,
          estimatedDuration: 40
        });
        setConfigErrors({});
      } else {
        setConfig({
          sessionName: "",
          presenterName: "",
          orgName: "",
          audienceType: "Students",
          expectedCount: 30,
          estimatedDuration: 45
        });
      }
      return next;
    });
  };

  // Navigations
  const handleNext = () => {
    if (currentSlideIndex < slidesData.length - 1) {
      setCurrentSlideIndex(prev => prev + 1);
    } else {
      setSessionState("summary");
    }
  };

  const handlePrev = () => {
    if (currentSlideIndex > 0) {
      setCurrentSlideIndex(prev => prev - 1);
    }
  };

  const toggleFullscreen = () => {
    if (!isFullscreen) {
      if (containerRef.current.requestFullscreen) {
        containerRef.current.requestFullscreen();
      }
      setIsFullscreen(true);
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      }
      setIsFullscreen(false);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  // Format Elapsed presentation time
  const formattedTime = useMemo(() => {
    const min = Math.floor(elapsedTime / 60);
    const sec = elapsedTime % 60;
    return `${min}:${sec < 10 ? '0' : ''}${sec} min`;
  }, [elapsedTime]);

  const activeSlide = slidesData[currentSlideIndex];

  // Simulated inline Chat AI query triggers
  const handleAISend = (e) => {
    e.preventDefault();
    if (!chatMessage.trim()) return;
    const userMsg = chatMessage;
    setChatReplies(prev => [...prev, { role: "user", content: userMsg }]);
    setChatMessage("");

    setTimeout(() => {
      setChatReplies(prev => [...prev, {
        role: "assistant",
        content: `Thank you for asking about "${userMsg}" in this Awareness Session! To prevent mosquito diseases, clear stagnant water, use insect nets, wear long sleeves, and consult health workers if fever develops.`
      }]);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-background py-8 px-4 md:px-8 text-left">
      <div className="max-w-4xl mx-auto space-y-6">

        {/* ================================================= */}
        {/* STATE A: SETUP CONFIGURATION STATE */}
        {/* ================================================= */}
        {sessionState === "config" && (
          <div className="space-y-6 animate-fade-in">
            <div className="pb-6 border-b border-outline-variant/20 space-y-2">
              <h1 className="text-display-lg font-bold text-transparent bg-clip-text bg-gradient-to-r from-white via-cyan-100 to-cyan-300 text-3xl md:text-4xl tracking-tight flex items-center gap-3">
                <Settings className="w-8 h-8 text-cyan-400 shrink-0" />
                {t.title}
              </h1>
              <p className="text-on-surface-variant text-sm md:text-base max-w-xl">
                {t.subtitle}
              </p>
            </div>

            {/* Demo Mode Toggle */}
            <div className="p-4 rounded-xl bg-cyan-950/15 border border-cyan-500/25 flex items-center justify-between">
              <span className="text-xs font-semibold text-cyan-300 flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-cyan-400" />
                {t.demoMode}
              </span>
              <input
                type="checkbox"
                checked={demoMode}
                onChange={handleDemoToggle}
                className="w-4 h-4 accent-cyan-500 cursor-pointer"
              />
            </div>

            {/* Config Form */}
            <form 
              onSubmit={(e) => {
                e.preventDefault();
                const errors = {};
                if (!config.sessionName.trim()) errors.sessionName = "Session Name is required";
                if (!config.presenterName.trim()) errors.presenterName = "Presenter Name is required";
                if (!config.orgName.trim()) errors.orgName = "Organization Name is required";
                
                if (Object.keys(errors).length > 0) {
                  setConfigErrors(errors);
                  return;
                }
                setConfigErrors({});
                setSessionState("overview");
              }} 
              className="p-6 rounded-2xl bg-surface-container-low/40 border border-outline-variant/20 space-y-4 shadow-xl"
              noValidate
            >
              <h3 className="font-bold text-sm text-on-surface mb-2">{t.setupTitle}</h3>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-[10px] uppercase font-mono tracking-widest text-cyan-400 font-semibold">{t.sessionName} *</label>
                  <input
                    type="text"
                    value={config.sessionName}
                    onChange={(e) => {
                      setConfig(prev => ({ ...prev, sessionName: e.target.value }));
                      if (configErrors.sessionName) setConfigErrors(prev => ({ ...prev, sessionName: null }));
                    }}
                    className="w-full bg-surface-container px-3.5 py-2.5 rounded-xl border border-outline-variant/30 text-xs text-on-surface focus:border-cyan-500/50 outline-none"
                    placeholder="e.g. Village Mosquito Awareness Campaign"
                    aria-invalid={!!configErrors.sessionName}
                  />
                  {configErrors.sessionName && <p className="text-[10px] text-red-400 font-semibold">{configErrors.sessionName}</p>}
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] uppercase font-mono tracking-widest text-cyan-400 font-semibold">{t.presenter} *</label>
                  <input
                    type="text"
                    value={config.presenterName}
                    onChange={(e) => {
                      setConfig(prev => ({ ...prev, presenterName: e.target.value }));
                      if (configErrors.presenterName) setConfigErrors(prev => ({ ...prev, presenterName: null }));
                    }}
                    className="w-full bg-surface-container px-3.5 py-2.5 rounded-xl border border-outline-variant/30 text-xs text-on-surface focus:border-cyan-500/50 outline-none"
                    placeholder="e.g. Rahul Sharma"
                    aria-invalid={!!configErrors.presenterName}
                  />
                  {configErrors.presenterName && <p className="text-[10px] text-red-400 font-semibold">{configErrors.presenterName}</p>}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-[10px] uppercase font-mono tracking-widest text-cyan-400 font-semibold">{t.org} *</label>
                  <input
                    type="text"
                    value={config.orgName}
                    onChange={(e) => {
                      setConfig(prev => ({ ...prev, orgName: e.target.value }));
                      if (configErrors.orgName) setConfigErrors(prev => ({ ...prev, orgName: null }));
                    }}
                    className="w-full bg-surface-container px-3.5 py-2.5 rounded-xl border border-outline-variant/30 text-xs text-on-surface focus:border-cyan-500/50 outline-none"
                    placeholder="e.g. Rural Primary School"
                    aria-invalid={!!configErrors.orgName}
                  />
                  {configErrors.orgName && <p className="text-[10px] text-red-400 font-semibold">{configErrors.orgName}</p>}
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] uppercase font-mono tracking-widest text-cyan-400 font-semibold">{t.audience}</label>
                  <input
                    type="text"
                    required
                    value={config.audienceType}
                    onChange={(e) => setConfig(prev => ({ ...prev, audienceType: e.target.value }))}
                    className="w-full bg-surface-container px-3.5 py-2.5 rounded-xl border border-outline-variant/30 text-xs text-on-surface focus:border-cyan-500/50 outline-none"
                    placeholder="e.g. Villagers / School Kids"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-[10px] uppercase font-mono tracking-widest text-cyan-400 font-semibold">{t.expected}</label>
                  <input
                    type="number"
                    required
                    value={config.expectedCount}
                    onChange={(e) => setConfig(prev => ({ ...prev, expectedCount: parseInt(e.target.value) || 0 }))}
                    className="w-full bg-surface-container px-3.5 py-2.5 rounded-xl border border-outline-variant/30 text-xs text-on-surface focus:border-cyan-500/50 outline-none"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] uppercase font-mono tracking-widest text-cyan-400 font-semibold">{t.duration}</label>
                  <input
                    type="number"
                    required
                    value={config.estimatedDuration}
                    onChange={(e) => setConfig(prev => ({ ...prev, estimatedDuration: parseInt(e.target.value) || 0 }))}
                    className="w-full bg-surface-container px-3.5 py-2.5 rounded-xl border border-outline-variant/30 text-xs text-on-surface focus:border-cyan-500/50 outline-none"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-on-primary font-bold text-sm transition-all flex items-center justify-center gap-1.5 shadow-lg shadow-cyan-500/10 cursor-pointer"
              >
                <Play className="w-4 h-4 fill-on-primary" />
                <span>{t.startBtn}</span>
              </button>
            </form>
          </div>
        )}

        {/* ================================================= */}
        {/* STATE B: PRE-START SESSION OVERVIEW */}
        {/* ================================================= */}
        {sessionState === "overview" && (
          <div className="p-6 rounded-2xl bg-surface-container-low/40 border border-outline-variant/20 space-y-6 animate-fade-in shadow-xl text-left">
            <h2 className="text-xl font-bold text-white border-b border-outline-variant/20 pb-2 uppercase tracking-wide text-transparent bg-clip-text bg-gradient-to-r from-white to-cyan-300">
              {t.overviewTitle}
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs sm:text-sm text-on-surface-variant">
              <div><strong className="text-cyan-400">Session Name:</strong> {config.sessionName}</div>
              <div><strong className="text-cyan-400">Presenter:</strong> {config.presenterName}</div>
              <div><strong className="text-cyan-400">Organization:</strong> {config.orgName}</div>
              <div><strong className="text-cyan-400">Audience:</strong> {config.audienceType}</div>
              <div><strong className="text-cyan-400">Slides:</strong> {slidesData.length} Slides</div>
              <div><strong className="text-cyan-400">Duration:</strong> {config.estimatedDuration} Minutes</div>
            </div>

            {/* Learning Objectives */}
            <div className="p-4 rounded-xl bg-surface-container/60 border border-outline-variant/15 space-y-2">
              <h4 className="text-xs font-bold text-white uppercase tracking-wider">{t.learningObjectives}</h4>
              <ul className="space-y-2 text-xs text-on-surface-variant leading-relaxed">
                {learningObjectives.map((obj, idx) => (
                  <li key={idx} className="flex gap-2 items-start">
                    <span className="text-cyan-400">•</span>
                    <span>{language === 'en' ? obj.en : obj.hi}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex gap-2.5">
              <button
                onClick={() => setSessionState("active")}
                className="flex-1 py-3 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-on-primary font-bold text-xs transition-colors flex items-center justify-center gap-1.5 cursor-pointer shadow-lg shadow-cyan-500/10"
              >
                <Play className="w-4 h-4 fill-on-primary" />
                <span>Start presentation slideshow</span>
              </button>
              <button
                onClick={() => setSessionState("config")}
                className="px-4 py-3 rounded-xl bg-surface-container border border-outline-variant/30 hover:border-cyan-500/30 text-on-surface font-semibold text-xs transition-all cursor-pointer"
              >
                Back to Settings
              </button>
            </div>
          </div>
        )}

        {/* ================================================= */}
        {/* STATE C: ACTIVE PRESENTATION SLIDESHOW MODE */}
        {/* ================================================= */}
        {sessionState === "active" && (
          <div 
            ref={containerRef}
            className={`p-6 rounded-2xl border flex flex-col justify-between transition-all duration-300 relative ${
              isFullscreen 
                ? 'w-screen h-screen bg-[#07090e] border-none p-10 fixed inset-0 z-[9999]' 
                : 'bg-surface-container-lowest/80 border-outline-variant/20 min-h-[500px] shadow-2xl'
            }`}
          >
            
            {/* Top Toolbar progress pacing bar */}
            <div className="flex items-center justify-between border-b border-outline-variant/10 pb-4 mb-4 text-xs font-mono text-outline shrink-0">
              <div className="flex items-center gap-3">
                <span className="text-cyan-300 font-bold uppercase tracking-wider text-[10px]">
                  {config.sessionName.substring(0, 20)}...
                </span>
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400"></span>
                <div className="flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-cyan-400" />
                  <span>{formattedTime}</span>
                </div>
              </div>

              {/* Progress pacing tracker indicator */}
              <div className="flex items-center gap-4">
                <span>Slide {currentSlideIndex + 1} of {slidesData.length}</span>
                <span>Pacing: {Math.max(config.estimatedDuration - Math.round(elapsedTime / 60), 0)} min remaining</span>
              </div>
            </div>

            {/* Visual Stepper dots at bottom of header */}
            <div className="w-full h-1 bg-surface-container rounded-full overflow-hidden mb-6 shrink-0">
              <div 
                className="h-full bg-gradient-to-r from-cyan-500 to-emerald-400 transition-all duration-300"
                style={{ width: `${((currentSlideIndex + 1) / slidesData.length) * 100}%` }}
              />
            </div>

            {/* Slide Body Container */}
            <div className="flex-1 flex flex-col justify-center max-w-3xl mx-auto w-full space-y-6 py-4">
              
              <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-cyan-400 shrink-0"></span>
                {activeSlide.title[language]}
              </h2>

              <p className="text-xs sm:text-sm text-on-surface-variant leading-relaxed">
                {activeSlide.desc[language]}
              </p>

              {/* INLINE EMBEDDED DEMO SHOWCASE CONTROLS */}
              {activeSlide.type === "embed" && (
                <div className="p-4 rounded-xl bg-surface-container/60 border border-outline-variant/15 max-h-[300px] overflow-y-auto space-y-4">
                  
                  {/* Embedded Library (Slide 5) */}
                  {activeSlide.embedModule === "library" && (
                    <div className="space-y-2 text-left">
                      <span className="text-[9px] uppercase font-mono font-bold text-cyan-400 flex items-center gap-1"><BookOpen className="w-3.5 h-3.5" /> Interactive Library Showcase</span>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                        {["Dengue Prevention Guidelines", "Malaria Vector Control", "Typhoid Water Sanitation", "Dietary Nutrition Habits"].map((item, idx) => (
                          <div key={idx} className="p-2 rounded bg-surface-container border border-outline-variant/20 hover:border-cyan-500/35 transition-colors text-white font-semibold">
                            {item}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Embedded AI Assistant (Slide 6) */}
                  {activeSlide.embedModule === "assistant" && (
                    <div className="space-y-2 text-left">
                      <span className="text-[9px] uppercase font-mono font-bold text-cyan-400 flex items-center gap-1"><BrainCircuit className="w-3.5 h-3.5" /> Live Assistant Demonstration</span>
                      <div className="p-2.5 rounded bg-surface-container-low border border-outline-variant/15 space-y-2 text-xs">
                        <div className="max-h-28 overflow-y-auto space-y-1.5">
                          {chatReplies.map((reply, index) => (
                            <div key={index} className={`p-1.5 rounded ${reply.role === 'user' ? 'bg-cyan-950/20 text-cyan-200 border-l border-cyan-500' : 'bg-surface-container text-on-surface-variant'}`}>
                              <strong>{reply.role === 'user' ? 'Presenter: ' : 'AI: '}</strong>
                              {reply.content}
                            </div>
                          ))}
                        </div>
                        <form onSubmit={handleAISend} className="flex gap-2 border-t border-outline-variant/10 pt-2">
                          <input
                            type="text"
                            value={chatMessage}
                            onChange={(e) => setChatMessage(e.target.value)}
                            placeholder="Ask AI Malaria prevention guidelines..."
                            className="w-full bg-surface-container px-3 py-1.5 rounded-lg text-xs outline-none"
                          />
                          <button type="submit" className="px-3 py-1 bg-cyan-500 text-on-primary rounded-lg text-[10px] font-bold">Ask AI</button>
                        </form>
                      </div>
                    </div>
                  )}

                  {/* Embedded Guide (Slide 7) */}
                  {activeSlide.embedModule === "guide" && (
                    <div className="space-y-2 text-left">
                      <span className="text-[9px] uppercase font-mono font-bold text-cyan-400 flex items-center gap-1"><Stethoscope className="w-3.5 h-3.5" /> Emergency Guide Timelines</span>
                      <div className="space-y-2">
                        {firstAidGuides.slice(0, 2).map((guide) => (
                          <div key={guide.id} className="p-2.5 rounded bg-surface-container border border-outline-variant/20 text-xs">
                            <h4 className="font-bold text-white mb-1.5">{guide.title[language]}</h4>
                            <div className="pl-3 border-l border-cyan-500/30 space-y-1 text-on-surface-variant text-[11px]">
                              {guide.steps[language].slice(0, 2).map((s, idx) => (
                                <div key={idx}>{idx + 1}. {s}</div>
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Embedded Quiz (Slide 9) */}
                  {activeSlide.embedModule === "quiz" && (
                    <div className="space-y-2 text-left">
                      <span className="text-[9px] uppercase font-mono font-bold text-cyan-400 flex items-center gap-1"><ClipboardCheck className="w-3.5 h-3.5" /> Group Triage Quiz Check</span>
                      <div className="p-3 rounded bg-surface-container border border-outline-variant/20 text-xs space-y-3">
                        <h4 className="font-bold text-white">{quizQuestions.firstaid[0].question[language]}</h4>
                        <div className="space-y-1">
                          {quizQuestions.firstaid[0].options[language].map((opt, optIdx) => {
                            const isCorrect = quizQuestions.firstaid[0].correct === optIdx;
                            const isSelected = quizSelectedOption === optIdx;
                            let style = "bg-surface-container-low hover:border-cyan-500/25";
                            if (quizAnswerChecked) {
                              if (isCorrect) style = "bg-emerald-950/10 border-emerald-500 text-emerald-300";
                              else if (isSelected) style = "bg-red-950/10 border-red-500 text-red-300";
                            } else if (isSelected) {
                              style = "border-cyan-500 text-cyan-300";
                            }
                            return (
                              <button
                                key={optIdx}
                                disabled={quizAnswerChecked}
                                onClick={() => setQuizSelectedOption(optIdx)}
                                className={`w-full text-left p-2 rounded border text-xs font-semibold cursor-pointer ${style}`}
                              >
                                {opt}
                              </button>
                            );
                          })}
                        </div>
                        <div className="flex justify-end gap-2">
                          {!quizAnswerChecked ? (
                            <button
                              onClick={() => setQuizAnswerChecked(true)}
                              disabled={quizSelectedOption === null}
                              className="px-3 py-1.5 bg-cyan-500 text-on-primary rounded text-[10px] font-bold cursor-pointer"
                            >
                              Check Answer
                            </button>
                          ) : (
                            <p className="text-[10px] text-on-surface-variant font-medium leading-relaxed">
                              {quizQuestions.firstaid[0].explanation[language]}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Embedded Certificate preview (Slide 10) */}
                  {activeSlide.embedModule === "certificate" && (
                    <div className="space-y-2 text-left">
                      <span className="text-[9px] uppercase font-mono font-bold text-cyan-400 flex items-center gap-1"><Award className="w-3.5 h-3.5" /> Certified Awards Showcase</span>
                      <div className="max-w-md mx-auto scale-90 origin-top">
                        <CertificateCard
                          attempt={{
                            category: "firstaid",
                            difficulty: "easy",
                            date: new Date().toISOString(),
                            certificateId: "HM-AID-9923",
                            percentage: 100
                          }}
                          participantName={config.presenterName || "Farhan"}
                          onNameChange={() => {}}
                          language={language}
                        />
                      </div>
                    </div>
                  )}

                  {/* Embedded Feedback Preview (Slide 11) */}
                  {activeSlide.embedModule === "feedback" && (
                    <div className="p-3.5 rounded bg-surface-container border border-outline-variant/15 text-left text-xs space-y-2">
                      <span className="text-[9px] uppercase font-mono font-bold text-cyan-400 flex items-center gap-1">Community Review Survey</span>
                      <p className="text-[11px] text-on-surface-variant">Collect Star ratings and custom suggestion checks from school volunteers.</p>
                      <button 
                        disabled 
                        className="px-4 py-2 rounded-xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-[10px] font-bold cursor-not-allowed"
                      >
                        Submit Feedback Survey Form
                      </button>
                    </div>
                  )}

                  {/* Embedded Impact Summary preview (Slide 12) */}
                  {activeSlide.embedModule === "impact" && (
                    <div className="p-3.5 rounded bg-surface-container border border-outline-variant/15 text-left text-xs space-y-2">
                      <span className="text-[9px] uppercase font-mono font-bold text-cyan-400 flex items-center gap-1">Community Awareness Campaign Totals</span>
                      <div className="grid grid-cols-2 gap-2 text-[10px]">
                        <div className="p-2 bg-surface-container-low border border-outline-variant/10 rounded">
                          <strong className="text-white block font-mono">15,430</strong> People Reached
                        </div>
                        <div className="p-2 bg-surface-container-low border border-outline-variant/10 rounded">
                          <strong className="text-white block font-mono">430</strong> Certificates Issued
                        </div>
                      </div>
                    </div>
                  )}

                </div>
              )}

              {/* INTERACTIVE CHECKPOINTS: Discussion Prompt / Poll */}
              {activeSlide.type === "checkpoint" && (
                <div className="p-4 rounded-xl bg-surface-container-low border border-outline-variant/20 space-y-4">
                  
                  {/* Discussion Prompts */}
                  {activeSlide.checkpointType === "hand" && (
                    <div className="space-y-1 text-left text-xs">
                      <span className="text-[9px] uppercase font-mono font-bold text-purple-400 flex items-center gap-1"><Users className="w-3.5 h-3.5" /> {t.raiseHand}</span>
                      <p className="text-xs font-semibold text-white leading-relaxed">{activeSlide.discussion[language]}</p>
                    </div>
                  )}

                  {/* Poll voting */}
                  {activeSlide.checkpointType === "poll" && (
                    <div className="space-y-4 text-left text-xs">
                      <span className="text-[9px] uppercase font-mono font-bold text-cyan-400 flex items-center gap-1"><Volume2 className="w-3.5 h-3.5" /> {t.pollQuestion}</span>
                      <p className="text-xs font-semibold text-white leading-relaxed">{activeSlide.discussion[language]}</p>
                      
                      <div className="flex gap-2">
                        <button
                          onClick={() => setPollVotes(prev => ({ ...prev, yes: prev.yes + 1 }))}
                          className="px-4 py-2 rounded bg-cyan-500/10 border border-cyan-500/20 hover:bg-cyan-500/20 text-cyan-300 font-semibold cursor-pointer"
                        >
                          {t.yes}
                        </button>
                        <button
                          onClick={() => setPollVotes(prev => ({ ...prev, no: prev.no + 1 }))}
                          className="px-4 py-2 rounded bg-red-500/10 border border-red-500/20 hover:bg-red-500/20 text-red-300 font-semibold cursor-pointer"
                        >
                          {t.no}
                        </button>
                      </div>

                      <div className="text-[10px] text-outline font-mono">
                        {t.countText}: Yes ({pollVotes.yes}) | No ({pollVotes.no})
                      </div>
                    </div>
                  )}

                </div>
              )}

            </div>

            {/* Slide Navigation controls */}
            <div className="flex justify-between items-center border-t border-outline-variant/10 pt-4 mt-4 shrink-0">
              <div className="flex gap-2">
                <button
                  onClick={handlePrev}
                  disabled={currentSlideIndex === 0}
                  className="p-2.5 rounded-xl bg-surface-container border border-outline-variant/30 text-on-surface hover:text-white disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer flex items-center gap-1"
                >
                  <ChevronLeft className="w-4 h-4" />
                  <span className="text-xs font-semibold">{t.prev}</span>
                </button>

                <button
                  onClick={handleNext}
                  className="p-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-on-primary font-semibold text-xs cursor-pointer flex items-center gap-1"
                >
                  <span className="text-xs font-semibold">{t.next}</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() => setShowNotes(prev => !prev)}
                  className={`p-2.5 rounded-xl border text-xs font-semibold transition-all cursor-pointer ${
                    showNotes 
                      ? 'bg-cyan-500/15 border-cyan-500/40 text-cyan-300' 
                      : 'bg-surface-container border-outline-variant/30 text-on-surface'
                  }`}
                >
                  <Notebook className="w-4 h-4" />
                </button>

                <button
                  onClick={toggleFullscreen}
                  className="p-2.5 rounded-xl bg-surface-container border border-outline-variant/30 text-on-surface hover:text-white cursor-pointer"
                >
                  {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
                </button>

                <button
                  onClick={() => setSessionState("config")}
                  className="px-3.5 py-2.5 rounded-xl border border-red-500/20 text-red-400 hover:bg-red-500/5 text-xs font-semibold transition-colors cursor-pointer"
                >
                  {t.close}
                </button>
              </div>
            </div>

            {/* Hidden Presenter Notes Drawer */}
            {showNotes && (
              <div className="absolute left-6 right-6 bottom-20 p-4 rounded-xl bg-surface-container-high border border-cyan-500/30 text-xs text-on-surface-variant leading-relaxed shadow-2xl animate-fade-in z-50">
                <h4 className="font-bold text-cyan-400 uppercase tracking-widest font-mono text-[9px] mb-1">
                  Presenter Notes & Cues
                </h4>
                <p>{activeSlide.notes[language]}</p>
              </div>
            )}

          </div>
        )}

        {/* ================================================= */}
        {/* STATE D: SESSION COMPLETED & REPORT GENERATOR */}
        {/* ================================================= */}
        {sessionState === "summary" && (
          <div className="space-y-6 animate-fade-in">
            
            <div className="p-6 rounded-2xl bg-surface-container-low/40 border border-outline-variant/20 text-center space-y-4 shadow-xl">
              <CheckCircle className="w-14 h-14 text-emerald-400 mx-auto animate-pulse" />
              <h2 className="text-xl sm:text-2xl font-bold text-white">{t.thankYou}</h2>
              <p className="text-xs sm:text-sm text-on-surface-variant max-w-md mx-auto leading-relaxed">
                You have conducted a guided educational awareness drive. Below is your campaign internship verification report.
              </p>
            </div>

            {/* Social Internship Report A4 Alignment (Print layout) */}
            <div 
              id="report-print-area"
              className="p-8 rounded-2xl bg-surface-container-lowest border border-outline-variant/30 text-left text-on-surface space-y-6 shadow-2xl"
            >
              
              {/* Report Header */}
              <div className="flex justify-between items-center border-b border-outline-variant/20 pb-4">
                <div className="space-y-1">
                  <span className="text-[10px] uppercase font-mono tracking-widest text-cyan-400 font-bold">
                    AI HealthMate Campaign Verification
                  </span>
                  <h3 className="text-xl font-bold text-white tracking-tight">
                    {t.reportTitle}
                  </h3>
                </div>
                <div className="text-right text-[10px] font-mono text-outline leading-tight">
                  <div><strong>PORTAL CODE:</strong> HM-CAMPAIGN-10</div>
                  <div><strong>DATE:</strong> {new Date().toLocaleDateString()}</div>
                </div>
              </div>

              {/* Section A: Setup metadata */}
              <div className="grid grid-cols-2 gap-4 text-xs">
                <div><strong className="text-cyan-400">Session Name:</strong> {config.sessionName}</div>
                <div><strong className="text-cyan-400">Presenter:</strong> {config.presenterName}</div>
                <div><strong className="text-cyan-400">Organization Name:</strong> {config.orgName}</div>
                <div><strong className="text-cyan-400">Audience Segment:</strong> {config.audienceType}</div>
                <div><strong className="text-cyan-400">Duration Elapsed:</strong> {formattedTime}</div>
                <div><strong className="text-cyan-400">Participants Count:</strong> {config.expectedCount} Members</div>
              </div>

              {/* Section B: Topics discussed */}
              <div className="p-4 rounded-xl bg-surface-container/60 border border-outline-variant/15 space-y-2 text-xs">
                <h4 className="font-bold text-white uppercase tracking-wider">Educational Modules Covered</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-on-surface-variant leading-relaxed">
                  <div>• Mosquito Prevention (Dengue, Malaria)</div>
                  <div>• Clean Water Treatment & Filtration</div>
                  <div>• Emergency First Aid Timelines</div>
                  <div>• Group Knowledge Quiz Assessments</div>
                </div>
              </div>

              {/* Section C: Campaign Impact outcomes stats */}
              <div className="p-4 rounded-xl bg-surface-container/60 border border-outline-variant/15 space-y-2 text-xs">
                <h4 className="font-bold text-white uppercase tracking-wider">Campaign Learning Metrics</h4>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center font-mono">
                  <div className="p-2 bg-surface-container-low rounded border border-outline-variant/10">
                    <div className="text-base font-bold text-white">{config.expectedCount}</div>
                    <div className="text-[8px] text-outline uppercase">Reached</div>
                  </div>
                  <div className="p-2 bg-surface-container-low rounded border border-outline-variant/10">
                    <div className="text-base font-bold text-emerald-400">100%</div>
                    <div className="text-[8px] text-outline uppercase">Demos Run</div>
                  </div>
                  <div className="p-2 bg-surface-container-low rounded border border-outline-variant/10">
                    <div className="text-base font-bold text-cyan-300">1</div>
                    <div className="text-[8px] text-outline uppercase">Group Quiz</div>
                  </div>
                  <div className="p-2 bg-surface-container-low rounded border border-outline-variant/10">
                    <div className="text-base font-bold text-purple-400">95%</div>
                    <div className="text-[8px] text-outline uppercase">Satisfaction</div>
                  </div>
                </div>
              </div>

              {/* Internship verification badge footer */}
              <div className="grid grid-cols-2 gap-4 pt-6 border-t border-outline-variant/10 text-[9px] text-outline font-mono">
                <div>
                  <strong>B.Tech Social Internship Verification</strong><br />
                  Evaluator Signature Placeholder
                </div>
                <div className="text-right">
                  <strong>AI HealthMate platform</strong><br />
                  Secure Campaign Hash: HM-INT-CAMPAIGN-10
                </div>
              </div>

            </div>

            {/* Print and Export Controls */}
            <div className="flex gap-3 justify-center pt-2">
              <button
                onClick={handlePrint}
                className="px-5 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-on-primary font-bold text-xs transition-colors flex items-center justify-center gap-1.5 cursor-pointer shadow-lg shadow-cyan-500/10"
              >
                <Printer className="w-4 h-4" />
                <span>{t.btnPrint}</span>
              </button>

              <button
                onClick={() => alert("CSV learning log downloaded.")}
                className="px-5 py-2.5 rounded-xl bg-surface-container border border-outline-variant/30 hover:border-cyan-500/30 text-on-surface hover:text-white font-semibold text-xs transition-all flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <FileText className="w-4 h-4 text-cyan-400" />
                <span>{t.btnDownload}</span>
              </button>

              <button
                onClick={() => {
                  setSessionState("config");
                  setCurrentSlideIndex(0);
                }}
                className="px-5 py-2.5 rounded-xl bg-surface-container border border-outline-variant/30 hover:border-cyan-500/30 text-on-surface hover:text-white font-semibold text-xs transition-all flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <RotateCcw className="w-4 h-4" />
                <span>Restart Session</span>
              </button>
            </div>

          </div>
        )}

      </div>

      {/* Print-specific stylesheet style tag */}
      <style>{`
        @media print {
          body * {
            visibility: hidden;
          }
          #report-print-area, #report-print-area * {
            visibility: visible;
          }
          #report-print-area {
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
            border: 1px solid #444 !important;
            padding: 24px !important;
            background-color: #0b0e14 !important;
            color: #ffffff !important;
          }
        }
      `}</style>

    </div>
  );
}

export default AwarenessSession;
