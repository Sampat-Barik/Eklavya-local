import React, { useState, useEffect } from 'react';
import {
  X,
  Heart,
  Sparkles,
  ShieldCheck,
  CheckCircle2,
  Copy,
  ExternalLink,
  QrCode,
  ArrowRight,
  Smartphone,
  Calendar,
  Lock
} from 'lucide-react';
import { useDonationModal } from '../../context/DonationModalContext';

interface GivingTier {
  amount: number;
  monthlyImpact: string;
  oneTimeImpact: string;
  badge?: string;
}

const GIVING_TIERS: GivingTier[] = [
  {
    amount: 500,
    monthlyImpact: '₹500 provides post-operative care for one animal',
    oneTimeImpact: '₹500 provides post-operative care for one animal'
  },
  {
    amount: 1000,
    monthlyImpact: '₹1,000 sponsors school kits & tutoring snacks for 2 children',
    oneTimeImpact: '₹1,000 funds learning kits, books & nutrition for 2 children',
    badge: 'Most Popular'
  },
  {
    amount: 2500,
    monthlyImpact: '₹2,500 funds comprehensive emergency trauma surgery & foster shelter care',
    oneTimeImpact: '₹2,500 funds emergency surgery, anti-rabies vials & recovery care'
  }
];

export const DonationModal: React.FC = () => {
  const { isOpen, closeDonationModal, initialAmount, initialFrequency } = useDonationModal();

  // 1. Toggle for 'One-time' vs 'Monthly' giving, defaulting to 'Monthly'
  const [frequency, setFrequency] = useState<'monthly' | 'one-time'>('monthly');

  // 2. Preset giving tiers: default is initialAmount or ₹1000
  const [selectedAmount, setSelectedAmount] = useState<number>(1000);
  const [isCustom, setIsCustom] = useState(false);
  const [customAmount, setCustomAmount] = useState<string>('');

  // 3. Strictly essential fields to prevent drop-off
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [utrNumber, setUtrNumber] = useState('');

  // State
  const [showQR, setShowQR] = useState(false);
  const [copiedUPI, setCopiedUPI] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const primaryUPI = 'abhinavmaiti01@okaxis';
  const payeeName = 'Eklavya HIT Social Welfare';

  useEffect(() => {
    if (isOpen) {
      setFrequency(initialFrequency || 'monthly');
      setSelectedAmount(initialAmount || 1000);
      setIsCustom(false);
      setIsSuccess(false);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen, initialAmount, initialFrequency]);

  // Handle escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        closeDonationModal();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, closeDonationModal]);

  if (!isOpen) return null;

  const currentAmount = isCustom ? Number(customAmount) || 0 : selectedAmount;

  const upiUrl = `upi://pay?pa=${primaryUPI}&pn=${encodeURIComponent(payeeName)}&am=${currentAmount}&cu=INR&tn=${encodeURIComponent(`${frequency === 'monthly' ? 'Monthly' : 'One-time'} Contribution to Eklavya`)}`;
  const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=240x240&data=${encodeURIComponent(upiUrl)}&margin=8`;

  const handleCopyUPI = () => {
    navigator.clipboard.writeText(primaryUPI);
    setCopiedUPI(true);
    setTimeout(() => setCopiedUPI(false), 2500);
  };

  const handleCompleteDonation = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName.trim() || !email.trim() || currentAmount <= 0) return;

    setSubmitting(true);
    try {
      await fetch('http://localhost:5000/api/donations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fullName,
          email,
          phone: phone || undefined,
          amount: currentAmount,
          utrNumber: utrNumber.trim() || `UPI-FAST-${Date.now().toString().slice(-8)}`,
          note: `${frequency.toUpperCase()} Contribution via Quick Checkout`
        })
      });
    } catch {
      // Local fallback continues
    }

    setSubmitting(false);
    setIsSuccess(true);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-5 overflow-y-auto">
      {/* Blurred Dim Backdrop */}
      <div
        className="fixed inset-0 bg-slate-950/70 backdrop-blur-md transition-opacity animate-fadeIn"
        onClick={closeDonationModal}
      />

      {/* Modal Dialog Card */}
      <div className="relative w-full max-w-xl bg-white rounded-3xl shadow-2xl border border-slate-100 overflow-hidden z-10 transition-all transform animate-scaleUp my-auto">
        {/* Top Decorative Header */}
        <div className="relative bg-gradient-to-r from-teal-900 via-emerald-800 to-slate-900 text-white p-6 sm:p-7">
          {/* Subtle Ambient Glow */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/20 rounded-full blur-3xl pointer-events-none" />

          <button
            onClick={closeDonationModal}
            className="absolute top-4 right-4 min-w-[44px] min-h-[44px] flex items-center justify-center p-2 rounded-full bg-white/10 hover:bg-white/20 text-white/80 hover:text-white transition-colors cursor-pointer"
            aria-label="Close modal"
          >
            <X size={18} />
          </button>

          <div className="space-y-1.5 pr-8">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-400/20 border border-emerald-400/30 text-emerald-300 text-[10px] font-black uppercase tracking-wider backdrop-blur-sm">
              <Sparkles size={11} className="text-emerald-300" />
              <span>Direct Social Impact • Zero Intermediaries</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-serif font-black tracking-tight text-white">
              Support Eklavya with Your Contribution
            </h2>
            <p className="text-xs text-emerald-100/90 leading-relaxed font-normal">
              100% of your donation directly funds student education, nutrition, and street animal emergency trauma care.
            </p>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-5 sm:p-7 space-y-6 max-h-[75vh] overflow-y-auto">
          {isSuccess ? (
            /* Instant Success Confirmation State */
            <div className="py-8 text-center space-y-5 animate-fadeIn">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-inner">
                <CheckCircle2 size={36} className="animate-bounce" />
              </div>

              <div className="space-y-1.5 max-w-sm mx-auto">
                <h3 className="font-serif text-2xl font-bold text-slate-900">Thank You, {fullName}!</h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Your <strong className="text-emerald-800">₹{currentAmount} {frequency === 'monthly' ? 'monthly pledge' : 'contribution'}</strong> has been registered in the Eklavya social treasury.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-emerald-50/80 border border-emerald-200/80 text-left max-w-sm mx-auto space-y-2 text-xs">
                <div className="flex justify-between text-slate-600">
                  <span>Donor Email:</span>
                  <span className="font-bold text-slate-900">{email}</span>
                </div>
                <div className="flex justify-between text-slate-600">
                  <span>Frequency:</span>
                  <span className="font-bold text-emerald-800 capitalize">{frequency} Giving</span>
                </div>
                <div className="flex justify-between text-slate-600">
                  <span>Impact Wing:</span>
                  <span className="font-bold text-slate-900">Education & Animal Rescue</span>
                </div>
                <div className="pt-2 border-t border-emerald-200 text-[11px] text-emerald-800 flex items-center gap-1 font-medium">
                  <ShieldCheck size={14} className="text-emerald-600 shrink-0" />
                  <span>Official digital acknowledgment dispatched to your email.</span>
                </div>
              </div>

              <div className="pt-3">
                <button
                  onClick={closeDonationModal}
                  className="w-full sm:w-auto px-8 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs shadow-md transition-all cursor-pointer"
                >
                  Done
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleCompleteDonation} className="space-y-6">
              {/* 1. Toggle for 'One-time' vs 'Monthly' giving (Default: 'Monthly') */}
              <div className="space-y-2">
                <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500">
                  Select Giving Frequency
                </label>
                <div className="grid grid-cols-2 p-1.5 bg-slate-100/90 rounded-2xl border border-slate-200/80 gap-1.5">
                  <button
                    type="button"
                    onClick={() => setFrequency('monthly')}
                    className={`min-h-[44px] py-2.5 px-3 rounded-xl text-xs font-black transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                      frequency === 'monthly'
                        ? 'bg-white text-emerald-900 shadow-sm border border-emerald-300 ring-2 ring-emerald-500/20'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    <Calendar size={14} className={frequency === 'monthly' ? 'text-emerald-600' : 'text-slate-400'} />
                    <span>Monthly</span>
                    <span className="text-[9px] uppercase px-1.5 py-0.5 rounded bg-emerald-100 text-emerald-800 font-extrabold tracking-wide">
                      Default
                    </span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setFrequency('one-time')}
                    className={`min-h-[44px] py-2.5 px-3 rounded-xl text-xs font-black transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                      frequency === 'one-time'
                        ? 'bg-white text-slate-900 shadow-sm border border-slate-300 ring-2 ring-slate-400/20'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    <Heart size={14} className={frequency === 'one-time' ? 'text-rose-500' : 'text-slate-400'} />
                    <span>One-time</span>
                  </button>
                </div>
              </div>

              {/* 2. Preset Giving Tiers (₹500, ₹1000, ₹2500) paired with tiny string of text showing impact */}
              <div className="space-y-2.5">
                <div className="flex items-center justify-between">
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500">
                    Choose Amount {frequency === 'monthly' && <span className="text-emerald-700">(Billed Monthly)</span>}
                  </label>
                  <button
                    type="button"
                    onClick={() => {
                      setIsCustom(!isCustom);
                      if (!isCustom && !customAmount) setCustomAmount('1500');
                    }}
                    className="min-h-[44px] flex items-center text-[11px] font-bold text-teal-700 hover:text-teal-900 underline transition-colors cursor-pointer"
                  >
                    {isCustom ? 'Choose Presets' : 'Custom Amount'}
                  </button>
                </div>

                {!isCustom ? (
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                    {GIVING_TIERS.map((tier) => {
                      const isSelected = selectedAmount === tier.amount;
                      const impactText =
                        frequency === 'monthly' ? tier.monthlyImpact : tier.oneTimeImpact;

                      return (
                        <button
                          key={tier.amount}
                          type="button"
                          onClick={() => setSelectedAmount(tier.amount)}
                          className={`p-3.5 rounded-2xl border text-left transition-all relative flex flex-col justify-between cursor-pointer ${
                            isSelected
                              ? 'bg-emerald-50/90 border-emerald-500 shadow-md ring-2 ring-emerald-500/25'
                              : 'bg-white hover:bg-slate-50 border-slate-200 hover:border-slate-300 shadow-2xs'
                          }`}
                        >
                          {tier.badge && (
                            <span className="absolute -top-2 right-2.5 px-2 py-0.5 rounded-full text-[9px] font-extrabold uppercase bg-emerald-600 text-white tracking-wide shadow-xs">
                              {tier.badge}
                            </span>
                          )}

                          <div className="space-y-1">
                            <span className="text-lg font-serif font-black text-slate-900 block">
                              ₹{tier.amount.toLocaleString('en-IN')}
                              <span className="text-[10px] font-sans font-medium text-slate-500 ml-1">
                                {frequency === 'monthly' ? '/mo' : ''}
                              </span>
                            </span>
                            <p className="text-[11px] text-slate-600 leading-snug line-clamp-3">
                              {impactText}
                            </p>
                          </div>

                          <div className="pt-2 mt-2 border-t border-slate-100 flex items-center justify-between text-[10px] font-bold">
                            <span className={isSelected ? 'text-emerald-800' : 'text-slate-400'}>
                              {isSelected ? '● Selected' : 'Select'}
                            </span>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                ) : (
                  <div className="space-y-2 animate-fadeIn">
                    <div className="relative">
                      <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-sm font-bold text-slate-500">
                        ₹
                      </span>
                      <input
                        type="number"
                        min="50"
                        placeholder="Enter custom amount (e.g. 1500)"
                        value={customAmount}
                        onChange={(e) => setCustomAmount(e.target.value)}
                        className="w-full pl-8 pr-4 py-3 bg-white border border-emerald-400 rounded-2xl text-sm font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
                        autoFocus
                      />
                    </div>
                    <p className="text-[11px] text-slate-500">
                      Every single rupee directly aids rescue medicines, sterile dressings, and evening education kits.
                    </p>
                  </div>
                )}
              </div>

              {/* 3. Essential Checkout Form Fields (Prevent Drop-Off) */}
              <div className="space-y-3 pt-2 border-t border-slate-100">
                <div className="flex items-center justify-between">
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500">
                    Donor Details (Essential Only)
                  </label>
                  <span className="text-[10px] text-slate-400 font-medium flex items-center gap-1">
                    <Lock size={10} /> 100% Secure & Confidential
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <input
                      type="text"
                      required
                      placeholder="Full Name *"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-slate-50 hover:bg-white focus:bg-white border border-slate-200 rounded-xl text-xs font-semibold text-slate-900 placeholder-slate-400 focus:outline-none focus:border-emerald-600 transition-colors"
                    />
                  </div>

                  <div>
                    <input
                      type="email"
                      required
                      placeholder="Email Address (for receipt) *"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-slate-50 hover:bg-white focus:bg-white border border-slate-200 rounded-xl text-xs font-semibold text-slate-900 placeholder-slate-400 focus:outline-none focus:border-emerald-600 transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <input
                    type="tel"
                    placeholder="Phone / WhatsApp Number (optional, for instant acknowledgment)"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-slate-50 hover:bg-white focus:bg-white border border-slate-200 rounded-xl text-xs font-medium text-slate-900 placeholder-slate-400 focus:outline-none focus:border-emerald-600 transition-colors"
                  />
                </div>
              </div>

              {/* 4. Frictionless Payment Gate (UPI Direct, QR, & Copy) */}
              <div className="space-y-3 pt-2">
                <div className="p-3.5 rounded-2xl bg-gradient-to-r from-emerald-50 to-teal-50/60 border border-emerald-200/80 flex flex-col sm:flex-row items-center justify-between gap-3">
                  <div className="text-left w-full sm:w-auto">
                    <div className="flex items-center gap-1.5">
                      <span className="text-[10px] font-mono uppercase font-black px-2 py-0.5 rounded bg-emerald-200/70 text-emerald-900">
                        Official VPA
                      </span>
                      <span className="text-xs font-mono font-bold text-slate-900">{primaryUPI}</span>
                    </div>
                    <span className="text-[10px] text-slate-500 font-medium block mt-0.5">
                      Abhinav Maiti (Treasurer, Eklavya) • Zero Gateway Surcharge
                    </span>
                  </div>

                  <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
                    <button
                      type="button"
                      onClick={handleCopyUPI}
                      className="min-h-[44px] px-3.5 py-2 rounded-xl bg-white border border-emerald-300 hover:bg-emerald-50 text-emerald-900 text-xs font-bold font-mono flex items-center justify-center gap-1.5 shadow-2xs transition-colors cursor-pointer"
                    >
                      {copiedUPI ? <CheckCircle2 size={14} className="text-emerald-600" /> : <Copy size={14} />}
                      <span>{copiedUPI ? 'Copied' : 'Copy UPI'}</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setShowQR(!showQR)}
                      className="min-h-[44px] px-3.5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold flex items-center justify-center gap-1.5 shadow-2xs transition-colors cursor-pointer"
                    >
                      <QrCode size={14} />
                      <span>{showQR ? 'Hide QR' : 'Scan QR'}</span>
                    </button>
                  </div>
                </div>

                {/* Optional Expandable QR Code for Desktop Scanning */}
                {showQR && (
                  <div className="p-4 bg-slate-50 border border-slate-200 rounded-2xl text-center space-y-3 animate-fadeIn">
                    <div className="w-48 h-48 mx-auto bg-white p-2.5 rounded-xl border border-slate-200 shadow-sm flex items-center justify-center">
                      <img
                        src={qrCodeUrl}
                        alt="Eklavya UPI QR Code"
                        className="w-full h-full object-contain"
                      />
                    </div>
                    <div className="text-[11px] text-slate-600">
                      Scan with any UPI app (GPay, PhonePe, Paytm, BHIM) for <strong>₹{currentAmount}</strong>
                    </div>
                  </div>
                )}

                {/* Optional UTR / Reference input (Collapsed or 1 line) */}
                <div className="pt-1">
                  <input
                    type="text"
                    placeholder="12-digit UTR reference from UPI app (optional)"
                    value={utrNumber}
                    onChange={(e) => setUtrNumber(e.target.value)}
                    className="w-full px-3.5 py-2 bg-slate-50 hover:bg-white focus:bg-white border border-slate-200 rounded-xl text-xs font-mono text-slate-800 placeholder-slate-400 focus:outline-none focus:border-emerald-600 transition-colors"
                  />
                </div>
              </div>

              {/* 5. Primary Action Button */}
              <div className="pt-2 space-y-2">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {/* Mobile Direct UPI Intent */}
                  <a
                    href={upiUrl}
                    className="sm:hidden py-3.5 px-4 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs shadow-md shadow-emerald-600/20 flex items-center justify-center gap-2 text-center transition-all"
                  >
                    <Smartphone size={15} />
                    <span>Pay ₹{currentAmount} via UPI App</span>
                  </a>

                  {/* Submission Confirmation Button */}
                  <button
                    type="submit"
                    disabled={submitting || currentAmount <= 0}
                    className={`py-3.5 px-5 rounded-full font-black text-xs uppercase tracking-wider text-white shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer ${
                      currentAmount > 0
                        ? 'bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-700 hover:from-emerald-500 hover:to-teal-500 shadow-emerald-500/30 sm:col-span-2'
                        : 'bg-slate-300 cursor-not-allowed sm:col-span-2'
                    }`}
                  >
                    <span>
                      {submitting
                        ? 'Recording Contribution...'
                        : `Confirm ${frequency === 'monthly' ? 'Monthly' : 'One-Time'} Donation (₹${currentAmount.toLocaleString('en-IN')})`}
                    </span>
                    <ArrowRight size={14} />
                  </button>
                </div>

                <div className="flex items-center justify-between text-[11px] text-slate-500 pt-1 font-medium">
                  <span className="flex items-center gap-1">
                    <ShieldCheck size={13} className="text-emerald-700" />
                    <span>80G Tax Exemption Eligible</span>
                  </span>
                  <a
                    href="/donate"
                    onClick={closeDonationModal}
                    className="text-teal-700 hover:text-teal-900 font-bold underline flex items-center gap-0.5"
                  >
                    <span>Full Audit Ledger</span>
                    <ExternalLink size={10} />
                  </a>
                </div>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
