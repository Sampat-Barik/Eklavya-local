import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import {
  User as UserIcon,
  Mail,
  GraduationCap,
  Calendar,
  Phone,
  CheckCircle2,
  Camera,
  ShieldCheck,
  Send,
  AlertCircle,
  Sparkles,
  ArrowRight,
  FileText,
  Layers,
  Award,
  CheckCircle
} from 'lucide-react';
import type { UserRole } from '../../types/auth';

const departments = [
  'Computer Science & Engineering',
  'Information Technology',
  'Electronics & Comm. Engg.',
  'Mechanical Engineering',
  'Chemical Engineering',
  'Civil Engineering',
  'Electrical Engineering',
  'Applied Electronics & Inst. Engg.',
  'Biotechnology',
  'Basic Sciences & Humanities'
];

export const PortalProfile: React.FC = () => {
  const { user, roleLevel, updateProfile, requestAdminAccess } = useAuth();

  const isLevel5NormalUser =
    roleLevel === 5 ||
    user?.role === 'public_user' ||
    !user?.isActiveMember ||
    user?.roleLevel === 5;

  const [displayName, setDisplayName] = useState(user?.name || '');
  const [department, setDepartment] = useState(user?.department || '');
  const [batch, setBatch] = useState(user?.batch || '');
  const [phone, setPhone] = useState(user?.phone || '');
  const [avatar, setAvatar] = useState(user?.avatar || '');
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  // Admin Request Modal/Section
  const [isRequestingAdmin, setIsRequestingAdmin] = useState(false);
  const [requestReason, setRequestReason] = useState('');
  const [requestedRole, setRequestedRole] = useState<UserRole>('events_manager');
  const [requestFeedback, setRequestFeedback] = useState<{ success: boolean; message: string } | null>(null);

  if (!user) return null;

  const handleSaveProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);

    try {
      const token = localStorage.getItem('token');
      if (token) {
        await fetch('http://localhost:5000/api/portal/profile', {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
          },
          body: JSON.stringify({
            name: displayName,
            department,
            batch,
            phone,
            avatar
          })
        });
      }
    } catch {
      // Local fallback
    }

    await updateProfile({
      name: displayName,
      department,
      batch,
      phone,
      avatar
    });

    setIsSaving(false);
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 4000);
  };

  const handleSendAdminRequest = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!requestReason.trim()) return;

    const res = await requestAdminAccess(requestReason, requestedRole);
    setRequestFeedback(res);
    setIsRequestingAdmin(false);
    setRequestReason('');
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Top Title */}
      <div className="flex items-center justify-between border-b border-slate-200 pb-5">
        <div className="flex items-center gap-3.5">
          <div className="relative w-12 h-12 rounded-2xl p-[2px] bg-gradient-to-tr from-teal-700 to-emerald-500 shadow-sm flex items-center justify-center shrink-0">
            <div className="w-full h-full rounded-xl bg-white flex items-center justify-center p-0.5">
              <img src="/eklavya_logo.png" alt="Eklavya Member Seal" className="w-full h-full object-contain" />
            </div>
          </div>
          <div>
            <h1 className="text-2xl font-serif font-black text-slate-900 tracking-tight">
              My Member Profile
            </h1>
            <p className="text-xs text-slate-500 mt-0.5">
              Manage your student member identity, academic department, and contact details.
            </p>
          </div>
        </div>
      </div>

      {saveSuccess && (
        <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold flex items-center gap-2">
          <CheckCircle2 size={16} className="text-emerald-600 flex-shrink-0" />
          <span>Profile changes saved successfully!</span>
        </div>
      )}

      {/* Level 5 Normal User: High-Impact Campus Intake CTA Card */}
      {isLevel5NormalUser && (
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-teal-950 via-slate-900 to-emerald-950 border border-emerald-500/30 p-6 sm:p-8 shadow-2xl text-white">
          {/* Ambient Glows */}
          <div className="absolute -top-24 -right-24 w-80 h-80 rounded-full bg-emerald-500/20 blur-3xl pointer-events-none" />
          <div className="absolute -bottom-24 -left-24 w-80 h-80 rounded-full bg-teal-400/15 blur-3xl pointer-events-none" />

          {/* Background Watermark */}
          <div className="absolute right-4 -bottom-6 opacity-[0.03] select-none pointer-events-none font-serif font-black text-8xl md:text-9xl tracking-tighter">
            EKLAVYA
          </div>

          <div className="relative z-10 space-y-5">
            {/* Top Badge & Tier Label */}
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-400/20 border border-emerald-400/40 text-emerald-300 text-xs font-black uppercase tracking-wider backdrop-blur-md shadow-inner">
                <Sparkles size={14} className="text-emerald-300 animate-pulse" />
                <span>Level 5 Normal User • Campus Intake Cycle Open</span>
              </div>

              <span className="text-[11px] font-mono text-teal-300/80 bg-teal-900/50 border border-teal-700/40 px-2.5 py-1 rounded-lg">
                Annual Induction 2026–27
              </span>
            </div>

            {/* Hero Title & Subtext */}
            <div className="space-y-2">
              <h2 className="text-2xl sm:text-3xl font-serif font-black tracking-tight text-white leading-tight">
                Step Up to an <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-300 via-teal-200 to-amber-200">Active Eklavya Member</span>
              </h2>
              <p className="text-xs sm:text-sm text-teal-100/90 leading-relaxed max-w-2xl font-normal">
                You are currently registered as a public supporter (Level 5 Normal User). Inducted active membership unlocks our 8 specialized club departments, hands-on social drives, official volunteer duty passes, and leadership opportunities.
              </p>
            </div>

            {/* 3 Domain Quick Perks */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
              <div className="flex items-center gap-2.5 p-3 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm">
                <div className="w-8 h-8 rounded-xl bg-teal-500/20 text-teal-300 flex items-center justify-center shrink-0">
                  <Layers size={16} />
                </div>
                <div>
                  <div className="text-xs font-bold text-white">8 Club Domains</div>
                  <div className="text-[10px] text-teal-200/70">Video, Teaching, PR & more</div>
                </div>
              </div>

              <div className="flex items-center gap-2.5 p-3 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm">
                <div className="w-8 h-8 rounded-xl bg-emerald-500/20 text-emerald-300 flex items-center justify-center shrink-0">
                  <Award size={16} />
                </div>
                <div>
                  <div className="text-xs font-bold text-white">Official Verification</div>
                  <div className="text-[10px] text-emerald-200/70">Induction seals & honors</div>
                </div>
              </div>

              <div className="flex items-center gap-2.5 p-3 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm">
                <div className="w-8 h-8 rounded-xl bg-amber-500/20 text-amber-300 flex items-center justify-center shrink-0">
                  <CheckCircle size={16} />
                </div>
                <div>
                  <div className="text-xs font-bold text-white">Field Responsibility</div>
                  <div className="text-[10px] text-amber-200/70">Lead ground initiatives</div>
                </div>
              </div>
            </div>

            {/* Mandatory Annual Selection Process Notice */}
            <div className="flex items-start gap-2.5 p-3.5 rounded-xl bg-amber-500/10 border border-amber-400/25 text-amber-200 text-xs font-medium">
              <AlertCircle size={16} className="text-amber-400 shrink-0 mt-0.5" />
              <span>
                <strong>Selection Process Notice:</strong> Membership is not granted automatically upon registration. All candidate inductions are subject to the annual selection process and screening interview by the executive council.
              </span>
            </div>

            {/* Really Attractive Button & Action Links */}
            <div className="flex flex-wrap items-center gap-3.5 pt-2">
              <Link
                to="/recruitment"
                className="relative group inline-flex items-center gap-3 px-8 py-3.5 rounded-2xl bg-gradient-to-r from-amber-400 via-emerald-400 to-teal-300 hover:from-amber-300 hover:via-emerald-300 hover:to-teal-200 text-slate-950 font-black text-sm tracking-wide shadow-xl shadow-emerald-500/30 hover:shadow-emerald-500/50 hover:scale-[1.03] active:scale-[0.98] transition-all duration-200 overflow-hidden"
              >
                {/* Shimmer light bar across button */}
                <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/50 to-transparent pointer-events-none" />
                
                <div className="w-8 h-8 rounded-xl bg-slate-950/10 flex items-center justify-center">
                  <GraduationCap size={18} className="text-slate-950 group-hover:rotate-12 transition-transform duration-200" />
                </div>
                <span>Apply for Campus Intake</span>
                <ArrowRight size={17} className="text-slate-950 group-hover:translate-x-1.5 transition-transform duration-200" />
              </Link>

              <Link
                to="/recruitment?tab=status"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-2xl bg-white/10 hover:bg-white/20 border border-white/25 hover:border-white/40 text-white text-xs font-bold backdrop-blur-md transition-all duration-150"
              >
                <FileText size={15} className="text-teal-300" />
                <span>Check Application / Waitlist</span>
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* Main Profile Form Card */}
      <form onSubmit={handleSaveProfile} className="editorial-card p-6 sm:p-8 bg-white space-y-8">
        {/* Avatar & Read-only Account Identity */}
        <div className="flex flex-col sm:flex-row items-center gap-6 pb-6 border-b border-slate-100">
          <div className="relative group">
            <div className="w-24 h-24 rounded-2xl border-4 border-slate-100 bg-slate-100 flex items-center justify-center font-bold text-slate-700 text-2xl overflow-hidden shadow-inner">
              {avatar ? (
                <img src={avatar} alt={displayName} className="w-full h-full object-cover" />
              ) : (
                <UserIcon size={40} className="text-slate-400" />
              )}
            </div>
            <button
              type="button"
              onClick={() => {
                const url = prompt('Enter image URL or avatar link:', avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150');
                if (url) setAvatar(url);
              }}
              className="absolute -bottom-2 -right-2 p-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white shadow-md transition-transform hover:scale-105"
              title="Change avatar image"
            >
              <Camera size={13} />
            </button>
          </div>

          <div className="space-y-1.5 text-center sm:text-left flex-1">
            <div className="flex items-center justify-center sm:justify-start gap-2 flex-wrap">
              <h2 className="text-xl font-bold text-slate-900">{displayName || user.name}</h2>
              {isLevel5NormalUser ? (
                <span className="px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-700 border border-slate-300 text-[10px] font-extrabold uppercase tracking-wide">
                  Level 5 • Normal User (Non-Member)
                </span>
              ) : (
                <span className="px-2.5 py-0.5 rounded-full bg-blue-100 text-blue-800 text-[10px] font-extrabold uppercase tracking-wide">
                  {user.role === 'registered_user' ? 'Member' : user.role.replace('_', ' ')}
                </span>
              )}
            </div>
            <div className="flex items-center justify-center sm:justify-start gap-2 text-xs text-slate-500 font-medium">
              <Mail size={13} className="text-slate-400" />
              <span>{user.email}</span>
              <span className="text-[10px] text-slate-400 font-bold bg-slate-100 px-2 py-0.5 rounded">
                Verified Google ID (Non-editable)
              </span>
            </div>
          </div>
        </div>

        {/* Editable Fields Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {/* Full Name */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
              <UserIcon size={14} className="text-slate-400" />
              <span>Display Name</span>
            </label>
            <input
              type="text"
              required
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
              className="w-full px-3.5 py-2.5 bg-white border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:border-blue-500"
            />
          </div>

          {/* Academic Department */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
              <GraduationCap size={14} className="text-slate-400" />
              <span>Department</span>
            </label>
            <select
              value={department}
              onChange={(e) => setDepartment(e.target.value)}
              className="w-full px-3.5 py-2.5 bg-white border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:border-blue-500"
            >
              <option value="">Select your department...</option>
              {departments.map((dept) => (
                <option key={dept} value={dept}>
                  {dept}
                </option>
              ))}
            </select>
          </div>

          {/* Batch / Graduation Year */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
              <Calendar size={14} className="text-slate-400" />
              <span>Batch / Year of Graduation</span>
            </label>
            <input
              type="text"
              placeholder="e.g. 2026 or 2027"
              value={batch}
              onChange={(e) => setBatch(e.target.value)}
              className="w-full px-3.5 py-2.5 bg-white border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:border-blue-500"
            />
          </div>

          {/* Phone Number */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
              <Phone size={14} className="text-slate-400" />
              <span>Contact Phone</span>
            </label>
            <input
              type="tel"
              placeholder="+91 98765 43210"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full px-3.5 py-2.5 bg-white border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:border-blue-500"
            />
          </div>
        </div>

        {/* Save Button */}
        <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100">
          <button
            type="submit"
            disabled={isSaving}
            className="px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-sm transition-all disabled:opacity-50"
          >
            {isSaving ? 'Saving Changes...' : 'Save Profile Changes'}
          </button>
        </div>
      </form>

      {/* Admin Access Request Card (Only for Inducted Club Members) */}
      {!isLevel5NormalUser && user.role === 'registered_user' && (
        <div className="editorial-card p-6 bg-gradient-to-r from-slate-50 to-blue-50/30 border-slate-200 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center">
                <ShieldCheck size={20} />
              </div>
              <div>
                <h3 className="text-sm font-bold text-slate-900">Request Operational Admin Role</h3>
                <p className="text-xs text-slate-500">
                  Society coordinators and event leads can request administrative module access from the Super Admin.
                </p>
              </div>
            </div>

            {user.adminRequest?.requested ? (
              <span className="px-3 py-1 rounded-full text-xs font-bold bg-amber-100 text-amber-800 border border-amber-200 flex items-center gap-1">
                <AlertCircle size={12} />
                <span>Pending Super Admin Review</span>
              </span>
            ) : (
              <button
                type="button"
                onClick={() => setIsRequestingAdmin(!isRequestingAdmin)}
                className="px-4 py-2 rounded-xl bg-slate-900 text-white font-bold text-xs hover:bg-slate-800 transition-colors"
              >
                {isRequestingAdmin ? 'Cancel' : 'Request Role'}
              </button>
            )}
          </div>

          {requestFeedback && (
            <div className="p-3 rounded-xl bg-blue-50 text-blue-800 text-xs font-bold border border-blue-200">
              {requestFeedback.message}
            </div>
          )}

          {isRequestingAdmin && (
            <form onSubmit={handleSendAdminRequest} className="pt-4 border-t border-slate-200/80 space-y-3">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="sm:col-span-1 space-y-1">
                  <label className="text-xs font-bold text-slate-700">Desired Role</label>
                  <select
                    value={requestedRole}
                    onChange={(e) => setRequestedRole(e.target.value as UserRole)}
                    className="w-full px-3 py-2 bg-white border border-slate-300 rounded-xl text-xs text-slate-900 font-medium focus:outline-none"
                  >
                    <option value="events_manager">Events Manager</option>
                    <option value="content_manager">Content Manager</option>
                    <option value="team_manager">Team Manager</option>
                    <option value="education_manager">Education Manager</option>
                    <option value="finance_manager">Finance Manager</option>
                  </select>
                </div>
                <div className="sm:col-span-2 space-y-1">
                  <label className="text-xs font-bold text-slate-700">Reason / Society Responsibilities</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Appointed as co-lead for upcoming flood relief events..."
                    value={requestReason}
                    onChange={(e) => setRequestReason(e.target.value)}
                    className="w-full px-3 py-2 bg-white border border-slate-300 rounded-xl text-xs text-slate-900 focus:outline-none"
                  />
                </div>
              </div>
              <button
                type="submit"
                className="px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-sm transition-colors flex items-center gap-1.5"
              >
                <Send size={12} />
                <span>Submit Request for Approval</span>
              </button>
            </form>
          )}
        </div>
      )}
    </div>
  );
};
