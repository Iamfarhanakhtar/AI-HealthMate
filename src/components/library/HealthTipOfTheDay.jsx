import React, { useState, useEffect } from 'react';
import { Sparkles, Calendar, Languages } from 'lucide-react';

const DAILY_TIPS = [
  {
    en: "Clear stagnant water in buckets, coolers, and gutters weekly to stop mosquito breeding.",
    hi: "मच्छरों को पनपने से रोकने के लिए बाल्टियों, कूलरों और नालियों में जमा पानी को साप्ताहिक रूप से साफ करें।"
  },
  {
    en: "Wash hands with soap for at least 20 seconds before eating or preparing meals to prevent diarrhea.",
    hi: "दस्त से बचाव के लिए भोजन करने या पकाने से पहले कम से कम 20 सेकंड तक साबुन से हाथ धोएं।"
  },
  {
    en: "A healthy diet plates half vegetables/fruits, a quarter grains, and a quarter protein.",
    hi: "एक स्वस्थ थाली में आधा हिस्सा सब्जियां/फल, एक चौथाई अनाज और एक चौथाई प्रोटीन होता है।"
  },
  {
    en: "Pregnant mothers should consult health workers for iron-folic acid tablets to prevent anemia.",
    hi: "गर्भवती माताओं को एनीमिया (खून की कमी) से बचने के लिए आयरन-फॉलिक एसिड की गोलियों के लिए स्वास्थ्य कार्यकर्ताओं से संपर्क करना चाहिए।"
  },
  {
    en: "Drink at least 8 to 10 glasses of clean, boiled or filtered water daily for strong kidney function.",
    hi: "गुर्दे (किडनी) के अच्छे कामकाज के लिए रोजाना कम से कम 8 से 10 गिलास साफ, उबला या छना हुआ पानी पिएं।"
  },
  {
    en: "For minor burns, wash under cool running tap water for 10 minutes. Do not apply toothpaste.",
    hi: "मामूली जलन के लिए, 10 मिनट के लिए बहते ठंडे पानी के नीचे धोएं। टूथपेस्ट न लगाएं।"
  },
  {
    en: "Practice 10 minutes of deep breathing or silent walk daily to reduce mental stress.",
    hi: "मानसिक तनाव को कम करने के लिए रोजाना 10 मिनट गहरी सांस लेने या शांत टहलने का अभ्यास करें।"
  }
];

export function HealthTipOfTheDay({ language }) {
  const [tip, setTip] = useState(DAILY_TIPS[0]);

  useEffect(() => {
    const today = new Date();
    const dateSeed = today.getDate() + today.getMonth() * 31;
    const tipIndex = dateSeed % DAILY_TIPS.length;
    setTip(DAILY_TIPS[tipIndex]);
  }, []);

  const titleText = language === 'en' ? "Health Tip of the Day" : "आज का स्वास्थ्य सुझाव";

  return (
    <div className="relative overflow-hidden p-5 rounded-2xl bg-cyan-950/15 border border-cyan-500/25 flex flex-col sm:flex-row gap-4 items-start sm:items-center max-w-4xl mx-auto shadow-xl backdrop-blur-md">
      
      {/* Background radial glow */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/10 rounded-full blur-2xl pointer-events-none" />

      {/* Badge Icon */}
      <div className="p-3 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center shrink-0 text-cyan-400 floating-hologram">
        <Sparkles className="w-6 h-6" />
      </div>

      <div className="flex-1 space-y-1">
        <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-cyan-400 font-semibold">
          <Calendar className="w-3.5 h-3.5" />
          <span>{titleText}</span>
        </div>
        <p className="text-sm md:text-base leading-relaxed text-on-surface-variant font-medium">
          {language === 'en' ? tip.en : tip.hi}
        </p>
      </div>

    </div>
  );
}

export default HealthTipOfTheDay;
