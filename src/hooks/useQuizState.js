import { useState, useEffect, useCallback, useRef } from 'react';
import { quizQuestions } from '../utils/quizData';
import { auth } from '../lib/firebase';
import { saveQuizAttempt, getUserQuizHistory } from '../services/firestoreService';


const HISTORY_KEY = 'ai_healthmate_quiz_history_v1';
const ACHIEVEMENTS_KEY = 'ai_healthmate_quiz_achievements_v1';
const NAME_KEY = 'ai_healthmate_participant_name';

export const ACHIEVEMENTS_LIST = [
  { id: "first_quiz", title: "First Step", desc: "Completed your first health quiz.", icon: "CheckCircle" },
  { id: "perfect_score", title: "Perfect Score", desc: "Scored 100% on any healthcare quiz.", icon: "Award" },
  { id: "five_quizzes", title: "Dedicated Learner", desc: "Completed 5 health quizzes.", icon: "BookOpen" },
  { id: "first_aid_expert", title: "First Aid Expert", desc: "Scored 100% on the First Aid quiz.", icon: "Activity" },
  { id: "nutrition_explorer", title: "Nutrition Explorer", desc: "Scored >= 80% on the Diet & Nutrition quiz.", icon: "Apple" },
  { id: "prevention_expert", title: "Prevention Expert", desc: "Scored 100% on Dengue, Malaria or Sanitation.", icon: "ShieldCheck" },
  { id: "community_champion", title: "Community Champion", desc: "Earned 5 or more completed certificates.", icon: "Sparkles" }
];

