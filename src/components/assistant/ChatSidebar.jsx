import React, { useState } from 'react';
import { Plus, MessageSquare, Trash2, BookOpen, ChevronDown, ChevronUp, Activity } from 'lucide-react';

const TOPICS = [
  { name: "Dengue & Malaria", query: "What are the differences between dengue and malaria, and how can they be prevented?" },
  { name: "Typhoid Fever", query: "What is typhoid and what water safety steps avoid it?" },
  { name: "Healthy Diet", query: "What foods should I eat to maintain a healthy diet and nutrition?" },
  { name: "Vaccination Guide", query: "Why are vaccines safe and important for infants?" },
  { name: "First Aid Basics", query: "What are first aid directions for minor burns and cuts?" },
  { name: "Clean Water", query: "What are simple ways to make drinking water clean at home?" },
  { name: "Mental Health", query: "What are good daily habits to reduce stress and anxiety?" },
  { name: "Child Care", query: "What are childhood nutrition tips and dehydration prevention guidelines?" }
];

export function ChatSidebar({ 
  conversations, 
  currentConversationId, 
  onSelectConversation, 
  onNewChat, 
  onClearHistory, 
  onSelectTopic,
  isOpen,
  onClose
}) {
  const [topicsOpen, setTopicsOpen] = useState(true);

  return (
    <aside className={`flex flex-col h-full bg-surface-container-lowest/80 border-r border-outline-variant/30 w-[260px] shrink-0 transition-transform duration-300 z-30 ${
      isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
    } fixed lg:static top-0 left-0 bottom-0`}>
      
      {/* Sidebar Header with New Chat */}
      <div className="p-4 flex flex-col gap-3">
        <div className="flex items-center gap-2">
          <Activity className="w-5 h-5 text-cyan-400" />
          <span className="font-bold text-sm text-on-surface">HealthMate Chats</span>
        </div>
        
        <button
          onClick={() => {
            onNewChat();
            if (onClose) onClose();
          }}
          className="flex items-center justify-center gap-2 w-full py-2.5 px-4 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-on-primary font-semibold text-sm transition-all duration-300 shadow-lg shadow-cyan-500/10 cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          New Discussion
        </button>
      </div>

      {/* Conversation List */}
      <div className="flex-1 overflow-y-auto px-3 py-2 scrollbar-thin">
        <span className="text-[10px] uppercase font-mono tracking-widest text-outline px-2 block mb-2">History</span>
        {conversations.length === 0 ? (
          <p className="text-xs text-outline px-2 py-3">No conversations yet.</p>
        ) : (
          <div className="space-y-1">
            {conversations.map((conv) => {
              const isActive = conv.id === currentConversationId;
              return (
                <button
                  key={conv.id}
                  onClick={() => {
                    onSelectConversation(conv.id);
                    if (onClose) onClose();
                  }}
                  className={`flex items-center gap-2.5 w-full text-left p-2.5 rounded-lg text-xs transition-all cursor-pointer ${
                    isActive 
                      ? 'bg-cyan-500/10 border border-cyan-500/35 text-cyan-200' 
                      : 'hover:bg-white/5 border border-transparent text-on-surface-variant hover:text-white'
                  }`}
                >
                  <MessageSquare className={`w-3.5 h-3.5 shrink-0 ${isActive ? 'text-cyan-400' : ''}`} />
                  <span className="truncate flex-1 font-medium">{conv.title}</span>
                </button>
              );
            })}
          </div>
        )}
      </div>

      {/* Suggested Topics Accordion */}
      <div className="border-t border-outline-variant/20 px-3 py-3">
        <button
          onClick={() => setTopicsOpen(!topicsOpen)}
          className="flex items-center justify-between w-full px-2 py-1.5 text-on-surface hover:text-white transition-colors cursor-pointer text-xs font-semibold uppercase tracking-wider font-mono text-left"
        >
          <span className="flex items-center gap-1.5">
            <BookOpen className="w-3.5 h-3.5 text-cyan-400" />
            Suggested Topics
          </span>
          {topicsOpen ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
        </button>

        {topicsOpen && (
          <div className="mt-2 space-y-1 max-h-[200px] overflow-y-auto">
            {TOPICS.map((topic, idx) => (
              <button
                key={idx}
                onClick={() => {
                  onSelectTopic(topic.query);
                  if (onClose) onClose();
                }}
                className="w-full text-left px-2 py-1.5 rounded hover:bg-white/5 text-[11px] text-on-surface-variant hover:text-cyan-300 transition-all truncate cursor-pointer block"
              >
                # {topic.name}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Sidebar Footer with Clear All */}
      <div className="p-3 border-t border-outline-variant/30 bg-surface-container-lowest">
        <button
          onClick={() => {
            if (window.confirm("Are you sure you want to clear your chat history?")) {
              onClearHistory();
            }
          }}
          className="flex items-center justify-center gap-2 w-full py-2 px-3 rounded-lg hover:bg-red-500/10 text-outline-variant hover:text-red-400 text-xs font-medium border border-transparent hover:border-red-500/20 transition-all cursor-pointer"
        >
          <Trash2 className="w-3.5 h-3.5" />
          Clear Conversations
        </button>
      </div>

    </aside>
  );
}

export default ChatSidebar;
