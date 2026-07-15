import React, { useState, useContext } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, AlertTriangle, ArrowRight, ShieldCheck, Heart } from 'lucide-react';
import { PlatformContext } from '../context/PlatformContext';
import { firstAid } from '../utils/healthData';
import GlassPanel from '../components/UI/GlassPanel';
import Button from '../components/UI/Button';
import ProgressBar from '../components/UI/ProgressBar';

function Triage() {
  const {
    selectedSymptoms,
    triageReport,
    toggleSymptom,
    runTriage,
    clearTriage
  } = useContext(PlatformContext);

  const [firstAidSearch, setFirstAidSearch] = useState("");
  const [expandedAidId, setExpandedAidId] = useState(null);

  const symptomList = [
    "Fever",
    "Dry Cough",
    "Shortness of Breath",
    "Severe Muscle/Joint Pain",
    "Pain Behind Eyes",
    "Watery Stools / Diarrhea",
    "Dry Mouth / Extreme Thirst",
    "Severe Stomach Pain"
  ];

  // First Aid search filter
  const filteredFirstAid = firstAid.filter(aid =>
    aid.title.toLowerCase().includes(firstAidSearch.toLowerCase()) ||
    aid.steps.some(step => step.toLowerCase().includes(firstAidSearch.toLowerCase()))
  );

  const severityColors = {
    info: "border-blue-500/30 bg-blue-500/5 text-blue-300",
    warning: "border-orange-500/30 bg-orange-500/5 text-orange-300",
    emergency: "border-red-500/40 bg-red-500/8 text-red-300 animate-pulse"
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -15 }}
      transition={{ duration: 0.4 }}
      className="max-w-[1200px] mx-auto px-6 md:px-10 py-12 relative z-10"
    >
      {/* 1. Page Header */}
      <div className="text-center mb-10">
        <span className="font-label-caps text-label-caps text-primary uppercase tracking-widest bg-primary/5 px-3 py-1 rounded-full border border-primary/20">
          Emergency Help & Symptom Checker
        </span>
        <h1 className="font-display-lg text-[36px] md:text-[48px] mt-3 text-secondary font-bold">
          Symptom Triage & First Aid
        </h1>
        <p className="text-body-sm text-on-surface-variant mt-2 max-w-xl mx-auto leading-relaxed">
          Triage symptoms to read matching educational articles, or reference quick first-aid steps for bites, burns, and strokes.
        </p>
      </div>

      {/* 2. Medical Disclaimer Box */}
      <GlassPanel glowVariant="violet" className="p-5 border-l-4 border-l-[#7318ff] mb-12">
        <div className="flex gap-4 items-start">
          <AlertTriangle size={24} className="text-[#e3d4ff] flex-shrink-0 mt-0.5" />
          <div className="text-left">
            <h4 className="font-title-md text-[16px] font-bold text-secondary uppercase tracking-wider">
              Educational Awareness Disclaimer
            </h4>
            <p className="text-body-sm text-on-surface-variant text-[13px] mt-1 leading-relaxed">
              This checker is solely for health awareness and public education. **It does NOT diagnose diseases or provide medical treatments.** In a medical emergency (like severe breathing difficulty, snake bites, or unconsciousness), immediately transport the victim to the nearest hospital or call the emergency helplines **(112 / 108 / 102)**.
            </p>
          </div>
        </div>
      </GlassPanel>

      {/* 3. Symptom Checker & Results */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-16 items-start">
        {/* Symptom selection list (7 cols) */}
        <div className="lg:col-span-7 flex flex-col gap-6 text-left">
          <GlassPanel className="p-6">
            <h3 className="font-title-md text-lg text-secondary font-bold mb-4 flex items-center gap-2">
              <MaterialIcon icon="checklist" className="text-primary" />
              Select Symptoms
            </h3>
            
            <p className="text-body-sm text-on-surface-variant text-[13px] mb-6">
              Check all symptoms currently observed. You can select multiple boxes to run the analysis.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {symptomList.map((symptom, idx) => {
                const isChecked = selectedSymptoms.includes(symptom);
                return (
                  <div
                    key={idx}
                    onClick={() => toggleSymptom(symptom)}
                    className={`flex items-center gap-3 p-4 rounded-xl border cursor-pointer transition-all duration-200 select-none ${
                      isChecked
                        ? 'border-primary/50 bg-primary/5 text-primary shadow-[0_0_12px_rgba(0,242,255,0.05)]'
                        : 'border-white/10 bg-white/[0.02] text-on-surface-variant hover:border-white/20 hover:bg-white/[0.04]'
                    }`}
                  >
                    <div className={`w-5 h-5 rounded-md border flex items-center justify-center flex-shrink-0 transition-colors ${
                      isChecked ? 'border-primary bg-primary text-on-primary' : 'border-outline-variant bg-transparent'
                    }`}>
                      {isChecked && <MaterialIcon icon="check" className="text-[14px] font-bold" />}
                    </div>
                    <span className="text-[13px] font-medium leading-none">{symptom}</span>
                  </div>
                );
              })}
            </div>

            <div className="flex gap-4 mt-8 pt-6 border-t border-white/5">
              <Button
                onClick={runTriage}
                disabled={selectedSymptoms.length === 0}
                variant="primary"
                className="w-full sm:w-auto"
                iconRight={<MaterialIcon icon="insights" className="text-sm font-bold" />}
              >
                Analyze Symptoms
              </Button>
              <Button
                onClick={clearTriage}
                disabled={selectedSymptoms.length === 0}
                variant="secondary"
                className="w-full sm:w-auto"
              >
                Reset
              </Button>
            </div>
          </GlassPanel>
        </div>

        {/* Diagnostic Triage results (5 cols) */}
        <div className="lg:col-span-5 h-full text-left">
          <AnimatePresence mode="wait">
            {triageReport ? (
              <motion.div
                key="result"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
              >
                <GlassPanel glowVariant="cyan" className="p-6 h-full flex flex-col justify-between border border-primary/10">
                  <div>
                    <span className="text-[10px] font-bold text-primary uppercase tracking-wider bg-primary/10 px-2 py-0.5 rounded-full border border-primary/20">
                      Educational Screening Match
                    </span>
                    <h3 className="font-headline-lg text-xl text-secondary font-bold mt-2">
                      {triageReport.matchingDisease}
                    </h3>

                    {/* Severity alert badge */}
                    <div className={`mt-3 py-1.5 px-3 rounded-lg border text-xs font-semibold flex items-center gap-2 ${severityColors[triageReport.severity]}`}>
                      <MaterialIcon icon="info" className="text-[16px]" />
                      Severity Rating: {triageReport.severity.toUpperCase()}
                    </div>

                    {/* Recommendations */}
                    <div className="mt-6 flex flex-col gap-3">
                      <h4 className="font-title-md text-[14px] font-bold text-[#e1e2eb] uppercase tracking-wide">
                        What to do:
                      </h4>
                      <ul className="space-y-2.5">
                        {triageReport.recommendations.map((rec, idx) => (
                          <li key={idx} className="text-body-sm text-on-surface-variant text-[13px] flex items-start gap-2 leading-relaxed">
                            <span className="text-primary mt-1 flex-shrink-0">&#8226;</span>
                            <span>{rec}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="mt-8 pt-6 border-t border-white/5 flex flex-col gap-3">
                    <p className="text-[11px] text-outline italic leading-normal">
                      *Note: Fever and muscle pain checks can be referenced directly in our educational library topics.
                    </p>
                    {triageReport.matchingId && (
                      <Button
                        variant="secondary"
                        onClick={() => navigate(`/explore`)}
                        className="w-full flex justify-between"
                        iconRight={<ArrowRight size={16} />}
                      >
                        Read Prevention Article
                      </Button>
                    )}
                  </div>
                </GlassPanel>
              </motion.div>
            ) : (
              <motion.div
                key="empty"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="h-full"
              >
                <GlassPanel className="p-8 h-full flex flex-col justify-center items-center text-center min-h-[350px]">
                  <span className="material-symbols-outlined text-5xl text-outline-variant p-4 bg-white/5 rounded-full mb-4" aria-hidden="true">
                    clinical_notes
                  </span>
                  <h3 className="font-title-md text-lg text-secondary font-bold">
                    Awaiting Analysis
                  </h3>
                  <p className="text-body-sm text-on-surface-variant text-[13px] max-w-xs mt-1 leading-normal">
                    Select symptoms on the left panel and click 'Analyze Symptoms' to view educational triage recommendations.
                  </p>
                </GlassPanel>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* 4. First Aid Guides List */}
      <section className="border-t border-white/8 pt-16 text-left">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
          <div>
            <h2 className="font-headline-lg text-2xl text-secondary font-bold">
              Emergency First Aid Guides
            </h2>
            <p className="text-body-sm text-on-surface-variant text-[13px] mt-1 max-w-xl leading-normal">
              Quickly find out what to do immediately (and what to avoid) during severe bites, burns, strokes, or choking.
            </p>
          </div>

          {/* Search Aid */}
          <div className="relative w-full md:w-80">
            <input
              type="text"
              placeholder="Search first aid..."
              value={firstAidSearch}
              onChange={(e) => setFirstAidSearch(e.target.value)}
              className="w-full bg-[#131b2e]/60 border border-white/10 rounded-full px-5 py-2.5 text-body-md text-on-surface placeholder:text-outline focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary transition-all shadow-inner"
            />
            <Search size={16} className="absolute right-4 top-3 text-outline" />
          </div>
        </div>

        {/* Guides Expandable Cards List */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredFirstAid.map((aid) => {
            const isExpanded = expandedAidId === aid.id;
            return (
              <GlassPanel
                key={aid.id}
                onClick={() => setExpandedAidId(isExpanded ? null : aid.id)}
                glowVariant={isExpanded ? 'violet' : 'none'}
                className="p-5 cursor-pointer transition-all duration-300 h-fit"
              >
                <div className="flex justify-between items-center w-full">
                  <div className="flex items-center gap-3">
                    <span className="material-symbols-outlined text-primary text-2xl p-2 bg-white/5 rounded-lg" aria-hidden="true">
                      {aid.icon}
                    </span>
                    <h3 className="font-title-md text-[16px] font-bold text-secondary">
                      {aid.title}
                    </h3>
                  </div>
                  {isExpanded ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                </div>

                <AnimatePresence>
                  {isExpanded && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden mt-4 pt-4 border-t border-white/5 space-y-4"
                    >
                      {/* Critical Action Steps */}
                      <div className="flex flex-col gap-2">
                        <span className="text-[11px] font-bold text-[#36ffc4] uppercase tracking-wider flex items-center gap-1.5">
                          <ShieldCheck size={14} />
                          Do These Steps Immediately:
                        </span>
                        <ol className="space-y-2 pl-4 list-decimal">
                          {aid.steps.map((step, sIdx) => (
                            <li key={sIdx} className="text-body-sm text-on-surface-variant text-[13px] leading-relaxed">
                              {step}
                            </li>
                          ))}
                        </ol>
                      </div>

                      {/* Warnings - DONTs */}
                      <div className="flex flex-col gap-2 pt-2">
                        <span className="text-[11px] font-bold text-red-400 uppercase tracking-wider flex items-center gap-1.5">
                          <AlertTriangle size={14} />
                          Critical Warnings - What NOT to do:
                        </span>
                        <ul className="space-y-2 pl-4 list-disc">
                          {aid.donts.map((dont, dIdx) => (
                            <li key={dIdx} className="text-body-sm text-on-surface-variant text-[13px] leading-relaxed">
                              {dont}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </GlassPanel>
            );
          })}
        </div>
      </section>
    </motion.div>
  );
}

export default Triage;
