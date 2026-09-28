import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { OFFICIAL_DOMAINS } from '../../types/auth';
import type { ClubDomain, ClubTask } from '../../types/auth';
import {
  Zap,
  CheckCircle2,
  Clock,
  Plus,
  Trash2,
  Calendar,
  User,
  Layers,
  Send,
  ExternalLink,
  Shield,
  FileText,
  Sparkles,
  Award,
  Heart,
  Megaphone,
  CalendarCheck
} from 'lucide-react';

export const DomainTaskHub: React.FC = () => {
  const {
    user,
    roleLevel,
    userDomain,
    tasks,
    createTask,
    updateTaskStatus,
    deleteTask
  } = useAuth();

  // If Admin or Super Admin, allow browsing any domain. Otherwise, use assigned domain.
  const [selectedDomain, setSelectedDomain] = useState<ClubDomain>(
    userDomain || 'web_development'
  );

  const activeDomain = (roleLevel === 1 || roleLevel === 2) ? selectedDomain : (userDomain || 'web_development');
  const domainMeta = OFFICIAL_DOMAINS.find((d) => d.key === activeDomain) || OFFICIAL_DOMAINS[0];

  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [submitTaskModal, setSubmitTaskModal] = useState<ClubTask | null>(null);

  // Level 5 (Normal Users / Non-Members) cannot execute internal club domain tasks
  if (roleLevel === 5 || user?.role === 'public_user' || user?.isActiveMember === false) {
    return (
      <div className="editorial-card p-8 sm:p-10 max-w-xl mx-auto text-center space-y-6 border-amber-200 bg-amber-50/20 shadow-xl my-8">
        <div className="w-16 h-16 mx-auto rounded-3xl bg-amber-100 text-amber-700 flex items-center justify-center p-3 shadow-md">
          <Zap size={32} />
        </div>
        <div className="space-y-2">
          <span className="text-[10px] font-extrabold uppercase tracking-wider bg-amber-100 text-amber-800 px-3 py-1 rounded-full border border-amber-200">
            Active Member Area Restricted
          </span>
          <h2 className="text-2xl font-serif font-black text-slate-900">
            Domain Tasks & Department Desks
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            Domain tasks and department rosters are restricted to inducted <strong>Active Club Members (Level 4+)</strong> and <strong>Domain Leads</strong>.
            As a <strong>Normal User (Level 5)</strong>, you have full access to your personal User Portal services below.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-xs font-bold text-left">
          <Link
            to="/portal/certificates"
            className="p-3.5 rounded-xl bg-white border border-emerald-200 hover:border-teal-400 hover:bg-emerald-50/60 transition-all flex items-center gap-3 shadow-2xs group"
          >
            <div className="p-2 rounded-lg bg-teal-100 text-teal-800 group-hover:bg-teal-700 group-hover:text-white transition-colors">
              <Award size={16} />
            </div>
            <div>
              <span className="text-slate-900 block font-bold">My Certificates</span>
              <span className="text-[11px] text-slate-500 font-normal">Download verified certificates</span>
            </div>
          </Link>

          <Link
            to="/portal/donations"
            className="p-3.5 rounded-xl bg-white border border-emerald-200 hover:border-teal-400 hover:bg-emerald-50/60 transition-all flex items-center gap-3 shadow-2xs group"
          >
            <div className="p-2 rounded-lg bg-emerald-100 text-emerald-800 group-hover:bg-emerald-700 group-hover:text-white transition-colors">
              <Heart size={16} />
            </div>
            <div>
              <span className="text-slate-900 block font-bold">Donation History</span>
              <span className="text-[11px] text-slate-500 font-normal">View receipts & contributions</span>
            </div>
          </Link>

          <Link
            to="/portal/attendance"
            className="p-3.5 rounded-xl bg-white border border-emerald-200 hover:border-teal-400 hover:bg-emerald-50/60 transition-all flex items-center gap-3 shadow-2xs group"
          >
            <div className="p-2 rounded-lg bg-blue-100 text-blue-800 group-hover:bg-blue-700 group-hover:text-white transition-colors">
              <CalendarCheck size={16} />
            </div>
            <div>
              <span className="text-slate-900 block font-bold">Events Attended</span>
              <span className="text-[11px] text-slate-500 font-normal">Verify attended workshops</span>
            </div>
          </Link>

          <Link
            to="/portal/announcements"
            className="p-3.5 rounded-xl bg-white border border-emerald-200 hover:border-teal-400 hover:bg-emerald-50/60 transition-all flex items-center gap-3 shadow-2xs group"
          >
            <div className="p-2 rounded-lg bg-purple-100 text-purple-800 group-hover:bg-purple-700 group-hover:text-white transition-colors">
              <Megaphone size={16} />
            </div>
            <div>
              <span className="text-slate-900 block font-bold">Announcements</span>
              <span className="text-[11px] text-slate-500 font-normal">Official society circulars</span>
            </div>
          </Link>
        </div>

        <div className="pt-2 border-t border-amber-100">
          <Link
            to="/portal"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-teal-800 hover:text-teal-900 hover:underline"
          >
            <span>Return to Portal Overview</span>
            <span>&rarr;</span>
          </Link>
        </div>
      </div>
    );
  }

  // Form State
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [assigneeName, setAssigneeName] = useState('Sneha Patel');
  const [priority, setPriority] = useState<ClubTask['priority']>('high');
  const [dueDate, setDueDate] = useState('2026-10-05');
  const [formFeedback, setFormFeedback] = useState<string | null>(null);

  // Member Task Submission State
  const [submissionNote, setSubmissionNote] = useState('');
  const [submissionLink, setSubmissionLink] = useState('');

  // Domain specific tasks
  const domainTasks = useMemo(() => {
    return tasks.filter((t) => t.domain === activeDomain);
  }, [tasks, activeDomain]);

  // Tasks assigned to current user
  const myAssignedTasks = useMemo(() => {
    if (!user) return [];
    return tasks.filter((t) => t.assignedToId === user.id || t.assignedToName.toLowerCase().includes(user.name.toLowerCase()));
  }, [tasks, user]);

  const filteredTasks = useMemo(() => {
    if (statusFilter === 'all') return domainTasks;
    return domainTasks.filter((t) => t.status === statusFilter);
  }, [domainTasks, statusFilter]);

  const stats = useMemo(() => {
    return {
      total: domainTasks.length,
      inProgress: domainTasks.filter((t) => t.status === 'in_progress').length,
      submitted: domainTasks.filter((t) => t.status === 'submitted').length,
      completed: domainTasks.filter((t) => t.status === 'completed').length,
      pending: domainTasks.filter((t) => t.status === 'pending').length
    };
  }, [domainTasks]);

  const isLead = roleLevel === 3 && userDomain === activeDomain;
  const isGlobalAdmin = roleLevel === 1 || roleLevel === 2;
  const canCreate = isLead || isGlobalAdmin;

  const handleCreateTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) {
      setFormFeedback('Please enter a task title');
      return;
    }

    const res = createTask({
      title,
      description,
      domain: activeDomain,
      assignedToId: 'user-level-4',
      assignedToName: assigneeName,
      createdById: user?.id || 'lead',
      createdByName: user?.name || 'Domain Lead',
      priority,
      status: 'pending',
      dueDate
    });

    if (res.success) {
      setTitle('');
      setDescription('');
      setShowCreateModal(false);
      setFormFeedback(null);
    } else {
      setFormFeedback(res.message);
    }
  };

  const handleSubmitDeliverable = (e: React.FormEvent) => {
    e.preventDefault();
    if (!submitTaskModal) return;
    updateTaskStatus(submitTaskModal.id, 'submitted', submissionNote, submissionLink);
    setSubmitTaskModal(null);
    setSubmissionNote('');
    setSubmissionLink('');
  };

  const getPriorityBadge = (p: ClubTask['priority']) => {
    switch (p) {
      case 'urgent':
        return <span className="px-2 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-rose-100 text-rose-800 border border-rose-200">Urgent</span>;
      case 'high':
        return <span className="px-2 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-amber-100 text-amber-800 border border-amber-200">High</span>;
      case 'medium':
        return <span className="px-2 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-blue-100 text-blue-800 border border-blue-200">Medium</span>;
      default:
        return <span className="px-2 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-slate-100 text-slate-800 border border-slate-200">Low</span>;
    }
  };

  const getStatusBadge = (s: ClubTask['status']) => {
    switch (s) {
      case 'completed':
        return <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800 flex items-center gap-1"><CheckCircle2 size={12} /> Completed</span>;
      case 'submitted':
        return <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-purple-100 text-purple-800 flex items-center gap-1"><Clock size={12} /> Under Review</span>;
      case 'in_progress':
        return <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-sky-100 text-sky-800 flex items-center gap-1"><Zap size={12} /> In Progress</span>;
      default:
        return <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-amber-100 text-amber-800 flex items-center gap-1"><Clock size={12} /> Pending</span>;
    }
  };

  return (
    <div className="space-y-8 animate-fadeIn pb-16">
      {/* 1. Header Banner with Department Branding */}
      <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-teal-900 via-teal-950 to-slate-900 text-white p-6 sm:p-8 shadow-xl border border-teal-800/40">
        <div className="absolute top-0 right-0 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20" />
        
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex items-start sm:items-center gap-4">
            <div className="relative w-14 h-14 sm:w-16 sm:h-16 rounded-3xl p-1 bg-gradient-to-tr from-teal-500 to-emerald-400 shadow-xl flex items-center justify-center shrink-0">
              <div className="w-full h-full rounded-2xl bg-white flex items-center justify-center p-1">
                <img
                  src="/eklavya_logo.png"
                  alt="Eklavya Domain Hub"
                  className="w-full h-full object-contain"
                />
              </div>
            </div>
            <div className="space-y-1.5">
              <div className="flex items-center gap-2.5 flex-wrap">
                <span className="px-3 py-0.5 rounded-full text-xs font-bold border border-white/40 bg-white/20 text-white backdrop-blur-sm shadow-xs">
                  {domainMeta.name} Wing
                </span>
                {roleLevel === 3 && (
                  <span className="bg-white/20 text-white border border-white/40 px-2.5 py-0.5 rounded-full text-xs font-bold flex items-center gap-1 backdrop-blur-sm shadow-xs">
                    <Zap size={11} className="text-white" /> You are Domain Lead (Level 3)
                  </span>
                )}
                {roleLevel === 4 && (
                  <span className="bg-white/20 text-white border border-white/40 px-2.5 py-0.5 rounded-full text-xs font-bold flex items-center gap-1 backdrop-blur-sm shadow-xs">
                    <User size={11} className="text-white" /> You are Club Member (Level 4)
                  </span>
                )}
                {isGlobalAdmin && (
                  <span className="bg-white/20 text-white border border-white/40 px-2.5 py-0.5 rounded-full text-xs font-bold flex items-center gap-1 backdrop-blur-sm shadow-xs">
                    <Shield size={11} className="text-white" /> Administrator Oversight (Level {roleLevel})
                  </span>
                )}
              </div>

              <h1 className="text-2xl sm:text-3xl font-serif font-black tracking-tight text-white drop-shadow-xs">
                {domainMeta.name} Management Hub
              </h1>
              <p className="text-xs sm:text-sm text-white/95 max-w-2xl leading-relaxed font-medium">
                {domainMeta.shortDesc}
              </p>
            </div>
          </div>

          {/* Action on right */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            {isGlobalAdmin && (
              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-2 border border-white/20">
                <label className="text-[10px] text-white font-bold uppercase tracking-wider block mb-1">
                  Switch Overseen Domain
                </label>
                <select
                  value={selectedDomain}
                  onChange={(e) => setSelectedDomain(e.target.value as ClubDomain)}
                  className="bg-slate-900 text-white text-xs font-bold rounded-xl px-3 py-1.5 focus:outline-none border border-white/30 cursor-pointer w-full"
                >
                  {OFFICIAL_DOMAINS.map((dom) => (
                    <option key={dom.key} value={dom.key} className="text-white bg-slate-900">
                      {dom.name} Wing
                    </option>
                  ))}
                </select>
              </div>
            )}

            {canCreate ? (
              <button
                onClick={() => setShowCreateModal(true)}
                className="px-5 py-3 rounded-2xl bg-white hover:bg-slate-100 text-slate-950 font-bold text-xs flex items-center justify-center gap-2 shadow-lg transition-transform hover:scale-105"
              >
                <Plus size={16} />
                <span>Assign Task to Member</span>
              </button>
            ) : (
              <div className="bg-white/10 border border-white/20 rounded-2xl p-3 text-xs text-white">
                <span className="font-bold block text-white">Member Task View</span>
                <span className="text-white/90">Assigned tasks appear below.</span>
              </div>
            )}
          </div>
        </div>

        {/* Quick Stats Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 mt-6 pt-6 border-t border-white/20 text-center">
          <div className="p-2.5 rounded-xl bg-white/10 backdrop-blur-sm border border-white/10">
            <span className="text-xl font-black text-white">{stats.total}</span>
            <span className="text-[10px] text-white/90 block uppercase font-bold tracking-wide">Total Tasks</span>
          </div>
          <div className="p-2.5 rounded-xl bg-white/10 backdrop-blur-sm border border-white/10">
            <span className="text-xl font-black text-white">{stats.inProgress}</span>
            <span className="text-[10px] text-white/90 block uppercase font-bold tracking-wide">In Progress</span>
          </div>
          <div className="p-2.5 rounded-xl bg-white/10 backdrop-blur-sm border border-white/10">
            <span className="text-xl font-black text-white">{stats.pending}</span>
            <span className="text-[10px] text-white/90 block uppercase font-bold tracking-wide">Pending</span>
          </div>
          <div className="p-2.5 rounded-xl bg-white/10 backdrop-blur-sm border border-white/10">
            <span className="text-xl font-black text-white">{stats.submitted}</span>
            <span className="text-[10px] text-white/90 block uppercase font-bold tracking-wide">In Review</span>
          </div>
          <div className="p-2.5 rounded-xl bg-white/10 backdrop-blur-sm border border-white/10 col-span-2 sm:col-span-1">
            <span className="text-xl font-black text-white">{stats.completed}</span>
            <span className="text-[10px] text-white/90 block uppercase font-bold tracking-wide">Completed</span>
          </div>
        </div>
      </div>

      {/* 2. Level 4 (Club Member) Specific Banner */}
      {roleLevel === 4 && (
        <div className="bg-emerald-50 border border-emerald-200 rounded-3xl p-5 shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex items-start gap-3">
            <div className="p-2.5 rounded-2xl bg-emerald-100 text-emerald-800">
              <User size={22} />
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-900">
                Welcome, {user?.name || 'Club Member'}! Here is your Department Desk
              </h3>
              <p className="text-xs text-slate-600 mt-0.5">
                You are assigned to the <strong className="text-teal-900">{domainMeta.name}</strong> domain. Below are your assigned deliverables.
              </p>
            </div>
          </div>
          <div className="bg-white px-3.5 py-2 rounded-xl border border-emerald-200 text-xs font-semibold text-emerald-800">
            Tasks Assigned to You: <span className="font-bold text-slate-900">{myAssignedTasks.length}</span>
          </div>
        </div>
      )}

      {/* 3. Task Board & Filter Bar */}
      <div className="bg-white rounded-3xl border border-emerald-100/90 shadow-sm p-6 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
          <div>
            <h2 className="text-lg font-serif font-black text-slate-900 flex items-center gap-2">
              <Layers size={18} className="text-teal-700" />
              <span>{domainMeta.name} Deliverables & Tasks</span>
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              {canCreate
                ? 'Manage and delegate domain-specific assignments to registered Level 4 members.'
                : 'View your department deadlines and submit completion proofs.'}
            </p>
          </div>

          {/* Filter Pills */}
          <div className="flex items-center gap-2 overflow-x-auto horizontal-scroll-container overscroll-x-contain pb-1 max-w-full">
            {[
              { id: 'all', label: 'All Tasks' },
              { id: 'in_progress', label: 'In Progress' },
              { id: 'pending', label: 'Pending' },
              { id: 'submitted', label: 'Submitted' },
              { id: 'completed', label: 'Completed' }
            ].map((f) => (
              <button
                key={f.id}
                onClick={() => setStatusFilter(f.id)}
                className={`min-h-[44px] px-4 py-2.5 rounded-full text-xs font-bold transition-all whitespace-nowrap cursor-pointer touch-manipulation inline-flex items-center justify-center ${
                  statusFilter === f.id
                    ? 'bg-teal-800 text-white shadow-xs'
                    : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>

        {/* Task Cards Grid */}
        {filteredTasks.length === 0 ? (
          <div className="text-center py-12 bg-slate-50/50 rounded-2xl border border-dashed border-slate-200 space-y-2">
            <FileText size={28} className="mx-auto text-slate-400" />
            <p className="text-sm font-bold text-slate-700">No tasks in this category</p>
            <p className="text-xs text-slate-500">
              {canCreate ? 'Click "Assign Task" above to delegate work.' : 'You have no open tasks in this view.'}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredTasks.map((t) => {
              const isAssignedToMe = user && (t.assignedToId === user.id || t.assignedToName.toLowerCase().includes(user.name.toLowerCase()));
              return (
                <div
                  key={t.id}
                  className={`p-5 rounded-2xl border transition-all flex flex-col justify-between ${
                    isAssignedToMe
                      ? 'border-teal-400 bg-teal-50/20 shadow-xs'
                      : 'border-slate-200/90 bg-white hover:border-teal-300'
                  }`}
                >
                  <div className="space-y-3">
                    <div className="flex items-start justify-between gap-2">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2 flex-wrap">
                          {getPriorityBadge(t.priority)}
                          {getStatusBadge(t.status)}
                          {isAssignedToMe && (
                            <span className="px-2 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-teal-100 text-teal-800 border border-teal-200">
                              Assigned To You
                            </span>
                          )}
                        </div>
                        <h3 className="text-sm font-bold text-slate-900 leading-snug">{t.title}</h3>
                      </div>

                      {canCreate && (
                        <button
                          onClick={() => deleteTask(t.id)}
                          className="p-1 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors"
                          title="Delete Task"
                        >
                          <Trash2 size={14} />
                        </button>
                      )}
                    </div>

                    <p className="text-xs text-slate-600 leading-relaxed">{t.description}</p>

                    {t.submissionNote && (
                      <div className="p-2.5 rounded-xl bg-purple-50 border border-purple-200 text-xs text-purple-900 space-y-1">
                        <span className="font-bold block text-[10px] uppercase text-purple-700">Deliverable Note</span>
                        <p>{t.submissionNote}</p>
                        {t.submissionLink && (
                          <a
                            href={t.submissionLink}
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex items-center gap-1 text-purple-700 hover:underline font-bold text-[11px]"
                          >
                            <span>Open Submission Asset</span>
                            <ExternalLink size={10} />
                          </a>
                        )}
                      </div>
                    )}
                  </div>

                  <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500 gap-2 flex-wrap">
                    <div className="flex items-center gap-3">
                      <span className="flex items-center gap-1">
                        <User size={12} className="text-teal-700" />
                        <span className="font-bold text-slate-800">{t.assignedToName}</span>
                      </span>
                      <span className="flex items-center gap-1">
                        <Calendar size={12} />
                        <span>Due {t.dueDate}</span>
                      </span>
                    </div>

                    {/* Action buttons depending on role */}
                    <div className="flex items-center gap-1.5">
                      {roleLevel === 4 && (
                        <>
                          {t.status === 'pending' && (
                            <button
                              onClick={() => updateTaskStatus(t.id, 'in_progress')}
                              className="px-2.5 py-1 rounded-lg bg-teal-800 text-white font-bold text-[11px] hover:bg-teal-900 transition-colors"
                            >
                              Start Task
                            </button>
                          )}
                          {t.status === 'in_progress' && (
                            <button
                              onClick={() => setSubmitTaskModal(t)}
                              className="px-2.5 py-1 rounded-lg bg-purple-700 text-white font-bold text-[11px] hover:bg-purple-800 transition-colors"
                            >
                              Submit Work
                            </button>
                          )}
                        </>
                      )}

                      {canCreate && (
                        <div className="flex items-center gap-1">
                          {t.status === 'submitted' && (
                            <button
                              onClick={() => updateTaskStatus(t.id, 'completed')}
                              className="px-2.5 py-1 rounded-lg bg-emerald-700 text-white font-bold text-[11px] hover:bg-emerald-800 transition-colors"
                            >
                              Approve & Mark Done
                            </button>
                          )}
                          {t.status !== 'completed' && t.status !== 'submitted' && (
                            <button
                              onClick={() => updateTaskStatus(t.id, 'completed')}
                              className="px-2 py-1 rounded-lg bg-slate-100 text-slate-700 font-bold text-[11px] hover:bg-slate-200 transition-colors"
                            >
                              Mark Done
                            </button>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* 4. Internal Domain Schedule & Announcements Section */}
      <div className="bg-gradient-to-r from-emerald-50/60 to-teal-50/40 rounded-3xl p-6 border border-emerald-100">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Sparkles size={16} className="text-teal-700" />
            <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wide">
              {domainMeta.name} Internal Wing Schedule & Guidelines
            </h3>
          </div>
          <span className="text-xs text-slate-500">Updated for Autumn Session 2026</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs text-slate-700">
          <div className="bg-white p-3.5 rounded-2xl border border-emerald-100/80 shadow-2xs space-y-1">
            <span className="font-bold text-teal-900 block text-xs">Weekly Sprint Review</span>
            <p className="text-slate-600 text-[11px]">Every Thursday at 7:00 PM on Google Meet. All members in this domain should present task progress.</p>
          </div>
          <div className="bg-white p-3.5 rounded-2xl border border-emerald-100/80 shadow-2xs space-y-1">
            <span className="font-bold text-teal-900 block text-xs">Quality Deliverable Check</span>
            <p className="text-slate-600 text-[11px]">Assets must be uploaded to the shared society Drive folder prior to marking submitted.</p>
          </div>
          <div className="bg-white p-3.5 rounded-2xl border border-emerald-100/80 shadow-2xs space-y-1">
            <span className="font-bold text-teal-900 block text-xs">Lead Escalations</span>
            <p className="text-slate-600 text-[11px]">Need equipment or permissions? Reach out directly to your Domain Lead or General Secretary.</p>
          </div>
        </div>
      </div>

      {/* Modal: Create & Assign Task (Domain Lead / Admin Only) */}
      {showCreateModal && (
        <div className="fixed inset-0 z-[100] bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl border border-emerald-100">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-xl bg-teal-100 text-teal-800">
                  <Plus size={18} />
                </div>
                <div>
                  <h3 className="text-base font-bold text-slate-900">Assign New Department Task</h3>
                  <p className="text-xs text-slate-500">Domain: {domainMeta.name}</p>
                </div>
              </div>
              <button
                onClick={() => setShowCreateModal(false)}
                className="text-slate-400 hover:text-slate-700 font-bold"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleCreateTask} className="mt-4 space-y-3.5 text-xs">
              {formFeedback && (
                <div className="p-2.5 rounded-xl bg-rose-50 text-rose-700 text-xs font-bold border border-rose-200">
                  {formFeedback}
                </div>
              )}

              <div>
                <label className="font-bold text-slate-700 block mb-1">Task Title</label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. Redesign festival promotional graphics"
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:border-teal-600 focus:outline-none"
                  required
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Detailed Description & Deliverables</label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Specify resolution, guidelines, requirements, or target beneficiaries..."
                  rows={3}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:border-teal-600 focus:outline-none"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Assign to Active Member (Level 4)</label>
                  <input
                    type="text"
                    value={assigneeName}
                    onChange={(e) => setAssigneeName(e.target.value)}
                    placeholder="Member Name"
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:border-teal-600 focus:outline-none font-medium"
                    required
                  />
                  <span className="text-[10px] text-slate-400 block mt-0.5">
                    Tasks are restricted to Level 4 members (Level 5 normal users cannot be assigned)
                  </span>
                </div>
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Priority Level</label>
                  <select
                    value={priority}
                    onChange={(e) => setPriority(e.target.value as ClubTask['priority'])}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:border-teal-600 focus:outline-none font-medium bg-white"
                  >
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                    <option value="urgent">Urgent</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Target Due Date</label>
                <input
                  type="date"
                  value={dueDate}
                  onChange={(e) => setDueDate(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:border-teal-600 focus:outline-none font-medium"
                  required
                />
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowCreateModal(false)}
                  className="px-4 py-2 rounded-xl text-slate-600 hover:bg-slate-100 font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-teal-800 text-white font-bold hover:bg-teal-900 transition-colors shadow-sm"
                >
                  Assign Task
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal: Member Submit Deliverable */}
      {submitTaskModal && (
        <div className="fixed inset-0 z-[100] bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-emerald-100">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-xl bg-purple-100 text-purple-800">
                  <Send size={18} />
                </div>
                <div>
                  <h3 className="text-base font-bold text-slate-900">Submit Completed Task</h3>
                  <p className="text-xs text-slate-500">{submitTaskModal.title}</p>
                </div>
              </div>
              <button
                onClick={() => setSubmitTaskModal(null)}
                className="text-slate-400 hover:text-slate-700 font-bold"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSubmitDeliverable} className="mt-4 space-y-3.5 text-xs">
              <div>
                <label className="font-bold text-slate-700 block mb-1">Work Note / Brief Summary</label>
                <textarea
                  value={submissionNote}
                  onChange={(e) => setSubmissionNote(e.target.value)}
                  placeholder="Describe your work, steps taken, or key observations..."
                  rows={3}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:border-teal-600 focus:outline-none"
                  required
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Asset URL / Google Drive Link (Optional)</label>
                <input
                  type="url"
                  value={submissionLink}
                  onChange={(e) => setSubmissionLink(e.target.value)}
                  placeholder="https://drive.google.com/..."
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:border-teal-600 focus:outline-none font-medium"
                />
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setSubmitTaskModal(null)}
                  className="px-4 py-2 rounded-xl text-slate-600 hover:bg-slate-100 font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-purple-700 text-white font-bold hover:bg-purple-800 transition-colors shadow-sm"
                >
                  Send for Lead Review
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
