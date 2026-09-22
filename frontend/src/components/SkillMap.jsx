import React, { useState } from 'react';
import { Cpu, ShieldCheck, CheckCircle2 } from 'lucide-react';

export default function SkillMap({ skills = [] }) {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedSkill, setSelectedSkill] = useState(null);

  // Derive available categories
  const categories = ["All", ...Array.from(new Set(skills.map(s => s.category || "General")))];

  const filteredSkills = selectedCategory === "All" 
    ? skills 
    : skills.filter(s => (s.category || "General") === selectedCategory);

  return (
    <div className="glass-panel" style={{ padding: '28px' }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '22px', flexWrap: 'wrap', gap: '14px' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
            <Cpu size={19} color="var(--accent-secondary)" />
            <h3 style={{ fontSize: '1.25rem', fontWeight: 700 }}>Verified Competency Matrix</h3>
          </div>
          <p style={{ fontSize: '0.86rem', color: 'var(--text-muted)' }}>
            Digital inventory of your verified technical competencies, evidence trails, and confidence levels.
          </p>
        </div>

        {/* Category Filter Pills */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              style={{
                padding: '6px 13px',
                borderRadius: 'var(--radius-full)',
                fontSize: '0.78rem',
                fontWeight: 600,
                cursor: 'pointer',
                background: selectedCategory === cat ? 'var(--gradient-brand)' : 'rgba(255, 255, 255, 0.04)',
                color: selectedCategory === cat ? '#ffffff' : 'var(--text-muted)',
                border: selectedCategory === cat ? '1px solid rgba(255, 255, 255, 0.2)' : '1px solid var(--card-border)',
                transition: 'all var(--transition-fast)'
              }}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Skill Cards Grid */}
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', 
        gap: '16px' 
      }}>
        {filteredSkills.map((skill, idx) => {
          const confidencePercent = Math.round((skill.confidence || 0.5) * 100);
          const isSelected = selectedSkill && selectedSkill.name === skill.name;

          return (
            <div
              key={idx}
              onClick={() => setSelectedSkill(isSelected ? null : skill)}
              className="card-interactive"
              style={{
                padding: '18px 20px',
                cursor: 'pointer',
                borderRadius: 'var(--radius-md)',
                border: isSelected ? '1px solid var(--accent-secondary)' : '1px solid var(--card-border)',
                background: isSelected ? 'rgba(6, 182, 212, 0.08)' : 'rgba(255, 255, 255, 0.02)',
                position: 'relative',
                boxShadow: isSelected ? '0 0 20px -3px rgba(6, 182, 212, 0.25)' : 'none'
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '10px' }}>
                <div>
                  <h4 style={{ fontSize: '1.02rem', fontWeight: 700, color: '#ffffff' }}>{skill.name}</h4>
                  <span style={{ fontSize: '0.74rem', color: 'var(--text-dim)' }}>{skill.category}</span>
                </div>
                <span className={`badge ${
                  skill.level === 'Advanced' ? 'badge-strong' : (skill.level === 'Intermediate' ? 'badge-cyan' : 'badge-indigo')
                }`}>
                  {skill.level}
                </span>
              </div>

              {/* Confidence Progress Bar */}
              <div style={{ marginBottom: '12px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.74rem', color: 'var(--text-muted)', marginBottom: '5px' }}>
                  <span>Verified Confidence</span>
                  <span style={{ fontFamily: 'var(--font-mono)', fontWeight: 600 }}>{confidencePercent}%</span>
                </div>
                <div className="progress-bar-container" style={{ height: '6px' }}>
                  <div 
                    className="progress-bar-fill" 
                    style={{ 
                      width: `${confidencePercent}%`,
                      background: confidencePercent >= 75 ? 'linear-gradient(90deg, #06b6d4, #10b981)' : 'var(--gradient-brand)'
                    }} 
                  />
                </div>
              </div>

              {/* Evidence Snippet preview */}
              {skill.evidence && skill.evidence.length > 0 && (
                <div style={{ 
                  fontSize: '0.76rem', 
                  color: 'var(--text-secondary)', 
                  background: 'rgba(0, 0, 0, 0.25)', 
                  padding: '7px 10px', 
                  borderRadius: 'var(--radius-sm)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  border: '1px solid rgba(255, 255, 255, 0.04)'
                }}>
                  <ShieldCheck size={14} color="var(--accent-emerald)" />
                  <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                    {skill.evidence[0]}
                  </span>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Selected Skill Evidence Drawer */}
      {selectedSkill && (
        <div style={{
          marginTop: '22px',
          padding: '20px 24px',
          background: 'rgba(6, 182, 212, 0.05)',
          border: '1px solid rgba(6, 182, 212, 0.25)',
          borderRadius: 'var(--radius-md)'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px', flexWrap: 'wrap', gap: '8px' }}>
            <h4 style={{ fontSize: '1.05rem', color: 'var(--accent-secondary)', fontWeight: 700 }}>
              Evidence Breakdown: {selectedSkill.name}
            </h4>
            <span style={{ fontSize: '0.76rem', color: 'var(--text-dim)' }}>
              Derived from verified project implementations & course credentials
            </span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {selectedSkill.evidence && selectedSkill.evidence.map((ev, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.84rem', color: 'var(--text-secondary)' }}>
                <CheckCircle2 size={15} color="var(--accent-emerald)" />
                <span>{ev}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
