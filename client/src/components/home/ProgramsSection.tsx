import React, { useState, useEffect, useRef } from 'react';
import { SectionTitle } from '../ui/SectionTitle';
import { ProgramCard } from '../ui/ProgramCard';
import type { ProgramCause } from '../../types/ngo';
import { ngoService } from '../../services/ngoService';

export const ProgramsSection: React.FC = () => {
  const [programs, setPrograms] = useState<ProgramCause[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [activeProgramIndex, setActiveProgramIndex] = useState<number>(0);
  const carouselRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const loadPrograms = async () => {
      const data = await ngoService.getPrograms();
      setPrograms(data);
    };
    loadPrograms();
  }, []);

  const categories = ['All', 'Education', 'Animal Welfare', 'Emergency Relief', 'Student Empowerment'];

  const filteredPrograms = programs.filter((p) => {
    if (selectedCategory === 'All') return true;
    return p.category === selectedCategory;
  });

  // Track active card index during mobile horizontal swipe
  const handleCarouselScroll = () => {
    if (!carouselRef.current) return;
    const { scrollLeft, clientWidth } = carouselRef.current;
    if (clientWidth === 0) return;
    const cardWidth = clientWidth * 0.85;
    const newIndex = Math.round(scrollLeft / cardWidth);
    if (newIndex >= 0 && newIndex < filteredPrograms.length && newIndex !== activeProgramIndex) {
      setActiveProgramIndex(newIndex);
    }
  };

  const scrollToProgram = (index: number) => {
    if (!carouselRef.current) return;
    const cardWidth = carouselRef.current.clientWidth * 0.85;
    carouselRef.current.scrollTo({
      left: index * cardWidth,
      behavior: 'smooth'
    });
    setActiveProgramIndex(index);
  };

  // Reset scroll and dot when category filter changes
  useEffect(() => {
    setActiveProgramIndex(0);
    if (carouselRef.current) {
      carouselRef.current.scrollTo({ left: 0, behavior: 'smooth' });
    }
  }, [selectedCategory]);

  return (
    <section id="programs" className="space-y-10 py-6 sm:py-10">
      {/* Section Header - Left-Aligned Editorial */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 border-b border-slate-200 pb-6">
        {/* Left-aligned Title */}
        <SectionTitle
          badge="OUR CAUSES & INITIATIVES"
          badgeVariant="green"
          title="Direct Actions Making Real Change"
          highlightWord="Real Change"
          subtitle="Explore our active grassroots welfare initiatives in and around Haldia. Each project is powered entirely by dedicated college students."
          align="left"
        />

        {/* Category Filter Pills Wrapper with Mobile Fade */}
        <div className="relative max-w-full">
          <div className="flex flex-nowrap overflow-x-auto scrollbar-none px-2 py-2 gap-2 md:flex-wrap md:overflow-visible md:p-1.5 md:gap-1.5 items-center bg-slate-100 rounded-xl shrink-0 border border-slate-200">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`shrink-0 whitespace-nowrap px-4 py-2 text-sm md:px-3 md:py-1.5 md:text-xs rounded-lg font-mono transition-all cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-blue-600 text-white font-bold shadow-sm'
                    : 'text-slate-700 hover:text-slate-900 font-medium'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Mobile Right Gradient Fade Hint */}
          <div className="pointer-events-none absolute right-0 top-0 h-full w-8 bg-gradient-to-l from-white to-transparent block md:hidden rounded-r-xl" />
        </div>
      </div>

      {/* Bento Grid on Desktop (md:grid) | Horizontal Swipe Reel on Mobile (< 768px) */}
      <div className="space-y-3">
        <div
          ref={carouselRef}
          onScroll={handleCarouselScroll}
          className="flex flex-nowrap overflow-x-auto snap-x snap-mandatory scrollbar-none gap-4 pb-4 px-1 horizontal-scroll-container overscroll-x-contain md:grid md:grid-cols-2 md:gap-8 md:overflow-visible md:p-0"
        >
          {filteredPrograms.map((program) => {
            const isEducation = program.category === 'Education';
            const isStudentEmpowerment = program.category === 'Student Empowerment';
            const isBentoWide = isEducation || isStudentEmpowerment;

            return (
              <ProgramCard
                key={program._id}
                program={program}
                isBentoSpan={isBentoWide}
                className={`w-[85vw] sm:w-[70vw] shrink-0 snap-center md:w-auto md:shrink md:snap-align-none ${
                  isBentoWide ? 'md:col-span-2' : 'md:col-span-1'
                }`}
              />
            );
          })}
        </div>

        {/* Mobile Swipe Dot Indicator (Hidden on Desktop) */}
        {filteredPrograms.length > 1 && (
          <div className="flex justify-center items-center gap-1.5 pt-2 block md:hidden">
            {filteredPrograms.map((p, idx) => (
              <button
                key={`dot-${p._id}`}
                onClick={() => scrollToProgram(idx)}
                aria-label={`Scroll to ${p.title}`}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  activeProgramIndex === idx
                    ? 'w-6 bg-emerald-600'
                    : 'w-1.5 bg-slate-300 hover:bg-slate-400'
                }`}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};
