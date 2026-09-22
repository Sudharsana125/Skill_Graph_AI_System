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
    { id: 'twin', label: 'My SkillTwin', icon: User },
    { id: 'explorer', label: 'Career Explorer', icon: Compass },
    { id: 'learning', label: 'Learning Path', icon: Layers },
    { id: 'projects', label: 'Projects', icon: Briefcase },
    { id: 'assessments', label: 'Assessments', icon: ShieldCheck },
    { id: 'evidence', label: 'Evidence Graph', icon: Share2 },
    { id: 'whatif', label: 'What-If Simulator', icon: Sparkles },
    { id: 'nextmove', label: 'Next Best Move', icon: Zap },
    { id: 'opportunities', label: 'Opportunities', icon: Target },
    { id: 'insights', label: 'Insights', icon: BarChart3 },
    { id: 'settings', label: 'Settings', icon: Settings }
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

      {/* Bottom Growth Compounding Card matching screenshot */}
      <div className="sidebar-growth-card" onClick={onGrowthCardClick} style={{ cursor: 'pointer' }}>
        <div className="growth-radar-pulse">
          <div className="growth-radar-inner"></div>
        </div>
        <div style={{ fontSize: '0.84rem', fontWeight: 600, color: '#f1f5f9', lineHeight: 1.25, marginBottom: '10px' }}>
          Your growth is compounding.
        </div>
        <button
          style={{
            width: '28px',
            height: '28px',
            borderRadius: '50%',
            background: 'rgba(59, 130, 246, 0.25)',
            border: '1px solid rgba(59, 130, 246, 0.5)',
            color: '#60a5fa',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            transition: 'all 0.2s ease'
          }}
          title="Inspect Growth Velocity"
        >
          <ArrowRight size={13} />
        </button>
      </div>
    </aside>
  );
}
