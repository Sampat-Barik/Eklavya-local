import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import type { DonationTier } from '../../types/ngo';
import { ngoService } from '../../services/ngoService';
import { Heart, ArrowRight, ShieldCheck, Sparkles, Check } from 'lucide-react';

export const CTASection: React.FC = () => {
  const [tiers, setTiers] = useState<DonationTier[]>([]);
  const [selectedTier, setSelectedTier] = useState<number>(500);
  const [frequency, setFrequency] = useState<'once' | 'monthly'>('once');
  const [customAmount, setCustomAmount] = useState<string>('');

  useEffect(() => {
    const loadTiers = async () => {
      const data = await ngoService.getDonationTiers();
      setTiers(data);
    };
    loadTiers();
  }, []);

  const currentTierObj = tiers.find((t) => t.amount === selectedTier) || {
    amount: selectedTier,
    title: 'Custom Compassion Gift',
    impactDescription: 'Directly powers daily village evening classes and stray animal emergency first-aid supplies.'
  };

  return (
    <section id="donate-action" className="py-10">
      <div className="bg-gradient-to-br from-slate-900 via-blue-950 to-indigo-950 text-white rounded-[36px] p-8 sm:p-12 md:p-16 shadow-2xl border border-blue-900/60 relative overflow-hidden">
        {/* Background glow flares */}
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-blue-500/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
          {/* Left Column: Mission Call & Contribution Guide */}
          <div className="lg:col-span-6 space-y-6">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-white/10 backdrop-blur-md border border-white/20 rounded-full text-xs font-bold uppercase tracking-wider text-blue-300">
              <Sparkles size={14} />
              <span>CONTRIBUTE TO THE TEAM</span>
            </div>

            <h2 className="text-3xl sm:text-5xl font-serif font-black tracking-tight leading-tight">
              Support Our Mission.<br />
              <span className="text-amber-400 font-normal italic">Contribute</span> to the Team.
            </h2>

            <p className="text-slate-300 text-sm sm:text-base leading-relaxed font-normal max-w-lg">
              Our on-ground field squad is run by dedicated students of Haldia Institute of Technology. You can power our mission by contributing either <strong className="text-white font-bold">Monetary Aid</strong> or <strong className="text-white font-bold">Physical Aid</strong> (clothes, food, books & medical kits).
            </p>

            {/* Dual Aid Channels */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-1">
              <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-1.5">
                <span className="text-xs font-bold text-amber-300 uppercase tracking-wider block">
                  💳 Monetary Aid
                </span>
                <p className="text-xs text-slate-300 leading-relaxed font-normal">
                  Sponsors school stationery, evening snacks for village children, animal rabies shots & surgery supplies.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-1.5">
                <span className="text-xs font-bold text-emerald-300 uppercase tracking-wider block">
                  📦 Physical Aid
                </span>
                <p className="text-xs text-slate-300 leading-relaxed font-normal">
                  Donate clean clothes, winter blankets, dry food packets, notebooks, pencils, or veterinary first-aid supplies.
                </p>
              </div>
            </div>

            {/* Trust Checklist */}
            <div className="space-y-2 pt-1">
              <div className="flex items-center gap-3 text-xs sm:text-sm text-slate-200">
                <div className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
                  <Check size={13} />
                </div>
                <span>100% Student-managed initiative with zero administrative overhead</span>
              </div>
              <div className="flex items-center gap-3 text-xs sm:text-sm text-slate-200">
                <div className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
                  <Check size={13} />
                </div>
                <span>Transparent public ledger published every academic semester</span>
              </div>
            </div>

            {/* Physical Aid Action Button */}
            <div className="pt-2 flex flex-wrap items-center gap-3">
              <a
                href="#contact"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs transition-all shadow-lg hover:scale-105"
              >
                <span>Contribute Physical Aid (Clothes / Food)</span>
                <ArrowRight size={14} />
              </a>
            </div>
          </div>

          {/* Right Column: Interactive Donation Calculator */}
          <div className="lg:col-span-6 bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-6 sm:p-8 space-y-6 shadow-2xl">
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <div>
                <h3 className="text-xl font-serif font-bold text-white">Choose Your Impact</h3>
                <p className="text-xs text-slate-300">Select a contribution amount</p>
              </div>

              {/* Frequency Toggle */}
              <div className="flex items-center p-1 bg-black/40 rounded-full border border-white/10 text-xs font-bold">
                <button
                  onClick={() => setFrequency('once')}
                  className={`px-3 py-1 rounded-full transition-all ${
                    frequency === 'once' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  Give Once
                </button>
                <button
                  onClick={() => setFrequency('monthly')}
                  className={`px-3 py-1 rounded-full transition-all ${
                    frequency === 'monthly' ? 'bg-amber-500 text-slate-950' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  Monthly
                </button>
              </div>
            </div>

            {/* Preset Tiers Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
              {tiers.map((tier) => (
                <button
                  key={tier.id}
                  onClick={() => {
                    setSelectedTier(tier.amount);
                    setCustomAmount('');
                  }}
                  className={`p-3 rounded-2xl border text-center transition-all ${
                    selectedTier === tier.amount && !customAmount
                      ? 'bg-blue-600 border-blue-400 text-white shadow-md shadow-blue-500/30 scale-102'
                      : 'bg-white/5 border-white/10 text-slate-200 hover:bg-white/15'
                  }`}
                >
                  <div className="text-lg font-serif font-extrabold">₹{tier.amount}</div>
                  <div className="text-[10px] opacity-80 truncate">{tier.title}</div>
                </button>
              ))}
            </div>

            {/* Custom Amount Input */}
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 font-bold text-sm">₹</span>
              <input
                type="number"
                placeholder="Or enter custom amount in INR"
                value={customAmount}
                onChange={(e) => {
                  setCustomAmount(e.target.value);
                  if (e.target.value) {
                    setSelectedTier(Number(e.target.value));
                  }
                }}
                className="w-full bg-white/5 border border-white/20 rounded-2xl pl-8 pr-4 py-3 text-xs text-white placeholder-slate-400 focus:outline-none focus:border-blue-400 transition-colors"
              />
            </div>

            {/* Real-world Impact Callout Box */}
            <div className="p-4 rounded-2xl bg-white/5 border border-white/10 flex items-start gap-3">
              <Heart size={20} className="text-rose-400 shrink-0 mt-0.5 fill-current" />
              <div className="space-y-1">
                <span className="text-xs font-bold text-amber-300 uppercase tracking-wider block">
                  What ₹{selectedTier} accomplishes:
                </span>
                <p className="text-xs text-slate-200 leading-relaxed font-normal">
                  {currentTierObj.impactDescription}
                </p>
              </div>
            </div>

            {/* Direct Link to Donate Page with selected amount */}
            <Link
              to={`/donate?amount=${selectedTier}&frequency=${frequency}`}
              className="w-full py-4 rounded-full bg-blue-600 hover:bg-blue-500 text-white font-extrabold text-sm flex items-center justify-center gap-2 shadow-xl shadow-blue-600/30 transition-transform hover:scale-102"
            >
              <Heart size={16} className="fill-current text-white" />
              <span>Proceed with ₹{selectedTier} {frequency === 'monthly' ? '/ month' : ''}</span>
              <ArrowRight size={16} />
            </Link>

            <div className="flex items-center justify-center gap-2 text-[11px] text-slate-400">
              <ShieldCheck size={14} className="text-emerald-400" />
              <span>Secure contribution directly credited to official Eklavya Society Fund</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
