import React, { useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { Compass, BookOpen, ShieldCheck, CheckCircle2, Zap, Award, Users, type LucideIcon } from 'lucide-react';

interface MethodologyStep {
  step: string;
  phaseTag: string;
  title: string;
  subtitle: string;
  description: string;
  impactMetric: {
    label: string;
    value: string;
    icon: LucideIcon;
  };
  icon: LucideIcon;
  bullets: string[];
}

// Mobile-only clamp with "+ Read more" / "- Show less" toggle
const ClampedCardText: React.FC<{ text: string; className?: string }> = ({ text, className = '' }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="relative z-10 mb-6">
      <p className={`${className} ${isExpanded ? 'line-clamp-none' : 'line-clamp-3 md:line-clamp-none'}`}>
        {text}
      </p>
      <button
        type="button"
        onClick={() => setIsExpanded(!isExpanded)}
        className="text-xs font-semibold text-emerald-600 block md:hidden mt-2 cursor-pointer hover:underline"
      >
        {isExpanded ? '- Show less' : '+ Read more'}
      </button>
    </div>
  );
};

// 3D Tilt Card Component using Framer Motion
const TiltCard: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className = '' }) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 180, damping: 20 });
  const mouseYSpring = useSpring(y, { stiffness: 180, damping: 20 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ['6deg', '-6deg']);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ['-6deg', '6deg']);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    x.set(mouseX / width - 0.5);
    y.set(mouseY / height - 0.5);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: 'preserve-3d',
      }}
      className={`perspective-1000 ${className}`}
    >
      {children}
    </motion.div>
  );
};

