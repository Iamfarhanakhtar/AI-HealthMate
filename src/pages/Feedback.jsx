import React, { useState, useContext } from 'react';
import MaterialIcon from '../components/UI/MaterialIcon';

import { motion, AnimatePresence } from 'framer-motion';
import { Send, MapPin, CheckCircle, Star } from 'lucide-react';
import { PlatformContext } from '../context/PlatformContext';
import GlassPanel from '../components/UI/GlassPanel';
import Button from '../components/UI/Button';

function Feedback() {
  const { feedbackList, addFeedback } = useContext(PlatformContext);
  
  const [name, setName] = useState("");
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [location, setLocation] = useState("");
  const [topic, setTopic] = useState("Mosquito Prevention");
  const [rating, setRating] = useState(5);
  const [message, setMessage] = useState("");
  const [hoveredRating, setHoveredRating] = useState(0);
  const [submittedSuccessfully, setSubmittedSuccessfully] = useState(false);

  const topics = [
    "Mosquito Prevention",
    "Water Sanitation",
    "Nutrition & Meals",
    "First Aid Training",
    "Awareness Sessions",
    "Translation & Access",
    "Others"
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!message.trim()) return;

    addFeedback({
      name: isAnonymous ? "Anonymous" : name.trim(),
      location: location.trim() || "Local Community",
      topic,
      rating,
      message: message.trim()
    });

    // Reset form
    setName("");
    setIsAnonymous(false);
    setLocation("");
    setTopic("Mosquito Prevention");
    setRating(5);
    setMessage("");
    
    // Show success alert
    setSubmittedSuccessfully(true);
    setTimeout(() => {
      setSubmittedSuccessfully(false);
    }, 4000);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -15 }}
      transition={{ duration: 0.4 }}
      className="max-w-[1200px] mx-auto px-6 md:px-10 py-12 relative z-10 text-left"
    >
      {/* 1. Header */}
      <div className="text-center mb-12">
        <span className="font-label-caps text-label-caps text-primary uppercase tracking-widest bg-primary/5 px-3 py-1 rounded-full border border-primary/20">
          Community Engagement
        </span>
        <h1 className="font-display-lg text-[36px] md:text-[48px] mt-3 text-secondary font-bold">
          Community Feedback & Health Voice
        </h1>
        <p className="text-body-sm text-on-surface-variant mt-2 max-w-xl mx-auto leading-relaxed">
          Report health concerns (like standing water pools), request educational topics, or rate your experience with our awareness sessions.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Form panel (5 cols) */}
        <div className="lg:col-span-5">
          <GlassPanel glowVariant="cyan" className="p-6">
            <h3 className="font-title-md text-lg text-secondary font-bold mb-6 flex items-center gap-2">
              <MaterialIcon icon="rate_review" className="text-primary" />
              Submit Report / Review
            </h3>

            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              {/* Success Alert popup */}
              <AnimatePresence>
                {submittedSuccessfully && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="p-3 bg-[#36ffc4]/10 border border-[#36ffc4]/20 rounded-xl flex gap-2 text-xs text-[#36ffc4] mb-2 leading-relaxed"
                  >
                    <CheckCircle size={16} className="flex-shrink-0 mt-0.5" />
                    <span>Report submitted successfully! Thank you for sharing your voice.</span>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Name (conditionally disabled) */}
              <div className="flex flex-col gap-2">
                <div className="flex justify-between items-center">
                  <label className="text-xs font-bold text-outline uppercase tracking-wider">
                    Your Name
                  </label>
                  <label className="flex items-center gap-1 text-[11px] text-on-surface-variant cursor-pointer select-none">
                    <input
                      type="checkbox"
                      checked={isAnonymous}
                      onChange={(e) => setIsAnonymous(e.target.checked)}
                      className="rounded border-white/10 bg-transparent text-primary focus:ring-0 w-3 h-3"
                    />
                    Submit Anonymously
                  </label>
                </div>
                <input
                  type="text"
                  disabled={isAnonymous}
                  placeholder={isAnonymous ? "Submitting anonymously..." : "e.g. Ramesh Patel"}
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-[#131b2e]/60 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-on-surface focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary disabled:opacity-40"
                  required={!isAnonymous}
                />
              </div>

              {/* Location */}
              <div className="flex flex-col gap-2">
                <label className="text-xs font-bold text-outline uppercase tracking-wider">
                  Village / School / City Location
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Sonapur High School"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="w-full bg-[#131b2e]/60 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-on-surface focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary"
                />
              </div>

              {/* Topic */}
              <div className="flex flex-col gap-2">
                <label className="text-xs font-bold text-outline uppercase tracking-wider">
                  Health Category Topic
                </label>
                <select
                  value={topic}
                  onChange={(e) => setTopic(e.target.value)}
                  className="w-full bg-[#131b2e] border border-white/10 rounded-xl px-4 py-2.5 text-xs text-on-surface focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary"
                >
                  {topics.map((t, idx) => (
                    <option key={idx} value={t} className="bg-surface">
                      {t}
                    </option>
                  ))}
                </select>
              </div>

              {/* Rating stars */}
              <div className="flex flex-col gap-2">
                <label className="text-xs font-bold text-outline uppercase tracking-wider">
                  Platform / Awareness Rating
                </label>
                <div className="flex gap-1.5 items-center mt-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      type="button"
                      key={star}
                      onClick={() => setRating(star)}
                      onMouseEnter={() => setHoveredRating(star)}
                      onMouseLeave={() => setHoveredRating(0)}
                      className="p-1 hover:scale-110 transition-transform cursor-pointer"
                    >
                      <Star
                        size={24}
                        className={`${
                          (hoveredRating || rating) >= star
                            ? 'text-yellow-400 fill-yellow-400'
                            : 'text-outline-variant'
                        } transition-colors`}
                      />
                    </button>
                  ))}
                  <span className="text-xs text-outline font-semibold ml-2 font-mono-data">
                    ({rating} / 5)
                  </span>
                </div>
              </div>

              {/* Message Description */}
              <div className="flex flex-col gap-2">
                <label className="text-xs font-bold text-outline uppercase tracking-wider">
                  Report details / Message request
                </label>
                <textarea
                  required
                  rows={4}
                  placeholder="Describe your health observation, request a translation, or review our session mode..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full bg-[#131b2e]/60 border border-white/10 rounded-xl p-4 text-xs text-on-surface focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary resize-none"
                />
              </div>

              <Button
                type="submit"
                variant="primary"
                className="mt-2 w-full"
                iconRight={<Send size={14} />}
              >
                Submit Feedback
              </Button>
            </form>
          </GlassPanel>
        </div>

        {/* Feedback Listing Bulletin (7 cols) */}
        <div className="lg:col-span-7 flex flex-col gap-6">
          <h3 className="font-title-md text-lg text-secondary font-bold flex items-center gap-2">
            <MaterialIcon icon="forum" className="text-primary" />
            Community Reports Bulletin
          </h3>

          <div className="flex flex-col gap-4 overflow-y-auto max-h-[640px] pr-2">
            {feedbackList.map((fb) => (
              <GlassPanel key={fb.id} className="p-5 flex flex-col gap-3 relative">
                {/* Header line */}
                <div className="flex justify-between items-start gap-4">
                  <div>
                    <h4 className="font-title-md text-[15px] font-bold text-secondary">
                      {fb.name}
                    </h4>
                    <span className="text-[10px] text-outline flex items-center gap-1.5 mt-0.5">
                      <MapPin size={11} className="text-primary" />
                      {fb.location}
                    </span>
                  </div>
                  <span className="text-[10px] text-outline font-mono-data">{fb.timestamp}</span>
                </div>

                {/* Rating & Topic badge */}
                <div className="flex flex-wrap gap-2.5 items-center">
                  <span className="text-[9px] font-bold text-primary uppercase tracking-wider bg-primary/10 px-2 py-0.5 rounded-full border border-primary/20">
                    {fb.topic}
                  </span>
                  
                  {/* Small star rating row */}
                  <div className="flex gap-0.5 items-center">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        size={12}
                        className={`${
                          fb.rating >= star
                            ? 'text-yellow-400 fill-yellow-400'
                            : 'text-outline-variant'
                        }`}
                      />
                    ))}
                  </div>
                </div>

                {/* Message description */}
                <p className="text-body-sm text-on-surface-variant text-[13px] leading-relaxed border-t border-white/5 pt-3">
                  "{fb.message}"
                </p>
              </GlassPanel>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default Feedback;
