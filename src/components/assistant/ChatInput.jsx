import React, { useState, useRef, useEffect } from 'react';
import { Send, Mic, MicOff, AlertCircle } from 'lucide-react';

export function ChatInput({ onSendMessage, isLoading, isListening, onToggleListen, error }) {
  const [text, setText] = useState("");
  const textareaRef = useRef(null);

  // Auto grow textarea height based on content
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 120)}px`;
    }
  }, [text]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!text.trim() || isLoading) return;
    onSendMessage(text);
    setText("");
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
    }
  };

  const handleKeyDown = (e) => {
    // Submit on Enter without shift key
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  const maxChars = 1000;

  return (
    <div className="border-t border-outline-variant/30 bg-surface-container-lowest/60 p-4 backdrop-blur-md">
      {error && (
        <div className="mb-3 flex items-center gap-2 p-2.5 rounded-lg bg-red-950/15 border border-red-500/25 text-red-400 text-xs max-w-3xl mx-auto">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <p>{error}</p>
        </div>
      )}

      <form onSubmit={handleSubmit} className="flex gap-2 items-end max-w-4xl mx-auto relative">
        
        {/* Microphones Button Indicator */}
        <button
          type="button"
          onClick={onToggleListen}
          title="Voice input (Coming soon)"
          aria-label={isListening ? "Listening - Click to stop" : "Start Voice Input"}
          className={`p-3 rounded-xl border transition-all duration-300 shrink-0 cursor-pointer ${
            isListening 
              ? 'bg-red-500/10 border-red-500 text-red-400 animate-pulse' 
              : 'bg-surface-container border-outline-variant/20 hover:border-cyan-500/30 text-on-surface-variant hover:text-white'
          }`}
        >
          {isListening ? <MicOff className="w-5 h-5" aria-hidden="true" /> : <Mic className="w-5 h-5" aria-hidden="true" />}
        </button>

        {/* Text Area Input */}
        <div className="flex-1 relative bg-surface-container rounded-xl border border-outline-variant/20 focus-within:border-cyan-500/50 transition-colors">
          <textarea
            ref={textareaRef}
            rows={1}
            value={text}
            onChange={(e) => setText(e.target.value.slice(0, maxChars))}
            onKeyDown={handleKeyDown}
            placeholder={isListening ? "Listening to voice input placeholder..." : "Ask AI HealthMate about malaria, hygiene, nutrition..."}
            disabled={isLoading}
            className="w-full bg-transparent text-sm py-3 pl-4 pr-12 text-on-surface placeholder-outline outline-none resize-none min-h-[44px] max-h-[120px] align-bottom"
          />

          {/* Character Counter Indicator */}
          {text.length > 0 && (
            <span className="absolute bottom-1 right-2 text-[10px] text-outline font-mono">
              {text.length}/{maxChars}
            </span>
          )}
        </div>

        {/* Submit Send Button */}
        <button
          type="submit"
          disabled={!text.trim() || isLoading}
          aria-label="Send Message"
          className={`p-3 rounded-xl flex items-center justify-center transition-all duration-300 shrink-0 cursor-pointer ${
            text.trim() && !isLoading
              ? 'bg-cyan-500 text-on-primary shadow-lg shadow-cyan-500/15 hover:bg-cyan-400'
              : 'bg-surface-container/60 border border-outline-variant/15 text-outline'
          }`}
        >
          <Send className="w-5 h-5" aria-hidden="true" />
        </button>
      </form>

      {/* Tiny compliance disclaimer footer below input */}
      <p className="text-[10px] text-center text-outline-variant mt-2 max-w-lg mx-auto">
        Always double check safety directions. In emergencies, seek immediate care from clinical doctors.
      </p>
    </div>
  );
}

export default ChatInput;
