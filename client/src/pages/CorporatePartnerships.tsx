import React, { useState } from 'react';
import {
  Briefcase,
  CheckCircle2,
  FileText,
  Heart,
  BookOpen,
  ArrowRight,
  Send,
  Users,
  Sparkles
} from 'lucide-react';

export const CorporatePartnerships: React.FC = () => {
  const [companyName, setCompanyName] = useState('');
  const [contactPerson, setContactPerson] = useState('');
  const [workEmail, setWorkEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [csrDomain, setCsrDomain] = useState('education');
  const [budgetBracket, setBudgetBracket] = useState('₹1,00,000 – ₹5,00,000');
  const [proposalNotes, setProposalNotes] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
    }, 800);
  };

  return (
    <div className="max-w-[1400px] w-full mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-16 sm:space-y-24">
      {/* 1. Executive CSR Header */}
      <section className="border-b border-slate-200 pb-12 sm:pb-16 space-y-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-end">
          <div className="lg:col-span-8 space-y-4">
            <div className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-blue-700 font-bold bg-blue-50 border border-blue-200 px-3.5 py-1.5 rounded-full shadow-2xs">
              <Briefcase size={14} className="text-blue-600" />
              <span>Corporate Social Responsibility • Schedule VII Alignment</span>
            </div>

            <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight leading-[1.08]">
              High-Impact Corporate Partnerships & <br className="hidden sm:inline" />
              <span className="bg-gradient-to-r from-blue-700 via-teal-700 to-emerald-700 bg-clip-text text-transparent">
                Grassroots CSR Deployment.
              </span>
            </h1>

            <p className="text-slate-700 text-sm sm:text-base max-w-2xl font-normal leading-relaxed">
              Collaborate with Haldia Institute of Technology's premier socio-animal welfare student society. We channel corporate CSR capital directly into audited rural classrooms and emergency veterinary rescue with verifiable zero-overhead execution.
            </p>
          </div>

          <div className="lg:col-span-4 flex flex-col gap-3">
            <div className="bg-white/95 backdrop-blur-md border border-slate-200 rounded-2xl p-5 space-y-2.5 shadow-sm text-xs font-mono">
              <div className="flex items-center justify-between text-slate-500 border-b border-slate-100 pb-2">
                <span>STATUTORY COMPLIANCE</span>
                <span className="font-bold text-slate-900">SCHEDULE VII (Item ii & iv)</span>
              </div>
              <div className="flex items-center justify-between text-slate-500 border-b border-slate-100 pb-2">
                <span>AUDIT STANDARDS</span>
                <span className="font-bold text-emerald-700">100% DIRECT FIELD AID</span>
              </div>
              <div className="flex items-center justify-between text-slate-500">
                <span>PARTNER ALLIANCE</span>
                <span className="font-bold text-blue-700">HIT WELFARE BOARD</span>
              </div>
            </div>

            <a
              href="#proposal-form"
              className="w-full py-3.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-mono text-xs uppercase tracking-wider font-bold transition-colors shadow-sm flex items-center justify-center gap-2"
            >
              <span>Submit Partnership Inquiry</span>
              <ArrowRight size={14} />
            </a>
          </div>
        </div>

        {/* CSR Quick Credential Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 pt-4">
          <div className="bg-white/90 backdrop-blur-md border border-slate-200 rounded-2xl p-5 shadow-xs">
            <span className="text-xs font-mono uppercase tracking-wider text-blue-700 font-bold">Target Children</span>
            <div className="my-1.5">
              <span className="font-serif text-3xl font-extrabold text-slate-900">150+</span>
              <span className="text-blue-600 font-bold ml-1 text-sm">Students</span>
            </div>
            <p className="text-[11px] text-slate-600 font-medium">Daily evening primary & STEM school beneficiaries.</p>
          </div>

          <div className="bg-white/90 backdrop-blur-md border border-slate-200 rounded-2xl p-5 shadow-xs">
            <span className="text-xs font-mono uppercase tracking-wider text-emerald-700 font-bold">Animal Welfare</span>
            <div className="my-1.5">
              <span className="font-serif text-3xl font-extrabold text-slate-900">120+</span>
              <span className="text-emerald-600 font-bold ml-1 text-sm">Annual Cases</span>
            </div>
            <p className="text-[11px] text-slate-600 font-medium">Emergency surgeries, vaccination & sterilizations.</p>
          </div>

          <div className="bg-white/90 backdrop-blur-md border border-slate-200 rounded-2xl p-5 shadow-xs">
            <span className="text-xs font-mono uppercase tracking-wider text-teal-700 font-bold">Audit Reliability</span>
            <div className="my-1.5">
              <span className="font-serif text-3xl font-extrabold text-slate-900">100%</span>
              <span className="text-teal-600 font-bold ml-1 text-sm">Tracked</span>
            </div>
            <p className="text-[11px] text-slate-600 font-medium">Formal Utilization Certificates signed by Faculty Advisor.</p>
          </div>

          <div className="bg-white/90 backdrop-blur-md border border-slate-200 rounded-2xl p-5 shadow-xs">
            <span className="text-xs font-mono uppercase tracking-wider text-purple-700 font-bold">Employee VTO</span>
            <div className="my-1.5">
              <span className="font-serif text-3xl font-extrabold text-slate-900">Hybrid</span>
              <span className="text-purple-600 font-bold ml-1 text-sm">Mentorship</span>
            </div>
            <p className="text-[11px] text-slate-600 font-medium">Weekend corporate volunteering & virtual STEM sessions.</p>
          </div>
        </div>
      </section>

      {/* 2. Three Strategic CSR Investment Tracks */}
      <section className="space-y-8">
        <div className="space-y-2">
          <span className="font-mono text-xs uppercase tracking-wider text-emerald-700 font-bold block">
            Customizable CSR Portfolios
          </span>
          <h2 className="font-serif text-2xl sm:text-4xl font-extrabold text-slate-900">
            Three Core CSR Grant Tracks
          </h2>
          <p className="text-slate-600 text-sm sm:text-base max-w-2xl font-normal">
            Aligned with Schedule VII of the Indian Companies Act, 2013 (Items ii & iv: Promoting education and animal welfare).
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {/* Track 1 */}
          <div className="bg-white/95 backdrop-blur-md border border-slate-200 rounded-3xl p-8 space-y-6 shadow-sm hover:shadow-md transition-all flex flex-col justify-between">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-blue-50 border border-blue-200 flex items-center justify-center text-blue-600">
                <BookOpen size={24} />
              </div>
              <div className="space-y-2">
                <span className="font-mono text-[10px] uppercase tracking-wider text-blue-700 font-bold block">
                  Track 01 • Schedule VII (Item ii)
                </span>
                <h3 className="font-serif text-xl font-bold text-slate-900">
                  Community Digital Labs & Primary Education Kits
                </h3>
                <p className="text-slate-600 text-xs sm:text-sm leading-relaxed font-normal">
                  Sponsor 15 computer workstations, interactive smart screens, and annual textbook & stationery kits for 150+ village children attending our daily evening school.
                </p>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-100 text-xs text-slate-700 font-mono space-y-1.5">
              <div className="flex items-center justify-between">
                <span>ESTIMATED GRANT:</span>
                <span className="font-bold text-blue-900">₹2.5L – ₹5.0L / Year</span>
              </div>
              <div className="flex items-center justify-between text-slate-500">
                <span>BENEFICIARIES:</span>
                <span>150+ Rural Kids</span>
              </div>
            </div>
          </div>

          {/* Track 2 */}
          <div className="bg-white/95 backdrop-blur-md border border-slate-200 rounded-3xl p-8 space-y-6 shadow-sm hover:shadow-md transition-all flex flex-col justify-between">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-600">
                <Heart size={24} />
              </div>
              <div className="space-y-2">
                <span className="font-mono text-[10px] uppercase tracking-wider text-emerald-700 font-bold block">
                  Track 02 • Schedule VII (Item iv)
                </span>
                <h3 className="font-serif text-xl font-bold text-slate-900">
                  Mobile Veterinary First-Aid & Sterilization Drives
                </h3>
                <p className="text-slate-600 text-xs sm:text-sm leading-relaxed font-normal">
                  Finance trauma surgery consumables, anti-rabies vaccination drives, winter reflective collars, and rescue medicines across Haldia municipality.
                </p>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-100 text-xs text-slate-700 font-mono space-y-1.5">
              <div className="flex items-center justify-between">
                <span>ESTIMATED GRANT:</span>
                <span className="font-bold text-emerald-900">₹1.5L – ₹3.5L / Year</span>
              </div>
              <div className="flex items-center justify-between text-slate-500">
                <span>IMPACT SCOPE:</span>
                <span>120+ Injured Animals</span>
              </div>
            </div>
          </div>

          {/* Track 3 */}
          <div className="bg-white/95 backdrop-blur-md border border-slate-200 rounded-3xl p-8 space-y-6 shadow-sm hover:shadow-md transition-all flex flex-col justify-between">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-purple-50 border border-purple-200 flex items-center justify-center text-purple-600">
                <Sparkles size={24} />
              </div>
              <div className="space-y-2">
                <span className="font-mono text-[10px] uppercase tracking-wider text-purple-700 font-bold block">
                  Track 03 • Youth Social Innovation
                </span>
                <h3 className="font-serif text-xl font-bold text-slate-900">
                  Engineering Student Social Innovation Grants
                </h3>
                <p className="text-slate-600 text-xs sm:text-sm leading-relaxed font-normal">
                  Co-sponsor technological innovations built by HIT undergraduates: low-cost water filtration kits, solar community lighting, and literacy mobile apps.
                </p>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-100 text-xs text-slate-700 font-mono space-y-1.5">
              <div className="flex items-center justify-between">
                <span>ESTIMATED GRANT:</span>
                <span className="font-bold text-purple-900">₹1.0L – ₹3.0L / Project</span>
              </div>
              <div className="flex items-center justify-between text-slate-500">
                <span>ENGINEERS:</span>
                <span>Student R&D Cohorts</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. The Eklavya Fiduciary & Reporting Advantage */}
      <section className="bg-slate-900 text-white rounded-3xl p-8 sm:p-12 space-y-8 shadow-xl">
        <div className="max-w-3xl space-y-2">
          <span className="font-mono text-xs uppercase tracking-wider text-emerald-400 font-bold block">
            Institutional Governance & Compliance
          </span>
          <h2 className="font-serif text-2xl sm:text-4xl font-extrabold text-white">
            Why Corporate Foundations Partner With Eklavya
          </h2>
          <p className="text-slate-300 text-xs sm:text-sm leading-relaxed font-normal">
            We deliver the operational agility of passionate undergraduate engineers backed by the institutional credibility and fiduciary rigor of Haldia Institute of Technology.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4 border-t border-slate-800">
          <div className="space-y-2">
            <CheckCircle2 size={20} className="text-emerald-400" />
            <h4 className="font-serif text-base font-bold text-white">Zero Overhead Leakage</h4>
            <p className="text-xs text-slate-400 leading-relaxed font-normal">
              100% of corporate partnership funds are deployed directly into physical study materials, veterinary medicines, or computer hardware.
            </p>
          </div>

          <div className="space-y-2">
            <FileText size={20} className="text-blue-400" />
            <h4 className="font-serif text-base font-bold text-white">Audited Utilization Certificates</h4>
            <p className="text-xs text-slate-400 leading-relaxed font-normal">
              Formal financial statements and photographic milestone reports certified by our HIT Faculty Advisory Board for your annual CSR disclosure.
            </p>
          </div>

          <div className="space-y-2">
            <Users size={20} className="text-teal-400" />
            <h4 className="font-serif text-base font-bold text-white">Employee Engagement (VTO)</h4>
            <p className="text-xs text-slate-400 leading-relaxed font-normal">
              Invite your corporate workforce to conduct weekend virtual STEM webinars, code camps, or visit our Haldia campus for on-site volunteering.
            </p>
          </div>
        </div>
      </section>

      {/* 4. CSR Proposal & Inquiry Form */}
      <section id="proposal-form" className="scroll-mt-24 space-y-8">
        <div className="max-w-2xl mx-auto text-center space-y-2">
          <span className="font-mono text-xs uppercase tracking-wider text-blue-700 font-bold block">
            Direct Corporate Liaison
          </span>
          <h2 className="font-serif text-2xl sm:text-4xl font-extrabold text-slate-900">
            Submit a Partnership or CSR Proposal
          </h2>
          <p className="text-slate-600 text-xs sm:text-sm">
            Our Faculty Advisor and Corporate Relations team will respond with a tailored proposal and formal MoU framework within 48 hours.
          </p>
        </div>

        <div className="max-w-2xl mx-auto bg-white/95 backdrop-blur-md border border-slate-200 rounded-3xl p-6 sm:p-10 shadow-sm">
          {submitted ? (
            <div className="text-center py-8 space-y-4">
              <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto">
                <CheckCircle2 size={28} />
              </div>
              <h3 className="font-serif text-xl font-bold text-slate-900">
                Inquiry Received
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 max-w-md mx-auto leading-relaxed">
                Thank you for your interest in partnering with Eklavya. Our institutional CSR coordinator has been notified and will reach out to <strong>{workEmail}</strong> shortly.
              </p>
              <button
                onClick={() => setSubmitted(false)}
                className="mt-4 px-6 py-2.5 rounded-xl bg-slate-900 text-white font-mono text-xs uppercase tracking-wider font-bold"
              >
                Send Another Note
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-900 mb-1">Company / Organization *</label>
                  <input
                    type="text"
                    required
                    value={companyName}
                    onChange={(e) => setCompanyName(e.target.value)}
                    placeholder="e.g. Tata Consultancy Services"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-900 focus:outline-none focus:border-blue-600 font-medium"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-900 mb-1">Contact Person Name *</label>
                  <input
                    type="text"
                    required
                    value={contactPerson}
                    onChange={(e) => setContactPerson(e.target.value)}
                    placeholder="e.g. Rajat Mukherjee (CSR Lead)"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-900 focus:outline-none focus:border-blue-600 font-medium"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-900 mb-1">Corporate Email Address *</label>
                  <input
                    type="email"
                    required
                    value={workEmail}
                    onChange={(e) => setWorkEmail(e.target.value)}
                    placeholder="rajat@company.com"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-900 focus:outline-none focus:border-blue-600 font-medium"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-900 mb-1">Contact Phone / Mobile *</label>
                  <input
                    type="tel"
                    required
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    placeholder="+91 98300 12345"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-900 focus:outline-none focus:border-blue-600 font-medium font-mono"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-900 mb-1">Target CSR Track *</label>
                  <select
                    value={csrDomain}
                    onChange={(e) => setCsrDomain(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-xs text-slate-900 focus:outline-none focus:border-blue-600 font-medium cursor-pointer"
                  >
                    <option value="education">Track 1: Digital Learning Labs & Schools</option>
                    <option value="animal_welfare">Track 2: Mobile Vet Unit & Animal Aid</option>
                    <option value="social_innovation">Track 3: Student Tech Innovation</option>
                    <option value="custom">Custom Co-Branded Initiative</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-900 mb-1">Estimated Grant Scope *</label>
                  <select
                    value={budgetBracket}
                    onChange={(e) => setBudgetBracket(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-xs text-slate-900 focus:outline-none focus:border-blue-600 font-medium cursor-pointer"
                  >
                    <option value="₹50,000 – ₹1,00,000">₹50,000 – ₹1,00,000</option>
                    <option value="₹1,00,000 – ₹5,00,000">₹1,00,000 – ₹5,00,000</option>
                    <option value="₹5,00,000 – ₹15,00,000">₹5,00,000 – ₹15,00,000</option>
                    <option value="₹15,00,000+">₹15,00,000+ (Multi-Year Endowment)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-900 mb-1">
                  Partnership Scope or Specific Objectives (Optional)
                </label>
                <textarea
                  rows={4}
                  value={proposalNotes}
                  onChange={(e) => setProposalNotes(e.target.value)}
                  placeholder="Outline any specific geographic focus, CSR guidelines, timeline, or employee engagement preferences..."
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs text-slate-900 focus:outline-none focus:border-blue-600 leading-relaxed font-normal"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3.5 rounded-xl bg-gradient-to-r from-blue-700 via-teal-700 to-emerald-700 hover:from-blue-800 hover:to-emerald-800 text-white font-mono text-xs uppercase tracking-wider font-bold transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
              >
                {isSubmitting ? (
                  <span>Transmitting Proposal...</span>
                ) : (
                  <>
                    <Send size={14} />
                    <span>Submit Official CSR Inquiry</span>
                  </>
                )}
              </button>
            </form>
          )}
        </div>
      </section>
    </div>
  );
};
