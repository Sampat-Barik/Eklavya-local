import React from 'react';
import { NavLink, Outlet, Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Navbar } from '../components/Navbar';
import {
  User,
  LayoutDashboard,
  Calendar,
  CalendarCheck,
  Award,
  Megaphone,
  Heart,
  ShieldAlert,
  Zap
} from 'lucide-react';

export const UserPortalLayout: React.FC = () => {
  const { user, logout, isAuthenticated, roleLevel } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  if (!isAuthenticated || !user) {
    navigate('/login');
    return null;
  }

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  if (user.isSuspended) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6">
        <div className="editorial-card p-10 max-w-md w-full text-center space-y-4 border-rose-200 bg-rose-50/20 shadow-lg">
          <div className="w-14 h-14 mx-auto rounded-2xl bg-rose-100 text-rose-600 flex items-center justify-center">
            <ShieldAlert size={28} />
          </div>
          <h2 className="text-2xl font-serif font-black text-slate-900">Account Suspended</h2>
          <p className="text-xs text-slate-600 leading-relaxed">
            Your member account has been temporarily suspended. Please contact the society administration.
          </p>
          <button
            onClick={handleLogout}
            className="px-5 py-2.5 rounded-xl bg-slate-900 text-white text-xs font-bold hover:bg-slate-800 transition-colors"
          >
            Sign Out
          </button>
        </div>
      </div>
    );
  }

  const navLinks = [
    { name: 'Overview', path: '/portal', icon: LayoutDashboard, exact: true },
    ...(roleLevel <= 4
      ? [
          {
            name: roleLevel === 3 ? 'Domain Hub (Lead)' : roleLevel === 4 ? 'My Domain Tasks' : 'Domain Operations',
            path: '/portal/domain-hub',
            icon: Zap
          }
        ]
      : []),
    { name: 'My Profile', path: '/portal/profile', icon: User },
    { name: 'Events & Registrations', path: '/portal/events', icon: Calendar },
    { name: 'Events Attended', path: '/portal/attendance', icon: CalendarCheck },
    { name: 'My Certificates', path: '/portal/certificates', icon: Award },
    { name: 'Announcements', path: '/portal/announcements', icon: Megaphone },
    { name: 'Donation History', path: '/portal/donations', icon: Heart }
  ];

  return (
    <div className="min-h-screen bg-[#FCFBF9] flex flex-col antialiased relative overflow-x-clip">
      {/* 5-Layer Botanical Background Orchestrator Wrapper */}
      <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none text-emerald-900/10">
        {/* Top Left */}
        <img
          src="/bg-leaf-1.svg"
          alt=""
          aria-hidden="true"
          className="absolute -top-10 -left-10 w-96 opacity-20 -rotate-12"
          style={{ filter: 'invert(40%) sepia(20%) saturate(150%) hue-rotate(110deg)' }}
        />

        {/* Mid Right */}
        <img
          src="/bg-leaf-2.svg"
          alt=""
          aria-hidden="true"
          className="absolute top-[30%] -right-16 w-80 opacity-15 rotate-45"
          style={{ filter: 'invert(40%) sepia(20%) saturate(150%) hue-rotate(110deg)' }}
        />

        {/* Center Watermark */}
        <img
          src="/bg-leaf-3.svg"
          alt=""
          aria-hidden="true"
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[40rem] opacity-5"
          style={{ filter: 'invert(40%) sepia(20%) saturate(150%) hue-rotate(110deg)' }}
        />

        {/* Bottom Left */}
        <img
          src="/bg-leaf-4.svg"
          alt=""
          aria-hidden="true"
          className="absolute bottom-[15%] -left-20 w-[28rem] opacity-10 rotate-12"
          style={{ filter: 'invert(40%) sepia(20%) saturate(150%) hue-rotate(110deg)' }}
        />

        {/* Bottom Right */}
        <img
          src="/bg-leaf-5.svg"
          alt=""
          aria-hidden="true"
          className="absolute -bottom-10 -right-10 w-96 opacity-20 -rotate-12"
          style={{ filter: 'invert(40%) sepia(20%) saturate(150%) hue-rotate(110deg)' }}
        />
      </div>

      {/* Universal Top Navigation Header (Constant across entire site) */}
      <Navbar />

      {/* Secondary Horizontal Pill Bar for Portal Sub-navigation */}
      <div className="w-full max-w-full overflow-x-auto horizontal-scroll-container overscroll-x-contain px-4 mt-3 z-40 pb-1">
        <div className="flex items-center gap-1.5 bg-white/90 backdrop-blur-md border border-emerald-100/90 rounded-2xl sm:rounded-full p-1.5 shadow-sm min-w-max mx-auto justify-center">
          {navLinks.map((tab) => {
            const Icon = tab.icon;
            const active = tab.exact ? location.pathname === tab.path : location.pathname.startsWith(tab.path);
            return (
              <NavLink
                key={tab.path}
                to={tab.path}
                end={tab.exact}
                className={({ isActive }) =>
                  `min-h-[44px] flex items-center gap-2 px-4 py-2.5 rounded-xl sm:rounded-full text-xs font-bold transition-all whitespace-nowrap cursor-pointer touch-manipulation ${
                    isActive
                      ? 'bg-teal-800 text-white shadow-xs'
                      : 'text-slate-600 hover:text-teal-950 hover:bg-emerald-50/70'
                  }`
                }
              >
                <Icon size={14} className={active ? 'text-white' : 'text-emerald-700'} />
                <span>{tab.name}</span>
              </NavLink>
            );
          })}
        </div>
      </div>

      {/* Main Member Content Area */}
      <main className="flex-1 max-w-[1400px] w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 relative z-10">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-200/80 bg-white py-6 px-4 text-center text-xs text-slate-500 font-medium">
        <div className="max-w-[1400px] mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
          <span>© 2026 Eklavya — Hands That Care (HIT Haldia). Member Portal.</span>
          <div className="flex items-center gap-4 text-slate-400">
            <Link to="/" className="hover:text-blue-600 transition-colors">Public Home</Link>
            <Link to="/events" className="hover:text-blue-600 transition-colors">Public Events</Link>
            <Link to="/donate" className="hover:text-blue-600 transition-colors">Contribute</Link>
          </div>
        </div>
      </footer>
    </div>
  );
};
