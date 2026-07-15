import React, { useState, useContext } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, ChevronDown, ChevronUp, BookOpen, Eye } from 'lucide-react';
import { PlatformContext } from '../context/PlatformContext';
import GlassPanel from '../components/UI/GlassPanel';
import Button from '../components/UI/Button';

function Explore() {
  const { healthArticles, viewArticle } = useContext(PlatformContext);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [expandedCardId, setExpandedCardId] = useState(null);

  const categories = ["All", "Mosquito-borne", "Hygiene", "Nutrition", "Infectious", "Wellness"];

  // Filter logic
  const filteredArticles = healthArticles.filter(art => {
    const matchesCategory = selectedCategory === "All" || art.category === selectedCategory;
    const matchesSearch = art.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          art.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          art.category.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleCardToggle = (id) => {
    if (expandedCardId === id) {
      setExpandedCardId(null);
    } else {
      setExpandedCardId(id);
      viewArticle(id); // Increment views and metrics!
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -15 }}
      transition={{ duration: 0.4 }}
      className="max-w-[1200px] mx-auto px-6 md:px-10 py-12 relative z-10"
    >
      {/* Header section */}
      <div className="text-center mb-12">
        <span className="font-label-caps text-label-caps text-primary uppercase tracking-widest bg-primary/5 px-3 py-1 rounded-full border border-primary/20">
          Knowledge is Protection
        </span>
        <h1 className="font-display-lg text-[36px] md:text-[48px] mt-3 text-secondary font-bold">
          Healthcare Awareness Library
        </h1>
        <p className="text-body-sm text-on-surface-variant mt-2 max-w-xl mx-auto leading-relaxed">
          Search and explore simple educational materials on diseases, first aid, nutrition, and hygiene. Share these facts with your community to prevent outbreaks.
        </p>
      </div>

      {/* Search & Category Filter Section */}
      <div className="flex flex-col md:flex-row gap-6 justify-between items-center mb-10 w-full">
        {/* Search bar */}
        <div className="relative w-full md:w-96">
          <input
            type="text"
            placeholder="Search health topics..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-[#131b2e]/60 border border-white/10 rounded-full px-6 py-3 text-body-md text-on-surface placeholder:text-outline focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary transition-all shadow-inner"
          />
          <Search size={18} className="absolute right-5 top-3.5 text-outline" />
        </div>

        {/* Categories scroll row */}
        <div className="flex gap-2.5 overflow-x-auto w-full md:w-auto pb-2 scrollbar-none">
          {categories.map((cat, idx) => (
            <button
              key={idx}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-full text-xs font-semibold uppercase tracking-wider border transition-all duration-300 whitespace-nowrap cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-gradient-to-r from-primary to-secondary-container text-on-primary border-none shadow-[0_0_12px_rgba(0,242,255,0.15)]'
                  : 'bg-white/5 border-white/10 text-on-surface-variant hover:text-primary hover:border-primary/50'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Grid List */}
      <div className="grid grid-cols-1 gap-6">
        <AnimatePresence>
          {filteredArticles.length > 0 ? (
            filteredArticles.map((article) => {
              const isExpanded = expandedCardId === article.id;
              
              return (
                <motion.div
                  key={article.id}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3 }}
                >
                  <GlassPanel
                    glowVariant={isExpanded ? 'cyan' : 'none'}
                    className="p-6 transition-all duration-300"
                  >
                    <div
                      onClick={() => handleCardToggle(article.id)}
                      className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 cursor-pointer"
                    >
                      <div className="flex items-center gap-4">
                        <span className="material-symbols-outlined text-4xl text-primary p-3 bg-white/5 rounded-xl" aria-hidden="true">
                          {article.icon}
                        </span>
                        <div className="text-left">
                          <span className="text-[10px] font-bold text-primary uppercase tracking-wider bg-primary/10 px-2 py-0.5 rounded-full border border-primary/20">
                            {article.category}
                          </span>
                          <h2 className="font-title-md text-xl text-secondary font-bold mt-1">
                            {article.title}
                          </h2>
                          <p className="text-body-sm text-on-surface-variant text-[13px] mt-1 max-w-2xl leading-relaxed">
                            {article.summary}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-6 self-end md:self-auto text-outline text-xs">
                        <span className="flex items-center gap-1.5 font-mono-data">
                          <Eye size={14} />
                          {article.views} views
                        </span>
                        <span className="flex items-center gap-1.5 font-mono-data">
                          <BookOpen size={14} />
                          {article.readTime}
                        </span>
                        {isExpanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                      </div>
                    </div>

                    {/* Expandable panel */}
                    <AnimatePresence>
                      {isExpanded && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3 }}
                          className="overflow-hidden mt-6 pt-6 border-t border-white/8 text-left grid grid-cols-1 md:grid-cols-3 gap-6"
                        >
                          {/* Symptoms */}
                          <div className="flex flex-col gap-3">
                            <h3 className="font-title-md text-[15px] font-bold text-[#e3d4ff] flex items-center gap-2">
                              <MaterialIcon icon="emergency" className="text-[18px]" />
                              Symptoms to Watch
                            </h3>
                            <ul className="space-y-1.5">
                              {article.symptoms.map((sym, idx) => (
                                <li key={idx} className="text-body-sm text-on-surface-variant text-[13px] flex items-start gap-2 leading-relaxed">
                                  <span className="text-red-400 mt-1">&#8226;</span>
                                  {sym}
                                </li>
                              ))}
                            </ul>
                          </div>

                          {/* Prevention */}
                          <div className="flex flex-col gap-3">
                            <h3 className="font-title-md text-[15px] font-bold text-[#36ffc4] flex items-center gap-2">
                              <MaterialIcon icon="verified" className="text-[18px]" />
                              Prevention Actions
                            </h3>
                            <ul className="space-y-1.5">
                              {article.prevention.map((prev, idx) => (
                                <li key={idx} className="text-body-sm text-on-surface-variant text-[13px] flex items-start gap-2 leading-relaxed">
                                  <span className="text-primary mt-1">&#8226;</span>
                                  {prev}
                                </li>
                              ))}
                            </ul>
                          </div>

                          {/* Home Care / Triage Advice */}
                          <div className="flex flex-col gap-3">
                            <h3 className="font-title-md text-[15px] font-bold text-primary flex items-center gap-2">
                              <MaterialIcon icon="clinical_notes" className="text-[18px]" />
                              Care Instructions
                            </h3>
                            <ul className="space-y-1.5">
                              {article.treatment.map((treat, idx) => (
                                <li key={idx} className="text-body-sm text-on-surface-variant text-[13px] flex items-start gap-2 leading-relaxed">
                                  <span className="text-[#36ffc4] mt-1">&#8226;</span>
                                  {treat}
                                </li>
                              ))}
                            </ul>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </GlassPanel>
                </motion.div>
              );
            })
          ) : (
            <div className="text-center py-16 text-on-surface-variant">
              <MaterialIcon icon="find_in_page" className="text-5xl opacity-40" />
              <p className="mt-2 text-body-md">No topics found matching your query.</p>
            </div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}

export default Explore;
