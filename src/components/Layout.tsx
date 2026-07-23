import { NavLink, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { useTheme } from '@/context/ThemeContext';
import { initials } from '@/lib/format';
import { IconGrid, IconUsers, IconCar, IconLogout, IconBell, IconSun, IconMoon } from './icons';

const NAV = [
  { to: '/', label: 'Dashboard', Icon: IconGrid, end: true },
  { to: '/users', label: 'Users', Icon: IconUsers },
  { to: '/drivers', label: 'Drivers', Icon: IconCar },
];

function titleFor(pathname: string) {
  if (pathname.startsWith('/users')) return 'User Management';
  if (pathname.startsWith('/drivers')) return 'Driver Management';
  return 'Performance Intelligence';
}

export function Layout() {
  const { admin, logout } = useAuth();
  const { theme, toggle } = useTheme();
  const { pathname } = useLocation();
  const isDark = theme === 'dark';

  return (
    <div className="app-shell">
      <aside className="sidebar">
        <div className="brand">
          <div className="brand-name">
            Driver<span>Dost</span>
          </div>
          <div className="brand-sub">ADMIN PANEL</div>
        </div>

        <nav className="nav">
          {NAV.map(({ to, label, Icon, end }) => (
            <NavLink key={to} to={to} end={end} className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
              <Icon size={18} />
              <span>{label}</span>
            </NavLink>
          ))}
        </nav>

        <button className="nav-link nav-logout" onClick={logout}>
          <IconLogout size={18} />
          <span>Logout</span>
        </button>
      </aside>

      <div className="main">
        <header className="topbar">
          <div className="topbar-title">{titleFor(pathname)}</div>
          <div className="who">
            <div className="who-meta">
              <div className="who-name">{admin?.name || 'Admin User'}</div>
              <div className="who-email">{admin?.email}</div>
            </div>
            <div className="avatar-sm">{initials(admin?.name || admin?.email || 'A')}</div>
            <button className="icon-btn" title="Notifications">
              <IconBell size={19} />
            </button>
            <button
              className="icon-btn"
              onClick={toggle}
              title={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
              aria-label="Toggle theme"
            >
              {isDark ? <IconSun size={19} /> : <IconMoon size={19} />}
            </button>
          </div>
        </header>

        <main className="content">
          <Outlet />
        </main>

        <footer className="footer">
          <span>© 2026 DriverDost Technologies · Powered by DriverDost Intelligence.</span>
          <span className="footer-links">
            <span>Privacy Policy</span>
            <span>Terms of Service</span>
            <span>System Status</span>
          </span>
        </footer>
      </div>
    </div>
  );
}
