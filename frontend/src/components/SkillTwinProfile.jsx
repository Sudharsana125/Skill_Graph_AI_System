import React from 'react';
import { ArrowRight, ShieldCheck, Target, AlertTriangle } from 'lucide-react';

export default function SkillTwinProfile({ 
  profile, 
  skills = [], 
  highPriorityGaps = [], 
  mediumPriorityGaps = [], 
  roadmap = [] 
}) {
  const completedTasks = roadmap.filter(t => t.is_completed);

  return (
    <div className="glass-panel" style={{ padding: '30px' }}>
      <div style={{ textAlign: 'center', marginBottom: '32px' }}>
        <h3 style={{ fontSize: '1.35rem', marginBottom: '6px', fontWeight: 700 }}>
          SkillTwin Evolution Pipeline
        </h3>
        <p style={{ fontSize: '0.86rem', color: 'var(--text-muted)' }}>
          Continuous digital mapping from current verified capabilities to industry benchmark mastery.
        </p>
      </div>

      {/* 3-Stage Visual Pipeline: CURRENT -> GAPS -> TARGET */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
        alignItems: 'stretch',
        gap: '20px',
        marginBottom: '24px'
      }}>
        {/* STAGE 1: CURRENT CAPABILITIES */}
        <div className="card-interactive" style={{
          background: 'rgba(99, 102, 241, 0.04)',
          border: '1px solid rgba(99, 102, 241, 0.25)',
          borderRadius: 'var(--radius-md)',
          padding: '22px'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '14px' }}>
            <ShieldCheck size={18} color="var(--accent-primary)" />
            <h4 style={{ fontSize: '0.98rem', color: '#c7d2fe', fontWeight: 700 }}>Stage 1: Verified Baseline</h4>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {skills.slice(0, 5).map((s, idx) => (
              <div key={idx} style={{ 
                display: 'flex', justifyContent: 'space-between', 
                fontSize: '0.82rem', background: 'rgba(255, 255, 255, 0.03)',
                padding: '7px 11px', borderRadius: '6px',
                border: '1px solid rgba(255, 255, 255, 0.04)'
              }}>
                <span style={{ color: 'var(--text-secondary)' }}>{s.name}</span>
                <strong style={{ color: 'var(--accent-emerald)' }}>{s.level}</strong>
              </div>
            ))}
          </div>
        </div>

        {/* STAGE 2: DIAGNOSED GAPS */}
        <div className="card-interactive" style={{
          background: 'rgba(244, 63, 94, 0.04)',
          border: '1px solid rgba(244, 63, 94, 0.25)',
          borderRadius: 'var(--radius-md)',
          padding: '22px'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '14px' }}>
            <AlertTriangle size={18} color="var(--accent-rose)" />
            <h4 style={{ fontSize: '0.98rem', color: '#fda4af', fontWeight: 700 }}>Stage 2: Target Gaps</h4>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {highPriorityGaps.slice(0, 3).map((g, idx) => (
              <div key={idx} style={{ 
                display: 'flex', justifyContent: 'space-between', 
                fontSize: '0.82rem', background: 'rgba(244, 63, 94, 0.08)',
                padding: '7px 11px', borderRadius: '6px',
                border: '1px solid rgba(244, 63, 94, 0.15)'
              }}>
                <span style={{ color: '#ffffff' }}>{g.skill_name}</span>
                <span className="badge badge-high" style={{ fontSize: '0.65rem' }}>Critical</span>
              </div>
            ))}
            {mediumPriorityGaps.slice(0, 2).map((g, idx) => (
              <div key={idx} style={{ 
                display: 'flex', justifyContent: 'space-between', 
                fontSize: '0.82rem', background: 'rgba(245, 158, 11, 0.08)',
                padding: '7px 11px', borderRadius: '6px',
                border: '1px solid rgba(245, 158, 11, 0.15)'
              }}>
                <span style={{ color: '#ffffff' }}>{g.skill_name}</span>
                <span className="badge badge-medium" style={{ fontSize: '0.65rem' }}>Secondary</span>
              </div>
            ))}
          </div>
        </div>

        {/* STAGE 3: TARGET ROLE BENCHMARK */}
        <div className="card-interactive" style={{
          background: 'rgba(6, 182, 212, 0.04)',
          border: '1px solid rgba(6, 182, 212, 0.25)',
          borderRadius: 'var(--radius-md)',
          padding: '22px'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '14px' }}>
            <Target size={18} color="var(--accent-secondary)" />
            <h4 style={{ fontSize: '0.98rem', color: '#67e8f9', fontWeight: 700 }}>Stage 3: Role Benchmark</h4>
          </div>
          <div style={{ fontSize: '1.2rem', fontWeight: 800, marginBottom: '6px', color: '#ffffff' }}>
            {profile.target_role}
          </div>
          <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', marginBottom: '14px' }}>
            Scheduled at {profile.weekly_hours} hrs/week over {profile.target_timeline_months} months
          </p>
          <div style={{ 
            fontSize: '0.82rem', color: 'var(--accent-emerald)', 
            background: 'rgba(16, 185, 129, 0.08)', padding: '8px 12px', 
            borderRadius: '6px', border: '1px solid rgba(16, 185, 129, 0.2)' 
          }}>
            ✓ {completedTasks.length} / {roadmap.length} Milestones Achieved
          </div>
        </div>
      </div>
    </div>
  );
}
