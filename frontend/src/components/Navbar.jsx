import React from 'react';
import { Cpu, ArrowRight, Play, Zap, Activity } from 'lucide-react';

export default function Navbar({ onStartOnboarding, onTryDemo, onGoHome, currentView }) {
  return (
    <header style={{
      position: 'sticky',
      top: 0,
      zIndex: 50,
      backdropFilter: 'blur(20px)',
      WebkitBackdropFilter: 'blur(20px)',
      background: 'rgba(7, 9, 14, 0.88)',
      borderBottom: '1px solid var(--card-border)',
      padding: '12px 0'
    }}>
      <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        {/* Brand Logo */}
        <div 
          onClick={onGoHome} 
          style={{ display: 'flex', alignItems: 'center', gap: '12px', cursor: 'pointer', userSelect: 'none' }}
          id="nav-brand-logo"
        >
          <div style={{
            width: '36px',
            height: '36px',
            borderRadius: '10px',
            background: 'linear-gradient(135deg, #2563eb, #0284c7)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 0 18px rgba(37, 99, 235, 0.4)',
            border: '1px solid rgba(255, 255, 255, 0.2)'
          }}>
            <Cpu size={18} color="#ffffff" />
          </div>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ fontSize: '1.2rem', fontWeight: 800, fontFamily: 'var(--font-heading)', letterSpacing: '-0.02em', color: '#ffffff' }}>
                Skill<span className="text-gradient">Twin</span>
              </span>
              <span className="badge badge-indigo" style={{ fontSize: '0.64rem', padding: '2px 6px' }}>PRO</span>
            </div>
          </div>
        </div>

        {/* Center Live Engine Indicator */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          padding: '4px 12px',
          borderRadius: 'var(--radius-full)',
          background: 'rgba(255, 255, 255, 0.03)',
          border: '1px solid var(--card-border)',
          fontSize: '0.74rem',
          color: 'var(--text-secondary)'
        }}>
          <span className="live-pulse"></span>
          <span style={{ fontWeight: 600, color: '#34d399', letterSpacing: '0.04em' }}>LIVE ENGINE</span>
          <span style={{ color: 'var(--text-dim)' }}>•</span>
          <span style={{ color: 'var(--text-muted)' }}>Real-Time Recalibration</span>
        </div>

        {/* Actions */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          {currentView !== 'landing' && (
            <button 
              onClick={onGoHome}
              className="btn-secondary" 
              style={{ padding: '8px 14px', fontSize: '0.82rem' }}
              id="nav-home-btn"
            >
              Overview
            </button>
          )}

          <button 
            onClick={onTryDemo}
            className="btn-demo"
            id="nav-try-demo-btn"
            title="Explore Interactive Career Twin Demo"
            style={{ padding: '8px 16px', fontSize: '0.82rem' }}
          >
            <Play size={13} fill="currentColor" />
            <span>Interactive Demo</span>
          </button>

          <button 
            onClick={onStartOnboarding}
            className="btn-primary" 
            style={{ padding: '8px 16px', fontSize: '0.82rem' }}
            id="nav-build-twin-btn"
          >
            <span>Assess Profile</span>
            <ArrowRight size={14} />
          </button>
        </div>
      </div>
    </header>
  );
}
