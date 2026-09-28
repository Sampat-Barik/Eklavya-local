import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { CalendarCheck, CheckCircle2, MapPin, User, Calendar, ShieldCheck, Sparkles, ArrowRight } from 'lucide-react';
import type { AttendanceRecord } from '../../types/auth';

export const PortalAttendance: React.FC = () => {
  const { user } = useAuth();
  const [attendance, setAttendance] = useState<AttendanceRecord[]>([]);
  const isNormalUser = user?.roleLevel === 5 || user?.role === 'public_user' || !user?.isActiveMember;
  const [summary, setSummary] = useState({
    totalEventsAttended: 3,
    verifiedRate: '100%',
    standing: isNormalUser ? 'Participant (Normal User)' : 'Active Member'
  });

  useEffect(() => {
    const fetchAttendance = async () => {
      const token = localStorage.getItem('token');
      if (token) {
        try {
          const res = await fetch('http://localhost:5000/api/portal/my-attendance', {
            headers: { Authorization: `Bearer ${token}` }
          });
          if (res.ok) {
            const data = await res.json();
            setAttendance(data.records || []);
            if (data.summary) {
              setSummary({
                totalEventsAttended: data.summary.totalEventsAttended ?? data.summary.totalDrives ?? 3,
                verifiedRate: data.summary.verifiedRate ?? '100%',
                standing: isNormalUser ? 'Participant (Normal User)' : 'Active Member'
              });
            }
            return;
          }
        } catch {
          // Local fallback
        }
      }

      setAttendance([
        {
          id: 'att-1',
          userId: user?.id || 'demo-user',
          userEmail: user?.email || 'user@gmail.com',
          date: '2026-09-15',
          driveType: 'Village Education (VE)',
          category: 'Child Education',
          location: 'Debhog Primary Center',
          mentor: 'Prof. S. Das',
          status: 'Present'
        },
        {
          id: 'att-2',
          userId: user?.id || 'demo-user',
          userEmail: user?.email || 'user@gmail.com',
          date: '2026-09-12',
          driveType: 'Animal Rescue & Vaccination',
          category: 'Animal Welfare',
          location: 'HIT Campus & Township',
          mentor: 'Ananya Roy',
          status: 'Present'
        },
        {
          id: 'att-3',
          userId: user?.id || 'demo-user',
          userEmail: user?.email || 'user@gmail.com',
          date: '2026-09-08',
          driveType: 'Community Ration Distribution',
          category: 'Social Relief',
          location: 'Durgachak Basti',
          mentor: 'Sampat Barik',
          status: 'Present'
        }
      ]);
    };

    fetchAttendance();
  }, [user]);

  const totalAttendedCount = attendance.filter((r) => r.status === 'Present').length || summary.totalEventsAttended;

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="border-b border-emerald-100/80 pb-5">
        <h1 className="text-2xl sm:text-3xl font-serif font-black text-teal-950 tracking-tight">
          Events Attended & Verification
        </h1>
        <p className="text-xs sm:text-sm text-slate-600 mt-1.5 max-w-2xl leading-relaxed">
          Official ledger of verified event participation, on-field attendance records, and society supervisor sign-offs.
        </p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        {/* Card 1: Number of Events Attended */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-5 sm:p-6 border border-emerald-100 shadow-sm hover:shadow-md hover:border-emerald-200 transition-all flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                Events Attended
              </span>
              <div className="w-10 h-10 rounded-full bg-emerald-100 text-teal-700 flex items-center justify-center p-2">
                <CalendarCheck size={18} />
              </div>
            </div>
            <div className="flex items-baseline gap-2.5">
              <span className="text-3xl sm:text-4xl font-serif font-black text-teal-950">
                {totalAttendedCount}
              </span>
              <span className="text-sm font-bold text-slate-500">events</span>
              <span className="inline-flex items-center text-[10px] font-bold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded-full">
                <Sparkles size={11} className="mr-0.5 text-emerald-700" /> Verified
              </span>
            </div>
          </div>
          <div className="mt-4 pt-3 border-t border-emerald-50">
            <div className="flex items-center justify-between text-[11px]">
              <span className="text-teal-800 font-bold flex items-center gap-1">
                <CheckCircle2 size={12} className="text-emerald-600" />
                <span>Verified on Record</span>
              </span>
              <span className="text-slate-400 font-medium">100% Validated</span>
            </div>
          </div>
        </div>

        {/* Card 2: Attendance Reliability */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-5 sm:p-6 border border-emerald-100 shadow-sm hover:shadow-md hover:border-emerald-200 transition-all flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                Attendance Reliability
              </span>
              <div className="w-10 h-10 rounded-full bg-emerald-100 text-teal-700 flex items-center justify-center p-2">
                <CheckCircle2 size={18} />
              </div>
            </div>
            <div className="flex items-baseline gap-2.5">
              <span className="text-3xl sm:text-4xl font-serif font-black text-teal-950">
                {summary.verifiedRate}
              </span>
              <span className="inline-flex items-center text-[10px] font-bold text-teal-800 bg-teal-50 px-2 py-0.5 rounded-full border border-teal-200/60">
                Consistently Present
              </span>
            </div>
          </div>
          <div className="mt-4 pt-3 border-t border-emerald-50">
            <div className="flex items-center justify-between text-[11px]">
              <span className="text-teal-800 font-bold">Attendance Ratio</span>
              <span className="text-emerald-600 font-bold">1:1 Perfect</span>
            </div>
          </div>
        </div>

        {/* Card 3: Member Standing */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-5 sm:p-6 border border-emerald-100 shadow-sm hover:shadow-md hover:border-emerald-200 transition-all flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                Member Standing
              </span>
              <div className="w-10 h-10 rounded-full bg-emerald-100 text-teal-700 flex items-center justify-center p-2">
                <ShieldCheck size={18} />
              </div>
            </div>
            <div className="flex items-baseline gap-2.5">
              <span className="text-2xl sm:text-3xl font-serif font-black text-teal-950">
                Active Member
              </span>
            </div>
          </div>
          <div className="mt-4 pt-3 border-t border-emerald-50">
            <div className="flex items-center justify-between text-[11px]">
              <span className="text-teal-800 font-bold">Certification Status</span>
              <span className="text-emerald-600 font-bold">Eligible</span>
            </div>
          </div>
        </div>
      </div>

      {/* Attendance History Timeline */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-base sm:text-lg font-bold text-slate-900 flex items-center gap-2">
            <CalendarCheck size={18} className="text-teal-700" />
            <span>Events Attended History</span>
          </h2>
          <span className="text-xs text-slate-500 font-medium hidden sm:inline">
            Official supervisor and mentor validation
          </span>
        </div>

        {attendance.length === 0 ? (
          <div className="bg-white rounded-2xl p-12 text-center space-y-3 border border-slate-200/80 shadow-xs">
            <p className="text-xs text-slate-500">No event attendance logged yet.</p>
            <Link
              to="/portal/events"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-teal-700 text-white font-bold text-xs hover:bg-teal-800 transition-colors"
            >
              <span>Browse & Register Events</span>
              <ArrowRight size={13} />
            </Link>
          </div>
        ) : (
          <div className="bg-white rounded-2xl overflow-hidden border border-emerald-100/90 shadow-xs w-full max-w-full">
            {/* Mobile Horizontal Scroll Indicator */}
            <div className="sm:hidden px-4 py-2 bg-emerald-50/60 border-b border-emerald-100 text-[11px] text-teal-900 font-mono flex items-center justify-between font-bold">
              <span>Swipe horizontally to view full records</span>
              <span>⇄</span>
            </div>
            <div className="overflow-x-auto w-full max-w-full horizontal-scroll-container overscroll-x-contain pb-1">
              <table className="w-full min-w-[720px] text-left text-xs">
                <thead className="bg-slate-50/80 text-slate-600 border-b border-slate-200 font-bold uppercase text-[10px] tracking-wider">
                  <tr>
                    <th className="py-3.5 px-4">Date</th>
                    <th className="py-3.5 px-4">Event Attended</th>
                    <th className="py-3.5 px-4">Category</th>
                    <th className="py-3.5 px-4">Location</th>
                    <th className="py-3.5 px-4">Supervisor / Mentor</th>
                    <th className="py-3.5 px-4">Attendance Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 font-medium">
                  {attendance.map((record) => (
                    <tr key={record.id} className="hover:bg-teal-50/40 transition-colors">
                      <td className="py-3.5 px-4 text-slate-900 font-bold flex items-center gap-2 whitespace-nowrap">
                        <Calendar size={13} className="text-teal-600" />
                        <span>
                          {new Date(record.date).toLocaleDateString(undefined, {
                            year: 'numeric',
                            month: 'short',
                            day: 'numeric'
                          })}
                        </span>
                      </td>
                      <td className="py-3.5 px-4 text-slate-900 font-semibold max-w-[240px]">
                        {record.driveType}
                      </td>
                      <td className="py-3.5 px-4 whitespace-nowrap">
                        <span className="px-2.5 py-0.5 rounded-full bg-teal-50 text-teal-800 text-[10px] font-bold border border-teal-200/60">
                          {record.category || 'Community Event'}
                        </span>
                      </td>
                      <td className="py-3.5 px-4 text-slate-600 whitespace-nowrap">
                        <div className="flex items-center gap-1.5">
                          <MapPin size={12} className="text-emerald-600 shrink-0" />
                          <span>{record.location}</span>
                        </div>
                      </td>
                      <td className="py-3.5 px-4 text-slate-600 whitespace-nowrap">
                        <div className="flex items-center gap-1.5">
                          <User size={12} className="text-slate-400 shrink-0" />
                          <span>{record.mentor || 'Supervisor'}</span>
                        </div>
                      </td>
                      <td className="py-3.5 px-4 whitespace-nowrap">
                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase bg-emerald-50 text-emerald-700 border border-emerald-200">
                          <CheckCircle2 size={11} />
                          <span>{record.status === 'Present' ? 'Verified Present' : record.status}</span>
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
