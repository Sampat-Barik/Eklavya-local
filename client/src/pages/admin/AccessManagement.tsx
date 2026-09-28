import React, { useState, useMemo } from 'react';
import { useAuth } from '../../context/AuthContext';
import {
  Key,
  Plus,
  Ban,
  Check,
  Shield,
  Search,
  Filter,
  Trash2,
  Clock,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  History
} from 'lucide-react';
import type { UserRole, AdminModule, AdminAction, AllowedAdminUser } from '../../types/auth';
import { DEFAULT_ROLE_PERMISSIONS_FRONTEND } from '../../types/auth';

const ALL_ADMIN_MODULES: { key: AdminModule; label: string; availableActions: AdminAction[] }[] = [
  { key: 'dashboard', label: 'Dashboard', availableActions: ['view'] },
  { key: 'donations', label: 'Donations & Ledger', availableActions: ['view', 'create', 'edit', 'delete', 'export'] },
  { key: 'events', label: 'Events Management', availableActions: ['view', 'create', 'edit', 'delete', 'publish'] },
  { key: 'online_events', label: 'Online Events', availableActions: ['view', 'create', 'edit', 'delete', 'publish'] },
  { key: 'members', label: 'Club Members Roster', availableActions: ['view', 'create', 'edit', 'delete'] },
  { key: 'alumni', label: 'Alumni Network', availableActions: ['view', 'create', 'edit', 'delete'] },
  { key: 'teachers', label: 'Teachers', availableActions: ['view', 'create', 'edit', 'delete'] },
  { key: 'volunteers', label: 'Volunteers', availableActions: ['view', 'create', 'edit', 'delete'] },
  { key: 'attendance', label: 'Attendance', availableActions: ['view', 'create', 'edit', 'delete'] },
  { key: 'gd_schedule', label: 'GD Schedule', availableActions: ['view', 'create', 'edit', 'delete'] },
  { key: 've_schedule', label: 'VE Schedule', availableActions: ['view', 'create', 'edit', 'delete'] },
  { key: 'cw_schedule', label: 'CW Schedule', availableActions: ['view', 'create', 'edit', 'delete'] },
  { key: 'photo_schedule', label: 'Photo Schedule', availableActions: ['view', 'create', 'edit', 'delete'] },
  { key: 'send_email', label: 'Send Email', availableActions: ['view', 'send'] },
  { key: 'user_approvals', label: 'User Approvals', availableActions: ['view', 'approve'] },
  { key: 'certificates', label: 'Certificates', availableActions: ['view', 'create', 'edit', 'publish'] },
  { key: 'access_management', label: 'Access Management', availableActions: ['view', 'create', 'edit', 'delete', 'manage_users', 'manage_roles'] }
];

const ROLES_LIST: { role: UserRole; title: string; desc: string }[] = [
  { role: 'super_admin', title: 'Super Admin', desc: 'Unrestricted system access, manage allowed users & security settings' },
  { role: 'admin', title: 'Admin', desc: 'Full access to operational modules and member directories' },
  { role: 'events_manager', title: 'Events Manager', desc: 'Create, edit, publish physical and online events' },
  { role: 'content_manager', title: 'Content Manager', desc: 'Manage event schedules, group discussions, and photos' },
  { role: 'team_manager', title: 'Team Manager', desc: 'Manage club members roster and alumni network' },
  { role: 'education_manager', title: 'Education Manager', desc: 'Oversee teachers, volunteers, and attendance' },
  { role: 'communications_manager', title: 'Communications Manager', desc: 'Dispatch official emails and publish event alerts' },
  { role: 'finance_manager', title: 'Finance Manager', desc: 'View donation proofs, verify ledger, export records' },
  { role: 'viewer', title: 'Viewer', desc: 'Read-only dashboard overview' }
];

