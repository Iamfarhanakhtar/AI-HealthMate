import { useState, useEffect, useCallback } from 'react';

const BOOKMARKS_KEY = 'ai_healthmate_bookmarks';
const LANG_KEY = 'ai_healthmate_language';

export function useLibraryState() {
  const [selectedArticleId, setSelectedArticleId] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [bookmarks, setBookmarks] = useState([]);
  const [language, setLanguage] = useState("en"); // "en" or "hi"

  // Load configuration from local storage on mount
  useEffect(() => {
    try {
      const storedBookmarks = localStorage.getItem(BOOKMARKS_KEY);
      if (storedBookmarks) {
        setBookmarks(JSON.parse(storedBookmarks));
      }

      const storedLang = localStorage.getItem(LANG_KEY);
      if (storedLang) {
        setLanguage(storedLang);
      }
    } catch (e) {
      console.error(e);
    }
  }, []);

  // Toggle bookmark handler
  const toggleBookmark = useCallback((articleId) => {
    setBookmarks(prev => {
      const updated = prev.includes(articleId)
        ? prev.filter(id => id !== articleId)
        : [...prev, articleId];
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
    } catch (e) {
      console.error(e);
    }
  }, []);

  return {
    selectedArticleId,
    setSelectedArticleId,
    searchQuery,
    setSearchQuery,
    activeCategory,
    setActiveCategory,
    bookmarks,
    toggleBookmark,
    language,
    changeLanguage
  };
}

export default useLibraryState;