export const MethodologySection: React.FC = () => {
  const steps: MethodologyStep[] = [
    {
      step: '01',
      phaseTag: 'PHASE 01 • RAPID SCOUTING & RESCUE',
      title: 'Identify & Reach',
      subtitle: 'Cluster Mapping & Emergency Dispatch',
      description:
        'Volunteer student scouts survey rural colonies across Purba Medinipur to map out-of-school children, while our 24/7 campus helpline receives real-time distress calls for injured animals.',
      impactMetric: {
        value: '15-Min Dispatch',
        label: 'Emergency Response',
        icon: Zap,
      },
      icon: Compass,
      bullets: [
        'Door-to-door educational baseline surveys in Purba Medinipur',
        '24/7 dedicated helpline for road accidents and distress calls',
        'Immediate first-aid and medical triage dispatched within 15 minutes',
      ],
    },
    {
      step: '02',
      phaseTag: 'PHASE 02 • SYSTEMIC EDUCATION & CARE',
      title: 'Nurture & Educate',
      subtitle: 'Daily Evening Classes & Veterinary Clinics',
      description:
        'Every evening after university hours, engineering volunteers teach foundational STEM and literacy, while our animal welfare squad administers antiseptic dressings, post-operative care, and rabies vaccinations.',
      impactMetric: {
        value: '150+ Daily',
        label: 'Nutritional Meals & Classes',
        icon: Users,
      },
      icon: BookOpen,
      bullets: [
        '100% free daily academic coaching tailored to learning levels',
        'Daily nutritional snacks, boiled eggs, and fresh milk provided',
        'Routine vaccination & sterilization camps covering campus strays',
      ],
    },
    {
      step: '03',
      phaseTag: 'PHASE 03 • SUSTAINABLE REINTEGRATION',
      title: 'Empower & Sustain',
      subtitle: 'Accredited Schooling & Lifelong Dignity',
      description:
        'We transition enrolled rural children into formal accredited schools, sponsor their full admission and uniform fees, and build permanent community awareness for animal coexistence.',
      impactMetric: {
        value: '100% Retention',
        label: 'Zero Dropout Pipeline',
        icon: Award,
      },
      icon: ShieldCheck,
      bullets: [
        'Full scholarships and uniform sponsorship for formal schooling',
        'Leadership & civic volunteer training for HIT undergraduates',
        'Zero overhead deductions—100% direct-to-ground resource allocation',
      ],
    },
  ];

  return (
    <section className="relative bg-white/90 backdrop-blur-md border-y border-slate-200 -mx-4 sm:-mx-8 lg:-mx-12 px-4 sm:px-8 lg:px-12 py-16 sm:py-24 my-10 overflow-hidden shadow-xl rounded-3xl">
      {/* Background Watermark Grid Texture */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[radial-gradient(rgba(37,99,235,0.08)_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-[radial-gradient(rgba(16,185,129,0.08)_1px,transparent_1px)] [background-size:20px_20px] pointer-events-none" />

      <div className="max-w-[1360px] mx-auto">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-16 xl:gap-20 items-start">
          
          {/* Left Side (40% width): Sticky Editorial Column */}
          <div className="w-full lg:w-[38%] lg:sticky lg:top-28 self-start space-y-6 lg:pr-6">
            {/* Cyan/Emerald Kicker Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-xs font-mono font-bold tracking-wider uppercase">
              <span className="w-2 h-2 rounded-full bg-blue-600 animate-pulse" />
              <span>OUR METHODOLOGY</span>
            </div>

            {/* Headline */}
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-extrabold text-slate-900 tracking-tight leading-[1.12]">
              How The System <br className="hidden sm:inline" />
              Protects Every Life & <br className="hidden sm:inline" />
              <span className="italic font-normal bg-gradient-to-r from-blue-600 via-cyan-600 to-emerald-600 bg-clip-text text-transparent">
                Every Journey.
              </span>
            </h2>

            <p className="text-slate-700 text-sm sm:text-base leading-relaxed font-normal">
              From the initial distress call to formal school enrollment, our student-powered framework ensures total operational accountability, clinical compassion, and permanent transformation without bureaucratic friction.
            </p>

            {/* Micro Execution Stats */}
            <div className="grid grid-cols-2 gap-3.5 pt-2">
              <div className="bg-slate-50/80 border border-slate-200/70 rounded-2xl p-4 space-y-1 shadow-[0_1px_3px_rgba(0,0,0,0.02)]">
                <span className="font-mono text-base font-bold text-slate-900 block">6 Days/Wk</span>
                <span className="text-[11px] font-mono text-blue-700 uppercase tracking-wider block font-bold">Field Execution</span>
              </div>
              <div className="bg-slate-50/80 border border-slate-200/70 rounded-2xl p-4 space-y-1 shadow-[0_1px_3px_rgba(0,0,0,0.02)]">
                <span className="font-mono text-base font-bold text-slate-900 block">100% Direct</span>
                <span className="text-[11px] font-mono text-emerald-700 uppercase tracking-wider block font-bold">Zero Bureaucracy</span>
              </div>
            </div>

            {/* Thesis Quote Box */}
            <div className="pt-6 border-t border-slate-200/60 space-y-2">
              <span className="text-[11px] font-mono uppercase tracking-wider text-emerald-700 font-bold block">
                The Execution Principle
              </span>
              <blockquote className="font-serif italic text-slate-800 text-base sm:text-lg leading-snug">
                "Action on the ground, led directly by engineers with empathy."
              </blockquote>
            </div>
          </div>

          {/* Right Side (62% width): Scrollytelling Glass Cards with Increased Breathing Space */}
          <div className="w-full lg:w-[62%] space-y-12 sm:space-y-16 lg:space-y-20">
            {steps.map((item, index) => {
              const Icon = item.icon;
              const MetricIcon = item.impactMetric.icon;

              return (
                <motion.div
                  key={item.step}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{
                    duration: 0.6,
                    delay: index * 0.1,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                >
                  <TiltCard>
                    <div className="relative bg-white/95 backdrop-blur-sm border border-slate-200/60 rounded-3xl p-7 sm:p-10 shadow-[0_8px_30px_rgb(0,0,0,0.03),0_0_1px_1px_rgba(0,0,0,0.02)] hover:shadow-[0_16px_40px_rgba(0,0,0,0.06)] hover:border-emerald-500/40 transition-all duration-300 overflow-hidden group">
                      
                      {/* Oversized Background Step Number */}
                      <span className="absolute -top-2 right-4 font-serif text-7xl sm:text-8xl font-extrabold text-slate-200 select-none pointer-events-none group-hover:text-blue-200/50 transition-colors duration-500">
                        {item.step}
                      </span>

                      {/* Top Row: Phase Tag + Micro Impact Badge */}
                      <div className="flex flex-wrap items-center justify-between gap-3 relative z-10 border-b border-slate-100 pb-4 mb-5">
                        <span className="font-mono text-[11px] font-bold text-blue-700 tracking-wider uppercase bg-blue-50/80 border border-blue-200/60 px-3 py-1 rounded-full shadow-[0_1px_2px_rgba(0,0,0,0.02)]">
                          {item.phaseTag}
                        </span>

                        {/* Impact Metric Badge */}
                        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50/80 border border-emerald-200/60 text-emerald-800 shadow-[0_1px_2px_rgba(0,0,0,0.02)]">
                          <MetricIcon size={13} className="text-emerald-600" />
                          <span className="font-mono text-[11px] font-bold text-emerald-700">{item.impactMetric.value}</span>
                          <span className="text-[10px] text-slate-600 hidden sm:inline">• {item.impactMetric.label}</span>
                        </div>
                      </div>

                      {/* Header with Icon and Title */}
                      <div className="relative z-10 flex items-start gap-4 mb-4">
                        <div className="w-12 h-12 rounded-2xl bg-blue-50/90 border border-blue-100/80 flex items-center justify-center text-blue-600 shrink-0 group-hover:bg-blue-600 group-hover:text-white transition-colors duration-300 shadow-[0_2px_6px_rgba(0,0,0,0.02)]">
                          <Icon size={22} strokeWidth={1.75} />
                        </div>
                        <div>
                          <span className="text-xs font-mono uppercase tracking-wider text-emerald-700 font-bold block">
                            {item.subtitle}
                          </span>
                          <h3 className="text-2xl sm:text-3xl font-serif font-extrabold text-slate-900 mt-0.5">
                            {item.title}
                          </h3>
                        </div>
                      </div>

                      {/* Description with Mobile-Only Read More Clamp */}
                      <ClampedCardText
                        text={item.description}
                        className="text-slate-700 text-sm sm:text-base leading-relaxed font-normal"
                      />

                      {/* Tactical Execution Bullets */}
                      <div className="relative z-10 pt-4 border-t border-slate-100 space-y-2.5">
                        {item.bullets.map((bullet, bIdx) => (
                          <div key={bIdx} className="flex items-start gap-3 text-xs sm:text-sm text-slate-800 font-medium">
                            <CheckCircle2 size={15} className="text-emerald-600 shrink-0 mt-0.5" strokeWidth={2} />
                            <span className="leading-snug">{bullet}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </TiltCard>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

