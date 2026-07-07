import { Landmark, Phone, Shield, AlertCircle, Heart } from 'lucide-react';
import type { Translation } from '../types';

type Props = { t: Translation };

export default function Footer({ t }: Props) {
  const f = t.footer;
  const emergencies = [
    { label: f.police, color: 'text-saffron-600 bg-saffron-50 border-saffron-100 hover:bg-saffron-100' },
    { label: f.ambulance, color: 'text-bharat-green-600 bg-bharat-green-50 border-bharat-green-100 hover:bg-bharat-green-100' },
    { label: f.fire, color: 'text-red-500 bg-red-50 border-red-100 hover:bg-red-100' },
  ];

  return (
    <footer className="relative mt-12 border-t border-slate-200 bg-slate-50/50 backdrop-blur">
      <div className="h-1.5 tricolor-bar w-full" />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {/* Initiative */}
          <div className="sm:col-span-2 lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <span className="grid place-items-center h-10 w-10 rounded-xl bg-navy-800 text-white shadow-md shadow-navy-950/20">
                <Landmark className="h-5.5 w-5.5" />
              </span>
              <span className="font-display text-xl font-extrabold text-navy-900">
                {f.initiative}
              </span>
            </div>
            <p className="max-w-md text-sm leading-relaxed text-slate-550">
              {f.initiativeDesc}
            </p>
            <div className="flex items-center gap-2 text-xs font-semibold text-slate-400">
              <Shield className="h-4.5 w-4.5 text-bharat-green-600 animate-pulse" />
              <span>ISO 27001 · Data Encrypted · MeitY Compliant</span>
            </div>
          </div>

          {/* Emergency contacts */}
          <div>
            <h5 className="flex items-center gap-2 font-display text-sm font-bold uppercase tracking-wider text-slate-800">
              <AlertCircle className="h-4.5 w-4.5 text-saffron-500" />
              {f.emergency}
            </h5>
            <ul className="mt-4 space-y-2.5">
              {emergencies.map((e) => (
                <li key={e.label}>
                  <span className={`inline-flex items-center gap-2 rounded-xl border px-3 py-1.5 text-xs font-bold transition-colors cursor-default ${e.color}`}>
                    <Phone className="h-3.5 w-3.5" />
                    <span>{e.label}</span>
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick links */}
          <div>
            <h5 className="font-display text-sm font-bold uppercase tracking-wider text-slate-800">
              {f.links}
            </h5>
            <ul className="mt-4 space-y-2 text-sm">
              {[
                { label: t.nav.home, href: '#home' },
                { label: t.nav.services, href: '#services' },
                { label: t.nav.track, href: '#track' },
                { label: t.nav.resources, href: '#resources' },
                { label: f.privacy, href: '#privacy' },
              ].map((l) => (
                <li key={l.href}>
                  <a
                    href={l.href}
                    className="text-slate-500 hover:text-navy-700 font-semibold transition-colors flex items-center gap-1 group"
                  >
                    <span className="h-1 w-1 rounded-full bg-slate-300 group-hover:bg-navy-600 transition-colors" />
                    <span>{l.label}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div id="privacy" className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-slate-200 pt-8 sm:flex-row text-xs text-slate-400 font-medium">
          <p className="flex items-center gap-1">
            © {new Date().getFullYear()} {f.initiative}. {f.rights}
          </p>
          <p className="flex items-center gap-1 hover:text-slate-600 transition-colors">
            Made with <Heart className="h-3.5 w-3.5 text-red-500 fill-red-500 animate-pulse" /> for Devengers Promptwars 2026
          </p>
          <div className="flex items-center gap-4">
            <a href="#privacy" className="hover:text-navy-700 transition-colors">{f.privacy}</a>
            <span className="h-3 w-px bg-slate-350" />
            <a href="#home" className="hover:text-navy-700 transition-colors">{t.nav.home}</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
