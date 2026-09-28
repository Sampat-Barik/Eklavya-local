import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Compass,
  BookOpen,
  Heart,
  Users,
  Target,
  CheckCircle2,
  ShieldCheck,
  Award,
  Sparkles,
  Clock,
  ArrowRight,
  GraduationCap,
  Stethoscope,
  Layers,
  Lightbulb,
  Eye,
  Flag,
  Scale,
  HeartHandshake,
  Quote
} from 'lucide-react';

// Mobile-only clamp with "+ Read more" / "- Show less" toggle
const ClampedCardText: React.FC<{ text: string; className?: string }> = ({ text, className = '' }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div>
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

export const Vision: React.FC = () => {
  const [activeWingTab, setActiveWingTab] = useState<'education' | 'animal'>('education');

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="max-w-[1720px] 2xl:max-w-[1800px] w-full mx-auto px-6 sm:px-10 lg:px-16 py-10 sm:py-16 space-y-24 sm:space-y-32">
      {/* ========================================================================= */}
      {/* 1. ARCHITECTURAL EXPANDED PAGE HEADER & IDENTITY MATRIX */}
      {/* ========================================================================= */}
      <section className="border-b border-slate-200 pb-12 sm:pb-16 space-y-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-end">
          <div className="lg:col-span-8 space-y-5">
            <div className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-blue-700 font-bold bg-blue-50/80 border border-blue-200 px-3.5 py-1.5 rounded-full">
              <Compass size={14} className="text-blue-600 animate-pulse" />
              <span>Institutional Charter • Eklavya Society • HIT Haldia</span>
            </div>
            
            <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 leading-[1.08]">
              Where Engineering Meets Empathy. <br className="hidden sm:inline" />
              <span className="bg-gradient-to-r from-blue-700 via-teal-700 to-emerald-700 bg-clip-text text-transparent">
                Our Vision, Mission & Moral Blueprint.
              </span>
            </h1>

            <p className="text-slate-700 text-base sm:text-lg max-w-3xl font-normal leading-relaxed">
              Founded in 2014 by undergraduate students at Haldia Institute of Technology, Eklavya operates on the moral conviction that no child’s future should be extinguished by poverty, and no voiceless stray animal should suffer without compassionate medical rescue. We transform technical minds into lifelong civic guardians.
            </p>

            {/* Quick in-page section jump links */}
            <div className="flex flex-wrap items-center gap-2 pt-2 text-xs font-mono">
              <span className="text-slate-600 font-bold uppercase tracking-wider mr-1">Quick Jump:</span>
              <button
                onClick={() => scrollToSection('vision-manifesto')}
                className="px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-blue-50 text-slate-700 hover:text-blue-700 border border-slate-200 transition-colors cursor-pointer"
              >
                # The Vision
              </button>
              <button
                onClick={() => scrollToSection('mission-manifesto')}
                className="px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-emerald-50 text-slate-700 hover:text-emerald-700 border border-slate-200 transition-colors cursor-pointer"
              >
                # The Mission
              </button>
              <button
                onClick={() => scrollToSection('guiding-principles')}
                className="px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-teal-50 text-slate-700 hover:text-teal-700 border border-slate-200 transition-colors cursor-pointer"
              >
                # 6 Principles
              </button>
              <button
                onClick={() => scrollToSection('operational-wings')}
                className="px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-cyan-50 text-slate-700 hover:text-cyan-700 border border-slate-200 transition-colors cursor-pointer"
              >
                # Operational Wings
              </button>
              <button
                onClick={() => scrollToSection('strategic-roadmap')}
                className="px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-purple-50 text-slate-700 hover:text-purple-700 border border-slate-200 transition-colors cursor-pointer"
              >
                # 2026–2030 Roadmap
              </button>
            </div>
          </div>

          <div className="lg:col-span-4 flex flex-col gap-3">
            <div className="bg-white/95 backdrop-blur-md border border-slate-200 rounded-2xl p-6 space-y-3.5 shadow-md">
              <div className="flex items-center justify-between text-xs font-mono text-slate-600 border-b border-slate-100 pb-2">
                <span>HEADQUARTERS</span>
                <span className="font-bold text-slate-900">HIT CAMPUS, WB</span>
              </div>
              <div className="flex items-center justify-between text-xs font-mono text-slate-600 border-b border-slate-100 pb-2">
                <span>FOUNDING ROOTS</span>
                <span className="font-bold text-slate-900">EST. 2014 BY STUDENTS</span>
              </div>
              <div className="flex items-center justify-between text-xs font-mono text-slate-600 border-b border-slate-100 pb-2">
                <span>GOVERNANCE MODEL</span>
                <span className="font-bold text-blue-700">100% VOLUNTEER RUN</span>
              </div>
              <div className="flex items-center justify-between text-xs font-mono text-slate-600">
                <span>FIDUCIARY AUDIT</span>
                <span className="font-bold text-emerald-700">ZERO ADMIN DEDUCTION</span>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-gradient-to-r from-blue-900 to-slate-900 text-white flex items-center justify-between shadow-sm">
              <div className="space-y-0.5">
                <span className="text-[10px] font-mono uppercase tracking-wider text-blue-300">Registered Student Wing</span>
                <p className="text-xs font-medium text-slate-200">Haldia Institute of Technology Student Welfare</p>
              </div>
              <ShieldCheck className="text-emerald-400 shrink-0" size={24} />
            </div>
          </div>
        </div>

        {/* High-Impact Stat Strip (Expanded metrics) */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3.5 sm:gap-6 pt-4">
          <div className="bg-white/90 backdrop-blur-md border border-slate-200 rounded-2xl p-4 sm:p-5 shadow-xs flex flex-col justify-between">
            <span className="text-[11px] sm:text-xs font-mono uppercase tracking-wider text-blue-700 font-bold">Daily Academy</span>
            <div className="my-2 flex flex-col sm:flex-row sm:items-baseline sm:gap-1.5">
              <span className="font-serif text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 leading-none">150+</span>
              <span className="text-blue-600 text-sm sm:text-base md:text-lg font-bold mt-1 sm:mt-0">Students</span>
            </div>
            <p className="text-xs text-slate-600 font-medium leading-relaxed">
              Tutored 6 days every week with zero tuition fees and free study supplies.
            </p>
          </div>

          <div className="bg-white/90 backdrop-blur-md border border-slate-200 rounded-2xl p-4 sm:p-5 shadow-xs flex flex-col justify-between">
            <span className="text-[11px] sm:text-xs font-mono uppercase tracking-wider text-emerald-700 font-bold">Ground Care</span>
            <div className="my-2 flex flex-col sm:flex-row sm:items-baseline sm:gap-1.5">
              <span className="font-serif text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 leading-none">120+</span>
              <span className="text-emerald-600 text-sm sm:text-base md:text-lg font-bold mt-1 sm:mt-0">Rescues / Yr</span>
            </div>
            <p className="text-xs text-slate-600 font-medium leading-relaxed">
              Trauma surgery, anti-rabies vaccinations, emergency first-aid & campus feeding.
            </p>
          </div>

          <div className="bg-white/90 backdrop-blur-md border border-slate-200 rounded-2xl p-4 sm:p-5 shadow-xs flex flex-col justify-between">
            <span className="text-[11px] sm:text-xs font-mono uppercase tracking-wider text-teal-700 font-bold">Field Force</span>
            <div className="my-2 flex flex-col sm:flex-row sm:items-baseline sm:gap-1.5">
              <span className="font-serif text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 leading-none">80+</span>
              <span className="text-teal-600 text-sm sm:text-base md:text-lg font-bold mt-1 sm:mt-0">Active Engineers</span>
            </div>
            <p className="text-xs text-slate-600 font-medium leading-relaxed">
              HIT undergraduate engineering students leading on-ground operations daily.
            </p>
          </div>

          <div className="bg-white/90 backdrop-blur-md border border-slate-200 rounded-2xl p-4 sm:p-5 shadow-xs flex flex-col justify-between">
            <span className="text-[11px] sm:text-xs font-mono uppercase tracking-wider text-amber-700 font-bold">Continuity</span>
            <div className="my-2 flex flex-col sm:flex-row sm:items-baseline sm:gap-1.5">
              <span className="font-serif text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 leading-none">10+</span>
              <span className="text-amber-600 text-sm sm:text-base md:text-lg font-bold mt-1 sm:mt-0">Years Groundwork</span>
            </div>
            <p className="text-xs text-slate-600 font-medium leading-relaxed">
              Unbroken operational legacy passed down through continuous student batches.
            </p>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 2. DEDICATED EXPANSIVE "OUR VISION" SECTION */}
      {/* ========================================================================= */}
      <section id="vision-manifesto" className="scroll-mt-24 space-y-8">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-blue-700 font-bold">
            <Eye size={16} />
            <span>The Horizon We Strive For • Our Vision</span>
          </div>
          <h2 className="font-serif text-2xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900">
            A World Where Circumstance Does Not Dictate Destiny
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Main Vision Manifesto Card */}
          <div className="lg:col-span-7 bg-gradient-to-br from-blue-900 via-slate-900 to-indigo-950 text-white rounded-3xl p-8 sm:p-12 space-y-8 shadow-xl relative overflow-hidden flex flex-col justify-between">
            {/* Ambient decorative watermark */}
            <div className="absolute -right-16 -top-16 w-80 h-80 rounded-full bg-blue-500/10 blur-3xl pointer-events-none" />
            <div className="absolute -left-16 -bottom-16 w-80 h-80 rounded-full bg-emerald-500/10 blur-3xl pointer-events-none" />

            <div className="space-y-6 relative z-10">
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs uppercase tracking-widest text-blue-300 font-bold border border-blue-400/30 px-3 py-1 rounded-full bg-blue-500/10">
                  Vision Statement 2030
                </span>
                <Quote size={28} className="text-blue-300/40" />
              </div>

              <blockquote className="font-serif text-2xl sm:text-3xl lg:text-4xl font-normal leading-snug text-slate-100">
                "We envision a compassionate, self-sustaining society where no child is deprived of high-quality education due to socioeconomic barriers, and where all living beings—especially voiceless animals—coexist with dignity, safety, and institutional protection."
              </blockquote>

              <p className="text-slate-300 text-sm sm:text-base leading-relaxed font-normal">
                At Eklavya, we reject the notion that poverty is an acceptable ceiling on human potential. We imagine a Haldia where every slum-dwelling child can read with confidence, solve mathematical challenges, code their first computer program, and step proudly into accredited secondary schools. Simultaneously, we envision university campuses transformed into sanctuaries of empathy, where stray animals are vaccinated, nourished, and treated as valued co-inhabitants rather than campus nuisances.
              </p>
            </div>

            <div className="pt-6 border-t border-slate-700/60 grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs font-mono relative z-10">
              <div>
                <span className="text-blue-300 font-bold block">EQUITY</span>
                <span className="text-slate-400">Zero dropouts due to lack of supplies</span>
              </div>
              <div>
                <span className="text-emerald-300 font-bold block">COMPASSION</span>
                <span className="text-slate-400">100% rabies-free campus perimeter</span>
              </div>
              <div>
                <span className="text-cyan-300 font-bold block">CITIZENSHIP</span>
                <span className="text-slate-400">Technologists with an active conscience</span>
              </div>
            </div>
          </div>

          {/* Vision Action Pillars & Visual Card */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            {/* Visual Image Card with Real Ground Action */}
            <div className="relative rounded-3xl overflow-hidden border border-slate-200 shadow-md group h-64 sm:h-72">
              <img
                src="/eklavya_human_hero.jpg"
                alt="Eklavya Evening School in Session"
                className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent flex flex-col justify-end p-6 text-white">
                <span className="font-mono text-[10px] uppercase tracking-wider text-emerald-300 font-bold">
                  Ground Reality • Haldia, WB
                </span>
                <h4 className="font-serif text-lg font-bold text-white">
                  The Daily Evening Classroom
                </h4>
                <p className="text-xs text-slate-200 mt-1">
                  Volunteer engineers tutoring 150+ students every single day after university hours.
                </p>
              </div>
            </div>

            {/* Visionary Pillars Bento */}
            <div className="bg-white/90 backdrop-blur-md border border-slate-200 rounded-3xl p-6 sm:p-7 space-y-4 shadow-sm flex-1 flex flex-col justify-between">
              <div className="space-y-3">
                <span className="font-mono text-xs uppercase tracking-wider text-blue-700 font-bold block">
                  Three Horizon Targets
                </span>
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <div className="w-7 h-7 rounded-lg bg-blue-50 border border-blue-200 flex items-center justify-center text-blue-700 shrink-0 mt-0.5">
                      <GraduationCap size={15} />
                    </div>
                    <div>
                      <h4 className="text-xs sm:text-sm font-bold text-slate-900">Foundational & Digital Literacy</h4>
                      <p className="text-xs text-slate-600">Bridging the deep digital divide through regular computer lab sessions and English tutoring.</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-7 h-7 rounded-lg bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-700 shrink-0 mt-0.5">
                      <Heart size={15} />
                    </div>
                    <div>
                      <h4 className="text-xs sm:text-sm font-bold text-slate-900">Safe, Healthy Co-Existence</h4>
                      <p className="text-xs text-slate-600">Zero cruelty, zero rabies, and complete community feeding for all campus stray animals.</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-7 h-7 rounded-lg bg-purple-50 border border-purple-200 flex items-center justify-center text-purple-700 shrink-0 mt-0.5">
                      <Lightbulb size={15} />
                    </div>
                    <div>
                      <h4 className="text-xs sm:text-sm font-bold text-slate-900">Student Mentorship Pipeline</h4>
                      <p className="text-xs text-slate-600">Cultivating hundreds of socially sensitized engineers who graduate into ethical corporate leaders.</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500 font-mono">
                <span>MANDATE HORIZON</span>
                <span className="font-bold text-slate-800">2026 – 2030 STRATEGY</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 3. DEDICATED EXPANSIVE "OUR MISSION" SECTION */}
      {/* ========================================================================= */}
      <section id="mission-manifesto" className="scroll-mt-24 space-y-8">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-emerald-700 font-bold">
            <Target size={16} />
            <span>How We Deliver Daily Impact • Our Mission</span>
          </div>
          <h2 className="font-serif text-2xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900">
            Disciplined, Daily Grassroots Execution on the Ground
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Mission Feature Image & Quick Facts */}
          <div className="lg:col-span-5 flex flex-col gap-6 order-2 lg:order-1">
            <div className="relative rounded-3xl overflow-hidden border border-slate-200 shadow-md group h-64 sm:h-72">
              <img
                src="/eklavya_animal_care.jpg"
                alt="Eklavya Animal Care Squad at Work"
                className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent flex flex-col justify-end p-6 text-white">
                <span className="font-mono text-[10px] uppercase tracking-wider text-teal-300 font-bold">
                  24/7 Field Rescue • Purba Medinipur
                </span>
                <h4 className="font-serif text-lg font-bold text-white">
                  Animal Welfare & Medical Intervention
                </h4>
                <p className="text-xs text-slate-200 mt-1">
                  Undergraduates treating fractures, maggots, and providing post-operative foster care.
                </p>
              </div>
            </div>

            <div className="bg-white/90 backdrop-blur-md border border-slate-200 rounded-3xl p-6 sm:p-7 space-y-4 shadow-sm flex-1 flex flex-col justify-between">
              <div className="space-y-3">
                <span className="font-mono text-xs uppercase tracking-wider text-emerald-700 font-bold block">
                  Operational Commitments
                </span>
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <div className="w-7 h-7 rounded-lg bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-700 shrink-0 mt-0.5">
                      <Clock size={15} />
                    </div>
                    <div>
                      <h4 className="text-xs sm:text-sm font-bold text-slate-900">6 Days a Week Regularity</h4>
                      <p className="text-xs text-slate-600">We do not do weekend charity photo-ops. We show up every evening from 5:00 to 7:30 PM.</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-7 h-7 rounded-lg bg-blue-50 border border-blue-200 flex items-center justify-center text-blue-700 shrink-0 mt-0.5">
                      <Stethoscope size={15} />
                    </div>
                    <div>
                      <h4 className="text-xs sm:text-sm font-bold text-slate-900">Immediate Medical Triage</h4>
                      <p className="text-xs text-slate-600">Campus emergency squad dispatched within minutes of any reported animal distress call.</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-7 h-7 rounded-lg bg-amber-50 border border-amber-200 flex items-center justify-center text-amber-700 shrink-0 mt-0.5">
                      <Scale size={15} />
                    </div>
                    <div>
                      <h4 className="text-xs sm:text-sm font-bold text-slate-900">Complete Financial Transparency</h4>
                      <p className="text-xs text-slate-600">Every donation rupee is recorded, verified, and mapped directly to tangible bills and receipts.</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500 font-mono">
                <span>EXECUTION FREQUENCY</span>
                <span className="font-bold text-emerald-800">312 SESSIONS / YEAR</span>
              </div>
            </div>
          </div>

          {/* Main Mission Manifesto Card */}
          <div className="lg:col-span-7 bg-gradient-to-br from-emerald-900 via-teal-950 to-slate-900 text-white rounded-3xl p-8 sm:p-12 space-y-8 shadow-xl relative overflow-hidden flex flex-col justify-between order-1 lg:order-2">
            <div className="absolute -right-16 -top-16 w-80 h-80 rounded-full bg-emerald-500/10 blur-3xl pointer-events-none" />
            <div className="absolute -left-16 -bottom-16 w-80 h-80 rounded-full bg-teal-500/10 blur-3xl pointer-events-none" />

            <div className="space-y-6 relative z-10">
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs uppercase tracking-widest text-emerald-300 font-bold border border-emerald-400/30 px-3 py-1 rounded-full bg-emerald-500/10">
                  Mission Statement in Action
                </span>
                <Quote size={28} className="text-emerald-300/40" />
              </div>

              <blockquote className="font-serif text-2xl sm:text-3xl lg:text-4xl font-normal leading-snug text-slate-100">
                "Our mission is to mobilize the intellect, passion, and engineering discipline of undergraduate youth to deliver uninterrupted free education, nutritious meals, emergency animal rescue, and community relief across Haldia."
              </blockquote>

              <p className="text-slate-300 text-sm sm:text-base leading-relaxed font-normal">
                We believe that empathy without structured action is merely sentimentality. Our mission is defined by rigor: maintaining academic syllabi, conducting periodic diagnostic assessments, providing 100% free textbooks and nutrition, and running an audited veterinary rescue chain. We do not hire third-party intermediaries; every action is carried out by students shoulder-to-shoulder with the local community.
              </p>
            </div>

            <div className="pt-6 border-t border-teal-700/60 grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs font-mono relative z-10">
              <div>
                <span className="text-emerald-300 font-bold block">150+ STUDENTS</span>
                <span className="text-slate-400">Enrolled in evening classes</span>
              </div>
              <div>
                <span className="text-teal-300 font-bold block">6 DAYS / WEEK</span>
                <span className="text-slate-400">Unbroken teaching schedule</span>
              </div>
              <div>
                <span className="text-amber-300 font-bold block">100% FREE AID</span>
                <span className="text-slate-400">Zero cost to any beneficiary</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 4. THE SIX GUIDING PRINCIPLES (PHILOSOPHICAL BEDROCK) */}
      {/* ========================================================================= */}
      <section id="guiding-principles" className="scroll-mt-24 space-y-10 border-t border-slate-200 pt-16">
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-teal-700 font-bold bg-teal-50 px-3 py-1 rounded-full border border-teal-200">
            <Sparkles size={14} className="text-teal-600" />
            <span>Ethical Foundation & Institutional Ethos</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-5xl font-extrabold text-slate-900">
            The Six Moral Cornerstones of Eklavya
          </h2>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed font-normal">
            Every initiative, resource allocation, and volunteer hour at Eklavya is governed by six foundational principles that have guided our society since its inception at HIT.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {/* Principle 1 */}
          <div className="bg-white/90 backdrop-blur-md border border-slate-200 rounded-3xl p-8 space-y-4 shadow-sm hover:shadow-md hover:border-blue-300 transition-all group flex flex-col justify-between">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="font-serif text-3xl font-extrabold text-slate-900 group-hover:text-blue-600 transition-colors">01</span>
                <div className="w-12 h-12 rounded-2xl bg-blue-50 border border-blue-200 flex items-center justify-center text-blue-600 group-hover:scale-110 transition-transform">
                  <Clock size={22} strokeWidth={1.75} />
                </div>
              </div>
              <div className="space-y-2">
                <span className="font-mono text-[11px] uppercase tracking-wider text-blue-700 font-bold block">
                  Sankalpa • Discipline
                </span>
                <h3 className="font-serif text-xl font-bold text-slate-900">
                  Unbroken Consistency
                </h3>
                <ClampedCardText
                  text="Charity fails when it depends on convenience. A child’s learning routine and a wounded dog’s recovery cannot wait for mid-term exams. We show up every single day at 5:00 PM, rain or shine."
                  className="text-slate-600 text-sm leading-relaxed font-normal"
                />
              </div>
            </div>
            <div className="pt-4 border-t border-slate-100 text-xs font-mono text-slate-500">
              312 regular academic sessions per year
            </div>
          </div>

          {/* Principle 2 */}
          <div className="bg-white/90 backdrop-blur-md border border-slate-200 rounded-3xl p-8 space-y-4 shadow-sm hover:shadow-md hover:border-emerald-300 transition-all group flex flex-col justify-between">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="font-serif text-3xl font-extrabold text-slate-900 group-hover:text-emerald-600 transition-colors">02</span>
                <div className="w-12 h-12 rounded-2xl bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-600 group-hover:scale-110 transition-transform">
                  <ShieldCheck size={22} strokeWidth={1.75} />
                </div>
              </div>
              <div className="space-y-2">
                <span className="font-mono text-[11px] uppercase tracking-wider text-emerald-700 font-bold block">
                  Shuddhi • Stewardship
                </span>
                <h3 className="font-serif text-xl font-bold text-slate-900">
                  Total Zero-Overhead Transparency
                </h3>
                <ClampedCardText
                  text="Zero administrative salaries, zero agency commissions, zero marketing overhead. 100% of every rupee donated directly buys student notebooks, pencils, biscuits, veterinary bandages, or vaccines."
                  className="text-slate-600 text-sm leading-relaxed font-normal"
                />
              </div>
            </div>
            <div className="pt-4 border-t border-slate-100 text-xs font-mono text-slate-500">
              Audited ledgers open to public inquiry
            </div>
          </div>

          {/* Principle 3 */}
          <div className="bg-white/90 backdrop-blur-md border border-slate-200 rounded-3xl p-8 space-y-4 shadow-sm hover:shadow-md hover:border-teal-300 transition-all group flex flex-col justify-between">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="font-serif text-3xl font-extrabold text-slate-900 group-hover:text-teal-600 transition-colors">03</span>
                <div className="w-12 h-12 rounded-2xl bg-teal-50 border border-teal-200 flex items-center justify-center text-teal-600 group-hover:scale-110 transition-transform">
                  <HeartHandshake size={22} strokeWidth={1.75} />
                </div>
              </div>
              <div className="space-y-2">
                <span className="font-mono text-[11px] uppercase tracking-wider text-teal-700 font-bold block">
                  Karuna • Action
                </span>
                <h3 className="font-serif text-xl font-bold text-slate-900">
                  Radical Ground Empathy
                </h3>
                <ClampedCardText
                  text="We don't solve social problems from distant auditorium stages. We sit on mats with the children, walk the municipal streets to dress animal wounds, and build deep emotional trust with local families."
                  className="text-slate-600 text-sm leading-relaxed font-normal"
                />
              </div>
            </div>
            <div className="pt-4 border-t border-slate-100 text-xs font-mono text-slate-500">
              Grassroots presence across Haldia wards
            </div>
          </div>

          {/* Principle 4 */}
          <div className="bg-white/90 backdrop-blur-md border border-slate-200 rounded-3xl p-8 space-y-4 shadow-sm hover:shadow-md hover:border-cyan-300 transition-all group flex flex-col justify-between">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="font-serif text-3xl font-extrabold text-slate-900 group-hover:text-cyan-600 transition-colors">04</span>
                <div className="w-12 h-12 rounded-2xl bg-cyan-50 border border-cyan-200 flex items-center justify-center text-cyan-600 group-hover:scale-110 transition-transform">
                  <Layers size={22} strokeWidth={1.75} />
                </div>
              </div>
              <div className="space-y-2">
                <span className="font-mono text-[11px] uppercase tracking-wider text-cyan-700 font-bold block">
                  Yukti • Methodology
                </span>
                <h3 className="font-serif text-xl font-bold text-slate-900">
                  Engineered Pedagogical Rigor
                </h3>
                <ClampedCardText
                  text="Applying engineering discipline to social work: diagnostic baseline reading assessments, structured subject syllabi, volunteer attendance tracking, and hands-on science experiments."
                  className="text-slate-600 text-sm leading-relaxed font-normal"
                />
              </div>
            </div>
            <div className="pt-4 border-t border-slate-100 text-xs font-mono text-slate-500">
              Structured lesson tracks for Grades 1–8
            </div>
          </div>

          {/* Principle 5 */}
          <div className="bg-white/90 backdrop-blur-md border border-slate-200 rounded-3xl p-8 space-y-4 shadow-sm hover:shadow-md hover:border-amber-300 transition-all group flex flex-col justify-between">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="font-serif text-3xl font-extrabold text-slate-900 group-hover:text-amber-600 transition-colors">05</span>
                <div className="w-12 h-12 rounded-2xl bg-amber-50 border border-amber-200 flex items-center justify-center text-amber-600 group-hover:scale-110 transition-transform">
                  <Scale size={22} strokeWidth={1.75} />
                </div>
              </div>
              <div className="space-y-2">
                <span className="font-mono text-[11px] uppercase tracking-wider text-amber-700 font-bold block">
                  Maryada • Respect
                </span>
                <h3 className="font-serif text-xl font-bold text-slate-900">
                  Dignity Over Patronage
                </h3>
                <ClampedCardText
                  text="We reject paternalistic charity. Our children and their hardworking parents are equal stakeholders with immense talent and pride. We empower their self-agency rather than fostering dependency."
                  className="text-slate-600 text-sm leading-relaxed font-normal"
                />
              </div>
            </div>
            <div className="pt-4 border-t border-slate-100 text-xs font-mono text-slate-500">
              Equal partnership with local families
            </div>
          </div>

          {/* Principle 6 */}
          <div className="bg-white/90 backdrop-blur-md border border-slate-200 rounded-3xl p-8 space-y-4 shadow-sm hover:shadow-md hover:border-purple-300 transition-all group flex flex-col justify-between">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="font-serif text-3xl font-extrabold text-slate-900 group-hover:text-purple-600 transition-colors">06</span>
                <div className="w-12 h-12 rounded-2xl bg-purple-50 border border-purple-200 flex items-center justify-center text-purple-600 group-hover:scale-110 transition-transform">
                  <Award size={22} strokeWidth={1.75} />
                </div>
              </div>
              <div className="space-y-2">
                <span className="font-mono text-[11px] uppercase tracking-wider text-purple-700 font-bold block">
                  Nishtha • The Legend
                </span>
                <h3 className="font-serif text-xl font-bold text-slate-900">
                  The Spirit of Eklavya
                </h3>
                <ClampedCardText
                  text="Inspired by the ancient archetype of Eklavya: perseverance, devotion to learning despite systemic exclusion, and the indomitable belief that inner talent transcends social pedigree."
                  className="text-slate-600 text-sm leading-relaxed font-normal"
                />
              </div>
            </div>
            <div className="pt-4 border-t border-slate-100 text-xs font-mono text-slate-500">
              Honoring merit, persistence & self-learning
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 5. DEEP-DIVE: THE TWIN OPERATIONAL WINGS */}
      {/* ========================================================================= */}
      <section id="operational-wings" className="scroll-mt-24 space-y-10 border-t border-slate-200 pt-16">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <span className="font-mono text-xs uppercase tracking-wider text-blue-700 font-bold block">
              Operational Machinery
            </span>
            <h2 className="font-serif text-2xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900">
              The Twin Wings of Eklavya
            </h2>
            <p className="text-slate-600 text-sm sm:text-base font-normal">
              Explore how each wing functions on a daily schedule, staffed entirely by student engineers.
            </p>
          </div>

          {/* Interactive Wing Selector Tabs */}
          <div className="flex items-center gap-2 p-1.5 bg-slate-100 rounded-2xl border border-slate-200 self-start sm:self-auto">
            <button
              onClick={() => setActiveWingTab('education')}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-mono text-xs uppercase tracking-wider font-bold transition-all cursor-pointer ${
                activeWingTab === 'education'
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <BookOpen size={16} />
              <span>Education Wing</span>
            </button>
            <button
              onClick={() => setActiveWingTab('animal')}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-mono text-xs uppercase tracking-wider font-bold transition-all cursor-pointer ${
                activeWingTab === 'animal'
                  ? 'bg-emerald-600 text-white shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Heart size={16} />
              <span>Animal Rescue Wing</span>
            </button>
          </div>
        </div>

        {/* Tab 1 Content: Education Wing */}
        {activeWingTab === 'education' && (
          <div className="bg-white/95 backdrop-blur-md border border-slate-200 rounded-3xl p-8 sm:p-12 space-y-10 shadow-md animate-in fade-in duration-300">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-7 space-y-4">
                <span className="inline-block font-mono text-xs uppercase tracking-wider text-blue-700 font-bold bg-blue-50 px-3 py-1 rounded-full border border-blue-200">
                  Wing 01: Sandhya Pathshala (Evening Academy)
                </span>
                <h3 className="font-serif text-2xl sm:text-4xl font-extrabold text-slate-900">
                  Daily Free Primary Education & Academic Mentorship
                </h3>
                <p className="text-slate-700 text-sm sm:text-base leading-relaxed font-normal">
                  Every evening inside the Haldia Institute of Technology campus, engineering undergraduates gather children from surrounding rural pockets who attend overcrowded government schools or lack basic learning support. We don't just teach the alphabet; we build cognitive confidence and curiosity.
                </p>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-2">
                  <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl">
                    <span className="font-mono text-xs text-slate-500 block">ENROLLMENT</span>
                    <span className="font-serif text-xl font-bold text-slate-900">150+ Students</span>
                  </div>
                  <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl">
                    <span className="font-mono text-xs text-slate-500 block">FREQUENCY</span>
                    <span className="font-serif text-xl font-bold text-slate-900">Mon – Sat</span>
                  </div>
                  <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl">
                    <span className="font-mono text-xs text-slate-500 block">SUPPLIES</span>
                    <span className="font-serif text-xl font-bold text-emerald-700">100% Free</span>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-5 bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-100 rounded-2xl p-6 sm:p-7 space-y-4">
                <h4 className="font-serif text-lg font-bold text-slate-900 flex items-center gap-2">
                  <Clock size={18} className="text-blue-600" />
                  Daily Class Schedule (Mon–Sat)
                </h4>
                <div className="space-y-3 font-mono text-xs text-slate-700">
                  <div className="flex items-start justify-between border-b border-blue-200/60 pb-2">
                    <span className="font-bold text-blue-900">05:00 – 05:15 PM</span>
                    <span>Student Arrival & Attendance Ledger</span>
                  </div>
                  <div className="flex items-start justify-between border-b border-blue-200/60 pb-2">
                    <span className="font-bold text-blue-900">05:15 – 06:15 PM</span>
                    <span>Foundational Maths, Science & Languages</span>
                  </div>
                  <div className="flex items-start justify-between border-b border-blue-200/60 pb-2">
                    <span className="font-bold text-blue-900">06:15 – 06:45 PM</span>
                    <span>Spoken English, Logic & Homework Support</span>
                  </div>
                  <div className="flex items-start justify-between border-b border-blue-200/60 pb-2">
                    <span className="font-bold text-blue-900">06:45 – 07:15 PM</span>
                    <span>Drawing, Storytelling & Moral Science</span>
                  </div>
                  <div className="flex items-start justify-between text-emerald-800 font-bold">
                    <span>07:15 – 07:30 PM</span>
                    <span>Nutritious Snack (Milk/Fruit/Biscuits)</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Core Academic Pillars */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6 border-t border-slate-200">
              <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 space-y-2.5">
                <CheckCircle2 size={20} className="text-blue-600" />
                <h5 className="font-bold text-slate-900 text-sm">Full Supply Kits Provided</h5>
                <p className="text-xs text-slate-600 leading-relaxed font-normal">
                  Each student receives school bags, notebooks, pens, pencils, geometry sets, and winter warmers entirely funded by student and alumni drives.
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 space-y-2.5">
                <CheckCircle2 size={20} className="text-blue-600" />
                <h5 className="font-bold text-slate-900 text-sm">Formal School Enrolment Bridge</h5>
                <p className="text-xs text-slate-600 leading-relaxed font-normal">
                  We assist parents with documentation, birth certificates, and admission fees to bridge first-generation learners into accredited schools.
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 space-y-2.5">
                <CheckCircle2 size={20} className="text-blue-600" />
                <h5 className="font-bold text-slate-900 text-sm">STEM Experiments & Exposure</h5>
                <p className="text-xs text-slate-600 leading-relaxed font-normal">
                  Undergraduates bring simple laboratory optics, circuits, and magnets to spark scientific wonder and curiosity in young rural minds.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Tab 2 Content: Animal Rescue Wing */}
        {activeWingTab === 'animal' && (
          <div className="bg-white/95 backdrop-blur-md border border-slate-200 rounded-3xl p-8 sm:p-12 space-y-10 shadow-md animate-in fade-in duration-300">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-7 space-y-4">
                <span className="inline-block font-mono text-xs uppercase tracking-wider text-emerald-700 font-bold bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
                  Wing 02: Prani Suraksha (Animal Welfare & Rescue)
                </span>
                <h3 className="font-serif text-2xl sm:text-4xl font-extrabold text-slate-900">
                  Rapid-Response Veterinary Care & Anti-Rabies Protection
                </h3>
                <p className="text-slate-700 text-sm sm:text-base leading-relaxed font-normal">
                  Our dedicated ground rescue team covers the entire Haldia Institute of Technology campus and municipal perimeter. We treat accident victims, finance veterinary surgeries, run periodic anti-rabies vaccination drives, and maintain daily feeding stations across campus.
                </p>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-2">
                  <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl">
                    <span className="font-mono text-xs text-slate-500 block">ANNUAL RESCUES</span>
                    <span className="font-serif text-xl font-bold text-slate-900">120+ Animals</span>
                  </div>
                  <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl">
                    <span className="font-mono text-xs text-slate-500 block">EMERGENCY LINE</span>
                    <span className="font-serif text-xl font-bold text-emerald-700">24/7 Response</span>
                  </div>
                  <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl">
                    <span className="font-mono text-xs text-slate-500 block">CAMPUS STATUS</span>
                    <span className="font-serif text-xl font-bold text-blue-700">100% Vaccinated</span>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-5 bg-gradient-to-br from-emerald-50 to-teal-50 border border-emerald-100 rounded-2xl p-6 sm:p-7 space-y-4">
                <h4 className="font-serif text-lg font-bold text-slate-900 flex items-center gap-2">
                  <Stethoscope size={18} className="text-emerald-600" />
                  Rescue & Medical Protocol
                </h4>
                <div className="space-y-3 font-mono text-xs text-slate-700">
                  <div className="flex items-start justify-between border-b border-emerald-200/60 pb-2">
                    <span className="font-bold text-emerald-900">Stage 01</span>
                    <span>Direct Call / WhatsApp Alert Triage</span>
                  </div>
                  <div className="flex items-start justify-between border-b border-emerald-200/60 pb-2">
                    <span className="font-bold text-emerald-900">Stage 02</span>
                    <span>On-Site First-Aid & Maggot Wound Dressing</span>
                  </div>
                  <div className="flex items-start justify-between border-b border-emerald-200/60 pb-2">
                    <span className="font-bold text-emerald-900">Stage 03</span>
                    <span>Transport to Registered Haldia Vet Clinics</span>
                  </div>
                  <div className="flex items-start justify-between border-b border-emerald-200/60 pb-2">
                    <span className="font-bold text-emerald-900">Stage 04</span>
                    <span>Post-Operative Foster Care & Medication</span>
                  </div>
                  <div className="flex items-start justify-between text-teal-800 font-bold">
                    <span>Stage 05</span>
                    <span>Reflective Neck Collar & ARV Inoculation</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Core Rescue Pillars */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6 border-t border-slate-200">
              <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 space-y-2.5">
                <CheckCircle2 size={20} className="text-emerald-600" />
                <h5 className="font-bold text-slate-900 text-sm">Accident & Trauma Response</h5>
                <p className="text-xs text-slate-600 leading-relaxed font-normal">
                  Surgical treatment of fractures, severe wounds, and road trauma coordinated with certified veterinary surgeons in Haldia.
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 space-y-2.5">
                <CheckCircle2 size={20} className="text-emerald-600" />
                <h5 className="font-bold text-slate-900 text-sm">Mass Anti-Rabies Drives</h5>
                <p className="text-xs text-slate-600 leading-relaxed font-normal">
                  Annual campus-wide vaccination drives ensuring zero rabies risk for students, faculty, and surrounding town residents.
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 space-y-2.5">
                <CheckCircle2 size={20} className="text-emerald-600" />
                <h5 className="font-bold text-slate-900 text-sm">Reflective Night Collars</h5>
                <p className="text-xs text-slate-600 leading-relaxed font-normal">
                  Fitting stray dogs with high-visibility reflective collars to prevent night road accidents along the Haldia highway.
                </p>
              </div>
            </div>
          </div>
        )}
      </section>

      {/* ========================================================================= */}
      {/* 6. THE "ENGINEERED EMPATHY" METHODOLOGY WORKFLOW */}
      {/* ========================================================================= */}
      <section className="space-y-10 border-t border-slate-200 pt-16">
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-blue-700 font-bold bg-blue-50 px-3 py-1 rounded-full border border-blue-200">
            <Layers size={14} className="text-blue-600" />
            <span>The Operating Model</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-5xl font-extrabold text-slate-900">
            The Engineered Empathy Framework
          </h2>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed font-normal">
            How students apply algorithmic thinking, problem breakdown, and rigorous project management to grassroots humanitarian upliftment.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="p-6 rounded-2xl bg-white/90 backdrop-blur-md border border-slate-200 shadow-sm space-y-4 relative overflow-hidden">
            <span className="font-mono text-xs font-bold text-blue-700 bg-blue-50 border border-blue-200 px-2.5 py-1 rounded-md inline-block">
              PHASE 01
            </span>
            <h4 className="font-serif text-lg font-bold text-slate-900">Grassroots Diagnostic</h4>
            <p className="text-xs text-slate-600 leading-relaxed font-normal">
              We conduct door-to-door community surveys around Haldia to identify out-of-school children, reading deficits, and injured strays.
            </p>
            <div className="pt-2 border-t border-slate-100 flex items-center text-xs font-mono text-slate-500 gap-1.5">
              <CheckCircle2 size={14} className="text-blue-600" />
              <span>Baseline Reading Metrics</span>
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-white/90 backdrop-blur-md border border-slate-200 shadow-sm space-y-4 relative overflow-hidden">
            <span className="font-mono text-xs font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2.5 py-1 rounded-md inline-block">
              PHASE 02
            </span>
            <h4 className="font-serif text-lg font-bold text-slate-900">Volunteer Rota & Syllabus</h4>
            <p className="text-xs text-slate-600 leading-relaxed font-normal">
              80+ volunteers are organized into specialized rosters: STEM tutors, arts facilitators, animal rescue handlers, and finance auditors.
            </p>
            <div className="pt-2 border-t border-slate-100 flex items-center text-xs font-mono text-slate-500 gap-1.5">
              <CheckCircle2 size={14} className="text-emerald-600" />
              <span>Branch Skillset Matching</span>
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-white/90 backdrop-blur-md border border-slate-200 shadow-sm space-y-4 relative overflow-hidden">
            <span className="font-mono text-xs font-bold text-teal-700 bg-teal-50 border border-teal-200 px-2.5 py-1 rounded-md inline-block">
              PHASE 03
            </span>
            <h4 className="font-serif text-lg font-bold text-slate-900">Direct Resource Deployment</h4>
            <p className="text-xs text-slate-600 leading-relaxed font-normal">
              Zero middlemen. Donations convert directly into wholesale stationery procurement, daily snack supplies, and veterinary medicines.
            </p>
            <div className="pt-2 border-t border-slate-100 flex items-center text-xs font-mono text-slate-500 gap-1.5">
              <CheckCircle2 size={14} className="text-teal-600" />
              <span>Public Expense Vouchers</span>
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-white/90 backdrop-blur-md border border-slate-200 shadow-sm space-y-4 relative overflow-hidden">
            <span className="font-mono text-xs font-bold text-purple-700 bg-purple-50 border border-purple-200 px-2.5 py-1 rounded-md inline-block">
              PHASE 04
            </span>
            <h4 className="font-serif text-lg font-bold text-slate-900">Annual Transition & Continuity</h4>
            <p className="text-xs text-slate-600 leading-relaxed font-normal">
              Senior coordinators mentor 2nd and 3rd year students before graduating, ensuring a decade-long relay of institutional wisdom.
            </p>
            <div className="pt-2 border-t border-slate-100 flex items-center text-xs font-mono text-slate-500 gap-1.5">
              <CheckCircle2 size={14} className="text-purple-600" />
              <span>Seamless Batch Handover</span>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 7. STRATEGIC ROADMAP (2026–2030) */}
      {/* ========================================================================= */}
      <section id="strategic-roadmap" className="scroll-mt-24 space-y-10 border-t border-slate-200 pt-16">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-purple-700 font-bold">
              <Target size={14} />
              <span>Institutional Growth • Horizon 2030</span>
            </div>
            <h2 className="font-serif text-2xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900">
              Strategic Milestones Ahead
            </h2>
          </div>
          <span className="font-mono text-xs text-slate-500 self-start sm:self-auto">
            ROADMAP REVISED BI-ANNUALLY
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="p-6 rounded-3xl bg-white/95 backdrop-blur-md border border-slate-200 space-y-4 shadow-sm hover:shadow-md transition-all flex flex-col justify-between">
            <div className="space-y-3">
              <span className="font-serif text-2xl font-extrabold text-blue-600 block">2026</span>
              <h4 className="font-serif text-lg font-bold text-slate-900">Permanent Community Learning Lab</h4>
              <p className="text-xs text-slate-600 leading-relaxed font-normal">
                Establish a dedicated after-school center near HIT with 15 refurbished computer terminals and a permanent physical library for rural students.
              </p>
            </div>
            <span className="inline-flex items-center gap-1.5 text-[11px] font-mono font-bold text-blue-700 bg-blue-50 px-2.5 py-1 rounded-md">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-600 animate-ping" />
              In Active Fundraising
            </span>
          </div>

          <div className="p-6 rounded-3xl bg-white/95 backdrop-blur-md border border-slate-200 space-y-4 shadow-sm hover:shadow-md transition-all flex flex-col justify-between">
            <div className="space-y-3">
              <span className="font-serif text-2xl font-extrabold text-emerald-600 block">2027</span>
              <h4 className="font-serif text-lg font-bold text-slate-900">Municipal Animal Recovery Shelter</h4>
              <p className="text-xs text-slate-600 leading-relaxed font-normal">
                Partner with local municipal authorities to construct a 20-kennel trauma care and sterilization facility with dedicated post-op recovery pens.
              </p>
            </div>
            <span className="inline-flex items-center gap-1.5 text-[11px] font-mono font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-md">
              Land Feasibility Study
            </span>
          </div>

          <div className="p-6 rounded-3xl bg-white/95 backdrop-blur-md border border-slate-200 space-y-4 shadow-sm hover:shadow-md transition-all flex flex-col justify-between">
            <div className="space-y-3">
              <span className="font-serif text-2xl font-extrabold text-teal-600 block">2028</span>
              <h4 className="font-serif text-lg font-bold text-slate-900">Alumni Scholarship Endowment</h4>
              <p className="text-xs text-slate-600 leading-relaxed font-normal">
                Create a self-replenishing ₹10,00,000 endowment fund supported by HIT alumni to sponsor higher-secondary & polytechnic fees for top learners.
              </p>
            </div>
            <span className="inline-flex items-center gap-1.5 text-[11px] font-mono font-bold text-teal-700 bg-teal-50 px-2.5 py-1 rounded-md">
              Alumni Network Outreach
            </span>
          </div>

          <div className="p-6 rounded-3xl bg-white/95 backdrop-blur-md border border-slate-200 space-y-4 shadow-sm hover:shadow-md transition-all flex flex-col justify-between">
            <div className="space-y-3">
              <span className="font-serif text-2xl font-extrabold text-purple-600 block">2030</span>
              <h4 className="font-serif text-lg font-bold text-slate-900">Regional Inter-College Chapters</h4>
              <p className="text-xs text-slate-600 leading-relaxed font-normal">
                Standardize our open-source operating blueprint to launch Eklavya chapters in 5 sister technical colleges across West Bengal.
              </p>
            </div>
            <span className="inline-flex items-center gap-1.5 text-[11px] font-mono font-bold text-purple-700 bg-purple-50 px-2.5 py-1 rounded-md">
              Long-term Institutional Goal
            </span>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 8. THE FOUNDER'S PLEDGE & CONSTITUTIONAL CHARTER */}
      {/* ========================================================================= */}
      <section className="border-t border-slate-200 pt-16">
        <div className="bg-gradient-to-br from-slate-900 via-blue-950 to-slate-950 text-white rounded-3xl p-8 sm:p-14 space-y-8 relative overflow-hidden shadow-2xl border border-blue-900/50">
          <div className="absolute right-0 top-0 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />

          <div className="max-w-4xl space-y-6 relative z-10">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-blue-500/20 border border-blue-400/30 flex items-center justify-center text-blue-300">
                <Flag size={20} />
              </div>
              <div>
                <span className="font-mono text-xs uppercase tracking-widest text-blue-300 font-bold block">
                  The Official Eklavya Charter & Pledge
                </span>
                <span className="text-xs text-slate-400 font-mono">Ratified by Student Founders at HIT Haldia</span>
              </div>
            </div>

            <blockquote className="font-serif text-2xl sm:text-4xl font-normal leading-snug text-slate-100 italic">
              "We solemnly pledge that technical training shall never isolate our hearts from human suffering. As long as our gates stand open, our evening lamps will burn for every child who yearns to learn, and our hands will never hesitate to tend to the wounded, the abandoned, and the voiceless."
            </blockquote>

            <div className="pt-6 border-t border-slate-700/60 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs font-mono text-slate-400">
              <div>
                <span className="text-blue-300 font-bold">ARTICLE I, CLAUSE 3</span> • Eklavya Constitution
              </div>
              <div className="flex items-center gap-4 text-slate-300">
                <span>FACULTY ADVISORY BOARD</span>
                <span>•</span>
                <span>HIT STUDENT COUNCIL</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 9. EXPANSIVE CALL-TO-ACTION & ENGAGEMENT HUB */}
      {/* ========================================================================= */}
      <section className="border-t border-slate-200 pt-16 space-y-10">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="font-mono text-xs uppercase tracking-wider text-emerald-700 font-bold block">
            Stand With Our Vision
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-extrabold text-slate-900">
            Three Ways You Can Power This Mission
          </h2>
          <p className="text-slate-600 text-sm font-normal">
            Whether you are a student, alumnus, faculty member, or compassionate citizen, your contribution creates tangible change today.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Recruitment CTA */}
          <div className="bg-white/95 backdrop-blur-md border border-slate-200 rounded-3xl p-8 space-y-5 shadow-sm hover:shadow-md transition-all flex flex-col justify-between">
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-amber-50 border border-amber-200 flex items-center justify-center text-amber-700">
                <Users size={22} />
              </div>
              <h3 className="font-serif text-xl font-bold text-slate-900">
                Campus Intake & Recruitment
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed font-normal">
                Undergraduate students at HIT Haldia can apply during the annual recruitment cycle. <strong>Please note:</strong> Membership is subject to the annual selection process, intent screening, and panel interviews.
              </p>
            </div>
            <Link
              to="/recruitment"
              className="inline-flex items-center justify-center gap-2 w-full py-3 rounded-full bg-slate-900 hover:bg-slate-800 text-white font-mono text-xs uppercase tracking-wider font-bold transition-colors shadow-xs"
            >
              <span>Apply for Recruitment</span>
              <ArrowRight size={14} />
            </Link>
          </div>

          {/* Donate CTA */}
          <div className="bg-white/95 backdrop-blur-md border border-slate-200 rounded-3xl p-8 space-y-5 shadow-sm hover:shadow-md transition-all flex flex-col justify-between ring-2 ring-emerald-500/20">
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-600">
                <Heart size={22} />
              </div>
              <h3 className="font-serif text-xl font-bold text-slate-900">
                Sponsor Books or Meds
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed font-normal">
                ₹500 sponsors a student’s stationery kit for 6 months. ₹1,000 finances emergency antibiotics, dressing, and an anti-rabies vaccination for a rescued dog.
              </p>
            </div>
            <Link
              to="/donate"
              className="inline-flex items-center justify-center gap-2 w-full py-3 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white font-mono text-xs uppercase tracking-wider font-bold transition-colors shadow-xs"
            >
              <span>Donate Directly via UPI</span>
              <ArrowRight size={14} />
            </Link>
          </div>

          {/* Alumni Partner CTA */}
          <div className="bg-white/95 backdrop-blur-md border border-slate-200 rounded-3xl p-8 space-y-5 shadow-sm hover:shadow-md transition-all flex flex-col justify-between">
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-teal-50 border border-teal-200 flex items-center justify-center text-teal-600">
                <GraduationCap size={22} />
              </div>
              <h3 className="font-serif text-xl font-bold text-slate-900">
                Alumni Mentorship & Grants
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed font-normal">
                HIT alumni across tech companies worldwide mentor our students, sponsor annual academic kits, and fund critical medical surgeries.
              </p>
            </div>
            <Link
              to="/alumni"
              className="inline-flex items-center justify-center gap-2 w-full py-3 rounded-full bg-slate-900 hover:bg-slate-800 text-white font-mono text-xs uppercase tracking-wider font-bold transition-colors shadow-xs"
            >
              <span>Connect as Alumni</span>
              <ArrowRight size={14} />
            </Link>
          </div>
        </div>

        {/* Emergency Ground Rescue Hotline Box */}
        <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-red-50 border border-red-200 flex items-center justify-center text-red-600 shrink-0">
              <Stethoscope size={18} />
            </div>
            <div>
              <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wide font-mono">
                Report an Injured Animal on Campus / Haldia Streets
              </h4>
              <p className="text-xs text-slate-600">
                Direct emergency dispatch squad: WhatsApp alert with location & photo to our student rescue team.
              </p>
            </div>
          </div>
          <Link
            to="/events"
            className="shrink-0 px-4 py-2 rounded-xl bg-white border border-slate-300 hover:bg-slate-100 text-slate-800 font-mono text-xs font-bold transition-colors"
          >
            View Active Drives & Events
          </Link>
        </div>
      </section>
    </div>
  );
};
