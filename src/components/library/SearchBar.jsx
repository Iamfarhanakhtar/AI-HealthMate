import React, { useState, useEffect, useRef } from 'react';
import { Search, X, Clock, HelpCircle, Flame } from 'lucide-react';

const POPULAR_SEARCHES = [
  "Dengue",
  "First Aid",
  "Nutrition",
  "Vaccination",
  "Clean Water",
  "Mental Health"
];

export function SearchBar({ value, onChange, placeholder, language }) {
  const [focused, setFocused] = useState(false);
  const [recentSearches, setRecentSearches] = useState([]);
  const containerRef = useRef(null);

  // Load recent searches from localStorage
  useEffect(() => {
    try {
      const stored = localStorage.getItem('ai_healthmate_recent_searches');
      if (stored) {
        setRecentSearches(JSON.parse(stored));
      }
    } catch (e) {
      console.error(e);
    }
  }, []);

  // Handle clicking outside to close suggestions
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setFocused(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const saveRecentSearch = (term) => {
    if (!term.trim()) return;
    const cleanTerm = term.trim();
    setRecentSearches(prev => {
      const filtered = prev.filter(t => t.toLowerCase() !== cleanTerm.toLowerCase());
      const updated = [cleanTerm, ...filtered].slice(0, 5); // Limit to 5
      try {
        localStorage.setItem('ai_healthmate_recent_searches', JSON.stringify(updated));
      } catch (e) {
        console.error(e);
      }
      return updated;
    });
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && value.trim()) {
      saveRecentSearch(value);
      setFocused(false);
    }
  };

  const handleSelectSuggestion = (term) => {
    onChange(term);
    saveRecentSearch(term);
    setFocused(false);
  };

  const handleClearRecent = (e, index) => {
    e.stopPropagation();
    setRecentSearches(prev => {
      const updated = prev.filter((_, i) => i !== index);
      try {
        localStorage.setItem('ai_healthmate_recent_searches', JSON.stringify(updated));
      } catch (e) {
        console.error(e);
      }
      return updated;
    });
  };

  const labelRecent = language === 'en' ? "Recent Searches" : "हाल की खोजें";
  const labelPopular = language === 'en' ? "Popular Topics" : "लोकप्रिय विषय";

  return (
    <div ref={containerRef} className="relative w-full max-w-2xl mx-auto z-20">
      
      {/* Search Input Bar */}
      <div className="relative bg-surface-container-lowest/80 border border-outline-variant/30 rounded-2xl focus-within:border-cyan-500/50 shadow-lg transition-colors flex items-center">
        <Search className="w-5 h-5 text-on-surface-variant absolute left-4 pointer-events-none" />
        
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onKeyDown={handleKeyDown}
          onFocus={() => setFocused(true)}
          placeholder={placeholder || "Search health topics..."}
          className="w-full bg-transparent py-4 pl-12 pr-12 text-sm text-on-surface placeholder-outline outline-none"
        />

        {value && (
          <button
            onClick={() => onChange("")}
            className="p-1.5 rounded-lg hover:bg-white/5 text-on-surface-variant hover:text-white absolute right-4 transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Suggestion Dropdown panel */}
      {focused && (recentSearches.length > 0 || POPULAR_SEARCHES.length > 0) && (
        <div className="absolute top-full left-0 right-0 mt-2 p-4 rounded-2xl bg-surface-container-low border border-outline-variant/30 shadow-2xl backdrop-blur-xl flex flex-col gap-4">
          
          {/* Recent Searches */}
          {recentSearches.length > 0 && (
            <div className="flex flex-col gap-1.5">
              <span className="text-[10px] uppercase font-mono tracking-widest text-outline px-1 flex items-center gap-1.5 font-semibold">
                <Clock className="w-3.5 h-3.5 text-cyan-400" />
                {labelRecent}
              </span>
              <div className="space-y-0.5">
                {recentSearches.map((term, index) => (
                  <div
                    key={index}
                    onClick={() => handleSelectSuggestion(term)}
                    className="flex items-center justify-between p-2 rounded-lg hover:bg-white/5 text-xs text-on-surface-variant hover:text-white transition-all cursor-pointer"
                  >
                    <span>{term}</span>
                    <button
                      onClick={(e) => handleClearRecent(e, index)}
                      className="p-1 rounded text-outline-variant hover:text-red-400 hover:bg-white/5 cursor-pointer"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Popular Searches */}
          <div className="flex flex-col gap-2">
            <span className="text-[10px] uppercase font-mono tracking-widest text-outline px-1 flex items-center gap-1.5 font-semibold">
              <Flame className="w-3.5 h-3.5 text-cyan-400" />
              {labelPopular}
            </span>
            <div className="flex flex-wrap gap-2">
              {POPULAR_SEARCHES.map((term, index) => (
                <button
                  key={index}
                  onClick={() => handleSelectSuggestion(term)}
                  className="px-3 py-1.5 rounded-lg bg-surface-container/60 border border-outline-variant/15 hover:border-cyan-500/30 hover:bg-cyan-500/5 text-xs text-on-surface-variant hover:text-white transition-all cursor-pointer flex items-center gap-1.5"
                >
                  <HelpCircle className="w-3.5 h-3.5 text-cyan-400/80" />
                  {term}
                </button>
              ))}
            </div>
          </div>

        </div>
      )}

    </div>
  );
}

export default SearchBar;
