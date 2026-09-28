import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { SectionTitle } from '../ui/SectionTitle';
import { EventCard } from '../ui/EventCard';
import type { NGOEvent } from '../../types/ngo';
import { ngoService } from '../../services/ngoService';
import { Calendar, ArrowRight, MapPin } from 'lucide-react';

export const EventsSection: React.FC = () => {
  const [events, setEvents] = useState<NGOEvent[]>([]);
  const [filter, setFilter] = useState<'all' | 'upcoming' | 'past'>('upcoming');

  useEffect(() => {
    const loadEvents = async () => {
      const data = await ngoService.getEvents();
      setEvents(data);
    };
    loadEvents();
  }, []);

  const filteredEvents = events.filter((e) => {
    if (filter === 'upcoming') return e.isUpcoming;
    if (filter === 'past') return !e.isUpcoming;
    return true;
  });

  return (
    <section id="events" className="space-y-10 py-6 sm:py-10">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-slate-200 pb-6">
        <SectionTitle
          badge="CAMPUS & COMMUNITY CALENDAR"
          badgeVariant="green"
          title="Upcoming Community & Field Events"
          highlightWord="Field Events"
          subtitle="Stay updated with our ongoing educational events, health checkups, food distributions, and vaccination camps across Haldia."
        />

        <div className="flex items-center gap-1 p-1 bg-slate-100 border border-slate-200 rounded-lg shrink-0 self-start md:self-auto text-xs">
          <button
            onClick={() => setFilter('upcoming')}
            className={`px-3 py-1 rounded-md font-medium transition-all cursor-pointer ${
              filter === 'upcoming'
                ? 'bg-teal-800 text-white font-bold shadow-sm'
                : 'text-slate-700 hover:text-slate-900'
            }`}
          >
            Upcoming
          </button>
          <button
            onClick={() => setFilter('all')}
            className={`px-3 py-1 rounded-md font-medium transition-all cursor-pointer ${
              filter === 'all'
                ? 'bg-teal-800 text-white font-bold shadow-sm'
                : 'text-slate-700 hover:text-slate-900'
            }`}
          >
            All Events
          </button>
          <button
            onClick={() => setFilter('past')}
            className={`px-3 py-1 rounded-md font-medium transition-all cursor-pointer ${
              filter === 'past'
                ? 'bg-emerald-700 text-white font-bold shadow-sm'
                : 'text-slate-700 hover:text-slate-900'
            }`}
          >
            Past Milestones
          </button>
        </div>
      </div>

      {/* Asymmetric 7:5 Events & Calendar Section */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
        {/* Left Column: Events Timeline Stream (7 cols) */}
        <div className="lg:col-span-7 space-y-4">
          {filteredEvents.length > 0 ? (
            filteredEvents.map((ev) => <EventCard key={ev._id} event={ev} />)
          ) : (
            <div className="rounded-xl border border-slate-200 bg-white/90 p-10 text-center space-y-3 shadow-sm">
              <Calendar size={28} className="text-slate-400 mx-auto" />
              <p className="text-xs font-medium text-slate-600">No events found in this category.</p>
            </div>
          )}

          {/* Link to full Events Page */}
          <div className="pt-2">
            <Link
              to="/events"
              className="inline-flex items-center gap-2 text-xs font-semibold text-teal-800 hover:text-teal-950 transition-colors"
            >
              <span>View full historical events and campus archives</span>
              <ArrowRight size={13} />
            </Link>
          </div>
        </div>

        {/* Right Column: Next Major Event Spotlight Card (5 cols) */}
        <div className="lg:col-span-5 lg:sticky lg:top-28">
          <div className="rounded-2xl bg-white/90 backdrop-blur-md text-slate-900 p-7 sm:p-8 border border-emerald-100 shadow-xl shadow-teal-950/5 relative overflow-hidden space-y-6 active:scale-[0.98] md:active:scale-100 md:hover:-translate-y-1 md:hover:shadow-2xl transition-all duration-300 ease-out group">
            <div className="flex items-center justify-between">
              <span className="px-2.5 py-0.5 rounded text-[10px] font-mono uppercase tracking-wider bg-emerald-50 text-emerald-700 border border-emerald-200 flex items-center gap-1.5 font-bold">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                <span>Next Field Mobilization</span>
              </span>
              <span className="text-[11px] font-mono text-teal-800 font-bold">
                HIT Haldia
              </span>
            </div>

            <div className="space-y-2">
              <h3 className="font-serif text-2xl font-bold text-teal-950 leading-snug">
                Weekly Mega Teaching & Vaccination Event
              </h3>
              <p className="text-slate-700 text-xs sm:text-sm leading-relaxed font-normal">
                Join 40+ student volunteers at HIT Gate 1 as we depart for village tutoring centers and street animal first-aid routes across Haldia.
              </p>
            </div>

            <div className="space-y-2.5 pt-3 border-t border-slate-200 text-xs text-slate-700">
              <div className="flex items-center gap-2.5 font-mono">
                <Calendar size={13} className="text-emerald-600 shrink-0" />
                <span className="text-slate-900 font-semibold">Every Sunday • 4:00 PM IST</span>
              </div>
              <div className="flex items-center gap-2.5">
                <MapPin size={13} className="text-teal-700 shrink-0" />
                <span>Assembly: Student Activity Center, HIT Haldia</span>
              </div>
            </div>

            <div className="pt-2">
              <Link
                to="/recruitment"
                className="w-full py-3 px-4 rounded-full bg-gradient-to-r from-teal-800 to-emerald-600 hover:from-teal-700 hover:to-emerald-500 text-white font-bold text-xs transition-all flex items-center justify-center gap-2 shadow-lg shadow-teal-900/15"
              >
                <span>Apply for Recruitment</span>
                <ArrowRight size={13} />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
