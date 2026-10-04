import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import { IntroHero } from '../components/home/IntroHero';
import { Hero } from '../components/home/Hero';
import { LiveOperationsTicker } from '../components/home/LiveOperationsTicker';
import { LiveOperationsMap } from '../components/home/LiveOperationsMap';
import { MethodologySection } from '../components/home/MethodologySection';
import { AboutImpactSection } from '../components/home/AboutImpactSection';
import { EventsSection } from '../components/home/EventsSection';
import { StoriesSection } from '../components/home/StoriesSection';
import { CommunityLowerSection } from '../components/home/CommunityLowerSection';

gsap.registerPlugin(ScrollTrigger);

export const Home: React.FC = () => {
  const mainRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Check if user prefers reduced motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      // Subtle entrance reveal animations for page sections
      const sections = gsap.utils.toArray<HTMLElement>('.gsap-reveal-section');

      sections.forEach((section) => {
        gsap.fromTo(
          section,
          {
            opacity: 0,
            y: 20,
          },
          {
            opacity: 1,
            y: 0,
            duration: 0.75,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: section,
              start: 'top 90%',
              toggleActions: 'play none none none',
            },
          }
        );
      });
    }, mainRef);

    return () => ctx.revert();
  }, []);

  return (
    <>
      <IntroHero />
      <div id="main-content" ref={mainRef} className="max-w-[1720px] 2xl:max-w-[1800px] w-full mx-auto px-6 sm:px-10 lg:px-16 space-y-24 sm:space-y-32 py-6 pb-28">
      {/* 1. Open Asymmetrical Hero with 3D Scene */}
      <div className="gsap-reveal-section">
        <Hero />
      </div>

      {/* 2. Hairline-Bounded Live Operations Ticker */}
      <div className="gsap-reveal-section">
        <LiveOperationsTicker />
      </div>

      {/* 3. Interactive Ground Operations Command Console */}
      <div id="live-operations" className="gsap-reveal-section scroll-mt-24">
        <LiveOperationsMap />
      </div>

      {/* 4. Staggered Editorial Methodology ("How We Deliver Change") */}
      <div id="how-we-work" className="gsap-reveal-section scroll-mt-24">
        <MethodologySection />
      </div>

      {/* 5. Bento-Style Purpose & Core Impact with Authenticity Story & Metrics */}
      <div className="gsap-reveal-section">
        <AboutImpactSection />
      </div>

      {/* 6. Upcoming Events & Field Actions */}
      <div className="gsap-reveal-section">
        <EventsSection />
      </div>

      {/* 7. Field Stories & Grassroot Dispatches */}
      <div className="gsap-reveal-section">
        <StoriesSection />
      </div>

      {/* 8. Community & Impact Lower Block: Testimonials, FAQ & Campus Contact */}
      <div id="contact" className="gsap-reveal-section scroll-mt-24">
        <CommunityLowerSection />
      </div>
      </div>
    </>
  );
};
