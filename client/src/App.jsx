import React, { useState, useEffect, createContext, useContext } from 'react';
import { SessionProvider } from './contexts/SessionContext.jsx';
import { Header } from './components/layout/Header.jsx';
import { Sidebar } from './components/layout/Sidebar.jsx';
import { MainContent } from './components/layout/MainContent.jsx';
import { MobileNav } from './components/layout/MobileNav.jsx';
import './styles.css';
import './mobile-first-enhancements.css';

// Available color themes with light and dark variants
export const colorThemes = {
  indigo: {
    name: 'Indigo',
    light: { primary: '#6366f1', primaryHover: '#4f46e5' },
    dark: { primary: '#818cf8', primaryHover: '#a5b4fc' }
  },
  blue: {
    name: 'Blue',
    light: { primary: '#3b82f6', primaryHover: '#2563eb' },
    dark: { primary: '#60a5fa', primaryHover: '#93c5fd' }
  },
  emerald: {
    name: 'Emerald',
    light: { primary: '#10b981', primaryHover: '#059669' },
    dark: { primary: '#34d399', primaryHover: '#6ee7b7' }
  },
  rose: {
    name: 'Rose',
    light: { primary: '#f43f5e', primaryHover: '#e11d48' },
    dark: { primary: '#fb7185', primaryHover: '#fda4af' }
  },
  amber: {
    name: 'Amber',
    light: { primary: '#f59e0b', primaryHover: '#d97706' },
    dark: { primary: '#fbbf24', primaryHover: '#fcd34d' }
  },
  violet: {
    name: 'Violet',
    light: { primary: '#8b5cf6', primaryHover: '#7c3aed' },
    dark: { primary: '#a78bfa', primaryHover: '#c4b5fd' }
  }
};

// Theme context
const ThemeContext = createContext();

export function useTheme() {
  return useContext(ThemeContext);
}

function App() {
  const [theme, setTheme] = useState(() => {
    const saved = localStorage.getItem('discovery-guide-theme');
    return saved || 'light';
  });

  const [colorTheme, setColorTheme] = useState(() => {
    const saved = localStorage.getItem('discovery-guide-color');
    return saved || 'indigo';
  });

  const [showSettings, setShowSettings] = useState(false);
  const [activeView, setActiveView] = useState('learn'); // 'learn' | 'drill' | 'practice' | 'analyze'

  useEffect(() => {
    localStorage.setItem('discovery-guide-theme', theme);
  }, [theme]);

  useEffect(() => {
    localStorage.setItem('discovery-guide-color', colorTheme);
  }, [colorTheme]);

  // Apply color theme based on both color selection and light/dark mode
  useEffect(() => {
    const colors = colorThemes[colorTheme];
    if (colors) {
      const variant = theme === 'dark' ? colors.dark : colors.light;
      document.documentElement.style.setProperty('--color-primary', variant.primary);
      document.documentElement.style.setProperty('--color-primary-hover', variant.primaryHover);
      document.documentElement.style.setProperty('--color-primary-light', `${variant.primary}1a`);
      document.documentElement.style.setProperty('--color-primary-glow', `${variant.primary}40`);
      document.documentElement.style.setProperty('--bg-active', `${variant.primary}15`);
      // Update chat gradient
      document.documentElement.style.setProperty('--chat-user-bg', `linear-gradient(135deg, ${variant.primary} 0%, ${variant.primaryHover} 100%)`);
    }
  }, [colorTheme, theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  return (
    <ThemeContext.Provider value={{
      theme,
      toggleTheme,
      colorTheme,
      setColorTheme,
      showSettings,
      setShowSettings,
      activeView,
      setActiveView
    }}>
      <SessionProvider>
        <div className={`app ${theme}`}>
          <Header />
          <div className="app-body">
            {activeView === 'practice' && <Sidebar />}
            <MainContent />
          </div>
          <MobileNav />
          {showSettings && (
            <SettingsModal onClose={() => setShowSettings(false)} />
          )}
        </div>
      </SessionProvider>
    </ThemeContext.Provider>
  );
}

function SettingsModal({ onClose }) {
  const { theme, toggleTheme, colorTheme, setColorTheme } = useTheme();

  return (
    <div className="settings-overlay" onClick={onClose}>
      <div className="settings-modal" onClick={e => e.stopPropagation()}>
        <div className="settings-header">
          <h2>Settings</h2>
          <button className="settings-close" onClick={onClose}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="18" y1="6" x2="6" y2="18"/>
              <line x1="6" y1="6" x2="18" y2="18"/>
            </svg>
          </button>
        </div>

        <div className="settings-content">
          <div className="settings-section">
            <h3>Appearance</h3>
            <div className="settings-row">
              <span className="settings-label">Dark Mode</span>
              <button
                className={`toggle-switch ${theme === 'dark' ? 'active' : ''}`}
                onClick={toggleTheme}
              >
                <span className="toggle-slider" />
              </button>
            </div>
          </div>

          <div className="settings-section">
            <h3>Color Theme</h3>
            <div className="color-theme-grid">
              {Object.entries(colorThemes).map(([key, value]) => (
                <button
                  key={key}
                  className={`color-theme-option ${colorTheme === key ? 'selected' : ''}`}
                  onClick={() => setColorTheme(key)}
                  style={{ '--theme-color': theme === 'dark' ? value.dark.primary : value.light.primary }}
                >
                  <span className="color-swatch" style={{ background: theme === 'dark' ? value.dark.primary : value.light.primary }} />
                  <span className="color-name">{value.name}</span>
                  {colorTheme === key && (
                    <svg className="color-check" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                      <polyline points="20 6 9 17 4 12"/>
                    </svg>
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
