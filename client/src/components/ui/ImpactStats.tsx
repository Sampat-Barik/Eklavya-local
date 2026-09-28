import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import type { ImpactMetric } from '../../types/ngo';
import { TrendingUp, Users, Heart, BookOpen } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface ImpactStatsProps {
  metrics: ImpactMetric[];
  className?: string;
}

export const ImpactStats: React.FC<ImpactStatsProps> = ({ metrics, className = '' }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const countersRef = useRef<(HTMLSpanElement | null)[]>([]);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const ctx = gsap.context(() => {
      if (prefersReducedMotion) {
        countersRef.current.forEach((el, index) => {
          if (el && metrics[index]) {
            el.textContent = `${metrics[index].prefix || ''}${metrics[index].value}${metrics[index].suffix || ''}`;
          }
        });
        return;
      }

      metrics.forEach((metric, index) => {
        const targetEl = countersRef.current[index];
        if (!targetEl) return;

        const counterObj = { val: 0 };
        gsap.to(counterObj, {
          val: metric.value,
          duration: 1.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 88%',
            toggleActions: 'play none none none'
          },
          onUpdate: () => {
            const current = Math.round(counterObj.val);
            targetEl.textContent = `${metric.prefix || ''}${current}${metric.suffix || ''}`;
          }
        });
      });
    }, containerRef);

    return () => ctx.revert();
  }, [metrics]);

  const getCategoryStyles = (category: string) => {
    switch (category) {
      case 'education':
        return {
          iconBox: 'bg-blue-50/90 text-blue-600 border-blue-100/70',
          icon: <BookOpen size={16} strokeWidth={1.8} />
        };
      case 'animal':
        return {
          iconBox: 'bg-emerald-50/90 text-emerald-600 border-emerald-100/70',
          icon: <Heart size={16} strokeWidth={1.8} />
        };
      default:
        return {
          iconBox: 'bg-cyan-50/90 text-cyan-600 border-cyan-100/70',
          icon: <Users size={16} strokeWidth={1.8} />
        };
    }
  };

  return (
    <div ref={containerRef} className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6 ${className}`}>
      {metrics.map((metric, i) => {
        const { iconBox, icon } = getCategoryStyles(metric.category);
        return (
          <div
            key={metric.id}
            className="rounded-2xl bg-white/95 backdrop-blur-sm border border-slate-200/60 p-6 sm:p-7 flex flex-col justify-between transition-all duration-300 shadow-[0_4px_20px_-2px_rgba(15,23,42,0.03),0_0_1px_1px_rgba(15,23,42,0.02)] hover:shadow-[0_12px_28px_-6px_rgba(15,23,42,0.07)] hover:border-slate-300/70 hover:-translate-y-1 group"
          >
            <div className="flex items-center justify-between gap-3 mb-5">
              <div className={`w-9 h-9 rounded-xl border flex items-center justify-center shadow-[0_1px_2px_rgba(0,0,0,0.02)] transition-transform group-hover:scale-105 duration-200 ${iconBox}`}>
                {icon}
              </div>
              {metric.trend && (
                <span className="inline-flex items-center gap-1.5 text-[11px] font-medium tracking-normal text-emerald-700 bg-emerald-50/90 border border-emerald-200/60 px-2.5 py-1 rounded-full shadow-[0_1px_2px_rgba(0,0,0,0.02)]">
                  <TrendingUp size={11} className="text-emerald-600" />
                  <span>{metric.trend}</span>
                </span>
              )}
            </div>

            <div className="flex flex-col justify-between flex-grow">
              <div className="text-3xl sm:text-4xl lg:text-[38px] font-serif font-extrabold text-slate-900 tracking-tight leading-none flex items-baseline">
                <span
                  ref={(el) => {
                    countersRef.current[i] = el;
                  }}
                >
                  {metric.prefix}0{metric.suffix}
                </span>
              </div>
              <h4 className="font-semibold text-sm sm:text-[15px] text-slate-800 mt-2.5 leading-snug">
                {metric.label}
              </h4>
              <p className="text-xs text-slate-500 mt-1.5 font-normal leading-relaxed">
                {metric.sublabel}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

