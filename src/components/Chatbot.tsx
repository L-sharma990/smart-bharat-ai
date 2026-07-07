import { useEffect, useRef, useState } from 'react';
import { Bot, Send, Mic, Sparkles, CheckCircle2, Volume2, VolumeX, MicOff } from 'lucide-react';
import { GoogleGenerativeAI } from '@google/generative-ai';
import type { Translation } from '../types';

type Props = { 
  t: Translation;
  triggeredPrompt?: string | null;
  clearTrigger?: () => void;
};

type Msg = { 
  id: number; 
  role: 'user' | 'ai'; 
  text: string; 
  steps?: string[]; 
  isSpeaking?: boolean; 
};

// ==========================================
// 🏆 GEMINI API SETUP & SYSTEM PROMPT
// ==========================================
// MOCK_KEY logic removed completely. It will ONLY use the VITE_GEMINI_API_KEY from .env
const apiKey = import.meta.env.VITE_GEMINI_API_KEY || ""; 
const genAI = new GoogleGenerativeAI(apiKey);

const systemPrompt = `
You are 'SmartBharat AI', an official, highly intelligent, and empathetic Civic Companion for Indian citizens.

CRITICAL LANGUAGE RULE: You MUST detect the EXACT language the user typed in and respond in that SAME language. Examples:
- If user writes in Hindi (हिंदी), reply fully in Hindi.
- If user writes in Punjabi (ਪੰਜਾਬੀ), reply fully in Punjabi.  
- If user writes in Hinglish (mix of Hindi + English like "mujhe income certificate chahiye"), reply in Hinglish.
- If user writes in English, reply in English.
- If user writes in Tamil, Telugu, Bengali, Marathi or ANY other language, reply in THAT language.
NEVER switch languages. Always match the user's language exactly.

You must strictly output your response in valid JSON format ONLY. Do not include markdown like \`\`\`json.

Analyze the user's query and return JSON:
{
  "conversational_reply": "Polite 2-3 sentence reply addressing the user in the EXACT language they used.",
  "actionable_steps": [
    "Step 1: Specific action (in user's language)",
    "Step 2: Where to apply/contact (in user's language)"
  ],
  "documents_required": ["Document 1", "Document 2"],
  "complaint_details": {
    "is_complaint": true or false,
    "department": "Department Name if complaint, else null",
    "ticket_id": "Generate ID like SB-IND-9824 if complaint, else null"
  }
}
`;

