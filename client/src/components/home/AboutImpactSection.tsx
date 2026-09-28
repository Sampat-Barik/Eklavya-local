import React, { useState, useEffect } from 'react';
import { SectionTitle } from '../ui/SectionTitle';
import { ImpactStats } from '../ui/ImpactStats';
import type { ImpactMetric } from '../../types/ngo';
import { ngoService } from '../../services/ngoService';
import { BookOpen, Heart, Users, Quote } from 'lucide-react';

export const AboutImpactSection: React.FC = () => {
  const [metrics, setMetrics] = useState<ImpactMetric[]>([]);
  const [activeTab, setActiveTab] = useState<'all' | 'education' | 'animal'>('all');

  useEffect(() => {
    const loadMetrics = async () => {
      const data = await ngoService.getImpactMetrics();
      setMetrics(data);
    };
    loadMetrics();
  }, []);

  const filteredMetrics = metrics.filter((m) => {
    if (activeTab === 'all') return true;
    return m.category === activeTab || m.category === 'community';
  });

  return (
    <section id="about" className="space-y-12 sm:space-y-16 py-8 sm:py-12 lg:py-16">
      {/* Top Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 sm:gap-8 border-b border-slate-200/60 pb-8 sm:pb-10">
        <SectionTitle
          badge="OUR PURPOSE & IMPACT"
          badgeVariant="green"
          title="Bridging Hope for Children & Animals"
          highlightWord="Hope"
          subtitle="Founded and led entirely by students of Haldia Institute of Technology, Eklavya unites technical student power with grassroot social welfare."
        />

        {/* Minimal Category Filter Tabs */}
        <div className="inline-flex items-center gap-1.5 p-1.5 bg-white/90 backdrop-blur-md border border-slate-200/70 rounded-full shadow-[0_2px_8px_rgba(15,23,42,0.03)] shrink-0 self-start md:self-auto text-xs">
          <button
            onClick={() => setActiveTab('all')}
            className={`px-4 py-2 rounded-full font-medium transition-all duration-200 cursor-pointer ${
              activeTab === 'all'
                ? 'bg-slate-900 text-white font-semibold shadow-sm'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/70'
            }`}
          >
            All Impact
          </button>
          <button
            onClick={() => setActiveTab('education')}
            className={`px-4 py-2 rounded-full font-medium transition-all duration-200 cursor-pointer ${
              activeTab === 'education'
                ? 'bg-blue-600 text-white font-semibold shadow-sm'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/70'
            }`}
          >
            Education
          </button>
          <button
            onClick={() => setActiveTab('animal')}
            className={`px-4 py-2 rounded-full font-medium transition-all duration-200 cursor-pointer ${
              activeTab === 'animal'
                ? 'bg-emerald-600 text-white font-semibold shadow-sm'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/70'
            }`}
          >
            Animal Rescue
          </button>
        </div>
      </div>

      {/* Asymmetric Split Layout with Generous Negative Space */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 xl:gap-14 items-stretch">
        
        {/* Left Column: Authentic Field Photography & Narrative (5 cols) */}
        <div className="lg:col-span-5 rounded-3xl bg-white/95 backdrop-blur-md border border-slate-200/60 p-7 sm:p-9 lg:p-10 flex flex-col justify-between space-y-7 sm:space-y-8 shadow-[0_8px_30px_rgb(0,0,0,0.03),0_0_1px_1px_rgba(0,0,0,0.02)] transition-all duration-300 hover:shadow-[0_16px_40px_rgba(0,0,0,0.06)]">
          <div className="space-y-3.5">
            <h3 className="font-serif text-2xl sm:text-[26px] font-bold text-slate-900 leading-snug tracking-tight">
              Grassroot Compassion, Real Engineering Leadership
            </h3>
            <p className="text-slate-600 text-xs sm:text-sm leading-relaxed font-normal">
              Every afternoon as university lectures conclude, Eklavya student volunteers assemble at rural settlements around Haldia. We teach underprivileged children foundational literacy and numeracy, while our veterinary squad administers field dressings and rabies immunizations.
            </p>
          </div>

          {/* Documentary Photo Frame */}
          <div className="relative rounded-2xl overflow-hidden border border-slate-200/50 shadow-[0_6px_20px_rgba(0,0,0,0.06)] aspect-[16/10] sm:aspect-[16/9] group">
            <img
              src="/eklavya_human_hero.jpg"
              alt="Eklavya evening school class"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent" />
            
            <div className="absolute top-3.5 left-3.5 bg-white/95 backdrop-blur-md px-3 py-1 rounded-full text-[11px] font-medium tracking-wide text-blue-700 border border-slate-100 shadow-sm flex items-center gap-1 font-sans">
              <span>📍</span> Haldia Rural Periphery
            </div>

            <div className="absolute bottom-3.5 left-4 right-4 text-white text-xs sm:text-[13px] flex items-center justify-between">
              <span className="font-medium drop-shadow-sm">Daily Evening School Center</span>
              <span className="text-[10px] sm:text-[11px] font-mono uppercase tracking-wider text-emerald-300 font-bold drop-shadow-sm">
                4:30 PM Daily
              </span>
            </div>
          </div>

          {/* Core Pillars Trio */}
          <div className="grid grid-cols-3 gap-3 sm:gap-3.5 pt-6 border-t border-slate-100 text-center">
            <div className="p-3 sm:p-3.5 rounded-xl bg-slate-50/70 hover:bg-slate-100/60 border border-slate-200/50 hover:border-slate-300/60 transition-all duration-200 flex flex-col items-center justify-center gap-2 group/pillar shadow-[0_1px_2px_rgba(0,0,0,0.01)]">
              <div className="w-8 h-8 rounded-lg bg-blue-50/90 text-blue-600 border border-blue-100/60 flex items-center justify-center transition-transform group-hover/pillar:scale-105">
                <BookOpen size={15} strokeWidth={1.8} />
              </div>
              <div className="text-xs font-semibold text-slate-700 group-hover/pillar:text-slate-900 tracking-tight">Free Schools</div>
            </div>
            <div className="p-3 sm:p-3.5 rounded-xl bg-slate-50/70 hover:bg-slate-100/60 border border-slate-200/50 hover:border-slate-300/60 transition-all duration-200 flex flex-col items-center justify-center gap-2 group/pillar shadow-[0_1px_2px_rgba(0,0,0,0.01)]">
              <div className="w-8 h-8 rounded-lg bg-emerald-50/90 text-emerald-600 border border-emerald-100/60 flex items-center justify-center transition-transform group-hover/pillar:scale-105">
                <Heart size={15} strokeWidth={1.8} />
              </div>
              <div className="text-xs font-semibold text-slate-700 group-hover/pillar:text-slate-900 tracking-tight">Animal Aid</div>
            </div>
            <div className="p-3 sm:p-3.5 rounded-xl bg-slate-50/70 hover:bg-slate-100/60 border border-slate-200/50 hover:border-slate-300/60 transition-all duration-200 flex flex-col items-center justify-center gap-2 group/pillar shadow-[0_1px_2px_rgba(0,0,0,0.01)]">
              <div className="w-8 h-8 rounded-lg bg-cyan-50/90 text-cyan-600 border border-cyan-100/60 flex items-center justify-center transition-transform group-hover/pillar:scale-105">
                <Users size={15} strokeWidth={1.8} />
              </div>
              <div className="text-xs font-semibold text-slate-700 group-hover/pillar:text-slate-900 tracking-tight">HIT Students</div>
            </div>
          </div>
        </div>

        {/* Right Column: Numeric Metrics & Leadership Quote (7 cols) */}
        <div className="lg:col-span-7 flex flex-col justify-between space-y-6 sm:space-y-7">
          <ImpactStats metrics={filteredMetrics} />

          {/* Editorial Leadership Quote */}
          <div className="bg-white/95 backdrop-blur-md text-slate-900 rounded-2xl p-6 sm:p-8 flex items-start gap-4 sm:gap-5 border border-slate-200/60 shadow-[0_4px_20px_-2px_rgba(15,23,42,0.03),0_0_1px_1px_rgba(15,23,42,0.02)] transition-all hover:shadow-[0_10px_30px_-5px_rgba(15,23,42,0.06)]">
            <div className="w-10 h-10 rounded-xl bg-emerald-50/80 border border-emerald-100/60 flex items-center justify-center shrink-0 mt-0.5 shadow-[0_1px_2px_rgba(0,0,0,0.02)]">
              <Quote className="text-emerald-600" size={18} strokeWidth={2} />
            </div>
            <div className="space-y-2.5">
              <p className="font-serif text-sm sm:text-base font-normal italic leading-relaxed text-slate-700">
                "Our measure of success is simple: one child writing their own future, one injured animal nursed back to health. Pure student energy dedicated to humanity."
              </p>
              <div className="text-[11px] font-mono uppercase tracking-wider text-blue-600/90 font-semibold pt-0.5">
                — Eklavya Student Executive Committee • HIT Haldia
              </div>
            </div>
          </div>
        </div>
      </div>

    </section>
  );
};
