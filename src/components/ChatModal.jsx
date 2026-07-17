import React, { useState, useEffect, useRef, useContext } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, X, Bot, User, ShieldAlert } from 'lucide-react';
import { PlatformContext } from '../context/PlatformContext';
import useChat from '../hooks/useChat';

function ChatModal() {
  const { incrementAIQuestions } = useContext(PlatformContext);
  const { messages, isLoading, sendMessage } = useChat();
  const [isOpen, setIsOpen] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const messagesEndRef = useRef(null);

  // Auto scroll to bottom of chat
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isLoading, isOpen]);

  const handleSend = () => {
    if (!inputValue.trim() || isLoading) return;
    
    incrementAIQuestions(); // Increment impact stats
    sendMessage(inputValue);
    setInputValue("");
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') handleSend();
  };

  return (
    <>
      {/* Floating Action Button */}
      <button
        id="chatbot-fab-trigger"
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-8 right-8 z-50 w-16 h-16 rounded-full bg-surface-container-high border border-primary/20 shadow-[0_0_20px_rgba(0,242,255,0.25)] flex items-center justify-center hover:scale-110 hover:shadow-[0_0_30px_rgba(0,242,255,0.45)] transition-all group backdrop-blur-xl cursor-pointer"
        aria-label="Open AI Health Assistant"
      >
        <span className="material-symbols-outlined text-primary text-3xl group-hover:rotate-12 transition-transform duration-300" aria-hidden="true">
          &#xf06c;
        </span>
      </button>

      {/* Chat Window Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.9 }}
            transition={{ duration: 0.3, type: "spring", damping: 25 }}
            className="fixed bottom-28 right-8 z-50 w-[360px] sm:w-[400px] h-[520px] rounded-2xl glass-modal flex flex-col overflow-hidden text-left"
          >
            {/* Header */}
            <div className="p-4 border-b border-white/10 flex justify-between items-center bg-white/5">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-primary/10 text-primary">
                  <Bot size={20} />
                </div>
                <div>
                  <h3 className="font-title-md text-sm font-bold text-secondary">AI Health Assistant</h3>
                  <span className="text-[10px] text-primary flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#36ffc4] animate-ping"></span>
                    Online Awareness Agent
                  </span>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                aria-label="Close chat window"
                className="p-1 rounded hover:bg-white/10 text-on-surface-variant hover:text-primary transition-colors cursor-pointer"
              >
                <X size={18} />
              </button>
            </div>

            {/* Disclaimer notice */}
            <div className="px-4 py-2.5 bg-yellow-500/5 border-b border-white/5 flex gap-2 items-start text-[11px] text-[#ffdad6] leading-snug">
              <ShieldAlert size={14} className="flex-shrink-0 mt-0.5 text-yellow-400" />
              <span>
                <strong>Educational Only:</strong> This AI assistant is for general information. For diagnosis/treatment, consult your nearest healthcare clinic.
              </span>
            </div>

            {/* Message Pane */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.length === 0 && (
                <div className="flex justify-start items-start gap-2.5">
                  <div className="p-1.5 rounded bg-primary/10 text-primary mt-1">
                    <Bot size={14} />
                  </div>
                  <div className="flex flex-col max-w-[80%] gap-1">
                    <div className="p-3 rounded-2xl text-[13px] leading-relaxed bg-[#191c22]/80 border border-white/5 text-on-surface rounded-tl-none">
                      Hello! I am your AI HealthMate Assistant. I can help answer questions on Dengue, Malaria, Typhoid, Nutrition, Water Safety, and First Aid. How can I help you learn today?
                    </div>
                  </div>
                </div>
              )}
              {messages.map((msg, index) => {
                const isBot = msg.sender === 'bot';
                const formattedTime = msg.timestamp ? new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : '';
                return (
                  <div key={msg.id || index} className={`flex ${isBot ? 'justify-start' : 'justify-end'} items-start gap-2.5`}>
                    {isBot && (
                      <div className="p-1.5 rounded bg-primary/10 text-primary mt-1">
                        <Bot size={14} />
                      </div>
                    )}
                    <div className="flex flex-col max-w-[80%] gap-1">
                      <div className={`p-3 rounded-2xl text-[13px] leading-relaxed ${
                        isBot 
                          ? 'bg-[#191c22]/80 border border-white/5 text-on-surface rounded-tl-none' 
                          : 'bg-gradient-to-r from-primary to-secondary-container text-on-primary rounded-tr-none font-medium'
                      }`}>
                        {isBot && msg.parsedContent ? (
                          <div className="flex flex-col gap-2">
                            {msg.parsedContent.summary && (
                              <div className="whitespace-pre-wrap">{msg.parsedContent.summary}</div>
                            )}
                            {msg.parsedContent.keyPoints && msg.parsedContent.keyPoints.length > 0 && (
                              <div className="mt-1">
                                <span className="font-semibold text-cyan-400 text-[11px] uppercase tracking-wider">Key Points</span>
                                <ul className="space-y-1 mt-1">
                                  {msg.parsedContent.keyPoints.map((point, i) => (
                                    <li key={i} className="flex items-start gap-1.5">
                                      <span className="text-cyan-400 mt-1 text-[10px]">●</span>
                                      <span className="text-on-surface-variant text-xs">{point}</span>
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            )}
                            {msg.parsedContent.prevention && msg.parsedContent.prevention.length > 0 && (
                              <div className="mt-1">
                                <span className="font-semibold text-emerald-400 text-[11px] uppercase tracking-wider">Prevention</span>
                                <ul className="space-y-1 mt-1">
                                  {msg.parsedContent.prevention.map((tip, i) => (
                                    <li key={i} className="flex items-start gap-1.5">
                                      <span className="text-emerald-400 mt-1 text-[10px]">●</span>
                                      <span className="text-on-surface-variant text-xs">{tip}</span>
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            )}
                            {msg.parsedContent.consult && (
                              <div className="mt-1 p-2 rounded bg-red-500/10 border border-red-500/20 text-xs">
                                <strong className="text-red-400 block mb-0.5">Consult Doctor:</strong>
                                <span className="text-on-surface-variant">{msg.parsedContent.consult}</span>
                              </div>
                            )}
                          </div>
                        ) : (
                          <div className="whitespace-pre-wrap">{msg.content}</div>
                        )}
                      </div>
                      <span className={`text-[9px] text-outline self-end`}>
                        {formattedTime}
                      </span>
                    </div>
                    {!isBot && (
                      <div className="p-1.5 rounded bg-white/5 text-secondary mt-1">
                        <User size={14} />
                      </div>
                    )}
                  </div>
                );
              })}

              {isLoading && (
                <div className="flex justify-start items-center gap-2.5">
                  <div className="p-1.5 rounded bg-primary/10 text-primary">
                    <Bot size={14} />
                  </div>
                  <div className="p-3 rounded-2xl rounded-tl-none bg-[#191c22]/80 border border-white/5 flex gap-1 items-center py-4">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary/60 animate-bounce"></span>
                    <span className="w-1.5 h-1.5 rounded-full bg-primary/60 animate-bounce delay-100"></span>
                    <span className="w-1.5 h-1.5 rounded-full bg-primary/60 animate-bounce delay-200"></span>
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Input Footer */}
            <div className="p-4 border-t border-white/10 bg-white/5 flex gap-2 items-center">
              <input
                type="text"
                placeholder="Ask about Dengue, water safety, first aid..."
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={handleKeyDown}
                className="flex-1 bg-[#131b2e]/60 border border-white/10 rounded-full px-4 py-2.5 text-xs text-on-surface placeholder:text-outline focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary transition-all"
              />
              <button
                onClick={handleSend}
                disabled={!inputValue.trim() || isLoading}
                aria-label="Send message"
                className="p-2.5 rounded-full bg-primary text-on-primary hover:shadow-[0_0_12px_rgba(0,242,255,0.3)] disabled:opacity-50 disabled:shadow-none transition-all cursor-pointer"
              >
                <Send size={14} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export default ChatModal;