export default function Chatbot({ t, triggeredPrompt, clearTrigger }: Props) {
  const c = t.chat;
  const [input, setInput] = useState('');
  const [listening, setListening] = useState(false);
  const [typing, setTyping] = useState(false);
  const [currentlySpeakingId, setCurrentlySpeakingId] = useState<number | null>(null);
  const [messages, setMessages] = useState<Msg[]>([
    {
      id: 1,
      role: 'user',
      text: c.userQ,
    },
    {
      id: 2,
      role: 'ai',
      text: c.aiIntro,
      steps: [c.aiStep1, c.aiStep2, c.aiOutro],
    },
  ]);

  const scrollRef = useRef<HTMLDivElement>(null);
  const idRef = useRef(3);
  const recognitionRef = useRef<any>(null);

  // Auto-scroll on new messages
  useEffect(() => {
    const el = scrollRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [messages, typing]);

  // Load translations & reset welcome
  useEffect(() => {
    setMessages([
      { id: 1, role: 'user', text: c.userQ },
      { id: 2, role: 'ai', text: c.aiIntro, steps: [c.aiStep1, c.aiStep2, c.aiOutro] },
    ]);
    idRef.current = 3;
    stopSpeaking();
  }, [t]);

  // Handle triggered prompts from QuickLinks
  useEffect(() => {
    if (triggeredPrompt) {
      send(triggeredPrompt);
      if (clearTrigger) clearTrigger();
    }
  }, [triggeredPrompt]);

  // Initialize Speech Recognition API
  useEffect(() => {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (SpeechRecognition) {
      const rec = new SpeechRecognition();
      rec.continuous = false;
      rec.interimResults = false;
      
      // Attempt to match the current interface language
      const isHindi = c.title?.includes('नागरिक');
      const isPunjabi = c.title?.includes('ਸਹਾਇਕ');
      rec.lang = isHindi ? 'hi-IN' : isPunjabi ? 'pa-IN' : 'en-IN';

      rec.onstart = () => setListening(true);
      rec.onend = () => setListening(false);
      rec.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        if (transcript) {
          setInput(transcript);
        }
      };
      recognitionRef.current = rec;
    }
  }, [c.title]);

  const suggestions = [c.s1, c.s2, c.s3];

  // ==========================================
  // 🚀 SEND PROMPT & FETCH AI RESPONSE (FAIL-SAFE)
  // ==========================================
  const send = async (text: string) => {
    const trimmed = text.trim();
    if (!trimmed) return;
    
    stopSpeaking();

    setMessages((m) => [...m, { id: idRef.current++, role: 'user', text: trimmed }]);
    setInput('');
    setTyping(true);

    try {
      if (!apiKey || apiKey === "AIzaSyAapki_Asli_Key_Yahan_Aayegi_XYZ") {
         throw new Error("MISSING_KEY");
      }

      const model = genAI.getGenerativeModel({
        model: "gemini-1.5-flash",
        systemInstruction: systemPrompt,
      });

      const result = await model.generateContent(`User Query: "${trimmed}"`);
      const responseText = result.response.text();
      
      // Clean markdown just in case
      let cleanJsonString = responseText.replace(/```json/g, '').replace(/```/g, '').trim();
      let aiData;
      
      // Fail-Safe Parse
      try {
        aiData = JSON.parse(cleanJsonString);
      } catch(e) {
        aiData = { conversational_reply: responseText, actionable_steps: [] };
      }

      // Build actionable list items
      const dynamicSteps: string[] = [];
      if (aiData.actionable_steps) dynamicSteps.push(...aiData.actionable_steps);
      
      if (aiData.documents_required?.length > 0) {
        const docLabel = c.title?.includes('नागरिक') ? 'आवश्यक दस्तावेज' : c.title?.includes('ਸਹਾਇਕ') ? 'ਲੋੜੀਂਦੇ ਦਸਤਾਵੇਜ਼' : 'Required Documents';
        dynamicSteps.push(`${docLabel}: ${aiData.documents_required.join(", ")}`);
      }
      
      if (aiData.complaint_details?.is_complaint) {
        const ticketVal = aiData.complaint_details.ticket_id || aiData.complaint_details.auto_generated_ticket_id || `SB-IND-${Math.floor(1000 + Math.random() * 9000)}`;
        const ticketLabel = c.title?.includes('नागरिक') ? '🎟️ शिकायत टिकट संख्या' : c.title?.includes('ਸਹਾਇਕ') ? '🎟️ ਸ਼ਿਕਾਇਤ ਟਿਕਟ ਨੰਬਰ' : '🎟️ Grievance Ticket';
        dynamicSteps.push(`${ticketLabel}: ${ticketVal} (${aiData.complaint_details.department || 'Municipal Department'})`);
      }

      setMessages((m) => [
        ...m,
        {
          id: idRef.current++,
          role: 'ai',
          text: aiData.conversational_reply || "Here is what I found:",
          steps: dynamicSteps,
        },
      ]);
    } catch (error: any) {
      console.error("Gemini Error:", error);
      
      let errorMsg = "Oops! I encountered a network issue connecting to the AI engine. Please try again.";
      if (error.message === "MISSING_KEY") {
         errorMsg = "API Key Error: Please make sure your .env file has a valid VITE_GEMINI_API_KEY starting with 'AIza' and that you have restarted the Vite server.";
      }

      setMessages((m) => [
        ...m,
        {
          id: idRef.current++,
          role: 'ai',
          text: errorMsg,
        },
      ]);
    } finally {
      setTyping(false);
    }
  };

  // Text to Speech logic
  const speakMessage = (msgId: number, text: string) => {
    if (currentlySpeakingId === msgId) {
      stopSpeaking();
      return;
    }
    
    stopSpeaking();
    const utterance = new SpeechSynthesisUtterance(text);
    
    // Detect voice language parameters
    if (/[\u0900-\u097F]/.test(text)) {
      utterance.lang = 'hi-IN';
    } else if (/[\u0A00-\u0A7F]/.test(text)) {
      utterance.lang = 'pa-IN';
    } else {
      utterance.lang = 'en-IN';
    }

    utterance.onend = () => {
      setCurrentlySpeakingId(null);
    };
    utterance.onerror = () => {
      setCurrentlySpeakingId(null);
    };

    setCurrentlySpeakingId(msgId);
    window.speechSynthesis.speak(utterance);
  };

  const stopSpeaking = () => {
    window.speechSynthesis.cancel();
    setCurrentlySpeakingId(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    send(input);
  };

  const toggleMic = () => {
    if (!recognitionRef.current) {
      alert("Voice recognition is not supported in this browser. Please use Chrome/Edge.");
      return;
    }

    if (listening) {
      recognitionRef.current.stop();
    } else {
      recognitionRef.current.start();
    }
  };

  return (
    <div
      id="chat"
      className="flex h-[660px] flex-col overflow-hidden rounded-3xl border border-slate-200/90 bg-white shadow-2xl shadow-navy-900/10 animate-fade-in-up"
    >
      {/* Premium Header */}
      <div className="relative flex items-center gap-3 bg-gradient-to-r from-navy-800 via-navy-900 to-navy-950 px-6 py-4.5">
        <div className="absolute inset-x-0 top-0 h-1 tricolor-bar" />
        <span className="relative grid place-items-center h-12 w-12 rounded-xl bg-white/10 ring-1 ring-white/20 backdrop-blur shadow-inner">
          <Bot className="h-6 w-6 text-white animate-pulse" />
          <span className="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full bg-bharat-green-500 ring-2 ring-navy-950 animate-glow-pulse" />
        </span>
        <div className="leading-tight">
          <h3 className="font-display text-base sm:text-lg font-bold text-white flex items-center gap-1.5">
            {c.title || "Civic AI Assistant"}
          </h3>
          <p className="flex items-center gap-1.5 text-xs text-navy-200">
            <span className="h-2 w-2 rounded-full bg-bharat-green-400 animate-pulse-dot" />
            Online · Powered by Gemini Flash
          </p>
        </div>
        <span className="ml-auto inline-flex items-center gap-1 rounded-full bg-saffron-500/20 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-saffron-300 ring-1 ring-saffron-500/30">
          <Sparkles className="h-3 w-3 text-saffron-400" />
          Live AI Agent
        </span>
      </div>

      {/* Messages */}
      <div ref={scrollRef} className="scroll-thin flex-1 space-y-4.5 overflow-y-auto bg-slate-50/70 px-5 py-6">
        {messages.map((m) => (
          <div key={m.id} className={`flex items-start gap-3 animate-fade-in ${m.role === 'user' ? 'flex-row-reverse' : ''}`}>
            <Avatar role={m.role} />
            <div
              className={`relative group max-w-[85%] rounded-2xl px-4 py-3 text-sm leading-relaxed shadow-sm transition-all duration-300 border ${
                m.role === 'user'
                  ? 'rounded-tr-sm bg-gradient-to-br from-navy-700 to-navy-800 text-white border-navy-700/50'
                  : 'rounded-tl-sm bg-white text-slate-700 border-slate-200/80 hover:border-slate-300'
              }`}
            >
              {/* Message text */}
              <p>{m.text}</p>
              
              {/* Message sub-steps */}
              {m.steps && m.steps.length > 0 && (
                <ul className="mt-3 space-y-2 border-t border-slate-100 pt-2.5">
                  {m.steps.map((s, i) => {
                    const isOutro = i === m.steps!.length - 1;
                    const isTicket = s.includes('🎟️') || s.includes('Ticket') || s.includes('ਟਿਕਟ') || s.includes('टिकट');
                    
                    return (
                      <li key={i} className="flex gap-2">
                        {isTicket ? (
                          <div className="mt-0.5 inline-flex items-center gap-1 rounded bg-bharat-green-50 px-1.5 py-0.5 text-xs font-bold text-bharat-green-700 border border-bharat-green-200 animate-scale-in">
                            <CheckCircle2 className="h-3.5 w-3.5" />
                            <span>{s}</span>
                          </div>
                        ) : (
                          <>
                            <span className="mt-0.5 grid place-items-center h-4.5 w-4.5 shrink-0 rounded-full bg-navy-50 text-[10px] font-bold text-navy-700 border border-navy-100/50">
                              {i + 1}
                            </span>
                            <span className={isOutro ? 'font-medium text-slate-900' : 'text-slate-650'}>{s}</span>
                          </>
                        )}
                      </li>
                    );
                  })}
                </ul>
              )}

              {/* Text-to-speech Trigger */}
              {m.role === 'ai' && (
                <button
                  onClick={() => speakMessage(m.id, m.text)}
                  className="absolute right-2 top-2 opacity-0 group-hover:opacity-100 p-1.5 rounded-lg bg-slate-50 hover:bg-navy-50 text-slate-400 hover:text-navy-600 border border-slate-150 transition-all duration-300 cursor-pointer shadow-sm"
                  title="Speak Response"
                >
                  {currentlySpeakingId === m.id ? (
                    <VolumeX className="h-3.5 w-3.5 animate-pulse text-saffron-500" />
                  ) : (
                    <Volume2 className="h-3.5 w-3.5" />
                  )}
                </button>
              )}
            </div>
          </div>
        ))}
        
        {/* Typing bubble */}
        {typing && (
          <div className="flex items-start gap-3">
            <Avatar role="ai" />
            <div className="rounded-2xl rounded-tl-sm bg-white border border-slate-200/80 px-5 py-3.5 shadow-sm animate-scale-in">
              <div className="flex items-center gap-1.5">
                <span className="h-2 w-2 rounded-full bg-navy-400 animate-bounce" style={{ animationDelay: '0s' }} />
                <span className="h-2 w-2 rounded-full bg-navy-400 animate-bounce" style={{ animationDelay: '0.2s' }} />
                <span className="h-2 w-2 rounded-full bg-navy-400 animate-bounce" style={{ animationDelay: '0.4s' }} />
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Suggested Queries */}
      <div className="border-t border-slate-100 bg-white px-5 pt-3">
        <p className="mb-2 text-[10px] font-bold uppercase tracking-wider text-slate-400">{c.suggestions}</p>
        <div className="flex flex-wrap gap-2 pb-1.5">
          {suggestions.map((s) => (
            <button
              key={s}
              onClick={() => send(s)}
              className="rounded-full border border-slate-200 bg-slate-50/50 hover:bg-navy-50 px-3.5 py-1.5 text-xs font-semibold text-slate-600 hover:border-navy-400 hover:text-navy-700 transition-all duration-300 cursor-pointer hover:-translate-y-0.5 shadow-sm"
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      {/* Inputs Form */}
      <form onSubmit={handleSubmit} className="flex items-center gap-2.5 border-t border-slate-100 bg-white px-5 py-3.5">
        <button
          type="button"
          onClick={toggleMic}
          className={`grid place-items-center h-10 w-10 shrink-0 rounded-xl transition-all duration-300 cursor-pointer shadow-sm ${
            listening
              ? 'bg-saffron-500 text-white animate-pulse shadow-saffron-500/30'
              : 'bg-slate-100 text-slate-500 hover:bg-slate-200 hover:text-slate-800'
          }`}
          aria-label="Voice Input"
          title="Voice Input (Hindi/Punjabi/English)"
        >
          {listening ? <MicOff className="h-5 w-5" /> : <Mic className="h-5 w-5" />}
        </button>
        
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={listening ? 'Listening… speak now in any language' : c.placeholder}
          className="min-w-0 flex-1 rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm text-slate-700 placeholder:text-slate-400 focus:border-navy-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-navy-100/50 transition-all"
        />
        
        <button
          type="submit"
          disabled={!input.trim()}
          className="inline-flex items-center gap-1.5 rounded-xl bg-gradient-to-r from-navy-700 to-navy-800 hover:from-navy-850 hover:to-navy-900 px-4.5 py-2.5 text-sm font-bold text-white shadow-md shadow-navy-700/20 hover:shadow-lg disabled:cursor-not-allowed disabled:opacity-40 disabled:shadow-none transition-all cursor-pointer"
        >
          <Send className="h-4 w-4" />
          <span className="hidden sm:inline">{c.send}</span>
        </button>
      </form>
    </div>
  );
}

function Avatar({ role }: { role: 'user' | 'ai' }) {
  if (role === 'ai') {
    return (
      <span className="grid place-items-center h-8.5 w-8.5 shrink-0 rounded-xl bg-gradient-to-br from-navy-800 to-navy-900 text-white shadow-sm ring-1 ring-white/10">
        <Bot className="h-5 w-5" />
      </span>
    );
  }
  return (
    <span className="grid place-items-center h-8.5 w-8.5 shrink-0 rounded-xl bg-gradient-to-tr from-saffron-100 to-saffron-200 text-saffron-800 border border-saffron-200/50 shadow-sm text-xs font-bold font-display">
      IN
    </span>
  );
}