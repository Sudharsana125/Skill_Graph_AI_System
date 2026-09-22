import React from 'react';
import { AlertTriangle, CheckCircle2, TrendingUp, Zap, ShieldCheck } from 'lucide-react';

export default function SkillGapPanel({ 
  highPriorityGaps = [], 
  mediumPriorityGaps = [], 
  strongAreas = [],
  onNavigateToRoadmap
}) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '22px' }}>
      {/* Overview Banner */}
      <div className="glass-panel" style={{ padding: '22px 26px', borderLeft: '4px solid var(--accent-primary)' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '14px' }}>
          <div>
            <h3 style={{ fontSize: '1.25rem', marginBottom: '4px', fontWeight: 700 }}>Competency Gap Diagnostics</h3>
            <p style={{ fontSize: '0.86rem', color: 'var(--text-muted)' }}>
              Targeted deficit breakdown compared against current industry hiring requirements.
            </p>
          </div>
          <button 
            onClick={onNavigateToRoadmap}
            className="btn-primary" 
            style={{ padding: '9px 18px', fontSize: '0.86rem' }}
          >
            <Zap size={15} />
            <span>Open Gap-Closing Roadmap</span>
          </button>
        </div>
      </div>

      {/* 3 Categories: HIGH, MEDIUM, STRONG */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        
        {/* HIGH PRIORITY GAPS */}
        {highPriorityGaps.length > 0 && (
          <div className="glass-panel" style={{ padding: '22px', borderColor: 'rgba(244, 63, 94, 0.25)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
              <AlertTriangle size={17} color="var(--accent-rose)" />
              <h4 style={{ fontSize: '1.05rem', color: '#fda4af', fontWeight: 700 }}>
                CRITICAL BENCHMARK GAPS ({highPriorityGaps.length})
              </h4>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '14px' }}>
              {highPriorityGaps.map((gap, i) => (
                <div key={i} className="card-interactive" style={{
                  background: 'rgba(255, 255, 255, 0.02)',
                  border: '1px solid rgba(244, 63, 94, 0.2)',
                  borderRadius: 'var(--radius-md)',
                  padding: '18px'
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                    <span style={{ fontWeight: 700, fontSize: '1.05rem', color: '#ffffff' }}>{gap.skill_name}</span>
                    <span className="badge badge-high">High Priority</span>
                  </div>

                  <div style={{ display: 'flex', gap: '16px', fontSize: '0.82rem', color: 'var(--text-muted)', marginBottom: '12px' }}>
                    <div>Current: <strong style={{ color: '#ffffff' }}>{gap.current_level}</strong></div>
                    <div>Target: <strong style={{ color: 'var(--accent-secondary)' }}>{gap.required_level}</strong></div>
                  </div>

                  <p style={{ fontSize: '0.84rem', color: 'var(--text-secondary)', lineHeight: 1.5, marginBottom: '12px' }}>
                    {gap.reason}
                  </p>

                  <div style={{ 
                    fontSize: '0.78rem', color: 'var(--accent-secondary)', 
                    background: 'rgba(6, 182, 212, 0.08)', padding: '7px 12px', 
                    borderRadius: 'var(--radius-sm)',
                    borderLeft: '2px solid var(--accent-secondary)'
                  }}>
                    Recommended Action: Address in Roadmap Phase 1-3.
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* MEDIUM PRIORITY GAPS */}
        {mediumPriorityGaps.length > 0 && (
          <div className="glass-panel" style={{ padding: '22px', borderColor: 'rgba(245, 158, 11, 0.25)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
              <TrendingUp size={17} color="var(--accent-amber)" />
              <h4 style={{ fontSize: '1.05rem', color: '#fcd34d', fontWeight: 700 }}>
                SECONDARY DEVELOPMENT AREAS ({mediumPriorityGaps.length})
              </h4>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '14px' }}>
              {mediumPriorityGaps.map((gap, i) => (
                <div key={i} className="card-interactive" style={{
                  background: 'rgba(255, 255, 255, 0.02)',
                  border: '1px solid rgba(245, 158, 11, 0.2)',
                  borderRadius: 'var(--radius-md)',
                  padding: '18px'
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                    <span style={{ fontWeight: 700, fontSize: '1.05rem', color: '#ffffff' }}>{gap.skill_name}</span>
                    <span className="badge badge-medium">Medium Priority</span>
                  </div>

                  <div style={{ display: 'flex', gap: '16px', fontSize: '0.82rem', color: 'var(--text-muted)', marginBottom: '12px' }}>
                    <div>Current: <strong style={{ color: '#ffffff' }}>{gap.current_level}</strong></div>
                    <div>Target: <strong style={{ color: 'var(--accent-secondary)' }}>{gap.required_level}</strong></div>
                  </div>

                  <p style={{ fontSize: '0.84rem', color: 'var(--text-secondary)', lineHeight: 1.5, marginBottom: '12px' }}>
                    {gap.reason}
                  </p>

                  <div style={{ 
                    fontSize: '0.78rem', color: '#fcd34d', 
                    background: 'rgba(245, 158, 11, 0.08)', padding: '7px 12px', 
                    borderRadius: 'var(--radius-sm)',
                    borderLeft: '2px solid var(--accent-amber)'
                  }}>
                    Recommended Action: Deepen through integrated portfolio capstone.
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* STRONG AREAS */}
        {strongAreas.length > 0 && (
          <div className="glass-panel" style={{ padding: '22px', borderColor: 'rgba(16, 185, 129, 0.25)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
              <ShieldCheck size={17} color="var(--accent-emerald)" />
              <h4 style={{ fontSize: '1.05rem', color: '#6ee7b7', fontWeight: 700 }}>
                VERIFIED BENCHMARK STRENGTHS ({strongAreas.length})
              </h4>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '14px' }}>
              {strongAreas.map((gap, i) => (
                <div key={i} className="card-interactive" style={{
                  background: 'rgba(255, 255, 255, 0.02)',
                  border: '1px solid rgba(16, 185, 129, 0.2)',
                  borderRadius: 'var(--radius-md)',
                  padding: '18px'
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                    <span style={{ fontWeight: 700, fontSize: '1.05rem', color: '#ffffff' }}>{gap.skill_name}</span>
                    <span className="badge badge-strong">Meets Benchmark</span>
                  </div>

                  <div style={{ display: 'flex', gap: '16px', fontSize: '0.82rem', color: 'var(--text-muted)', marginBottom: '10px' }}>
                    <div>Current: <strong style={{ color: 'var(--accent-emerald)' }}>{gap.current_level}</strong></div>
                    <div>Required: <span>{gap.required_level}</span></div>
                  </div>

                  <p style={{ fontSize: '0.84rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                    {gap.reason}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
