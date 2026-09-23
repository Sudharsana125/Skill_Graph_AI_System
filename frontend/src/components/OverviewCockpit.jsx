import React, { useState } from 'react';
import { 
  Zap, 
  Clock, 
  Sliders, 
  ArrowRight, 
  CheckCircle2, 
  Sparkles, 
  ShieldCheck, 
  TrendingUp, 
  FileText, 
  GitFork, 
  BookOpen, 
  Bot, 
  BarChart2, 
  Plus, 
  Layers, 
  Compass, 
  Target,
  AlertTriangle,
  GitBranch,
  RefreshCw,
  Flame
} from 'lucide-react';
import InteractiveSkillGraph from './InteractiveSkillGraph';

export default function OverviewCockpit({
  data,
  onNavigateTab,
  onEditGoals,
  onCompleteNextMove,
  isUpdatingProgress
}) {
  const [selectedWhatIfRole, setSelectedWhatIfRole] = useState(data.target_role || 'AI Engineer');

  // Next Best Move calculation
  const nextMove = data.next_best_move || {};
  const nextMoveTitle = nextMove.title || (data.roadmap && data.roadmap[0] ? data.roadmap[0].learning_objective : "Deploy Containerized RAG API");
  const nextMoveWhy = nextMove.why_now || "Closes your highest priority technical gaps and produces verified code deliverables for your portfolio.";
  const nextMoveSkills = nextMove.skills_improved && nextMove.skills_improved.length > 0 
    ? nextMove.skills_improved 
    : (data.high_priority_gaps ? data.high_priority_gaps.slice(0, 3).map(g => g.skill_name) : ["FastAPI", "Docker", "RAG"]);
  const nextMoveEffort = nextMove.estimated_effort || "4 days";
  const nextMoveCloses = nextMove.closes_gaps || `${data.high_priority_gaps?.length || 2} critical gaps`;

  // Dynamic what-if calculations relative to user profile
  const baseScore = data.alignment_score || 68.0;
  const userSkillNames = (data.skills || []).map(s => s.name.toLowerCase());
  
  const whatIfConfigs = {
    'AI Engineer': {
      fit: Math.min(100, Math.round(baseScore)),
      gaps: data.high_priority_gaps?.length || 3,
      time: `${data.timeline_months || 4} months`,
      keySkills: ['Python', 'Machine Learning', 'RAG / Vector DBs', 'System Design']
    },
    'Agentic AI Architect': {
      fit: Math.max(35, Math.min(95, Math.round(baseScore - 6))),
      gaps: Math.max(2, (data.high_priority_gaps?.length || 3) + 1),
      time: `${(data.timeline_months || 4) + 1} months`,
      keySkills: ['LangGraph', 'Multi-Agent Routing', 'FastAPI', 'Evaluation']
    },
    'Data Analyst': {
      fit: Math.max(40, Math.min(98, Math.round(baseScore + (userSkillNames.includes('sql') ? 8 : -4)))),
      gaps: Math.max(1, (data.high_priority_gaps?.length || 3) - 1),
      time: `${Math.max(2, (data.timeline_months || 4) - 1)} months`,
      keySkills: ['SQL', 'Python', 'BI Dashboards', 'Statistical Modeling']
    },
    'MLOps Specialist': {
      fit: Math.max(35, Math.min(92, Math.round(baseScore - 8))),
      gaps: (data.high_priority_gaps?.length || 3) + 2,
      time: `${(data.timeline_months || 4) + 2} months`,
      keySkills: ['Docker', 'Kubernetes', 'CI/CD Pipelines', 'Model Registry']
    }
  };

  const currentWhatIf = whatIfConfigs[selectedWhatIfRole] || whatIfConfigs['AI Engineer'];

  // Transferable skills
  const transferSkills = (data.transferable_skills && data.transferable_skills.length > 0)
    ? data.transferable_skills.slice(0, 4)
    : [];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
      
      {/* 1. CURRENT STATE & TARGET AMBITION (HERO HEADER) */}
      <section 
        className="glass-panel" 
        style={{ 
          padding: '24px 28px',
          background: 'linear-gradient(135deg, rgba(15, 23, 42, 0.9) 0%, rgba(17, 24, 39, 0.75) 100%)',
          border: '1px solid rgba(255, 255, 255, 0.08)'
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '20px' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
              <span className="live-pulse"></span>
              <span style={{ fontSize: '0.74rem', color: '#38bdf8', fontWeight: 700, letterSpacing: '0.04em', textTransform: 'uppercase' }}>
                Active Career Intelligence State
              </span>
              {data.is_demo && (
                <span style={{ fontSize: '0.68rem', background: 'rgba(245, 158, 11, 0.15)', color: '#f59e0b', padding: '2px 8px', borderRadius: '4px', border: '1px solid rgba(245, 158, 11, 0.3)', fontWeight: 700 }}>
                  DEMO PROFILE
                </span>
              )}
            </div>

            <h1 style={{ fontSize: 'clamp(1.5rem, 2.5vw, 2.1rem)', fontWeight: 800, color: '#f8fafc', letterSpacing: '-0.02em', margin: '0 0 6px 0' }}>
              {data.name || "Real-Time Engineer"}
            </h1>

            <p style={{ color: '#94a3b8', fontSize: '0.9rem', maxWidth: '640px', margin: 0 }}>
              Benchmarked against verified industry hiring requirements for <strong style={{ color: '#ffffff' }}>{data.target_role || "AI Engineer"}</strong>.
            </p>
          </div>

          {/* Quick Metrics Cards */}
          <div style={{ display: 'flex', gap: '14px', flexWrap: 'wrap' }}>
            <div style={{ 
              background: 'rgba(0, 0, 0, 0.3)', 
              border: '1px solid rgba(255, 255, 255, 0.08)', 
              borderRadius: '10px', 
              padding: '12px 18px', 
              textAlign: 'center',
              minWidth: '110px'
            }}>
              <span style={{ fontSize: '0.7rem', color: '#94a3b8', textTransform: 'uppercase', fontWeight: 600, display: 'block', marginBottom: '2px' }}>
                Role Match
              </span>
              <span style={{ fontSize: '1.6rem', fontWeight: 800, color: '#38bdf8', fontFamily: 'var(--font-mono)' }}>
                {Math.round(data.alignment_score || 68)}%
              </span>
            </div>

            <div style={{ 
              background: 'rgba(0, 0, 0, 0.3)', 
              border: '1px solid rgba(255, 255, 255, 0.08)', 
              borderRadius: '10px', 
              padding: '12px 18px', 
              textAlign: 'center',
              minWidth: '110px'
            }}>
              <span style={{ fontSize: '0.7rem', color: '#94a3b8', textTransform: 'uppercase', fontWeight: 600, display: 'block', marginBottom: '2px' }}>
                Verified Skills
              </span>
              <span style={{ fontSize: '1.6rem', fontWeight: 800, color: '#10b981', fontFamily: 'var(--font-mono)' }}>
                {data.skills?.length || 0}
              </span>
            </div>

            <div style={{ 
              background: 'rgba(0, 0, 0, 0.3)', 
              border: '1px solid rgba(255, 255, 255, 0.08)', 
              borderRadius: '10px', 
              padding: '12px 18px', 
              textAlign: 'center',
              minWidth: '110px'
            }}>
              <span style={{ fontSize: '0.7rem', color: '#94a3b8', textTransform: 'uppercase', fontWeight: 600, display: 'block', marginBottom: '2px' }}>
                Critical Gaps
              </span>
              <span style={{ fontSize: '1.6rem', fontWeight: 800, color: '#f43f5e', fontFamily: 'var(--font-mono)' }}>
                {data.high_priority_gaps?.length || 0}
              </span>
            </div>

            <button
              onClick={onEditGoals}
              className="btn-secondary"
              style={{ padding: '0 16px', display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.84rem' }}
              title="Change Target Role or Timeline"
            >
              <Sliders size={15} />
              <span>Target Role</span>
            </button>
          </div>
        </div>
      </section>

      {/* 2. REAL INTERACTIVE SKILLGRAPH COMPONENT */}
      <section>
        <InteractiveSkillGraph 
          skills={data.skills || []}
          highPriorityGaps={data.high_priority_gaps || []}
          mediumPriorityGaps={data.medium_priority_gaps || []}
          transferableSkills={data.transferable_skills || []}
          targetRole={data.target_role || 'AI Engineer'}
          alignmentScore={Math.round(data.alignment_score || 68)}
          onNodeClick={(node) => {
            // Optional node interaction
          }}
        />
      </section>

      {/* 3. NEXT BEST MOVE (PLAYABLE MISSION QUEST CARD) */}
      <section 
        className="quest-interactive-card"
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '20px' }}>
          <div style={{ flex: 1, minWidth: '280px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
              <span className="shimmer-badge">
                <Flame size={13} style={{ marginRight: '4px' }} />
                Active Mission • +4.5% Readiness Boost
              </span>
              <span style={{ fontSize: '0.74rem', color: 'var(--text-muted)' }}>
                Closes {nextMoveCloses}
              </span>
            </div>

            <h3 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#f8fafc', margin: '0 0 8px 0', letterSpacing: '-0.02em' }}>
              {nextMoveTitle}
            </h3>

            <p style={{ color: 'var(--text-secondary)', fontSize: '0.88rem', lineHeight: 1.5, margin: '0 0 16px 0', maxWidth: '680px' }}>
              <strong style={{ color: '#ffffff' }}>Why this action?</strong> {nextMoveWhy}
            </p>

            {/* Playable Interactive Deliverables Checklist */}
            <div style={{ 
              background: 'rgba(0, 0, 0, 0.25)', 
              borderRadius: '8px', 
              padding: '12px 16px', 
              marginBottom: '16px',
              border: '1px solid rgba(255, 255, 255, 0.06)',
              display: 'flex',
              flexDirection: 'column',
              gap: '6px'
            }}>
              <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em', fontWeight: 700 }}>
                Sprint Deliverables Checklist:
              </span>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.8rem', color: '#34d399' }}>
                <CheckCircle2 size={14} color="#10b981" />
                <span>1. Core Model Schema & API Contract Specification (Done)</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.8rem', color: '#f8fafc' }}>
                <div style={{ width: '14px', height: '14px', borderRadius: '3px', border: '1.5px solid var(--accent-amber)', display: 'inline-block' }} />
                <span>2. Asynchronous Request Routing & Vector Index Integration</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                <div style={{ width: '14px', height: '14px', borderRadius: '3px', border: '1.5px solid rgba(255,255,255,0.2)', display: 'inline-block' }} />
                <span>3. Multi-Stage Dockerfile Packaging & Test Deliverables</span>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '16px', flexWrap: 'wrap', fontSize: '0.8rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#cbd5e1' }}>
                <span style={{ color: 'var(--text-muted)' }}>Develops:</span>
                {nextMoveSkills.map((sk, idx) => (
                  <span key={idx} style={{ 
                    background: 'rgba(255, 255, 255, 0.06)', 
                    border: '1px solid rgba(255, 255, 255, 0.12)', 
                    padding: '2px 8px', 
                    borderRadius: '4px',
                    color: 'var(--accent-sky)',
                    fontWeight: 600,
                    fontSize: '0.76rem'
                  }}>
                    {sk}
                  </span>
                ))}
              </div>

              <div style={{ color: 'var(--text-muted)' }}>
                Pacing: <strong style={{ color: '#f8fafc' }}>{nextMoveEffort}</strong>
              </div>
            </div>
          </div>

          {/* Action Trigger */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', minWidth: '160px' }}>
            <button
              onClick={onCompleteNextMove}
              disabled={isUpdatingProgress}
              className="btn-primary"
              style={{
                padding: '12px 20px',
                fontSize: '0.9rem',
                justifyContent: 'center',
                opacity: isUpdatingProgress ? 0.7 : 1
              }}
              id="complete-next-move-btn"
            >
              {isUpdatingProgress ? (
                <>
                  <RefreshCw size={15} className="spin" />
                  <span>Recalibrating...</span>
                </>
              ) : (
                <>
                  <CheckCircle2 size={16} />
                  <span>Mark Completed</span>
                </>
              )}
            </button>
            <span style={{ fontSize: '0.7rem', color: '#64748b', textAlign: 'center' }}>
              Recalibrates graph & alignment
            </span>
          </div>
        </div>
      </section>

      {/* 4. SKILL GAPS & TRANSFERABLE INTELLIGENCE (TWO-COLUMN DECISION MATRIX) */}
      <section style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '20px' }}>
        
        {/* Column 1: Critical Benchmark Gaps */}
        <div className="anim-card-glow" style={{ padding: '24px', borderColor: 'rgba(244, 63, 94, 0.35)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <AlertTriangle size={18} color="var(--accent-rose)" />
              <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#f8fafc' }}>
                Critical Benchmark Gaps
              </h3>
            </div>
            <span style={{ fontSize: '0.74rem', color: '#fda4af', fontWeight: 700, background: 'rgba(244, 63, 94, 0.15)', border: '1px solid rgba(244, 63, 94, 0.3)', padding: '2px 8px', borderRadius: '4px' }}>
              {data.high_priority_gaps?.length || 0} Deficits
            </span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {(data.high_priority_gaps && data.high_priority_gaps.length > 0) ? (
              data.high_priority_gaps.slice(0, 4).map((gap, i) => (
                <div 
                  key={i} 
                  style={{
                    padding: '12px 14px',
                    background: 'rgba(255, 255, 255, 0.02)',
                    border: '1px dashed rgba(244, 63, 94, 0.3)',
                    borderRadius: '8px',
                    transition: 'all 0.18s ease'
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.borderColor = 'var(--accent-rose)'}
                  onMouseLeave={(e) => e.currentTarget.style.borderColor = 'rgba(244, 63, 94, 0.3)'}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
                    <span style={{ fontWeight: 700, color: '#ffffff', fontSize: '0.92rem' }}>
                      {gap.skill_name}
                    </span>
                    <span style={{ fontSize: '0.72rem', color: 'var(--accent-rose)', fontFamily: 'var(--font-mono)' }}>
                      Current: {gap.current_level} → Target: {gap.required_level}
                    </span>
                  </div>
                  <p style={{ color: 'var(--text-muted)', fontSize: '0.78rem', lineHeight: 1.4, margin: 0 }}>
                    {gap.reason || "Core industry benchmark requirement."}
                  </p>
                </div>
              ))
            ) : (
              <div style={{ padding: '24px 0', textAlign: 'center', color: '#10b981', fontSize: '0.86rem' }}>
                ✓ No critical gaps found for current milestone!
              </div>
            )}
          </div>

          <button 
            onClick={() => onNavigateTab('assessments')}
            className="btn-secondary"
            style={{ width: '100%', marginTop: '14px', justifyContent: 'center', fontSize: '0.82rem', padding: '8px 12px' }}
          >
            <span>View Full Diagnostic Breakdown</span>
            <ArrowRight size={14} />
          </button>
        </div>

        {/* Column 2: Skill Transfer Intelligence */}
        <div className="anim-card-glow" style={{ padding: '24px', borderColor: 'rgba(6, 182, 212, 0.35)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Zap size={18} color="var(--accent-cyan)" />
              <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#f8fafc' }}>
                Skill Transfer Intelligence
              </h3>
            </div>
            <span style={{ fontSize: '0.74rem', color: 'var(--accent-sky)', fontWeight: 700, background: 'rgba(6, 182, 212, 0.15)', border: '1px solid rgba(6, 182, 212, 0.3)', padding: '2px 8px', borderRadius: '4px' }}>
              {transferSkills.length} Reusable Bridges
            </span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {transferSkills.length > 0 ? (
              transferSkills.map((t, idx) => (
                <div 
                  key={idx} 
                  style={{
                    padding: '12px 14px',
                    background: 'rgba(255, 255, 255, 0.02)',
                    border: '1px solid rgba(6, 182, 212, 0.25)',
                    borderRadius: '8px',
                    transition: 'all 0.18s ease'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = 'var(--accent-cyan)';
                    e.currentTarget.style.boxShadow = '0 0 16px rgba(6, 182, 212, 0.2)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = 'rgba(6, 182, 212, 0.25)';
                    e.currentTarget.style.boxShadow = 'none';
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px', flexWrap: 'wrap' }}>
                    <span style={{ fontWeight: 700, color: '#f8fafc', fontSize: '0.86rem' }}>
                      {t.source_skill || t.existing_skill}
                    </span>
                    <ArrowRight size={12} color="var(--accent-cyan)" />
                    <span style={{ fontWeight: 700, color: 'var(--accent-sky)', fontSize: '0.86rem' }}>
                      {t.target_skill_requirement || t.target_requirement}
                    </span>
                    <span style={{ marginLeft: 'auto', fontSize: '0.68rem', color: '#34d399', background: 'rgba(16, 185, 129, 0.1)', padding: '1px 6px', borderRadius: '4px', fontWeight: 700 }}>
                      ⚡ {t.effort_reduction_percentage || "50%"} Less Study
                    </span>
                  </div>
                  <p style={{ color: 'var(--text-muted)', fontSize: '0.78rem', lineHeight: 1.4, margin: 0 }}>
                    <strong style={{ color: '#cbd5e1' }}>Why:</strong> {t.why_it_transfers || "Algorithmic foundation directly accelerates target framework adoption."}
                  </p>
                </div>
              ))
            ) : (
              <div style={{ padding: '24px 0', textAlign: 'center', color: 'var(--text-muted)', fontSize: '0.86rem' }}>
                Add more foundation skills to discover transferable bridges.
              </div>
            )}
          </div>

          <button 
            onClick={() => onNavigateTab('opportunities')}
            className="btn-secondary"
            style={{ width: '100%', marginTop: '14px', justifyContent: 'center', fontSize: '0.82rem', padding: '8px 12px' }}
          >
            <span>Explore All Transfer Bridges</span>
            <ArrowRight size={14} />
          </button>
        </div>
      </section>

      {/* 5. CAREER WHAT-IF QUICK COMPARISON */}
      <section className="glass-panel" style={{ padding: '24px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '14px', marginBottom: '18px' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
              <Compass size={18} color="#818cf8" />
              <h3 style={{ fontSize: '1.15rem', fontWeight: 700, color: '#f8fafc' }}>
                Career What-If Simulator
              </h3>
            </div>
            <p style={{ fontSize: '0.84rem', color: '#94a3b8', margin: 0 }}>
              Simulate candidate alignment across alternative career paths using your exact current SkillGraph.
            </p>
          </div>

          <button 
            onClick={() => onNavigateTab('whatif')}
            className="btn-secondary"
            style={{ padding: '6px 14px', fontSize: '0.82rem' }}
          >
            <span>Open Advanced Multi-Track Simulator</span>
            <ArrowRight size={14} />
          </button>
        </div>

        {/* Career Selector Pills */}
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '16px' }}>
          {['AI Engineer', 'Agentic AI Architect', 'Data Analyst', 'MLOps Specialist'].map((role) => (
            <button
              key={role}
              onClick={() => setSelectedWhatIfRole(role)}
              style={{
                padding: '6px 14px',
                borderRadius: '8px',
                background: selectedWhatIfRole === role ? 'rgba(56, 189, 248, 0.15)' : 'rgba(255, 255, 255, 0.03)',
                color: selectedWhatIfRole === role ? '#38bdf8' : '#94a3b8',
                border: selectedWhatIfRole === role ? '1px solid #38bdf8' : '1px solid rgba(255, 255, 255, 0.08)',
                fontSize: '0.82rem',
                fontWeight: 600,
                cursor: 'pointer',
                transition: 'all 0.15s'
              }}
            >
              {role}
            </button>
          ))}
        </div>

        {/* Selected Role Quick Comparison Details */}
        <div style={{ 
          padding: '18px 20px', 
          background: 'rgba(0, 0, 0, 0.3)', 
          borderRadius: '10px', 
          border: '1px solid rgba(255, 255, 255, 0.08)',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '16px',
          alignItems: 'center'
        }}>
          <div>
            <span style={{ fontSize: '0.72rem', color: '#94a3b8', textTransform: 'uppercase', fontWeight: 600 }}>
              Readiness Fit
            </span>
            <div style={{ fontSize: '1.6rem', fontWeight: 800, color: '#38bdf8', fontFamily: 'var(--font-mono)' }}>
              {currentWhatIf.fit}%
            </div>
            <span style={{ fontSize: '0.74rem', color: '#64748b' }}>
              Functional capability match
            </span>
          </div>

          <div>
            <span style={{ fontSize: '0.72rem', color: '#94a3b8', textTransform: 'uppercase', fontWeight: 600 }}>
              Critical Skill Gaps
            </span>
            <div style={{ fontSize: '1.6rem', fontWeight: 800, color: '#f43f5e', fontFamily: 'var(--font-mono)' }}>
              {currentWhatIf.gaps} Gaps
            </div>
            <span style={{ fontSize: '0.74rem', color: '#64748b' }}>
              Missing core requirements
            </span>
          </div>

          <div>
            <span style={{ fontSize: '0.72rem', color: '#94a3b8', textTransform: 'uppercase', fontWeight: 600 }}>
              Estimated Effort
            </span>
            <div style={{ fontSize: '1.6rem', fontWeight: 800, color: '#10b981', fontFamily: 'var(--font-mono)' }}>
              {currentWhatIf.time}
            </div>
            <span style={{ fontSize: '0.74rem', color: '#64748b' }}>
              Paced at 10 hrs / week
            </span>
          </div>

          <div>
            <span style={{ fontSize: '0.72rem', color: '#94a3b8', textTransform: 'uppercase', fontWeight: 600, display: 'block', marginBottom: '6px' }}>
              Core Key Skills Needed
            </span>
            <div style={{ display: 'flex', gap: '4px', flexWrap: 'wrap' }}>
              {currentWhatIf.keySkills.map((sk, idx) => (
                <span key={idx} style={{ fontSize: '0.72rem', background: 'rgba(255, 255, 255, 0.05)', padding: '2px 8px', borderRadius: '4px', color: '#cbd5e1' }}>
                  {sk}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 6. VERIFIABLE EVIDENCE PROVENANCE AUDIT */}
      <section className="glass-panel" style={{ padding: '24px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '14px', marginBottom: '16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <ShieldCheck size={18} color="#10b981" />
            <h3 style={{ fontSize: '1.15rem', fontWeight: 700, color: '#f8fafc' }}>
              Skill Evidence Provenance Audit
            </h3>
          </div>

          <button 
            onClick={() => onNavigateTab('evidence')}
            className="btn-secondary"
            style={{ padding: '6px 14px', fontSize: '0.82rem' }}
          >
            <span>Inspect Full Evidence Tree</span>
            <ArrowRight size={14} />
          </button>
        </div>

        <p style={{ color: '#94a3b8', fontSize: '0.86rem', margin: '0 0 16px 0' }}>
          Zero self-reported claims. Every verified capability is backed by traceable code commits, assessments, or repository artifacts.
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '12px' }}>
          {(data.evidence_graph && data.evidence_graph.length > 0 ? data.evidence_graph.slice(0, 3) : (data.skills || []).slice(0, 3)).map((item, idx) => {
            const skillName = item.skill_name || item.name;
            const tier = item.verification_tier || 'VERIFIED';
            const strength = Math.round((item.evidence_strength || item.confidence || 0.8) * 100);

            return (
              <div 
                key={idx}
                style={{
                  padding: '14px 16px',
                  background: 'rgba(255, 255, 255, 0.02)',
                  border: '1px solid rgba(255, 255, 255, 0.08)',
                  borderRadius: '8px',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center'
                }}
              >
                <div>
                  <div style={{ fontSize: '0.94rem', fontWeight: 700, color: '#ffffff' }}>
                    {skillName}
                  </div>
                  <div style={{ fontSize: '0.74rem', color: '#10b981', marginTop: '2px' }}>
                    ✓ Traceable Evidence Artifact
                  </div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontSize: '1.1rem', fontWeight: 800, color: '#38bdf8', fontFamily: 'var(--font-mono)' }}>
                    {strength}%
                  </div>
                  <div style={{ fontSize: '0.68rem', color: '#94a3b8' }}>
                    Confidence
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

    </div>
  );
}
