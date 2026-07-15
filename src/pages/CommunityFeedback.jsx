import React, { useState, useContext } from 'react';
import MaterialIcon from '../components/UI/MaterialIcon';

import { PlatformContext } from '../context/PlatformContext';
import { useFirebaseUser } from '../hooks/useFirebaseUser';

import SectionTitle from '../components/UI/SectionTitle';
import Container from '../components/UI/Container';
import GlassPanel from '../components/UI/GlassPanel';
import Input from '../components/UI/Input';
import Textarea from '../components/UI/Textarea';
import Button from '../components/UI/Button';

function CommunityFeedback() {
  const { addFeedback } = useContext(PlatformContext);
  const { user, loading: authLoading } = useFirebaseUser();
  
  const [formData, setFormData] = useState({
    name: '',
    location: '',
    feedback: '',
    rating: 0,
    consent: false
  });
  
  const [errors, setErrors] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState(null);

  const validate = () => {
    const newErrors = {};
    if (!formData.feedback.trim()) {
      newErrors.feedback = "Health concerns or feedback is required.";
    }
    if (formData.rating === 0) {
      newErrors.rating = "Please provide an overall rating.";
    }
    if (!formData.consent) {
      newErrors.consent = "You must provide consent to submit this feedback.";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validate()) {
      setIsSubmitting(true);
      setSubmitError(null);
      
      const newEntry = { 
        name: formData.name,
        location: formData.location,
        message: formData.feedback, // mapping 'feedback' to 'message' as requested
        rating: formData.rating,
        consent: formData.consent
      };

      try {
        if (addFeedback) {
          // Await the Firestore call via context
          await addFeedback(newEntry);
        }
        
        // Only if successful, show success screen
        setIsSubmitted(true);
        setFormData({ name: '', location: '', feedback: '', rating: 0, consent: false });
      } catch (err) {
        console.error("Firestore write failed:", err);
        setSubmitError("Could not save feedback online. Saved locally instead.");
        
        // Fallback to local storage
        try {
          const prevFeedback = JSON.parse(localStorage.getItem('healthmate_feedback') || '[]');
          localStorage.setItem('healthmate_feedback', JSON.stringify([...prevFeedback, { ...newEntry, id: Date.now(), date: new Date().toISOString() }]));
          
          setIsSubmitted(true);
          setFormData({ name: '', location: '', feedback: '', rating: 0, consent: false });
        } catch (localErr) {
          console.error("Local storage also failed:", localErr);
        }
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  return (
    <Container className="py-10">
      <SectionTitle
        title="Community Feedback Form"
        subtitle="Share Your Voice"
      />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-6">
        <GlassPanel className="p-6">
          {isSubmitted ? (
            <div className="flex flex-col items-center justify-center py-10 text-center gap-4 animate-fade-in" role="alert" aria-live="polite">
              {submitError ? (
                <>
                  <MaterialIcon icon="cloud_off" className="text-5xl text-amber-400" />
                  <h3 className="text-xl font-bold text-amber-400">Saved Locally</h3>
                  <p className="text-sm text-on-surface-variant">{submitError}</p>
                </>
              ) : (
                <>
                  <MaterialIcon icon="check_circle" className="text-5xl text-emerald-400" />
                  <h3 className="text-xl font-bold text-emerald-400">Feedback submitted successfully.</h3>
                  <p className="text-sm text-on-surface-variant">Your feedback has been successfully submitted and will help us improve.</p>
                </>
              )}
              <Button variant="secondary" onClick={() => {
                setIsSubmitted(false);
                setSubmitError(null);
              }} className="mt-4">
                Submit Another Response
              </Button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-5" noValidate>
              
              {/* Optional Fields */}
              <div className="flex flex-col gap-4">
                <Input 
                  label="Your Name (Optional)" 
                  placeholder="e.g. Ramesh Patel" 
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                />
                <Input 
                  label="Village / School Location (Optional)" 
                  placeholder="e.g. Sonapur High School" 
                  value={formData.location}
                  onChange={(e) => setFormData({...formData, location: e.target.value})}
                />
              </div>

              {/* Required Feedback */}
              <div className="flex flex-col gap-1">
                <Textarea 
                  label="Health Concerns or Feedback *" 
                  placeholder="Share any sanitations topics or general issues..." 
                  value={formData.feedback}
                  onChange={(e) => {
                    setFormData({...formData, feedback: e.target.value});
                    if (errors.feedback) setErrors({...errors, feedback: null});
                  }}
                  aria-invalid={!!errors.feedback}
                  aria-describedby={errors.feedback ? "feedback-error" : undefined}
                />
                {errors.feedback && <span id="feedback-error" className="text-red-400 text-xs font-semibold">{errors.feedback}</span>}
              </div>

              {/* Required Rating */}
              <div className="flex flex-col gap-2">
                <label className="text-sm font-semibold text-on-surface">Overall Rating *</label>
                <div className="flex gap-2" role="radiogroup" aria-label="Overall Rating">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      role="radio"
                      aria-checked={formData.rating === star}
                      onClick={() => {
                        setFormData({...formData, rating: star});
                        if (errors.rating) setErrors({...errors, rating: null});
                      }}
                      className="focus:outline-none focus:ring-2 focus:ring-primary/50 rounded-full"
                      aria-label={`${star} Star${star > 1 ? 's' : ''}`}
                    >
                      <span aria-hidden="true" className={`material-symbols-outlined text-2xl transition-colors ${formData.rating >= star ? 'text-amber-400 fill-amber-400' : 'text-on-surface-variant/40'}`}
                            style={{ fontVariationSettings: formData.rating >= star ? "'FILL' 1" : "'FILL' 0" }}>
                        &#xf09a;
                      </span>
                    </button>
                  ))}
                </div>
                {errors.rating && <span className="text-red-400 text-xs font-semibold">{errors.rating}</span>}
              </div>

              {/* Required Consent */}
              <div className="flex flex-col gap-1 mt-2">
                <label className="flex items-start gap-3 cursor-pointer group">
                  <div className="pt-0.5">
                    <input 
                      type="checkbox" 
                      className="peer sr-only"
                      checked={formData.consent}
                      onChange={(e) => {
                        setFormData({...formData, consent: e.target.checked});
                        if (errors.consent) setErrors({...errors, consent: null});
                      }}
                      aria-invalid={!!errors.consent}
                    />
                    <div className="w-5 h-5 rounded border-2 border-outline-variant flex items-center justify-center peer-checked:border-primary peer-checked:bg-primary transition-all peer-focus:ring-2 peer-focus:ring-primary/50 group-hover:border-primary">
                      {formData.consent && <MaterialIcon icon="check" className="text-on-primary text-[16px] font-bold" />}
                    </div>
                  </div>
                  <span className="text-xs text-on-surface-variant leading-relaxed">
                    I consent to sharing this feedback to help improve the AI HealthMate platform. *
                  </span>
                </label>
                {errors.consent && <span className="text-red-400 text-xs font-semibold ml-8">{errors.consent}</span>}
              </div>

              <Button 
                type="submit" 
                variant="primary" 
                className="mt-2"
                disabled={authLoading || isSubmitting || !user}
              >
                {authLoading || !user ? "Connecting cloud sync..." : (isSubmitting ? "Submitting..." : "Submit Feedback")}
              </Button>
            </form>
          )}
        </GlassPanel>
        <div id="feedback-bulletin-container"></div>
      </div>
    </Container>
  );
}

export default CommunityFeedback;
