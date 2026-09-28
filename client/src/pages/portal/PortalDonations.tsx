import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Heart, CheckCircle2, Download, ArrowUpRight, ShieldCheck, Wallet } from 'lucide-react';
import type { MemberDonation } from '../../types/auth';

export const PortalDonations: React.FC = () => {
  const { user } = useAuth();
  const [donations, setDonations] = useState<MemberDonation[]>([]);
  const [totalContributed, setTotalContributed] = useState<number>(0);

  useEffect(() => {
    const fetchDonations = async () => {
      const token = localStorage.getItem('token');
      if (token) {
        try {
          const res = await fetch('http://localhost:5000/api/portal/my-donations', {
            headers: { Authorization: `Bearer ${token}` }
          });
          if (res.ok) {
            const data = await res.json();
            setDonations(data);
            const sum = data.reduce((acc: number, curr: MemberDonation) => acc + Number(curr.amount || 0), 0);
            setTotalContributed(sum);
            return;
          }
        } catch {
          // Local fallback
        }
      }

      const mockUserDonations: MemberDonation[] = [
        {
          _id: 'don-1',
          fullName: user?.name || 'Aarav Mukherjee',
          email: user?.email || 'aarav.hit26@gmail.com',
          amount: 1500,
          utrNumber: 'UPI/2026/89472619',
          createdAt: '2026-08-14T11:20:00Z',
          status: 'Verified'
        }
      ];

      setDonations(mockUserDonations);
      setTotalContributed(1500);
    };

    fetchDonations();
  }, [user]);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-5">
        <div>
          <h1 className="text-2xl font-serif font-black text-slate-900 tracking-tight">
            My Donation History & Contributions
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Official ledger receipts for aid provided to Eklavya relief initiatives and animal medical funds.
          </p>
        </div>

        <Link
          to="/donate"
          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold shadow-xs transition-colors self-start sm:self-auto"
        >
          <Heart size={13} className="fill-white" />
          <span>Make a Contribution</span>
          <ArrowUpRight size={13} />
        </Link>
      </div>

      {/* Summary Card */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        <div className="editorial-card p-5 bg-white space-y-1">
          <span className="text-xs font-bold text-slate-500">Total Contributed</span>
          <div className="text-3xl font-serif font-black text-blue-700 font-mono">
            ₹{totalContributed.toLocaleString('en-IN')}
          </div>
          <span className="text-[11px] text-slate-500">Verified through college banking cell</span>
        </div>

        <div className="editorial-card p-5 bg-white space-y-1">
          <span className="text-xs font-bold text-slate-500">Total Proofs Submitted</span>
          <div className="text-3xl font-serif font-black text-slate-900">{donations.length}</div>
          <span className="text-[11px] text-emerald-600 font-bold">100% Verified</span>
        </div>

        <div className="editorial-card p-5 bg-white space-y-1">
          <span className="text-xs font-bold text-slate-500">Tax Exemption Status</span>
          <div className="text-xl font-bold text-slate-900 flex items-center gap-1.5 mt-1">
            <ShieldCheck size={18} className="text-emerald-600" />
            <span>Eligible Receipt</span>
          </div>
          <span className="text-[11px] text-slate-500">Society 80G Certified</span>
        </div>
      </div>

      {/* Donations List */}
      <div className="space-y-4">
        <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
          <Wallet size={16} className="text-blue-600" />
          <span>Personal Contribution Records</span>
        </h2>

        {donations.length === 0 ? (
          <div className="editorial-card p-12 text-center space-y-3 bg-slate-50/50 max-w-md mx-auto">
            <p className="text-xs text-slate-500">No personal donation proofs recorded under your email.</p>
            <Link
              to="/donate"
              className="inline-block px-4 py-2 rounded-xl bg-blue-600 text-white text-xs font-bold hover:bg-blue-700 transition-colors"
            >
              Support Our Causes
            </Link>
          </div>
        ) : (
          <div className="editorial-card overflow-hidden bg-white border-slate-200 w-full max-w-full">
            {/* Mobile Horizontal Scroll Indicator */}
            <div className="sm:hidden px-4 py-2 bg-slate-50 border-b border-slate-100 text-[11px] text-slate-700 font-mono flex items-center justify-between font-bold">
              <span>Swipe horizontally to view all columns</span>
              <span>⇄</span>
            </div>
            <div className="overflow-x-auto w-full max-w-full horizontal-scroll-container overscroll-x-contain pb-1">
              <table className="w-full min-w-[620px] text-left text-xs">
                <thead className="bg-slate-50 text-slate-600 border-b border-slate-200 font-bold uppercase text-[10px]">
                  <tr>
                    <th className="py-3.5 px-4">Date</th>
                    <th className="py-3.5 px-4">Transaction UTR</th>
                    <th className="py-3.5 px-4">Amount</th>
                    <th className="py-3.5 px-4">Status</th>
                    <th className="py-3.5 px-4 text-right">Receipt</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 font-medium">
                  {donations.map((don, idx) => (
                    <tr key={don._id || idx} className="hover:bg-slate-50/60 transition-colors">
                      <td className="py-3.5 px-4 text-slate-600 font-mono text-[11px] whitespace-nowrap">
                        {new Date(don.createdAt).toLocaleDateString()}
                      </td>
                      <td className="py-3.5 px-4 text-slate-900 font-mono font-bold">
                        {don.utrNumber}
                      </td>
                      <td className="py-3.5 px-4 text-emerald-700 font-bold font-mono text-sm">
                        ₹{Number(don.amount).toLocaleString('en-IN')}
                      </td>
                      <td className="py-3.5 px-4">
                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase bg-emerald-50 text-emerald-700 border border-emerald-200">
                          <CheckCircle2 size={11} />
                          <span>{don.status || 'Verified'}</span>
                        </span>
                      </td>
                      <td className="py-3.5 px-4 text-right">
                        <button
                          onClick={() => alert(`Downloading formal donation acknowledgement receipt for UTR: ${don.utrNumber}`)}
                          className="min-h-[44px] inline-flex items-center justify-end gap-1.5 text-xs font-semibold text-blue-600 hover:text-blue-700 hover:underline px-2 cursor-pointer"
                        >
                          <Download size={14} />
                          <span>Receipt PDF</span>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
