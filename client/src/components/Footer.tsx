import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, MapPin, ArrowUpRight, Heart } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="relative w-full border-t border-slate-800 bg-[#0F172A] mt-24 text-slate-200 overflow-hidden">
      {/* Desktop-only tactile print-like SVG noise/grain overlay (hidden on mobile for performance) */}
      <div
        className="hidden md:block absolute inset-0 pointer-events-none grain-overlay z-0"
        style={{ opacity: 0.025 }}
        aria-hidden="true"
      />

      <div className="relative z-10 max-w-[1720px] 2xl:max-w-[1800px] w-full mx-auto px-6 sm:px-10 lg:px-16 py-16 sm:py-20">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 lg:gap-14">
          {/* Brand Column (5 cols) */}
          <div className="md:col-span-5 space-y-5">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full border border-slate-700 p-0.5 bg-slate-800 shadow-xs flex items-center justify-center shrink-0">
                <img src="/eklavya_logo.png" alt="Eklavya Crest" className="w-full h-full object-contain p-1" />
              </div>
              <div className="leading-none">
                <span className="font-serif font-extrabold text-xl tracking-tight text-white">Eklavya</span>
                <span className="block font-mono text-[10px] uppercase tracking-wider text-emerald-400 font-bold mt-1">
                  Socio-Animal Welfare Society • HIT Haldia
                </span>
              </div>
            </div>

            <p className="text-slate-300 text-xs sm:text-sm font-normal leading-relaxed max-w-md">
              A student-driven humanitarian and animal rescue society at Haldia Institute of Technology. Marching forward to provide free evening primary education to village children and 24/7 medical rescue for stray animals.
            </p>

            <div className="flex items-center gap-2.5 pt-1">
              <a
                href="https://www.instagram.com/eklavyaofficial_?igsh=MXg3eGN6eHR5Y2tqeA=="
                target="_blank"
                rel="noopener noreferrer"
                className="w-11 h-11 min-w-[44px] min-h-[44px] rounded-xl border border-slate-800 bg-slate-800/80 flex items-center justify-center text-slate-300 hover:text-pink-400 hover:border-pink-500/50 transition-colors shadow-xs"
                aria-label="Instagram"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-11 h-11 min-w-[44px] min-h-[44px] rounded-xl border border-slate-800 bg-slate-800/80 flex items-center justify-center text-slate-300 hover:text-blue-400 hover:border-blue-500/50 transition-colors shadow-xs"
                aria-label="Facebook"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M9 8H6v4h3v12h5V12h3.642L18 8h-4V6.333C14 5.374 14.5 5 15.5 5H18V0h-3.808C10.592 0 9 1.592 9 4.75V8z" />
                </svg>
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-11 h-11 min-w-[44px] min-h-[44px] rounded-xl border border-slate-800 bg-slate-800/80 flex items-center justify-center text-slate-300 hover:text-sky-400 hover:border-sky-500/50 transition-colors shadow-xs"
                aria-label="LinkedIn"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M4.98 3.5c0 1.381-1.11 2.5-2.48 2.5s-2.48-1.119-2.48-2.5c0-1.38 1.11-2.5 2.48-2.5s2.48 1.12 2.48 2.5zm.02 4.5h-5v16h5v-16zm7.982 0h-4.968v16h4.969v-8.399c0-4.67 6.029-5.052 6.029 0v8.399h4.988v-10.131c0-7.88-8.922-7.593-11.018-3.714v-2.155z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Navigation Column (2 cols) */}
          <div className="md:col-span-2 space-y-3">
            <span className="font-mono text-xs uppercase tracking-wider text-blue-400 font-bold block">
              Navigation
            </span>
            <ul className="space-y-2 text-xs sm:text-sm font-medium text-slate-300">
              <li>
                <Link to="/" className="hover:text-white transition-colors">Home</Link>
              </li>
              <li>
                <Link to="/vision" className="hover:text-white transition-colors">Vision & Mission</Link>
              </li>
              <li>
                <Link to="/our-work" className="hover:text-white transition-colors">Our Work</Link>
              </li>
              <li>
                <Link to="/events" className="hover:text-white transition-colors">Upcoming Events</Link>
              </li>
              <li>
                <Link to="/help-us" className="inline-flex items-center gap-1 text-emerald-400 font-bold hover:underline hover:text-emerald-300">
                  <span>Help Us</span>
                  <ArrowUpRight size={13} />
                </Link>
              </li>
            </ul>
          </div>

          {/* Community Column (2 cols) */}
          <div className="md:col-span-2 space-y-3">
            <span className="font-mono text-xs uppercase tracking-wider text-emerald-400 font-bold block">
              Community
            </span>
            <ul className="space-y-2 text-xs sm:text-sm font-medium text-slate-300">
              <li>
                <Link to="/faculty" className="hover:text-white transition-colors">Faculty Mentor</Link>
              </li>
              <li>
                <Link to="/members" className="hover:text-white transition-colors">Active Squad</Link>
              </li>
              <li>
                <Link to="/alumni" className="hover:text-white transition-colors">Esteemed Alumni</Link>
              </li>
              <li>
                <Link to="/recruitment" className="hover:text-teal-300 text-teal-400 font-bold transition-colors">Campus Intake</Link>
              </li>
              <li>
                <Link to="/corporate-partnerships" className="hover:text-blue-300 text-blue-400 font-bold transition-colors">Corporate CSR</Link>
              </li>
              <li>
                <Link to="/login" className="hover:text-blue-300 text-blue-400 transition-colors">Portal Login</Link>
              </li>
            </ul>
          </div>

          {/* Coordinates Column (3 cols) */}
          <div className="md:col-span-3 space-y-3">
            <span className="font-mono text-xs uppercase tracking-wider text-blue-400 font-bold block">
              Campus Headquarters
            </span>
            <div className="space-y-2.5 text-xs text-slate-300">
              <div className="flex items-start gap-2">
                <MapPin size={15} className="text-emerald-400 shrink-0 mt-0.5" />
                <span className="leading-relaxed">
                  Student Activity Center, Haldia Institute of Technology, Purba Medinipur, WB 721657
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Mail size={15} className="text-blue-400 shrink-0" />
                <a href="mailto:eklavya.official.haldia@gmail.com" className="hover:text-white transition-colors font-mono">
                  eklavya.official.haldia@gmail.com
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Hairline Divided Bottom Bar */}
        <div className="border-t border-slate-800 mt-12 pt-6 flex flex-col sm:flex-row justify-between items-center text-xs text-slate-400 gap-3">
          <p>© 2026 Eklavya Society. Affiliated with Haldia Institute of Technology.</p>
          <p className="font-mono text-[11px] text-emerald-400 font-bold tracking-wider uppercase flex items-center gap-1.5">
            <Heart size={12} className="text-emerald-400 fill-current" />
            <span>ENGINEERED WITH EMPATHY • HANDS THAT CARE</span>
          </p>
        </div>
      </div>
    </footer>
  );
};
