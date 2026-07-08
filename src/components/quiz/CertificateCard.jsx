import React from 'react';
import { Download, Printer, Award, ShieldAlert, Sparkles } from 'lucide-react';

export function CertificateCard({ attempt, participantName, onNameChange, language }) {
  const { category, difficulty, date, certificateId, percentage } = attempt;

  const formattedDate = new Date(date).toLocaleDateString([], {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  const handlePrint = () => {
    window.print();
  };

  const titleMap = {
    general: { en: "General Healthcare Awareness", hi: "सामान्य स्वास्थ्य जागरूकता" },
    dengue: { en: "Dengue Awareness & Prevention", hi: "डेंगू जागरूकता और रोकथाम" },
    malaria: { en: "Malaria Control Guidelines", hi: "मलेरिया नियंत्रण दिशानिर्देश" },
    nutrition: { en: "Diet & Balanced Nutrition", hi: "आहार और संतुलित पोषण" },
    vaccination: { en: "Vaccination & Immunization Safety", hi: "टीकाकरण और प्रतिरक्षण सुरक्षा" },
    cleanwater: { en: "Clean Water Treatment", hi: "साफ पानी का उपचार" },
    sanitation: { en: "Sanitation & Waste Care", hi: "स्वच्छता और अपशिष्ट प्रबंधन" },
    firstaid: { en: "Emergency First Aid Basics", hi: "आपातकालीन प्राथमिक चिकित्सा" },
    mentalhealth: { en: "Mental Wellness & Stress Care", hi: "मानसिक कल्याण और तनाव देखभाल" },
    lifestyle: { en: "Healthy Lifestyle Habits", hi: "स्वस्थ जीवन शैली की आदतें" }
  };

  const categoryName = titleMap[category] ? titleMap[category][language] : category;

  return (
    <div className="p-6 rounded-2xl bg-surface-container-low/40 border border-outline-variant/20 space-y-6 max-w-3xl mx-auto shadow-2xl backdrop-blur-md">
      
      {/* 1. Interactive Participant Name Input */}
      <div className="space-y-2 text-left max-w-md mx-auto">
        <label className="text-[10px] uppercase font-mono tracking-widest text-cyan-400 font-semibold block">
          {language === 'en' ? 'Recipient Full Name' : 'प्राप्तकर्ता का नाम'}
        </label>
        <input
          type="text"
          value={participantName}
          onChange={(e) => onNameChange(e.target.value)}
          placeholder={language === 'en' ? "Enter name for certificate" : "प्रमाणपत्र के लिए नाम दर्ज करें"}
          className="w-full bg-surface-container px-4 py-2.5 rounded-xl border border-outline-variant/30 text-xs text-on-surface focus:border-cyan-500/50 outline-none transition-colors"
        />
      </div>

      {/* 2. Certificate Frame Wrapper (Styled with printable utility borders) */}
      <div 
        id="certificate-print-area" 
        className="w-full max-w-2xl mx-auto border-4 border-double border-cyan-500/40 p-6 rounded-xl bg-surface-container-lowest relative text-center text-[#e1e2eb] font-sans"
        style={{ aspectRatio: '1.414/1' }} // Landscape A4 aspect ratio
      >
        
        {/* Visual corner decorations */}
        <div className="absolute top-2 left-2 w-8 h-8 border-t-2 border-l-2 border-cyan-400/40" />
        <div className="absolute top-2 right-2 w-8 h-8 border-t-2 border-r-2 border-cyan-400/40" />
        <div className="absolute bottom-2 left-2 w-8 h-8 border-b-2 border-l-2 border-cyan-400/40" />
        <div className="absolute bottom-2 right-2 w-8 h-8 border-b-2 border-r-2 border-cyan-400/40" />

        {/* Dynamic Watermark Background */}
        <div className="absolute inset-0 flex items-center justify-center opacity-[0.03] pointer-events-none select-none">
          <Award className="w-64 h-64 text-cyan-400" />
        </div>

        {/* Certificate Text content */}
        <div className="space-y-4 relative z-10 flex flex-col justify-between h-full py-4">
          
          <div className="space-y-1">
            <h5 className="text-[10px] uppercase font-mono tracking-widest text-cyan-400 font-bold">
              AI HealthMate
            </h5>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-white via-cyan-100 to-cyan-300 tracking-tight font-serif">
              Health Champion
            </h2>
            <span className="text-[9px] uppercase font-mono tracking-wider text-outline">
              Social Internship Awareness Certification
            </span>
          </div>

          <div className="space-y-1 mt-4">
            <p className="text-[10px] italic text-on-surface-variant">
              {language === 'en' ? 'This certificate is proudly awarded to' : 'यह प्रमाणपत्र गर्व से प्रदान किया जाता है'}
            </p>
            <h3 className="text-xl sm:text-2xl font-bold text-white border-b border-outline-variant/30 pb-1 max-w-sm mx-auto tracking-wide">
              {participantName || (language === 'en' ? "Your Name Here" : "आपका नाम यहाँ")}
            </h3>
          </div>

          <div className="space-y-2 mt-4">
            <p className="text-xs text-on-surface-variant max-w-md mx-auto leading-relaxed">
              {language === 'en' 
                ? `For successfully completing the interactive educational quiz assessment in the category of ${categoryName} with a score of ${percentage}% (${difficulty} level).`
                : `सफलतापूर्वक ${categoryName} श्रेणी में इंटरैक्टिव शैक्षिक प्रश्नोत्तरी मूल्यांकन को ${percentage}% अंक (${difficulty} स्तर) के साथ पूरा करने के लिए।`
              }
            </p>
          </div>

          {/* Signatures & Verification metadata */}
          <div className="grid grid-cols-2 gap-4 pt-6 border-t border-outline-variant/10 text-left text-[9px] text-outline font-mono mt-4">
            <div className="space-y-1">
              <div><strong className="text-on-surface-variant">DATE:</strong> {formattedDate}</div>
              <div><strong className="text-on-surface-variant">VERIFICATION ID:</strong> {certificateId}</div>
            </div>
            <div className="text-right space-y-1">
              <div><strong className="text-on-surface-variant">B.Tech Social Internship</strong></div>
              <div><strong className="text-on-surface-variant">AI HealthMate Portal</strong></div>
            </div>
          </div>

        </div>
      </div>

      {/* 3. Action Buttons */}
      <div className="flex gap-3 justify-center pt-2">
        <button
          onClick={handlePrint}
          className="px-4 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-on-primary font-semibold text-xs transition-colors flex items-center justify-center gap-1.5 cursor-pointer shadow-lg shadow-cyan-500/10"
        >
          <Printer className="w-4 h-4" />
          <span>{language === 'en' ? 'Print Certificate' : 'प्रमाणपत्र प्रिंट करें'}</span>
        </button>

        <button
          onClick={handlePrint}
          className="px-4 py-2.5 rounded-xl bg-surface-container border border-outline-variant/30 hover:border-cyan-500/30 text-on-surface hover:text-white font-semibold text-xs transition-all flex items-center justify-center gap-1.5 cursor-pointer"
        >
          <Download className="w-4 h-4 text-cyan-400" />
          <span>{language === 'en' ? 'Save as PDF' : 'पीडीएफ सहेजें'}</span>
        </button>
      </div>

      {/* Print-specific style overrides injected into page DOM */}
      <style>{`
        @media print {
          body * {
            visibility: hidden;
          }
          #certificate-print-area, #certificate-print-area * {
            visibility: visible;
          }
          #certificate-print-area {
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
            height: auto;
            border: 4px double #00f2ff !important;
            background-color: #0b0e14 !important;
            color: #ffffff !important;
          }
        }
      `}</style>

    </div>
  );
}

export default CertificateCard;
