import React, { useState, useEffect, createContext, useContext } from 'react'
import { SessionProvider } from './contexts/SessionContext.jsx'
import { Header } from './components/layout/Header.jsx'
import { Sidebar } from './components/layout/Sidebar.jsx'
import { MainContent } from './components/layout/MainContent.jsx'
import { MobileNav } from './components/layout/MobileNav.jsx'
import './styles.css'
import './mobile-first-enhancements.css'

// Available color themes with light and dark variants - Warm Professional palette
export const colorThemes = {
  amber: {
    name: 'Amber',
    light: { primary: '#D97706', primaryHover: '#B45309' },
    dark: { primary: '#FBBF24', primaryHover: '#F59E0B' },
  },
  teal: {
    name: 'Teal',
    light: { primary: '#0F766E', primaryHover: '#0D9488' },
    dark: { primary: '#2DD4BF', primaryHover: '#5EEAD4' },
  },
  violet: {
    name: 'Violet',
    light: { primary: '#7C3AED', primaryHover: '#6D28D9' },
    dark: { primary: '#A78BFA', primaryHover: '#C4B5FD' },
  },
  rose: {
    name: 'Rose',
    light: { primary: '#E11D48', primaryHover: '#BE123C' },
    dark: { primary: '#FB7185', primaryHover: '#FDA4AF' },
  },
  indigo: {
    name: 'Indigo',
    light: { primary: '#4F46E5', primaryHover: '#4338CA' },
    dark: { primary: '#818CF8', primaryHover: '#A5B4FC' },
  },
  emerald: {
    name: 'Emerald',
    light: { primary: '#059669', primaryHover: '#047857' },
    dark: { primary: '#34D399', primaryHover: '#6EE7B7' },
  },
}

// Theme context
const ThemeContext = createContext()

export function useTheme() {
  return useContext(ThemeContext)
}

function App() {
  const [theme, setTheme] = useState(() => {
    const saved = localStorage.getItem('discovery-guide-theme')
    return saved || 'light'
  })

  const [colorTheme, setColorTheme] = useState(() => {
    const saved = localStorage.getItem('discovery-guide-color')
    return saved || 'amber'
  })

  const [showSettings, setShowSettings] = useState(false)
  const [activeView, setActiveView] = useState('learn') // 'learn' | 'drill' | 'challenge' | 'practice' | 'analyze'

  useEffect(() => {
    localStorage.setItem('discovery-guide-theme', theme)
  }, [theme])

  useEffect(() => {
    localStorage.setItem('discovery-guide-color', colorTheme)
  }, [colorTheme])

  // Apply color theme based on both color selection and light/dark mode
  useEffect(() => {
    const colors = colorThemes[colorTheme]
    if (colors) {
      const variant = theme === 'dark' ? colors.dark : colors.light
      document.documentElement.style.setProperty('--color-primary', variant.primary)
      document.documentElement.style.setProperty('--color-primary-hover', variant.primaryHover)
      document.documentElement.style.setProperty('--color-primary-light', `${variant.primary}1a`)
      document.documentElement.style.setProperty('--color-primary-glow', `${variant.primary}40`)
      document.documentElement.style.setProperty('--bg-active', `${variant.primary}15`)
      // Update chat gradient
      document.documentElement.style.setProperty(
        '--chat-user-bg',
        `linear-gradient(135deg, ${variant.primary} 0%, ${variant.primaryHover} 100%)`
      )
    }
  }, [colorTheme, theme])

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'))
  }

  return (
    <ThemeContext.Provider
      value={{
        theme,
        toggleTheme,
        colorTheme,
        setColorTheme,
        showSettings,
        setShowSettings,
        activeView,
        setActiveView,
      }}
    >
      <SessionProvider>
        <div className={`app ${theme}`}>
          <Header />
          <div className="app-body">
            {activeView === 'practice' && <Sidebar />}
            <MainContent />
          </div>
          <MobileNav />
          {showSettings && <SettingsModal onClose={() => setShowSettings(false)} />}
        </div>
      </SessionProvider>
    </ThemeContext.Provider>
  )
}

function SettingsModal({ onClose }) {
  const { theme, toggleTheme, colorTheme, setColorTheme } = useTheme()

  return (
    <div className="settings-overlay" onClick={onClose}>
      <div className="settings-modal" onClick={(e) => e.stopPropagation()}>
        <div className="settings-header">
          <h2>Settings</h2>
          <button className="settings-close" onClick={onClose}>
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
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
                  style={{
                    '--theme-color': theme === 'dark' ? value.dark.primary : value.light.primary,
                  }}
                >
                  <span
                    className="color-swatch"
                    style={{
                      background: theme === 'dark' ? value.dark.primary : value.light.primary,
                    }}
                  />
                  <span className="color-name">{value.name}</span>
                  {colorTheme === key && (
                    <svg
                      className="color-check"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="3"
                    >
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
