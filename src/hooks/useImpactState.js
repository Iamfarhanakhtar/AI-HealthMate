import { useState, useEffect, useCallback, useMemo } from 'react';
import { auth } from '../lib/firebase';
import { db } from '../lib/firebase';
import { doc, setDoc, serverTimestamp } from 'firebase/firestore';


const FEEDBACK_KEY = 'ai_healthmate_community_feedback';
const QUIZ_HISTORY_KEY = 'ai_healthmate_quiz_history_v1';
const BOOKMARKS_KEY = 'ai_healthmate_bookmarks';
const CHAT_HISTORY_KEY = 'ai_healthmate_chat_history_v1';

export function useImpactState() {
  const [feedbackList, setFeedbackList] = useState([]);
  const [quizHistory, setQuizHistory] = useState([]);
  const [bookmarks, setBookmarks] = useState([]);
  const [chatCount, setChatCount] = useState(0);

  // Load metrics from local storage
  useEffect(() => {
    try {
      const storedFeedback = localStorage.getItem(FEEDBACK_KEY);
      if (storedFeedback) setFeedbackList(JSON.parse(storedFeedback));

      const storedQuiz = localStorage.getItem(QUIZ_HISTORY_KEY);
      if (storedQuiz) setQuizHistory(JSON.parse(storedQuiz));

      const storedBookmarks = localStorage.getItem(BOOKMARKS_KEY);
      if (storedBookmarks) setBookmarks(JSON.parse(storedBookmarks));

      // Calculate total chat messages exchanged
      const storedChat = localStorage.getItem(CHAT_HISTORY_KEY);
      if (storedChat) {
        const history = JSON.parse(storedChat);
        let count = 0;
        history.forEach(session => {
          if (session.messages) count += session.messages.length;
        });
        setChatCount(count);
      }
    } catch (e) {
      console.error(e);
    }
  }, []);
  // Sync progress to Firestore periodically
  useEffect(() => {
    if (!auth.currentUser) return;
    
    const progressRef = doc(db, 'users', auth.currentUser.uid, 'progress', 'current');
    setDoc(progressRef, {
      quizCount: quizHistory.length,
      bookmarkCount: bookmarks.length,
      chatMessageCount: chatCount,
      lastActive: serverTimestamp()
    }, { merge: true }).catch(console.error);
    
  }, [quizHistory.length, bookmarks.length, chatCount]);


  // Submit Feedback
  const submitFeedback = useCallback((formData) => {
    const newFeedback = {
      id: `fb_${Date.now()}`,
      date: new Date().toISOString(),
      ...formData
    };

    setFeedbackList(prev => {
      const updated = [newFeedback, ...prev];
      try {
        localStorage.setItem(FEEDBACK_KEY, JSON.stringify(updated));
      } catch (e) {
        console.error(e);
      }
      return updated;
    });
  }, []);

  // Compute Learning Streak
  const learningStreak = useMemo(() => {
    if (quizHistory.length === 0) return 0;
    
    // Get unique sorted dates (YYYY-MM-DD)
    const dates = quizHistory.map(h => h.date.split('T')[0]);
    const uniqueDates = Array.from(new Set(dates)).sort((a, b) => new Date(b) - new Date(a));

    let streak = 0;
    const todayStr = new Date().toISOString().split('T')[0];
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    const yesterdayStr = yesterday.toISOString().split('T')[0];

    // Check if the most recent date is today or yesterday
    if (uniqueDates[0] !== todayStr && uniqueDates[0] !== yesterdayStr) {
      return 0;
    }

    let currentDate = new Date(uniqueDates[0]);
    streak = 1;

    for (let i = 1; i < uniqueDates.length; i++) {
      const prevDate = new Date(uniqueDates[i]);
      const diffTime = Math.abs(currentDate - prevDate);
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

      if (diffDays === 1) {
        streak++;
        currentDate = prevDate;
      } else if (diffDays > 1) {
        break;
      }
    }

    return streak;
  }, [quizHistory]);

  // Compute Recommended Next Step
  const recommendedNextStep = useMemo(() => {
    if (quizHistory.length === 0) {
      return {
        en: "Take your first quiz on First Aid Basics",
        hi: "प्राथमिक चिकित्सा मूल बातें पर अपनी पहली प्रश्नोत्तरी लें"
      };
    }

    // Find if they failed any quiz recently (score < 70)
    const failedAttempt = quizHistory.find(h => h.percentage < 70);
    if (failedAttempt) {
      return {
        en: `Retake the ${failedAttempt.category} Quiz on Easy to improve score`,
        hi: `स्कोर सुधारने के लिए ${failedAttempt.category} प्रश्नोत्तरी दोबारा लें`
      };
    }

    // Recommend reading an article if bookmarks are empty
    if (bookmarks.length === 0) {
      return {
        en: "Explore Disease Library and bookmark key articles",
        hi: "रोग लाइब्रेरी का अन्वेषण करें और महत्वपूर्ण लेखों को सहेजें"
      };
    }

    // Standard fallback recommendation
    return {
      en: "Ask AI Assistant for an advanced healthcare question",
      hi: "उन्नत स्वास्थ्य प्रश्न के लिए AI सहायक से पूछें"
    };
  }, [quizHistory, bookmarks]);

  // Aggregate local feedback insights
  const feedbackInsights = useMemo(() => {
    if (feedbackList.length === 0) {
      return {
        mostAppreciated: "AI Assistant",
        requestedImprovement: "Offline content sync",
        frequentTopic: "First Aid Timelines"
      };
    }

    // Count occurrences of features
    const featureCounts = {};
    feedbackList.forEach(fb => {
      const f = fb.mostUsefulFeature;
      if (f) featureCounts[f] = (featureCounts[f] || 0) + 1;
    });

    const sortedFeatures = Object.keys(featureCounts).sort((a, b) => featureCounts[b] - featureCounts[a]);
    
    return {
      mostAppreciated: sortedFeatures[0] || "AI Assistant",
      requestedImprovement: "Bilingual translations expansion",
      frequentTopic: "Snake Bite Care Procedures"
    };
  }, [feedbackList]);

  // Compute local badges based on milestones
  const communityBadges = useMemo(() => {
    const badges = [];
    if (quizHistory.length >= 1) {
      badges.push({ id: "active_learner", title: "Active Learner", desc: "Completed at least one quiz.", color: "border-cyan-500 text-cyan-300 bg-cyan-500/10" });
    }
    if (feedbackList.length >= 1) {
      badges.push({ id: "contributor", title: "Community Contributor", desc: "Submitted platform feedback.", color: "border-emerald-500 text-emerald-300 bg-emerald-500/10" });
    }
    if (quizHistory.some(h => h.percentage >= 70)) {
      badges.push({ id: "champion", title: "Health Champion", desc: "Earned a certified passing score.", color: "border-purple-500 text-purple-300 bg-purple-500/10" });
    }
    if (chatCount >= 10 || quizHistory.length >= 5) {
      badges.push({ id: "volunteer", title: "Awareness Volunteer", desc: "Demonstrated deep learning dedication.", color: "border-amber-500 text-amber-300 bg-amber-500/10" });
    }
    return badges;
  }, [quizHistory, feedbackList, chatCount]);

  return {
    feedbackList,
    quizHistory,
    bookmarks,
    chatCount,
    submitFeedback,
    learningStreak,
    recommendedNextStep,
    feedbackInsights,
    communityBadges
  };
}

export default useImpactState;
