import React, { useState, useEffect, useRef } from 'react';
import { Menu, MessageSquare, AlertCircle, Sparkles, X, Activity } from 'lucide-react';
import useChat from '../hooks/useChat';
import useVoiceUI from '../hooks/useVoiceUI';

// Components
import ChatSidebar from '../components/assistant/ChatSidebar';
import SuggestedQuestions from '../components/assistant/SuggestedQuestions';
import OnboardingHero from '../components/assistant/OnboardingHero';
import ChatMessage from '../components/assistant/ChatMessage';
import ChatInput from '../components/assistant/ChatInput';
import AIAvatar from '../components/assistant/AIAvatar';
import DisclaimerBanner from '../components/assistant/DisclaimerBanner';
import TypingIndicator from '../components/assistant/TypingIndicator';

function Assistant() {
  const {
    conversations,
    currentConversationId,
    messages,
    isLoading,
    error,
    offlineMode,
    isKeyConfigured,
    sendMessage,
    startNewChat,
    selectConversation,
    clearAllConversations,
    rateMessage,
    regenerateLastResponse,
    refreshKeyStatus
  } = useChat();

  const [showSettingsModal, setShowSettingsModal] = useState(false);
  const [apiKeyInput, setApiKeyInput] = useState('');

  // Pre-fill input when modal opens
  useEffect(() => {
    if (showSettingsModal) {
      setApiKeyInput(localStorage.getItem('ai_healthmate_gemini_api_key') || '');
    }
  }, [showSettingsModal]);

  const {
    isListening,
    isSpeaking,
    voiceToast,
    toggleListening,
    speakMessage
  } = useVoiceUI();

  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const messagesEndRef = useRef(null);

  // Auto-scroll to bottom on new messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  const handleSelectCardOrQuestion = (query) => {
    sendMessage(query);
  };

  return (
    <div className="flex w-full h-[calc(100vh-64px)] relative overflow-hidden bg-background text-on-surface">
      
      {/* 1. Mobile Sidebar Toggle & Header bar */}
      <div className="lg:hidden flex items-center justify-between px-4 py-3 bg-surface-container-lowest border-b border-outline-variant/20 absolute top-0 left-0 right-0 z-20 h-14">
        <button
          onClick={() => setMobileSidebarOpen(true)}
          aria-label="Open chat history menu"
          className="p-1.5 rounded-lg bg-surface-container border border-outline-variant/30 text-on-surface-variant hover:text-white transition-colors cursor-pointer"
        >
          <Menu className="w-5 h-5" />
        </button>
        <div className="flex items-center gap-1.5">
          <Activity className="w-4 h-4 text-cyan-400" />
          <span className="font-bold text-xs">AI HealthMate</span>
        </div>
        <span className="w-8"></span> {/* spacer */}
      </div>

      {/* Mobile Drawer Backdrop */}
      {mobileSidebarOpen && (
        <div 
          onClick={() => setMobileSidebarOpen(false)}
          className="lg:hidden fixed inset-0 bg-black/60 backdrop-blur-sm z-30 transition-opacity"
        />
      )}

      {/* 2. Left Sidebar (History & Topics drawer) */}
      <div className={`
        fixed lg:static inset-y-0 left-0 z-40 transform lg:transform-none transition-transform duration-300
        ${mobileSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        {/* On mobile, add a close button on top of sidebar */}
        {mobileSidebarOpen && (
          <button
            onClick={() => setMobileSidebarOpen(false)}
            aria-label="Close sidebar"
            className="absolute top-3 right-3 p-1.5 rounded-lg bg-surface-container text-on-surface-variant hover:text-white z-50 lg:hidden cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        )}
        <ChatSidebar
          conversations={conversations}
          currentConversationId={currentConversationId}
          onSelectConversation={selectConversation}
          onNewChat={startNewChat}
          onClearHistory={clearAllConversations}
          onSelectTopic={handleSelectCardOrQuestion}
          isOpen={mobileSidebarOpen}
          onClose={() => setMobileSidebarOpen(false)}
        />
      </div>

      {/* 3. Main Chat Core Area */}
      <main className="flex-1 flex flex-col h-full overflow-hidden bg-[#07090E] pt-14 lg:pt-0">
        
        {/* Persistent top warnings */}
        <DisclaimerBanner />
        
        {/* Assistant status header */}
        <AIAvatar 
          offlineMode={offlineMode} 
          isKeyConfigured={isKeyConfigured}
          onOpenSettings={() => setShowSettingsModal(true)}
        />

        {/* Scrollable messages container */}
        <div className="flex-1 overflow-y-auto p-2 sm:p-4 space-y-4">
          
          {/* Empty onboarding state */}
          {messages.length === 0 ? (
            <OnboardingHero onSelectCard={handleSelectCardOrQuestion} />
          ) : (
            <div className="max-w-4xl mx-auto space-y-1">
              {messages.map((message) => (
                <ChatMessage
                  key={message.id}
                  message={message}
                  onRate={rateMessage}
                  onSpeak={speakMessage}
                  isSpeaking={isSpeaking}
                />
              ))}
            </div>
          )}

          {/* Typing bounce indicator */}
          {isLoading && messages.length > 0 && messages[messages.length - 1]?.sender === 'user' && (
            <div className="max-w-4xl mx-auto">
              <TypingIndicator />
            </div>
          )}

          {/* Scrolling anchor */}
          <div ref={messagesEndRef} />
        </div>

        {/* 4. Bottom Entry Bar */}
        <ChatInput
          onSendMessage={sendMessage}
          isLoading={isLoading}
          isListening={isListening}
          onToggleListen={toggleListening}
          error={error}
        />
      </main>

      {/* 5. Desktop Right Sidebar (Suggested Questions & Daily Tips) */}
      <SuggestedQuestions onSelectQuestion={handleSelectCardOrQuestion} />

      {/* 6. Floating Voice synthesis banner toast */}
      {voiceToast && (
        <div className="fixed bottom-24 left-1/2 transform -translate-x-1/2 z-50 px-4 py-3 rounded-xl bg-cyan-950/90 border border-cyan-500/30 shadow-2xl backdrop-blur-md max-w-sm w-[90%] text-center text-xs text-cyan-200 flex items-center justify-center gap-2 animate-bounce">
          <Sparkles className="w-4 h-4 text-cyan-400 shrink-0 animate-spin" />
          <span>{voiceToast}</span>
        </div>
      )}

      {/* 7. Settings Modal for Gemini API Key */}
      {showSettingsModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-md flex items-center justify-center z-50 p-4 animate-fade-in">
          <div className="w-full max-w-md rounded-2xl bg-[#0F131C] border border-cyan-500/30 p-6 shadow-2xl space-y-4">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-cyan-400" />
                  Gemini API Configuration
                </h3>
                <p className="text-xs text-on-surface-variant mt-1 leading-relaxed">
                  Enter your Google Gemini API Key to enable real-life AI responses.
                </p>
              </div>
              <button 
                onClick={() => setShowSettingsModal(false)}
                className="p-1 rounded-lg hover:bg-surface-container text-on-surface-variant hover:text-white cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-2">
              <label className="block text-[10px] uppercase font-mono font-bold text-cyan-400 tracking-wider">
                API Key
              </label>
              <input
                type="password"
                value={apiKeyInput}
                onChange={(e) => setApiKeyInput(e.target.value)}
                placeholder="Paste your AIzaSy... API Key here"
                className="w-full bg-surface-container border border-outline-variant/30 focus:border-cyan-500/50 rounded-xl px-4 py-2.5 text-xs text-white outline-none transition-all"
              />
              <p className="text-[10px] text-on-surface-variant leading-relaxed">
                Your key is stored locally in your browser and never leaves your device. Get a free key at{" "}
                <a 
                  href="https://aistudio.google.com/app/apikey" 
                  target="_blank" 
                  rel="noreferrer" 
                  className="text-cyan-400 hover:text-cyan-300 underline font-semibold"
                >
                  Google AI Studio
                </a>.
              </p>
            </div>

            <div className="flex gap-2.5 justify-end pt-2">
              {localStorage.getItem('ai_healthmate_gemini_api_key') && (
                <button
                  type="button"
                  onClick={() => {
                    localStorage.removeItem('ai_healthmate_gemini_api_key');
                    setApiKeyInput('');
                    refreshKeyStatus();
                    setShowSettingsModal(false);
                  }}
                  className="px-4 py-2 rounded-xl bg-red-950/20 border border-red-500/30 text-red-300 hover:bg-red-950/40 text-xs font-semibold cursor-pointer transition-colors"
                >
                  Clear Key
                </button>
              )}
              <button
                type="button"
                onClick={() => setShowSettingsModal(false)}
                className="px-4 py-2 rounded-xl bg-surface-container border border-outline-variant/30 text-on-surface hover:text-white text-xs font-semibold cursor-pointer transition-colors"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => {
                  localStorage.setItem('ai_healthmate_gemini_api_key', apiKeyInput.trim());
                  refreshKeyStatus();
                  setShowSettingsModal(false);
                }}
                className="px-4 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-on-primary text-xs font-bold shadow-lg shadow-cyan-500/10 cursor-pointer transition-all"
              >
                Save Configuration
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}

export default Assistant;
