import { useState, useCallback } from 'react';

/**
 * Custom Hook: useVoiceUI
 * Prepares the state for future Voice Interaction (Speech-to-Text & Text-to-Speech).
 * Provides stub actions that simulate voice recording and read-aloud buttons.
 */
export function useVoiceUI() {
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [voiceToast, setVoiceToast] = useState(null);

  const triggerToast = useCallback((message) => {
    setVoiceToast(message);
    setTimeout(() => {
      setVoiceToast(null);
    }, 3000);
  }, []);

  const toggleListening = useCallback(() => {
    if (isListening) {
      setIsListening(false);
      triggerToast("Voice input stopped");
    } else {
      setIsListening(true);
      triggerToast("Voice Input coming soon: Audio recording & transcription placeholder activated.");
      // Auto turn off after 5 seconds to simulate listening duration
      setTimeout(() => {
        setIsListening(false);
      }, 5000);
    }
  }, [isListening, triggerToast]);

  const speakMessage = useCallback((text) => {
    if (isSpeaking) {
      setIsSpeaking(false);
      triggerToast("Speech synthesis stopped");
    } else {
      setIsSpeaking(true);
      triggerToast("Text-to-Speech coming soon: Audio read-aloud playback placeholder activated.");
      // Auto turn off after 3 seconds
      setTimeout(() => {
        setIsSpeaking(false);
      }, 3000);
    }
  }, [isSpeaking, triggerToast]);

  return {
    isListening,
    isSpeaking,
    voiceToast,
    toggleListening,
    speakMessage
  };
}
export default useVoiceUI;
