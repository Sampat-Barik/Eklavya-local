import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Menu, X } from 'lucide-react';
import { RevealLayer } from '../components/lithos/RevealLayer';

// ─── Asset URLs ─────────────────────────────────────────────────────────────
// Base image: Eklavya logo — this is the permanent visual anchor.
const BG_IMAGE_1 =
  '/eklavya_logo.png';

// Reveal image: shown under the cursor spotlight
const BG_IMAGE_2 =
  'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260609_201152_bba90a12-bf12-459f-91f0-51f237dbaf3b.png&w=1280&q=85';

// ─── Spotlight radius (px) ───────────────────────────────────────────────────
const SPOTLIGHT_R = 260;

// ─── Nav items ──────────────────────────────────────────────────────────────
const NAV_ITEMS = ['Course', 'Field Guides', 'Geology', 'Plans', 'Live Tour'] as const;

// ─── LithosHero ─────────────────────────────────────────────────────────────
export const LithosHero: React.FC = () => {
  // Raw mouse position (updated synchronously in event handler)
  const mouse = useRef({ x: -999, y: -999 });
  // Smoothed (lerped) position used for rendering
  const smooth = useRef({ x: -999, y: -999 });
  const rafRef = useRef<number | null>(null);

  // cursorPos drives RevealLayer re-renders at RAF cadence
  const [cursorPos, setCursorPos] = useState({ x: -999, y: -999 });
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeNav, setActiveNav] = useState<string>('Course');

  // Start RAF loop
  const startLoop = useCallback(() => {
    const tick = () => {
      smooth.current.x += (mouse.current.x - smooth.current.x) * 0.1;
      smooth.current.y += (mouse.current.y - smooth.current.y) * 0.1;
      setCursorPos({ x: smooth.current.x, y: smooth.current.y });
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
  }, []);

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      mouse.current.x = e.clientX;
      mouse.current.y = e.clientY;
    };

    window.addEventListener('mousemove', onMove);
    startLoop();

    return () => {
      window.removeEventListener('mousemove', onMove);
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
    };
  }, [startLoop]);

  return (
    <div
      className="min-h-screen bg-white tracking-[-0.02em]"
      style={{ fontFamily: "'Inter', sans-serif" }}
    >
      {/* ── Fixed Navigation ─────────────────────────────────────────────── */}
      <nav className="fixed top-0 left-0 right-0 z-[100] flex items-center justify-between p-4 sm:p-5">

        {/* Left — Logo + Wordmark */}
        <div className="flex items-center gap-2.5">
          <svg
            width="26"
            height="26"
            viewBox="0 0 256 256"
            fill="#ffffff"
            aria-hidden="true"
          >
            <path d="M 256 256 L 128 256 L 0 128 L 128 128 Z M 256 128 L 128 128 L 0 0 L 128 0 Z" />
          </svg>
          <span className="text-white text-2xl font-playfair italic">Lithos</span>
        </div>

        {/* Center — Pill Navigation (desktop) */}
        <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 bg-white/20 backdrop-blur-md border border-white/30 rounded-full px-2 py-2 items-center gap-1">
          {NAV_ITEMS.map((item) => (
            <button
              key={item}
              onClick={() => setActiveNav(item)}
              className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors cursor-pointer ${
                activeNav === item
                  ? 'bg-white text-gray-900'
                  : 'text-white/80 hover:bg-white/20 hover:text-white'
              }`}
            >
              {item}
            </button>
          ))}
        </div>

        {/* Right — Sign Up (desktop) + Hamburger (mobile) */}
        <div className="flex items-center gap-3">
          <button className="hidden md:block bg-white text-gray-900 text-sm font-semibold px-6 py-2.5 rounded-full hover:bg-gray-100 transition-colors cursor-pointer">
            Sign Up
          </button>
          <button
            className="md:hidden text-white p-1 cursor-pointer"
            onClick={() => setMobileMenuOpen((v) => !v)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {/* ── Mobile Drawer ────────────────────────────────────────────────── */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-[90] bg-black/90 backdrop-blur-sm flex flex-col items-center justify-center gap-6">
          {NAV_ITEMS.map((item) => (
            <button
              key={item}
              onClick={() => { setActiveNav(item); setMobileMenuOpen(false); }}
              className="text-white text-2xl font-medium font-playfair italic hover:text-white/70 transition-colors cursor-pointer"
            >
              {item}
            </button>
          ))}
          <button className="mt-4 bg-white text-gray-900 text-sm font-semibold px-8 py-3 rounded-full hover:bg-gray-100 transition-colors cursor-pointer">
            Sign Up
          </button>
        </div>
      )}

      {/* ── Hero Section ─────────────────────────────────────────────────── */}
      <section
        className="relative w-full overflow-hidden h-screen bg-black"
        style={{ height: '100dvh' }}
      >
        {/* Layer 1 (z-10) — Base image: Eklavya logo is the permanent anchor */}
        <div
          className="hero-zoom absolute inset-0 z-10 bg-center bg-cover bg-no-repeat"
          style={{
            backgroundImage: `url(${BG_IMAGE_1})`,
            // Keep the logo clearly visible — dark vignette edges, bright center
            backgroundSize: 'cover',
          }}
          aria-hidden="true"
        />

        {/* Dark overlay so the logo and text stay legible */}
        <div
          className="absolute inset-0 z-20 pointer-events-none"
          style={{
            background:
              'radial-gradient(ellipse 60% 60% at 50% 50%, rgba(0,0,0,0.0) 0%, rgba(0,0,0,0.55) 100%)',
          }}
          aria-hidden="true"
        />

        {/* Layer 2 (z-30) — Cursor spotlight reveal layer */}
        <RevealLayer
          image={BG_IMAGE_2}
          cursorX={cursorPos.x}
          cursorY={cursorPos.y}
          radius={SPOTLIGHT_R}
        />

        {/* Layer 3 (z-50) — Heading, centred above the logo */}
        <div className="absolute top-[14%] left-0 right-0 z-50 flex flex-col items-center text-center px-5 pointer-events-none">
          <h1 className="text-white leading-[0.95]">
            <span
              className="hero-anim hero-reveal block font-playfair italic font-normal text-5xl sm:text-7xl md:text-8xl"
              style={{ letterSpacing: '-0.05em', animationDelay: '0.25s' }}
            >
              Layers hold
            </span>
            <span
              className="hero-anim hero-reveal block font-inter font-normal text-5xl sm:text-7xl md:text-8xl -mt-1"
              style={{ letterSpacing: '-0.08em', animationDelay: '0.42s' }}
            >
              tales of time
            </span>
          </h1>
        </div>

        {/* Layer 4 (z-50) — Bottom-left editorial copy */}
        <div
          className="hero-anim hero-fade hidden sm:block absolute bottom-14 left-10 md:left-14 max-w-[260px] z-50"
          style={{ animationDelay: '0.7s' }}
        >
          <p className="text-sm text-white/80 leading-relaxed">
            Every layer of sediment records a chapter of our planet, from ancient
            seabeds to drifting ash, layered across millions of years beneath us.
          </p>
        </div>

        {/* Layer 5 (z-50) — Bottom-right CTA block */}
        <div
          className="hero-anim hero-fade absolute bottom-10 sm:bottom-24 left-5 right-5 sm:left-auto sm:right-10 md:right-14 max-w-full sm:max-w-[260px] z-50 flex flex-col items-start gap-4 sm:gap-5"
          style={{ animationDelay: '0.85s' }}
        >
          <p className="text-xs sm:text-sm text-white/80 leading-relaxed">
            Our interactive maps let you peel back the crust to trace how stones,
            fossils, and deep time combine to shape the ground beneath your feet.
          </p>
          <button
            className="bg-[#e8702a] hover:bg-[#d2611f] text-white text-sm font-medium px-7 py-3 rounded-full transition-all hover:scale-[1.03] active:scale-95 hover:shadow-lg hover:shadow-[#e8702a]/30 cursor-pointer"
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            Start Digging
          </button>
        </div>
      </section>
    </div>
  );
};
