import { useEffect, useRef, useState } from 'react';
import { ChevronDown, Globe, Menu, User, X, Landmark } from 'lucide-react';
import { LANGUAGES } from '../i18n';
import type { Language, Translation } from '../types';

type Props = {
  lang: Language;
  setLang: (l: Language) => void;
  t: Translation;
};

export default function Navbar({ lang, setLang, t }: Props) {
  const [scrolled, setScrolled] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const langRef = useRef<HTMLDivElement>(null);
  const profileRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (langRef.current && !langRef.current.contains(e.target as Node)) setLangOpen(false);
      if (profileRef.current && !profileRef.current.contains(e.target as Node)) setProfileOpen(false);
    };
    document.addEventListener('mousedown', onClick);
    return () => document.removeEventListener('mousedown', onClick);
  }, []);

  const navLinks = [
    { label: t.nav.home, href: '#home' },
    { label: t.nav.services, href: '#services' },
    { label: t.nav.track, href: '#track' },
    { label: t.nav.resources, href: '#resources' },
  ];

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-white/90 backdrop-blur-md border-b border-slate-200/80 shadow-md py-1.5'
          : 'bg-white/70 backdrop-blur-sm border-b border-transparent py-3'
      }`}
    >
      <div className="h-1.5 tricolor-bar w-full absolute top-0 left-0" />
      <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <a href="#home" className="flex items-center gap-3 shrink-0 group">
            <span className="relative grid place-items-center h-11 w-11 rounded-xl bg-gradient-to-br from-navy-800 to-navy-950 text-white shadow-lg transition-all duration-300 group-hover:scale-105 group-hover:rotate-3">
              <Landmark className="h-5.5 w-5.5" strokeWidth={2.2} />
              <span className="absolute -top-0.5 -right-0.5 h-3 w-3 rounded-full bg-saffron-500 ring-2 ring-white animate-pulse" />
            </span>
            <span className="flex flex-col leading-none">
              <span className="font-display text-xl font-extrabold text-navy-900 tracking-tight transition-colors group-hover:text-navy-700">
                Smart Bharat
              </span>
              <span className="text-[10px] font-bold text-slate-400 tracking-wider uppercase mt-0.5">
                AI Civic Companion
              </span>
            </span>
          </a>

          {/* Desktop nav links */}
          <ul className="hidden lg:flex items-center gap-1.5">
            {navLinks.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  className="px-4 py-2 rounded-xl text-sm font-semibold text-slate-650 hover:text-navy-700 hover:bg-navy-50/70 transition-all duration-300"
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>

          {/* Right controls */}
          <div className="flex items-center gap-3">
            {/* Language Selection */}
            <div className="relative" ref={langRef}>
              <button
                onClick={() => setLangOpen((v) => !v)}
                className="flex items-center gap-2 rounded-xl border border-slate-250 bg-white px-3.5 py-2 text-sm font-bold text-slate-700 hover:border-navy-400 hover:bg-navy-50/50 shadow-sm transition-all cursor-pointer"
                aria-haspopup="listbox"
                aria-expanded={langOpen}
              >
                <Globe className="h-4.5 w-4.5 text-navy-600 animate-spin-slow" />
                <span className="hidden sm:inline">{lang}</span>
                <ChevronDown className={`h-4 w-4 text-slate-400 transition-transform duration-300 ${langOpen ? 'rotate-180' : ''}`} />
              </button>
              {langOpen && (
                <ul
                  className="absolute right-0 mt-2.5 w-48 overflow-hidden rounded-2xl border border-slate-200 bg-white/95 backdrop-blur shadow-2xl py-1 animate-scale-in"
                  role="listbox"
                >
                  {LANGUAGES.map((l) => (
                    <li key={l}>
                      <button
                        onClick={() => {
                          setLang(l);
                          setLangOpen(false);
                        }}
                        className={`flex w-full items-center justify-between px-4 py-2.5 text-sm transition-all cursor-pointer ${
                          l === lang
                            ? 'bg-navy-50/80 font-bold text-navy-700 border-l-4 border-saffron-500'
                            : 'text-slate-600 hover:bg-slate-50'
                        }`}
                        role="option"
                        aria-selected={l === lang}
                      >
                        {l}
                        {l === lang && <span className="h-2 w-2 rounded-full bg-saffron-500 animate-ping" />}
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {/* User Profile */}
            <div className="relative" ref={profileRef}>
              <button
                onClick={() => setProfileOpen((v) => !v)}
                className="grid place-items-center h-10 w-10 rounded-xl bg-navy-800 text-white shadow-md hover:bg-navy-900 transition-all hover:scale-105 cursor-pointer"
                aria-label="User profile"
                aria-haspopup="menu"
                aria-expanded={profileOpen}
              >
                <User className="h-5 w-5" />
              </button>
              {profileOpen && (
                <div className="absolute right-0 mt-2.5 w-64 overflow-hidden rounded-2xl border border-slate-200 bg-white/95 backdrop-blur shadow-2xl animate-scale-in">
                  <div className="flex items-center gap-3 border-b border-slate-100 px-4 py-4.5 bg-slate-50/50">
                    <span className="grid place-items-center h-10 w-10 rounded-xl bg-navy-800 text-white">
                      <User className="h-5 w-5" />
                    </span>
                    <div className="leading-tight">
                      <p className="text-sm font-bold text-slate-800">Citizen User</p>
                      <p className="text-[11px] font-semibold text-slate-400">user@smartbharat.gov.in</p>
                    </div>
                  </div>
                  <div className="py-1.5">
                    {['My Applications', 'Complaint History', 'Civic Settings'].map((item) => (
                      <button
                        key={item}
                        onClick={() => setProfileOpen(false)}
                        className="block w-full text-left px-4 py-2.5 text-xs font-bold text-slate-600 hover:bg-slate-50 hover:text-navy-700 transition-colors cursor-pointer"
                      >
                        {item}
                      </button>
                    ))}
                    <div className="h-px bg-slate-100 my-1" />
                    <button
                      onClick={() => setProfileOpen(false)}
                      className="block w-full text-left px-4 py-2.5 text-xs font-bold text-red-600 hover:bg-red-50 transition-colors cursor-pointer"
                    >
                      Sign Out
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Mobile Hamburger menu */}
            <button
              onClick={() => setMobileOpen((v) => !v)}
              className="lg:hidden grid place-items-center h-10 w-10 rounded-xl border border-slate-250 text-slate-700 hover:bg-slate-50 cursor-pointer transition-colors"
              aria-label="Toggle menu"
              aria-expanded={mobileOpen}
            >
              {mobileOpen ? <X className="h-5.5 w-5.5" /> : <Menu className="h-5.5 w-5.5" />}
            </button>
          </div>
        </div>

        {/* Mobile menu panel */}
        {mobileOpen && (
          <ul className="lg:hidden flex flex-col gap-1 pb-4 pt-2 border-t border-slate-100 animate-scale-in">
            {navLinks.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  onClick={() => setMobileOpen(false)}
                  className="block px-4 py-3 rounded-xl text-sm font-bold text-slate-650 hover:text-navy-700 hover:bg-navy-50/50 transition-all"
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        )}
      </nav>
    </header>
  );
}
