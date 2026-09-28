import React, { useState } from 'react';
import type { NGOEvent } from '../../types/ngo';
import { MapPin, Clock, Calendar, CheckCircle2, Users } from 'lucide-react';

interface EventCardProps {
  event: NGOEvent;
  className?: string;
}

export const EventCard: React.FC<EventCardProps> = ({ event, className = '' }) => {
  const [hasRsvpd, setHasRsvpd] = useState(false);
  const [attendeeCount, setAttendeeCount] = useState(event.attendeesCount);

  // Parse date into Month & Day
  const dateObj = new Date(event.date);
  const monthStr = dateObj.toLocaleString('en-US', { month: 'short' }).toUpperCase();
  const dayStr = dateObj.getDate();

  const handleRsvp = () => {
    if (!hasRsvpd) {
      setHasRsvpd(true);
      setAttendeeCount((prev) => prev + 1);
    } else {
      setHasRsvpd(false);
      setAttendeeCount((prev) => prev - 1);
    }
  };

  return (
    <div
      className={`rounded-xl p-5 sm:p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5 border border-emerald-100 md:border-slate-200 bg-white/90 backdrop-blur-md shadow-md active:scale-[0.98] md:active:scale-100 md:hover:border-emerald-500/40 md:hover:shadow-lg md:hover:-translate-y-1 transition-all duration-300 ease-out group ${className}`}
    >
      {/* Date Stamp + Details */}
      <div className="flex items-start sm:items-center gap-4 flex-1">
        {/* Date Stamp */}
        <div className="w-14 h-16 rounded-xl bg-emerald-50/60 border border-emerald-100 text-slate-900 flex flex-col items-center justify-center shrink-0 shadow-2xs transition-transform duration-500 ease-out md:group-hover:scale-105">
          <span className="text-[9px] font-mono font-bold tracking-wider uppercase text-teal-800">
            {monthStr}
          </span>
          <span className="text-xl font-serif font-extrabold leading-none mt-0.5 text-teal-950">
            {dayStr}
          </span>
        </div>

        {/* Event Details */}
        <div className="space-y-1 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-emerald-50 text-teal-800 border border-emerald-200/80">
              {event.category}
            </span>
            {event.isUpcoming ? (
              <span className="text-[10px] font-mono uppercase tracking-wider text-emerald-800 bg-emerald-100/70 px-2 py-0.5 rounded border border-emerald-200 font-bold">
                Upcoming
              </span>
            ) : (
              <span className="text-[10px] font-mono uppercase tracking-wider text-slate-600 bg-slate-100 px-2 py-0.5 rounded border border-slate-200">
                Past
              </span>
            )}
          </div>

          <h3 className="font-serif text-lg font-bold text-slate-900 leading-snug">
            {event.title}
          </h3>

          <p className="text-xs text-slate-700 line-clamp-2 leading-relaxed font-normal">
            {event.description}
          </p>

          <div className="flex flex-wrap items-center gap-4 text-xs text-slate-600 pt-1 font-normal">
            <div className="flex items-center gap-1.5">
              <MapPin size={12} className="text-teal-700 shrink-0" />
              <span>{event.location}</span>
            </div>
            {event.time && (
              <div className="flex items-center gap-1.5">
                <Clock size={12} className="text-teal-700 shrink-0" />
                <span className="font-mono text-[11px]">{event.time}</span>
              </div>
            )}
            <div className="flex items-center gap-1.5 font-mono text-[11px] text-emerald-800 font-bold">
              <Users size={12} className="shrink-0 text-emerald-600" />
              <span>{attendeeCount} Pledged</span>
            </div>
          </div>
        </div>
      </div>

      {/* RSVP Action */}
      <div className="shrink-0 w-full sm:w-auto">
        {event.isUpcoming ? (
          <button
            onClick={handleRsvp}
            className={`w-full sm:w-auto px-4 py-2.5 rounded-full text-xs font-bold tracking-wide transition-all flex items-center justify-center gap-2 cursor-pointer shadow-sm active:scale-95 ${
              hasRsvpd
                ? 'bg-emerald-700 text-white font-bold'
                : 'bg-gradient-to-r from-teal-800 to-emerald-600 md:hover:from-teal-700 md:hover:to-emerald-500 text-white'
            }`}
          >
            {hasRsvpd ? (
              <>
                <CheckCircle2 size={14} />
                <span>Pledged</span>
              </>
            ) : (
              <>
                <Calendar size={13} />
                <span>Join Event</span>
              </>
            )}
          </button>
        ) : (
          <span className="text-[11px] font-mono uppercase tracking-wider text-slate-500 block text-center sm:text-right">
            Concluded
          </span>
        )}
      </div>
    </div>
  );
};
