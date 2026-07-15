import React from 'react';
import MaterialIcon from '../UI/MaterialIcon';

import { useNavigate } from 'react-router-dom';
import Container from '../UI/Container';
import SectionTitle from '../UI/SectionTitle';
import GlassPanel from '../UI/GlassPanel';
import Button from '../UI/Button';

function AIAssistantPreview() {
  const navigate = useNavigate();

  const mockDialog = [
    { sender: "user", text: "How do we stop mosquito breeding in the garden?" },
    { sender: "bot", text: "Mosquitoes (Aedes, Anopheles) breed in stagnant water. Drain any collected water in old pots, buckets, and tires weekly. Keep tanks covered." }
  ];

  return (
    <section className="py-20 md:py-28 border-t border-white/5 relative z-10">
      <Container>
        <SectionTitle
          title="AI Health Assistant Preview"
          subtitle="Real-time Interactive Education"
        />

        <div className="max-w-2xl mx-auto flex flex-col gap-6 items-center">
          <GlassPanel className="w-full p-5 flex flex-col gap-4 text-left border border-primary/10">
            {/* Header placeholder */}
            <div className="flex justify-between items-center pb-3 border-b border-white/5">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-primary text-xl" aria-hidden="true">
                  smart_toy
                </span>
                <span className="text-xs font-bold text-secondary uppercase tracking-wider">
                  HealthMate Assistant Preview
                </span>
              </div>
              <span className="w-2.5 h-2.5 rounded-full bg-[#36ffc4] animate-pulse"></span>
            </div>

            {/* Conversation list preview */}
            <div className="space-y-4 py-2">
              {mockDialog.map((msg, index) => {
                const isUser = msg.sender === 'user';
                return (
                  <div key={index} className={`flex ${isUser ? 'justify-end' : 'justify-start'} items-start`}>
                    <div className={`p-3 rounded-xl max-w-[85%] text-xs leading-relaxed ${
                      isUser 
                        ? 'bg-primary text-on-primary font-medium rounded-tr-none' 
                        : 'bg-white/5 border border-white/5 text-on-surface rounded-tl-none'
                    }`}>
                      {msg.text}
                    </div>
                  </div>
                );
              })}
            </div>
          </GlassPanel>

          <Button
            onClick={() => navigate('/assistant')}
            variant="primary"
            iconRight={<MaterialIcon icon="smart_toy" className="text-sm" />}
          >
            Launch Active AI Companion
          </Button>
        </div>
      </Container>
    </section>
  );
}

export default AIAssistantPreview;
