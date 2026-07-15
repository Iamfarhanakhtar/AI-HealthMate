import React, { useState, useEffect, useRef, useContext } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, X, Bot, User, ShieldAlert } from 'lucide-react';
import { PlatformContext } from '../context/PlatformContext';
import Button from './UI/Button';

function ChatModal() {
  const { incrementAIQuestions } = useContext(PlatformContext);
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      sender: 'bot',
      text: "Hello! I am your AI HealthMate Assistant. I can help answer questions on Dengue, Malaria, Typhoid, Nutrition, Water Safety, and First Aid. How can I help you learn today?",
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  // Auto scroll to bottom of chat
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isTyping]);

  const chatbotResponses = {
    dengue: "Dengue is a mosquito-borne viral infection. Prevention is key: empty stagnant water from containers, clear debris, and cover water tanks. Warning signs include high fever, pain behind the eyes, and joint aches. Rest, stay hydrated, and consult a doctor immediately if bleeding occurs.",
    malaria: "Malaria is transmitted by infected female Anopheles mosquitoes. Best prevention is sleeping under Insecticide-Treated Nets (ITNs), clearing weed bushes, and cleaning drainage pools. Go for a rapid blood test if you experience high shaking chills and fever.",
    typhoid: "Typhoid fever is a waterborne bacterial infection. Avoid raw or open street food, drink boiled water, and ensure food preparation hygiene. The full prescribed antibiotic course must be completed, even if you feel better.",
    covid: "COVID-19 spreads via respiratory droplets. Wash hands frequently, wear masks in congested areas, keep indoor rooms well-ventilated, and complete your vaccinations.",
    nutrition: "Balanced nutrition fights anemia and malnutrition. Eat affordable iron-rich green leafy vegetables (spinach), pulses, eggs, and citrus fruits (Vitamin C helps absorb iron). Infants should be exclusively breastfed for 6 months.",
    water: "Always purify water before consumption: boil for 1 minute or use chlorine tablets. Keep storage containers covered and scrub them regularly to prevent diarrhea and cholera.",
    firstaid: "For snake bites: keep victim calm and still, remove tight jewelry, wash gently, and transport immediately. Do NOT cut or suck out venom. For minor burns: cool under running tap water for 10-20 mins. Do NOT apply toothpaste or oils.",
    mental: "Mental wellness is part of health. Try deep breathing (Pranayama) daily, talk openly about stress with friends/teachers, and seek professional counseling if anxiety interferes with daily life.",
    default: "I can help with topics like Dengue, Malaria, Typhoid, Water Safety, Hygiene, Nutrition, and Emergency First Aid. Could you clarify your question about these public health topics?"
  };

  const handleSend = () => {
    if (!inputValue.trim()) return;

    const userText = inputValue;
    const userTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    
    // Add user message
    setMessages(prev => [...prev, { sender: 'user', text: userText, time: userTime }]);
    setInputValue("");
    setIsTyping(true);
    incrementAIQuestions(); // Increment impact stats!

    // Determine bot response based on keywords
    let responseText = chatbotResponses.default;
    const cleanText = userText.toLowerCase();

    if (cleanText.includes("dengue") || cleanText.includes("mosquito")) {
      responseText = chatbotResponses.dengue;
    } else if (cleanText.includes("malaria")) {
      responseText = chatbotResponses.malaria;
    } else if (cleanText.includes("typhoid") || cleanText.includes("enteric")) {
      responseText = chatbotResponses.typhoid;
    } else if (cleanText.includes("covid") || cleanText.includes("corona")) {
      responseText = chatbotResponses.covid;
    } else if (cleanText.includes("nutrition") || cleanText.includes("anemia") || cleanText.includes("food") || cleanText.includes("diet")) {
      responseText = chatbotResponses.nutrition;
    } else if (cleanText.includes("water") || cleanText.includes("wash") || cleanText.includes("hygiene") || cleanText.includes("diarrhea")) {
      responseText = chatbotResponses.water;
    } else if (cleanText.includes("first aid") || cleanText.includes("snake") || cleanText.includes("burn") || cleanText.includes("cpr") || cleanText.includes("bite")) {
      responseText = chatbotResponses.firstaid;
    } else if (cleanText.includes("stress") || cleanText.includes("mental") || cleanText.includes("anxiety")) {
      responseText = chatbotResponses.mental;
    }

    // Simulate typewriter delay
    setTimeout(() => {
      setIsTyping(false);
      setMessages(prev => [...prev, {
        sender: 'bot',
        text: responseText,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }]);
    }, 1500);
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
          smart_toy
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
              {messages.map((msg, index) => {
                const isBot = msg.sender === 'bot';
                return (
                  <div key={index} className={`flex ${isBot ? 'justify-start' : 'justify-end'} items-start gap-2.5`}>
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
                        {msg.text}
                      </div>
                      <span className={`text-[9px] text-outline self-end`}>
                        {msg.time}
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

              {isTyping && (
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
                disabled={!inputValue.trim()}
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
