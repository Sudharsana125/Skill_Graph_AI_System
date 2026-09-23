import React from 'react';
import { Search, Sparkles, Bell, Brain, PlusCircle, Home, GitBranch } from 'lucide-react';
import ThemeSelector from './ThemeSelector';

export default function TopNavbar({ 
  onOpenAssistant, 
  onOpenSearch, 
  onProfileClick,
  onGoHome,
  onNewProfile,
  userName = "Emerging Engineer",
  userRole = "Student"
}) {
  const displayInitial = (userName && userName.length > 0) ? userName.charAt(0).toUpperCase() : "U";

  return (
    <header className="skillgraph-topbar">
      {/* Brand Logo & Home Navigation */}
      <div 
        style={{ display: 'flex', alignItems: 'center', gap: '12px', cursor: 'pointer' }}
        onClick={onGoHome || (() => window.location.reload())}
        id="topbar-logo"
        title="SkillGraph AI Home"
      >
        <div style={{
          width: '38px',
          height: '38px',
          borderRadius: '11px',
          background: 'linear-gradient(135deg, var(--accent-violet) 0%, var(--accent-cyan) 100%)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 0 20px rgba(139, 92, 246, 0.45)',
          border: '1px solid rgba(255, 255, 255, 0.25)'
        }}>
          <GitBranch size={20} color="#ffffff" strokeWidth={2.4} />
        </div>
        <div>
          <div style={{ fontSize: '1.2rem', fontWeight: 800, color: '#ffffff', letterSpacing: '-0.02em', lineHeight: 1.1 }}>
            Skill<span className="text-gradient">Graph AI</span>
          </div>
          <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', letterSpacing: '0.02em' }}>
            Career Intelligence Platform
          </div>
        </div>
      </div>

      {/* Global Interactive AI Command Bar */}
      <div className="search-input-pill" onClick={onOpenSearch} id="global-search-pill">
        <Search size={16} color="var(--accent-cyan)" />
        <input 
          type="text" 
          placeholder='Ask SkillGraph... (e.g. "What skills am I missing for AI Engineer?")'
          readOnly
          style={{ cursor: 'pointer' }}
        />
        <div className="kbd-badge">Ctrl K</div>
      </div>

      {/* Right Controls */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
        {/* Dynamic Hackathon Theme Selector */}
        <ThemeSelector />
        
        {/* Create / Rebuild Profile Button */}
        {onNewProfile && (
          <button
            onClick={onNewProfile}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              background: 'rgba(255, 255, 255, 0.05)',
              border: '1px solid rgba(255, 255, 255, 0.12)',
              color: '#cbd5e1',
              borderRadius: '9999px',
              padding: '6px 14px',
              fontSize: '0.8rem',
              fontWeight: 600,
              cursor: 'pointer',
              transition: 'all 0.18s'
            }}
            title="Create New Profile"
          >
            <PlusCircle size={14} color="#38bdf8" />
            <span>New Profile</span>
          </button>
        )}

        {/* AI Assistant Button */}
        <button
          onClick={onOpenAssistant}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            background: 'rgba(56, 189, 248, 0.12)',
            border: '1px solid rgba(56, 189, 248, 0.35)',
            color: '#38bdf8',
            borderRadius: '9999px',
            padding: '7px 16px',
            fontSize: '0.84rem',
            fontWeight: 600,
            cursor: 'pointer',
            transition: 'all 0.2s ease',
            boxShadow: '0 0 16px rgba(56, 189, 248, 0.15)'
          }}
          id="topbar-assistant-btn"
        >
          <Sparkles size={15} color="#38bdf8" />
          <span>Ask SkillGraph</span>
        </button>

        {/* User Profile Avatar with Real Dynamic Name */}
        <div 
          onClick={onProfileClick}
          style={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: '10px', 
            cursor: 'pointer',
            padding: '4px 8px',
            borderRadius: '10px',
            transition: 'background 0.18s'
          }}
          onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.05)'}
          onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
        >
          <div style={{
            width: '36px',
            height: '36px',
            borderRadius: '50%',
            background: 'linear-gradient(135deg, #3b82f6 0%, #06b6d4 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#ffffff',
            fontWeight: 700,
            fontSize: '0.95rem',
            border: '1px solid rgba(255, 255, 255, 0.3)',
            boxShadow: '0 0 14px rgba(59, 130, 246, 0.35)'
          }}>
            {displayInitial}
          </div>
          <div>
            <div style={{ fontSize: '0.88rem', fontWeight: 700, color: '#f8fafc', lineHeight: 1.1 }}>
              {userName}
            </div>
            <div style={{ fontSize: '0.72rem', color: '#94a3b8' }}>
              {userRole}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
