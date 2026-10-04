import { lazy, Suspense } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

// Layouts
import { PublicLayout } from './layouts/PublicLayout';
import { AdminLayout } from './layouts/AdminLayout';
import { UserPortalLayout } from './layouts/UserPortalLayout';

// Guards
import { RoleGuard } from './components/auth/RoleGuard';
import { PortalGuard } from './components/auth/PortalGuard';
import { DemoRoleSwitcher } from './components/auth/DemoRoleSwitcher';

// Public & Member Pages (Lazy Loaded for Optimal Bundle Splitting)
const Home = lazy(() => import('./pages/Home').then((m) => ({ default: m.Home })));
const Vision = lazy(() => import('./pages/Vision').then((m) => ({ default: m.Vision })));
const Faculty = lazy(() => import('./pages/Faculty').then((m) => ({ default: m.Faculty })));
const Members = lazy(() => import('./pages/Members').then((m) => ({ default: m.Members })));
const Alumni = lazy(() => import('./pages/Alumni').then((m) => ({ default: m.Alumni })));
const OurWork = lazy(() => import('./pages/OurWork').then((m) => ({ default: m.OurWork })));
const Events = lazy(() => import('./pages/Events').then((m) => ({ default: m.Events })));
const Donate = lazy(() => import('./pages/Donate').then((m) => ({ default: m.Donate })));
const Login = lazy(() => import('./pages/Login').then((m) => ({ default: m.Login })));
const Register = lazy(() => import('./pages/Register').then((m) => ({ default: m.Register })));
const CampusIntake = lazy(() => import('./pages/CampusIntake').then((m) => ({ default: m.CampusIntake })));
const CorporatePartnerships = lazy(() => import('./pages/CorporatePartnerships').then((m) => ({ default: m.CorporatePartnerships })));
const AccessDenied = lazy(() => import('./pages/AccessDenied').then((m) => ({ default: m.AccessDenied })));

// Standalone Pages (no PublicLayout chrome)
const LithosHero = lazy(() => import('./pages/LithosHero').then((m) => ({ default: m.LithosHero })));

// User Portal Pages (Lazy Loaded)
const PortalDashboard = lazy(() => import('./pages/portal/PortalDashboard').then((m) => ({ default: m.PortalDashboard })));
const PortalProfile = lazy(() => import('./pages/portal/PortalProfile').then((m) => ({ default: m.PortalProfile })));
const PortalEvents = lazy(() => import('./pages/portal/PortalEvents').then((m) => ({ default: m.PortalEvents })));
const PortalAttendance = lazy(() => import('./pages/portal/PortalAttendance').then((m) => ({ default: m.PortalAttendance })));
const PortalCertificates = lazy(() => import('./pages/portal/PortalCertificates').then((m) => ({ default: m.PortalCertificates })));
const PortalAnnouncements = lazy(() => import('./pages/portal/PortalAnnouncements').then((m) => ({ default: m.PortalAnnouncements })));
const PortalDonations = lazy(() => import('./pages/portal/PortalDonations').then((m) => ({ default: m.PortalDonations })));
const DomainTaskHub = lazy(() => import('./pages/portal/DomainTaskHub').then((m) => ({ default: m.DomainTaskHub })));

// Admin Pages (Lazy Loaded)
const AdminDashboard = lazy(() => import('./pages/admin/AdminDashboard').then((m) => ({ default: m.AdminDashboard })));
const DonationsAdmin = lazy(() => import('./pages/admin/DonationsAdmin').then((m) => ({ default: m.DonationsAdmin })));
const EventsAdmin = lazy(() => import('./pages/admin/EventsAdmin').then((m) => ({ default: m.EventsAdmin })));
const UserApprovals = lazy(() => import('./pages/admin/UserApprovals').then((m) => ({ default: m.UserApprovals })));
const AccessManagement = lazy(() => import('./pages/admin/AccessManagement').then((m) => ({ default: m.AccessManagement })));
const SchedulesLayout = lazy(() => import('./pages/admin/SchedulesLayout').then((m) => ({ default: m.SchedulesLayout })));
const AdminModulePlaceholder = lazy(() => import('./pages/admin/AdminModulePlaceholder').then((m) => ({ default: m.AdminModulePlaceholder })));