export const AccessManagement: React.FC = () => {
  const {
    user: currentUser,
    allowedUsers,
    auditLogs,
    addAllowedUser,
    updateAllowedUser,
    deleteAllowedUser,
    isSuperAdmin
  } = useAuth();

  const [activeTab, setActiveTab] = useState<'users' | 'audit'>('users');
  const [searchQuery, setSearchQuery] = useState('');
  const [roleFilter, setRoleFilter] = useState<string>('all');

  // Form State
  const [newName, setNewName] = useState('');
  const [newEmail, setNewEmail] = useState('');
  const [newRole, setNewRole] = useState<UserRole>('events_manager');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formFeedback, setFormFeedback] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  // Edit / Granular Drawer
  const [editingUserId, setEditingUserId] = useState<string | null>(null);

  // Confirmation Modal
  const [confirmDialog, setConfirmDialog] = useState<{
    isOpen: boolean;
    title: string;
    message: string;
    actionType: 'suspend' | 'reactivate' | 'delete';
    targetUser?: AllowedAdminUser;
  }>({
    isOpen: false,
    title: '',
    message: '',
    actionType: 'suspend'
  });

  // Filtered Users
  const filteredUsers = useMemo(() => {
    return allowedUsers.filter((u) => {
      const matchesQuery =
        u.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        u.email.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesRole = roleFilter === 'all' || u.role === roleFilter;
      return matchesQuery && matchesRole;
    });
  }, [allowedUsers, searchQuery, roleFilter]);

  if (!isSuperAdmin) {
    return (
      <div className="editorial-card p-12 text-center space-y-4 max-w-lg mx-auto my-12 border-rose-200 bg-rose-50/20">
        <div className="w-14 h-14 mx-auto rounded-2xl bg-rose-100 text-rose-700 flex items-center justify-center">
          <Shield size={28} />
        </div>
        <h2 className="text-xl font-serif font-black text-slate-900">Access Restricted</h2>
        <p className="text-sm text-slate-600 leading-relaxed">
          Access to this module is strictly restricted to Super Administrators. You do not possess the required privilege level to view or configure administrative accounts.
        </p>
      </div>
    );
  }

  const handleCreateAccount = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newEmail.trim() || !newName.trim()) return;

    setIsSubmitting(true);
    setFormFeedback(null);

    const result = await addAllowedUser({
      name: newName.trim(),
      email: newEmail.trim().toLowerCase(),
      role: newRole
    });

    setIsSubmitting(false);
    if (result.success) {
      setFormFeedback({ type: 'success', text: result.message });
      setNewName('');
      setNewEmail('');
      setTimeout(() => setFormFeedback(null), 5000);
    } else {
      setFormFeedback({ type: 'error', text: result.message });
    }
  };

  const handleConfirmAction = async () => {
    const { actionType, targetUser } = confirmDialog;
    if (!targetUser) return;

    if (actionType === 'suspend') {
      await updateAllowedUser(targetUser._id, { status: 'suspended' });
    } else if (actionType === 'reactivate') {
      await updateAllowedUser(targetUser._id, { status: 'active' });
    } else if (actionType === 'delete') {
      await deleteAllowedUser(targetUser._id);
    }

    setConfirmDialog((prev) => ({ ...prev, isOpen: false }));
  };

  const handleRoleChange = async (userId: string, role: UserRole) => {
    await updateAllowedUser(userId, { role });
  };

  const handleToggleActionPermission = async (
    targetUser: AllowedAdminUser,
    moduleKey: AdminModule,
    action: AdminAction
  ) => {
    const currentOverrides = targetUser.permissionsOverride || {};
    const defaultRolePerms = DEFAULT_ROLE_PERMISSIONS_FRONTEND[targetUser.role] || {};
    const effectiveModuleActions =
      currentOverrides[moduleKey] || defaultRolePerms[moduleKey] || [];

    const updatedModuleActions = effectiveModuleActions.includes(action)
      ? effectiveModuleActions.filter((a) => a !== action)
      : [...effectiveModuleActions, action];

    const updatedOverrides = {
      ...currentOverrides,
      [moduleKey]: updatedModuleActions
    };

    await updateAllowedUser(targetUser._id, {
      permissionsOverride: updatedOverrides
    });
  };

  return (
    <div className="space-y-8">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-5">
        <div className="flex items-center gap-3.5">
          <div className="relative w-12 h-12 rounded-2xl p-[2px] bg-gradient-to-tr from-amber-500 via-teal-600 to-emerald-500 shadow-md shadow-amber-500/10 flex items-center justify-center shrink-0">
            <div className="w-full h-full rounded-xl bg-white flex items-center justify-center p-0.5">
              <img
                src="/eklavya_logo.png"
                alt="Eklavya Super Admin Seal"
                className="w-full h-full object-contain"
              />
            </div>
            <div className="absolute -bottom-1 -right-1 p-1 bg-amber-500 text-white rounded-full shadow-xs">
              <Key size={11} />
            </div>
          </div>
          <div>
            <h1 className="text-2xl font-serif font-black text-slate-900 tracking-tight">
              Access Control & Permissions
            </h1>
            <p className="text-xs text-slate-500">
              Manage allowed administrators, assign roles, configure granular permissions, and inspect audit trails.
            </p>
          </div>
        </div>

        {/* Tab Switcher */}
        <div className="flex items-center p-1 bg-slate-100 rounded-xl self-start sm:self-auto">
          <button
            onClick={() => setActiveTab('users')}
            className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-2 ${
              activeTab === 'users'
                ? 'bg-white text-slate-900 shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Shield size={14} />
            <span>Allowed Accounts ({allowedUsers.length})</span>
          </button>
          <button
            onClick={() => setActiveTab('audit')}
            className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-2 ${
              activeTab === 'audit'
                ? 'bg-white text-slate-900 shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <History size={14} />
            <span>Security Audit Log</span>
          </button>
        </div>
      </div>

      {activeTab === 'users' ? (
        <>
          {/* Authorize New Gmail Account Form */}
          <div className="editorial-card p-6 border-blue-200 bg-gradient-to-br from-white via-blue-50/10 to-indigo-50/20 space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                <Plus size={16} className="text-blue-600" />
                <span>Authorize & Invite Administrator by Gmail</span>
              </h2>
              <span className="text-[11px] font-semibold text-blue-700 bg-blue-100/60 px-2.5 py-0.5 rounded-full">
                Super Admin Privilege
              </span>
            </div>

            {formFeedback && (
              <div
                className={`p-3 rounded-xl text-xs flex items-center gap-2 font-medium ${
                  formFeedback.type === 'success'
                    ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                    : 'bg-rose-50 text-rose-800 border border-rose-200'
                }`}
              >
                {formFeedback.type === 'success' ? (
                  <CheckCircle2 size={16} className="text-emerald-600 flex-shrink-0" />
                ) : (
                  <AlertTriangle size={16} className="text-rose-600 flex-shrink-0" />
                )}
                <span>{formFeedback.text}</span>
              </div>
            )}

            <form onSubmit={handleCreateAccount} className="grid grid-cols-1 sm:grid-cols-12 gap-3 items-end">
              <div className="sm:col-span-4 space-y-1">
                <label className="text-xs font-semibold text-slate-700">Full Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Suman Roy"
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  className="w-full px-3 py-2 bg-white border border-slate-300 rounded-xl text-xs text-slate-900 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                />
              </div>

              <div className="sm:col-span-4 space-y-1">
                <label className="text-xs font-semibold text-slate-700">Google Account / Gmail</label>
                <input
                  type="email"
                  required
                  placeholder="username@gmail.com"
                  value={newEmail}
                  onChange={(e) => setNewEmail(e.target.value)}
                  className="w-full px-3 py-2 bg-white border border-slate-300 rounded-xl text-xs text-slate-900 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                />
              </div>

              <div className="sm:col-span-2 space-y-1">
                <label className="text-xs font-semibold text-slate-700">Assigned Role</label>
                <select
                  value={newRole}
                  onChange={(e) => setNewRole(e.target.value as UserRole)}
                  className="w-full px-3 py-2 bg-white border border-slate-300 rounded-xl text-xs font-medium text-slate-900 focus:outline-none focus:border-blue-500"
                >
                  {ROLES_LIST.map((r) => (
                    <option key={r.role} value={r.role}>
                      {r.title}
                    </option>
                  ))}
                </select>
              </div>

              <div className="sm:col-span-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-sm transition-all flex items-center justify-center gap-1.5 disabled:opacity-50"
                >
                  <Plus size={14} />
                  <span>{isSubmitting ? 'Granting...' : 'Grant Access'}</span>
                </button>
              </div>
            </form>
          </div>

          {/* Directory Toolbar */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="relative flex-1 max-w-sm">
              <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="Search by name or email..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-3 py-2 bg-white border border-slate-200 rounded-xl text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-blue-500"
              />
            </div>

            <div className="flex items-center gap-2">
              <Filter size={14} className="text-slate-500" />
              <select
                value={roleFilter}
                onChange={(e) => setRoleFilter(e.target.value)}
                className="px-3 py-1.5 bg-white border border-slate-200 rounded-xl text-xs font-medium text-slate-700 focus:outline-none"
              >
                <option value="all">All Roles ({allowedUsers.length})</option>
                {ROLES_LIST.map((r) => (
                  <option key={r.role} value={r.role}>
                    {r.title}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Allowed Users List */}
          <div className="space-y-4">
            {filteredUsers.length === 0 ? (
              <div className="editorial-card p-8 text-center text-slate-500 text-xs">
                No accounts match the current filter criteria.
              </div>
            ) : (
              filteredUsers.map((u) => {
                const isCurrentSelf = currentUser?.email.toLowerCase() === u.email.toLowerCase();
                const isEditing = editingUserId === u._id;
                const isSuspended = u.status === 'suspended';

                return (
                  <div
                    key={u._id}
                    className={`editorial-card p-5 space-y-4 transition-all ${
                      isSuspended ? 'border-rose-300 bg-rose-50/10' : 'bg-white hover:border-slate-300'
                    }`}
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                      <div className="flex items-center gap-3.5">
                        <div className="w-11 h-11 rounded-xl bg-slate-100 flex items-center justify-center font-bold text-slate-800 text-sm border border-slate-200">
                          {u.name.charAt(0).toUpperCase()}
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-bold text-sm text-slate-900">{u.name}</span>
                            {isCurrentSelf && (
                              <span className="text-[10px] font-bold uppercase bg-blue-100 text-blue-800 px-2 py-0.5 rounded-md">
                                You
                              </span>
                            )}
                            {isSuspended ? (
                              <span className="text-[10px] font-black uppercase bg-rose-100 text-rose-700 px-2 py-0.5 rounded-md">
                                Suspended
                              </span>
                            ) : (
                              <span className="text-[10px] font-black uppercase bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-md">
                                Active
                              </span>
                            )}
                          </div>
                          <div className="text-xs text-slate-500 flex items-center gap-2 mt-0.5">
                            <span>{u.email}</span>
                            {u.lastLoginAt && (
                              <>
                                <span>•</span>
                                <span className="flex items-center gap-1 text-[11px] text-slate-400">
                                  <Clock size={11} />
                                  <span>Active: {new Date(u.lastLoginAt).toLocaleDateString()}</span>
                                </span>
                              </>
                            )}
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center flex-wrap gap-2.5">
                        {/* Role Selector */}
                        <select
                          value={u.role}
                          disabled={isCurrentSelf && u.role === 'super_admin'}
                          onChange={(e) => handleRoleChange(u._id, e.target.value as UserRole)}
                          className="px-3 py-1.5 bg-slate-50 border border-slate-300 rounded-lg text-xs font-bold text-slate-800 focus:outline-none focus:border-blue-500 disabled:opacity-50"
                        >
                          {ROLES_LIST.map((r) => (
                            <option key={r.role} value={r.role}>
                              {r.title}
                            </option>
                          ))}
                        </select>

                        {/* Granular Action Checkboxes Toggle */}
                        <button
                          onClick={() => setEditingUserId(isEditing ? null : u._id)}
                          className={`px-3 py-1.5 rounded-lg border text-xs font-semibold transition-all ${
                            isEditing
                              ? 'bg-blue-50 text-blue-700 border-blue-300 font-bold'
                              : 'border-slate-200 text-slate-700 hover:bg-slate-100'
                          }`}
                        >
                          {isEditing ? 'Close Matrix' : 'Granular Permissions'}
                        </button>

                        {/* Suspend / Reactivate Action */}
                        {!isCurrentSelf && (
                          <button
                            onClick={() =>
                              setConfirmDialog({
                                isOpen: true,
                                title: isSuspended ? 'Reactivate Account?' : 'Suspend Account?',
                                message: isSuspended
                                  ? `Are you sure you want to restore administrative access for ${u.name} (${u.email})?`
                                  : `Suspending ${u.name} will immediately revoke their ability to access the admin panel and perform backend actions.`,
                                actionType: isSuspended ? 'reactivate' : 'suspend',
                                targetUser: u
                              })
                            }
                            className={`p-1.5 rounded-lg border text-xs font-semibold transition-colors ${
                              isSuspended
                                ? 'bg-emerald-50 text-emerald-700 border-emerald-300 hover:bg-emerald-100'
                                : 'bg-amber-50 text-amber-700 border-amber-300 hover:bg-amber-100'
                            }`}
                            title={isSuspended ? 'Reactivate' : 'Suspend Account'}
                          >
                            <Ban size={15} />
                          </button>
                        )}

                        {/* Delete User Action */}
                        {!isCurrentSelf && (
                          <button
                            onClick={() =>
                              setConfirmDialog({
                                isOpen: true,
                                title: 'Remove Authorized Account?',
                                message: `Are you sure you want to permanently remove ${u.name} (${u.email}) from allowed admins?`,
                                actionType: 'delete',
                                targetUser: u
                              })
                            }
                            className="p-1.5 rounded-lg border border-rose-200 bg-rose-50 text-rose-700 hover:bg-rose-100 transition-colors"
                            title="Remove Account"
                          >
                            <Trash2 size={15} />
                          </button>
                        )}
                      </div>
                    </div>

                    {/* Granular Action Checkbox Matrix when expanded */}
                    {isEditing && (
                      <div className="pt-4 border-t border-slate-100 space-y-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <span className="text-xs font-bold text-slate-900 block">
                              Granular Module & Action Permissions for {u.name}
                            </span>
                            <span className="text-[11px] text-slate-500">
                              Checked actions represent explicitly permitted operations for this user.
                            </span>
                          </div>
                          {u.role === 'super_admin' && (
                            <span className="text-[11px] font-bold text-purple-700 bg-purple-100 px-2 py-0.5 rounded-md">
                              Super Admin: All Permissions Automatically Granted
                            </span>
                          )}
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                          {ALL_ADMIN_MODULES.map((mod) => {
                            const defaultPerms = DEFAULT_ROLE_PERMISSIONS_FRONTEND[u.role] || {};
                            const currentModuleActions =
                              u.permissionsOverride?.[mod.key] || defaultPerms[mod.key] || [];

                            return (
                              <div
                                key={mod.key}
                                className="p-3 rounded-xl border border-slate-200 bg-slate-50/60 space-y-2"
                              >
                                <span className="text-xs font-bold text-slate-800 block">
                                  {mod.label}
                                </span>
                                <div className="flex flex-wrap gap-1.5">
                                  {mod.availableActions.map((action) => {
                                    const isPermitted =
                                      u.role === 'super_admin' || currentModuleActions.includes(action);

                                    return (
                                      <button
                                        key={action}
                                        type="button"
                                        disabled={u.role === 'super_admin'}
                                        onClick={() => handleToggleActionPermission(u, mod.key, action)}
                                        className={`px-2 py-1 rounded-md text-[10px] font-bold uppercase transition-all flex items-center gap-1 ${
                                          isPermitted
                                            ? 'bg-blue-600 text-white shadow-xs'
                                            : 'bg-white border border-slate-200 text-slate-500 hover:bg-slate-100'
                                        } disabled:opacity-75`}
                                      >
                                        {isPermitted && <Check size={10} />}
                                        <span>{action.replace('_', ' ')}</span>
                                      </button>
                                    );
                                  })}
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    )}
                  </div>
                );
              })
            )}
          </div>
        </>
      ) : (
        /* Security Audit Log Trail */
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-bold text-slate-900">Recorded Security & Administrative Events</h2>
            <span className="text-xs text-slate-500 font-medium">{auditLogs.length} total entries</span>
          </div>

          <div className="editorial-card overflow-hidden border-slate-200 bg-white w-full max-w-full">
            {/* Mobile Horizontal Scroll Indicator */}
            <div className="sm:hidden px-4 py-2 bg-slate-50 border-b border-slate-100 text-[11px] text-slate-700 font-mono flex items-center justify-between font-bold">
              <span>Swipe horizontally to view full security audit trail</span>
              <span>⇄</span>
            </div>
            <div className="overflow-x-auto w-full max-w-full horizontal-scroll-container overscroll-x-contain pb-1">
              <table className="w-full min-w-[650px] text-left text-xs">
                <thead className="bg-slate-50 text-slate-600 border-b border-slate-200 font-bold uppercase text-[10px]">
                  <tr>
                    <th className="py-3 px-4">Timestamp</th>
                    <th className="py-3 px-4">Actor</th>
                    <th className="py-3 px-4">Action</th>
                    <th className="py-3 px-4">Target Resource</th>
                    <th className="py-3 px-4">Result</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {auditLogs.map((log, index) => {
                    const isSuccess = log.result === 'success';
                    return (
                      <tr key={log._id || index} className="hover:bg-slate-50/70 transition-colors">
                        <td className="py-3 px-4 text-slate-500 font-mono text-[11px] whitespace-nowrap">
                          {new Date(log.timestamp).toLocaleString()}
                        </td>
                        <td className="py-3 px-4">
                          <span className="font-bold text-slate-900 block">{log.actorName}</span>
                          <span className="text-[11px] text-slate-400 font-mono">{log.actorEmail}</span>
                        </td>
                        <td className="py-3 px-4">
                          <span className="font-mono text-[11px] font-bold text-slate-800 bg-slate-100 px-2 py-0.5 rounded">
                            {log.action}
                          </span>
                        </td>
                        <td className="py-3 px-4 text-slate-600 font-mono text-[11px]">
                          {log.targetResource}
                        </td>
                        <td className="py-3 px-4">
                          <span
                            className={`inline-flex items-center gap-1 font-bold text-[10px] uppercase px-2 py-0.5 rounded ${
                              isSuccess
                                ? 'bg-emerald-100 text-emerald-800'
                                : 'bg-rose-100 text-rose-800'
                            }`}
                          >
                            {isSuccess ? <CheckCircle2 size={11} /> : <XCircle size={11} />}
                            <span>{log.result}</span>
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Confirmation Dialog Modal */}
      {confirmDialog.isOpen && confirmDialog.targetUser && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
          <div className="editorial-card p-6 max-w-md w-full bg-white space-y-4 shadow-xl border-slate-200">
            <div className="flex items-center gap-3">
              <div
                className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                  confirmDialog.actionType === 'delete'
                    ? 'bg-rose-100 text-rose-700'
                    : confirmDialog.actionType === 'suspend'
                    ? 'bg-amber-100 text-amber-700'
                    : 'bg-emerald-100 text-emerald-700'
                }`}
              >
                <AlertTriangle size={20} />
              </div>
              <h3 className="text-base font-bold text-slate-900">{confirmDialog.title}</h3>
            </div>

            <p className="text-xs text-slate-600 leading-relaxed">{confirmDialog.message}</p>

            <div className="flex items-center justify-end gap-2.5 pt-2">
              <button
                type="button"
                onClick={() => setConfirmDialog((prev) => ({ ...prev, isOpen: false }))}
                className="px-4 py-2 rounded-xl border border-slate-200 text-xs font-semibold text-slate-700 hover:bg-slate-100 transition-colors"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleConfirmAction}
                className={`px-4 py-2 rounded-xl text-xs font-bold text-white shadow-sm transition-colors ${
                  confirmDialog.actionType === 'delete'
                    ? 'bg-rose-600 hover:bg-rose-700'
                    : confirmDialog.actionType === 'suspend'
                    ? 'bg-amber-600 hover:bg-amber-700'
                    : 'bg-emerald-600 hover:bg-emerald-700'
                }`}
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AccessManagement;
