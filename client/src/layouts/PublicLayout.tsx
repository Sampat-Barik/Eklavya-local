import React from 'react';
import { Outlet, Link } from 'react-router-dom';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { PageTransition } from '../components/ui/PageTransition';
import { useDonationModal } from '../context/DonationModalContext';
import { Heart, UserPlus } from 'lucide-react';

export const PublicLayout: React.FC = () => {
  const { openDonationModal } = useDonationModal();

  return (
    <div className="min-h-screen bg-[#FCFBF9] font-sans antialiased text-slate-900 flex flex-col justify-between selection:bg-teal-700 selection:text-white relative overflow-x-clip">
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

      {/* Top Navbar */}
      <Navbar />

      {/* Main Content with Branded Page Transition */}
      <main className="flex-grow relative z-10 pb-24 md:pb-0">
        <PageTransition>
          <Outlet />
        </PageTransition>
      </main>

      {/* Global Footer */}
      <div className="relative z-10">
        <Footer />
      </div>

      {/* Mobile-Only Sticky Bottom Quick-Action Bar */}
      <div className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-slate-200 p-3 flex gap-3 block md:hidden">
        <Link
          to="/recruitment"
          className="flex-1 min-h-[44px] flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-full bg-slate-900 hover:bg-slate-800 text-white font-mono text-xs font-bold uppercase tracking-wider shadow-sm active:scale-95 transition-all text-center"
        >
          <UserPlus size={15} className="text-emerald-400 shrink-0" />
          <span>Apply for Recruitment</span>
        </Link>

        <button
          type="button"
          onClick={() => openDonationModal()}
          className="min-h-[44px] px-5 py-2.5 flex items-center justify-center gap-1.5 rounded-full bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-mono text-xs font-bold uppercase tracking-wider shadow-sm active:scale-95 transition-all cursor-pointer shrink-0"
        >
          <Heart size={14} className="text-white fill-current shrink-0" />
          <span>Donate</span>
        </button>
      </div>
    </div>
  );
};


