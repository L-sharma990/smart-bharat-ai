import { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Dashboard from './components/Dashboard';
import Footer from './components/Footer';
import { TRANSLATIONS } from './i18n';
import type { Language } from './types';

export default function App() {
  const [lang, setLang] = useState<Language>('English');
  const t = TRANSLATIONS[lang];

  return (
    <div className="min-h-screen bg-white text-slate-700 selection:bg-navy-100 selection:text-navy-900">
      <Navbar lang={lang} setLang={setLang} t={t} />
      <main>
        <Hero t={t} />
        <Dashboard t={t} />
      </main>
      <Footer t={t} />
    </div>
  );
}
