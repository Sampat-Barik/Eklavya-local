import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Activity, Heart, Sparkles, Shield, MapPin } from 'lucide-react';

// Real Eklavya project photography assets
const PHOTO_EDUCATION = '/eklavya_human_hero.jpg';
const PHOTO_ANIMAL = '/eklavya_animal_care.jpg';

export const IntroHero: React.FC = () => {
  const containerRef = useRef<HTMLElement>(null);
  const spotlightRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const isMobileTouchOnly = window.matchMedia('(hover: none) and (pointer: coarse)').matches;
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const container = containerRef.current;
    const spotlight = spotlightRef.current;
    if (!container || !spotlight) return;

    if (isMobileTouchOnly) {
      spotlight.style.opacity = '0.35';
      return;
    }

    const rect = container.getBoundingClientRect();
    let targetX = rect.width * 0.65;
    let targetY = rect.height * 0.5;
    let currentX = targetX;
    let currentY = targetY;
    let rafId: number | null = null;

    container.style.setProperty('--mouse-x', `${targetX}px`);
    container.style.setProperty('--mouse-y', `${targetY}px`);

    const handleMouseMove = (e: MouseEvent) => {
      const currentRect = container.getBoundingClientRect();
      targetX = e.clientX - currentRect.left;
      targetY = e.clientY - currentRect.top;
    };

    const lerpFactor = prefersReducedMotion ? 1 : 0.12;

    const tick = () => {
      if (!prefersReducedMotion) {
        currentX += (targetX - currentX) * lerpFactor;
        currentY += (targetY - currentY) * lerpFactor;
      } else {
        currentX = targetX;
        currentY = targetY;
      }

      container.style.setProperty('--mouse-x', `${Math.round(currentX)}px`);
      container.style.setProperty('--mouse-y', `${Math.round(currentY)}px`);

      rafId = requestAnimationFrame(tick);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    rafId = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      if (rafId !== null) cancelAnimationFrame(rafId);
    };
  }, []);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      ref={containerRef}
      id="intro-hero"
      className="relative z-20 w-full overflow-hidden bg-[#05110E] select-none text-white shadow-[0_12px_32px_rgba(0,0,0,0.14)]"
      style={{
        height: '100dvh',
        minHeight: '100dvh',
        ['--mouse-x' as string]: '65%',
        ['--mouse-y' as string]: '50%',
      }}
    >
      {/* ──────────────────────────────────────────────────────────────
          Layer 1 (z-10): Atmospheric Deep Evergreen Base Gradient
          ────────────────────────────────────────────────────────────── */}
      <div
        className="absolute inset-0 z-10 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 90% 70% at 75% 45%, #0B241E 0%, #061512 45%, #030B09 100%)',
        }}
        aria-hidden="true"
      />

      {/* ──────────────────────────────────────────────────────────────
          Layer 2 (z-20): Real Editorial Photography Background (Full-bleed blend)
          Features real children & volunteers in action
          ────────────────────────────────────────────────────────────── */}
      <div
        className="absolute inset-0 z-20 pointer-events-none opacity-40 lg:opacity-35 bg-cover bg-center"
        style={{
          backgroundImage: `url(${PHOTO_EDUCATION})`,
          backgroundPosition: 'center 40%',
          filter: 'saturate(0.9) contrast(1.05)',
        }}
        aria-hidden="true"
      />

      {/* Editorial directional scrims for high-contrast typography readability */}
      <div
        className="absolute inset-0 z-25 pointer-events-none"
        style={{
          background:
            'linear-gradient(to right, #05110E 0%, rgba(5,17,14,0.95) 35%, rgba(5,17,14,0.8) 55%, rgba(5,17,14,0.3) 100%)',
        }}
        aria-hidden="true"
      />

      {/* Top & bottom atmospheric vignetting */}
      <div
        className="absolute inset-0 z-26 pointer-events-none"
        style={{
          background:
            'linear-gradient(to bottom, rgba(5,17,14,0.85) 0%, transparent 22%, transparent 70%, rgba(5,17,14,0.95) 100%)',
        }}
        aria-hidden="true"
      />

      {/* ──────────────────────────────────────────────────────────────
          Layer 3 (z-30): Subtle Cursor Atmospheric Illumination
          Gently illuminates the real photography layer with warm organic clarity
          ────────────────────────────────────────────────────────────── */}
      <div
        ref={spotlightRef}
        id="intro-spotlight-reveal"
        className="absolute inset-0 z-30 pointer-events-none transition-opacity duration-500 hidden md:block"
        style={{
          backgroundImage: `url(${PHOTO_EDUCATION})`,
          backgroundPosition: 'center 40%',
          backgroundSize: 'cover',
          filter: 'saturate(1.15) brightness(1.08)',
          WebkitMaskImage:
            'radial-gradient(circle 380px at var(--mouse-x, 65%) var(--mouse-y, 50%), rgba(0,0,0,0.55) 0%, rgba(0,0,0,0.35) 40%, rgba(0,0,0,0.08) 75%, transparent 100%)',
          maskImage:
            'radial-gradient(circle 380px at var(--mouse-x, 65%) var(--mouse-y, 50%), rgba(0,0,0,0.55) 0%, rgba(0,0,0,0.35) 40%, rgba(0,0,0,0.08) 75%, transparent 100%)',
          willChange: 'mask-image, -webkit-mask-image',
        }}
        aria-hidden="true"
      />

      {/* ──────────────────────────────────────────────────────────────
          Layer 4 (z-40): Bottom Seamless Editorial Transition Gradient
          Gently dissolves the dark cinematic intro into Eklavya's warm
          neutral light canvas (#FCFBF9) for a continuous single-page feel
          ────────────────────────────────────────────────────────────── */}
      <div
        className="absolute bottom-0 left-0 right-0 h-28 sm:h-36 pointer-events-none z-40"
        style={{
          background:
            'linear-gradient(to bottom, rgba(5, 17, 14, 0) 0%, rgba(5, 17, 14, 0.25) 35%, rgba(10, 26, 22, 0.65) 65%, rgba(180, 185, 183, 0.25) 82%, rgba(252, 251, 249, 0.85) 94%, #FCFBF9 100%)',
        }}
        aria-hidden="true"
      />

      {/* ──────────────────────────────────────────────────────────────
          Layer 5 (z-50): Main Hero Editorial Content
          Two-column layout matching world-class social-impact sites
          ────────────────────────────────────────────────────────────── */}
      <div className="relative z-50 h-full w-full max-w-[1600px] mx-auto px-6 sm:px-10 lg:px-16 flex flex-col justify-between pt-24 sm:pt-28 pb-8 sm:pb-10">
        
        {/* Main Content Area */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center my-auto">
          
          {/* Left Column: Authentic Brand Headline, Mission & Actions (7 cols) */}
          <div className="lg:col-span-7 space-y-6 sm:space-y-7 text-left">
            
            {/* Small Eyebrow: Eklavya • Hands That Care */}
            <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-emerald-500/15 border border-emerald-400/30 text-emerald-300 text-[11px] sm:text-xs font-mono tracking-wider uppercase font-semibold backdrop-blur-md shadow-xs">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>Eklavya • Hands That Care</span>
              <span className="text-emerald-400/50">•</span>
              <span className="font-sans normal-case text-emerald-200/90 font-medium text-xs">
                HIT Haldia Social Welfare
              </span>
            </div>

            {/* Monumental Editorial Headline */}
            <div className="space-y-2 sm:space-y-3">
              <h1 className="font-serif font-black text-5xl sm:text-6xl md:text-7xl lg:text-[80px] text-white tracking-[-0.03em] leading-[1.03]">
                Hands That{' '}
                <span className="italic font-normal bg-gradient-to-r from-emerald-300 via-teal-200 to-cyan-200 bg-clip-text text-transparent drop-shadow-sm">
                  Care.
                </span>
              </h1>
              <p className="font-sans text-base sm:text-lg text-emerald-100/90 font-medium">
                "Hands That Care" — Student-Led Grassroot Compassion
              </p>
            </div>

            {/* Authentic Mission Statement */}
            <p className="text-slate-300 text-sm sm:text-base lg:text-[17px] leading-[1.7] font-normal max-w-xl">
              Student-driven social welfare from Haldia Institute of Technology. Dedicated to providing daily free evening education to <strong className="text-emerald-300 font-semibold">150+ rural village children</strong> and round-the-clock emergency medical rescue, feeding & sterilization to <strong className="text-teal-300 font-semibold">120+ street animals</strong> across Haldia.
            </p>

            {/* Two Meaningful Primary Actions */}
            <div className="flex flex-wrap items-center gap-3.5 pt-1">
              <Link
                to="/our-work"
                className="bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 hover:from-emerald-400 hover:to-cyan-400 text-white px-7 py-3.5 rounded-full text-xs sm:text-sm font-bold transition-all flex items-center gap-2 shadow-lg shadow-emerald-500/25 group hover:-translate-y-0.5 active:translate-y-0"
              >
                <span>Explore Our Work</span>
                <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
              </Link>

              <button
                type="button"
                onClick={() => scrollToSection('live-operations')}
                className="bg-white/10 hover:bg-white/20 border border-white/20 text-white px-6 py-3.5 rounded-full text-xs sm:text-sm font-semibold font-mono uppercase tracking-wider transition-all flex items-center gap-2 backdrop-blur-sm hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
              >
                <Activity size={14} className="text-emerald-400" />
                <span>See Our Impact</span>
              </button>
            </div>

            {/* Authentic Social-Proof Micro-Pills */}
            <div className="flex flex-wrap items-center gap-2 sm:gap-3 pt-3 text-[11px] sm:text-xs font-mono text-emerald-200/80">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 border border-white/10 backdrop-blur-xs">
                <Sparkles size={11} className="text-emerald-400" />
                <span>150+ Children Taught</span>
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 border border-white/10 backdrop-blur-xs">
                <Heart size={11} className="text-teal-400 fill-current" />
                <span>120+ Animals Rescued</span>
              </span>
              <span className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 border border-white/10 backdrop-blur-xs">
                <Shield size={11} className="text-cyan-400" />
                <span>80+ Active Volunteers</span>
              </span>
            </div>
          </div>

          {/* Right Column: Layered Editorial Visual Showcase (5 cols, Desktop) */}
          <div className="hidden lg:flex lg:col-span-5 relative w-full items-center justify-center">
            
            {/* Primary Visual Card: Village Primary Classes */}
            <div className="w-full max-w-md rounded-2xl overflow-hidden border border-white/15 bg-white/5 shadow-2xl backdrop-blur-md group hover:border-emerald-400/30 transition-all duration-300">
              <div className="relative h-64 sm:h-72 overflow-hidden">
                <img
                  src={PHOTO_EDUCATION}
                  alt="Evening Primary Education for Village Children"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#05110E] via-transparent to-black/30" />
                <span className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-[#05110E]/80 backdrop-blur-md border border-white/15 text-[10px] font-mono font-bold uppercase tracking-wider text-emerald-300">
                  Education Outreach
                </span>
                <span className="absolute bottom-3 left-3 right-3 text-xs font-medium text-white/95 line-clamp-1">
                  Daily evening classes by HIT student engineers
                </span>
              </div>
              <div className="p-4 bg-[#081B17]/90 border-t border-white/10 flex items-center justify-between">
                <div className="flex items-center gap-2 text-xs text-emerald-200/90 font-mono">
                  <MapPin size={13} className="text-emerald-400" />
                  <span>Ranichak & Khudiram Centres</span>
                </div>
                <span className="text-[10px] font-mono text-emerald-400 font-bold uppercase tracking-wider bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-400/20">
                  Active Daily
                </span>
              </div>
            </div>

            {/* Secondary Floating Accent Card: 24/7 Animal Care Squad */}
            <div className="absolute -bottom-6 -left-6 max-w-[240px] rounded-xl overflow-hidden border border-white/20 bg-[#091F1A]/95 shadow-xl backdrop-blur-md p-3 space-y-2 hover:border-teal-400/40 transition-all">
              <div className="flex items-center gap-2.5">
                <div className="w-10 h-10 rounded-lg overflow-hidden shrink-0 border border-white/10">
                  <img
                    src={PHOTO_ANIMAL}
                    alt="Animal Rescue & Care"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-white leading-tight">
                    Animal Care
                  </h4>
                  <p className="text-[10px] font-mono text-teal-300">
                    24/7 Rescue & Clinic
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar: Animated Scroll Indicator */}
        <div className="flex justify-center pt-2 sm:pt-4">
          <button
            type="button"
            onClick={() => scrollToSection('main-content')}
            className="group flex flex-col items-center gap-1.5 text-white/70 hover:text-white transition-colors cursor-pointer select-none"
            aria-label="Scroll to explore existing website"
          >
            <span className="text-[11px] font-mono tracking-[0.22em] uppercase font-semibold text-white/70 group-hover:text-emerald-300">
              Scroll to explore
            </span>
            <span
              className="text-base text-white/80 group-hover:text-emerald-300 animate-bounce leading-none"
              aria-hidden="true"
            >
              ↓
            </span>
          </button>
        </div>
      </div>
    </section>
  );
};
