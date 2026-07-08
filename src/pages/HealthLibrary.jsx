import React, { useMemo } from 'react';
import useLibraryState from '../hooks/useLibraryState';
import articles, { categories } from '../utils/healthArticles';

// Components
import HealthTipOfTheDay from '../components/library/HealthTipOfTheDay';
import SearchBar from '../components/library/SearchBar';
import HealthCard from '../components/library/HealthCard';
import ArticleViewer from '../components/library/ArticleViewer';
import { 
  BookOpen, 
  Flame, 
  ShieldAlert, 
  HelpCircle, 
  Sparkles, 
  Globe, 
  Plus, 
  Droplet, 
  ShieldCheck, 
  Heart 
} from 'lucide-react';

// Hardcoded Featured Topics matching IDs from our articles database
const FEATURED_IDS = ["dengue", "firstaid", "nutrition", "vaccination", "cleanwater"];

export function HealthLibrary() {
  const {
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
  } = useLibraryState();

  // Find active selected article details
  const activeArticle = useMemo(() => {
    return articles.find(art => art.id === selectedArticleId);
  }, [selectedArticleId]);

  // English & Hindi static UI text translation maps
  const t = useMemo(() => {
    return {
      en: {
        title: "Health Education Library",
        subtitle: "Trusted healthcare awareness for communities, villages and classrooms.",
        featured: "Featured Topics",
        allTopics: "All Health Topics",
        emergencyTitle: "National Medical Helpline",
        emergencyDesc: "This is an educational platform. For immediate clinical medical emergencies, contact national ambulance services.",
        emergencyHotline: "Ambulance Hotline: 108",
        noResults: "No health topics matched your search.",
        tryOther: "Try rephrasing or search another common illness.",
        langSelect: "Language / भाषा",
        searchPlaceholder: "Search illnesses, symptoms, prevention...",
        bookmarks: "Bookmarked Topics"
      },
      hi: {
        title: "स्वास्थ्य शिक्षा लाइब्रेरी",
        subtitle: "समुदायों, गांवों और कक्षाओं के लिए विश्वसनीय स्वास्थ्य देखभाल जागरूकता।",
        featured: "विशेष विषय",
        allTopics: "सभी स्वास्थ्य विषय",
        emergencyTitle: "राष्ट्रीय चिकित्सा हेल्पलाइन",
        emergencyDesc: "यह एक शैक्षणिक मंच है। तत्काल नैदानिक चिकित्सा आपातकाल के लिए, राष्ट्रीय एम्बुलेंस सेवाओं से संपर्क करें।",
        emergencyHotline: "एम्बुलेंस हॉटलाइन: 108",
        noResults: "आपकी खोज से कोई विषय मेल नहीं खाता।",
        tryOther: "समानार्थी शब्द का प्रयोग करें या अन्य बीमारी खोजें।",
        langSelect: "भाषा / Language",
        searchPlaceholder: "बीमारियों, लक्षणों, रोकथाम की खोज करें...",
        bookmarks: "बुकमार्क किए गए विषय"
      }
    }[language];
  }, [language]);

  // Smart Recommender Function: Suggests 3 related topics based on Category matching and Keyword similarity
  const relatedArticles = useMemo(() => {
    if (!activeArticle) return [];
    
    return articles
      .filter(art => art.id !== activeArticle.id) // Exclude current article
      .map(art => {
        let score = 0;
        
        // Category match adds 5 points
        if (art.meta.category === activeArticle.meta.category) {
          score += 5;
        }
        
        // Keyword overlap adds 2 points per word
        const overlappingKeywords = art.keywords.filter(kw => activeArticle.keywords.includes(kw));
        score += overlappingKeywords.length * 2;
        
        return { article: art, score };
      })
      .filter(item => item.score > 0)
      .sort((a, b) => b.score - a.score)
      .slice(0, 3)
      .map(item => item.article);
  }, [activeArticle]);

  // Extract featured articles
  const featuredArticles = useMemo(() => {
    return articles.filter(art => FEATURED_IDS.includes(art.id));
  }, []);

  // Filter and search matching logic (Memoized for high performance)
  const filteredArticles = useMemo(() => {
    let result = articles;

    // 1. Category Filter
    if (activeCategory !== "All") {
      result = result.filter(art => art.meta.category === activeCategory);
    }

    // 2. Search Query Filter (Matches Title in English/Hindi, or keywords)
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      result = result.filter(art => {
        const titleEn = art.title.en.toLowerCase();
        const titleHi = art.title.hi.toLowerCase();
        const category = art.meta.category.toLowerCase();
        const matchesKeyword = art.keywords.some(kw => kw.toLowerCase().includes(q));

        return titleEn.includes(q) || titleHi.includes(q) || category.includes(q) || matchesKeyword;
      });
    }

    return result;
  }, [activeCategory, searchQuery]);

  // Render article detail viewer if selected
  if (activeArticle) {
    const isBookmarked = bookmarks.includes(activeArticle.id);
    return (
      <div className="w-full h-[calc(100vh-64px)] overflow-hidden">
        <ArticleViewer
          article={activeArticle}
          onClose={() => setSelectedArticleId(null)}
          language={language}
          bookmarked={isBookmarked}
          onToggleBookmark={() => toggleBookmark(activeArticle.id)}
        />
        {/* Render Related Topics carousel at bottom inside scrolling context */}
        {relatedArticles.length > 0 && (
          <div className="bg-[#07090E] border-t border-outline-variant/10 px-4 py-8">
            <div className="max-w-3xl mx-auto space-y-4">
              <h3 className="text-sm font-bold text-on-surface font-mono uppercase tracking-wider text-cyan-400">
                {language === 'en' ? 'Related Topics' : 'संबंधित विषय'}
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {relatedArticles.map((art) => (
                  <HealthCard
                    key={art.id}
                    article={art}
                    onOpen={() => setSelectedArticleId(art.id)}
                    language={language}
                  />
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background py-8 px-4 md:px-8">
      <div className="max-w-6xl mx-auto space-y-10">
        
        {/* 1. Header Banner & Language Toggle */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-outline-variant/20">
          <div className="space-y-2">
            <h1 className="text-display-lg font-bold text-transparent bg-clip-text bg-gradient-to-r from-white via-cyan-100 to-cyan-300 text-3xl md:text-4xl tracking-tight">
              {t.title}
            </h1>
            <p className="text-on-surface-variant text-sm md:text-base max-w-xl">
              {t.subtitle}
            </p>
          </div>

          {/* Bilingual Language Switcher */}
          <div className="flex flex-col gap-1.5 shrink-0 self-start md:self-center">
            <span className="text-[10px] uppercase font-mono tracking-widest text-outline font-semibold flex items-center gap-1.5">
              <Globe className="w-3.5 h-3.5 text-cyan-400" />
              {t.langSelect}
            </span>
            <div className="flex bg-surface-container rounded-lg p-0.5 border border-outline-variant/30">
              <button
                onClick={() => changeLanguage('en')}
                className={`px-3 py-1 text-xs font-semibold rounded-md cursor-pointer transition-all ${
                  language === 'en' 
                    ? 'bg-cyan-500 text-on-primary' 
                    : 'text-on-surface-variant hover:text-white'
                }`}
              >
                English
              </button>
              <button
                onClick={() => changeLanguage('hi')}
                className={`px-3 py-1 text-xs font-semibold rounded-md cursor-pointer transition-all ${
                  language === 'hi' 
                    ? 'bg-cyan-500 text-on-primary' 
                    : 'text-on-surface-variant hover:text-white'
                }`}
              >
                हिंदी
              </button>
            </div>
          </div>
        </div>

        {/* 2. Rotating Health Tip Box */}
        <HealthTipOfTheDay language={language} />

        {/* 3. Search Panel */}
        <div className="space-y-4">
          <SearchBar
            value={searchQuery}
            onChange={setSearchQuery}
            placeholder={t.searchPlaceholder}
            language={language}
          />
        </div>

        {/* 4. Featured Topics Row */}
        {!searchQuery && activeCategory === "All" && (
          <div className="space-y-4">
            <h2 className="text-lg font-bold text-on-surface flex items-center gap-2">
              <Flame className="w-5 h-5 text-cyan-400 animate-pulse" />
              {t.featured}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
              {featuredArticles.map((art) => (
                <HealthCard
                  key={art.id}
                  article={art}
                  onOpen={() => setSelectedArticleId(art.id)}
                  language={language}
                />
              ))}
            </div>
          </div>
        )}

        {/* 5. Category scrolling selector */}
        <div className="space-y-3">
          <span className="text-[10px] uppercase font-mono tracking-widest text-outline block font-semibold">
            {language === 'en' ? 'Filter Categories' : 'श्रेणी फ़िल्टर'}
          </span>
          <div className="flex overflow-x-auto gap-2 pb-2 scrollbar-none">
            {categories.map((cat, idx) => {
              const isActive = activeCategory === cat;
              return (
                <button
                  key={idx}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-4 py-2 rounded-xl text-xs font-semibold border transition-all cursor-pointer shrink-0 ${
                    isActive 
                      ? 'bg-cyan-500 text-on-primary border-cyan-500 shadow-md shadow-cyan-500/10' 
                      : 'bg-surface-container/60 border-outline-variant/15 hover:border-cyan-500/30 text-on-surface-variant hover:text-white'
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>
        </div>

        {/* 6. Main Topics Grid */}
        <div className="space-y-4">
          <h2 className="text-lg font-bold text-on-surface">
            {t.allTopics} ({filteredArticles.length})
          </h2>

          {filteredArticles.length === 0 ? (
            <div className="text-center py-12 rounded-2xl border border-outline-variant/10 bg-surface-container-low/20 max-w-xl mx-auto space-y-3">
              <HelpCircle className="w-10 h-10 text-outline mx-auto" />
              <div className="space-y-1">
                <h4 className="font-semibold text-sm text-on-surface">{t.noResults}</h4>
                <p className="text-xs text-outline-variant">{t.tryOther}</p>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {filteredArticles.map((art) => (
                <HealthCard
                  key={art.id}
                  article={art}
                  onOpen={() => setSelectedArticleId(art.id)}
                  language={language}
                />
              ))}
            </div>
          )}
        </div>

        {/* 7. Emergency Banner */}
        <div className="p-5 rounded-2xl bg-red-950/10 border border-red-500/25 flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
          <div className="space-y-1.5">
            <h4 className="font-bold text-sm text-red-400 uppercase tracking-wider flex items-center gap-2">
              <ShieldAlert className="w-4 h-4 text-red-400 animate-pulse" />
              {t.emergencyTitle}
            </h4>
            <p className="text-xs text-on-surface-variant leading-relaxed max-w-2xl">
              {t.emergencyDesc}
            </p>
          </div>
          <div className="bg-red-500/10 text-red-400 px-4 py-2 rounded-xl border border-red-500/35 font-mono font-bold text-sm shrink-0 self-stretch sm:self-auto text-center">
            {t.emergencyHotline}
          </div>
        </div>

      </div>
    </div>
  );
}

export default HealthLibrary;
