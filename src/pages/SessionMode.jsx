import React, { useState, useContext } from 'react';
import MaterialIcon from '../components/UI/MaterialIcon';

import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, ArrowRight, X, Heart, ShieldAlert, Award, Send, CheckCircle } from 'lucide-react';
import { PlatformContext } from '../context/PlatformContext';
import { articles, firstAid } from '../utils/healthData';
import { quizzes } from '../utils/quizData';
import GlassPanel from '../components/UI/GlassPanel';
import Button from '../components/UI/Button';
import ProgressBar from '../components/UI/ProgressBar';
import CertificateCard from '../components/CertificateCard';

function SessionMode() {
  const navigate = useNavigate();
  const {
    sessionActive,
    activeStep,
    sessionData,
    startSession,
    nextSessionStep,
    leaveSession,
    addFeedback,
    incrementAIQuestions
  } = useContext(PlatformContext);

  // --- Step 0 Form States ---
  const [sessionName, setSessionName] = useState("");
  const [location, setLocation] = useState("");
  const [groupSize, setGroupSize] = useState(25);
  const [groupType, setGroupType] = useState("Students");

  // --- Step 3 AI Demo States ---
  const [chatInput, setChatInput] = useState("");
  const [chatMessages, setChatMessages] = useState([
    { sender: 'bot', text: "Hello! This is a live demonstration of our AI Healthcare Assistant. Ask a public health query (e.g. malaria breeding, burn care, nutrition) to show the group." }
  ]);
  const [isTyping, setIsTyping] = useState(false);

  // --- Step 4 Quiz States ---
  const [quizStarted, setQuizStarted] = useState(false);
  const [qIndex, setQIndex] = useState(0);
  const [qAnswers, setQAnswers] = useState([]);
  const [qScore, setQScore] = useState(0);
  const [quizFinished, setQuizFinished] = useState(false);

  // --- Step 5 Feedback States ---
  const [reviewerName, setReviewerName] = useState("");
  const [sessionRating, setSessionRating] = useState(5);
  const [reviewMessage, setReviewMessage] = useState("");
  const [feedbackSubmitted, setFeedbackSubmitted] = useState(false);

  // --- Step 6 Certificate States ---
  const [certName, setCertName] = useState("");
  const [certGenerated, setCertGenerated] = useState(false);

  const sessionQuiz = quizzes[0]; // Use Water & Sanitation Quiz for simplicity

  const stepsList = [
    "Welcome",
    "Health Library",
    "Triage Check",
    "AI Assistant Demo",
    "Interactive Quiz",
    "Feedback",
    "Certificate Ceremony"
  ];

  // Initialize session
  const handleStart = (e) => {
    e.preventDefault();
    if (!sessionName.trim() || !location.trim()) return;

    startSession({
      name: sessionName.trim(),
      location: location.trim(),
      groupSize: Number(groupSize),
      groupType
    });
  };

  // AI Demo send query
  const handleAISend = () => {
    if (!chatInput.trim()) return;
    const text = chatInput;
    setChatInput("");
    setChatMessages(prev => [...prev, { sender: 'user', text }]);
    setIsTyping(true);
    incrementAIQuestions();

    let reply = "That is an interesting question! For Dengue, ensure all stagnant water is covered. For water safety, boil water for 1 minute. Always reference local health guidelines.";
    const cleanText = text.toLowerCase();
    
    if (cleanText.includes("dengue") || cleanText.includes("malaria")) {
      reply = "Mosquito-borne diseases can be stopped by eliminating stagnant water. Use Insecticide-Treated Nets (ITNs), wear long sleeves, and get tested if high fever occurs.";
    } else if (cleanText.includes("water") || cleanText.includes("boil") || cleanText.includes("hygiene")) {
      reply = "Water safety prevents diarrhea and cholera. Boil water for at least 1 minute or use chlorine tablets. Wash hands with soap for 20 seconds before meals.";
    } else if (cleanText.includes("first aid") || cleanText.includes("bite") || cleanText.includes("burn")) {
      reply = "First aid for minor burns: run cool tap water for 10-20 minutes. Do NOT apply toothpaste. For snake bites: keep patient still and transport immediately to a hospital.";
    }

    setTimeout(() => {
      setIsTyping(false);
      setChatMessages(prev => [...prev, { sender: 'bot', text: reply }]);
    }, 1200);
  };

  // Session Quiz Option Click
  const handleQuizOption = (optIdx) => {
    const currentQ = sessionQuiz.questions[qIndex];
    if (qAnswers.length > qIndex) return; // already answered

    const correct = optIdx === currentQ.answerIndex;
    setQAnswers(prev => [...prev, { selected: optIdx, correct }]);
    if (correct) setQScore(s => s + 1);
  };

  const handleNextQuiz = () => {
    if (qIndex + 1 < sessionQuiz.questions.length) {
      setQIndex(q => q + 1);
    } else {
      setQuizFinished(true);
    }
  };

  const handleRetakeQuiz = () => {
    setQIndex(0);
    setQAnswers([]);
    setQScore(0);
    setQuizFinished(false);
  };

  // Session Feedback Submit
  const handleFeedbackSubmit = (e) => {
    e.preventDefault();
    if (!reviewMessage.trim()) return;

    addFeedback({
      name: reviewerName.trim() || `Session Attendee`,
      location: sessionData.location,
      topic: "Awareness Sessions",
      rating: sessionRating,
      message: `[Session: ${sessionData.name}] ${reviewMessage.trim()}`
    });

    setFeedbackSubmitted(true);
    setTimeout(() => {
      nextSessionStep();
    }, 2000);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="w-full min-h-screen bg-[#05070A] py-10 relative z-10 flex flex-col justify-between"
    >
      {/* HEADER SECTION FOR ACTIVE SESSION */}
      {sessionActive && (
        <div className="max-w-[1200px] mx-auto w-full px-6 md:px-10 border-b border-white/5 pb-4 mb-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <span className="text-[10px] font-bold text-primary uppercase tracking-wider bg-primary/10 px-2 py-0.5 rounded-full border border-primary/20">
                Live Awareness Session Mode
              </span>
              <h2 className="font-title-md text-lg text-secondary font-bold mt-1">
                {sessionData.name} ({sessionData.groupSize} {sessionData.groupType})
              </h2>
              <p className="text-xs text-on-surface-variant">Location: {sessionData.location}</p>
            </div>
            
            <button
              onClick={leaveSession}
              className="text-xs text-red-400 hover:text-red-300 transition-colors flex items-center gap-1 border border-red-500/20 bg-red-500/5 px-3 py-1.5 rounded-lg cursor-pointer"
            >
              <X size={14} />
              Conclude / Quit
            </button>
          </div>

          {/* Slide progress steps */}
          <div className="mt-6 flex flex-col gap-2">
            <div className="flex justify-between items-center text-[10px] text-outline font-mono-data">
              <span>Step {activeStep + 1} of {stepsList.length}</span>
              <span className="text-primary font-bold">{stepsList[activeStep]}</span>
            </div>
            <ProgressBar value={((activeStep + 1) / stepsList.length) * 100} glowColor="cyan" />
          </div>
        </div>
      )}

      {/* MAIN CONTENT SHELLS */}
      <div className="max-w-[1200px] mx-auto w-full flex-grow px-6 md:px-10 flex items-center justify-center">
        <AnimatePresence mode="wait">
          
          {/* STEP 0: Welcome & Setup registration (If session not active) */}
          {!sessionActive && (
            <motion.div
              key="setup"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              className="w-full max-w-xl text-left"
            >
              <GlassPanel glowVariant="cyan" className="p-8">
                <div className="flex items-center gap-2 mb-4">
                  <MaterialIcon icon="school" className="text-primary text-3xl" />
                  <h1 className="font-display-lg text-2xl font-bold text-secondary">
                    Initialize Awareness Session
                  </h1>
                </div>

                <p className="text-body-sm text-on-surface-variant text-[13px] mb-6 leading-relaxed">
                  Are you hosting a community health camp, NGO class, or school seminar? Initialize the session mode to walk the class through disease guides, an AI demo, and a quick quiz to print an achievement certificate.
                </p>

                <form onSubmit={handleStart} className="flex flex-col gap-4">
                  {/* Session name */}
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[11px] font-bold text-outline uppercase tracking-wider">Session Topic / Name</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Village Water Safety Seminar"
                      value={sessionName}
                      onChange={(e) => setSessionName(e.target.value)}
                      className="w-full bg-[#131b2e]/60 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-on-surface focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary"
                    />
                  </div>

                  {/* Location */}
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[11px] font-bold text-outline uppercase tracking-wider">Session Location</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Govt Primary School Room 3"
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                      className="w-full bg-[#131b2e]/60 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-on-surface focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    {/* Group Size */}
                    <div className="flex flex-col gap-1.5">
                      <label className="text-[11px] font-bold text-outline uppercase tracking-wider">Group Size</label>
                      <input
                        type="number"
                        min="1"
                        required
                        value={groupSize}
                        onChange={(e) => setGroupSize(e.target.value)}
                        className="w-full bg-[#131b2e]/60 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-on-surface focus:outline-none focus:ring-1 focus:ring-primary"
                      />
                    </div>

                    {/* Group Type */}
                    <div className="flex flex-col gap-1.5">
                      <label className="text-[11px] font-bold text-outline uppercase tracking-wider">Group Type</label>
                      <select
                        value={groupType}
                        onChange={(e) => setGroupType(e.target.value)}
                        className="w-full bg-[#131b2e] border border-white/10 rounded-xl px-4 py-2.5 text-xs text-on-surface focus:ring-0"
                      >
                        <option value="Students" className="bg-surface">Students</option>
                        <option value="Villagers" className="bg-surface">Villagers</option>
                        <option value="Teachers" className="bg-surface">Teachers</option>
                        <option value="Volunteers" className="bg-surface">Volunteers</option>
                      </select>
                    </div>
                  </div>

                  <Button type="submit" variant="primary" className="mt-4">
                    Begin Live Session
                  </Button>
                </form>
              </GlassPanel>
            </motion.div>
          )}

          {/* STEP 1: Disease Education Library Slide */}
          {sessionActive && activeStep === 0 && (
            <motion.div
              key="step-1"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              className="w-full max-w-4xl text-left"
            >
              <div className="mb-6">
                <span className="text-xs text-primary font-bold uppercase tracking-wider font-mono-data">Slide 1 of 6</span>
                <h3 className="font-headline-lg text-2xl text-secondary font-bold mt-1">Disease Education & Prevention</h3>
                <p className="text-body-sm text-on-surface-variant text-[13px]">Explain these critical preventative steps clearly to the session attendees.</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <GlassPanel className="p-5 flex flex-col gap-3">
                  <MaterialIcon icon="pest_control" className="text-primary text-3xl" />
                  <h4 className="font-title-md font-bold text-secondary text-[16px]">Dengue & Mosquito Prevention</h4>
                  <ul className="space-y-1.5 pl-4 list-disc text-body-sm text-on-surface-variant text-[13px] leading-relaxed">
                    <li>Drain standing pools of water from tires, pots, and coolers weekly.</li>
                    <li>Always sleep under insecticide mosquito nets.</li>
                    <li>Recognize early signs: high fever, joint pain, and pain behind eyes.</li>
                  </ul>
                </GlassPanel>

                <GlassPanel className="p-5 flex flex-col gap-3">
                  <MaterialIcon icon="water_drop" className="text-[#36ffc4] text-3xl" />
                  <h4 className="font-title-md font-bold text-secondary text-[16px]">Water Safety & Sanitation</h4>
                  <ul className="space-y-1.5 pl-4 list-disc text-body-sm text-on-surface-variant text-[13px] leading-relaxed">
                    <li>Boil drinking water for at least 1 minute (rolling boil).</li>
                    <li>Always wash hands with soap for 20 seconds before preparing food.</li>
                    <li>Use Oral Rehydration Salts (ORS) to prevent dangerous dehydration.</li>
                  </ul>
                </GlassPanel>
              </div>

              <Button onClick={nextSessionStep} variant="primary" className="ml-auto block">
                Next Slide
              </Button>
            </motion.div>
          )}

          {/* STEP 2: Triage Demo Slide */}
          {sessionActive && activeStep === 1 && (
            <motion.div
              key="step-2"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              className="w-full max-w-3xl text-left"
            >
              <div className="mb-6">
                <span className="text-xs text-primary font-bold uppercase tracking-wider font-mono-data">Slide 2 of 6</span>
                <h3 className="font-headline-lg text-2xl text-secondary font-bold mt-1">Emergency First Aid Demonstration</h3>
                <p className="text-body-sm text-on-surface-variant text-[13px]">Demonstrate emergency guidelines and first aid steps to the audience.</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                <GlassPanel className="p-4 border-l-4 border-l-red-500/40">
                  <h4 className="font-title-md font-bold text-secondary text-[15px] flex items-center gap-2">
                    <MaterialIcon icon="medical_services" className="text-red-400 text-lg" />
                    Snake Bites Care
                  </h4>
                  <p className="text-[12px] text-on-surface-variant mt-2 leading-relaxed">
                    Keep patient still. Wash bite. Transport immediately. <strong>Do NOT cut wound, suck out poison, or apply tight bands.</strong>
                  </p>
                </GlassPanel>

                <GlassPanel className="p-4 border-l-4 border-l-primary/40">
                  <h4 className="font-title-md font-bold text-secondary text-[15px] flex items-center gap-2">
                    <MaterialIcon icon="local_fire_department" className="text-primary text-lg" />
                    Thermal Burn Care
                  </h4>
                  <p className="text-[12px] text-on-surface-variant mt-2 leading-relaxed">
                    Cool under running water for 10-20 minutes. Cover loosely. <strong>Do NOT apply toothpaste, oils, or break blisters.</strong>
                  </p>
                </GlassPanel>
              </div>

              <Button onClick={nextSessionStep} variant="primary" className="ml-auto block">
                Next Slide
              </Button>
            </motion.div>
          )}

          {/* STEP 3: AI Chatbot Demo Slide */}
          {sessionActive && activeStep === 2 && (
            <motion.div
              key="step-3"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              className="w-full max-w-xl text-left"
            >
              <div className="mb-4">
                <span className="text-xs text-primary font-bold uppercase tracking-wider font-mono-data">Slide 3 of 6</span>
                <h3 className="font-headline-lg text-2xl text-secondary font-bold mt-1">AI Assistant Demonstration</h3>
                <p className="text-body-sm text-on-surface-variant text-[13px]">Ask a question below to show the audience how they can query the health companion.</p>
              </div>

              {/* Chat pane inline */}
              <GlassPanel className="p-4 flex flex-col h-[320px] mb-6">
                <div className="flex-1 overflow-y-auto space-y-3 mb-3 pr-1 text-xs">
                  {chatMessages.map((msg, idx) => (
                    <div key={idx} className={`flex ${msg.sender === 'bot' ? 'justify-start' : 'justify-end'}`}>
                      <div className={`p-2.5 rounded-xl max-w-[85%] leading-relaxed ${
                        msg.sender === 'bot' ? 'bg-white/5 border border-white/5' : 'bg-primary text-on-primary'
                      }`}>
                        {msg.text}
                      </div>
                    </div>
                  ))}
                  {isTyping && (
                    <div className="text-outline italic">AI is drafting a reply...</div>
                  )}
                </div>
                
                {/* Input box */}
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Ask about water safety, dengue prevention..."
                    value={chatInput}
                    onChange={(e) => setChatInput(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleAISend()}
                    className="flex-grow bg-[#131b2e] border border-white/10 rounded-xl px-4 py-2 text-xs text-on-surface"
                  />
                  <Button onClick={handleAISend} variant="primary" className="py-2 px-4 text-xs">
                    Send
                  </Button>
                </div>
              </GlassPanel>

              <Button onClick={nextSessionStep} variant="primary" className="ml-auto block">
                Next Slide
              </Button>
            </motion.div>
          )}

          {/* STEP 4: Interactive Quiz Assessment Slide */}
          {sessionActive && activeStep === 3 && (
            <motion.div
              key="step-4"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              className="w-full max-w-2xl text-left"
            >
              <div className="mb-6">
                <span className="text-xs text-primary font-bold uppercase tracking-wider font-mono-data">Slide 4 of 6</span>
                <h3 className="font-headline-lg text-2xl text-secondary font-bold mt-1">Interactive Class Quiz</h3>
                <p className="text-body-sm text-on-surface-variant text-[13px]">Read the questions to the group, collect their votes, and submit choices.</p>
              </div>

              {!quizStarted ? (
                <GlassPanel className="p-6 text-center">
                  <span className="material-symbols-outlined text-primary text-4xl p-3 bg-white/5 rounded-full mb-4" aria-hidden="true">
                    quiz
                  </span>
                  <h4 className="font-title-md text-lg text-secondary font-bold">
                    Class Trivia Assessment
                  </h4>
                  <p className="text-body-sm text-on-surface-variant text-[13px] max-w-sm mx-auto mt-2 leading-relaxed">
                    We will run a short 3-question quiz on Water safety and Hygiene. Gather answers from the group.
                  </p>
                  <Button onClick={() => setQuizStarted(true)} variant="primary" className="mt-6">
                    Start Assessment
                  </Button>
                </GlassPanel>
              ) : !quizFinished ? (
                // Active assessment slide
                <GlassPanel className="p-6">
                  <div className="flex justify-between items-center text-xs text-outline mb-4 font-mono-data">
                    <span>Question {qIndex + 1} of {sessionQuiz.questions.length}</span>
                    <span>Score: {qScore}</span>
                  </div>

                  <h3 className="font-title-md text-[17px] font-bold text-secondary mb-5 leading-relaxed">
                    {sessionQuiz.questions[qIndex].question}
                  </h3>

                  <div className="flex flex-col gap-3">
                    {sessionQuiz.questions[qIndex].options.map((opt, idx) => {
                      const answered = qAnswers.length > qIndex;
                      const isCorrect = idx === sessionQuiz.questions[qIndex].answerIndex;
                      const selected = answered && qAnswers[qIndex].selected === idx;

                      let style = "border-white/10 bg-white/[0.02] text-on-surface-variant hover:border-primary/50 cursor-pointer";
                      if (answered) {
                        if (isCorrect) style = "border-[#36ffc4]/50 bg-[#36ffc4]/5 text-[#36ffc4] font-semibold";
                        else if (selected) style = "border-red-500/50 bg-red-500/5 text-red-300";
                        else style = "border-white/5 bg-transparent text-outline opacity-60 pointer-events-none";
                      }

                      return (
                        <button
                          key={idx}
                          onClick={() => handleQuizOption(idx)}
                          disabled={answered}
                          className={`w-full p-4 rounded-xl border text-left text-xs transition-all duration-300 ${style}`}
                        >
                          {opt}
                        </button>
                      );
                    })}
                  </div>

                  {/* Next button */}
                  {qAnswers.length > qIndex && (
                    <div className="mt-6 pt-6 border-t border-white/5 flex flex-col gap-4">
                      <p className="text-xs text-on-surface-variant leading-relaxed">
                        <strong>Explanation:</strong> {sessionQuiz.questions[qIndex].explanation}
                      </p>
                      <Button onClick={handleNextQuiz} variant="primary" className="ml-auto py-2">
                        {qIndex + 1 === sessionQuiz.questions.length ? "Finish Quiz" : "Next Question"}
                      </Button>
                    </div>
                  )}
                </GlassPanel>
              ) : (
                // Quiz completed successfully
                <GlassPanel className="p-6 text-center">
                  <MaterialIcon icon="check_circle" className="text-4xl text-[#36ffc4] mb-3" />
                  <h4 className="font-title-md text-lg text-secondary font-bold">Assessments Concluded!</h4>
                  <p className="text-body-sm text-on-surface-variant text-[13px] mt-1 leading-normal">
                    The group scored <strong>{qScore}</strong> out of <strong>{sessionQuiz.questions.length}</strong> correct.
                  </p>
                  
                  <div className="flex gap-4 max-w-sm mx-auto mt-6">
                    <Button onClick={handleRetakeQuiz} variant="secondary" className="w-full text-xs">
                      Retake
                    </Button>
                    <Button onClick={nextSessionStep} variant="primary" className="w-full text-xs">
                      Continue Session
                    </Button>
                  </div>
                </GlassPanel>
              )}
            </motion.div>
          )}

          {/* STEP 5: Feedback Slide */}
          {sessionActive && activeStep === 4 && (
            <motion.div
              key="step-5"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              className="w-full max-w-md text-left"
            >
              <div className="mb-6">
                <span className="text-xs text-primary font-bold uppercase tracking-wider font-mono-data">Slide 5 of 6</span>
                <h3 className="font-headline-lg text-2xl text-secondary font-bold mt-1">Session Feedback</h3>
                <p className="text-body-sm text-on-surface-variant text-[13px]">Have a teacher, volunteer, or student rate this awareness session.</p>
              </div>

              <GlassPanel className="p-6">
                <form onSubmit={handleFeedbackSubmit} className="flex flex-col gap-4">
                  {feedbackSubmitted && (
                    <div className="p-3 bg-[#36ffc4]/10 border border-[#36ffc4]/20 rounded-xl text-xs text-[#36ffc4] flex gap-2">
                      <CheckCircle size={16} />
                      Feedback registered! Transitioning...
                    </div>
                  )}

                  {/* Name */}
                  <div className="flex flex-col gap-1">
                    <label className="text-[10px] font-bold text-outline uppercase tracking-wider">Reviewer Name</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Mrs. Asha Devi (Science Teacher)"
                      value={reviewerName}
                      onChange={(e) => setReviewerName(e.target.value)}
                      className="w-full bg-[#131b2e]/60 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-on-surface"
                    />
                  </div>

                  {/* Star Rating selector */}
                  <div className="flex flex-col gap-1">
                    <label className="text-[10px] font-bold text-outline uppercase tracking-wider">Session Rating</label>
                    <select
                      value={sessionRating}
                      onChange={(e) => setSessionRating(Number(e.target.value))}
                      className="w-full bg-[#131b2e] border border-white/10 rounded-xl px-4 py-2.5 text-xs text-on-surface"
                    >
                      <option value="5">5 Stars (Excellent)</option>
                      <option value="4">4 Stars (Very Good)</option>
                      <option value="3">3 Stars (Good)</option>
                    </select>
                  </div>

                  {/* Feedback Message */}
                  <div className="flex flex-col gap-1">
                    <label className="text-[10px] font-bold text-outline uppercase tracking-wider">Review Comment</label>
                    <textarea
                      required
                      rows={3}
                      placeholder="e.g. Excellent slides. The students really enjoyed the symptom checker demonstration."
                      value={reviewMessage}
                      onChange={(e) => setReviewMessage(e.target.value)}
                      className="w-full bg-[#131b2e]/60 border border-white/10 rounded-xl p-3 text-xs text-on-surface resize-none"
                    />
                  </div>

                  <Button type="submit" variant="primary" disabled={feedbackSubmitted} className="mt-2">
                    Submit Session Feedback
                  </Button>
                </form>
              </GlassPanel>
            </motion.div>
          )}

          {/* STEP 6: Certificate Ceremony Slide */}
          {sessionActive && activeStep === 5 && (
            <motion.div
              key="step-6"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0 }}
              className="w-full max-w-2xl text-left"
            >
              <div className="mb-6 text-center">
                <span className="text-xs text-primary font-bold uppercase tracking-wider font-mono-data">Slide 6 of 6</span>
                <h3 className="font-headline-lg text-2xl text-secondary font-bold mt-1">Conclude Session & Generate Certificate</h3>
                <p className="text-body-sm text-on-surface-variant text-[13px]">Enter the name of the school or group to generate the completion certificate.</p>
              </div>

              {!certGenerated ? (
                <GlassPanel className="p-6 max-w-md mx-auto">
                  <form 
                    onSubmit={(e) => {
                      e.preventDefault();
                      if (certName.trim()) setCertGenerated(true);
                    }}
                    className="flex flex-col gap-4"
                  >
                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs font-bold text-outline uppercase tracking-wider">
                        Recipient Entity (School/Group Name)
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Sonapur High School - 9th Grade"
                        value={certName}
                        onChange={(e) => setCertName(e.target.value)}
                        className="w-full bg-[#131b2e]/60 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-on-surface"
                      />
                    </div>
                    <Button type="submit" variant="primary">
                      Create Session Certificate
                    </Button>
                  </form>
                </GlassPanel>
              ) : (
                <div className="space-y-8">
                  <CertificateCard
                    userName={certName}
                    quizTitle={`Session: ${sessionData.name}`}
                    score={Math.round((qScore / sessionQuiz.questions.length) * 100) || 100}
                  />
                  
                  <Button
                    onClick={nextSessionStep} // Calls finish session, increments conducted counts
                    variant="primary"
                    className="w-full max-w-md mx-auto block"
                  >
                    Conclude & Conclude Camp
                  </Button>
                </div>
              )}
            </motion.div>
          )}

        </AnimatePresence>
      </div>

      {/* FOOTER INDICATOR */}
      {!sessionActive && (
        <div className="max-w-[1200px] mx-auto w-full px-6 md:px-10 text-center text-xs text-outline mt-8 border-t border-white/5 pt-4">
          Social Internship Awareness Platform. Ready for camp deployment.
        </div>
      )}
    </motion.div>
  );
}

export default SessionMode;
