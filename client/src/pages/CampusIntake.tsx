import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  GraduationCap,
  CheckCircle2,
  Clock,
  Send,
  AlertCircle,
  Search,
  Heart,
  Layers,
  ShieldCheck
} from 'lucide-react';
import { OFFICIAL_DOMAINS } from '../types/auth';

export const CampusIntake: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'apply' | 'status' | 'faq'>('apply');
  const [submittedId, setSubmittedId] = useState<string | null>(null);

  // Form State
  const [fullName, setFullName] = useState('');
  const [studentId, setStudentId] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [department, setDepartment] = useState('Computer Science & Engg.');
  const [academicYear, setAcademicYear] = useState('1st Year');
  const [primaryDomain, setPrimaryDomain] = useState('teaching');
  const [secondaryDomain, setSecondaryDomain] = useState('volunteering');
  const [weeklyHours, setWeeklyHours] = useState('4-6 hours / week');
  const [statement, setStatement] = useState('');
  const [pastExperience, setPastExperience] = useState('');
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Status Search State
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResult, setSearchResult] = useState<{
    id: string;
    name: string;
    domain: string;
    status: string;
    stage: string;
    updatedAt: string;
    notes: string;
  } | null>(null);
  const [hasSearched, setHasSearched] = useState(false);

  const departments = [
    'Computer Science & Engg.',
    'Information Technology',
    'Electronics & Comm. Engg.',
    'Electrical Engineering',
    'Mechanical Engineering',
    'Chemical Engineering',
    'Applied Electronics & Inst. Engg.',
    'Civil Engineering',
    'Biotechnology',
    'Management Studies (MBA/BBA)'
  ];

  const academicYears = ['1st Year (Fresher)', '2nd Year (Sophomore)', '3rd Year (Junior)', '4th Year (Senior)'];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!agreedToTerms) return;

    setIsSubmitting(true);
    setTimeout(() => {
      const generatedId = `EKL-INTAKE-2026-${Math.floor(1000 + Math.random() * 9000)}`;
      setSubmittedId(generatedId);
      setIsSubmitting(false);

      // Save to localStorage for demo persistence
      try {
        const stored = JSON.parse(localStorage.getItem('eklavya_intake_applications') || '[]');
        stored.push({
          id: generatedId,
          name: fullName,
          email,
          domain: primaryDomain,
          department,
          year: academicYear,
          status: 'Under Review',
          stage: 'Round 1: Written Intent Screening',
          submittedAt: new Date().toLocaleDateString(),
          notes: 'Application registered in candidate pool. Committee review underway.'
        });
        localStorage.setItem('eklavya_intake_applications', JSON.stringify(stored));
      } catch (e) {
        console.error('Failed to save to local cache', e);
      }
    }, 900);
  };

  const handleStatusSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setHasSearched(true);
    const q = searchQuery.trim().toLowerCase();

    try {
      const stored = JSON.parse(localStorage.getItem('eklavya_intake_applications') || '[]');
      const found = stored.find(
        (app: any) => app.id.toLowerCase() === q || app.email.toLowerCase() === q
      );

      if (found) {
        setSearchResult({
          id: found.id,
          name: found.name,
          domain: found.domain,
          status: found.status,
          stage: found.stage,
          updatedAt: found.submittedAt,
          notes: found.notes
        });
      } else if (q.includes('ekl') || q.includes('hit') || q.includes('@')) {
        // Fallback demo match for realistic simulation
        setSearchResult({
          id: searchQuery.toUpperCase(),
          name: 'Registered Candidate',
          domain: 'Evening School & Teaching',
          status: 'Under Committee Review',
          stage: 'Round 1: Screening & Roll Verification',
          updatedAt: '28 September 2026',
          notes: 'Your credentials have been logged. Domain lead interview shortlist will be announced on the portal.'
        });
      } else {
        setSearchResult(null);
      }
    } catch {
      setSearchResult(null);
    }
  };

  return (
    <div className="max-w-[1400px] w-full mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-12">
      {/* 1. Header Banner with Mandate Clarity */}
      <div className="border-b border-slate-200 pb-10 space-y-6">
        <div className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-teal-800 font-bold bg-teal-50 border border-teal-200 px-3.5 py-1.5 rounded-full shadow-2xs">
          <GraduationCap size={15} className="text-teal-700" />
          <span>Annual Student Intake 2026–2027 • Haldia Institute of Technology</span>
        </div>

        <div className="space-y-3 max-w-4xl">
          <h1 className="font-serif text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight leading-[1.1]">
            Campus Recruitment & Student Intake Application
          </h1>
          <p className="text-slate-700 text-sm sm:text-base leading-relaxed">
            Eklavya is the official socio-animal welfare student body of HIT Haldia. We unite engineering disciplines to sustain free daily evening schools for rural children and 24/7 emergency veterinary rescue across Haldia.
          </p>
        </div>

        {/* CRITICAL SELECTION PROCESS NOTICE */}
        <div className="bg-amber-50/90 border-2 border-amber-300/80 rounded-2xl p-5 sm:p-6 shadow-sm flex items-start gap-4">
          <div className="w-10 h-10 rounded-xl bg-amber-100 border border-amber-200 flex items-center justify-center text-amber-800 shrink-0 mt-0.5">
            <AlertCircle size={20} />
          </div>
          <div className="space-y-1.5">
            <h3 className="font-serif text-base sm:text-lg font-bold text-amber-950 flex items-center gap-2">
              <span>Mandatory Selection Process Notice</span>
              <span className="text-[10px] font-mono uppercase bg-amber-200/80 text-amber-900 px-2 py-0.5 rounded-md font-extrabold">
                No Direct Sign-Up
              </span>
            </h3>
            <p className="text-xs sm:text-sm text-amber-900/90 leading-relaxed font-normal">
              <strong>Membership into Eklavya is subject to the annual recruitment selection process.</strong> Submitting this form enters your profile into our official applicant pool. Candidates undergo written intent screening, department review, and an in-person panel interview by Domain Leads and the Faculty Advisor. Only candidates selected through these stages are inducted into the active volunteer body.
            </p>
          </div>
        </div>

        {/* In-Page Navigation Tabs */}
        <div className="flex items-center gap-2 pt-2 overflow-x-auto">
          <button
            onClick={() => setActiveTab('apply')}
            className={`px-5 py-2.5 rounded-full font-mono text-xs uppercase tracking-wider font-bold transition-all cursor-pointer whitespace-nowrap ${
              activeTab === 'apply'
                ? 'bg-slate-900 text-white shadow-sm'
                : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
            }`}
          >
            1. Submit Application
          </button>
          <button
            onClick={() => setActiveTab('status')}
            className={`px-5 py-2.5 rounded-full font-mono text-xs uppercase tracking-wider font-bold transition-all cursor-pointer whitespace-nowrap ${
              activeTab === 'status'
                ? 'bg-slate-900 text-white shadow-sm'
                : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
            }`}
          >
            2. Application Waitlist & Status Check
          </button>
          <button
            onClick={() => setActiveTab('faq')}
            className={`px-5 py-2.5 rounded-full font-mono text-xs uppercase tracking-wider font-bold transition-all cursor-pointer whitespace-nowrap ${
              activeTab === 'faq'
                ? 'bg-slate-900 text-white shadow-sm'
                : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
            }`}
          >
            3. Intake FAQs & Guidelines
          </button>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* TAB 1: APPLICATION FORM */}
      {/* ========================================================================= */}
      {activeTab === 'apply' && (
        <div className="space-y-10 animate-fadeIn">
          {submittedId ? (
            <div className="bg-emerald-50 border-2 border-emerald-300 rounded-3xl p-8 sm:p-12 text-center max-w-2xl mx-auto space-y-6 shadow-md">
              <div className="w-16 h-16 rounded-full bg-emerald-100 border border-emerald-300 mx-auto flex items-center justify-center text-emerald-700 shadow-sm">
                <CheckCircle2 size={32} />
              </div>
              <div className="space-y-2">
                <span className="font-mono text-xs uppercase tracking-widest text-emerald-800 font-bold bg-emerald-100/80 px-3 py-1 rounded-full">
                  Application Logged Successfully
                </span>
                <h2 className="font-serif text-2xl sm:text-3xl font-extrabold text-slate-900">
                  Welcome to the Intake Pool
                </h2>
                <p className="text-xs sm:text-sm text-slate-700 max-w-md mx-auto leading-relaxed">
                  Your recruitment application for Eklavya Society has been received. Please keep your Application Reference ID safe for status tracking.
                </p>
              </div>

              <div className="p-4 bg-white rounded-2xl border border-emerald-200 inline-block shadow-2xs font-mono">
                <span className="text-xs text-slate-500 block mb-1">Your Application Reference ID</span>
                <span className="text-xl sm:text-2xl font-black text-emerald-800 tracking-wider">
                  {submittedId}
                </span>
              </div>

              {/* Next Steps Road Map */}
              <div className="text-left bg-white/80 rounded-2xl p-5 border border-emerald-200 space-y-3 text-xs text-slate-700">
                <h4 className="font-bold text-slate-900 uppercase font-mono tracking-wide">
                  What Happens Next in the Selection Process:
                </h4>
                <div className="space-y-2">
                  <div className="flex items-start gap-2.5">
                    <span className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center text-[10px] font-bold shrink-0 mt-0.5">1</span>
                    <span><strong>Stage 1: Intent & Branch Screening</strong> — Domain Leads review your written motivation and department timetable.</span>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <span className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center text-[10px] font-bold shrink-0 mt-0.5">2</span>
                    <span><strong>Stage 2: Panel Interview Shortlist</strong> — Shortlisted candidates receive an email/WhatsApp invite for an in-person conversation on campus.</span>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <span className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center text-[10px] font-bold shrink-0 mt-0.5">3</span>
                    <span><strong>Stage 3: 30-Day Ground Orientation</strong> — Selected candidates shadow active sessions before official Level 4 member induction.</span>
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
                <button
                  onClick={() => {
                    setSubmittedId(null);
                    setSearchQuery(submittedId);
                    setActiveTab('status');
                  }}
                  className="w-full sm:w-auto px-6 py-3 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-mono text-xs uppercase tracking-wider font-bold transition-colors"
                >
                  Track Application Status
                </button>
                <Link
                  to="/"
                  className="w-full sm:w-auto px-6 py-3 rounded-xl bg-white border border-slate-300 text-slate-800 font-mono text-xs uppercase tracking-wider font-bold hover:bg-slate-50 transition-colors"
                >
                  Return to Home
                </Link>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
              {/* Left Column: Form (7 cols) */}
              <div className="lg:col-span-8 bg-white/95 backdrop-blur-md border border-slate-200 rounded-3xl p-6 sm:p-10 shadow-sm space-y-8">
                <div className="space-y-1.5 border-b border-slate-100 pb-4">
                  <h2 className="font-serif text-xl sm:text-2xl font-bold text-slate-900">
                    Candidate Intake & Experience Profile
                  </h2>
                  <p className="text-xs sm:text-sm text-slate-600">
                    Please provide accurate academic coordinates and genuine responses regarding your commitment.
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Section A: Academic Coordinates */}
                  <div className="space-y-4">
                    <h3 className="font-mono text-xs uppercase tracking-wider text-teal-800 font-bold flex items-center gap-2">
                      <GraduationCap size={14} />
                      <span>Section A: Personal & Academic Credentials</span>
                    </h3>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-slate-900 mb-1">Full Name (as in College ID) *</label>
                        <input
                          type="text"
                          required
                          value={fullName}
                          onChange={(e) => setFullName(e.target.value)}
                          placeholder="e.g. Ananya Sen"
                          className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-900 focus:outline-none focus:border-teal-600 font-medium"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-slate-900 mb-1">College Roll No / Student ID *</label>
                        <input
                          type="text"
                          required
                          value={studentId}
                          onChange={(e) => setStudentId(e.target.value)}
                          placeholder="e.g. 23/CSE/084"
                          className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-900 focus:outline-none focus:border-teal-600 font-medium font-mono"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-slate-900 mb-1">Official / College Email *</label>
                        <input
                          type="email"
                          required
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="ananya.23cse@hithaldia.in"
                          className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-900 focus:outline-none focus:border-teal-600 font-medium"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-slate-900 mb-1">WhatsApp Contact Number *</label>
                        <input
                          type="tel"
                          required
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          placeholder="+91 98765 43210"
                          className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-900 focus:outline-none focus:border-teal-600 font-medium font-mono"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-slate-900 mb-1">Department / Branch *</label>
                        <select
                          value={department}
                          onChange={(e) => setDepartment(e.target.value)}
                          className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-xs text-slate-900 focus:outline-none focus:border-teal-600 font-medium cursor-pointer"
                        >
                          {departments.map((d) => (
                            <option key={d} value={d}>{d}</option>
                          ))}
                        </select>
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-slate-900 mb-1">Academic Year *</label>
                        <select
                          value={academicYear}
                          onChange={(e) => setAcademicYear(e.target.value)}
                          className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-xs text-slate-900 focus:outline-none focus:border-teal-600 font-medium cursor-pointer"
                        >
                          {academicYears.map((y) => (
                            <option key={y} value={y}>{y}</option>
                          ))}
                        </select>
                      </div>
                    </div>
                  </div>

                  {/* Section B: Domain Preferences */}
                  <div className="space-y-4 pt-4 border-t border-slate-100">
                    <h3 className="font-mono text-xs uppercase tracking-wider text-teal-800 font-bold flex items-center gap-2">
                      <Layers size={14} />
                      <span>Section B: Domain Preferences & Time Dedication</span>
                    </h3>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-slate-900 mb-1">Primary Wing Choice *</label>
                        <select
                          value={primaryDomain}
                          onChange={(e) => setPrimaryDomain(e.target.value)}
                          className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-xs text-slate-900 focus:outline-none focus:border-teal-600 font-medium cursor-pointer"
                        >
                          {OFFICIAL_DOMAINS.map((dom) => (
                            <option key={dom.key} value={dom.key}>
                              {dom.name} Wing
                            </option>
                          ))}
                        </select>
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-slate-900 mb-1">Secondary Wing Choice *</label>
                        <select
                          value={secondaryDomain}
                          onChange={(e) => setSecondaryDomain(e.target.value)}
                          className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-xs text-slate-900 focus:outline-none focus:border-teal-600 font-medium cursor-pointer"
                        >
                          {OFFICIAL_DOMAINS.map((dom) => (
                            <option key={dom.key} value={dom.key}>
                              {dom.name} Wing
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-900 mb-1">Weekly Time Commitment Capacity *</label>
                      <select
                        value={weeklyHours}
                        onChange={(e) => setWeeklyHours(e.target.value)}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-xs text-slate-900 focus:outline-none focus:border-teal-600 font-medium cursor-pointer"
                      >
                        <option value="3-5 hours / week">3–5 hours / week (Regular Tutoring or Design shifts)</option>
                        <option value="6-8 hours / week">6–8 hours / week (High Commitment + Field Rescue)</option>
                        <option value="9+ hours / week">9+ hours / week (Core Coordination aspirant)</option>
                      </select>
                    </div>
                  </div>

                  {/* Section C: Intent & Motivation */}
                  <div className="space-y-4 pt-4 border-t border-slate-100">
                    <h3 className="font-mono text-xs uppercase tracking-wider text-teal-800 font-bold flex items-center gap-2">
                      <Heart size={14} />
                      <span>Section C: Statement of Purpose & Motivation</span>
                    </h3>

                    <div>
                      <label className="block text-xs font-bold text-slate-900 mb-1">
                        Why do you want to join Eklavya Society? *
                      </label>
                      <textarea
                        required
                        rows={4}
                        value={statement}
                        onChange={(e) => setStatement(e.target.value)}
                        placeholder="Share your personal motivation. Why are you drawn to teaching village children or rescuing injured animals? How will you maintain regular commitment alongside academic coursework?"
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs text-slate-900 focus:outline-none focus:border-teal-600 leading-relaxed font-normal"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-900 mb-1">
                        Relevant Projects, Skills, or Past Community Experiences (Optional)
                      </label>
                      <textarea
                        rows={3}
                        value={pastExperience}
                        onChange={(e) => setPastExperience(e.target.value)}
                        placeholder="Mention any prior teaching, animal fostering, software development, video editing, poster design, or school club leadership experience..."
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs text-slate-900 focus:outline-none focus:border-teal-600 leading-relaxed font-normal"
                      />
                    </div>
                  </div>

                  {/* Agreement & Verification */}
                  <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-200 space-y-2 text-xs text-slate-800">
                    <label className="flex items-start gap-2.5 cursor-pointer">
                      <input
                        type="checkbox"
                        required
                        checked={agreedToTerms}
                        onChange={(e) => setAgreedToTerms(e.target.checked)}
                        className="mt-0.5 text-teal-700 focus:ring-teal-500 rounded border-slate-300 cursor-pointer"
                      />
                      <span className="leading-snug">
                        <strong>I understand that membership into Eklavya is subject to the annual selection process.</strong> Submission of this form registers my candidacy for screening and panel interviews; it does not confer automatic active club membership.
                      </span>
                    </label>
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting || !agreedToTerms}
                    className="w-full py-4 rounded-xl bg-gradient-to-r from-teal-800 to-emerald-700 hover:from-teal-700 hover:to-emerald-600 text-white font-mono text-xs uppercase tracking-wider font-bold transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                  >
                    {isSubmitting ? (
                      <>
                        <Clock size={16} className="animate-spin" />
                        <span>Registering Candidate Profile...</span>
                      </>
                    ) : (
                      <>
                        <Send size={15} />
                        <span>Submit Intake Application for Selection</span>
                      </>
                    )}
                  </button>
                </form>
              </div>

              {/* Right Column: 4-Stage Selection Criteria Bento (5 cols) */}
              <div className="lg:col-span-4 space-y-6">
                <div className="bg-white/95 backdrop-blur-md border border-slate-200 rounded-3xl p-6 space-y-4 shadow-sm">
                  <span className="font-mono text-xs uppercase tracking-wider text-teal-800 font-bold block">
                    Selection Rubric & Protocol
                  </span>
                  <h3 className="font-serif text-lg font-bold text-slate-900">
                    How Applicants Are Evaluated
                  </h3>
                  <div className="space-y-3.5 text-xs text-slate-700">
                    <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl space-y-1">
                      <div className="flex items-center justify-between font-bold text-slate-900">
                        <span>1. Moral Conviction & Empathy</span>
                        <span className="font-mono text-emerald-700">35% Weight</span>
                      </div>
                      <p className="text-[11px] text-slate-600 leading-relaxed font-normal">
                        Genuine dedication toward child literacy and animal welfare beyond resume credentialing.
                      </p>
                    </div>

                    <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl space-y-1">
                      <div className="flex items-center justify-between font-bold text-slate-900">
                        <span>2. Attendance Consistency</span>
                        <span className="font-mono text-blue-700">35% Weight</span>
                      </div>
                      <p className="text-[11px] text-slate-600 leading-relaxed font-normal">
                        Demonstrated ability to show up 6 days a week or fulfill assigned shifts without seasonal dropouts.
                      </p>
                    </div>

                    <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl space-y-1">
                      <div className="flex items-center justify-between font-bold text-slate-900">
                        <span>3. Domain Capability & Initiative</span>
                        <span className="font-mono text-purple-700">30% Weight</span>
                      </div>
                      <p className="text-[11px] text-slate-600 leading-relaxed font-normal">
                        Technical skills, creative problem solving, and proactive contribution in team environments.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-slate-900 to-teal-950 text-white rounded-3xl p-6 space-y-4 shadow-lg">
                  <div className="flex items-center gap-2 text-teal-400 font-mono text-xs uppercase font-bold">
                    <ShieldCheck size={16} />
                    <span>Faculty-Guided Integrity</span>
                  </div>
                  <h4 className="font-serif text-base font-bold text-white">
                    Non-Commercial, Merit-Based Intake
                  </h4>
                  <p className="text-xs text-slate-300 leading-relaxed font-normal">
                    There are zero membership fees, application charges, or commercial dues. Every student engineer is selected purely on commitment to the ground cause.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 2: WAITLIST & STATUS CHECK */}
      {/* ========================================================================= */}
      {activeTab === 'status' && (
        <div className="space-y-8 animate-fadeIn max-w-3xl mx-auto">
          <div className="bg-white/95 backdrop-blur-md border border-slate-200 rounded-3xl p-8 space-y-6 shadow-sm">
            <div className="space-y-2">
              <span className="font-mono text-xs uppercase tracking-wider text-teal-800 font-bold block">
                Candidate Portal
              </span>
              <h2 className="font-serif text-2xl font-bold text-slate-900">
                Check Intake Screening Status & Waitlist
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                Enter the Application Reference ID issued upon form submission, or your registered HIT email address to view your committee evaluation status.
              </p>
            </div>

            <form onSubmit={handleStatusSearch} className="flex flex-col sm:flex-row gap-3">
              <div className="relative flex-1">
                <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  required
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="e.g. EKL-INTAKE-2026-8941 or your HIT email"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-4 py-3 text-xs text-slate-900 focus:outline-none focus:border-teal-600 font-mono"
                />
              </div>
              <button
                type="submit"
                className="px-6 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-mono text-xs uppercase tracking-wider font-bold transition-colors cursor-pointer"
              >
                Lookup Status
              </button>
            </form>

            {hasSearched && (
              <div className="pt-4 border-t border-slate-100">
                {searchResult ? (
                  <div className="p-6 rounded-2xl bg-teal-50/60 border border-teal-200 space-y-4">
                    <div className="flex items-center justify-between flex-wrap gap-2">
                      <div>
                        <span className="font-mono text-[10px] uppercase text-teal-800 font-bold block">
                          Application ID: {searchResult.id}
                        </span>
                        <h4 className="font-serif text-lg font-bold text-slate-900">
                          {searchResult.name}
                        </h4>
                      </div>
                      <span className="px-3 py-1 rounded-full text-xs font-bold bg-amber-100 text-amber-800 border border-amber-200 flex items-center gap-1 font-mono">
                        <Clock size={12} />
                        <span>{searchResult.status}</span>
                      </span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-mono text-slate-700 pt-2 border-t border-teal-200/60">
                      <div>
                        <span className="text-slate-500 block">CURRENT STAGE:</span>
                        <span className="font-bold text-teal-950">{searchResult.stage}</span>
                      </div>
                      <div>
                        <span className="text-slate-500 block">LAST UPDATED:</span>
                        <span className="font-bold text-teal-950">{searchResult.updatedAt}</span>
                      </div>
                    </div>

                    <div className="p-3 bg-white rounded-xl border border-teal-200 text-xs text-slate-700">
                      <span className="font-bold text-slate-900 block mb-0.5">Selection Committee Remarks:</span>
                      <p className="font-normal leading-relaxed">{searchResult.notes}</p>
                    </div>
                  </div>
                ) : (
                  <div className="p-6 rounded-2xl bg-slate-50 border border-dashed border-slate-300 text-center space-y-2">
                    <AlertCircle size={24} className="mx-auto text-slate-400" />
                    <p className="text-sm font-bold text-slate-700">No application found matching '{searchQuery}'</p>
                    <p className="text-xs text-slate-500">
                      Please double-check your Application Reference ID (e.g. EKL-INTAKE-2026-XXXX) or submit a new intake form.
                    </p>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 3: INTAKE FAQS & GUIDELINES */}
      {/* ========================================================================= */}
      {activeTab === 'faq' && (
        <div className="space-y-6 animate-fadeIn max-w-4xl mx-auto">
          <div className="text-center space-y-2 pb-4">
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-slate-900">
              Campus Intake & Selection Guidelines
            </h2>
            <p className="text-xs sm:text-sm text-slate-600">
              Frequently asked questions regarding the annual recruitment cycle for HIT undergraduate engineers.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs sm:text-sm">
            <div className="p-5 rounded-2xl bg-white border border-slate-200 space-y-2 shadow-2xs">
              <h4 className="font-serif font-bold text-slate-900 text-sm sm:text-base">
                Why is membership subject to a selection process rather than direct sign-up?
              </h4>
              <p className="text-slate-600 leading-relaxed font-normal text-xs sm:text-[13px]">
                Because Eklavya is directly responsible for vulnerable children and injured animals. A child cannot have a tutor who abandons classes mid-semester, and an injured animal requires dependable emergency responders. The selection process verifies long-term reliability and ethical integrity.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-white border border-slate-200 space-y-2 shadow-2xs">
              <h4 className="font-serif font-bold text-slate-900 text-sm sm:text-base">
                Do I need prior NGO or teaching experience to apply?
              </h4>
              <p className="text-slate-600 leading-relaxed font-normal text-xs sm:text-[13px]">
                No prior experience is necessary. We evaluate genuine empathy, humility, and willingness to learn. All inducted members undergo a structured 30-day orientation guided by senior Domain Leads and alumni mentors.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-white border border-slate-200 space-y-2 shadow-2xs">
              <h4 className="font-serif font-bold text-slate-900 text-sm sm:text-base">
                Which branches and academic years are eligible?
              </h4>
              <p className="text-slate-600 leading-relaxed font-normal text-xs sm:text-[13px]">
                All registered undergraduate and postgraduate students from any department at Haldia Institute of Technology are welcome. Freshers (1st Year) and Sophomores (2nd Year) are particularly encouraged to build multi-year leadership continuity.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-white border border-slate-200 space-y-2 shadow-2xs">
              <h4 className="font-serif font-bold text-slate-900 text-sm sm:text-base">
                What domains can I contribute to besides evening teaching?
              </h4>
              <p className="text-slate-600 leading-relaxed font-normal text-xs sm:text-[13px]">
                We run 8 specialized wings: Teaching & Pedagogy, Animal Rescue & Medical Welfare, Web & Technical Systems, Graphics Design, Video Production, Editorial Content, Public Relations, and Ground Logistics.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
