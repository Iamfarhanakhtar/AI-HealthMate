import React from 'react';
import { BrainCircuit, Radio, WifiOff, Settings, AlertCircle, Database } from 'lucide-react';

export function AIAvatar({ providerStatus, onOpenSettings }) {
  // Determine connection status text and icon
  let statusBadge = null;

  if (providerStatus === 'offline') {
    statusBadge = (
      <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs">
        <WifiOff className="w-3.5 h-3.5" />
        <span className="font-medium hidden sm:inline">Offline Mode</span>
      </div>
    );
  } else if (providerStatus === 'missing_key') {
    statusBadge = (
      <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-red-500/10 border border-red-500/20 text-red-400 text-xs">
        <Settings className="w-3.5 h-3.5" />
        <span className="font-medium hidden sm:inline">Configuration Required</span>
      </div>
    );
  } else if (providerStatus === 'temporarily_unavailable') {
    statusBadge = (
      <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs">
        <AlertCircle className="w-3.5 h-3.5" />
        <span className="font-medium hidden sm:inline">Live AI temporarily unavailable</span>
      </div>
    );
  } else {
    statusBadge = (
      <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs">
        <Radio className="w-3.5 h-3.5 animate-pulse" />
        <span className="font-medium hidden sm:inline">Live Gemini AI</span>
      </div>
    );
  }

  const showConfigureButton = providerStatus === 'missing_key';
  const indicatorColor = (providerStatus === 'offline' || providerStatus === 'temporarily_unavailable') 
    ? 'bg-amber-500' 
    : providerStatus === 'missing_key' 
      ? 'bg-red-500' 
      : 'bg-emerald-500';

  const indicatorPingColor = (providerStatus === 'offline' || providerStatus === 'temporarily_unavailable') 
    ? 'bg-amber-400' 
    : providerStatus === 'missing_key' 
      ? 'bg-red-400' 
      : 'bg-emerald-400';

  return (
    <div className="flex items-center justify-between px-6 py-4 border-b border-outline-variant/30 bg-surface-container-lowest/60 backdrop-blur-md">
      <div className="flex items-center gap-3">
        {/* Avatar container with pulse animation */}
        <div className="relative">
          <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center">
            <BrainCircuit className="w-5 h-5 text-cyan-400" />
          </div>
          {/* Status Indicator Dot */}
          <span className={`absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full border-2 border-surface-container-lowest flex items-center justify-center ${indicatorColor}`}>
            <span className={`absolute w-full h-full rounded-full opacity-75 animate-ping ${indicatorPingColor}`}></span>
          </span>
        </div>
 
        <div>
          <div className="flex items-center gap-2">
            <h2 className="font-semibold text-sm text-on-surface">AI HealthMate</h2>
            <span className="text-[10px] uppercase font-mono tracking-widest px-1.5 py-0.5 rounded bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
              Assistant
            </span>
          </div>
          <p className="text-xs text-on-surface-variant">Educational Health Guide</p>
        </div>
      </div>

      {/* Dynamic connection status badge and settings button */}
      <div className="flex items-center gap-2.5">
        {statusBadge}
        {showConfigureButton && (
          <button
            onClick={onOpenSettings}
            className="p-1.5 sm:px-3 sm:py-1.5 rounded-xl bg-surface-container hover:bg-surface-container-high border border-outline-variant/30 text-on-surface hover:text-white transition-all cursor-pointer flex items-center justify-center gap-1.5 text-xs font-semibold shadow-lg shadow-black/10"
            title="Configure Gemini API Key"
          >
            <Settings className="w-3.5 h-3.5 text-cyan-400" />
            <span className="hidden sm:inline">Configure Key</span>
          </button>
        )}
      </div>
    </div>
  );
}

export default AIAvatar;
