import { AlertTriangle, FileText, Activity, Folder, ArrowRight } from 'lucide-react';
import type { Translation } from '../types';

type Props = { 
  t: Translation;
  onTriggerPrompt: (prompt: string) => void;
};

const ACCENTS = [
  {
    key: 'report',
    icon: AlertTriangle,
    titleKey: 'reportTitle',
    descKey: 'reportDesc',
    samplePrompt: {
      English: 'Report a broken streetlight on Main Street.',
      Hindi: 'मेन स्ट्रीट पर टूटी स्ट्रीटलाइट की रिपोर्ट करें।',
      Punjabi: 'ਮੇਨ ਸਟ੍ਰੀਟ ਤੇ ਟੁੱਟੀ ਸਟ੍ਰੀਟਲਾਈਟ ਦੀ ਰਿਪੋਰਟ ਕਰੋ।'
    },
    ring: 'group-hover:ring-saffron-200',
    iconBg: 'bg-saffron-50 text-saffron-600 group-hover:bg-saffron-500 group-hover:text-white',
    bar: 'bg-saffron-500',
    glow: 'group-hover:shadow-saffron-500/20',
  },
  {
    key: 'schemes',
    icon: FileText,
    titleKey: 'schemesTitle',
    descKey: 'schemesDesc',
    samplePrompt: {
      English: 'What scholarship schemes are available for students?',
      Hindi: 'छात्रों के लिए कौन सी छात्रवृत्ति योजनाएं उपलब्ध हैं?',
      Punjabi: 'ਵਿਦਿਆਰਥੀਆਂ ਲਈ ਕਿਹੜੀਆਂ ਵਜ਼ੀਫ਼ਾ ਯੋਜਨਾਵਾਂ ਉਪਲਬਧ ਹਨ?'
    },
    ring: 'group-hover:ring-navy-200',
    iconBg: 'bg-navy-50 text-navy-600 group-hover:bg-navy-700 group-hover:text-white',
    bar: 'bg-navy-700',
    glow: 'group-hover:shadow-navy-700/20',
  },
  {
    key: 'track',
    icon: Activity,
    titleKey: 'trackTitle',
    descKey: 'trackDesc',
    samplePrompt: {
      English: 'Track complaint status for ticket SB-IND-9824',
      Hindi: 'टिकट संख्या SB-IND-9824 की स्थिति ट्रैक करें',
      Punjabi: 'ਟਿਕਟ ਨੰਬਰ SB-IND-9824 ਦੀ ਸਥਿਤੀ ਟਰੈਕ ਕਰੋ'
    },
    ring: 'group-hover:ring-bharat-green-200',
    iconBg: 'bg-bharat-green-50 text-bharat-green-600 group-hover:bg-bharat-green-500 group-hover:text-white',
    bar: 'bg-bharat-green-500',
    glow: 'group-hover:shadow-bharat-green-500/20',
  },
  {
    key: 'docs',
    icon: Folder,
    titleKey: 'docsTitle',
    descKey: 'docsDesc',
    samplePrompt: {
      English: 'What documents are required to apply for an Income Certificate?',
      Hindi: 'आय प्रमाणपत्र के लिए आवेदन करने के लिए कौन से दस्तावेज आवश्यक हैं?',
      Punjabi: 'ਆਮਦਨੀ ਸਰਟੀਫਿਕੇਟ ਲਈ ਅਰਜ਼ੀ ਦੇਣ ਲਈ ਕਿਹੜੇ ਦਸਤਾਵੇਜ਼ ਲੋੜੀਂਦੇ ਹਨ?'
    },
    ring: 'group-hover:ring-grape-200',
    iconBg: 'bg-grape-50 text-grape-600 group-hover:bg-grape-500 group-hover:text-white',
    bar: 'bg-grape-500',
    glow: 'group-hover:shadow-grape-500/20',
  },
] as const;

export default function QuickLinks({ t, onTriggerPrompt }: Props) {
  // Determine current active translation language by matching titles
  const isHindi = t.chat.title.includes('नागरिक');
  const isPunjabi = t.chat.title.includes('ਸਹਾਇਕ');
  const currentLangKey = isHindi ? 'Hindi' : isPunjabi ? 'Punjabi' : 'English';

  return (
    <div id="services" className="grid h-full grid-cols-1 gap-4 sm:grid-cols-2">
      {ACCENTS.map((a, idx) => {
        const Icon = a.icon;
        const title = t.cards[a.titleKey as keyof typeof t.cards];
        const desc = t.cards[a.descKey as keyof typeof t.cards];
        const promptText = a.samplePrompt[currentLangKey];

        return (
          <button
            key={a.key}
            onClick={() => onTriggerPrompt(promptText)}
            className={`group relative flex flex-col text-left overflow-hidden rounded-2xl border border-slate-200 bg-white p-5 shadow-sm ring-1 ring-transparent ${a.ring} ${a.glow} transition-all duration-300 hover:-translate-y-1 hover:shadow-xl animate-fade-in-up cursor-pointer`}
            style={{ animationDelay: `${idx * 80}ms` }}
          >
            {/* Top accent bar */}
            <span className={`absolute inset-x-0 top-0 h-1 ${a.bar} origin-left scale-x-0 transition-transform duration-300 group-hover:scale-x-100`} />

            {/* Soft corner glow */}
            <span className={`pointer-events-none absolute -right-8 -top-8 h-24 w-24 rounded-full ${a.bar} opacity-0 blur-2xl transition-opacity duration-300 group-hover:opacity-10`} />

            <div className="flex items-start justify-between w-full">
              <span
                className={`grid place-items-center h-12 w-12 rounded-xl ${a.iconBg} transition-all duration-300`}
              >
                <Icon className="h-6 w-6" strokeWidth={2.1} />
              </span>
              <ArrowRight className="h-4 w-4 text-slate-300 transition-all duration-300 group-hover:translate-x-1 group-hover:text-slate-500" />
            </div>

            <div className="mt-4">
              <h4 className="font-display text-base font-bold text-slate-800 group-hover:text-navy-900 transition-colors">
                {title}
              </h4>
              <p className="mt-1 text-sm leading-relaxed text-slate-500">{desc}</p>
            </div>

            <span className="mt-auto pt-4 text-xs font-bold uppercase tracking-wide text-navy-600 group-hover:text-navy-800 flex items-center gap-1.5 transition-colors">
              {t.cards.action}
              <span className="text-[10px] lowercase text-slate-400 font-normal">(clicks to prompt)</span>
            </span>
          </button>
        );
      })}
    </div>
  );
}
