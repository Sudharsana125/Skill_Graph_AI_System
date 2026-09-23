import React from 'react';
import { 
  Home, 
  User, 
  Compass, 
  Layers, 
  Briefcase, 
  ShieldCheck, 
  Share2, 
  Sparkles, 
  Zap, 
  Target, 
  BarChart3, 
  Settings,
  ArrowRight
} from 'lucide-react';

export default function Sidebar({ activeNav, onSelectNav, onGrowthCardClick }) {
  const navItems = [
    { id: 'overview', label: 'Overview', icon: Home },
    { id: 'twin', label: 'My SkillGraph', icon: User },
    { id: 'explorer', label: 'Career Explorer', icon: Compass },
    { id: 'learning', label: 'Learning Path', icon: Layers },
    { id: 'projects', label: 'Projects', icon: Briefcase },
    { id: 'assessments', label: 'Assessments & Gaps', icon: ShieldCheck },
    { id: 'evidence', label: 'Evidence Graph', icon: Share2 },
    { id: 'whatif', label: 'What-If Simulator', icon: Sparkles },
    { id: 'nextmove', label: 'Next Best Move', icon: Zap },
    { id: 'opportunities', label: 'Skill Transfer', icon: Target },
    { id: 'insights', label: 'Evolution History', icon: BarChart3 },
    { id: 'settings', label: 'Preferences', icon: Settings }
  ];

  return (
    <aside className="skillgraph-sidebar">
      {/* Top Navigation Links */}
      <nav className="sidebar-nav-list">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeNav === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onSelectNav(item.id)}
              className={`sidebar-nav-item ${isActive ? 'active' : ''}`}
              id={`nav-link-${item.id}`}
            >
              <Icon 
                size={18} 
                color={isActive ? '#38bdf8' : '#94a3b8'} 
                strokeWidth={isActive ? 2.2 : 1.8}
              />
              <span>{item.label}</span>
            </button>
          );
        })}
      </nav>

      {/* Bottom Live Calibration Status (Functional, no fluff or fake motivational quotes) */}
      <div 
        onClick={onGrowthCardClick} 
        style={{ 
          marginTop: 'auto',
          padding: '14px 16px',
          background: 'rgba(0, 0, 0, 0.25)',
          border: '1px solid rgba(255, 255, 255, 0.08)',
          borderRadius: '10px',
          cursor: 'pointer',
          transition: 'all 0.18s ease'
        }}
        className="card-interactive"
        title="View SkillGraph Evolution Timeline"
      >
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '6px' }}>
          <span style={{ fontSize: '0.68rem', color: '#38bdf8', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.04em' }}>
            Evolution Engine
          </span>
          <span className="live-pulse"></span>
        </div>
        <div style={{ fontSize: '0.82rem', fontWeight: 600, color: '#f1f5f9', lineHeight: 1.3, marginBottom: '8px' }}>
          Dynamic Graph Tracking Active
        </div>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '0.72rem', color: '#94a3b8' }}>
          <span>View Evolution History</span>
          <ArrowRight size={13} color="#38bdf8" />
        </div>
      </div>
    </aside>
  );
}
