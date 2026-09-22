import React, { useState } from 'react';
import { 
  ArrowRight, 
  Sparkles, 
  Zap, 
  Lightbulb, 
  Clock, 
  CheckCircle2, 
  TrendingUp, 
  Layers
} from 'lucide-react';

export default function SkillTransferPanel({ 
  transferableSkills = [], 
  targetRole = 'AI Engineer' 
}) {
  const [filterLevel, setFilterLevel] = useState('ALL');

  const filteredItems = filterLevel === 'ALL' 
    ? transferableSkills 
    : transferableSkills.filter(item => item.transferability_level?.toUpperCase().includes(filterLevel));

  const stronglyCount = transferableSkills.filter(i => 
    i.transferability_level?.toUpperCase().includes('STRONGLY')
  ).length;

  return (
    <div>
      {/* Header */}
      <div style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center', 
        flexWrap: 'wrap', 
        gap: '12px',
        marginBottom: '18px' 
      }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
            <span className="badge badge-emerald">
              <Zap size={12} style={{ marginRight: '4px' }} />
              Transfer Bridges
            </span>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-dim)' }}>
              {transferableSkills.length} Bridges Found
            </span>
          </div>
          <h2 style={{ fontSize: '1.45rem', fontWeight: 800 }}>
            Skill Transfer Intelligence
          </h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.86rem' }}>
            Map your existing technical foundation to {targetRole} requirements to eliminate redundant learning.
          </p>
        </div>

        {/* Compression Badge */}
        <div className="glass-panel" style={{ padding: '10px 18px', textAlign: 'right' }}>
          <span style={{ fontSize: '0.68rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 600 }}>
            Learning Compression
          </span>
          <div style={{ fontSize: '1.35rem', fontWeight: 800, fontFamily: 'var(--font-mono)', color: '#10b981' }}>
            ~60% Faster
          </div>
        </div>
      </div>

      {/* Filter Tabs */}
      <div style={{ display: 'flex', gap: '6px', marginBottom: '16px', flexWrap: 'wrap' }}>
        {[
          { key: 'ALL', label: `All (${transferableSkills.length})` },
          { key: 'STRONGLY', label: `Strongly Transferable (${stronglyCount})` },
          { key: 'TRANSFERABLE', label: 'Directly Transferable' },
          { key: 'FOUNDATIONAL', label: 'Foundational' }
        ].map(tab => (
          <button
            key={tab.key}
            onClick={() => setFilterLevel(tab.key)}
            className={`btn-secondary ${filterLevel === tab.key ? 'active' : ''}`}
            style={{
              padding: '5px 12px',
              fontSize: '0.78rem',
              borderRadius: 'var(--radius-xs)'
            }}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Bridges List */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        {filteredItems.map((bridge, index) => {
          const isStrong = bridge.transferability_level?.toUpperCase().includes('STRONGLY');
          const isFoundational = bridge.transferability_level?.toUpperCase().includes('FOUNDATIONAL');
          const badgeCls = isStrong ? 'badge-emerald' : isFoundational ? 'badge-amber' : 'badge-cyan';

          return (
            <div 
              key={index}
              className="glass-panel card-interactive"
              style={{ padding: '16px 20px' }}
            >
              {/* Flow Bar */}
              <div style={{ 
                display: 'flex', 
                alignItems: 'center', 
                flexWrap: 'wrap', 
                gap: '10px',
                marginBottom: '10px' 
              }}>
                <span style={{ 
                  padding: '4px 10px', 
                  borderRadius: 'var(--radius-xs)', 
                  background: 'rgba(37, 99, 235, 0.15)',
                  border: '1px solid rgba(37, 99, 235, 0.35)',
                  fontSize: '0.84rem',
                  fontWeight: 700
                }}>
                  {bridge.source_skill}
                </span>

                <ArrowRight size={14} color="#38bdf8" />

                <span style={{ 
                  padding: '4px 10px', 
                  borderRadius: 'var(--radius-xs)', 
                  background: 'rgba(2, 132, 199, 0.12)',
                  border: '1px solid rgba(2, 132, 199, 0.3)',
                  fontSize: '0.84rem',
                  fontWeight: 700,
                  color: '#38bdf8'
                }}>
                  {bridge.transferable_competency}
                </span>

                <ArrowRight size={14} color="#10b981" />

                <span style={{ 
                  padding: '4px 10px', 
                  borderRadius: 'var(--radius-xs)', 
                  background: 'rgba(16, 185, 129, 0.12)',
                  border: '1px solid rgba(16, 185, 129, 0.3)',
                  fontSize: '0.84rem',
                  fontWeight: 700,
                  color: '#34d399'
                }}>
                  {bridge.target_skill_requirement}
                </span>

                <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span className={`badge ${badgeCls}`}>
                    {bridge.transferability_level}
                  </span>
                  <span style={{ 
                    fontSize: '0.74rem', 
                    fontFamily: 'var(--font-mono)', 
                    padding: '2px 7px', 
                    borderRadius: '4px', 
                    background: 'rgba(16, 185, 129, 0.1)',
                    color: '#34d399'
                  }}>
                    ⚡ {bridge.effort_reduction_percentage} Effort
                  </span>
                </div>
              </div>

              {/* Concise Explanation */}
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.82rem', lineHeight: 1.45 }}>
                <strong style={{ color: 'var(--text-main)' }}>Why it transfers:</strong> {bridge.why_it_transfers}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