export function useQuizState() {
  const [quizState, setQuizState] = useState("setup"); // "setup" | "active" | "results" | "review"
  const [selectedCategoryId, setSelectedCategoryId] = useState("general");
  const [selectedDifficulty, setSelectedDifficulty] = useState("easy");

  // Active quiz variables
  const [activeQuestions, setActiveQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [isAnswerChecked, setIsAnswerChecked] = useState(false);
  const [userAnswers, setUserAnswers] = useState([]); // indices selected
  const [skippedCount, setSkippedCount] = useState(0);
  const [score, setScore] = useState(0);
  
  // Timer spent
  const [timeSpent, setTimeSpent] = useState(0);
  const timerRef = useRef(null);

  // Local storage state
  const [quizHistory, setQuizHistory] = useState([]);
  const [unlockedAchievements, setUnlockedAchievements] = useState([]);
  const [participantName, setParticipantName] = useState("");

  // Load local data on mount and merge with Firestore
  useEffect(() => {
    try {
      const storedHistory = localStorage.getItem(HISTORY_KEY);
      let localHistory = [];
      if (storedHistory) {
        localHistory = JSON.parse(storedHistory);
        setQuizHistory(localHistory);
      }

      const storedAchievements = localStorage.getItem(ACHIEVEMENTS_KEY);
      if (storedAchievements) setUnlockedAchievements(JSON.parse(storedAchievements));

      const storedName = localStorage.getItem(NAME_KEY);
      if (storedName) setParticipantName(storedName);

      // Fetch from Firestore if user is authenticated
      const unsubscribe = auth.onAuthStateChanged(async (user) => {
        if (user) {
          try {
            const remoteHistory = await getUserQuizHistory(user.uid);
            if (remoteHistory && remoteHistory.length > 0) {
              // Simple merge: keep unique attempts based on ID
              const combined = [...remoteHistory];
              localHistory.forEach(localItem => {
                if (!combined.find(c => c.id === localItem.id)) {
                  combined.push(localItem);
                  // Optionally push local up to firestore here (migration), but keeping it simple
                  saveQuizAttempt(user.uid, localItem).catch(console.error);
                }
              });
              const sorted = combined.sort((a, b) => new Date(b.date) - new Date(a.date));
              setQuizHistory(sorted);
              localStorage.setItem(HISTORY_KEY, JSON.stringify(sorted));
            }
          } catch (err) {
            console.error("Failed to sync remote quiz history:", err);
          }
        }
      });
      return () => unsubscribe();
    } catch (e) {
      console.error(e);
    }
  }, []);

  // Timer interval triggers
  useEffect(() => {
    if (quizState === "active") {
      timerRef.current = setInterval(() => {
        setTimeSpent(prev => prev + 1);
      }, 1000);
    } else {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [quizState]);

  // Start the quiz
  const startQuiz = useCallback(() => {
    const questionsList = quizQuestions[selectedCategoryId] || [];
    
    // Do not aggressively filter by difficulty so the user gets a full assessment.
    // The difficulty selector in the UI can remain as a preference/starting point,
    // but we want to show all available questions for the category (e.g. 8 questions).
    let filtered = questionsList;

    if (filtered.length === 0) {
      alert("No questions available for this category yet.");
      return;
    }

    setActiveQuestions(filtered);
    setCurrentQuestionIndex(0);
    setSelectedOption(null);
    setIsAnswerChecked(false);
    setUserAnswers([]);
    setSkippedCount(0);
    setScore(0);
    setTimeSpent(0);
    setQuizState("active");
  }, [selectedCategoryId, selectedDifficulty]);

  // Option selection
  const selectOption = useCallback((optionIndex) => {
    if (isAnswerChecked) return;
    setSelectedOption(optionIndex);
  }, [isAnswerChecked]);

  // Check Answer (Inline feedback)
  const checkAnswer = useCallback(() => {
    if (selectedOption === null || isAnswerChecked) return;
    setIsAnswerChecked(true);

    const currentQuestion = activeQuestions[currentQuestionIndex];
    const isCorrect = selectedOption === currentQuestion.correct;
    
    if (isCorrect) {
      setScore(prev => prev + 1);
    }

    setUserAnswers(prev => {
      const updated = [...prev];
      updated[currentQuestionIndex] = selectedOption;
      return updated;
    });
  }, [selectedOption, isAnswerChecked, activeQuestions, currentQuestionIndex]);

  // Save participant name live for the certificate
  const saveName = useCallback((name) => {
    setParticipantName(name);
    localStorage.setItem(NAME_KEY, name);
  }, []);

  // Achievement unlock logic
  const checkAchievements = useCallback((attempt, history) => {
    const newlyUnlocked = [...unlockedAchievements];

    // Helper: Unlock
    const unlock = (id) => {
      if (!newlyUnlocked.includes(id)) {
        newlyUnlocked.push(id);
      }
    };

    // 1. First Quiz Completed
    if (history.length >= 1) unlock("first_quiz");

    // 2. 5 Quizzes Completed
    if (history.length >= 5) unlock("five_quizzes");

    // 3. Perfect Score
    if (attempt.percentage === 100) unlock("perfect_score");

    // 4. First Aid Expert (100% on First Aid)
    if (attempt.category === "firstaid" && attempt.percentage === 100) {
      unlock("first_aid_expert");
    }

    // 5. Nutrition Explorer (>= 80% on Nutrition)
    if (attempt.category === "nutrition" && attempt.percentage >= 80) {
      unlock("nutrition_explorer");
    }

    // 6. Prevention Expert (100% on Dengue, Malaria, or Sanitation)
    if (["dengue", "malaria", "sanitation"].includes(attempt.category) && attempt.percentage === 100) {
      unlock("prevention_expert");
    }

    // 7. Community Champion (5+ certificates claimed, which requires score >= 70%)
    const certificateAttempts = history.filter(h => h.percentage >= 70);
    if (certificateAttempts.length >= 5) {
      unlock("community_champion");
    }

    if (newlyUnlocked.length > unlockedAchievements.length) {
      setUnlockedAchievements(newlyUnlocked);
      localStorage.setItem(ACHIEVEMENTS_KEY, JSON.stringify(newlyUnlocked));
    }
  }, [unlockedAchievements]);

  // Finish quiz and check achievements
  const finishQuiz = useCallback((overrideAnswers = null) => {
    setQuizState("results");
    
    // We compute final scores
    const finalUserAnswers = overrideAnswers || userAnswers;
    const correctCount = activeQuestions.reduce((acc, q, idx) => {
      const ans = finalUserAnswers[idx];
      return ans === q.correct ? acc + 1 : acc;
    }, 0);

    const scorePercent = Math.round((correctCount / activeQuestions.length) * 100);

    const newAttempt = {
      id: `attempt_${Date.now()}`,
      category: selectedCategoryId,
      difficulty: selectedDifficulty,
      correct: correctCount,
      total: activeQuestions.length,
      percentage: scorePercent,
      timeSpent,
      date: new Date().toISOString(),
      certificateId: scorePercent >= 70 ? `HM-${selectedCategoryId.substring(0,3).toUpperCase()}-${Date.now().toString().slice(-4)}` : null
    };

    // Update history
    const updatedHistory = [newAttempt, ...quizHistory];
    setQuizHistory(updatedHistory);
    try {
      localStorage.setItem(HISTORY_KEY, JSON.stringify(updatedHistory));
    } catch(e) { console.error(e); }

    // Save to Firestore in background
    if (auth.currentUser) {
      saveQuizAttempt(auth.currentUser.uid, newAttempt).catch(err => {
        console.error("Failed to save quiz attempt to Firestore:", err);
      });
    }

    // Unlock Achievements checking
    checkAchievements(newAttempt, updatedHistory);
  }, [activeQuestions, userAnswers, selectedCategoryId, selectedDifficulty, timeSpent, quizHistory, checkAchievements]);

  // Skip question
  const skipQuestion = useCallback(() => {
    if (isAnswerChecked) return;
    setSkippedCount(prev => prev + 1);
    
    const finalAnswers = [...userAnswers];
    finalAnswers[currentQuestionIndex] = -1; // -1 represents skipped
    setUserAnswers(finalAnswers);

    if (currentQuestionIndex < activeQuestions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
      setSelectedOption(null);
      setIsAnswerChecked(false);
    } else {
      finishQuiz(finalAnswers);
    }
  }, [currentQuestionIndex, activeQuestions, isAnswerChecked, userAnswers, finishQuiz]);

  // Next question navigation
  const nextQuestion = useCallback(() => {
    if (currentQuestionIndex < activeQuestions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
      setSelectedOption(null);
      setIsAnswerChecked(false);
    } else {
      const finalAnswers = [...userAnswers];
      finalAnswers[currentQuestionIndex] = selectedOption;
      finishQuiz(finalAnswers);
    }
  }, [currentQuestionIndex, activeQuestions, userAnswers, selectedOption, finishQuiz]);

  const resetQuiz = useCallback(() => {
    setQuizState("setup");
    setActiveQuestions([]);
    setCurrentQuestionIndex(0);
    setSelectedOption(null);
    setIsAnswerChecked(false);
    setUserAnswers([]);
    setScore(0);
    setTimeSpent(0);
  }, []);

  return {
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
  };
}

export default useQuizState;
