import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useDonationModal } from '../context/DonationModalContext';
import {
  ChevronDown,
  Compass,
  GraduationCap,
  Users,
  Sparkles,
  Heart,
  LogOut,
  Menu,
  X,
  User as UserIcon,
  Shield,
  Zap,
  Crown,
  Layers,
  Globe,
  Calendar,
  Award,
  Megaphone,
  Briefcase
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { OFFICIAL_DOMAINS } from '../types/auth';

interface SubmenuItem {
  name: string;
  description: string;
  href: string;
  icon: LucideIcon;
  isExternal?: boolean;
}

export const Navbar: React.FC = () => {
  const { isAuthenticated, roleLevel, userDomain, user, logout } = useAuth();
  const { openDonationModal } = useDonationModal();
  const navigate = useNavigate();
  const location = useLocation();

  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [mobileAccordion, setMobileAccordion] = useState<string | null>(null);

  const navRef = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Scroll detection for enhanced shadow on scroll
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 15);
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Dropdown hover with smooth grace period
  const handleMouseEnter = (name: string) => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setOpenDropdown(name);
  };

  const handleMouseLeave = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      setOpenDropdown(null);
    }, 180);
  };

  // Close dropdowns on outside click or Escape key
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(event.target as Node)) {
        setOpenDropdown(null);
        setMobileMenuOpen(false);
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setOpenDropdown(null);
        setMobileMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  // Close menus on route change using official React pattern
  const [prevPath, setPrevPath] = useState(location.pathname);
  if (prevPath !== location.pathname) {
    setPrevPath(location.pathname);
    setOpenDropdown(null);
    setMobileMenuOpen(false);
  }

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  // Nav menus structure
  const aboutItems: SubmenuItem[] = [
    {
      name: 'Vision & Mission',
      description: 'Our foundational philosophy, values & goals',
      href: '/vision',
      icon: Compass,
    },
    {
      name: 'Faculty Coordinator',
      description: 'Academic mentorship & institutional leadership',
      href: '/faculty',
      icon: GraduationCap,
    },
    {
      name: 'Our Team',
      description: 'Active student executive body & field members',
      href: '/members',
      icon: Users,
    },
    {
      name: 'Esteemed Alumni',
      description: 'Former campus leaders continuing the legacy',
      href: '/alumni',
      icon: Sparkles,
    },
    {
      name: 'Campus Intake & Recruitment',
      description: 'Annual student selection process & intake form',
      href: '/recruitment',
      icon: GraduationCap,
    },
    {
      name: 'Corporate Partnerships (CSR)',
      description: 'Schedule VII alignment, grants & corporate MoUs',
      href: '/corporate-partnerships',
      icon: Briefcase,
    },
  ];

  const domainLabel = OFFICIAL_DOMAINS.find((d) => d.key === userDomain)?.name || 'Department';

  const portalItems: SubmenuItem[] = [
    ...(roleLevel === 1
      ? [
          {
            name: 'Access & Role Management',
            description: 'Assign, change or revoke user roles & audit logs',
            href: '/admin/access-management',
            icon: Crown,
          },
          {
            name: 'Admin Console',
            description: 'Events, content & society operations',
            href: '/admin',
            icon: Shield,
          },
          {
            name: 'All 8 Domain Hubs',
            description: 'Oversight across all club department tasks',
            href: '/portal/domain-hub',
            icon: Layers,
          },
          {
            name: 'Member Portal Overview',
            description: 'Attendance, certificates & notifications',
            href: '/portal',
            icon: UserIcon,
          }
        ]
      : roleLevel === 2
      ? [
          {
            name: 'Admin Console',
            description: 'Events, member directory & operations',
            href: '/admin',
            icon: Shield,
          },
          {
            name: 'Domain Operations',
            description: 'Track deliverables across all 8 domains',
            href: '/portal/domain-hub',
            icon: Layers,
          },
          {
            name: 'Member Portal',
            description: 'Profile, certificates, events & attendance',
            href: '/portal',
            icon: UserIcon,
          }
        ]
      : roleLevel === 3
      ? [
          {
            name: `${domainLabel} Hub`,
            description: 'Create & delegate tasks to domain members',
            href: '/portal/domain-hub',
            icon: Zap,
          },
          {
            name: 'Member Desk',
            description: 'Personalized profile & society events',
            href: '/portal',
            icon: UserIcon,
          }
        ]
      : roleLevel === 4
      ? [
          {
            name: 'My Domain Tasks & Updates',
            description: `Internal deliverables for ${domainLabel}`,
            href: '/portal/domain-hub',
            icon: Zap,
          },
          {
            name: 'My Member Profile',
            description: 'Personal profile, certificates & attendance',
            href: '/portal/profile',
            icon: UserIcon,
          }
        ]
      : roleLevel === 5
      ? [
          {
            name: 'Portal Overview',
            description: 'Personal dashboard, statistics & quick links',
            href: '/portal',
            icon: UserIcon,
          },
          {
            name: 'My Profile',
            description: 'Personal details & account information',
            href: '/portal/profile',
            icon: UserIcon,
          },
          {
            name: 'Events Attended',
            description: 'Track attended sessions & registered events',
            href: '/portal/attendance',
            icon: Calendar,
          },
          {
            name: 'My Certificates',
            description: 'Download verified certificates & commendations',
            href: '/portal/certificates',
            icon: Award,
          },
          {
            name: 'Donation History',
            description: 'Contributions, verified receipts & aid ledger',
            href: '/portal/donations',
            icon: Heart,
          },
          {
            name: 'Announcements',
            description: 'Official society circulars & community notices',
            href: '/portal/announcements',
            icon: Megaphone,
          }
        ]
      : [
          {
            name: 'Member Sign In',
            description: 'Access authenticated member services & tasks',
            href: '/login',
            icon: UserIcon,
          }
        ])
  ];

  const toggleDropdown = (name: string) => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setOpenDropdown((prev) => (prev === name ? null : name));
  };

  const toggleMobileAccordion = (name: string) => {
    setMobileAccordion((prev) => (prev === name ? null : name));
  };

  return (
    <header
      ref={navRef}
      className={`sticky top-0 z-50 w-full bg-[#FCFBF9]/85 backdrop-blur-md border-b border-slate-200/60 transition-all duration-200 ${
        isScrolled ? 'py-2.5 shadow-xs' : 'py-3'
      }`}
    >

      <div className="max-w-[1440px] w-full mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Left: Brand Identity & Compact Status */}
        <div className="flex items-center gap-3.5 sm:gap-4">
          <Link to="/" className="flex items-center gap-2.5 group focus:outline-none">
            <div className="relative w-9 h-9 sm:w-10 sm:h-10 rounded-full flex items-center justify-center p-0.5 group-hover:scale-105 transition-transform bg-gradient-to-r from-teal-700 to-emerald-500 p-[2px] shadow-sm">
              <div className="w-full h-full rounded-full bg-white flex items-center justify-center p-1">
                <img
                  src="/eklavya_logo.png"
                  alt="Eklavya Emblem"
                  className="w-full h-full object-contain"
                />
              </div>
            </div>
            <div className="flex flex-col">
              <span className="font-serif font-black text-lg text-teal-950 tracking-tight leading-none group-hover:text-teal-700 transition-colors">
                Eklavya
              </span>
              <span className="text-[10px] font-bold text-teal-700 tracking-wider uppercase mt-0.5">
                Hands That Care • HIT Haldia
              </span>
            </div>
          </Link>

          {/* Compact Live Status Indicator */}
          <div className="hidden xl:flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-50 border border-emerald-200 text-[10px] font-bold text-emerald-800 shadow-2xs">
            <span className="relative flex h-1.5 w-1.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500"></span>
            </span>
            <span className="tracking-wide">Operations Active</span>
          </div>
        </div>

        {/* Center: Desktop Navigation with Accessible Dropdowns */}
        <nav className="hidden md:flex items-center gap-1 lg:gap-1.5 text-xs font-semibold text-slate-700">
          {/* 1. Standalone Home Link */}
          <Link
            to="/"
            className={`px-3.5 py-1.5 rounded-full transition-all ${
              location.pathname === '/'
                ? 'text-teal-900 font-bold bg-emerald-50 border border-emerald-200/90 shadow-2xs'
                : 'hover:text-teal-800 hover:bg-emerald-50/70'
            }`}
          >
            Home
          </Link>

          {/* 2. About Dropdown */}
          <div
            className="relative"
            onMouseEnter={() => handleMouseEnter('about')}
            onMouseLeave={handleMouseLeave}
          >
            <button
              onClick={() => toggleDropdown('about')}
              aria-expanded={openDropdown === 'about'}
              aria-haspopup="true"
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full transition-all focus:outline-none cursor-pointer ${
                ['/vision', '/faculty', '/members', '/alumni'].includes(location.pathname) ||
                openDropdown === 'about'
                  ? 'text-teal-900 font-bold bg-emerald-50 border border-emerald-200/90 shadow-2xs'
                  : 'hover:text-teal-800 hover:bg-emerald-50/70'
              }`}
            >
              <span>About</span>
              <ChevronDown
                size={13}
                className={`transition-transform duration-200 ${
                  openDropdown === 'about' ? 'rotate-180 text-teal-700' : 'text-slate-400'
                }`}
              />
            </button>

            {openDropdown === 'about' && (
              <div
                className="absolute left-0 top-full pt-1.5 w-80 z-[100] animate-fadeIn"
                onMouseEnter={() => handleMouseEnter('about')}
                onMouseLeave={handleMouseLeave}
              >
                <div className="rounded-2xl bg-white/95 backdrop-blur-md border border-emerald-100 shadow-xl shadow-teal-950/10 p-2.5">
                  <div className="px-3 py-1.5 text-[10px] font-bold text-teal-800 uppercase tracking-wider border-b border-emerald-50 mb-1 flex items-center justify-between">
                    <span>About Eklavya Society</span>
                    <Sparkles size={11} className="text-emerald-600" />
                  </div>
                  {aboutItems.map((item) => {
                    const Icon = item.icon;
                    return (
                      <Link
                        key={item.name}
                        to={item.href}
                        onClick={() => setOpenDropdown(null)}
                        className="flex items-start gap-3 p-2.5 rounded-xl hover:bg-emerald-50/80 transition-colors group"
                      >
                        <div className="p-2 rounded-lg bg-emerald-100/70 text-teal-800 group-hover:bg-teal-800 group-hover:text-white transition-colors mt-0.5 shrink-0">
                          <Icon size={15} />
                        </div>
                        <div>
                          <span className="text-xs font-bold text-slate-900 group-hover:text-teal-800 block leading-tight">
                            {item.name}
                          </span>
                          <span className="text-[11px] text-slate-600 font-normal leading-normal block mt-0.5">
                            {item.description}
                          </span>
                        </div>
                      </Link>
                    );
                  })}
                </div>
              </div>
            )}
          </div>

          {/* 3. Our Work Tab */}
          <Link
            to="/our-work"
            className={`px-3.5 py-1.5 rounded-full transition-all ${
              ['/our-work', '/work', '/programs'].includes(location.pathname)
                ? 'text-teal-900 font-bold bg-emerald-50 border border-emerald-200/90 shadow-2xs'
                : 'hover:text-teal-800 hover:bg-emerald-50/70'
            }`}
          >
            Our Work
          </Link>

          {/* 4. Events Tab */}
          <Link
            to="/events"
            className={`px-3.5 py-1.5 rounded-full transition-all ${
              location.pathname === '/events'
                ? 'text-teal-900 font-bold bg-emerald-50 border border-emerald-200/90 shadow-2xs'
                : 'hover:text-teal-800 hover:bg-emerald-50/70'
            }`}
          >
            Events
          </Link>

          {/* 5. Portal Dropdown */}
          <div
            className="relative"
            onMouseEnter={() => handleMouseEnter('portal')}
            onMouseLeave={handleMouseLeave}
          >
            <button
              onClick={() => toggleDropdown('portal')}
              aria-expanded={openDropdown === 'portal'}
              aria-haspopup="true"
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full transition-all focus:outline-none cursor-pointer ${
                location.pathname.startsWith('/portal') ||
                location.pathname.startsWith('/admin') ||
                openDropdown === 'portal'
                  ? 'text-teal-900 font-bold bg-emerald-50 border border-emerald-200/90 shadow-2xs'
                  : 'hover:text-teal-800 hover:bg-emerald-50/70'
              }`}
            >
              <span>Portal</span>
              <ChevronDown
                size={13}
                className={`transition-transform duration-200 ${
                  openDropdown === 'portal' ? 'rotate-180 text-teal-700' : 'text-slate-400'
                }`}
              />
            </button>

            {openDropdown === 'portal' && (
              <div
                className="absolute left-0 top-full pt-1.5 w-80 z-[100] animate-fadeIn"
                onMouseEnter={() => handleMouseEnter('portal')}
                onMouseLeave={handleMouseLeave}
              >
                <div className="rounded-2xl bg-white/95 backdrop-blur-md border border-emerald-100 shadow-xl shadow-teal-950/10 p-2.5">
                  <div className="px-3 py-1.5 text-[10px] font-bold text-teal-800 uppercase tracking-wider border-b border-emerald-50 mb-1 flex items-center justify-between">
                    <span>{roleLevel === 5 ? 'User Portal Services' : 'Member & Admin Services'}</span>
                    <Shield size={11} className="text-teal-700" />
                  </div>
                  {portalItems.map((item) => {
                    const Icon = item.icon;
                    return (
                      <Link
                        key={item.name}
                        to={item.href}
                        onClick={() => setOpenDropdown(null)}
                        className="flex items-start gap-3 p-2.5 rounded-xl hover:bg-emerald-50/80 transition-colors group"
                      >
                        <div className="p-2 rounded-lg bg-emerald-100/70 text-teal-800 group-hover:bg-teal-800 group-hover:text-white transition-colors mt-0.5 shrink-0">
                          <Icon size={15} />
                        </div>
                        <div>
                          <span className="text-xs font-bold text-slate-900 group-hover:text-teal-800 block leading-tight">
                            {item.name}
                          </span>
                          <span className="text-[11px] text-slate-600 font-normal leading-normal block mt-0.5">
                            {item.description}
                          </span>
                        </div>
                      </Link>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        </nav>

        {/* Right: Static Donate Button & Auth / Portal Controls */}
        <div className="hidden md:flex items-center gap-2.5">
          {/* Static, Highly Visible "Donate" Action Button */}
          <button
            type="button"
            onClick={() => openDonationModal()}
            className="flex items-center gap-1.5 text-xs font-black px-4 py-2 rounded-full bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 hover:from-emerald-400 hover:to-cyan-400 text-white shadow-md shadow-emerald-500/25 hover:shadow-emerald-500/40 hover:-translate-y-0.5 active:translate-y-0 transition-all cursor-pointer group"
            title="Donate to support Eklavya social welfare and animal rescue"
          >
            <Heart size={14} className="text-white fill-current group-hover:scale-125 transition-transform" />
            <span>Donate</span>
          </button>

          {isAuthenticated ? (
            <div className="flex items-center gap-2">
              {/* Dynamic Role Badge */}
              <div className="hidden lg:flex items-center">
                {roleLevel === 1 && (
                  <span className="px-2.5 py-1 rounded-full text-[10px] font-extrabold uppercase bg-amber-500/15 text-amber-700 border border-amber-300 flex items-center gap-1 shadow-2xs">
                    <Crown size={11} className="text-amber-600" />
                    <span>Super Admin</span>
                  </span>
                )}
                {roleLevel === 2 && (
                  <span className="px-2.5 py-1 rounded-full text-[10px] font-extrabold uppercase bg-teal-500/15 text-teal-700 border border-teal-300 flex items-center gap-1 shadow-2xs">
                    <Shield size={11} className="text-teal-600" />
                    <span>Admin</span>
                  </span>
                )}
                {roleLevel === 3 && (
                  <span className="px-2.5 py-1 rounded-full text-[10px] font-extrabold uppercase bg-indigo-500/15 text-indigo-700 border border-indigo-300 flex items-center gap-1 shadow-2xs">
                    <Zap size={11} className="text-indigo-600" />
                    <span>Lead: {OFFICIAL_DOMAINS.find(d => d.key === userDomain)?.name || 'Domain'}</span>
                  </span>
                )}
                {roleLevel === 4 && (
                  <span className="px-2.5 py-1 rounded-full text-[10px] font-extrabold uppercase bg-emerald-500/15 text-emerald-700 border border-emerald-300 flex items-center gap-1 shadow-2xs">
                    <UserIcon size={11} className="text-emerald-600" />
                    <span>Member: {OFFICIAL_DOMAINS.find(d => d.key === userDomain)?.name || 'Club'}</span>
                  </span>
                )}
                {roleLevel === 5 && (
                  <span className="px-2.5 py-1 rounded-full text-[10px] font-extrabold uppercase bg-slate-100 text-slate-700 border border-slate-300 flex items-center gap-1 shadow-2xs">
                    <Globe size={11} className="text-slate-600" />
                    <span>Normal User</span>
                  </span>
                )}
              </div>

              <Link
                to={roleLevel === 3 || roleLevel === 4 ? '/portal/domain-hub' : roleLevel === 1 || roleLevel === 2 ? '/admin' : '/portal'}
                className={`flex items-center gap-1.5 text-xs font-bold px-3.5 py-1.5 rounded-full transition-colors ${
                  location.pathname.startsWith('/portal') || location.pathname.startsWith('/admin')
                    ? 'bg-teal-800 text-white shadow-xs'
                    : 'text-slate-700 bg-emerald-50/80 hover:bg-emerald-100/80 border border-emerald-200/70'
                }`}
              >
                {roleLevel === 3 ? (
                  <Zap size={13} className={location.pathname.startsWith('/portal') ? 'text-white' : 'text-teal-700'} />
                ) : roleLevel === 1 ? (
                  <Crown size={13} className={location.pathname.startsWith('/admin') ? 'text-white' : 'text-amber-500'} />
                ) : roleLevel === 2 ? (
                  <Shield size={13} className={location.pathname.startsWith('/admin') ? 'text-white' : 'text-teal-700'} />
                ) : (
                  <UserIcon size={13} className={location.pathname.startsWith('/portal') ? 'text-white' : 'text-teal-700'} />
                )}
                <span>
                  {roleLevel === 3
                    ? 'Domain Hub'
                    : roleLevel === 4
                    ? 'My Desk'
                    : roleLevel === 1
                    ? 'Super Console'
                    : roleLevel === 2
                    ? 'Admin Console'
                    : 'My Portal'}
                </span>
              </Link>
              <button
                onClick={handleLogout}
                className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-full transition-colors focus:outline-none cursor-pointer"
                title={`Logout (${user?.name || 'User'})`}
                aria-label="Logout"
              >
                <LogOut size={15} />
              </button>
            </div>
          ) : (
            <Link
              to="/login"
              className="text-xs font-semibold text-slate-700 hover:text-teal-800 px-3.5 py-1.5 rounded-full hover:bg-emerald-50/80 transition-colors border border-emerald-200/70"
            >
              Sign In
            </Link>
          )}
        </div>

        {/* Mobile: Pinned Donate Button & Menu Toggle */}
        <div className="flex md:hidden items-center gap-2">
          <button
            type="button"
            onClick={() => openDonationModal()}
            className="flex items-center gap-1.5 text-xs font-black px-3.5 py-1.5 rounded-full bg-gradient-to-r from-emerald-500 to-teal-500 text-white shadow-md shadow-emerald-500/30 active:scale-95 transition-all cursor-pointer"
          >
            <Heart size={13} className="text-white fill-current" />
            <span>Donate</span>
          </button>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-slate-800 hover:bg-emerald-50 rounded-full focus:outline-none"
            aria-label="Toggle navigation menu"
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Drawer with Accordion Submenus */}
      {mobileMenuOpen && (
        <div className="md:hidden mt-2 max-w-[1400px] mx-auto max-h-screen overflow-y-auto bg-white/95 backdrop-blur-xl border border-emerald-100 rounded-2xl p-4 space-y-2 text-sm font-semibold shadow-2xl animate-fadeIn">
          {/* 1. Home */}
          <Link
            to="/"
            onClick={() => setMobileMenuOpen(false)}
            className={`min-h-[48px] flex items-center px-4 py-2.5 rounded-xl transition-colors ${
              location.pathname === '/' ? 'bg-emerald-50 text-teal-800 font-bold' : 'hover:bg-emerald-50/60 text-slate-800'
            }`}
          >
            Home
          </Link>

          {/* 2. About Accordion */}
          <div className="border border-emerald-100 rounded-xl overflow-hidden">
            <button
              onClick={() => toggleMobileAccordion('about')}
              className="w-full min-h-[48px] flex items-center justify-between px-4 py-2.5 bg-emerald-50/50 text-slate-800 text-left cursor-pointer"
            >
              <span>About</span>
              <ChevronDown
                size={16}
                className={`transition-transform duration-200 ${
                  mobileAccordion === 'about' ? 'rotate-180 text-teal-700' : 'text-slate-400'
                }`}
              />
            </button>
            {mobileAccordion === 'about' && (
              <div className="p-2 space-y-1 bg-white">
                {aboutItems.map((item) => (
                  <Link
                    key={item.name}
                    to={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="min-h-[48px] flex items-center px-3.5 py-3 text-base text-slate-600 hover:text-teal-800 hover:bg-emerald-50/70 rounded-lg transition-colors"
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* 3. Our Work */}
          <Link
            to="/our-work"
            onClick={() => setMobileMenuOpen(false)}
            className={`min-h-[48px] flex items-center px-4 py-2.5 rounded-xl transition-colors ${
              ['/our-work', '/work', '/programs'].includes(location.pathname)
                ? 'bg-emerald-50 text-teal-800 font-bold'
                : 'hover:bg-emerald-50/60 text-slate-800'
            }`}
          >
            Our Work
          </Link>

          {/* 4. Events */}
          <Link
            to="/events"
            onClick={() => setMobileMenuOpen(false)}
            className={`min-h-[48px] flex items-center px-4 py-2.5 rounded-xl transition-colors ${
              location.pathname === '/events' ? 'bg-emerald-50 text-teal-800 font-bold' : 'hover:bg-emerald-50/60 text-slate-800'
            }`}
          >
            Events
          </Link>

          {/* 5. Portal Accordion */}
          <div className="border border-emerald-100 rounded-xl overflow-hidden">
            <button
              onClick={() => toggleMobileAccordion('portal')}
              className="w-full min-h-[48px] flex items-center justify-between px-4 py-2.5 bg-emerald-50/50 text-slate-800 text-left cursor-pointer"
            >
              <span>{roleLevel === 5 ? 'Get Involved' : 'Portal'}</span>
              <ChevronDown
                size={16}
                className={`transition-transform duration-200 ${
                  mobileAccordion === 'portal' ? 'rotate-180 text-teal-700' : 'text-slate-400'
                }`}
              />
            </button>
            {mobileAccordion === 'portal' && (
              <div className="p-2 space-y-1 bg-white">
                {portalItems.map((item) => (
                  <Link
                    key={item.name}
                    to={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="min-h-[48px] flex items-center px-3.5 py-3 text-base text-slate-600 hover:text-teal-800 hover:bg-emerald-50/70 rounded-lg transition-colors"
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* 6. Mobile Donate Action Button */}
          <div className="pt-1">
            <button
              type="button"
              onClick={() => {
                setMobileMenuOpen(false);
                openDonationModal();
              }}
              className="w-full h-[48px] flex items-center justify-center gap-2 px-4 rounded-full bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 text-white font-black text-sm shadow-md shadow-emerald-500/20 active:scale-95 transition-all cursor-pointer"
            >
              <Heart size={16} className="text-white fill-current" />
              <span>Donate Now</span>
            </button>
          </div>

          {/* Bottom Auth Link */}
          <div className="pt-2 border-t border-emerald-100">
            {isAuthenticated ? (
              <div className="min-h-[48px] flex items-center justify-between px-3.5 py-2 bg-emerald-50/50 rounded-xl">
                <span className="text-xs text-slate-600">
                  Signed in as <strong className="text-teal-950">{user?.name}</strong>
                </span>
                <button
                  onClick={() => {
                    handleLogout();
                    setMobileMenuOpen(false);
                  }}
                  className="min-h-[48px] min-w-[48px] flex items-center justify-center text-xs text-rose-600 font-bold hover:underline cursor-pointer"
                >
                  Logout
                </button>
              </div>
            ) : (
              <Link
                to="/login"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full min-h-[48px] flex items-center justify-center py-2.5 px-4 text-xs font-bold text-teal-900 bg-emerald-50 hover:bg-emerald-100 rounded-xl transition-colors"
              >
                Sign In to Member Portal
              </Link>
            )}
          </div>
        </div>
      )}
    </header>
  );
};
