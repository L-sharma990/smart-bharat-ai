import { ArrowRight, Sparkles, ShieldCheck, Zap, Star } from 'lucide-react';
import type { Translation } from '../types';

type Props = { t: Translation };

function renderTitle(title: string) {
  const parts = title.split(',');
  return parts.map((part, i) => (
    <span key={i}>
      {i < parts.length - 1 ? (
        <>
          {part}
          <span className="text-saffron-500 animate-pulse">,</span>
        </>
      ) : (
        <span className="bg-gradient-to-r from-saffron-600 via-navy-600 to-bharat-green-600 bg-clip-text text-transparent font-extrabold">
          {part}
        </span>
      )}
    </span>
  ));
}

export default function Hero({ t }: Props) {
  const stats = [
    { value: '28+', label: 'States & UTs Covered', color: 'border-saffron-200 text-saffron-700 bg-saffron-50/50' },
    { value: '120+', label: 'Govt Services Integrated', color: 'border-navy-200 text-navy-700 bg-navy-50/50' },
    { value: '24/7', label: 'Instant AI Support', color: 'border-bharat-green-200 text-bharat-green-700 bg-bharat-green-50/50' },
  ];

  return (
    <section id="home" className="relative overflow-hidden pt-28 pb-14 sm:pt-36 sm:pb-20 hero-pattern dot-pattern">
      {/* Decorative background elements */}
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        {/* Saffron Glowing Orb */}
        <div className="absolute -top-40 -right-40 h-[500px] w-[500px] rounded-full bg-gradient-to-br from-saffron-200/40 to-saffron-300/10 blur-3xl opacity-75 animate-float" />
        
        {/* Green Glowing Orb */}
        <div className="absolute top-60 -left-40 h-[450px] w-[450px] rounded-full bg-gradient-to-tr from-bharat-green-200/30 to-bharat-green-300/10 blur-3xl opacity-70 animate-float-delayed" />
        
        {/* Navy Center Subtle Ambient Light */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 h-[350px] w-[600px] rounded-full bg-navy-100/30 blur-3xl" />
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative">
        <div className="mx-auto max-w-4xl text-center">
          {/* Saffron Accent Badge */}
          <span className="inline-flex items-center gap-2 rounded-full border border-saffron-200 bg-saffron-50/70 px-4 py-1.5 text-xs font-semibold text-saffron-800 shadow-sm backdrop-blur-md animate-fade-in-up hover-lift cursor-default">
            <Sparkles className="h-3.5 w-3.5 text-saffron-500 animate-spin-slow" />
            {t.hero.badge}
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-saffron-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-saffron-500"></span>
            </span>
          </span>

          <h1
            className="mt-6 font-display text-4xl sm:text-5xl lg:text-7xl font-extrabold tracking-tight text-navy-900 leading-[1.1] sm:leading-[1.15] animate-fade-in-up"
            style={{ animationDelay: '100ms' }}
          >
            {renderTitle(t.hero.title)}
          </h1>

          <p
            className="mx-auto mt-6 max-w-3xl text-base sm:text-xl text-slate-600 leading-relaxed font-normal animate-fade-in-up"
            style={{ animationDelay: '200ms' }}
          >
            {t.hero.subtitle}
          </p>

          <div
            className="mt-9 flex flex-wrap items-center justify-center gap-4 animate-fade-in-up"
            style={{ animationDelay: '300ms' }}
          >
            <a
              href="#chat"
              className="group relative inline-flex items-center gap-2.5 rounded-xl bg-gradient-to-r from-navy-700 to-navy-800 px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-navy-700/25 hover:from-navy-800 hover:to-navy-900 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-navy-800/30"
            >
              Start with Civic AI
              <ArrowRight className="h-4.5 w-4.5 transition-transform group-hover:translate-x-1" />
            </a>
            <a
              href="#services"
              className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white/80 backdrop-blur px-6 py-3.5 text-sm font-semibold text-slate-700 hover:border-navy-400 hover:text-navy-800 hover:bg-white transition-all duration-300"
            >
              Explore Services
            </a>
          </div>

          {/* Trust badges */}
          <div
            className="mt-8 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-xs font-semibold text-slate-500 animate-fade-in-up"
            style={{ animationDelay: '400ms' }}
          >
            <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-50 border border-slate-100 hover:border-slate-200 transition-colors">
              <ShieldCheck className="h-4 w-4 text-bharat-green-600" />
              Govt-Verified Info
            </span>
            <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-50 border border-slate-100 hover:border-slate-200 transition-colors">
              <Zap className="h-4 w-4 text-saffron-500" />
              Instant Gemini Responses
            </span>
            <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-50 border border-slate-100 hover:border-slate-200 transition-colors">
              <Star className="h-4 w-4 text-amber-500 fill-amber-500/20" />
              Multilingual (Hindi, Punjabi & more)
            </span>
          </div>
        </div>

        {/* Stats Grid */}
        <div
          className="mx-auto mt-16 grid max-w-4xl grid-cols-1 gap-5 sm:grid-cols-3 animate-fade-in-up"
          style={{ animationDelay: '500ms' }}
        >
          {stats.map((s) => (
            <div
              key={s.label}
              className={`group rounded-2xl border p-6 text-center backdrop-blur-md shadow-sm transition-all duration-300 hover:shadow-md hover:bg-white hover:-translate-y-1 ${s.color}`}
            >
              <p className="font-display text-3xl sm:text-4xl font-extrabold tracking-tight group-hover:scale-105 transition-transform duration-300">
                {s.value}
              </p>
              <p className="mt-1.5 text-xs sm:text-sm font-semibold uppercase tracking-wider opacity-85">
                {s.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
