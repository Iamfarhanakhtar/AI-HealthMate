import { useState, useEffect, useCallback } from 'react';

const BOOKMARKS_KEY = 'ai_healthmate_guide_bookmarks';
const LANG_KEY = 'ai_healthmate_language';

export function useGuideState() {
  const [activeTab, setActiveTab] = useState("symptoms"); // "symptoms" | "firstaid" | "contacts" | "habits"
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSymptomId, setSelectedSymptomId] = useState(null);
  const [selectedFirstAidId, setSelectedFirstAidId] = useState(null);
  const [bookmarkedGuides, setBookmarkedGuides] = useState([]);
  const [language, setLanguage] = useState("en");

  // Load state from local storage on mount
  useEffect(() => {
    try {
      const storedBookmarks = localStorage.getItem(BOOKMARKS_KEY);
      if (storedBookmarks) {
        setBookmarkedGuides(JSON.parse(storedBookmarks));
      }

      const storedLang = localStorage.getItem(LANG_KEY);
      if (storedLang) {
        setLanguage(storedLang);
      }
    } catch (e) {
      console.error(e);
    }
  }, []);

  // Listen for language setting changes in localStorage (in case they toggle elsewhere)
  useEffect(() => {
    const handleStorageChange = () => {
      const storedLang = localStorage.getItem(LANG_KEY);
      if (storedLang && storedLang !== language) {
        setLanguage(storedLang);
      }
    };
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, [language]);

  // Toggle bookmark handler
  const toggleBookmark = useCallback((guideId) => {
    setBookmarkedGuides(prev => {
      const updated = prev.includes(guideId)
        ? prev.filter(id => id !== guideId)
        : [...prev, guideId];
      try {
        localStorage.setItem(BOOKMARKS_KEY, JSON.stringify(updated));
      } catch (e) {
        console.error(e);
      }
      return updated;
    });
  }, []);

  // Language switch handler
  const changeLanguage = useCallback((lang) => {
    setLanguage(lang);
    try {
      localStorage.setItem(LANG_KEY, lang);
      // Trigger a storage event manually for other windows/components
      window.dispatchEvent(new Event('storage'));
    } catch (e) {
      console.error(e);
    }
  }, []);

  return {
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
  };
}

export default useGuideState;
