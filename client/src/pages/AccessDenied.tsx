import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShieldAlert, ArrowLeft, User, Home, Globe, Heart, Calendar } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export const AccessDenied: React.FC = () => {
  const { user, roleLevel } = useAuth();
  const navigate = useNavigate();

  const isLevel5NormalUser = roleLevel === 5 || user?.role === 'public_user' || user?.isActiveMember === false;

  return (
    <div className="min-h-[70vh] flex items-center justify-center p-4">
      <div className="editorial-card p-8 sm:p-12 max-w-lg w-full text-center space-y-6 shadow-xl border-rose-200/80 bg-gradient-to-b from-white to-rose-50/20">
        <div className="relative w-20 h-20 mx-auto rounded-3xl p-1 bg-gradient-to-tr from-rose-500 via-teal-700 to-slate-800 flex items-center justify-center shadow-lg shadow-rose-500/10">
          <div className="w-full h-full rounded-2xl bg-white flex items-center justify-center p-1 relative">
            <img src="/eklavya_logo.png" alt="Eklavya Security" className="w-full h-full object-contain" />
            <div className="absolute -bottom-2 -right-2 p-1.5 bg-rose-600 text-white rounded-full shadow-md">
              <ShieldAlert size={14} />
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <span className="text-[11px] font-black uppercase tracking-widest text-rose-600 bg-rose-50 px-3 py-1 rounded-full border border-rose-200 inline-flex items-center gap-1">
            {isLevel5NormalUser ? <Globe size={11} /> : null}
            <span>{isLevel5NormalUser ? 'Level 5 • Normal User (Non-Member)' : '403 • Access Restricted'}</span>
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl font-extrabold text-slate-900">
            {isLevel5NormalUser ? 'Active Member Area Restricted' : 'Access Denied'}
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
            {isLevel5NormalUser
              ? 'You are signed in as a Normal User (Level 5). Normal users have public access and cannot be active members. Internal member desks, department deliverables, and society resources are restricted strictly to active club members (Level 4+) and domain leads.'
              : 'You do not have permission to view this administrative module or resource. This page is restricted to authorized personnel with assigned operational roles.'}
          </p>
        </div>

        {user && (
          <div className="p-3.5 rounded-2xl bg-slate-100 border border-slate-200/80 text-xs text-slate-600 flex items-center justify-between">
            <span className="font-medium">Signed in as:</span>
            <span className="font-bold text-slate-900 truncate max-w-[180px]">{user.email}</span>
            <span className={`text-[10px] font-extrabold px-2 py-0.5 rounded-md uppercase ${
              isLevel5NormalUser ? 'bg-slate-200 text-slate-800' : 'bg-blue-100 text-blue-800'
            }`}>
              {isLevel5NormalUser ? 'Normal User' : user.role}
            </span>
          </div>
        )}

        {isLevel5NormalUser && (
          <div className="p-3 rounded-xl bg-emerald-50/80 border border-emerald-200 text-xs text-teal-900 text-left space-y-1">
            <p className="font-bold flex items-center gap-1.5 text-teal-950">
              <Heart size={13} className="text-rose-600 fill-current" />
              <span>Want to become an Active Member?</span>
            </p>
            <p className="text-[11px] text-slate-600">
              You can join one of our 8 active club domains (Teaching, Web Dev, Video Editing, Graphics, PR, etc.) during official induction drives.
            </p>
          </div>
        )}

        <div className="flex flex-col sm:flex-row gap-2.5 pt-2">
          <button
            onClick={() => navigate(-1)}
            className="flex-1 py-3 px-4 rounded-xl border border-slate-300 text-slate-700 hover:bg-slate-100 text-xs font-bold transition-colors flex items-center justify-center gap-2"
          >
            <ArrowLeft size={14} />
            <span>Go Back</span>
          </button>

          {isLevel5NormalUser ? (
            <Link
              to="/recruitment"
              className="flex-1 py-3 px-4 rounded-xl bg-teal-800 hover:bg-teal-900 text-white text-xs font-bold transition-all shadow-md shadow-teal-900/20 flex items-center justify-center gap-2"
            >
              <Heart size={14} />
              <span>Apply for Recruitment</span>
            </Link>
          ) : user ? (
            <Link
              to="/portal/profile"
              className="flex-1 py-3 px-4 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold transition-all shadow-md shadow-blue-500/20 flex items-center justify-center gap-2"
            >
              <User size={14} />
              <span>My Member Profile</span>
            </Link>
          ) : null}

          <Link
            to={isLevel5NormalUser ? '/events' : '/'}
            className="flex-1 py-3 px-4 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold transition-colors flex items-center justify-center gap-2"
          >
            {isLevel5NormalUser ? <Calendar size={14} /> : <Home size={14} />}
            <span>{isLevel5NormalUser ? 'Public Events' : 'Public Home'}</span>
          </Link>
        </div>
      </div>
    </div>
  );
};
