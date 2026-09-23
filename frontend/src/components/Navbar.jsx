import React from 'react';
import { ArrowRight, Play, Zap, Sparkles, GitBranch } from 'lucide-react';
import ThemeSelector from './ThemeSelector';

export default function Navbar({ onStartOnboarding, onTryDemo, onGoHome, currentView }) {
  return (
    <header className="skillgraph-topbar glass-panel-glow">
      <div className="container flex flex-wrap items-center justify-between gap-4">
        {/* Brand Logo */}
        <a onClick={onGoHome} className="brand-logo flex items-center gap-3 cursor-pointer" aria-label="Go home">
          <div className="logo-icon"
            style={{
              width: '38px',
              height: '38px',
              borderRadius: '11px',
              background: 'linear-gradient(135deg, var(--accent-violet) 0%, var(--accent-cyan) 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 0 20px rgba(139, 92, 246, 0.45)',
              border: '1px solid rgba(255, 255, 255, 0.25)',
              transition: 'transform 0.2s ease',
            }}
          >
            <GitBranch size={20} color="#ffffff" strokeWidth={2.4} />
          </div>
          <div className="logo-text flex flex-col">
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ fontSize: '1.25rem', fontWeight: 800, fontFamily: 'var(--font-heading)', letterSpacing: '-0.02em', color: '#ffffff' }}>
                Skill<span className="text-gradient">Graph AI</span>
              </span>
              <span className="badge badge-cyan" style={{ fontSize: '0.66rem', padding: '2px 8px' }}>PLATFORM</span>
            </div>
          </div>
        </a>

        {/* Center Live Engine Indicator */}
        <div className="live-engine flex items-center gap-2 px-4 py-1 rounded-full bg-opacity-5 border border-opacity-10 text-sm text-muted"
          style={{
            background: 'rgba(255, 255, 255, 0.03)',
            border: '1px solid rgba(255, 255, 255, 0.08)',
          }}
        >
          <span className="live-pulse-amber" />
          <span style={{ fontWeight: 700, color: '#34d399', letterSpacing: '0.04em' }}>CAREER OPERATING SYSTEM</span>
          <span style={{ color: 'var(--text-dim)' }}>•</span>
          <span style={{ color: 'var(--text-muted)' }}>Evidence‑Backed Analysis</span>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-3">
          <ThemeSelector />
          {currentView !== 'landing' && (
            <button onClick={onGoHome} className="btn-secondary" aria-label="Landing page" style={{ padding: '8px 14px', fontSize: '0.82rem' }}>
              Landing Page
            </button>
          )}
          <button onClick={onTryDemo} className="btn-demo" aria-label="Sample profile"
            style={{ padding: '8px 16px', fontSize: '0.82rem' }}>
            <Play size={13} fill="currentColor" />
            <span>Sample Profile</span>
          </button>
          <button onClick={onStartOnboarding} className="btn-primary" aria-label="Build SkillGraph"
            style={{ padding: '8px 18px', fontSize: '0.82rem' }}>
            <Sparkles size={14} />
            <span>Build SkillGraph</span>
            <ArrowRight size={14} />
          </button>
        </div>
      </div>
    </header>
  );
}