// Fast, non-blocking branded fallback loader
const RouteLoader = () => (
  <div className="min-h-[50vh] flex flex-col items-center justify-center gap-3">
    <div className="relative w-9 h-9">
      <div className="w-9 h-9 rounded-full border-2 border-emerald-100 border-t-teal-700 animate-spin" />
    </div>
    <span className="text-xs font-semibold text-teal-800 tracking-wide">Loading...</span>
  </div>
);

function App() {
  return (
    <Suspense fallback={<RouteLoader />}>
      <Routes>
        {/* ========================================================================= */}
        {/* 0. STANDALONE PAGES (No PublicLayout — full-screen, no global chrome)     */}
        {/* ========================================================================= */}
        <Route path="/lithos" element={<LithosHero />} />

        {/* ========================================================================= */}
        {/* 1. PUBLIC & MEMBER LAYERS (Uses Public Navbar + Footer)                  */}
        {/* ========================================================================= */}
        <Route element={<PublicLayout />}>
          {/* Public Visitor Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/vision" element={<Vision />} />
          <Route path="/about" element={<Vision />} />
          <Route path="/faculty" element={<Faculty />} />
          <Route path="/members" element={<Members />} />
          <Route path="/alumni" element={<Alumni />} />
          <Route path="/our-work" element={<OurWork />} />
          <Route path="/work" element={<OurWork />} />
          <Route path="/programs" element={<OurWork />} />
          <Route path="/events" element={<Events />} />
          <Route path="/donate" element={<Donate />} />
          <Route path="/help-us" element={<Donate />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/recruitment" element={<CampusIntake />} />
          <Route path="/campus-intake" element={<CampusIntake />} />
          <Route path="/apply" element={<CampusIntake />} />
          <Route path="/corporate-partnerships" element={<CorporatePartnerships />} />
          <Route path="/csr" element={<CorporatePartnerships />} />
          <Route path="/partnerships" element={<CorporatePartnerships />} />

          {/* Club Member Layer (Redirect to dedicated /portal/profile) */}
          <Route path="/profile" element={<Navigate to="/portal/profile" replace />} />

          {/* Access Denied Route */}
          <Route path="/access-denied" element={<AccessDenied />} />

          {/* 404 Page */}
          <Route
            path="*"
            element={
              <div className="text-center py-32 space-y-4">
                <h1 className="text-5xl font-black text-slate-900">404</h1>
                <p className="text-slate-500 text-sm">Page Not Found</p>
              </div>
            }
          />
        </Route>

        {/* ========================================================================= */}
        {/* 2. USER PORTAL LAYER (Dedicated Authenticated Member Portal)              */}
        {/* ========================================================================= */}
        <Route
          path="/portal"
          element={
            <PortalGuard>
              <UserPortalLayout />
            </PortalGuard>
          }
        >
          <Route index element={<PortalDashboard />} />
          <Route path="dashboard" element={<PortalDashboard />} />
          <Route path="profile" element={<PortalProfile />} />
          <Route path="events" element={<PortalEvents />} />
          <Route path="attendance" element={<PortalAttendance />} />
          <Route path="certificates" element={<PortalCertificates />} />
          <Route path="announcements" element={<PortalAnnouncements />} />
          <Route path="donations" element={<PortalDonations />} />
          <Route path="domain-hub" element={<DomainTaskHub />} />
          <Route path="tasks" element={<DomainTaskHub />} />
        </Route>

        {/* ========================================================================= */}
        {/* 3. ADMIN LAYER (Dedicated Admin Panel with Sidebar Shell)                */}
        {/* ========================================================================= */}
        <Route
          path="/admin"
          element={
            <RoleGuard>
              <AdminLayout />
            </RoleGuard>
          }
        >
          {/* Main Dashboard */}
          <Route index element={<AdminDashboard />} />
          <Route path="dashboard" element={<AdminDashboard />} />

          {/* Donations & Ledger Module */}
          <Route
            path="donations"
            element={
              <RoleGuard requiredModule="donations">
                <DonationsAdmin />
              </RoleGuard>
            }
          />

          {/* Events Module */}
          <Route
            path="events"
            element={
              <RoleGuard requiredModule="events">
                <EventsAdmin />
              </RoleGuard>
            }
          />

          {/* Online Events Module */}
          <Route
            path="online-events"
            element={
              <RoleGuard requiredModule="online_events">
                <AdminModulePlaceholder
                  title="Online Events & Webinars"
                  subtitle="Manage Google Meet / Zoom society links and live broadcasts."
                  actionLabel="Schedule Online Session"
                />
              </RoleGuard>
            }
          />

          {/* Members Management Module */}
          <Route
            path="members"
            element={
              <RoleGuard requiredModule="members">
                <AdminModulePlaceholder
                  title="Club Members Management"
                  subtitle="Manage registered student members, batch coordinators, and teams."
                  actionLabel="Add Member"
                />
              </RoleGuard>
            }
          />

          {/* Alumni Management Module */}
          <Route
            path="alumni"
            element={
              <RoleGuard requiredModule="alumni">
                <AdminModulePlaceholder
                  title="Alumni Network & Directory"
                  subtitle="Maintain records of past society presidents, coordinators, and corporate mentors."
                  actionLabel="Add Alumni"
                />
              </RoleGuard>
            }
          />

          {/* Teachers Module */}
          <Route
            path="teachers"
            element={
              <RoleGuard requiredModule="teachers">
                <AdminModulePlaceholder
                  title="Faculty & Teachers Network"
                  subtitle="Oversee departmental faculty advisors and coordinators."
                  actionLabel="Assign Teacher Advisor"
                />
              </RoleGuard>
            }
          />

          {/* Volunteers Module */}
          <Route
            path="volunteers"
            element={
              <RoleGuard requiredModule="volunteers">
                <AdminModulePlaceholder
                  title="Volunteers Roster"
                  subtitle="Track student volunteers enrolled across rural teaching and animal feeding squads."
                  actionLabel="Enroll Volunteer"
                />
              </RoleGuard>
            }
          />

          {/* Attendance Module */}
          <Route
            path="attendance"
            element={
              <RoleGuard requiredModule="attendance">
                <AdminModulePlaceholder
                  title="Attendance System"
                  subtitle="Record student presence for daily village evening classes and camps."
                  actionLabel="Log Day Attendance"
                />
              </RoleGuard>
            }
          />

          {/* Unified Schedules Module */}
          <Route
            path="schedules"
            element={
              <RoleGuard anyOfModules={['gd_schedule', 've_schedule', 'cw_schedule', 'photo_schedule']}>
                <SchedulesLayout />
              </RoleGuard>
            }
          />
          <Route path="schedules/gd" element={<Navigate to="/admin/schedules?tab=gd" replace />} />
          <Route path="schedules/ve" element={<Navigate to="/admin/schedules?tab=ve" replace />} />
          <Route path="schedules/cw" element={<Navigate to="/admin/schedules?tab=cw" replace />} />
          <Route path="schedules/photo" element={<Navigate to="/admin/schedules?tab=photo" replace />} />

          {/* Send Email Module */}
          <Route
            path="send-email"
            element={
              <RoleGuard requiredModule="send_email">
                <AdminModulePlaceholder
                  title="Send Society Email"
                  subtitle="Send newsletter updates and batch announcements to registered student members."
                  actionLabel="Compose Email"
                />
              </RoleGuard>
            }
          />

          {/* User Approvals Module (Super Admin Only) */}
          <Route
            path="approvals"
            element={
              <RoleGuard allowedRoles={['super_admin']} requiredModule="user_approvals">
                <UserApprovals />
              </RoleGuard>
            }
          />

          {/* Certificate Module */}
          <Route
            path="certificates"
            element={
              <RoleGuard requiredModule="certificates">
                <AdminModulePlaceholder
                  title="Certificates Issuance"
                  subtitle="Generate and dispatch verified volunteer commendation certificates."
                  actionLabel="Issue New Certificate"
                />
              </RoleGuard>
            }
          />

          {/* Access Management Module (Super Admin Only) */}
          <Route
            path="access-management"
            element={
              <RoleGuard allowedRoles={['super_admin']}>
                <AccessManagement />
              </RoleGuard>
            }
          />
        </Route>
      </Routes>
      <DemoRoleSwitcher />
    </Suspense>
  );
}

export default App;
