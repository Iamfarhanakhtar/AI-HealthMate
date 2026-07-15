import React, { useState, useContext } from 'react';
import MaterialIcon from '../components/UI/MaterialIcon';

import { motion, AnimatePresence } from 'framer-motion';
import { Award, RotateCcw, BookOpen, AlertCircle, CheckCircle, XCircle } from 'lucide-react';
import { PlatformContext } from '../context/PlatformContext';
import { quizzes } from '../utils/quizData';
import GlassPanel from '../components/UI/GlassPanel';
import Button from '../components/UI/Button';
import ProgressBar from '../components/UI/ProgressBar';
import CertificateCard from '../components/CertificateCard';

function Quizzes() {
  const {
    activeQuiz,
    currentQuestionIndex,
    userAnswers,
    quizCompleted,
    quizScore,
    startQuiz,
    selectAnswer,
    nextQuestion,
    resetQuiz
  } = useContext(PlatformContext);

  const [userName, setUserName] = useState("");
  const [submittedName, setSubmittedName] = useState("");

  const handleOptionClick = (optionIdx) => {
    const currentQuestion = activeQuiz.questions[currentQuestionIndex];
    // Prevent double clicking
    const alreadyAnswered = userAnswers.length > currentQuestionIndex;
    if (alreadyAnswered) return;

    selectAnswer(currentQuestion.id, optionIdx);
  };

  const handleNameSubmit = (e) => {
    e.preventDefault();
    if (userName.trim()) {
      setSubmittedName(userName.trim());
    }
  };

  // Determine if the current question is answered
  const isCurrentQuestionAnswered = userAnswers.length > currentQuestionIndex;
  const currentQuestionAnswer = isCurrentQuestionAnswered ? userAnswers[currentQuestionIndex] : null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -15 }}
      transition={{ duration: 0.4 }}
      className="max-w-[1200px] mx-auto px-6 md:px-10 py-12 relative z-10 text-left"
    >
      {/* 1. Header (only if not actively in quiz) */}
      {!activeQuiz && (
        <div className="text-center mb-12">
          <span className="font-label-caps text-label-caps text-primary uppercase tracking-widest bg-primary/5 px-3 py-1 rounded-full border border-primary/20">
            Interactive Learning
          </span>
          <h1 className="font-display-lg text-[36px] md:text-[48px] mt-3 text-secondary font-bold">
            Healthcare Quizzes & Certifications
          </h1>
          <p className="text-body-sm text-on-surface-variant mt-2 max-w-xl mx-auto leading-relaxed">
            Test your knowledge on hygiene, mosquito prevention, water safety, and first aid. Score 70% or more to earn your printable Health Champion Certificate!
          </p>
        </div>
      )}

      {/* 2. Main content view transitions */}
      <AnimatePresence mode="wait">
        {/* VIEW A: Quiz Selection Dashboard */}
        {!activeQuiz && (
          <motion.div
            key="dashboard"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
          >
            {quizzes.map((quiz) => (
              <GlassPanel
                key={quiz.id}
                hoverLift
                className="p-6 flex flex-col justify-between items-start gap-4 min-h-[220px]"
              >
                <div className="flex flex-col gap-2">
                  <div className="flex justify-between items-center w-full">
                    <span className="text-[10px] font-bold text-primary uppercase tracking-wider bg-primary/10 px-2 py-0.5 rounded-full border border-primary/20">
                      {quiz.category}
                    </span>
                    <span className="text-xs text-outline font-mono-data">
                      {quiz.questions.length} Questions
                    </span>
                  </div>
                  <h3 className="font-title-md text-xl text-secondary font-bold mt-1">
                    {quiz.title}
                  </h3>
                  <p className="text-body-sm text-on-surface-variant text-[13px] leading-relaxed">
                    {quiz.description}
                  </p>
                </div>

                <Button
                  onClick={() => startQuiz(quiz.id)}
                  variant="primary"
                  className="w-full sm:w-auto"
                  iconRight={<MaterialIcon icon="play_arrow" className="text-sm font-bold" />}
                >
                  Start Assessment
                </Button>
              </GlassPanel>
            ))}
          </motion.div>
        )}

        {/* VIEW B: Active Question Screen */}
        {activeQuiz && !quizCompleted && (
          <motion.div
            key="active-quiz"
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            className="max-w-2xl mx-auto"
          >
            <GlassPanel className="p-6 md:p-8">
              {/* Back to dashboard */}
              <button
                onClick={resetQuiz}
                className="text-xs text-on-surface-variant hover:text-primary transition-colors flex items-center gap-1 mb-6 cursor-pointer"
              >
                <MaterialIcon icon="arrow_back" className="text-[16px]" />
                Cancel Quiz
              </button>

              {/* Progress Bar & Header */}
              <div className="flex flex-col gap-2 mb-6">
                <div className="flex justify-between text-xs text-outline font-mono-data">
                  <span>Question {currentQuestionIndex + 1} of {activeQuiz.questions.length}</span>
                  <span>Score: {quizScore}</span>
                </div>
                <ProgressBar
                  value={((currentQuestionIndex + (isCurrentQuestionAnswered ? 1 : 0)) / activeQuiz.questions.length) * 100}
                  glowColor="cyan"
                />
              </div>

              {/* Question Text */}
              <h2 className="font-headline-lg text-lg md:text-xl text-secondary font-bold mb-6 leading-relaxed">
                {activeQuiz.questions[currentQuestionIndex].question}
              </h2>

              {/* Options */}
              <div className="flex flex-col gap-3">
                {activeQuiz.questions[currentQuestionIndex].options.map((opt, idx) => {
                  const isCorrectAnswer = idx === activeQuiz.questions[currentQuestionIndex].answerIndex;
                  const isUserSelection = currentQuestionAnswer && currentQuestionAnswer.selectedOptionIndex === idx;

                  // Dynamic styles based on answer phase
                  let optionStyle = "border-white/10 bg-white/[0.02] text-on-surface-variant hover:border-primary/40 hover:bg-white/[0.04]";
                  
                  if (isCurrentQuestionAnswered) {
                    if (isCorrectAnswer) {
                      optionStyle = "border-[#36ffc4]/50 bg-[#36ffc4]/5 text-[#36ffc4] font-semibold";
                    } else if (isUserSelection) {
                      optionStyle = "border-red-500/50 bg-red-500/5 text-red-300";
                    } else {
                      optionStyle = "border-white/5 bg-transparent text-outline opacity-60 pointer-events-none";
                    }
                  }

                  return (
                    <button
                      key={idx}
                      onClick={() => handleOptionClick(idx)}
                      disabled={isCurrentQuestionAnswered}
                      className={`w-full p-4 rounded-xl border text-left text-body-sm text-[13px] transition-all duration-300 flex items-center justify-between cursor-pointer ${optionStyle}`}
                    >
                      <span>{opt}</span>
                      
                      {isCurrentQuestionAnswered && (
                        isCorrectAnswer ? (
                          <CheckCircle size={16} className="text-[#36ffc4] flex-shrink-0" />
                        ) : isUserSelection ? (
                          <XCircle size={16} className="text-red-400 flex-shrink-0" />
                        ) : null
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Explanation Box */}
              <AnimatePresence>
                {isCurrentQuestionAnswered && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    className="overflow-hidden mt-6 pt-6 border-t border-white/8 text-left"
                  >
                    <div className="p-4 bg-white/5 rounded-xl border border-white/10 flex gap-3 items-start">
                      <AlertCircle size={18} className="text-primary flex-shrink-0 mt-0.5" />
                      <div>
                        <h4 className="text-xs font-bold text-secondary uppercase tracking-wider">
                          Why this is correct:
                        </h4>
                        <p className="text-body-sm text-on-surface-variant text-[13px] mt-1 leading-relaxed">
                          {activeQuiz.questions[currentQuestionIndex].explanation}
                        </p>
                      </div>
                    </div>

                    <Button
                      onClick={nextQuestion}
                      variant="primary"
                      className="mt-6 w-full sm:w-auto ml-auto block"
                      iconRight={<MaterialIcon icon="&#xe5c8;" className="text-sm" />}
                    >
                      {currentQuestionIndex + 1 === activeQuiz.questions.length ? "Finish Quiz" : "Next Question"}
                    </Button>
                  </motion.div>
                )}
              </AnimatePresence>
            </GlassPanel>
          </motion.div>
        )}

        {/* VIEW C: Completion Screen (Score & Certificate Card) */}
        {activeQuiz && quizCompleted && (
          <motion.div
            key="completed"
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            className="max-w-2xl mx-auto"
          >
            <GlassPanel className="p-6 md:p-8 text-center">
              <span className="material-symbols-outlined text-5xl text-primary p-4 bg-white/5 rounded-full mb-4" aria-hidden="true">
                workspace_premium
              </span>
              <h2 className="font-headline-lg text-2xl text-secondary font-bold">
                Assessment Complete!
              </h2>

              {/* Score summary */}
              <div className="my-6">
                <p className="text-body-md text-on-surface-variant">
                  You scored <strong className="text-secondary-container">{quizScore}</strong> out of{" "}
                  <strong>{activeQuiz.questions.length}</strong> correct.
                </p>
                <div className="w-48 mx-auto mt-2">
                  <ProgressBar
                    value={(quizScore / activeQuiz.questions.length) * 100}
                    glowColor={quizScore >= 2 ? 'cyan' : 'violet'}
                  />
                </div>
              </div>

              {/* Conditional pass/fail rendering */}
              {quizScore >= 2 ? (
                // Passed: Name Input -> Certificate View
                <div className="space-y-8">
                  <div className="bg-[#36ffc4]/5 border border-[#36ffc4]/20 rounded-xl p-4 max-w-md mx-auto text-left flex gap-3">
                    <CheckCircle size={20} className="text-[#36ffc4] flex-shrink-0 mt-0.5" />
                    <p className="text-xs text-[#36ffc4]/90 leading-relaxed">
                      Congratulations! You passed the awareness test with over 70% accuracy. You can now generate your printable certificate.
                    </p>
                  </div>

                  {!submittedName ? (
                    <form onSubmit={handleNameSubmit} className="max-w-md mx-auto flex flex-col gap-4">
                      <div className="flex flex-col gap-2 text-left">
                        <label className="text-xs font-bold text-outline uppercase tracking-wider">
                          Enter your name for the certificate:
                        </label>
                        <input
                          type="text"
                          required
                          placeholder="e.g. Ramesh Patel"
                          value={userName}
                          onChange={(e) => setUserName(e.target.value)}
                          className="w-full bg-[#131b2e]/60 border border-white/10 rounded-xl px-4 py-3 text-body-md text-on-surface focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary"
                        />
                      </div>
                      <Button type="submit" variant="primary" className="w-full">
                        Generate Certificate
                      </Button>
                    </form>
                  ) : (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="space-y-6"
                    >
                      <CertificateCard
                        userName={submittedName}
                        quizTitle={activeQuiz.title}
                        score={Math.round((quizScore / activeQuiz.questions.length) * 100)}
                      />
                    </motion.div>
                  )}
                </div>
              ) : (
                // Failed: Retake Option
                <div className="space-y-6 max-w-md mx-auto">
                  <div className="bg-red-500/5 border border-red-500/20 rounded-xl p-4 text-left flex gap-3">
                    <XCircle size={20} className="text-red-400 flex-shrink-0 mt-0.5" />
                    <p className="text-xs text-red-300 leading-relaxed">
                      You scored below the 70% certification threshold. We encourage you to review the Health Library materials on this topic and try again!
                    </p>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-4">
                    <Button
                      onClick={() => startQuiz(activeQuiz.id)}
                      variant="primary"
                      className="w-full"
                      iconLeft={<RotateCcw size={16} />}
                    >
                      Retake Quiz
                    </Button>
                    <Button
                      onClick={resetQuiz}
                      variant="secondary"
                      className="w-full"
                      iconLeft={<BookOpen size={16} />}
                    >
                      Health Library
                    </Button>
                  </div>
                </div>
              )}

              {/* Divider back button */}
              {(!quizScore || quizScore < 2 || submittedName) && (
                <button
                  onClick={() => {
                    resetQuiz();
                    setSubmittedName("");
                    setUserName("");
                  }}
                  className="text-xs text-on-surface-variant hover:text-primary transition-colors flex items-center gap-1 mt-10 mx-auto cursor-pointer"
                >
                  <MaterialIcon icon="arrow_back" className="text-[16px]" />
                  Back to Quiz Dashboard
                </button>
              )}
            </GlassPanel>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default Quizzes;
