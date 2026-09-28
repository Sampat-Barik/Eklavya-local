import React, { useState, useEffect } from 'react';
import { Users, Heart, BookOpen, Clock, ShieldCheck, TrendingUp, type LucideIcon } from 'lucide-react';

interface MetricTickerItem {
  id: string;
  label: string;
  value: string;
  detail: string;
  hasTrendIcon?: boolean;
  icon: LucideIcon;
  iconBg: string;
  iconBorder: string;
  iconColor: string;
  glowColor: string;
}

export const LiveOperationsTicker: React.FC = () => {
  const tickerItems: MetricTickerItem[] = [
    {
      id: '1',
      label: 'Rural Children Enrolled',
      value: '150+',
      detail: 'Daily Evening Classes Active',
      hasTrendIcon: true,
      icon: BookOpen,
      iconBg: 'from-blue-50 to-indigo-50/60',
      iconBorder: 'border-blue-100/80',
      iconColor: 'text-blue-600',
      glowColor: 'bg-blue-400/20',
    },
    {
      id: '2',
      label: 'Animals Rescued & Treated',
      value: '120+',
      detail: 'Vaccination & Wound Care',
      hasTrendIcon: false,
      icon: Heart,
      iconBg: 'from-emerald-50 to-teal-50/60',
      iconBorder: 'border-emerald-100/80',
      iconColor: 'text-emerald-600',
      glowColor: 'bg-emerald-400/20',
    },
    {
      id: '3',
      label: 'HIT Student Volunteers',
      value: '60+',
      detail: 'Daily Roster on Ground',
      hasTrendIcon: true,
      icon: Users,
      iconBg: 'from-cyan-50 to-blue-50/60',
      iconBorder: 'border-cyan-100/80',
      iconColor: 'text-cyan-600',
      glowColor: 'bg-cyan-400/20',
    },
    {
      id: '4',
      label: 'Emergency Response Time',
      value: '< 15 mins',
      detail: 'Across Haldia Campus Vicinity',
      hasTrendIcon: false,
      icon: Clock,
      iconBg: 'from-teal-50 to-emerald-50/60',
      iconBorder: 'border-teal-100/80',
      iconColor: 'text-teal-600',
      glowColor: 'bg-teal-400/20',
    },
    {
      id: '5',
      label: 'Student-Led Transparency',
      value: '100%',
      detail: 'Direct Field Deployment',
      hasTrendIcon: false,
      icon: ShieldCheck,
      iconBg: 'from-emerald-50 to-sky-50/60',
      iconBorder: 'border-emerald-100/80',
      iconColor: 'text-emerald-700',
      glowColor: 'bg-emerald-400/20',
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % tickerItems.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [tickerItems.length]);

  return (
    <div className="w-full">
      {/* Elevated Soft Container with diffused shadow and gentle rounded corners */}
      <div className="rounded-3xl bg-white/95 backdrop-blur-md border border-slate-200/60 p-4 sm:p-5 lg:px-6 lg:py-4 shadow-[0_8px_30px_rgb(0,0,0,0.03),0_0_1px_1px_rgba(0,0,0,0.02)] transition-all duration-300 hover:shadow-[0_12px_36px_rgba(0,0,0,0.05)]">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 lg:gap-6">
          
          {/* Modern 'Live' Indicator & Anchor Tag */}
          <div className="flex items-center gap-3 shrink-0 lg:pr-6 lg:border-r lg:border-slate-200/60">
            <div className="flex flex-col items-start gap-1">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-50/90 border border-emerald-200/70 text-emerald-800 text-[11px] font-mono font-bold uppercase tracking-wider shadow-[0_1px_2px_rgba(16,185,129,0.06)]">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.7)]"></span>
                </span>
                <span>Live Telemetry</span>
              </div>
              <span className="text-[9px] font-mono tracking-widest text-slate-400 uppercase font-semibold pl-1.5">
                Updated Just Now
              </span>
            </div>
          </div>

          {/* Desktop Multi-column Grid with Faint Natural Dividers */}
          <div className="hidden lg:grid grid-cols-5 gap-2 xl:gap-3 divide-x divide-slate-100 flex-grow">
            {tickerItems.map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.id}
                  className="relative flex items-center gap-3.5 px-3 py-2 rounded-2xl transition-all duration-300 group hover:bg-slate-50/70"
                >
                  {/* Soft-Glow Backdrop + Dual-Tone Icon */}
                  <div className="relative shrink-0">
                    <div
                      className={`absolute -inset-1 rounded-2xl ${item.glowColor} blur-sm opacity-0 group-hover:opacity-80 transition-opacity duration-300`}
                    />
                    <div
                      className={`relative w-11 h-11 rounded-2xl bg-gradient-to-br ${item.iconBg} border ${item.iconBorder} flex items-center justify-center ${item.iconColor} shadow-[0_2px_6px_rgba(0,0,0,0.02)] group-hover:scale-105 transition-transform duration-300`}
                    >
                      <Icon size={18} strokeWidth={2} />
                    </div>
                  </div>

                  {/* Classic Serif Number & Uppercase Teal Label */}
                  <div className="flex flex-col min-w-0">
                    <div className="flex items-baseline gap-1.5">
                      <span className="font-serif font-extrabold text-xl xl:text-2xl text-slate-900 tracking-tight leading-none">
                        {item.value}
                      </span>
                      {item.hasTrendIcon && (
                        <span className="inline-flex items-center text-emerald-600 text-[10px] font-bold">
                          <TrendingUp size={11} className="stroke-[2.5]" />
                        </span>
                      )}
                    </div>
                    <span className="text-[10.5px] font-bold text-teal-800/90 truncate uppercase tracking-wider font-sans mt-1.5 leading-tight">
                      {item.label}
                    </span>
                    <span className="text-[11px] text-slate-400 font-normal truncate hidden 2xl:block leading-none mt-0.5">
                      {item.detail}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Mobile / Tablet Friendly Carousel */}
          <div className="lg:hidden w-full overflow-hidden">
            <div
              key={currentIndex}
              className="flex items-center justify-between bg-slate-50/70 border border-slate-200/50 rounded-2xl p-4 shadow-sm"
            >
              <div className="flex items-center gap-3.5">
                {(() => {
                  const item = tickerItems[currentIndex];
                  const Icon = item.icon;
                  return (
                    <>
                      <div
                        className={`relative w-11 h-11 rounded-2xl bg-gradient-to-br ${item.iconBg} border ${item.iconBorder} flex items-center justify-center ${item.iconColor} shadow-sm shrink-0`}
                      >
                        <Icon size={18} strokeWidth={2} />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-serif font-extrabold text-xl text-slate-900 leading-none">
                            {item.value}
                          </span>
                          {item.hasTrendIcon && (
                            <TrendingUp size={12} className="text-emerald-600 stroke-[2.5]" />
                          )}
                          <span className="text-[11px] font-bold text-teal-800 uppercase tracking-wide">
                            {item.label}
                          </span>
                        </div>
                        <span className="text-xs text-slate-500 block font-normal mt-0.5">
                          {item.detail}
                        </span>
                      </div>
                    </>
                  );
                })()}
              </div>

              <div className="flex gap-1.5 shrink-0 pl-2">
                {tickerItems.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentIndex(idx)}
                    aria-label={`Go to metric ${idx + 1}`}
                    className={`h-1.5 rounded-full transition-all duration-300 ${
                      idx === currentIndex ? 'w-5 bg-emerald-600' : 'w-2 bg-slate-300/80'
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

