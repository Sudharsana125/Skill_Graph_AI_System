import React from 'react';
import { Search, Sparkles, Bell, Brain } from 'lucide-react';

export default function TopNavbar({ 
  onOpenAssistant, 
  onOpenSearch, 
  onProfileClick,
  userName = "Sudharsana",
  userRole = "Student"
}) {
  return (
    <header className="skillgraph-topbar">
      {/* Brand Logo matching user screenshot */}
      <div 
        style={{ display: 'flex', alignItems: 'center', gap: '12px', cursor: 'pointer' }}
        onClick={() => window.location.reload()}
        id="topbar-logo"
      >
        <div style={{
          width: '38px',
          height: '38px',
          borderRadius: '11px',
          background: 'linear-gradient(135deg, #818cf8 0%, #38bdf8 100%)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 0 20px rgba(129, 140, 248, 0.45)',
          border: '1px solid rgba(255, 255, 255, 0.25)'
        }}>
          <Brain size={22} color="#ffffff" strokeWidth={2.2} />
        </div>
        <div>
          <div style={{ fontSize: '1.25rem', fontWeight: 800, color: '#ffffff', letterSpacing: '-0.02em', lineHeight: 1.1 }}>
            SkillGraph AI
          </div>
          <div style={{ fontSize: '0.72rem', color: '#94a3b8', letterSpacing: '0.02em' }}>
            From Skills to Opportunities
          </div>
        </div>
      </div>

      {/* Global Interactive Search Input */}
      <div className="search-input-pill" onClick={onOpenSearch} id="global-search-pill">
        <Search size={16} color="#38bdf8" />
        <input 
          type="text" 
          placeholder='Ask SkillGraph AI anything... (e.g., "What skills do I need for a Data Scientist?")'
          readOnly
          style={{ cursor: 'pointer' }}
        />
        <div className="kbd-badge">Ctrl K</div>
      </div>

      {/* Right Controls */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
        {/* ✨ AI Assistant Button */}
        <button
          onClick={onOpenAssistant}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            background: 'rgba(59, 130, 246, 0.15)',
            border: '1px solid rgba(99, 102, 241, 0.45)',
            color: '#93c5fd',
            borderRadius: '9999px',
            padding: '7px 16px',
            fontSize: '0.84rem',
            fontWeight: 600,
            cursor: 'pointer',
            transition: 'all 0.2s ease',
            boxShadow: '0 0 16px rgba(59, 130, 246, 0.2)'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = 'rgba(59, 130, 246, 0.28)';
            e.currentTarget.style.borderColor = '#60a5fa';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = 'rgba(59, 130, 246, 0.15)';
            e.currentTarget.style.borderColor = 'rgba(99, 102, 241, 0.45)';
          }}
          id="topbar-assistant-btn"
        >
          <Sparkles size={15} color="#38bdf8" />
          <span>AI Assistant</span>
        </button>

        {/* Notification Bell */}
        <div 
          style={{ 
            position: 'relative', 
            width: '36px', 
            height: '36px', 
            borderRadius: '10px', 
            background: 'rgba(255, 255, 255, 0.04)',
            border: '1px solid rgba(255, 255, 255, 0.08)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer'
          }}
          title="3 Unread Skill & Career Alerts"
        >
          <Bell size={17} color="#cbd5e1" />
          <span style={{
            position: 'absolute',
            top: '7px',
            right: '8px',
            width: '7px',
            height: '7px',
            borderRadius: '50%',
            background: '#38bdf8',
            boxShadow: '0 0 8px #38bdf8'
          }} />
        </div>

        {/* User Profile Avatar */}
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
            background: 'linear-gradient(135deg, #6366f1 0%, #38bdf8 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#ffffff',
            fontWeight: 700,
            fontSize: '0.95rem',
            border: '1px solid rgba(255, 255, 255, 0.3)',
            boxShadow: '0 0 12px rgba(99, 102, 241, 0.4)'
          }}>
            {userName.charAt(0)}
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
