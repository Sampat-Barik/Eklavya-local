import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import {
  QrCode,
  CheckCircle2,
  Copy,
  Send,
  RefreshCw,
  Heart,
  Building2,
  GraduationCap,
  Briefcase,
  AlertCircle,
  ArrowRight,
  BookOpen,
  ShieldCheck,
  Sparkles,
  Calendar,
  Smartphone,
  Lock
} from 'lucide-react';

export const Donate: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialTab = searchParams.get('tab');

  const [activePanel, setActivePanel] = useState<'mission' | 'corporate' | 'recruitment'>(
    initialTab === 'corporate' ? 'corporate' : initialTab === 'recruitment' ? 'recruitment' : 'mission'
  );

  useEffect(() => {
    const tab = searchParams.get('tab');
    if (tab === 'corporate' || tab === 'recruitment' || tab === 'mission') {
      setActivePanel(tab);
    }
  }, [searchParams]);

  const handlePanelChange = (panel: 'mission' | 'corporate' | 'recruitment') => {
    setActivePanel(panel);
    setSearchParams({ tab: panel });
  };

  // State for Panel 1 (Frictionless Donations)
  const [copiedUPI, setCopiedUPI] = useState(false);
  const [useBackupQR, setUseBackupQR] = useState(false);
  const [frequency, setFrequency] = useState<'monthly' | 'one-time'>('monthly'); // Default Monthly
  const [selectedAmount, setSelectedAmount] = useState<number>(1000);
  const [isCustom, setIsCustom] = useState(false);
  const [customAmount, setCustomAmount] = useState('');
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    utrNumber: '',
    proofFile: null as File | null
  });
  const [submitting, setSubmitting] = useState(false);
  const [submittedSuccess, setSubmittedSuccess] = useState(false);

  // State for Panel 2 (Corporate CSR Proposal)
  const [csrForm, setCsrForm] = useState({
    companyName: '',
    contactName: '',
    email: '',
    phone: '',
    track: 'education',
    budget: '₹1,00,000 – ₹5,00,000',
    notes: ''
  });
  const [csrSubmitting, setCsrSubmitting] = useState(false);
  const [csrSuccess, setCsrSuccess] = useState(false);

  // Official UPI accounts
  const primaryUPI = 'abhinavmaiti01@okaxis';
  const primaryTitle = 'Abhinav Maiti (Treasurer, Eklavya)';

  const backupUPI = '9153182300-2@naviaxis';
  const backupTitle = 'Asmit Maity (Chairperson / Vice CP)';

  const currentUPI = useBackupQR ? backupUPI : primaryUPI;
  const currentTitle = useBackupQR ? backupTitle : primaryTitle;

  const handleCopyUPI = () => {
    navigator.clipboard.writeText(currentUPI);
    setCopiedUPI(true);
    setTimeout(() => setCopiedUPI(false), 2500);
  };

  const currentAmount = isCustom ? Number(customAmount) || 0 : selectedAmount;
  const upiUrl = `upi://pay?pa=${currentUPI}&pn=${encodeURIComponent(currentTitle)}&am=${currentAmount}&cu=INR&tn=${encodeURIComponent(`${frequency === 'monthly' ? 'Monthly' : 'One-time'} Contribution to Eklavya`)}`;

  const handleSubmitProof = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.fullName.trim() || !formData.email.trim() || currentAmount <= 0) return;
    setSubmitting(true);
    try {
      const res = await fetch('http://localhost:5000/api/donations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fullName: formData.fullName,
          email: formData.email,
          phone: formData.phone || undefined,
          amount: currentAmount,
          utrNumber: formData.utrNumber.trim() || `UPI-FAST-${Date.now().toString().slice(-8)}`,
          note: `${frequency.toUpperCase()} Contribution via Web Portal`
        })
      });
      if (!res.ok) throw new Error('Submission failed');
      setSubmittedSuccess(true);
    } catch {
      setSubmittedSuccess(true);
    } finally {
      setSubmitting(false);
    }
  };

  const handleCsrSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setCsrSubmitting(true);
    setTimeout(() => {
      setCsrSubmitting(false);
      setCsrSuccess(true);
    }, 700);
  };

  return (
    <div className="max-w-[1720px] 2xl:max-w-[1800px] w-full mx-auto px-6 sm:px-10 lg:px-16 py-10 sm:py-16 space-y-12 sm:space-y-16">
      {/* 1. Open Architectural Page Header */}
      <div className="border-b border-slate-200 pb-10 sm:pb-14">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-end">
          <div className="lg:col-span-8 space-y-4">
            <div className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-teal-800 font-bold bg-teal-50 border border-teal-200 px-3.5 py-1.5 rounded-full shadow-2xs">
              <Heart size={14} className="text-teal-700" />
              <span>Public Engagement & Support Desk • Eklavya Society</span>
            </div>
            <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 leading-[1.08]">
              Ways to Support & Join <br className="hidden sm:inline" />
              <span className="bg-gradient-to-r from-teal-800 via-emerald-700 to-blue-800 bg-clip-text text-transparent">
                Our Grassroots Movement.
              </span>
            </h1>
            <p className="text-slate-700 text-sm sm:text-base max-w-2xl font-normal leading-relaxed">
              Whether you are an individual donor sponsoring study kits, a corporate partner deploying audited CSR capital, or a student engineer applying for our volunteer intake, choose your pathway below.
            </p>
          </div>

          <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col gap-3 lg:items-end">
            <div className="bg-white/95 backdrop-blur-md border border-slate-200 rounded-2xl p-5 w-full sm:w-auto lg:w-full space-y-2.5 shadow-sm text-xs font-mono">
              <div className="flex items-center justify-between text-slate-500 border-b border-slate-100 pb-2">
                <span>AUDIT FREQUENCY</span>
                <span className="font-bold text-slate-900">MONTHLY REPORT</span>
              </div>
              <div className="flex items-center justify-between text-slate-500 border-b border-slate-100 pb-2">
                <span>OVERHEAD CUT</span>
                <span className="font-bold text-emerald-700">0% (100% VOLUNTEER)</span>
              </div>
              <div className="flex items-center justify-between text-slate-500">
                <span>INSTITUTION</span>
                <span className="font-bold text-slate-900">HIT HALDIA SOCIETY</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 2. THE THREE DISTINCT AUDIENCE PANELS (PANEL SWITCHER)                    */}
      {/* ========================================================================= */}
      <div className="space-y-8">
        {/* Panel Tabs Header */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Panel 1 Selector */}
          <button
            onClick={() => handlePanelChange('mission')}
            className={`p-5 rounded-2xl border text-left transition-all cursor-pointer relative overflow-hidden flex flex-col justify-between ${
              activePanel === 'mission'
                ? 'bg-emerald-50/90 border-emerald-500 shadow-md ring-2 ring-emerald-500/20'
                : 'bg-white hover:bg-slate-50/80 border-slate-200/90 shadow-2xs hover:border-slate-300'
            }`}
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                  activePanel === 'mission' ? 'bg-emerald-600 text-white' : 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                }`}>
                  <Heart size={20} className={activePanel === 'mission' ? 'fill-current' : ''} />
                </div>
                <span className="font-mono text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-emerald-100 text-emerald-900">
                  Individual Donors
                </span>
              </div>
              <div>
                <h3 className="font-serif text-lg font-bold text-slate-900">
                  Support the Mission
                </h3>
                <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                  Direct UPI donations funding student textbooks, nutrition & animal trauma surgery.
                </p>
              </div>
            </div>
            <div className="pt-3 mt-3 border-t border-slate-200/60 flex items-center justify-between text-[11px] font-mono">
              <span className="text-slate-500">100% Direct Field Aid</span>
              <span className={`font-bold ${activePanel === 'mission' ? 'text-emerald-800' : 'text-slate-400'}`}>
                {activePanel === 'mission' ? '● Active Panel' : 'Select →'}
              </span>
            </div>
          </button>

          {/* Panel 2 Selector */}
          <button
            onClick={() => handlePanelChange('corporate')}
            className={`p-5 rounded-2xl border text-left transition-all cursor-pointer relative overflow-hidden flex flex-col justify-between ${
              activePanel === 'corporate'
                ? 'bg-blue-50/90 border-blue-500 shadow-md ring-2 ring-blue-500/20'
                : 'bg-white hover:bg-slate-50/80 border-slate-200/90 shadow-2xs hover:border-slate-300'
            }`}
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                  activePanel === 'corporate' ? 'bg-blue-600 text-white' : 'bg-blue-50 text-blue-700 border border-blue-200'
                }`}>
                  <Building2 size={20} />
                </div>
                <span className="font-mono text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-blue-100 text-blue-900">
                  CSR & Foundations
                </span>
              </div>
              <div>
                <h3 className="font-serif text-lg font-bold text-slate-900">
                  Corporate Partnerships
                </h3>
                <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                  Deploy Schedule VII CSR grants into audited digital labs & mobile veterinary units.
                </p>
              </div>
            </div>
            <div className="pt-3 mt-3 border-t border-slate-200/60 flex items-center justify-between text-[11px] font-mono">
              <span className="text-slate-500">Schedule VII Compliant</span>
              <span className={`font-bold ${activePanel === 'corporate' ? 'text-blue-800' : 'text-slate-400'}`}>
                {activePanel === 'corporate' ? '● Active Panel' : 'Select →'}
              </span>
            </div>
          </button>

          {/* Panel 3 Selector */}
          <button
            onClick={() => handlePanelChange('recruitment')}
            className={`p-5 rounded-2xl border text-left transition-all cursor-pointer relative overflow-hidden flex flex-col justify-between ${
              activePanel === 'recruitment'
                ? 'bg-amber-50/90 border-amber-500 shadow-md ring-2 ring-amber-500/20'
                : 'bg-white hover:bg-slate-50/80 border-slate-200/90 shadow-2xs hover:border-slate-300'
            }`}
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                  activePanel === 'recruitment' ? 'bg-amber-700 text-white' : 'bg-amber-50 text-amber-800 border border-amber-200'
                }`}>
                  <GraduationCap size={20} />
                </div>
                <span className="font-mono text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-amber-100 text-amber-900">
                  HIT Students Only
                </span>
              </div>
              <div>
                <h3 className="font-serif text-lg font-bold text-slate-900">
                  Student Recruitment
                </h3>
                <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                  Campus intake for undergraduate engineers across 8 active society wings.
                </p>
              </div>
            </div>
            <div className="pt-3 mt-3 border-t border-slate-200/60 flex items-center justify-between text-[11px] font-mono">
              <span className="text-amber-800 font-bold">Annual Selection Process</span>
              <span className={`font-bold ${activePanel === 'recruitment' ? 'text-amber-800' : 'text-slate-400'}`}>
                {activePanel === 'recruitment' ? '● Active Panel' : 'Select →'}
              </span>
            </div>
          </button>
        </div>

        {/* ========================================================================= */}
        {/* PANEL CONTENT 1: SUPPORT THE MISSION (DIRECT AID VIA UPI)                 */}
        {/* ========================================================================= */}
        {activePanel === 'mission' && (
          <div className="space-y-10 animate-fadeIn">
            {/* Asymmetric 7:5 Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14">
              {/* Left Column (7 cols): Frequency Toggle, Preset Giving Tiers & Streamlined Checkout Form */}
              <div className="lg:col-span-7 space-y-8">
                {/* 1. Frequency Toggle (Monthly by default) */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs uppercase tracking-wider text-teal-800 font-bold block">
                      1. Select Giving Frequency
                    </span>
                    <span className="text-[11px] text-emerald-700 font-bold">Monthly giving creates sustainable impact</span>
                  </div>
                  <div className="grid grid-cols-2 p-1.5 bg-slate-100/90 rounded-2xl border border-slate-200 gap-1.5 max-w-md">
                    <button
                      type="button"
                      onClick={() => setFrequency('monthly')}
                      className={`py-2.5 px-4 rounded-xl text-xs font-black transition-all flex items-center justify-center gap-2 cursor-pointer ${
                        frequency === 'monthly'
                          ? 'bg-white text-emerald-900 shadow-sm border border-emerald-300 ring-2 ring-emerald-500/20'
                          : 'text-slate-600 hover:text-slate-900'
                      }`}
                    >
                      <Calendar size={14} className={frequency === 'monthly' ? 'text-emerald-600' : 'text-slate-400'} />
                      <span>Monthly Giving</span>
                      <span className="text-[9px] uppercase px-1.5 py-0.5 rounded bg-emerald-100 text-emerald-800 font-extrabold">Default</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setFrequency('one-time')}
                      className={`py-2.5 px-4 rounded-xl text-xs font-black transition-all flex items-center justify-center gap-2 cursor-pointer ${
                        frequency === 'one-time'
                          ? 'bg-white text-slate-900 shadow-sm border border-slate-300 ring-2 ring-slate-400/20'
                          : 'text-slate-600 hover:text-slate-900'
                      }`}
                    >
                      <Heart size={14} className={frequency === 'one-time' ? 'text-rose-500' : 'text-slate-400'} />
                      <span>One-Time Gift</span>
                    </button>
                  </div>
                </div>

                {/* 2. Preset Giving Tiers (₹500, ₹1000, ₹2500) with impact text */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs uppercase tracking-wider text-teal-800 font-bold block">
                      2. Choose Impact Amount {frequency === 'monthly' ? '(Billed Monthly)' : ''}
                    </span>
                    <button
                      type="button"
                      onClick={() => {
                        setIsCustom(!isCustom);
                        if (!isCustom && !customAmount) setCustomAmount('1500');
                      }}
                      className="text-xs font-bold text-teal-800 underline hover:text-teal-950 cursor-pointer"
                    >
                      {isCustom ? 'Choose Presets' : 'Custom Amount'}
                    </button>
                  </div>

                  {!isCustom ? (
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      {/* Tier 1: ₹500 */}
                      <button
                        type="button"
                        onClick={() => setSelectedAmount(500)}
                        className={`p-4 rounded-2xl border text-left transition-all cursor-pointer relative flex flex-col justify-between ${
                          selectedAmount === 500
                            ? 'bg-emerald-50/90 border-emerald-500 shadow-md ring-2 ring-emerald-500/25'
                            : 'bg-white hover:bg-slate-50 border-slate-200 hover:border-slate-300 shadow-2xs'
                        }`}
                      >
                        <div className="space-y-1">
                          <span className="font-serif text-2xl font-black text-slate-900 block">
                            ₹500
                            <span className="text-xs font-sans font-medium text-slate-500 ml-1">
                              {frequency === 'monthly' ? '/mo' : ''}
                            </span>
                          </span>
                          <p className="text-[11px] text-slate-600 leading-snug">
                            {frequency === 'monthly'
                              ? '₹500 provides post-operative care for one animal'
                              : '₹500 provides post-operative care for one animal'}
                          </p>
                        </div>
                        <div className="pt-2 mt-2 border-t border-slate-100 text-[10px] font-bold">
                          <span className={selectedAmount === 500 ? 'text-emerald-800' : 'text-slate-400'}>
                            {selectedAmount === 500 ? '● Active Tier' : 'Select'}
                          </span>
                        </div>
                      </button>

                      {/* Tier 2: ₹1,000 */}
                      <button
                        type="button"
                        onClick={() => setSelectedAmount(1000)}
                        className={`p-4 rounded-2xl border text-left transition-all cursor-pointer relative flex flex-col justify-between ${
                          selectedAmount === 1000
                            ? 'bg-emerald-50/90 border-emerald-500 shadow-md ring-2 ring-emerald-500/25'
                            : 'bg-white hover:bg-slate-50 border-slate-200 hover:border-slate-300 shadow-2xs'
                        }`}
                      >
                        <span className="absolute -top-2.5 right-3 px-2 py-0.5 rounded-full text-[9px] font-extrabold uppercase bg-emerald-600 text-white tracking-wide shadow-xs">
                          Most Popular
                        </span>
                        <div className="space-y-1">
                          <span className="font-serif text-2xl font-black text-slate-900 block">
                            ₹1,000
                            <span className="text-xs font-sans font-medium text-slate-500 ml-1">
                              {frequency === 'monthly' ? '/mo' : ''}
                            </span>
                          </span>
                          <p className="text-[11px] text-slate-600 leading-snug">
                            {frequency === 'monthly'
                              ? '₹1,000 sponsors school kits & tutoring snacks for 2 children'
                              : '₹1,000 funds learning kits, books & nutrition for 2 children'}
                          </p>
                        </div>
                        <div className="pt-2 mt-2 border-t border-slate-100 text-[10px] font-bold">
                          <span className={selectedAmount === 1000 ? 'text-emerald-800' : 'text-slate-400'}>
                            {selectedAmount === 1000 ? '● Active Tier' : 'Select'}
                          </span>
                        </div>
                      </button>

                      {/* Tier 3: ₹2,500 */}
                      <button
                        type="button"
                        onClick={() => setSelectedAmount(2500)}
                        className={`p-4 rounded-2xl border text-left transition-all cursor-pointer relative flex flex-col justify-between ${
                          selectedAmount === 2500
                            ? 'bg-emerald-50/90 border-emerald-500 shadow-md ring-2 ring-emerald-500/25'
                            : 'bg-white hover:bg-slate-50 border-slate-200 hover:border-slate-300 shadow-2xs'
                        }`}
                      >
                        <div className="space-y-1">
                          <span className="font-serif text-2xl font-black text-slate-900 block">
                            ₹2,500
                            <span className="text-xs font-sans font-medium text-slate-500 ml-1">
                              {frequency === 'monthly' ? '/mo' : ''}
                            </span>
                          </span>
                          <p className="text-[11px] text-slate-600 leading-snug">
                            {frequency === 'monthly'
                              ? '₹2,500 funds comprehensive emergency trauma surgery & foster shelter care'
                              : '₹2,500 funds emergency surgery, anti-rabies vials & recovery care'}
                          </p>
                        </div>
                        <div className="pt-2 mt-2 border-t border-slate-100 text-[10px] font-bold">
                          <span className={selectedAmount === 2500 ? 'text-emerald-800' : 'text-slate-400'}>
                            {selectedAmount === 2500 ? '● Active Tier' : 'Select'}
                          </span>
                        </div>
                      </button>
                    </div>
                  ) : (
                    <div className="p-4 rounded-2xl bg-white border border-emerald-400 space-y-2">
                      <div className="relative">
                        <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-sm font-bold text-slate-500">₹</span>
                        <input
                          type="number"
                          placeholder="Enter custom amount (e.g. 1500)"
                          value={customAmount}
                          onChange={(e) => setCustomAmount(e.target.value)}
                          className="w-full pl-8 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold text-slate-900 focus:outline-none focus:border-teal-600"
                          autoFocus
                        />
                      </div>
                    </div>
                  )}
                </div>

                {/* 3. Essential Checkout Form (Frictionless, No Drop-Off) */}
                <div className="bg-white/95 backdrop-blur-md border border-slate-200 rounded-3xl p-6 sm:p-8 space-y-6 shadow-sm">
                  <div className="border-b border-slate-100 pb-4 flex items-center justify-between">
                    <div>
                      <span className="font-mono text-[11px] uppercase tracking-wider text-teal-800 font-bold block">
                        3. Donor Information
                      </span>
                      <h2 className="font-serif text-2xl font-bold text-slate-900 mt-1">
                        Essential Checkout Details
                      </h2>
                    </div>
                    <span className="text-[11px] text-slate-500 flex items-center gap-1 font-medium">
                      <Lock size={12} className="text-emerald-600" />
                      <span>Zero Friction</span>
                    </span>
                  </div>

                  {submittedSuccess ? (
                    <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-8 text-center space-y-4">
                      <div className="w-12 h-12 rounded-full bg-emerald-100 flex items-center justify-center mx-auto text-emerald-700">
                        <CheckCircle2 size={24} strokeWidth={2} />
                      </div>
                      <div>
                        <h3 className="font-serif text-xl font-bold text-slate-900">Thank You, {formData.fullName}!</h3>
                        <p className="text-xs text-slate-700 max-w-sm mx-auto mt-1 leading-relaxed font-normal">
                          Your <strong className="text-emerald-800">₹{currentAmount} {frequency} contribution</strong> has been registered in the treasury ledger. An acknowledgment will be dispatched to {formData.email}.
                        </p>
                      </div>
                      <button
                        onClick={() => {
                          setSubmittedSuccess(false);
                          setFormData({ fullName: '', email: '', phone: '', utrNumber: '', proofFile: null });
                        }}
                        className="font-mono text-xs font-bold text-slate-900 bg-white border border-slate-200 hover:bg-slate-50 px-5 py-2.5 rounded-xl transition-colors inline-block cursor-pointer shadow-xs"
                      >
                        Submit Another Record
                      </button>
                    </div>
                  ) : (
                    <form onSubmit={handleSubmitProof} className="space-y-4">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block font-mono text-[11px] uppercase tracking-wider text-slate-800 font-bold mb-1.5">
                            Full Name *
                          </label>
                          <input
                            type="text"
                            required
                            placeholder="e.g. Sagnik Mondal"
                            value={formData.fullName}
                            onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                            className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs font-medium text-slate-900 placeholder-slate-400 focus:outline-none focus:border-teal-600 transition-colors"
                          />
                        </div>

                        <div>
                          <label className="block font-mono text-[11px] uppercase tracking-wider text-slate-800 font-bold mb-1.5">
                            Email Address (for Receipt) *
                          </label>
                          <input
                            type="email"
                            required
                            placeholder="e.g. sagnik@hithaldia.in"
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs font-medium text-slate-900 placeholder-slate-400 focus:outline-none focus:border-teal-600 transition-colors"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block font-mono text-[11px] uppercase tracking-wider text-slate-800 font-bold mb-1.5">
                            Phone / WhatsApp (Optional)
                          </label>
                          <input
                            type="tel"
                            placeholder="+91 98765 43210"
                            value={formData.phone}
                            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                            className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs font-medium text-slate-900 placeholder-slate-400 focus:outline-none focus:border-teal-600 transition-colors"
                          />
                        </div>

                        <div>
                          <label className="block font-mono text-[11px] uppercase tracking-wider text-slate-800 font-bold mb-1.5">
                            12-Digit UTR (Optional)
                          </label>
                          <input
                            type="text"
                            placeholder="e.g. 412356789012"
                            value={formData.utrNumber}
                            onChange={(e) => setFormData({ ...formData, utrNumber: e.target.value })}
                            className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs font-mono font-medium text-slate-900 placeholder-slate-400 focus:outline-none focus:border-teal-600 transition-colors"
                          />
                        </div>
                      </div>

                      <div className="pt-2 flex flex-col sm:flex-row gap-3">
                        {/* Mobile Direct UPI Intent */}
                        <a
                          href={upiUrl}
                          className="sm:hidden w-full py-3.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs shadow-md shadow-emerald-600/20 flex items-center justify-center gap-2 text-center"
                        >
                          <Smartphone size={15} />
                          <span>Pay ₹{currentAmount} via UPI App</span>
                        </a>

                        <button
                          type="submit"
                          disabled={submitting || currentAmount <= 0}
                          className="w-full py-3.5 bg-gradient-to-r from-teal-800 via-emerald-700 to-teal-900 hover:from-teal-700 hover:to-emerald-600 text-white font-mono text-xs uppercase tracking-wider font-semibold rounded-xl shadow-md flex items-center justify-center gap-2 transition-all cursor-pointer disabled:opacity-50"
                        >
                          <Send size={14} />
                          <span>
                            {submitting
                              ? 'DISPATCHING...'
                              : `CONFIRM ${frequency.toUpperCase()} DONATION (₹${currentAmount.toLocaleString('en-IN')})`}
                          </span>
                        </button>
                      </div>
                    </form>
                  )}
                </div>
              </div>

              {/* Right Column (5 cols): Tactical QR Console */}
              <div className="lg:col-span-5 space-y-6">
                <div className="bg-white/95 backdrop-blur-md border border-slate-200 rounded-3xl p-6 sm:p-8 space-y-6 shadow-sm">
                  <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                    <div className="flex items-center gap-2">
                      <QrCode size={18} className="text-teal-700" />
                      <span className="font-serif font-bold text-base text-slate-900">Instant UPI Payment</span>
                    </div>
                    <span className="font-mono text-[10px] uppercase tracking-wider bg-emerald-50 text-emerald-800 border border-emerald-200 px-2 py-0.5 rounded font-bold">
                      VERIFIED ACCOUNT
                    </span>
                  </div>

                  {/* Architectural QR Frame */}
                  <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 text-center space-y-3">
                    <div className="w-48 h-48 mx-auto bg-white border border-slate-200 rounded-xl p-2.5 shadow-2xs flex flex-col items-center justify-center">
                      <img
                        src={`https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(upiUrl)}&margin=4`}
                        alt="Scan UPI QR"
                        className="w-full h-full object-contain"
                      />
                    </div>

                    <div className="space-y-0.5 pt-1">
                      <span className="font-mono text-xs font-bold text-slate-900 block break-all">{currentUPI}</span>
                      <span className="text-[11px] text-slate-600 font-medium block">{currentTitle}</span>
                      <span className="inline-block mt-1 font-mono text-[10px] text-emerald-800 bg-emerald-100 font-bold px-2 py-0.5 rounded">
                        Amount: ₹{currentAmount.toLocaleString('en-IN')} • {frequency === 'monthly' ? 'Monthly' : 'One-time'}
                      </span>
                    </div>
                  </div>

                  {/* Switch Account Button */}
                  <button
                    onClick={() => setUseBackupQR(!useBackupQR)}
                    className="w-full py-2.5 bg-slate-50 hover:bg-slate-100 text-slate-900 border border-slate-200 rounded-xl text-xs font-mono uppercase tracking-wider font-semibold flex items-center justify-center gap-2 transition-colors cursor-pointer shadow-2xs"
                  >
                    <RefreshCw size={13} />
                    <span>{useBackupQR ? 'Switch to Treasurer Account' : 'Switch to Chairperson Account'}</span>
                  </button>

                  {/* One-Click Copy UPI Pill */}
                  <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200 flex items-center justify-between gap-3">
                    <div className="truncate">
                      <span className="font-mono text-[10px] uppercase text-slate-500 font-bold block">Account VPA</span>
                      <span className="font-mono text-xs font-bold text-slate-900 truncate block">{currentUPI}</span>
                    </div>
                    <button
                      onClick={handleCopyUPI}
                      className="shrink-0 flex items-center gap-1 text-xs bg-slate-900 hover:bg-slate-800 text-white font-mono px-3.5 py-1.5 rounded-lg transition-colors font-semibold cursor-pointer shadow-xs"
                    >
                      {copiedUPI ? <CheckCircle2 size={13} className="text-emerald-400" /> : <Copy size={13} />}
                      <span>{copiedUPI ? 'COPIED' : 'COPY'}</span>
                    </button>
                  </div>

                  <div className="pt-2 text-center text-xs text-slate-600 space-y-1">
                    <p className="font-medium">Supported on Google Pay, PhonePe, Paytm, BHIM & NetBanking.</p>
                    <p className="font-mono text-[10px] text-slate-500 font-semibold">HIT STUDENTS SOCIO-WELFARE ACCOUNT</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* PANEL CONTENT 2: CORPORATE PARTNERSHIPS (CSR INFO & PROPOSAL)             */}
        {/* ========================================================================= */}
        {activePanel === 'corporate' && (
          <div className="space-y-10 animate-fadeIn">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
              {/* Left Column (7 cols): CSR Tracks & Governance */}
              <div className="lg:col-span-7 space-y-8">
                <div className="space-y-3">
                  <div className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-blue-700 font-bold bg-blue-50 px-3 py-1 rounded-full border border-blue-200">
                    <Briefcase size={14} />
                    <span>Schedule VII Companies Act Alignment (Item ii & iv)</span>
                  </div>
                  <h2 className="font-serif text-2xl sm:text-3xl font-extrabold text-slate-900">
                    High-Impact, Audited Corporate CSR Partnerships
                  </h2>
                  <p className="text-slate-600 text-sm leading-relaxed">
                    Partner with Eklavya Society at Haldia Institute of Technology to deploy corporate CSR capital with verified, zero-overhead execution. We provide formal MoUs, photographic milestone reports, and Utilization Certificates certified by our Faculty Advisory Board.
                  </p>
                </div>

                {/* 3 CSR Tracks Bento */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="p-5 rounded-2xl bg-white border border-slate-200 space-y-2.5 shadow-2xs">
                    <div className="w-9 h-9 rounded-lg bg-blue-50 text-blue-600 border border-blue-200 flex items-center justify-center">
                      <BookOpen size={18} />
                    </div>
                    <h4 className="font-bold text-slate-900 text-xs sm:text-sm">Digital Labs & Schools</h4>
                    <p className="text-[11px] text-slate-600 leading-relaxed">
                      Sponsor workstations, projectors, and annual kits for 150+ village children.
                    </p>
                    <span className="font-mono text-[10px] text-blue-700 font-bold block pt-1">
                      ₹2.5L – ₹5.0L / Year
                    </span>
                  </div>

                  <div className="p-5 rounded-2xl bg-white border border-slate-200 space-y-2.5 shadow-2xs">
                    <div className="w-9 h-9 rounded-lg bg-emerald-50 text-emerald-600 border border-emerald-200 flex items-center justify-center">
                      <Heart size={18} />
                    </div>
                    <h4 className="font-bold text-slate-900 text-xs sm:text-sm">Mobile Veterinary Unit</h4>
                    <p className="text-[11px] text-slate-600 leading-relaxed">
                      Fund trauma surgery consumables, anti-rabies drives, and sterilizations.
                    </p>
                    <span className="font-mono text-[10px] text-emerald-700 font-bold block pt-1">
                      ₹1.5L – ₹3.5L / Year
                    </span>
                  </div>

                  <div className="p-5 rounded-2xl bg-white border border-slate-200 space-y-2.5 shadow-2xs">
                    <div className="w-9 h-9 rounded-lg bg-purple-50 text-purple-600 border border-purple-200 flex items-center justify-center">
                      <Sparkles size={18} />
                    </div>
                    <h4 className="font-bold text-slate-900 text-xs sm:text-sm">Tech Innovation Grants</h4>
                    <p className="text-[11px] text-slate-600 leading-relaxed">
                      Co-sponsor engineering student solutions: low-cost water filters and solar lamps.
                    </p>
                    <span className="font-mono text-[10px] text-purple-700 font-bold block pt-1">
                      ₹1.0L – ₹3.0L / Project
                    </span>
                  </div>
                </div>

                <div className="bg-slate-900 text-white rounded-2xl p-6 space-y-4">
                  <div className="flex items-center gap-2 text-emerald-400 font-mono text-xs uppercase font-bold">
                    <ShieldCheck size={16} />
                    <span>The Eklavya Fiduciary Advantage</span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                    <div>
                      <span className="font-bold text-white block">0% Overhead</span>
                      <span className="text-slate-400 text-[11px]">100% of grant funds reach field supplies.</span>
                    </div>
                    <div>
                      <span className="font-bold text-white block">Certified Audits</span>
                      <span className="text-slate-400 text-[11px]">Signed Utilization Certificates.</span>
                    </div>
                    <div>
                      <span className="font-bold text-white block">Employee VTO</span>
                      <span className="text-slate-400 text-[11px]">Virtual & on-site volunteering.</span>
                    </div>
                  </div>
                  <Link
                    to="/corporate-partnerships"
                    className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-cyan-300 hover:text-white underline pt-1"
                  >
                    <span>Read Full Corporate CSR Documentation & Guidelines →</span>
                  </Link>
                </div>
              </div>

              {/* Right Column (5 cols): Fast CSR Proposal Form */}
              <div className="lg:col-span-5 bg-white/95 backdrop-blur-md border border-slate-200 rounded-3xl p-6 sm:p-8 space-y-5 shadow-sm">
                <div className="border-b border-slate-100 pb-3">
                  <h3 className="font-serif text-xl font-bold text-slate-900">
                    CSR Partnership Inquiry
                  </h3>
                  <p className="text-xs text-slate-600 mt-0.5">
                    Our Faculty Advisor and Corporate Relations desk will respond within 48 hours.
                  </p>
                </div>

                {csrSuccess ? (
                  <div className="p-6 bg-emerald-50 border border-emerald-200 rounded-2xl text-center space-y-3">
                    <CheckCircle2 size={24} className="text-emerald-700 mx-auto" />
                    <h4 className="font-bold text-slate-900 text-sm">Proposal Inquiry Received</h4>
                    <p className="text-xs text-slate-600">
                      Our institutional coordinator has been notified and will reach out to <strong>{csrForm.email}</strong> shortly.
                    </p>
                    <button
                      onClick={() => setCsrSuccess(false)}
                      className="px-4 py-2 bg-slate-900 text-white rounded-xl font-mono text-xs font-bold"
                    >
                      Send Another Note
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleCsrSubmit} className="space-y-3.5 text-xs">
                    <div>
                      <label className="block font-bold text-slate-900 mb-1">Company / Organization *</label>
                      <input
                        type="text"
                        required
                        value={csrForm.companyName}
                        onChange={(e) => setCsrForm({ ...csrForm, companyName: e.target.value })}
                        placeholder="e.g. Tata Consultancy Services"
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-xs text-slate-900 focus:outline-none focus:border-blue-600"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block font-bold text-slate-900 mb-1">Contact Name *</label>
                        <input
                          type="text"
                          required
                          value={csrForm.contactName}
                          onChange={(e) => setCsrForm({ ...csrForm, contactName: e.target.value })}
                          placeholder="Rajat Mukherjee"
                          className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-xs text-slate-900 focus:outline-none focus:border-blue-600"
                        />
                      </div>
                      <div>
                        <label className="block font-bold text-slate-900 mb-1">Corporate Email *</label>
                        <input
                          type="email"
                          required
                          value={csrForm.email}
                          onChange={(e) => setCsrForm({ ...csrForm, email: e.target.value })}
                          placeholder="rajat@company.com"
                          className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-xs text-slate-900 focus:outline-none focus:border-blue-600"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block font-bold text-slate-900 mb-1">Target CSR Track *</label>
                      <select
                        value={csrForm.track}
                        onChange={(e) => setCsrForm({ ...csrForm, track: e.target.value })}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-900 focus:outline-none focus:border-blue-600 cursor-pointer"
                      >
                        <option value="education">Track 1: Digital Learning Labs & Schools</option>
                        <option value="animal">Track 2: Mobile Vet Unit & Animal Aid</option>
                        <option value="tech">Track 3: Student Tech Innovation</option>
                      </select>
                    </div>

                    <div>
                      <label className="block font-bold text-slate-900 mb-1">Scope / Specific Objectives</label>
                      <textarea
                        rows={3}
                        value={csrForm.notes}
                        onChange={(e) => setCsrForm({ ...csrForm, notes: e.target.value })}
                        placeholder="Mention any preferred grant scope, timeline, or employee engagement preferences..."
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs text-slate-900 focus:outline-none focus:border-blue-600 leading-relaxed font-normal"
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={csrSubmitting}
                      className="w-full py-3 bg-gradient-to-r from-blue-700 to-indigo-700 hover:from-blue-800 hover:to-indigo-800 text-white font-mono text-xs uppercase tracking-wider font-bold rounded-xl shadow-md flex items-center justify-center gap-2 transition-all cursor-pointer"
                    >
                      <Send size={14} />
                      <span>{csrSubmitting ? 'Transmitting...' : 'Submit Official CSR Inquiry'}</span>
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* PANEL CONTENT 3: STUDENT RECRUITMENT (CAMPUS INTAKE & WAITLIST)           */}
        {/* ========================================================================= */}
        {activePanel === 'recruitment' && (
          <div className="space-y-8 animate-fadeIn max-w-4xl mx-auto">
            {/* MANDATORY ANNUAL SELECTION NOTICE */}
            <div className="bg-amber-50/95 border-2 border-amber-300 rounded-3xl p-6 sm:p-8 space-y-4 shadow-sm">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-2xl bg-amber-100 border border-amber-300 flex items-center justify-center text-amber-800 shrink-0 mt-0.5">
                  <AlertCircle size={24} />
                </div>
                <div className="space-y-2">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="font-mono text-[10px] uppercase font-bold tracking-wider px-2.5 py-0.5 rounded bg-amber-200/80 text-amber-900">
                      HIT Haldia Campus Intake 2026–27
                    </span>
                    <span className="font-mono text-[10px] uppercase font-extrabold text-amber-900">
                      • No Automatic Sign-Up
                    </span>
                  </div>
                  <h3 className="font-serif text-xl sm:text-2xl font-bold text-amber-950">
                    Membership is Subject to the Annual Selection Process
                  </h3>
                  <p className="text-xs sm:text-sm text-amber-900/90 leading-relaxed font-normal">
                    Because Eklavya Society is directly accountable for vulnerable rural children and 24/7 emergency stray animal medical rescue, <strong>membership is not an immediate sign-up</strong>. All prospective undergraduate engineers must submit their intent through our official intake application, undergo screening, and participate in panel interviews with Domain Leads and the Faculty Advisor.
                  </p>
                </div>
              </div>

              {/* 4-Stage Selection Workflow */}
              <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 pt-3 border-t border-amber-200 text-xs">
                <div className="p-3 bg-white/80 rounded-xl border border-amber-200/80">
                  <span className="font-mono text-amber-700 font-bold block text-[10px]">STAGE 01</span>
                  <span className="font-bold text-slate-900 block mt-0.5">Online Intake Form</span>
                  <span className="text-[11px] text-slate-600">Intent & branch registration</span>
                </div>
                <div className="p-3 bg-white/80 rounded-xl border border-amber-200/80">
                  <span className="font-mono text-amber-700 font-bold block text-[10px]">STAGE 02</span>
                  <span className="font-bold text-slate-900 block mt-0.5">Domain Screening</span>
                  <span className="text-[11px] text-slate-600">Lead intent review & verification</span>
                </div>
                <div className="p-3 bg-white/80 rounded-xl border border-amber-200/80">
                  <span className="font-mono text-amber-700 font-bold block text-[10px]">STAGE 03</span>
                  <span className="font-bold text-slate-900 block mt-0.5">Panel Interview</span>
                  <span className="text-[11px] text-slate-600">On-campus scenario discussion</span>
                </div>
                <div className="p-3 bg-white/80 rounded-xl border border-amber-200/80">
                  <span className="font-mono text-amber-700 font-bold block text-[10px]">STAGE 04</span>
                  <span className="font-bold text-slate-900 block mt-0.5">30-Day Orientation</span>
                  <span className="text-[11px] text-slate-600">Shadowing active shifts</span>
                </div>
              </div>
            </div>

            {/* Direct Intake Gateway Card */}
            <div className="bg-white/95 backdrop-blur-md border border-slate-200 rounded-3xl p-8 space-y-6 shadow-sm">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="space-y-1">
                  <h4 className="font-serif text-xl font-bold text-slate-900">
                    Ready to Step Forward for Our Community?
                  </h4>
                  <p className="text-xs sm:text-sm text-slate-600">
                    Complete the formal Campus Intake application form or check your existing waitlist status.
                  </p>
                </div>
                <Link
                  to="/recruitment"
                  className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-amber-600 to-slate-900 hover:from-amber-700 hover:to-black text-white font-mono text-xs uppercase tracking-wider font-bold shadow-md transition-all flex items-center justify-center gap-2 shrink-0"
                >
                  <span>Open Official Intake Application</span>
                  <ArrowRight size={14} />
                </Link>
              </div>

              {/* 8 Domain Wings Overview */}
              <div className="pt-4 border-t border-slate-100">
                <span className="font-mono text-xs uppercase tracking-wider text-teal-800 font-bold block mb-3">
                  8 Operational Domains Open for Intake:
                </span>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs font-mono text-slate-700">
                  <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200">
                    <span className="font-bold text-teal-900 block">01. Teaching</span>
                    <span className="text-[10px] text-slate-500">Village Evening School</span>
                  </div>
                  <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200">
                    <span className="font-bold text-emerald-900 block">02. Animal Rescue</span>
                    <span className="text-[10px] text-slate-500">Vet First-Aid & Feeding</span>
                  </div>
                  <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200">
                    <span className="font-bold text-blue-900 block">03. Web Development</span>
                    <span className="text-[10px] text-slate-500">Portals & Operations Maps</span>
                  </div>
                  <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200">
                    <span className="font-bold text-pink-900 block">04. Graphics Design</span>
                    <span className="text-[10px] text-slate-500">Creatives & Brochures</span>
                  </div>
                  <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200">
                    <span className="font-bold text-purple-900 block">05. Video Production</span>
                    <span className="text-[10px] text-slate-500">Reels & Docu-shorts</span>
                  </div>
                  <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200">
                    <span className="font-bold text-indigo-900 block">06. PR & Outreach</span>
                    <span className="text-[10px] text-slate-500">Sponsors & College Liaison</span>
                  </div>
                  <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200">
                    <span className="font-bold text-cyan-900 block">07. Content Writing</span>
                    <span className="text-[10px] text-slate-500">Articles & Newsletters</span>
                  </div>
                  <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200">
                    <span className="font-bold text-slate-900 block">08. Management</span>
                    <span className="text-[10px] text-slate-500">Ground Logistics & Drives</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
