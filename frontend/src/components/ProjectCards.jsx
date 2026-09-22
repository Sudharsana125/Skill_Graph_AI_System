import React, { useState } from 'react';
import { Briefcase, Check, Plus, Clock, Sparkles, FolderGit2 } from 'lucide-react';

export default function ProjectCards({ recommendations = [] }) {
  const [addedIds, setAddedIds] = useState(new Set());

  const handleToggleAdd = (id) => {
    const updated = new Set(addedIds);
    if (updated.has(id)) {
      updated.delete(id);
    } else {
      updated.add(id);
    }
    setAddedIds(updated);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '22px' }}>
      {/* Header */}
      <div className="glass-panel" style={{ padding: '24px 28px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
          <Briefcase size={19} color="var(--accent-emerald)" />
          <h3 style={{ fontSize: '1.25rem', fontWeight: 700 }}>Gap-Targeted Portfolio Projects</h3>
        </div>
        <p style={{ fontSize: '0.86rem', color: 'var(--text-muted)' }}>
          Production-grade project specifications engineered to close your critical skill gaps and provide concrete proof for employers.
        </p>
      </div>

      {/* Cards Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', gap: '18px' }}>
        {recommendations.map((proj, idx) => {
          const isAdded = addedIds.has(proj.id || idx);

          return (
            <div 
              key={idx}
              className="glass-panel card-interactive"
              style={{
                padding: '24px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                background: isAdded ? 'rgba(16, 185, 129, 0.04)' : 'var(--card-bg)',
                borderColor: isAdded ? 'rgba(16, 185, 129, 0.4)' : 'var(--card-border)',
                borderRadius: 'var(--radius-md)'
              }}
            >
              <div>
                {/* Meta Top: Difficulty, Duration */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
                  <span className={`badge ${
                    proj.difficulty === 'Advanced' ? 'badge-high' : 'badge-cyan'
                  }`}>
                    {proj.difficulty}
                  </span>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.78rem', color: 'var(--text-dim)' }}>
                    <Clock size={13} />
                    <span>{proj.estimated_duration}</span>
                  </div>
                </div>

                {/* Title */}
                <h4 style={{ fontSize: '1.15rem', marginBottom: '8px', color: '#ffffff', fontWeight: 700 }}>
                  {proj.title}
                </h4>

                {/* Problem */}
                <p style={{ fontSize: '0.84rem', color: 'var(--text-secondary)', lineHeight: 1.5, marginBottom: '16px' }}>
                  {proj.problem}
                </p>

                {/* Skills Developed */}
                <div style={{ marginBottom: '14px' }}>
                  <span style={{ fontSize: '0.72rem', color: 'var(--text-dim)', textTransform: 'uppercase', letterSpacing: '0.05em', display: 'block', marginBottom: '6px', fontWeight: 600 }}>
                    Target Competencies
                  </span>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                    {proj.skills_developed.split(',').map((skill, sIdx) => (
                      <span key={sIdx} className="badge badge-indigo" style={{ fontSize: '0.72rem' }}>
                        {skill.trim()}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Why Matches Gaps */}
                <div style={{
                  background: 'rgba(99, 102, 241, 0.07)',
                  border: '1px solid rgba(99, 102, 241, 0.2)',
                  borderRadius: 'var(--radius-sm)',
                  padding: '10px 14px',
                  marginBottom: '16px'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.72rem', fontWeight: 700, color: 'var(--accent-secondary)', marginBottom: '4px', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                    <Sparkles size={12} />
                    <span>How This Closes Your Gaps</span>
                  </div>
                  <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', lineHeight: 1.45 }}>
                    {proj.why_matches_gaps}
                  </p>
                </div>

                {/* Expected Outcome */}
                <div style={{ fontSize: '0.8rem', color: 'var(--text-dim)', marginBottom: '18px' }}>
                  <strong style={{ color: 'var(--text-secondary)' }}>Deliverable:</strong> {proj.expected_outcome}
                </div>
              </div>

              {/* Action Button */}
              <button
                onClick={() => handleToggleAdd(proj.id || idx)}
                style={{
                  width: '100%',
                  padding: '11px 16px',
                  borderRadius: 'var(--radius-sm)',
                  fontSize: '0.86rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                  background: isAdded ? 'rgba(16, 185, 129, 0.18)' : 'rgba(255, 255, 255, 0.05)',
                  color: isAdded ? '#34d399' : 'var(--text-main)',
                  border: isAdded ? '1px solid rgba(16, 185, 129, 0.35)' : '1px solid var(--card-border)',
                  transition: 'all var(--transition-fast)'
                }}
              >
                {isAdded ? (
                  <>
                    <Check size={15} />
                    <span>Added to Active Roadmap</span>
                  </>
                ) : (
                  <>
                    <Plus size={15} />
                    <span>Add to Active Plan</span>
                  </>
                )}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
