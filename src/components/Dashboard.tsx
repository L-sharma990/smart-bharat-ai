import { useState } from 'react';
import Chatbot from './Chatbot';
import QuickLinks from './QuickLinks';
import { Landmark, Clock, ShieldCheck } from 'lucide-react';
import type { Translation } from '../types';

type Props = { t: Translation };

export default function Dashboard({ t }: Props) {
  const [triggeredPrompt, setTriggeredPrompt] = useState<string | null>(null);

  const features = [
    { icon: Landmark, label: 'Govt-Verified Info' },
    { icon: Clock, label: 'Real-time Redressal' },
    { icon: ShieldCheck, label: 'Secure & Enrypted' },
  ];

  const handleQuickLinkTrigger = (promptText: string) => {
    setTriggeredPrompt(promptText);
  };

  return (
    <section id="track" className="relative py-10 sm:py-16 bg-slate-50/30">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-10 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between animate-fade-in-up">
          <div>
            <span className="inline-flex items-center gap-1.5 rounded-md bg-navy-50 px-2.5 py-1 text-xs font-semibold text-navy-800 border border-navy-100">
              Civic Workspace
            </span>
            <h2 className="mt-2.5 font-display text-3xl sm:text-4xl font-extrabold text-navy-900 tracking-tight">
              One-Stop Interactive Dashboard
            </h2>
            <p className="mt-2 max-w-2xl text-sm sm:text-base text-slate-500 leading-relaxed">
              Interact with the AI companion directly, check scheme documents, or file complaints. Clicking any workspace card below will instantly load that flow in the AI chat.
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            {features.map((f) => (
              <span
                key={f.label}
                className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200/80 bg-white px-3 py-2 text-xs font-semibold text-slate-700 shadow-sm hover:border-navy-300 transition-colors"
              >
                <f.icon className="h-4 w-4 text-navy-600 animate-pulse" />
                {f.label}
              </span>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-5">
          {/* Left: Chatbot (prominent, 3/5) */}
          <div className="lg:col-span-3">
            <Chatbot 
              t={t} 
              triggeredPrompt={triggeredPrompt} 
              clearTrigger={() => setTriggeredPrompt(null)} 
            />
          </div>

          {/* Right: Quick links (2/5) */}
          <div id="resources" className="lg:col-span-2">
            <QuickLinks t={t} onTriggerPrompt={handleQuickLinkTrigger} />
          </div>
        </div>
      </div>
    </section>
  );
}
