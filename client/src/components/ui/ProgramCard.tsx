import React from 'react';
import { Link } from 'react-router-dom';
import type { ProgramCause } from '../../types/ngo';
import { Heart, Users, ArrowUpRight } from 'lucide-react';

interface ProgramCardProps {
  program: ProgramCause;
  className?: string;
  isBentoSpan?: boolean;
}

export const ProgramCard: React.FC<ProgramCardProps> = ({
  program,
  className = '',
  isBentoSpan = false
}) => {
  const renderCategoryBadge = (category: string) => {
    const dotColors: Record<string, string> = {
      'Education': 'bg-[#2563EB]',
      'Animal Welfare': 'bg-[#059669]',
      'Emergency Relief': 'bg-[#D97706]',
    };
    const dotColor = dotColors[category] || 'bg-[#10B981]';

    return (
      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-mono uppercase tracking-wider font-bold bg-white/95 backdrop-blur-md border border-slate-200 shadow-xs text-slate-900">
        <span className={`w-1.5 h-1.5 rounded-full ${dotColor}`} />
        <span className="text-slate-900 font-bold">{category}</span>
      </span>
    );
  };

  return (
    <div
      className={`flex flex-col ${
        isBentoSpan ? 'md:flex-row md:items-stretch' : ''
      } justify-between overflow-hidden rounded-2xl border border-slate-200 bg-white/90 backdrop-blur-md shadow-md hover:border-emerald-500/40 hover:shadow-lg transition-all duration-300 group ${className}`}
    >
      {/* Visual Header with Image */}
      <div
        className={`relative overflow-hidden bg-slate-100 shrink-0 ${
          isBentoSpan
            ? 'h-52 sm:h-60 md:h-auto md:w-5/12 lg:w-5/12 min-h-[220px] md:min-h-[280px]'
            : 'h-52 sm:h-60 w-full'
        }`}
      >
        <img
          src={program.imageUrl}
          alt={program.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        {/* Darkened gradient overlays for high contrast */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-transparent pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent pointer-events-none" />

        {/* Top Badges with Backdrop Blur */}
        <div className="absolute top-3.5 left-3.5 right-3.5 flex items-center justify-between gap-2">
          {renderCategoryBadge(program.category)}
          {program.isFeatured && (
            <span className="bg-white/95 text-slate-900 text-[10px] font-mono uppercase tracking-wider px-2.5 py-1 rounded-full backdrop-blur-md border border-slate-200 shadow-xs font-bold">
              Active Priority
            </span>
          )}
        </div>

        {/* Bottom Beneficiary Pill with Backdrop Blur */}
        <div className="absolute bottom-3 left-3.5 right-3.5 flex items-center justify-between text-white text-xs">
          <div className="flex items-center gap-1.5 bg-white/95 backdrop-blur-md px-2.5 py-1 rounded-lg border border-slate-200 shadow-xs">
            <Users size={12} className="text-emerald-600 shrink-0" />
            <span className="text-[11px] font-medium text-slate-900">
              {program.beneficiariesCount}+ {program.beneficiariesUnit}
            </span>
          </div>
          <div className="flex items-center gap-1 bg-white/95 backdrop-blur-md px-2.5 py-1 rounded-lg border border-slate-200 text-[11px] font-mono text-slate-800 shadow-xs">
            <span>{program.activeVolunteers} Volunteers</span>
          </div>
        </div>
      </div>

      {/* Content Body */}
      <div
        className={`p-6 sm:p-7 flex-1 flex flex-col justify-between space-y-5 ${
          isBentoSpan ? 'md:w-7/12 lg:w-7/12 md:p-8' : ''
        }`}
      >
        <div className="space-y-2.5">
          {program.subtitle && (
            <p className="text-[11px] font-mono font-bold text-teal-800 uppercase tracking-wider">
              {program.subtitle}
            </p>
          )}
          <h3
            className={`font-serif font-bold text-slate-900 leading-snug group-hover:text-blue-600 transition-colors ${
              isBentoSpan ? 'text-2xl sm:text-3xl' : 'text-xl sm:text-2xl'
            }`}
          >
            {program.title}
          </h3>
          <p className="text-slate-700 text-xs sm:text-sm leading-relaxed font-normal">
            {program.description}
          </p>
        </div>

        {/* Initiative Focus Tags */}
        {program.tags && program.tags.length > 0 && (
          <div className="flex flex-wrap gap-1.5 pt-3 border-t border-slate-100">
            {program.tags.map((tag) => (
              <span
                key={tag}
                className="px-2.5 py-1 rounded-lg bg-emerald-50 text-emerald-800 text-[11px] font-semibold border border-emerald-200/60"
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        {/* Action Button */}
        <div className="pt-1">
          <Link
            to="/help-us"
            className="w-full py-2.5 px-4 rounded-full bg-gradient-to-r from-blue-600 via-cyan-600 to-emerald-600 hover:from-blue-700 hover:to-emerald-700 text-white text-xs font-mono uppercase tracking-wider font-semibold transition-all flex items-center justify-center gap-2 group/btn shadow-xs"
          >
            <Heart size={13} className="text-white group-hover:scale-110 fill-current transition-transform" />
            <span>Support This Program</span>
            <ArrowUpRight size={13} className="opacity-80 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
          </Link>
        </div>
      </div>
    </div>
  );
};
