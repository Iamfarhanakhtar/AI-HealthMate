import { useState, useEffect, useCallback } from 'react';
import { auth } from '../lib/firebase';
import { saveBookmark, removeBookmark, getUserBookmarks } from '../services/firestoreService';


const BOOKMARKS_KEY = 'ai_healthmate_bookmarks';
const LANG_KEY = 'ai_healthmate_language';

export function useLibraryState() {
  const [selectedArticleId, setSelectedArticleId] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [bookmarks, setBookmarks] = useState([]);
  const [language, setLanguage] = useState("en"); // "en" or "hi"

  // Load configuration from local storage and Firestore on mount
  useEffect(() => {
    try {
      const storedBookmarks = localStorage.getItem(BOOKMARKS_KEY);
      let localBookmarks = [];
      if (storedBookmarks) {
        localBookmarks = JSON.parse(storedBookmarks);
        setBookmarks(localBookmarks);
      }

      const storedLang = localStorage.getItem(LANG_KEY);
      if (storedLang) {
        setLanguage(storedLang);
      }

      // Sync bookmarks from Firestore
      const unsubscribe = auth.onAuthStateChanged(async (user) => {
        if (user) {
          try {
            const remoteBookmarks = await getUserBookmarks(user.uid);
            if (remoteBookmarks && remoteBookmarks.length > 0) {
              // Merge remote and local
              const combined = Array.from(new Set([...localBookmarks, ...remoteBookmarks]));
              setBookmarks(combined);
              localStorage.setItem(BOOKMARKS_KEY, JSON.stringify(combined));
              
              // Push local up if they weren't in remote
              localBookmarks.forEach(id => {
                if (!remoteBookmarks.includes(id)) {
                  saveBookmark(user.uid, id).catch(console.error);
                }
              });
            }
          } catch (err) {
            console.error("Failed to sync remote bookmarks:", err);
          }
        }
      });
      
      return () => unsubscribe();
    } catch (e) {
      console.error(e);
    }
  }, []);

  // Toggle bookmark handler
  const toggleBookmark = useCallback((articleId) => {
    setBookmarks(prev => {
      const isBookmarked = prev.includes(articleId);
      const updated = isBookmarked
        ? prev.filter(id => id !== articleId)
        : [...prev, articleId];
        
      try {
        localStorage.setItem(BOOKMARKS_KEY, JSON.stringify(updated));
      } catch (e) {
        console.error(e);
      }
      
      // Sync to Firestore
      if (auth.currentUser) {
        if (isBookmarked) {
          removeBookmark(auth.currentUser.uid, articleId).catch(console.error);
        } else {
          saveBookmark(auth.currentUser.uid, articleId).catch(console.error);
        }
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
