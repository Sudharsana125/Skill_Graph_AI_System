import React, { useState, useEffect } from 'react';
import { Check } from 'lucide-react';

export const THEMES = [
  {
    id: 'cyber-obsidian',
    name: 'Cyber Obsidian',
    icon: '🌌',
    primary: '#8b5cf6',
    accent: '#06b6d4',
    bg: '#07080d',
  },
  {
    id: 'matrix-emerald',
    name: 'Emerald Matrix',
    icon: '🟩',
    primary: '#10b981',
    accent: '#34d399',
    bg: '#030704',
  },
  {
    id: 'neon-cyberpunk',
    name: 'Neon Cyberpunk',
    icon: '🟪',
    primary: '#ec4899',
    accent: '#a855f7',
    bg: '#09040e',
  },
  {
    id: 'sunset-amber',
    name: 'Sunset Amber',
    icon: '🌅',
    primary: '#f59e0b',
    accent: '#fb923c',
    bg: '#0a070e',
  },
];

export default function ThemeSelector() {
  const [currentTheme, setCurrentTheme] = useState(() => {
    return localStorage.getItem('skillgraph_theme') || 'cyber-obsidian';
  });
  const [isOpen, setIsOpen] = useState(false);

  // Apply theme to document root and persist selection
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', currentTheme);
    localStorage.setItem('skillgraph_theme', currentTheme);
  }, [currentTheme]);

  const activeTheme = THEMES.find((t) => t.id === currentTheme) || THEMES[0];

  return (
    <div className="relative" id="theme-selector-root">
      {/* Theme toggle button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="btn-secondary glass-panel-glow flex items-center gap-2 px-3 py-1.5 text-sm font-semibold transition-all"
        aria-haspopup="true"
        aria-expanded={isOpen}
        aria-label="Switch UI / UX Theme"
        id="theme-selector-btn"
      >
        <span>{activeTheme.icon}</span>
        <span className="text-xs">{activeTheme.name.split(' ')[0]}</span>
        <span
          className="w-2 h-2 rounded-full"
          style={{
            background: activeTheme.primary,
            boxShadow: `0 0 6px ${activeTheme.primary}`,
          }}
        />
      </button>

      {/* Dropdown menu */}
      {isOpen && (
        <div
          className="glass-panel absolute right-0 mt-2 w-48 py-2 rounded-xl shadow-xl backdrop-blur-md z-50 animate-fade-in"
          role="menu"
          aria-labelledby="theme-selector-btn"
        >
          <div className="text-xs uppercase tracking-wider text-gray-400 px-3 mb-1">Hackathon UI Themes</div>
          {THEMES.map((theme) => {
            const selected = currentTheme === theme.id;
            return (
              <button
                key={theme.id}
                onClick={() => {
                  setCurrentTheme(theme.id);
                  setIsOpen(false);
                }}
                className={`flex w-full items-center justify-between px-3 py-1.5 rounded-md transition-colors ${
                  selected ? 'bg-white/10' : 'bg-transparent hover:bg-white/5'
                }`}
                role="menuitem"
              >
                <div className="flex items-center gap-2">
                  <span>{theme.icon}</span>
                  <span className={`text-sm ${selected ? 'font-bold text-white' : 'text-gray-300'}`}>
                    {theme.name}
                  </span>
                </div>
                {selected ? (
                  <Check size={14} color={theme.primary} />
                ) : (
                  <span className="w-3 h-3 rounded-full" style={{ background: theme.primary }} />
                )}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
