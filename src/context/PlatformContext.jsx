import React, { createContext, useState } from 'react';

export const PlatformContext = createContext();

export const PlatformProvider = ({ children }) => {
  // --- Platform Metrics State (Stub) ---
  const [impactMetrics, setImpactMetrics] = useState({
    peopleEducated: 412,
    quizAttempts: 84,
    questionsAsked: 125,
    feedbackReceived: 18,
    certificatesGenerated: 58,
    sessionsConducted: 8,
    averageRating: 4.8
  });

  // --- Quiz State (Stub) ---
  const [quizState, setQuizState] = useState({
    activeQuizId: null,
    currentQuestionIndex: 0,
    userAnswers: [],
    quizCompleted: false,
    score: 0
  });

  // --- Chatbot State (Stub) ---
  const [chatMessages, setChatMessages] = useState([
    { sender: 'bot', text: "Hello! This is the AI HealthMate assistant. How can I help you today?" }
  ]);
  const [isTyping, setIsTyping] = useState(false);

  // --- Health Library State (Stub) ---
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  // --- Triage State (Stub) ---
  const [selectedSymptoms, setSelectedSymptoms] = useState([]);
  const [triageReport, setTriageReport] = useState(null);

  // --- Session Mode State (Stub) ---
  const [sessionActive, setSessionActive] = useState(false);
  const [activeStep, setActiveStep] = useState(0);
  const [sessionData, setSessionData] = useState({
    name: "",
    location: "",
    groupSize: 20,
    groupType: "Students"
  });

  // --- Theme State (Stub) ---
  const [theme, setTheme] = useState("dark");

  // --- Settings State (Stub) ---
  const [appSettings, setAppSettings] = useState({
    language: "en",
    textScale: "medium"
  });

  // --- Action Stubs (No business logic) ---
  const viewArticle = (id) => {};
  const startQuiz = (quizId) => {};
  const selectAnswer = (questionId, optionIndex) => {};
  const nextQuestion = () => {};
  const resetQuiz = () => {};
  const toggleSymptom = (symptom) => {};
  const runTriage = () => {};
  const clearTriage = () => {};
  const addFeedback = (feedbackData) => {
    setImpactMetrics(prev => ({
      ...prev,
      feedbackReceived: prev.feedbackReceived + 1,
      averageRating: feedbackData.rating 
        ? Number(((prev.averageRating * prev.feedbackReceived + Number(feedbackData.rating)) / (prev.feedbackReceived + 1)).toFixed(1))
        : prev.averageRating
    }));
  };
  const incrementAIQuestions = () => {};
  const startSession = (data) => {};
  const nextSessionStep = () => {};
  const leaveSession = () => {};

  return (
    <PlatformContext.Provider value={{
      impactMetrics,
      quizState,
      chatMessages,
      isTyping,
      searchQuery,
      setSearchQuery,
      selectedCategory,
      setSelectedCategory,
      selectedSymptoms,
      triageReport,
      sessionActive,
      activeStep,
      sessionData,
      theme,
      setTheme,
      appSettings,
      setAppSettings,

      // Stubs
      viewArticle,
      startQuiz,
      selectAnswer,
      nextQuestion,
      resetQuiz,
      toggleSymptom,
      runTriage,
      clearTriage,
      addFeedback,
      incrementAIQuestions,
      startSession,
      nextSessionStep,
      leaveSession
    }}>
      {children}
    </PlatformContext.Provider>
  );
};
