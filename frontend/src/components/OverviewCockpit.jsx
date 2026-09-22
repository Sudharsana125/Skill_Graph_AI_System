import React, { useState } from 'react';
import { 
  Zap, 
  Clock, 
  Hexagon, 
  Sliders, 
  ArrowRight, 
  CheckCircle2, 
  Sparkles, 
  ShieldCheck, 
  TrendingUp, 
  FileText, 
  GitFork, 
  BookOpen, 
  Briefcase, 
  Bot, 
  BarChart2, 
  Plus, 
  Layers, 
  Compass, 
  Target 
} from 'lucide-react';

export default function OverviewCockpit({
  data,
  onNavigateTab,
  onEditGoals,
  onCompleteNextMove,
  isUpdatingProgress
}) {
  // What-If Simulator selector state inside the overview card
  const [selectedWhatIfRole, setSelectedWhatIfRole] = useState('AI Engineer');

  // Simulated metrics for What-If tabs
  const whatIfConfigs = {
    'AI Engineer': {
      fit: 68,
      gaps: 4,
      time: '5 months',
      keySkills: ['Python', 'ML', 'LLMs', 'System Design']
    },
    'Data Analyst': {
      fit: 78,
      gaps: 2,
      time: '2 months',
      keySkills: ['SQL', 'Python', 'Tableau', 'Data Viz']
    },
    'ML Engineer': {
      fit: 62,
      gaps: 5,
      time: '6 months',
      keySkills: ['Python', 'PyTorch', 'MLOps', 'System Design']
    }
  };

  const currentWhatIf = whatIfConfigs[selectedWhatIfRole] || whatIfConfigs['AI Engineer'];

  // Exact screenshot content
  const nextMoveTitle = "Complete RAG Chatbot Project";
  const nextMoveSub = "This project will improve multiple skills and bring you closer to your goal.";
  const nextMoveSkills = ["Python", "LLMs", "RAG", "FastAPI"];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      
      {/* 1. TOP HERO SECTION */}
      <section className="hero-cockpit">
        {/* Left: Bold Value Proposition */}
        <div>
          <h1 className="hero-title-gradient">
            Turn your potential <br />
            into <span className="glow-text-span">real opportunities.</span>
          </h1>
          <p style={{ fontSize: '0.96rem', color: '#94a3b8', lineHeight: 1.6, maxWidth: '580px' }}>
            SkillGraph AI analyzes your skills, evidence, and goals to create personalized paths, projects, and opportunities.
          </p>
        </div>

        {/* Right: 3D Holographic Orbit System */}
        <div className="hologram-orbit-container">
          {/* Orbit concentric dashed rings */}
          <div className="orbit-circle-line" style={{ width: '220px', height: '220px' }}></div>
          <div className="orbit-circle-line" style={{ width: '150px', height: '150px', borderColor: 'rgba(56, 189, 248, 0.15)' }}></div>
          
          {/* Center Hexagonal Emblem */}
          <div className="orbit-center-hex">
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none">
              <path d="M12 2L2 7V17L12 22L22 17V7L12 2Z" stroke="#38bdf8" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M12 6L6 9.5V14.5L12 18L18 14.5V9.5L12 6Z" fill="url(#hexGrad)" />
              <defs>
                <linearGradient id="hexGrad" x1="6" y1="6" x2="18" y2="18" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#818cf8" />
                  <stop offset="1" stopColor="#06b6d4" />
                </linearGradient>
              </defs>
            </svg>
          </div>

          {/* 6 Orbiting Badges matching screenshot */}
          {/* Top-Left: Skills Analyzed */}
          <div className="orbit-pill" style={{ top: '15px', left: '10px' }}>
            <div style={{ width: '18px', height: '18px', borderRadius: '5px', background: 'rgba(56, 189, 248, 0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Layers size={11} color="#38bdf8" />
            </div>
            <div>
              <div className="orbit-pill-title">Skills</div>
              <div className="orbit-pill-sub">Analyzed</div>
            </div>
          </div>

          {/* Middle-Left: Projects Mapped */}
          <div className="orbit-pill" style={{ top: '90px', left: '0px' }}>
            <div style={{ width: '18px', height: '18px', borderRadius: '5px', background: 'rgba(99, 102, 241, 0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Briefcase size={11} color="#818cf8" />
            </div>
            <div>
              <div className="orbit-pill-title">Projects</div>
              <div className="orbit-pill-sub">Mapped</div>
            </div>
          </div>

          {/* Bottom-Left: Goals Aligned */}
          <div className="orbit-pill" style={{ bottom: '15px', left: '20px' }}>
            <div style={{ width: '18px', height: '18px', borderRadius: '5px', background: 'rgba(16, 185, 129, 0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Target size={11} color="#34d399" />
            </div>
            <div>
              <div className="orbit-pill-title">Goals</div>
              <div className="orbit-pill-sub">Aligned</div>
            </div>
          </div>

          {/* Top-Right: Careers Explored */}
          <div className="orbit-pill" style={{ top: '10px', right: '15px' }}>
            <div style={{ width: '18px', height: '18px', borderRadius: '5px', background: 'rgba(168, 85, 247, 0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Compass size={11} color="#c084fc" />
            </div>
            <div>
              <div className="orbit-pill-title">Careers</div>
              <div className="orbit-pill-sub">Explored</div>
            </div>
          </div>

          {/* Middle-Right: Opportunities Matched */}
          <div className="orbit-pill" style={{ top: '85px', right: '0px' }}>
            <div style={{ width: '18px', height: '18px', borderRadius: '5px', background: 'rgba(236, 72, 153, 0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <CheckCircle2 size={11} color="#f472b6" />
            </div>
            <div>
              <div className="orbit-pill-title">Opportunities</div>
              <div className="orbit-pill-sub">Matched</div>
            </div>
          </div>

          {/* Bottom-Right: Growth Continuous */}
          <div className="orbit-pill" style={{ bottom: '15px', right: '25px' }}>
            <div style={{ width: '18px', height: '18px', borderRadius: '5px', background: 'rgba(56, 189, 248, 0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <TrendingUp size={11} color="#38bdf8" />
            </div>
            <div>
              <div className="orbit-pill-title">Growth</div>
              <div className="orbit-pill-sub">Continuous</div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. CAREER JOURNEY PIPELINE */}
      <section className="career-journey-card">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h2 style={{ fontSize: '1.12rem', fontWeight: 700, color: '#f8fafc', margin: 0 }}>
            Your Career Journey
          </h2>
          <button 
            onClick={onEditGoals}
            style={{ 
              background: 'transparent', 
              border: 'none', 
              color: '#38bdf8', 
              fontSize: '0.86rem', 
              fontWeight: 600, 
              cursor: 'pointer' 
            }}
            id="edit-goals-btn"
          >
            Edit Goals
          </button>
        </div>

        {/* 4 Station Progress Stepper */}
        <div className="journey-stepper-track">
          <div className="journey-connecting-line"></div>

          {/* Station 1: Current State */}
          <div className="journey-station">
            <div className="journey-dot" style={{ border: '2px solid #3b82f6', boxShadow: '0 0 14px #3b82f6' }}>
              <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#3b82f6' }} />
            </div>
            <div style={{ fontSize: '0.88rem', fontWeight: 700, color: '#f8fafc', marginBottom: '2px' }}>
              Current State
            </div>
            <div style={{ fontSize: '0.74rem', color: '#94a3b8' }}>
              Understand where you stand
            </div>
          </div>

          {/* Station 2: Build Skills */}
          <div className="journey-station">
            <div className="journey-dot" style={{ border: '2px solid #10b981', boxShadow: '0 0 14px #10b981' }}>
              <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#10b981' }} />
            </div>
            <div style={{ fontSize: '0.88rem', fontWeight: 700, color: '#f8fafc', marginBottom: '2px' }}>
              Build Skills
            </div>
            <div style={{ fontSize: '0.74rem', color: '#94a3b8' }}>
              Learn through projects & courses
            </div>
          </div>

          {/* Station 3: Gain Evidence */}
          <div className="journey-station">
            <div className="journey-dot" style={{ border: '2px solid #f59e0b', boxShadow: '0 0 14px #f59e0b' }}>
              <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#f59e0b' }} />
            </div>
            <div style={{ fontSize: '0.88rem', fontWeight: 700, color: '#f8fafc', marginBottom: '2px' }}>
              Gain Evidence
            </div>
            <div style={{ fontSize: '0.74rem', color: '#94a3b8' }}>
              Show what you can do
            </div>
          </div>

          {/* Station 4: Reach Opportunities */}
          <div className="journey-station">
            <div className="journey-dot" style={{ border: '2px solid #a855f7', boxShadow: '0 0 14px #a855f7' }}>
              <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#a855f7' }} />
            </div>
            <div style={{ fontSize: '0.88rem', fontWeight: 700, color: '#f8fafc', marginBottom: '2px' }}>
              Reach Opportunities
            </div>
            <div style={{ fontSize: '0.74rem', color: '#94a3b8' }}>
              Get job/internship opportunities
            </div>
          </div>
        </div>
      </section>

      {/* 3. MIDDLE SECTION: 2 COLUMNS (Next Best Move vs What-If Simulator + Evidence Graph) */}
      <section className="cockpit-grid-2col">
        {/* LEFT COLUMN: Your Next Best Move Card */}
        <div style={{
          background: 'linear-gradient(145deg, rgba(17, 24, 39, 0.9) 0%, rgba(10, 15, 26, 0.95) 100%)',
          border: '1px solid rgba(59, 130, 246, 0.25)',
          borderRadius: '16px',
          padding: '24px 28px',
          boxShadow: '0 12px 30px rgba(0, 0, 0, 0.6), 0 0 20px rgba(59, 130, 246, 0.1)',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          position: 'relative'
        }}>
          <div>
            {/* Header Badge Row */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#f59e0b', fontWeight: 700, fontSize: '0.94rem' }}>
                <Zap size={18} fill="#f59e0b" color="#f59e0b" />
                <span style={{ color: '#f8fafc' }}>Your Next Best Move</span>
              </div>
              <span style={{
                background: '#2563eb',
                color: '#ffffff',
                fontSize: '0.72rem',
                fontWeight: 700,
                borderRadius: '9999px',
                padding: '3px 10px',
                letterSpacing: '0.02em'
              }}>
                High Impact
              </span>
            </div>

            {/* Title & Description */}
            <h2 style={{ fontSize: '1.35rem', fontWeight: 800, color: '#ffffff', marginBottom: '8px' }}>
              {nextMoveTitle}
            </h2>
            <p style={{ fontSize: '0.88rem', color: '#94a3b8', lineHeight: 1.5, marginBottom: '18px', maxWidth: '440px' }}>
              {nextMoveSub}
            </p>

            {/* Skill Tags */}
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '28px' }}>
              {nextMoveSkills.map((sk) => (
                <span key={sk} style={{
                  background: 'rgba(255, 255, 255, 0.05)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  color: '#cbd5e1',
                  borderRadius: '8px',
                  padding: '5px 12px',
                  fontSize: '0.78rem',
                  fontWeight: 600
                }}>
                  {sk}
                </span>
              ))}
            </div>
          </div>

          {/* Bottom Row: Stats & 3D Isometric Illustration */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
            <div style={{ display: 'flex', gap: '22px' }}>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '5px', fontSize: '0.75rem', color: '#94a3b8', marginBottom: '4px' }}>
                  <Clock size={13} />
                  <span>Estimated Time</span>
                </div>
                <div style={{ fontSize: '0.94rem', fontWeight: 700, color: '#f8fafc' }}>
                  4 days
                </div>
              </div>

              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '5px', fontSize: '0.75rem', color: '#94a3b8', marginBottom: '4px' }}>
                  <Hexagon size={13} />
                  <span>Closes</span>
                </div>
                <div style={{ fontSize: '0.94rem', fontWeight: 700, color: '#f8fafc' }}>
                  3 skill gaps
                </div>
              </div>

              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '5px', fontSize: '0.75rem', color: '#94a3b8', marginBottom: '4px' }}>
                  <Sliders size={13} />
                  <span>Difficulty</span>
                </div>
                <div style={{ fontSize: '0.94rem', fontWeight: 700, color: '#f8fafc' }}>
                  Medium
                </div>
              </div>
            </div>

            {/* Isometric 3D Stepped Platform & Arrow Button */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
              <div style={{ width: '130px', height: '100px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <svg width="120" height="95" viewBox="0 0 120 95" fill="none">
                  <defs>
                    <linearGradient id="baseTop" x1="20" y1="35" x2="100" y2="65" gradientUnits="userSpaceOnUse">
                      <stop stopColor="#1e3a8a" />
                      <stop offset="1" stopColor="#0284c7" />
                    </linearGradient>
                    <linearGradient id="midTop" x1="30" y1="25" x2="90" y2="50" gradientUnits="userSpaceOnUse">
                      <stop stopColor="#2563eb" />
                      <stop offset="1" stopColor="#38bdf8" />
                    </linearGradient>
                    <linearGradient id="topTop" x1="42" y1="15" x2="78" y2="35" gradientUnits="userSpaceOnUse">
                      <stop stopColor="#60a5fa" />
                      <stop offset="1" stopColor="#7dd3fc" />
                    </linearGradient>
                    <filter id="cyanGlow" x="0" y="0" width="120" height="95" filterUnits="userSpaceOnUse">
                      <feGaussianBlur stdDeviation="3" result="blur" />
                      <feComposite in="SourceGraphic" in2="blur" operator="over" />
                    </filter>
                  </defs>

                  {/* Tier 1 (Base Platform) */}
                  <path d="M60 62 L105 40 L60 18 L15 40 Z" fill="url(#baseTop)" stroke="#38bdf8" strokeWidth="0.8" />
                  <path d="M15 40 L60 62 V74 L15 52 Z" fill="#0c1938" />
                  <path d="M60 62 L105 40 V52 L60 74 Z" fill="#0f2b5c" />

                  {/* Tier 2 (Middle Platform) */}
                  <path d="M60 48 L93 32 L60 16 L27 32 Z" fill="url(#midTop)" stroke="#60a5fa" strokeWidth="0.8" />
                  <path d="M27 32 L60 48 V56 L27 40 Z" fill="#172554" />
                  <path d="M60 48 L93 32 V40 L60 56 Z" fill="#1e40af" />

                  {/* Tier 3 (Top Cube / Core) */}
                  <path d="M60 34 L80 24 L60 14 L40 24 Z" fill="url(#topTop)" stroke="#bae6fd" strokeWidth="1" filter="url(#cyanGlow)" />
                  <path d="M40 24 L60 34 V42 L40 32 Z" fill="#0369a1" />
                  <path d="M60 34 L80 24 V32 L60 42 Z" fill="#0284c7" />
                </svg>
              </div>

              <button
                onClick={onCompleteNextMove}
                disabled={isUpdatingProgress}
                style={{
                  width: '42px',
                  height: '42px',
                  borderRadius: '50%',
                  background: 'linear-gradient(135deg, #6366f1 0%, #3b82f6 100%)',
                  border: 'none',
                  color: '#ffffff',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  boxShadow: '0 0 20px rgba(99, 102, 241, 0.6)',
                  transition: 'transform 0.2s'
                }}
                onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.1)'}
                onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
                title="Action Next Move"
              >
                <ArrowRight size={18} />
              </button>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: What-If Simulator + Evidence Graph Stack */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          
          {/* Career What-If Simulator Card */}
          <div style={{
            background: 'rgba(13, 17, 27, 0.75)',
            border: '1px solid rgba(255, 255, 255, 0.08)',
            borderRadius: '16px',
            padding: '20px 24px',
            backdropFilter: 'blur(16px)'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
              <h2 style={{ fontSize: '1.05rem', fontWeight: 700, color: '#f8fafc', margin: 0 }}>
                Career What-If Simulator
              </h2>
              <button
                onClick={() => onNavigateTab('whatif')}
                style={{ background: 'transparent', border: 'none', color: '#38bdf8', fontSize: '0.82rem', fontWeight: 600, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px' }}
              >
                <span>Open Simulator</span>
                <ArrowRight size={13} />
              </button>
            </div>
            <div style={{ fontSize: '0.8rem', color: '#94a3b8', marginBottom: '14px' }}>
              Compare multiple career paths instantly.
            </div>

            {/* Path Tabs matching screenshot */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '8px', marginBottom: '16px' }}>
              {['AI Engineer', 'Data Analyst', 'ML Engineer'].map((role) => {
                const isSelected = selectedWhatIfRole === role;
                return (
                  <button
                    key={role}
                    onClick={() => setSelectedWhatIfRole(role)}
                    style={{
                      background: isSelected ? 'rgba(37, 99, 235, 0.2)' : 'rgba(255, 255, 255, 0.03)',
                      border: isSelected ? '1px solid rgba(59, 130, 246, 0.6)' : '1px solid rgba(255, 255, 255, 0.06)',
                      borderRadius: '10px',
                      padding: '8px 6px',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '4px',
                      cursor: 'pointer',
                      transition: 'all 0.18s'
                    }}
                  >
                    <Bot size={16} color={isSelected ? '#38bdf8' : '#94a3b8'} />
                    <span style={{ fontSize: '0.74rem', fontWeight: 600, color: isSelected ? '#ffffff' : '#cbd5e1', whiteSpace: 'nowrap' }}>
                      {role}
                    </span>
                  </button>
                );
              })}

              {/* Add Path Button */}
              <button
                onClick={() => onNavigateTab('whatif')}
                style={{
                  background: 'rgba(255, 255, 255, 0.02)',
                  border: '1px dashed rgba(255, 255, 255, 0.12)',
                  borderRadius: '10px',
                  padding: '8px 6px',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '4px',
                  cursor: 'pointer',
                  color: '#94a3b8'
                }}
              >
                <Plus size={16} />
                <span style={{ fontSize: '0.74rem', fontWeight: 600 }}>Add Path</span>
              </button>
            </div>

            {/* Metrics Bars */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {/* Your Fit */}
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.78rem', marginBottom: '4px' }}>
                  <span style={{ color: '#94a3b8' }}>Your Fit</span>
                  <span style={{ color: '#ffffff', fontWeight: 700 }}>{currentWhatIf.fit}%</span>
                </div>
                <div style={{ height: '5px', background: 'rgba(255, 255, 255, 0.08)', borderRadius: '9999px', overflow: 'hidden' }}>
                  <div style={{ width: `${currentWhatIf.fit}%`, height: '100%', background: '#06b6d4', borderRadius: '9999px', transition: 'width 0.5s ease' }} />
                </div>
              </div>

              {/* Skill Gaps */}
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.78rem', marginBottom: '4px' }}>
                  <span style={{ color: '#94a3b8' }}>Skill Gaps</span>
                  <span style={{ color: '#ffffff', fontWeight: 700 }}>{currentWhatIf.gaps}</span>
                </div>
                <div style={{ height: '5px', background: 'rgba(255, 255, 255, 0.08)', borderRadius: '9999px', overflow: 'hidden' }}>
                  <div style={{ width: `${currentWhatIf.gaps * 20}%`, height: '100%', background: '#ec4899', borderRadius: '9999px', transition: 'width 0.5s ease' }} />
                </div>
              </div>

              {/* Est. Time */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.8rem', marginTop: '4px' }}>
                <span style={{ color: '#94a3b8', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <Clock size={13} />
                  <span>Est. Time</span>
                </span>
                <span style={{ color: '#f8fafc', fontWeight: 600 }}>{currentWhatIf.time}</span>
              </div>

              {/* Key Skills */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '2px', flexWrap: 'wrap' }}>
                <span style={{ fontSize: '0.76rem', color: '#94a3b8' }}>Key Skills:</span>
                {currentWhatIf.keySkills.map((sk) => (
                  <span key={sk} style={{
                    background: 'rgba(255, 255, 255, 0.05)',
                    border: '1px solid rgba(255, 255, 255, 0.08)',
                    borderRadius: '6px',
                    padding: '2px 8px',
                    fontSize: '0.72rem',
                    color: '#e2e8f0'
                  }}>
                    {sk}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Skill Evidence Graph Card */}
          <div style={{
            background: 'rgba(13, 17, 27, 0.75)',
            border: '1px solid rgba(255, 255, 255, 0.08)',
            borderRadius: '16px',
            padding: '20px 24px',
            backdropFilter: 'blur(16px)'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
              <h2 style={{ fontSize: '1.05rem', fontWeight: 700, color: '#f8fafc', margin: 0 }}>
                Skill Evidence Graph
              </h2>
              <button
                onClick={() => onNavigateTab('evidence')}
                style={{ background: 'transparent', border: 'none', color: '#38bdf8', fontSize: '0.82rem', fontWeight: 600, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px' }}
              >
                <span>View Full Graph</span>
                <ArrowRight size={13} />
              </button>
            </div>
            <div style={{ fontSize: '0.8rem', color: '#94a3b8', marginBottom: '14px' }}>
              See why you have these skills.
            </div>

            {/* SVG Interactive Provenance Flow & Strength Card */}
            <div style={{ display: 'grid', gridTemplateColumns: '1.3fr 1fr', gap: '16px', alignItems: 'center' }}>
              {/* SVG Node Graph */}
              <div style={{ position: 'relative', height: '130px', display: 'flex', alignItems: 'center' }}>
                <svg width="100%" height="130" viewBox="0 0 240 130" fill="none">
                  {/* Curved Bezier Connectors to Python */}
                  <path d="M70 20 C 120 20, 140 65, 175 65" stroke="#a855f7" strokeWidth="1.5" strokeOpacity="0.7" fill="none" />
                  <path d="M70 50 C 120 50, 140 65, 175 65" stroke="#06b6d4" strokeWidth="1.5" strokeOpacity="0.7" fill="none" />
                  <path d="M70 80 C 120 80, 140 65, 175 65" stroke="#3b82f6" strokeWidth="1.5" strokeOpacity="0.7" fill="none" />
                  <path d="M70 110 C 120 110, 140 65, 175 65" stroke="#f59e0b" strokeWidth="1.5" strokeOpacity="0.7" fill="none" />
                </svg>

                {/* Left Source Nodes */}
                <div style={{ position: 'absolute', left: '0', top: '0', bottom: '0', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#a855f7' }}></div>
                    <div>
                      <div style={{ fontSize: '0.74rem', fontWeight: 600, color: '#f8fafc' }}>Resume</div>
                      <div style={{ fontSize: '0.65rem', color: '#94a3b8' }}>2 mentions</div>
                    </div>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#06b6d4' }}></div>
                    <div>
                      <div style={{ fontSize: '0.74rem', fontWeight: 600, color: '#f8fafc' }}>Projects</div>
                      <div style={{ fontSize: '0.65rem', color: '#94a3b8' }}>3 repositories</div>
                    </div>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#3b82f6' }}></div>
                    <div>
                      <div style={{ fontSize: '0.74rem', fontWeight: 600, color: '#f8fafc' }}>Assessments</div>
                      <div style={{ fontSize: '0.65rem', color: '#94a3b8' }}>1 completed</div>
                    </div>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#f59e0b' }}></div>
                    <div>
                      <div style={{ fontSize: '0.74rem', fontWeight: 600, color: '#f8fafc' }}>Learning</div>
                      <div style={{ fontSize: '0.65rem', color: '#94a3b8' }}>2 courses</div>
                    </div>
                  </div>
                </div>

                {/* Central Target Node: Python */}
                <div style={{
                  position: 'absolute',
                  right: '10px',
                  top: '42px',
                  background: 'rgba(15, 23, 42, 0.95)',
                  border: '1.5px solid #38bdf8',
                  borderRadius: '50%',
                  width: '52px',
                  height: '52px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '0.76rem',
                  fontWeight: 700,
                  color: '#ffffff',
                  boxShadow: '0 0 16px rgba(56, 189, 248, 0.4)'
                }}>
                  Python
                </div>
              </div>

              {/* Right Mini Strength Card & Legend */}
              <div style={{
                background: 'rgba(255, 255, 255, 0.02)',
                border: '1px solid rgba(255, 255, 255, 0.06)',
                borderRadius: '12px',
                padding: '12px'
              }}>
                <div style={{ fontSize: '0.72rem', color: '#94a3b8', marginBottom: '2px' }}>
                  Evidence Strength
                </div>
                <div style={{ fontSize: '1.25rem', fontWeight: 800, color: '#ffffff', marginBottom: '6px' }}>
                  85%
                </div>
                <div style={{ height: '4px', background: 'rgba(255, 255, 255, 0.1)', borderRadius: '9999px', overflow: 'hidden', marginBottom: '10px' }}>
                  <div style={{ width: '85%', height: '100%', background: 'linear-gradient(90deg, #10b981, #06b6d4)', borderRadius: '9999px' }} />
                </div>

                {/* Legend */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', fontSize: '0.68rem', color: '#cbd5e1' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#10b981' }} />
                    <span>Project Evidence</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#06b6d4' }} />
                    <span>Assessment Evidence</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#a855f7' }} />
                    <span>Resume Evidence</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#f59e0b' }} />
                    <span>Learning Evidence</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* 4. BOTTOM ROW: 3 MODULAR COLUMNS */}
      <section className="cockpit-grid-3col">
        
        {/* Column 1: SkillTwin Evolution */}
        <div style={{
          background: 'rgba(13, 17, 27, 0.75)',
          border: '1px solid rgba(255, 255, 255, 0.08)',
          borderRadius: '16px',
          padding: '20px 22px',
          backdropFilter: 'blur(16px)'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
            <h2 style={{ fontSize: '1rem', fontWeight: 700, color: '#f8fafc', margin: 0 }}>
              SkillTwin Evolution
            </h2>
            <button
              onClick={() => onNavigateTab('evolution')}
              style={{ background: 'transparent', border: 'none', color: '#38bdf8', fontSize: '0.8rem', fontWeight: 600, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px' }}
            >
              <span>View Timeline</span>
              <ArrowRight size={12} />
            </button>
          </div>
          <div style={{ fontSize: '0.78rem', color: '#94a3b8', marginBottom: '22px' }}>
            Your skills evolve as you learn.
          </div>

          {/* S-Curve Chart (SVG) matching screenshot */}
          <div style={{ position: 'relative', width: '100%' }}>
            {/* Tooltip 'You are here' */}
            <div style={{
              position: 'absolute',
              top: '-16px',
              left: '72%',
              transform: 'translateX(-50%)',
              background: 'rgba(37, 99, 235, 0.4)',
              border: '1px solid rgba(99, 102, 241, 0.6)',
              borderRadius: '9999px',
              padding: '2px 8px',
              fontSize: '0.68rem',
              color: '#93c5fd',
              fontWeight: 600,
              zIndex: 10
            }}>
              You are here
            </div>

            <svg width="100%" height="80" viewBox="0 0 320 80" fill="none">
              {/* Curve Line */}
              <path
                d="M 20 60 C 70 56, 120 48, 170 36 C 205 28, 230 22, 245 20"
                stroke="#38bdf8"
                strokeWidth="2.5"
                strokeLinecap="round"
                fill="none"
              />
              {/* Glow under curve */}
              <path
                d="M 20 60 C 70 56, 120 48, 170 36 C 205 28, 230 22, 245 20 L 245 75 L 20 75 Z"
                fill="url(#curveGlow)"
                opacity="0.15"
              />
              <defs>
                <linearGradient id="curveGlow" x1="0" y1="0" x2="0" y2="75" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#38bdf8" />
                  <stop offset="1" stopColor="transparent" />
                </linearGradient>
              </defs>

              {/* Checkpoints */}
              <circle cx="20" cy="60" r="4" fill="#1e293b" stroke="#38bdf8" strokeWidth="2" />
              <circle cx="85" cy="53" r="4" fill="#1e293b" stroke="#38bdf8" strokeWidth="2" />
              <circle cx="155" cy="40" r="4" fill="#1e293b" stroke="#38bdf8" strokeWidth="2" />
              <circle cx="225" cy="24" r="5.5" fill="#6366f1" stroke="#ffffff" strokeWidth="2" />

              {/* Intermediate Label on the curve */}
              <text x="240" y="28" fill="#e2e8f0" fontSize="10.5" fontWeight="600" fontFamily="sans-serif">Intermediate</text>
            </svg>

            {/* 4 Stage Labels below */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', fontSize: '0.72rem', color: '#94a3b8', marginTop: '6px' }}>
              <div>
                <div style={{ color: '#cbd5e1', fontWeight: 600 }}>Beginner</div>
                <div style={{ fontSize: '0.64rem', color: '#64748b' }}>Jan 2026</div>
              </div>
              <div>
                <div style={{ color: '#cbd5e1', fontWeight: 600 }}>Learning</div>
                <div style={{ fontSize: '0.64rem', color: '#64748b' }}>Mar 2026</div>
              </div>
              <div>
                <div style={{ color: '#cbd5e1', fontWeight: 600 }}>Building</div>
                <div style={{ fontSize: '0.64rem', color: '#64748b' }}>Jun 2026</div>
              </div>
              <div>
                <div style={{ color: '#38bdf8', fontWeight: 700 }}>Growing</div>
                <div style={{ fontSize: '0.64rem', color: '#38bdf8' }}>Sep 2026</div>
              </div>
            </div>
          </div>
        </div>

        {/* Column 2: Skill Transfer Intelligence */}
        <div style={{
          background: 'rgba(13, 17, 27, 0.75)',
          border: '1px solid rgba(255, 255, 255, 0.08)',
          borderRadius: '16px',
          padding: '20px 22px',
          backdropFilter: 'blur(16px)'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
            <h2 style={{ fontSize: '1rem', fontWeight: 700, color: '#f8fafc', margin: 0 }}>
              Skill Transfer Intelligence
            </h2>
            <button
              onClick={() => onNavigateTab('transfer')}
              style={{ background: 'transparent', border: 'none', color: '#38bdf8', fontSize: '0.8rem', fontWeight: 600, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px' }}
            >
              <span>View All</span>
              <ArrowRight size={12} />
            </button>
          </div>
          <div style={{ fontSize: '0.78rem', color: '#94a3b8', marginBottom: '14px' }}>
            Your existing skills can unlock new roles.
          </div>

          {/* 4 Transfer Rows matching screenshot */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {/* Row 1: Python -> Data Analysis */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '7px 10px',
              borderRadius: '8px',
              background: 'rgba(255, 255, 255, 0.02)',
              border: '1px solid rgba(255, 255, 255, 0.05)'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.78rem', color: '#f8fafc' }}>
                <span style={{ color: '#38bdf8' }}>🔓</span>
                <span style={{ fontWeight: 600 }}>Python</span>
                <span style={{ color: '#64748b' }}>→</span>
                <span style={{ color: '#94a3b8' }}>Data Analysis</span>
              </div>
              <span style={{
                background: 'rgba(16, 185, 129, 0.15)',
                color: '#34d399',
                border: '1px solid rgba(16, 185, 129, 0.3)',
                borderRadius: '9999px',
                padding: '2px 8px',
                fontSize: '0.68rem',
                fontWeight: 600
              }}>
                Strongly transferable
              </span>
            </div>

            {/* Row 2: Excel -> Data Visualization */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '7px 10px',
              borderRadius: '8px',
              background: 'rgba(255, 255, 255, 0.02)',
              border: '1px solid rgba(255, 255, 255, 0.05)'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.78rem', color: '#f8fafc' }}>
                <span style={{ color: '#10b981' }}>📊</span>
                <span style={{ fontWeight: 600 }}>Excel</span>
                <span style={{ color: '#64748b' }}>→</span>
                <span style={{ color: '#94a3b8' }}>Data Visualization</span>
              </div>
              <span style={{
                background: 'rgba(5, 150, 105, 0.15)',
                color: '#10b981',
                border: '1px solid rgba(5, 150, 105, 0.3)',
                borderRadius: '9999px',
                padding: '2px 8px',
                fontSize: '0.68rem',
                fontWeight: 600
              }}>
                Transferable
              </span>
            </div>

            {/* Row 3: Communication -> Project Management */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '7px 10px',
              borderRadius: '8px',
              background: 'rgba(255, 255, 255, 0.02)',
              border: '1px solid rgba(255, 255, 255, 0.05)'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.78rem', color: '#f8fafc' }}>
                <span style={{ color: '#38bdf8' }}>💬</span>
                <span style={{ fontWeight: 600 }}>Communication</span>
                <span style={{ color: '#64748b' }}>→</span>
                <span style={{ color: '#94a3b8' }}>Project Management</span>
              </div>
              <span style={{
                background: 'rgba(5, 150, 105, 0.15)',
                color: '#10b981',
                border: '1px solid rgba(5, 150, 105, 0.3)',
                borderRadius: '9999px',
                padding: '2px 8px',
                fontSize: '0.68rem',
                fontWeight: 600
              }}>
                Transferable
              </span>
            </div>

            {/* Row 4: Problem Solving -> Machine Learning */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '7px 10px',
              borderRadius: '8px',
              background: 'rgba(255, 255, 255, 0.02)',
              border: '1px solid rgba(255, 255, 255, 0.05)'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.78rem', color: '#f8fafc' }}>
                <span style={{ color: '#f59e0b' }}>💡</span>
                <span style={{ fontWeight: 600 }}>Problem Solving</span>
                <span style={{ color: '#64748b' }}>→</span>
                <span style={{ color: '#94a3b8' }}>Machine Learning</span>
              </div>
              <span style={{
                background: 'rgba(245, 158, 11, 0.15)',
                color: '#fbbf24',
                border: '1px solid rgba(245, 158, 11, 0.3)',
                borderRadius: '9999px',
                padding: '2px 8px',
                fontSize: '0.68rem',
                fontWeight: 600
              }}>
                Partially transferable
              </span>
            </div>
          </div>
        </div>

        {/* Column 3: Opportunities for You */}
        <div style={{
          background: 'rgba(13, 17, 27, 0.75)',
          border: '1px solid rgba(255, 255, 255, 0.08)',
          borderRadius: '16px',
          padding: '20px 22px',
          backdropFilter: 'blur(16px)'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
            <h2 style={{ fontSize: '1rem', fontWeight: 700, color: '#f8fafc', margin: 0 }}>
              Opportunities for You
            </h2>
            <button
              onClick={() => onNavigateTab('opportunities')}
              style={{ background: 'transparent', border: 'none', color: '#38bdf8', fontSize: '0.8rem', fontWeight: 600, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px' }}
            >
              <span>View All</span>
              <ArrowRight size={12} />
            </button>
          </div>
          <div style={{ fontSize: '0.78rem', color: '#94a3b8', marginBottom: '14px' }}>
            Curated opportunities based on your profile.
          </div>

          {/* 3 Opportunity Cards matching screenshot */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {/* Op 1: AI Intern / TechCorp */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '8px 12px',
              borderRadius: '10px',
              background: 'rgba(255, 255, 255, 0.02)',
              border: '1px solid rgba(255, 255, 255, 0.05)'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <div style={{ width: '28px', height: '28px', borderRadius: '8px', background: 'rgba(56, 189, 248, 0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Bot size={15} color="#38bdf8" />
                </div>
                <div>
                  <div style={{ fontSize: '0.82rem', fontWeight: 700, color: '#f8fafc' }}>AI Intern</div>
                  <div style={{ fontSize: '0.7rem', color: '#94a3b8' }}>TechCorp</div>
                </div>
              </div>
              <div style={{ display: 'flex', gap: '6px' }}>
                <span style={{ background: 'rgba(99, 102, 241, 0.2)', color: '#93c5fd', borderRadius: '6px', padding: '2px 7px', fontSize: '0.68rem', fontWeight: 600 }}>
                  Internship
                </span>
                <span style={{ background: 'rgba(255, 255, 255, 0.06)', color: '#cbd5e1', borderRadius: '6px', padding: '2px 7px', fontSize: '0.68rem', fontWeight: 600 }}>
                  Remote
                </span>
              </div>
            </div>

            {/* Op 2: Data Analyst / DataWorks */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '8px 12px',
              borderRadius: '10px',
              background: 'rgba(255, 255, 255, 0.02)',
              border: '1px solid rgba(255, 255, 255, 0.05)'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <div style={{ width: '28px', height: '28px', borderRadius: '8px', background: 'rgba(16, 185, 129, 0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <BarChart2 size={15} color="#34d399" />
                </div>
                <div>
                  <div style={{ fontSize: '0.82rem', fontWeight: 700, color: '#f8fafc' }}>Data Analyst</div>
                  <div style={{ fontSize: '0.7rem', color: '#94a3b8' }}>DataWorks</div>
                </div>
              </div>
              <div style={{ display: 'flex', gap: '6px' }}>
                <span style={{ background: 'rgba(99, 102, 241, 0.2)', color: '#93c5fd', borderRadius: '6px', padding: '2px 7px', fontSize: '0.68rem', fontWeight: 600 }}>
                  Internship
                </span>
                <span style={{ background: 'rgba(255, 255, 255, 0.06)', color: '#cbd5e1', borderRadius: '6px', padding: '2px 7px', fontSize: '0.68rem', fontWeight: 600 }}>
                  On-site
                </span>
              </div>
            </div>

            {/* Op 3: ML Project Contributor / Open Source */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '8px 12px',
              borderRadius: '10px',
              background: 'rgba(255, 255, 255, 0.02)',
              border: '1px solid rgba(255, 255, 255, 0.05)'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <div style={{ width: '28px', height: '28px', borderRadius: '8px', background: 'rgba(168, 85, 247, 0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Sparkles size={15} color="#c084fc" />
                </div>
                <div>
                  <div style={{ fontSize: '0.82rem', fontWeight: 700, color: '#f8fafc' }}>ML Project Contributor</div>
                  <div style={{ fontSize: '0.7rem', color: '#94a3b8' }}>Open Source</div>
                </div>
              </div>
              <div style={{ display: 'flex', gap: '6px' }}>
                <span style={{ background: 'rgba(99, 102, 241, 0.2)', color: '#93c5fd', borderRadius: '6px', padding: '2px 7px', fontSize: '0.68rem', fontWeight: 600 }}>
                  Volunteer
                </span>
                <span style={{ background: 'rgba(255, 255, 255, 0.06)', color: '#cbd5e1', borderRadius: '6px', padding: '2px 7px', fontSize: '0.68rem', fontWeight: 600 }}>
                  Remote
                </span>
              </div>
            </div>
          </div>
        </div>

      </section>

    </div>
  );
}
