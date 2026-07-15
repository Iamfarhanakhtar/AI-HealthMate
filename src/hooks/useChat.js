import { useState, useEffect, useCallback, useRef } from 'react';
import { geminiService, isGeminiConfigured } from '../services/geminiService';
import { offlineService } from '../services/offlineService';
import { responseFormatter } from '../utils/responseFormatter';
import { analytics } from '../utils/analytics';

const CONVERSATIONS_KEY = 'ai_healthmate_chat_history_v1';
const CURRENT_CONV_ID_KEY = 'ai_healthmate_current_conv_id';

export function useChat() {
  const [conversations, setConversations] = useState([]);
  const [currentConversationId, setCurrentConversationId] = useState(null);
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [offlineMode, setOfflineMode] = useState(!navigator.onLine);
  const [isKeyConfigured, setIsKeyConfigured] = useState(isGeminiConfigured());

  const refreshKeyStatus = useCallback(() => {
    const configured = isGeminiConfigured();
    setIsKeyConfigured(configured);
    if (configured && navigator.onLine) {
      setOfflineMode(false);
    }
  }, []);

  useEffect(() => {
    setIsKeyConfigured(isGeminiConfigured());
  }, []);

  // Monitor online status
  useEffect(() => {
    const handleOnline = () => setOfflineMode(false);
    const handleOffline = () => setOfflineMode(true);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  // One-time offline migration script
  const performMigration = () => {
    try {
      const migrationKey = "aiHealthMateChatMigrationVersion";
      const targetVersion = "gemini-live-v1";
      
      if (localStorage.getItem(migrationKey) === targetVersion) {
        return; // Already migrated
      }

      const stored = localStorage.getItem(CONVERSATIONS_KEY);
      if (stored) {
        let history = JSON.parse(stored);
        
        // Filter out conversations that contain offline mode phrasing
        history = history.filter(conv => {
          if (!conv.messages) return false;
          const hasOfflineMessage = conv.messages.some(msg => {
            if (!msg.content) return false;
            const text = msg.content.toLowerCase();
            return (
              text.includes("i am currently in offline mode") ||
              text.includes("offline mode") ||
              text.includes("local fallback") ||
              text.includes("couldn't find a specific guide")
            );
          });
          return !hasOfflineMessage;
        });
        
        localStorage.setItem(CONVERSATIONS_KEY, JSON.stringify(history));
      }
      
      localStorage.setItem(migrationKey, targetVersion);
    } catch (e) {
      console.error("Migration failed:", e);
    }
  };

  // Load conversations from local storage on mount
  useEffect(() => {
    try {
      performMigration();
      const stored = localStorage.getItem(CONVERSATIONS_KEY);
      const history = stored ? JSON.parse(stored) : [];
      setConversations(history);

      const lastConvId = localStorage.getItem(CURRENT_CONV_ID_KEY);
      if (lastConvId && history.find(c => c.id === lastConvId)) {
        setCurrentConversationId(lastConvId);
        setMessages(history.find(c => c.id === lastConvId).messages || []);
      } else if (history.length > 0) {
        setCurrentConversationId(history[0].id);
        setMessages(history[0].messages || []);
      } else {
        // Start first empty chat
        startNewChat();
      }
    } catch (e) {
      console.error("Failed to load chat history from localStorage", e);
    }
  }, []);

  // Helper to save history to local storage
  const saveToStorage = useCallback((updatedConversations) => {
    try {
      localStorage.setItem(CONVERSATIONS_KEY, JSON.stringify(updatedConversations));
    } catch (e) {
      console.error("Failed to write chat history to localStorage", e);
    }
  }, []);

  // Helper: Start new chat session
  const startNewChat = useCallback(() => {
    const newId = `chat_${Date.now()}`;
    const newConv = {
      id: newId,
      title: "New Health Chat",
      timestamp: new Date().toISOString(),
      messages: []
    };

    setConversations(prev => {
      const updated = [newConv, ...prev];
      saveToStorage(updated);
      return updated;
    });
    setCurrentConversationId(newId);
    setMessages([]);
    localStorage.setItem(CURRENT_CONV_ID_KEY, newId);
    analytics.logEvent('Chat Started', { id: newId });
  }, [saveToStorage]);

  // Helper: Switch active conversation
  const selectConversation = useCallback((id) => {
    const match = conversations.find(c => c.id === id);
    if (match) {
      setCurrentConversationId(id);
      setMessages(match.messages || []);
      localStorage.setItem(CURRENT_CONV_ID_KEY, id);
    }
  }, [conversations]);

  // Helper: Clear history entirely
  const clearAllConversations = useCallback(() => {
    localStorage.removeItem(CONVERSATIONS_KEY);
    localStorage.removeItem(CURRENT_CONV_ID_KEY);
    setConversations([]);
    setMessages([]);
    startNewChat();
    analytics.logEvent('Conversation Cleared');
  }, [startNewChat]);

  // Helper: Log message ratings (👍/👎)
  const rateMessage = useCallback((messageId, ratingType) => {
    setMessages(prev => {
      const updated = prev.map(msg => {
        if (msg.id === messageId) {
          const currentRating = msg.rating;
          const newRating = currentRating === ratingType ? null : ratingType;

          // Telemetry
          if (newRating === 'like') {
            analytics.logEvent('Helpful Response', { messageId });
          } else if (newRating === 'dislike') {
            analytics.logEvent('Unhelpful Response', { messageId });
          }

          return { ...msg, rating: newRating };
        }
        return msg;
      });

      // Persist in local storage
      setConversations(prevConvs => {
        const updatedConvs = prevConvs.map(c => {
          if (c.id === currentConversationId) {
            return { ...c, messages: updated };
          }
          return c;
        });
        saveToStorage(updatedConvs);
        return updatedConvs;
      });

      return updated;
    });
  }, [currentConversationId, saveToStorage]);

  // Handle offline fallback responses
  const handleOfflineFallback = useCallback(async (queryText, targetMsgId, reason = 'offline') => {
    try {
      await new Promise(resolve => setTimeout(resolve, 800));
      const localGuide = offlineService.getResponse(queryText);
      
      let customDisclaimer = localGuide.disclaimer;
      if (reason === 'missing_key') {
        customDisclaimer = "AI is not configured. Please add VITE_GEMINI_API_KEY.";
      } else if (reason === 'api_error' || reason === 'rate_limit' || reason === 'unknown') {
        customDisclaimer = "Live AI is temporarily unavailable. Showing local educational guidance.";
      } else if (reason === 'offline') {
        customDisclaimer = "Offline Mode: no internet connection is active.";
      }
      
      const finalOfflineMsg = {
        id: targetMsgId,
        sender: 'assistant',
        content: `[SUMMARY]\n${localGuide.summary}\n\n[KEY_POINTS]\n${localGuide.keyPoints.map(p => `- ${p}`).join('\n')}\n\n[PREVENTION]\n${localGuide.prevention.map(p => `- ${p}`).join('\n')}\n\n[CONSULT]\n${localGuide.consult}\n\n[DISCLAIMER]\n${customDisclaimer}`,
        parsedContent: { ...localGuide, disclaimer: customDisclaimer },
        timestamp: new Date().toISOString(),
        isStreaming: false,
        rating: null
      };

      setMessages(prev => {
        const replaced = prev.map(m => m.id === targetMsgId ? finalOfflineMsg : m);
        // Persist
        setConversations(prevConvs => {
          const updated = prevConvs.map(c => c.id === currentConversationId ? { ...c, messages: replaced } : c);
          saveToStorage(updated);
          return updated;
        });
        return replaced;
      });

      analytics.logEvent('Response Generated', { provider: 'offline_database' });
    } catch (err) {
      setError("Offline system encountered a query error.");
    } finally {
      setIsLoading(false);
    }
  }, [currentConversationId, saveToStorage]);

  // Send a message
  const sendMessage = useCallback(async (text) => {
    if (!text.trim() || isLoading) return;

    setError(null);
    setIsLoading(true);

    const userMsgId = `msg_user_${Date.now()}`;
    const assistantMsgId = `msg_ai_${Date.now() + 1}`;
    const userText = text.trim();

    // User Message Object
    const newUserMsg = {
      id: userMsgId,
      sender: 'user',
      content: userText,
      timestamp: new Date().toISOString()
    };

    // Update active UI state
    let updatedMsgs = [...messages, newUserMsg];
    setMessages(updatedMsgs);

    // Update session title based on first query
    let currentTitle = "New Health Chat";
    setConversations(prev => {
      const updated = prev.map(c => {
        if (c.id === currentConversationId) {
          currentTitle = c.messages.length === 0 ? (userText.substring(0, 30) + (userText.length > 30 ? '...' : '')) : c.title;
          return {
            ...c,
            title: currentTitle,
            messages: updatedMsgs
          };
        }
        return c;
      });
      saveToStorage(updated);
      return updated;
    });

    analytics.logEvent('Question Asked', { text: userText });

    // Assistant placeholder message object
    const assistantPlaceholder = {
      id: assistantMsgId,
      sender: 'assistant',
      content: "",
      parsedContent: {
        summary: "Typing response...",
        keyPoints: [],
        prevention: [],
        consult: "",
        disclaimer: ""
      },
      timestamp: new Date().toISOString(),
      isStreaming: true,
      rating: null
    };

    // Append placeholder
    setMessages(prev => [...prev, assistantPlaceholder]);

    if (!navigator.onLine) {
      await handleOfflineFallback(userText, assistantMsgId, 'offline');
      return;
    } else if (!isGeminiConfigured()) {
      await handleOfflineFallback(userText, assistantMsgId, 'missing_key');
      return;
    }

    // Online Mode - Stream from Gemini API
    try {
      let fullTextAccumulator = "";
      const streamGenerator = geminiService.sendMessageStream(userText, messages);

      for await (const chunk of streamGenerator) {
        fullTextAccumulator += chunk;
        
        // Parse parsedContent dynamically during stream so user sees sections form in real-time
        const parsed = responseFormatter.parse(fullTextAccumulator);

        setMessages(prev => {
          return prev.map(m => {
            if (m.id === assistantMsgId) {
              return {
                ...m,
                content: fullTextAccumulator,
                parsedContent: parsed
              };
            }
            return m;
          });
        });
      }

      // Finish streaming update
      setMessages(prev => {
        const finalMsgs = prev.map(m => {
          if (m.id === assistantMsgId) {
            return {
              ...m,
              isStreaming: false,
              parsedContent: responseFormatter.parse(fullTextAccumulator)
            };
          }
          return m;
        });

        // Persist completed conversation
        setConversations(prevConvs => {
          const updated = prevConvs.map(c => {
            if (c.id === currentConversationId) {
              return { ...c, messages: finalMsgs };
            }
            return c;
          });
          saveToStorage(updated);
          return updated;
        });

        return finalMsgs;
      });

      analytics.logEvent('Response Generated', { provider: 'gemini_api' });
    } catch (err) {
      console.error("Chat communication failure:", err);
      
      let reason = 'unknown';
      if (err.message === 'RATE_LIMIT') {
        reason = 'rate_limit';
      } else if (err.message === 'API_KEY_MISSING' || err.message === 'INVALID_KEY') {
        reason = 'missing_key';
      } else {
        reason = 'api_error';
      }

      await handleOfflineFallback(userText, assistantMsgId, reason);
    } finally {
      setIsLoading(false);
    }
  }, [messages, isLoading, currentConversationId, offlineMode, saveToStorage, handleOfflineFallback]);

  // Helper: Regenerate last assistant response
  const regenerateLastResponse = useCallback(() => {
    if (messages.length < 2 || isLoading) return;
    
    // Find the last user message
    let lastUserIndex = -1;
    for (let i = messages.length - 1; i >= 0; i--) {
      if (messages[i].sender === 'user') {
        lastUserIndex = i;
        break;
      }
    }

    if (lastUserIndex !== -1) {
      const userText = messages[lastUserIndex].content;
      // Truncate message history back to the user message
      const truncatedMessages = messages.slice(0, lastUserIndex + 1);
      setMessages(truncatedMessages);
      sendMessage(userText);
    }
  }, [messages, isLoading, sendMessage]);

  return {
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
  };
}
export default useChat;
