import React, { useState } from 'react';
import { AlignLeft, Bookmark, Share2, Printer } from 'lucide-react';

const SECTIONS = [
  { id: 'overview', en: 'Overview', hi: 'अवलोकन' },
  { id: 'symptoms', en: 'Symptoms & Causes', hi: 'लक्षण और कारण' },
  { id: 'prevention', en: 'Prevention & Habits', hi: 'रोकथाम और आदतें' },
  { id: 'myths', en: 'Myths vs Facts', hi: 'भ्रम बनाम तथ्य' },
  { id: 'faqs', en: 'FAQs & Questions', hi: 'सामान्य प्रश्न' }
];

export function TableOfContents({ activeId, onSectionClick, language, bookmarked, onToggleBookmark }) {
  const [toastMessage, setToastMessage] = useState(null);

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    triggerToast("Link copied to clipboard!");
  };

  const handlePrint = () => {
    window.print();
  };

  const triggerToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 2500);
  };

  return (
    <nav className="hidden lg:flex flex-col gap-6 sticky top-24 max-h-[calc(100vh-120px)] overflow-y-auto w-[220px] shrink-0 p-1">
      
      {/* TOC Header */}
      <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-outline font-semibold mb-2">
        <AlignLeft className="w-4 h-4 text-cyan-400" />
        <span>{language === 'en' ? 'On This Page' : 'इस पृष्ठ पर'}</span>
      </div>

      {/* Anchor Navigation Links */}
      <div className="flex flex-col gap-1 border-l border-outline-variant/30">
        {SECTIONS.map((sec) => {
          const isActive = activeId === sec.id;
          return (
            <button
              key={sec.id}
              onClick={() => onSectionClick(sec.id)}
              className={`text-left text-xs py-2 pl-4 -ml-[1px] border-l transition-all cursor-pointer block truncate ${
                isActive
                  ? 'border-cyan-400 text-cyan-300 font-semibold bg-cyan-500/5'
                  : 'border-transparent text-on-surface-variant hover:text-white hover:border-outline-variant'
              }`}
            >
              {language === 'en' ? sec.en : sec.hi}
            </button>
          );
        })}
      </div>

      {/* Quick Action Buttons Placeholders */}
      <div className="border-t border-outline-variant/20 pt-4 flex flex-col gap-2">
        <button
          onClick={onToggleBookmark}
          className={`flex items-center gap-2.5 w-full text-left p-2 rounded-lg text-xs transition-colors cursor-pointer ${
            bookmarked 
              ? 'bg-cyan-500/10 text-cyan-300 border border-cyan-500/20' 
              : 'hover:bg-white/5 text-on-surface-variant hover:text-white'
          }`}
        >
          <Bookmark className={`w-4 h-4 ${bookmarked ? 'fill-cyan-400 text-cyan-400' : ''}`} />
          <span>{bookmarked ? (language === 'en' ? 'Bookmarked' : 'बुकमार्क किया गया') : (language === 'en' ? 'Bookmark' : 'बुकमार्क करें')}</span>
        </button>

        <button
          onClick={handleShare}
          className="flex items-center gap-2.5 w-full text-left p-2 rounded-lg text-xs hover:bg-white/5 text-on-surface-variant hover:text-white transition-colors cursor-pointer"
        >
          <Share2 className="w-4 h-4" />
          <span>{language === 'en' ? 'Share Topic' : 'साझा करें'}</span>
        </button>

        <button
          onClick={handlePrint}
          className="flex items-center gap-2.5 w-full text-left p-2 rounded-lg text-xs hover:bg-white/5 text-on-surface-variant hover:text-white transition-colors cursor-pointer"
        >
          <Printer className="w-4 h-4" />
          <span>{language === 'en' ? 'Print / Save PDF' : 'प्रिंट / पीडीएफ'}</span>
        </button>
      </div>

      {/* Micro toast notifications */}
      {toastMessage && (
        <div className="fixed bottom-4 left-4 z-50 px-3 py-2 rounded-lg bg-cyan-950 border border-cyan-500/35 text-xs text-cyan-200 shadow-2xl animate-fade-in">
          {toastMessage}
        </div>
      )}

    </nav>
  );
}

export default TableOfContents;
