import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import { 
  Award, 
  BookOpen, 
  Flame, 
  ShieldAlert, 
  Activity,
  Play,
  RotateCcw,
  Sparkles,
  ClipboardCheck
} from 'lucide-react';

import useQuizState, { ACHIEVEMENTS_LIST } from '../hooks/useQuizState';
import { quizCategories } from '../utils/quizData';

// Custom Components
import LearningJourney from '../components/quiz/LearningJourney';
import AchievementCard from '../components/quiz/AchievementCard';
import CertificateCard from '../components/quiz/CertificateCard';
import QuestionCard from '../components/quiz/QuestionCard';
import QuizReview from '../components/quiz/QuizReview';
import RecommendationPanel from '../components/quiz/RecommendationPanel';

// Icon Map helper for Category Icons
import { Stethoscope, ShieldCheck, Droplet, Trash2, CheckSquare } from 'lucide-react';
const ICON_MAP = {
  Stethoscope: Stethoscope,
  ShieldAlert: ShieldAlert,
  Apple: BookOpen,
  ShieldCheck: ShieldCheck,
  Droplet: Droplet,
  Trash2: Trash2,
  Activity: Activity,
  Sparkles: Sparkles,
  CheckSquare: CheckSquare
};

export function Quiz() {
  const {
    quizState,
    setQuizState,
    selectedCategoryId,
    setSelectedCategoryId,
    selectedDifficulty,
    setSelectedDifficulty,
    activeQuestions,
    currentQuestionIndex,
    selectedOption,
    isAnswerChecked,
    userAnswers,
    skippedCount,
    score,
    timeSpent,
    quizHistory,
    unlockedAchievements,
    participantName,
    startQuiz,
    selectOption,
    checkAnswer,
    skipQuestion,
    nextQuestion,
    resetQuiz,
    saveName
  } = useQuizState();

  // Find active language (synced with Health Library)
  const language = localStorage.getItem('ai_healthmate_language') || 'en';

  // Translation maps
  const t = useMemo(() => {
    return {
      en: {
        title: "Healthcare Assessment & Certifications",
        subtitle: "Reinforce your healthcare awareness, unlock milestones, and claim certificates.",
        start: "Start Assessment",
        instructions: "Quiz Instructions",
        ins1: "Answer all questions to test your knowledge.",
        ins2: "Skip any question if you are unsure; you can review at the end.",
        ins3: "Score 70% or higher to earn your certified Health Champion Award.",
        selectCat: "Select Quiz Category",
        selectDiff: "Select Difficulty Level",
        stats: "Unlocked Achievements",
        history: "Assessment History",
        noHistory: "No attempts logged yet. Complete a quiz to start building your record.",
        resultsTitle: "Assessment Results",
        scoreCard: "Score Summary",
        correct: "Correct Answers",
        incorrect: "Incorrect Answers",
        skipped: "Skipped Questions",
        percentage: "Final Percentage",
        timeSpent: "Time Spent",
        reviewBtn: "Review Answers",
        certificateTitle: "Health Champion Certificate",
        retake: "Retake Quiz",
        completed: "Completed",
        toImprove: "Needs Review",
        langSelect: "Language / भाषा",
        learningJourney: "Journey Status"
      },
      hi: {
        title: "स्वास्थ्य मूल्यांकन और प्रमाणन",
        subtitle: "अपनी स्वास्थ्य जागरूकता को सुदृढ़ करें, उपलब्धियों को अनलॉक करें और प्रमाणपत्र प्राप्त करें।",
        start: "मूल्यांकन शुरू करें",
        instructions: "प्रश्नोत्तरी निर्देश",
        ins1: "अपने ज्ञान का परीक्षण करने के लिए सभी प्रश्नों के उत्तर दें।",
        ins2: "यदि आप अनिश्चित हैं तो किसी भी प्रश्न को छोड़ सकते हैं; अंत में समीक्षा कर सकते हैं।",
        ins3: "हेल्थ चैंपियन पुरस्कार अर्जित करने के लिए 70% या उससे अधिक स्कोर करें।",
        selectCat: "प्रश्नोत्तरी श्रेणी चुनें",
        selectDiff: "कठिनाई स्तर चुनें",
        stats: "अनलॉक की गई उपलब्धियां",
        history: "मूल्यांकन इतिहास",
        noHistory: "अभी तक कोई प्रयास लॉग नहीं किया गया है। अपना रिकॉर्ड बनाना शुरू करने के लिए एक प्रश्नोत्तरी पूरी करें।",
        resultsTitle: "मूल्यांकन परिणाम",
        scoreCard: "स्कोर सारांश",
        correct: "सही उत्तर",
        incorrect: "गलत उत्तर",
        skipped: "छोड़े गए प्रश्न",
        percentage: "अंतिम प्रतिशत",
        timeSpent: "लगा समय",
        reviewBtn: "उत्तरों की समीक्षा करें",
        certificateTitle: "हेल्थ चैंपियन प्रमाणपत्र",
        retake: "प्रश्नोत्तरी पुन: लें",
        completed: "पूरा किया",
        toImprove: "सुधार की आवश्यकता",
        langSelect: "भाषा / Language",
        learningJourney: "सफर की स्थिति"
      }
    }[language];
  }, [language]);

  // Compute category completion percentage based on highest score in history
  const categoryStats = useMemo(() => {
    return quizCategories.map(cat => {
      const attempts = quizHistory.filter(h => h.category === cat.id);
      const maxScore = attempts.length > 0 ? Math.max(...attempts.map(a => a.percentage)) : 0;
      return {
        ...cat,
        maxScore,
        completed: maxScore >= 70
      };
    });
  }, [quizHistory]);

  // Compute incorrect answers related topics for study advice recommendation panel
  const missedTopicsList = useMemo(() => {
    const list = [];
    activeQuestions.forEach((q, idx) => {
      if (userAnswers[idx] !== q.correct && q.relatedTopic) {
        if (!list.includes(q.relatedTopic)) {
          list.push(q.relatedTopic);
        }
      }
    });
    return list;
  }, [activeQuestions, userAnswers]);

  // Format active time spent
  const formattedTimeSpent = useMemo(() => {
    const minutes = Math.floor(timeSpent / 60);
    const seconds = timeSpent % 60;
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds} min`;
  }, [timeSpent]);

  return (
    <div className="min-h-screen bg-background py-8 px-4 md:px-8">
      <div className="max-w-6xl mx-auto space-y-8">

        {/* ================================================= */}
        {/* STATE A: SETUP DASHBOARD VIEW */}
        {/* ================================================= */}
        {quizState === "setup" && (
          <div className="space-y-8 animate-fade-in">
            
            {/* Title Hero Banner */}
            <div className="pb-6 border-b border-outline-variant/20 space-y-2">
              <h1 className="text-display-lg font-bold text-transparent bg-clip-text bg-gradient-to-r from-white via-cyan-100 to-cyan-300 text-3xl md:text-4xl tracking-tight flex items-center gap-3">
                <Award className="w-8 h-8 text-cyan-400 shrink-0" />
                {t.title}
              </h1>
              <p className="text-on-surface-variant text-sm md:text-base max-w-xl">
                {t.subtitle}
              </p>
            </div>

            {/* Learning Journey Tracker */}
            <LearningJourney quizHistory={quizHistory} language={language} />

            {/* Main setup columns */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              
              {/* Category & Difficulty Selection */}
              <div className="lg:col-span-2 space-y-6">
                
                {/* Categories selection progress list */}
                <div className="p-5 rounded-2xl bg-surface-container-low/40 border border-outline-variant/20 space-y-4">
                  <h3 className="font-bold text-sm text-on-surface flex items-center gap-2">
                    <ClipboardCheck className="w-4 h-4 text-cyan-400" />
                    {t.selectCat}
                  </h3>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {categoryStats.map((cat) => {
                      const CatIcon = ICON_MAP[cat.icon] || BookOpen;
                      const isSelected = selectedCategoryId === cat.id;
                      const displayTitle = cat ? (language === 'en' ? (cat.en || "Category") : (cat.hi || cat.en || "श्रेणी")) : "Category";
                      return (
                        <button
                          key={cat.id}
                          onClick={() => setSelectedCategoryId(cat.id)}
                          className={`p-3.5 rounded-xl border text-left transition-all duration-300 flex items-center justify-between cursor-pointer ${
                            isSelected 
                              ? 'bg-cyan-500/10 border-cyan-500/35 text-cyan-200' 
                              : 'bg-surface-container/60 border-outline-variant/15 hover:border-cyan-500/20 text-on-surface-variant hover:text-white'
                          }`}
                        >
                          <div className="flex gap-2.5 items-center min-w-0">
                            <CatIcon className={`w-4 h-4 shrink-0 ${isSelected ? 'text-cyan-400' : 'text-outline-variant'}`} />
                            <div className="min-w-0">
                              <span className="font-semibold text-xs sm:text-sm truncate block">{displayTitle}</span>
                              
                              {/* completion progress bar */}
                              <div className="w-24 h-1 bg-surface-container-high rounded-full mt-1 overflow-hidden">
                                <div 
                                  className="h-full bg-cyan-400 transition-all duration-300"
                                  style={{ width: `${cat.maxScore}%` }}
                                />
                              </div>
                            </div>
                          </div>

                          {cat.completed && (
                            <span className="text-[9px] uppercase font-mono tracking-widest text-emerald-400 bg-emerald-500/10 px-1.5 py-0.5 rounded shrink-0">
                              Passed
                            </span>
                          )}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Difficulty Selector */}
                <div className="p-5 rounded-2xl bg-surface-container-low/40 border border-outline-variant/20 space-y-4">
                  <h3 className="font-bold text-sm text-on-surface flex items-center gap-2">
                    <Flame className="w-4 h-4 text-cyan-400" />
                    {t.selectDiff}
                  </h3>

                  <div className="flex gap-2">
                    {["easy", "medium", "hard"].map((diff) => {
                      const isSelected = selectedDifficulty === diff;
                      return (
                        <button
                          key={diff}
                          onClick={() => setSelectedDifficulty(diff)}
                          className={`px-4 py-2 rounded-xl text-xs font-semibold border uppercase tracking-wider transition-all cursor-pointer ${
                            isSelected 
                              ? 'bg-cyan-500 text-on-primary border-cyan-500 shadow-md shadow-cyan-500/10' 
                              : 'bg-surface-container border-outline-variant/20 hover:border-cyan-500/30 text-on-surface-variant'
                          }`}
                        >
                          {diff}
                        </button>
                      );
                    })}
                  </div>
                </div>

              </div>

              {/* Instructions and Quick Actions */}
              <div className="space-y-6">
                <div className="p-5 rounded-2xl bg-cyan-950/15 border border-cyan-500/20 space-y-5 flex flex-col justify-between h-full">
                  <div className="space-y-3">
                    <h3 className="font-bold text-sm text-cyan-400 uppercase tracking-widest font-mono">
                      {t.instructions}
                    </h3>
                    <ul className="space-y-2 text-xs text-on-surface-variant leading-relaxed">
                      <li className="flex gap-2 items-start">
                        <span className="text-cyan-400 font-bold">•</span>
                        <span>{t.ins1}</span>
                      </li>
                      <li className="flex gap-2 items-start">
                        <span className="text-cyan-400 font-bold">•</span>
                        <span>{t.ins2}</span>
                      </li>
                      <li className="flex gap-2 items-start">
                        <span className="text-cyan-400 font-bold">•</span>
                        <span>{t.ins3}</span>
                      </li>
                    </ul>
                  </div>

                  <button
                    onClick={startQuiz}
                    className="w-full py-3 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-on-primary font-bold text-sm transition-all duration-300 flex items-center justify-center gap-2 shadow-lg shadow-cyan-500/10 mt-6 cursor-pointer"
                  >
                    <Play className="w-4 h-4 fill-on-primary" />
                    {t.start}
                  </button>
                </div>
              </div>

            </div>

            {/* Onboarding achievements achievements */}
            <div className="space-y-4">
              <h2 className="text-lg font-bold text-on-surface">
                {t.stats} ({unlockedAchievements.length} / {ACHIEVEMENTS_LIST.length})
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {ACHIEVEMENTS_LIST.map((ach) => {
                  const isUnlocked = unlockedAchievements.includes(ach.id);
                  return (
                    <AchievementCard
                      key={ach.id}
                      achievement={ach}
                      isUnlocked={isUnlocked}
                      language={language}
                    />
                  );
                })}
              </div>
            </div>

            {/* Assessment History list */}
            <div className="p-5 rounded-2xl bg-surface-container-low/40 border border-outline-variant/20 space-y-4 text-left">
              <h3 className="font-bold text-sm text-on-surface">
                {t.history}
              </h3>

              {quizHistory.length === 0 ? (
                <p className="text-xs text-outline py-4">{t.noHistory}</p>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-xs text-on-surface-variant leading-normal">
                    <thead>
                      <tr className="border-b border-outline-variant/25 text-left text-[10px] uppercase font-mono tracking-widest text-outline">
                        <th className="py-2.5 px-3">Date</th>
                        <th className="py-2.5 px-3">Category</th>
                        <th className="py-2.5 px-3">Difficulty</th>
                        <th className="py-2.5 px-3">Score</th>
                        <th className="py-2.5 px-3">Certificate</th>
                      </tr>
                    </thead>
                    <tbody>
                      {quizHistory.slice(0, 5).map((attempt, idx) => {
                        const dateFormatted = new Date(attempt.date).toLocaleDateString();
                        const matchingCat = quizCategories.find(c => c.id === attempt.category);
                        const catLabel = matchingCat ? (language === 'en' ? (matchingCat.en || "Category") : (matchingCat.hi || matchingCat.en || "श्रेणी")) : attempt.category;
                        
                        return (
                          <tr key={idx} className="border-b border-outline-variant/10 hover:bg-white/5 transition-colors">
                            <td className="py-2.5 px-3 font-mono">{dateFormatted}</td>
                            <td className="py-2.5 px-3 font-semibold text-on-surface">{catLabel}</td>
                            <td className="py-2.5 px-3 uppercase font-mono">{attempt.difficulty}</td>
                            <td className="py-2.5 px-3 font-bold text-cyan-300">{attempt.percentage}%</td>
                            <td className="py-2.5 px-3">
                              {attempt.certificateId ? (
                                <button
                                  onClick={() => {
                                    // Trigger displaying this certificate in the result frame
                                    setSelectedCategoryId(attempt.category);
                                    setSelectedDifficulty(attempt.difficulty);
                                    setScore(attempt.correct);
                                    // Set state directly to display completed certificate
                                    setQuizState("results");
                                  }}
                                  className="text-cyan-400 hover:text-cyan-300 font-semibold cursor-pointer underline flex items-center gap-1"
                                >
                                  <Award className="w-3.5 h-3.5" />
                                  <span>View Award</span>
                                </button>
                              ) : (
                                <span className="text-outline-variant">-</span>
                              )}
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              )}
            </div>

          </div>
        )}

        {/* ================================================= */}
        {/* STATE B: ACTIVE QUIZ VIEW */}
        {/* ================================================= */}
        {quizState === "active" && activeQuestions.length > 0 && (
          <div className="space-y-6 max-w-2xl mx-auto py-6 animate-fade-in">
            
            {/* Progress metrics and Timer */}
            <div className="flex items-center justify-between text-xs font-mono text-outline pb-2">
              <div className="flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-cyan-400 shrink-0" />
                <span>{formattedTimeSpent}</span>
              </div>
              <div>
                <span>Question {currentQuestionIndex + 1} of {activeQuestions.length}</span>
              </div>
            </div>

            {/* Progress bar */}
            <div className="w-full h-1 bg-surface-container rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-cyan-500 to-emerald-400 transition-all duration-300"
                style={{ width: `${((currentQuestionIndex + 1) / activeQuestions.length) * 100}%` }}
              />
            </div>

            {/* Question card */}
            <QuestionCard
              question={activeQuestions[currentQuestionIndex]}
              selectedOption={selectedOption}
              isAnswerChecked={isAnswerChecked}
              onSelectOption={selectOption}
              onCheckAnswer={checkAnswer}
              onSkip={skipQuestion}
              onNext={nextQuestion}
              isLast={currentQuestionIndex === activeQuestions.length - 1}
              language={language}
            />

          </div>
        )}

        {/* ================================================= */}
        {/* STATE C: RESULTS SUMMARY & REVIEW VIEW */}
        {/* ================================================= */}
        {quizState === "results" && (
          <div className="space-y-8 animate-fade-in">
            
            <div className="pb-6 border-b border-outline-variant/20 text-center space-y-3">
              <div className="w-14 h-14 rounded-full bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center mx-auto text-cyan-400">
                <ClipboardCheck className="w-7 h-7" />
              </div>
              <h1 className="text-display-lg font-bold text-transparent bg-clip-text bg-gradient-to-r from-white via-cyan-100 to-cyan-300 text-3xl md:text-4xl tracking-tight">
                {t.resultsTitle}
              </h1>
            </div>

            {/* Scorecard grids */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
              
              {/* Metrics Summary */}
              <div className="p-5 rounded-2xl bg-surface-container-low/40 border border-outline-variant/20 space-y-4 text-left">
                <h3 className="font-bold text-sm text-on-surface flex items-center gap-2">
                  <Activity className="w-4 h-4 text-cyan-400" />
                  {t.scoreCard}
                </h3>

                <div className="space-y-3 text-xs md:text-sm text-on-surface-variant">
                  <div className="flex justify-between py-1.5 border-b border-outline-variant/10">
                    <span>{t.percentage}</span>
                    <strong className="text-cyan-300 font-bold text-base">
                      {Math.round((score / activeQuestions.length) * 100)}%
                    </strong>
                  </div>
                  <div className="flex justify-between py-1.5 border-b border-outline-variant/10">
                    <span>{t.correct}</span>
                    <strong className="text-emerald-400 font-bold">{score}</strong>
                  </div>
                  <div className="flex justify-between py-1.5 border-b border-outline-variant/10">
                    <span>{t.skipped}</span>
                    <strong className="text-outline font-bold">{skippedCount}</strong>
                  </div>
                  <div className="flex justify-between py-1.5">
                    <span>{t.timeSpent}</span>
                    <strong className="text-cyan-400 font-mono font-semibold">{formattedTimeSpent}</strong>
                  </div>
                </div>

                <div className="flex gap-2 pt-4 border-t border-outline-variant/10">
                  <button
                    onClick={resetQuiz}
                    className="w-full py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-on-primary font-bold text-xs transition-colors flex items-center justify-center gap-1.5 cursor-pointer shadow-lg shadow-cyan-500/10"
                  >
                    <RotateCcw className="w-4 h-4" />
                    <span>{t.retake}</span>
                  </button>
                  <button
                    onClick={() => setQuizState("setup")}
                    className="w-full py-2.5 rounded-xl bg-surface-container border border-outline-variant/30 hover:border-cyan-500/30 text-on-surface hover:text-white font-bold text-xs transition-all cursor-pointer"
                  >
                    Close Results
                  </button>
                </div>
              </div>

              {/* Study recommendations based on wrong answers */}
              {activeQuestions.length > 0 && (
                <RecommendationPanel
                  missedTopics={missedTopicsList}
                  language={language}
                />
              )}

            </div>

            {/* Certifications Generator Frame (Requires score >= 70%) */}
            {score / activeQuestions.length >= 0.70 ? (
              <div className="space-y-4 max-w-4xl mx-auto">
                <h2 className="text-lg font-bold text-on-surface flex justify-center items-center gap-2">
                  <Award className="w-5 h-5 text-cyan-400 animate-pulse" />
                  {t.certificateTitle}
                </h2>
                <CertificateCard
                  attempt={{
                    category: selectedCategoryId,
                    difficulty: selectedDifficulty,
                    date: new Date().toISOString(),
                    certificateId: `HM-${selectedCategoryId.substring(0,3).toUpperCase()}-${Date.now().toString().slice(-4)}`,
                    percentage: Math.round((score / activeQuestions.length) * 100)
                  }}
                  participantName={participantName}
                  onNameChange={saveName}
                  language={language}
                />
              </div>
            ) : null}

            {/* Question Review Panel */}
            {activeQuestions.length > 0 && (
              <QuizReview
                questions={activeQuestions}
                userAnswers={userAnswers}
                language={language}
              />
            )}

          </div>
        )}

      </div>
    </div>
  );
}

export default Quiz;
