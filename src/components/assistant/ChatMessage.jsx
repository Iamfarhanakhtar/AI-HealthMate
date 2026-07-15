import React, { useState } from 'react';
import { 
  Copy, 
  Check, 
  ThumbsUp, 
  ThumbsDown, 
  Volume2, 
  BrainCircuit, 
  User, 
  AlertTriangle, 
  ShieldCheck, 
  Sparkles,
  BookOpen
} from 'lucide-react';

export function ChatMessage({ message, onRate, onSpeak, isSpeaking }) {
  const { id, sender, timestamp, rating, isStreaming } = message;
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(message.content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const formattedTime = new Date(timestamp).toLocaleTimeString([], { 
    hour: '2-digit', 
    minute: '2-digit' 
  });

  const isUser = sender === 'user';

  if (isUser) {
    return (
      <div className="flex items-start justify-end gap-3 p-4 md:p-6">
        <div className="flex flex-col items-end gap-1.5 max-w-[85%] sm:max-w-[70%]">
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-mono uppercase text-on-surface-variant">You</span>
            <span className="text-[10px] text-outline">{formattedTime}</span>
          </div>
          
          <div className="px-4 py-3 rounded-2xl rounded-tr-none bg-cyan-950/40 border border-cyan-500/35 text-cyan-50 backdrop-blur-sm">
            <p className="text-sm leading-relaxed whitespace-pre-wrap">{message.content}</p>
          </div>
        </div>

        <div className="w-8 h-8 rounded-lg bg-cyan-950 border border-cyan-500/20 flex items-center justify-center shrink-0">
          <User className="w-4 h-4 text-cyan-400" />
        </div>
      </div>
    );
  }

  // Assistant / AI Message Rendering
  const parsed = message.parsedContent || {
    summary: message.content,
    keyPoints: [],
    prevention: [],
    consult: "",
    disclaimer: ""
  };

  return (
    <div className="flex items-start gap-3 p-4 md:p-6 bg-surface-container-low/20 border-y border-outline-variant/10">
      <div className="w-8 h-8 rounded-lg bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center shrink-0">
        <BrainCircuit className="w-4 h-4 text-cyan-400" />
      </div>

      <div className="flex-1 flex flex-col gap-2.5 max-w-[90%] md:max-w-[85%]">
        {/* Name and Timestamp Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold text-on-surface">AI HealthMate</span>
            <span className="text-[10px] text-outline">{formattedTime}</span>
          </div>

          {/* Copy and Speaker Controls */}
          {!isStreaming && (
            <div className="flex items-center gap-1">
              <button
                onClick={handleCopy}
                title="Copy response"
                aria-label="Copy response to clipboard"
                className="p-1.5 rounded-lg hover:bg-white/5 text-on-surface-variant hover:text-white transition-colors cursor-pointer"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              </button>
              <button
                onClick={() => onSpeak(message.content)}
                title="Read aloud"
                aria-label="Read response aloud"
                className={`p-1.5 rounded-lg hover:bg-white/5 transition-colors cursor-pointer ${isSpeaking ? 'text-cyan-400 animate-pulse bg-cyan-500/10' : 'text-on-surface-variant hover:text-white'}`}
              >
                <Volume2 className="w-3.5 h-3.5" />
              </button>
            </div>
          )}
        </div>

        {/* Structured Visual Cards */}
        <div className="flex flex-col gap-4">
          
          {/* 1. Summary Card */}
          {parsed.summary && (
            <div className="text-sm md:text-base leading-relaxed text-cyan-50/90 whitespace-pre-wrap font-medium">
              {parsed.summary}
              {isStreaming && <span className="inline-block w-1.5 h-4 ml-1 bg-cyan-400 animate-pulse"></span>}
            </div>
          )}

          {/* 2. Key Points Section */}
          {parsed.keyPoints && parsed.keyPoints.length > 0 && (
            <div className="p-4 rounded-xl bg-surface-container-low border border-outline-variant/30">
              <h4 className="text-xs font-semibold uppercase tracking-wider text-cyan-400 mb-2.5 flex items-center gap-1.5">
                <BookOpen className="w-3.5 h-3.5" />
                Symptoms & Key Info
              </h4>
              <ul className="space-y-2">
                {parsed.keyPoints.map((point, index) => (
                  <li key={index} className="flex items-start gap-2.5 text-xs md:text-sm text-on-surface-variant">
                    <Sparkles className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* 3. Prevention Tips Section */}
          {parsed.prevention && parsed.prevention.length > 0 && (
            <div className="p-4 rounded-xl bg-emerald-950/10 border border-emerald-500/20">
              <h4 className="text-xs font-semibold uppercase tracking-wider text-emerald-400 mb-2.5 flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5" />
                Prevention & Protective Steps
              </h4>
              <ul className="space-y-2">
                {parsed.prevention.map((tip, index) => (
                  <li key={index} className="flex items-start gap-2.5 text-xs md:text-sm text-on-surface-variant">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shrink-0 mt-2"></span>
                    <span>{tip}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* 4. When to Consult Section */}
          {parsed.consult && (
            <div className="p-4 rounded-xl bg-red-950/10 border border-red-500/25 flex gap-3 items-start">
              <AlertTriangle className="w-5 h-5 text-red-400 shrink-0 mt-0.5 animate-pulse" />
              <div>
                <h4 className="text-xs font-semibold uppercase tracking-wider text-red-400 mb-1">
                  When to Seek Immediate Medical Help
                </h4>
                <p className="text-xs md:text-sm text-on-surface-variant leading-relaxed">
                  {parsed.consult}
                </p>
              </div>
            </div>
          )}

          {/* 5. Section-level Educational Disclaimer */}
          {parsed.disclaimer && (
            <div className="text-[10px] text-outline-variant font-mono mt-1 border-t border-outline-variant/10 pt-2.5 italic">
              * {parsed.disclaimer}
            </div>
          )}

        </div>

        {/* Feedback Buttons */}
        {!isStreaming && (
          <div className="flex items-center gap-2 mt-2 border-t border-outline-variant/15 pt-2.5">
            <span className="text-[10px] font-mono text-outline">Was this information helpful?</span>
            <button
              onClick={() => onRate(id, 'like')}
              className={`p-1.5 rounded hover:bg-white/5 transition-colors cursor-pointer ${rating === 'like' ? 'text-emerald-400 bg-emerald-500/10 border border-emerald-500/20' : 'text-on-surface-variant'}`}
              title="Helpful"
              aria-label="Mark response as helpful"
            >
              <ThumbsUp className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => onRate(id, 'dislike')}
              className={`p-1.5 rounded hover:bg-white/5 transition-colors cursor-pointer ${rating === 'dislike' ? 'text-red-400 bg-red-500/10 border border-red-500/20' : 'text-on-surface-variant'}`}
              title="Not helpful"
              aria-label="Mark response as not helpful"
            >
              <ThumbsDown className="w-3.5 h-3.5" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default ChatMessage;
