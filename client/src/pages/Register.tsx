import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { UserPlus, Sparkles, Upload, Building, GraduationCap } from 'lucide-react';

export const Register: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [department, setDepartment] = useState('Computer Science & Engg.');
  const [college, setCollege] = useState('Haldia Institute of Technology');
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const { register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      await register(name, email, password);
      navigate('/portal');
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('Failed to register');
      }
    } finally {
      setLoading(false);
    }
  };

  const departments = [
    'Computer Science & Engg.',
    'Information Technology',
    'Electronics & Comm. Engg.',
    'Chemical Engineering',
    'Mechanical Engineering',
    'Electrical Engineering',
    'Applied Electronics & Inst. Engg.',
    'Management Studies',
    'Basic Sciences'
  ];

  return (
    <div className="max-w-lg mx-auto px-4 py-10">
      <div className="editorial-card p-8 md:p-10 space-y-6">
        <div className="text-center space-y-3">
          <div className="relative w-16 h-16 mx-auto rounded-full p-[2px] bg-gradient-to-r from-teal-800 to-emerald-500 shadow-md flex items-center justify-center">
            <div className="w-full h-full rounded-full bg-white flex items-center justify-center p-1">
              <img src="/eklavya_logo.png" alt="Eklavya Official Crest" className="w-full h-full object-contain" />
            </div>
          </div>
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 bg-blue-50 border border-blue-200 rounded-full text-xs font-bold text-blue-700">
            <Sparkles size={14} />
            <span>CREATE MEMBER ACCOUNT</span>
          </div>
          <h1 className="text-3xl font-serif font-extrabold text-slate-900">Create Portal Account</h1>
          <p className="text-xs font-medium text-slate-500">Access public certificates, attendance tracking & donations ledger</p>
        </div>

        {/* Student Volunteer Recruitment Notice */}
        <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 text-xs text-amber-950 space-y-1.5 text-left">
          <span className="font-bold font-mono uppercase tracking-wide text-amber-900 flex items-center gap-1.5">
            <GraduationCap size={15} />
            <span>Looking for Active Club Membership?</span>
          </span>
          <p className="text-[11px] leading-relaxed text-slate-700 font-normal">
            Active membership into Eklavya is <strong>not</strong> an immediate sign-up; it is subject to our annual selection process. Please submit the official recruitment application:
          </p>
          <Link
            to="/recruitment"
            className="inline-flex items-center gap-1 font-bold text-amber-900 hover:text-amber-950 underline text-xs"
          >
            <span>Go to Campus Intake & Recruitment Form →</span>
          </Link>
        </div>

        {error && (
          <div className="bg-rose-50 border border-rose-200 p-4 rounded-2xl text-xs font-bold text-rose-700">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Avatar Upload */}
          <div>
            <label className="block text-xs font-bold text-slate-900 mb-1.5">Profile Avatar (Optional)</label>
            <div className="relative border border-slate-200 border-dashed rounded-[20px] p-4 bg-slate-50 text-center cursor-pointer hover:bg-blue-50/50 transition-colors">
              <input
                type="file"
                accept="image/*"
                onChange={(e) => setAvatarFile(e.target.files ? e.target.files[0] : null)}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              />
              <Upload size={20} className="mx-auto text-blue-600 mb-1" />
              <span className="text-xs font-bold text-slate-900 block">
                {avatarFile ? avatarFile.name : 'Upload Profile Picture'}
              </span>
            </div>
          </div>

          {/* Full Name */}
          <div>
            <label className="block text-xs font-bold text-slate-900 mb-1.5">Full Name *</label>
            <input
              type="text"
              required
              placeholder="e.g. Sourav Maity"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-full px-4 py-3 text-xs font-semibold text-slate-900 focus:outline-none focus:border-blue-600 transition-colors"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Department Dropdown */}
            <div>
              <label className="block text-xs font-bold text-slate-900 mb-1.5 flex items-center gap-1">
                <GraduationCap size={14} className="text-blue-600" /> Department *
              </label>
              <select
                value={department}
                onChange={(e) => setDepartment(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-full px-4 py-3 text-xs font-semibold text-slate-900 focus:outline-none focus:border-blue-600 transition-colors"
              >
                {departments.map((dept) => (
                  <option key={dept} value={dept}>
                    {dept}
                  </option>
                ))}
              </select>
            </div>

            {/* College */}
            <div>
              <label className="block text-xs font-bold text-slate-900 mb-1.5 flex items-center gap-1">
                <Building size={14} className="text-blue-600" /> College *
              </label>
              <input
                type="text"
                required
                value={college}
                onChange={(e) => setCollege(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-full px-4 py-3 text-xs font-semibold text-slate-900 focus:outline-none focus:border-blue-600 transition-colors"
              />
            </div>
          </div>

          {/* Email Address */}
          <div>
            <label className="block text-xs font-bold text-slate-900 mb-1.5">Email Address *</label>
            <input
              type="email"
              required
              placeholder="sourav@gmail.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-full px-4 py-3 text-xs font-semibold text-slate-900 focus:outline-none focus:border-blue-600 transition-colors"
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-xs font-bold text-slate-900 mb-1.5">Password *</label>
            <input
              type="password"
              required
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-full px-4 py-3 text-xs font-semibold text-slate-900 focus:outline-none focus:border-blue-600 transition-colors"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-full shadow-lg shadow-blue-500/25 flex items-center justify-center gap-2 transition-transform hover:scale-[1.02] pt-3 mt-2"
          >
            <UserPlus size={16} />
            <span>{loading ? 'Creating Profile...' : 'Create Account'}</span>
          </button>
        </form>

        <div className="text-center text-xs font-medium text-slate-600 pt-2 border-t border-slate-100">
          Already registered?{' '}
          <Link to="/login" className="text-blue-600 font-bold hover:underline">
            Log in here
          </Link>
        </div>
      </div>
    </div>
  );
};
