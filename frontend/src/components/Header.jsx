import { NavLink } from 'react-router-dom';
import { CloudSun, History, Sun, Moon } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

export default function Header() {
  const { isDark, toggle } = useTheme();

  return (
    <header
      className="sticky top-0 z-40 backdrop-blur-md border-b"
      style={{ background: 'color-mix(in srgb, var(--bg-page) 85%, transparent)', borderColor: 'var(--border)' }}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div
            className="w-9 h-9 rounded-xl flex items-center justify-center shadow-sm"
            style={{ background: 'linear-gradient(135deg, var(--accent-blue), var(--accent-teal))' }}
          >
            <CloudSun size={20} color="white" strokeWidth={2.2} />
          </div>
          <span className="font-bold text-lg tracking-tight" style={{ color: 'var(--text-primary)' }}>
            Weather<span className="gradient-text">Intel</span>
          </span>
        </div>

        <nav className="flex items-center gap-1 sm:gap-2">
          <NavLink
            to="/"
            end
            className={({ isActive }) =>
              `px-3 py-2 rounded-lg text-sm font-medium flex items-center gap-1.5 transition-colors`
            }
            style={({ isActive }) => ({
              color: isActive ? 'var(--accent-blue)' : 'var(--text-secondary)',
              background: isActive ? 'var(--accent-blue-light)' : 'transparent',
            })}
          >
            <CloudSun size={16} />
            <span className="hidden sm:inline">Dashboard</span>
          </NavLink>
          <NavLink
            to="/history"
            className={({ isActive }) => `px-3 py-2 rounded-lg text-sm font-medium flex items-center gap-1.5 transition-colors`}
            style={({ isActive }) => ({
              color: isActive ? 'var(--accent-blue)' : 'var(--text-secondary)',
              background: isActive ? 'var(--accent-blue-light)' : 'transparent',
            })}
          >
            <History size={16} />
            <span className="hidden sm:inline">History</span>
          </NavLink>

          <button
            onClick={toggle}
            className="ml-1 w-9 h-9 rounded-lg flex items-center justify-center btn-secondary !p-0"
            aria-label="Toggle dark mode"
            title="Toggle theme"
          >
            {isDark ? <Sun size={16} /> : <Moon size={16} />}
          </button>
        </nav>
      </div>
    </header>
  );
}
