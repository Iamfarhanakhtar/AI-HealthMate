import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Star, CheckCircle, MessageSquare, Send, Globe, ChevronLeft } from 'lucide-react';
import Container from '../components/UI/Container';
import SectionTitle from '../components/UI/SectionTitle';
import useImpactState from '../hooks/useImpactState';
import { feedbackChoices } from '../utils/impactData';

function CommunityFeedback() {
  const navigate = useNavigate();
  const { submitFeedback } = useImpactState();
  
  // Find language
  const language = localStorage.getItem('ai_healthmate_language') || 'en';

  const [form, setForm] = useState({
    name: "",
    ageGroup: "18-25",
    occupation: "Student",
    location: "",
    overallRating: 5,
    assistantRating: 5,
    libraryRating: 5,
    guideRating: 5,
    quizRating: 5,
    mostUsefulFeature: "AI Assistant",
    whatLearned: "",
    recommend: "Yes",
    suggestions: "",
    consent: false
  });

  const [submitted, setSubmitted] = useState(false);

  // Translation maps
  const t = useMemo(() => {
    return {
      en: {
        title: "Community Feedback Survey",
        subtitle: "Help us measure educational impact and improve AI HealthMate for your community.",
        name: "Name (Optional)",
        age: "Age Group",
        occupation: "Occupation",
        location: "Location / District (Optional)",
        feature: "Most Useful Feature",
        learned: "What did you learn today?",
        learnedPlaceholder: "Describe any new first aid tips or disease prevention steps you discovered...",
        recommend: "Would you recommend AI HealthMate to others?",
        suggestions: "Suggestions for improvement",
        suggestionsPlaceholder: "Any features or additional local health topics you would like to see...",
        consent: "I consent to sharing this feedback anonymously for social internship records.",
        submit: "Submit Feedback",
        overall: "Overall Platform Rating",
        assistant: "AI Assistant Chat",
        library: "Disease Awareness Library",
        guide: "Emergency First Aid Guide",
        quiz: "Assessment Quiz Experience",
        thankYou: "Thank You!",
        successDesc: "Your feedback has been logged successfully. It contributes directly to our internship awareness analytics.",
        back: "Go to Impact Dashboard"
      },
      hi: {
        title: "सामुदायिक प्रतिक्रिया सर्वेक्षण",
        subtitle: "शैक्षिक प्रभाव को मापने और अपने समुदाय के लिए AI HealthMate को बेहतर बनाने में हमारी मदद करें।",
        name: "नाम (वैकल्पिक)",
        age: "आयु वर्ग",
        occupation: "व्यवसाय",
        location: "स्थान / जिला (वैकल्पिक)",
        feature: "सबसे उपयोगी विशेषता",
        learned: "आपने आज क्या सीखा?",
        learnedPlaceholder: "बताएं कि आपने प्राथमिक चिकित्सा या बीमारी की रोकथाम के कौन से नए तरीके सीखे...",
        recommend: "क्या आप दूसरों को AI HealthMate की सिफारिश करेंगे?",
        suggestions: "सुधार के लिए सुझाव",
        suggestionsPlaceholder: "कोई भी विशेषता या स्थानीय स्वास्थ्य विषय जो आप देखना चाहते हैं...",
        consent: "मैं सामाजिक इंटर्नशिप रिकॉर्ड के लिए गुमनाम रूप से इस प्रतिक्रिया को साझा करने की सहमति देता हूं।",
        submit: "प्रतिक्रिया सबमिट करें",
        overall: "समग्र मंच रेटिंग",
        assistant: "AI सहायक चैट",
        library: "रोग जागरूकता लाइब्रेरी",
        guide: "आपातकालीन प्राथमिक चिकित्सा गाइड",
        quiz: "मूल्यांकन प्रश्नोत्तरी अनुभव",
        thankYou: "धन्यवाद!",
        successDesc: "आपकी प्रतिक्रिया सफलतापूर्वक दर्ज कर ली गई है। यह सीधे हमारे इंटर्नशिप जागरूकता विश्लेषण में योगदान देती है।",
        back: "प्रभाव डैशबोर्ड पर जाएं"
      }
    }[language];
  }, [language]);

  const handleStarClick = (moduleKey, val) => {
    setForm(prev => ({ ...prev, [moduleKey]: val }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.consent) {
      alert(language === 'en' ? "Please accept the consent checkbox to submit." : "कृपया सबमिट करने के लिए सहमति चेकबॉक्स स्वीकार करें।");
      return;
    }
    submitFeedback(form);
    setSubmitted(true);
  };

  const renderStars = (moduleKey, currentVal) => {
    return (
      <div className="flex gap-1.5 mt-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            type="button"
            onClick={() => handleStarClick(moduleKey, star)}
            className="focus:outline-none cursor-pointer p-0.5 hover:scale-110 transition-transform"
          >
            <Star 
              className={`w-5 h-5 ${
                star <= currentVal 
                  ? 'text-cyan-400 fill-cyan-400' 
                  : 'text-outline-variant hover:text-cyan-300'
              }`} 
            />
          </button>
        ))}
      </div>
    );
  };

  return (
    <Container className="py-10 max-w-3xl">
      
      {/* Dynamic Back button */}
      <button
        onClick={() => navigate('/community-impact')}
        className="mb-6 text-xs text-cyan-400 hover:text-cyan-300 flex items-center gap-1 cursor-pointer font-semibold uppercase tracking-wider"
      >
        <ChevronLeft className="w-4 h-4" />
        {language === 'en' ? 'Back to Impact Dashboard' : 'डैशबोर्ड पर वापस जाएं'}
      </button>

      <SectionTitle
        title={t.title}
        subtitle={t.subtitle}
      />

      <div className="mt-8">
        {submitted ? (
          /* SUCCESS BANNER */
          <div className="p-8 rounded-2xl bg-surface-container-low/40 border border-emerald-500/25 text-center space-y-5 animate-fade-in shadow-2xl">
            <CheckCircle className="w-16 h-16 text-emerald-400 mx-auto animate-pulse" />
            <h2 className="text-xl sm:text-2xl font-bold text-white">{t.thankYou}</h2>
            <p className="text-sm text-on-surface-variant max-w-md mx-auto leading-relaxed">
              {t.successDesc}
            </p>
            <button
              onClick={() => navigate('/community-impact')}
              className="px-6 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-on-primary font-bold text-xs transition-colors cursor-pointer"
            >
              {t.back}
            </button>
          </div>
        ) : (
          /* FORM SUBMISSION */
          <form onSubmit={handleSubmit} className="p-6 rounded-2xl bg-surface-container-low/40 border border-outline-variant/20 space-y-6 text-left shadow-xl">
            
            {/* Demographic Row A */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-[10px] uppercase font-mono tracking-widest text-cyan-400 font-semibold">{t.name}</label>
                <input
                  type="text"
                  value={form.name}
                  onChange={(e) => setForm(prev => ({ ...prev, name: e.target.value }))}
                  className="w-full bg-surface-container px-3.5 py-2.5 rounded-xl border border-outline-variant/30 text-xs text-on-surface focus:border-cyan-500/50 outline-none"
                  placeholder="e.g. Rahul Kumar"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[10px] uppercase font-mono tracking-widest text-cyan-400 font-semibold">{t.location}</label>
                <input
                  type="text"
                  value={form.location}
                  onChange={(e) => setForm(prev => ({ ...prev, location: e.target.value }))}
                  className="w-full bg-surface-container px-3.5 py-2.5 rounded-xl border border-outline-variant/30 text-xs text-on-surface focus:border-cyan-500/50 outline-none"
                  placeholder="e.g. Pune, Maharashtra"
                />
              </div>
            </div>

            {/* Demographic Row B */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-[10px] uppercase font-mono tracking-widest text-cyan-400 font-semibold">{t.age}</label>
                <select
                  value={form.ageGroup}
                  onChange={(e) => setForm(prev => ({ ...prev, ageGroup: e.target.value }))}
                  className="w-full bg-surface-container px-3.5 py-2.5 rounded-xl border border-outline-variant/30 text-xs text-on-surface focus:border-cyan-500/50 outline-none"
                >
                  {feedbackChoices.ageGroups.map(a => <option key={a} value={a}>{a}</option>)}
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-[10px] uppercase font-mono tracking-widest text-cyan-400 font-semibold">{t.occupation}</label>
                <select
                  value={form.occupation}
                  onChange={(e) => setForm(prev => ({ ...prev, occupation: e.target.value }))}
                  className="w-full bg-surface-container px-3.5 py-2.5 rounded-xl border border-outline-variant/30 text-xs text-on-surface focus:border-cyan-500/50 outline-none"
                >
                  {feedbackChoices.occupations.map(o => <option key={o} value={o}>{o}</option>)}
                </select>
              </div>
            </div>

            {/* Multi Star Ratings Matrix */}
            <div className="space-y-4 border-t border-b border-outline-variant/15 py-4">
              <h4 className="text-[10px] uppercase font-mono tracking-widest text-cyan-400 font-bold">Healthcare Modules Rating</h4>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <span className="text-xs font-semibold text-on-surface-variant">{t.overall}</span>
                  {renderStars("overallRating", form.overallRating)}
                </div>

                <div className="space-y-1">
                  <span className="text-xs font-semibold text-on-surface-variant">{t.assistant}</span>
                  {renderStars("assistantRating", form.assistantRating)}
                </div>

                <div className="space-y-1">
                  <span className="text-xs font-semibold text-on-surface-variant">{t.library}</span>
                  {renderStars("libraryRating", form.libraryRating)}
                </div>

                <div className="space-y-1">
                  <span className="text-xs font-semibold text-on-surface-variant">{t.guide}</span>
                  {renderStars("guideRating", form.guideRating)}
                </div>

                <div className="space-y-1">
                  <span className="text-xs font-semibold text-on-surface-variant">{t.quiz}</span>
                  {renderStars("quizRating", form.quizRating)}
                </div>
              </div>
            </div>

            {/* Surveys choice selection */}
            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-[10px] uppercase font-mono tracking-widest text-cyan-400 font-semibold">{t.feature}</label>
                  <select
                    value={form.mostUsefulFeature}
                    onChange={(e) => setForm(prev => ({ ...prev, mostUsefulFeature: e.target.value }))}
                    className="w-full bg-surface-container px-3.5 py-2.5 rounded-xl border border-outline-variant/30 text-xs text-on-surface focus:border-cyan-500/50 outline-none"
                  >
                    {feedbackChoices.features.map(f => <option key={f} value={f}>{f}</option>)}
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] uppercase font-mono tracking-widest text-cyan-400 font-semibold">{t.recommend}</label>
                  <div className="flex gap-4 mt-2">
                    {["Yes", "No"].map((opt) => (
                      <label key={opt} className="flex items-center gap-1.5 text-xs text-on-surface-variant cursor-pointer">
                        <input
                          type="radio"
                          name="recommend"
                          value={opt}
                          checked={form.recommend === opt}
                          onChange={(e) => setForm(prev => ({ ...prev, recommend: e.target.value }))}
                          className="accent-cyan-500"
                        />
                        <span>{opt}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>

              {/* What did you learn */}
              <div className="space-y-1">
                <label className="text-[10px] uppercase font-mono tracking-widest text-cyan-400 font-semibold">{t.learned}</label>
                <textarea
                  value={form.whatLearned}
                  onChange={(e) => setForm(prev => ({ ...prev, whatLearned: e.target.value }))}
                  className="w-full bg-surface-container p-3 rounded-xl border border-outline-variant/30 text-xs text-on-surface focus:border-cyan-500/50 outline-none h-20 resize-none"
                  placeholder={t.learnedPlaceholder}
                  required
                />
              </div>

              {/* Suggestions */}
              <div className="space-y-1">
                <label className="text-[10px] uppercase font-mono tracking-widest text-cyan-400 font-semibold">{t.suggestions}</label>
                <textarea
                  value={form.suggestions}
                  onChange={(e) => setForm(prev => ({ ...prev, suggestions: e.target.value }))}
                  className="w-full bg-surface-container p-3 rounded-xl border border-outline-variant/30 text-xs text-on-surface focus:border-cyan-500/50 outline-none h-20 resize-none"
                  placeholder={t.suggestionsPlaceholder}
                />
              </div>
            </div>

            {/* Consent checkbox */}
            <div className="flex items-start gap-2.5 pt-2">
              <input
                type="checkbox"
                id="consent"
                checked={form.consent}
                onChange={(e) => setForm(prev => ({ ...prev, consent: e.target.checked }))}
                className="mt-0.5 accent-cyan-500 shrink-0 cursor-pointer"
                required
              />
              <label htmlFor="consent" className="text-[10px] text-outline-variant leading-relaxed select-none cursor-pointer">
                {t.consent}
              </label>
            </div>

            {/* Submit btn */}
            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-on-primary font-bold text-sm transition-all flex items-center justify-center gap-1.5 shadow-lg shadow-cyan-500/10 cursor-pointer"
            >
              <Send className="w-4 h-4" />
              <span>{t.submit}</span>
            </button>

          </form>
        )}
      </div>

    </Container>
  );
}

export default CommunityFeedback;
