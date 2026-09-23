import React, { useState } from 'react';
import { Cpu, ShieldCheck, CheckCircle2, Layers, Search, Filter } from 'lucide-react';
import InteractiveSkillGraph from './InteractiveSkillGraph';

export default function SkillMap({ 
  skills = [], 
  highPriorityGaps = [], 
  mediumPriorityGaps = [], 
  transferableSkills = [],
  targetRole = 'AI Engineer',
  alignmentScore = 68
}) {
  const [viewMode, setViewMode] = useState('GRAPH'); // 'GRAPH' or 'MATRIX'
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  // Categories
  const categories = ['All', ...Array.from(new Set(skills.map(s => s.category || 'General')))];

  const filteredSkills = skills.filter(s => {
    const matchCat = selectedCategory === 'All' || (s.category || 'General') === selectedCategory;
    const matchQuery = s.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchCat && matchQuery;
  });

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      
      {/* Header with Switcher */}
      <div className="glass-panel" style={{ padding: '20px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '14px' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
            <Cpu size={20} color="#38bdf8" />
            <h2 style={{ fontSize: '1.35rem', fontWeight: 800, color: '#f8fafc', margin: 0 }}>
              Verified Competency & Dependency Network
            </h2>
          </div>
          <p style={{ fontSize: '0.84rem', color: '#94a3b8', margin: 0 }}>
            Visual topological representation of verified capabilities, dependency chains, and benchmark gaps for <strong style={{ color: '#ffffff' }}>{targetRole}</strong>.
          </p>
        </div>

        {/* View Toggle */}
        <div style={{ display: 'flex', background: 'rgba(0, 0, 0, 0.3)', padding: '3px', borderRadius: '8px', border: '1px solid rgba(255, 255, 255, 0.08)' }}>
          <button
            onClick={() => setViewMode('GRAPH')}
            style={{
              padding: '6px 14px',
              borderRadius: '6px',
              background: viewMode === 'GRAPH' ? 'rgba(56, 189, 248, 0.15)' : 'transparent',
              color: viewMode === 'GRAPH' ? '#38bdf8' : '#94a3b8',
              border: viewMode === 'GRAPH' ? '1px solid rgba(56, 189, 248, 0.4)' : 'none',
              fontSize: '0.8rem',
              fontWeight: 600,
              cursor: 'pointer'
            }}
          >
            Interactive Graph
          </button>
          <button
            onClick={() => setViewMode('MATRIX')}
            style={{
              padding: '6px 14px',
              borderRadius: '6px',
              background: viewMode === 'MATRIX' ? 'rgba(56, 189, 248, 0.15)' : 'transparent',
              color: viewMode === 'MATRIX' ? '#38bdf8' : '#94a3b8',
              border: viewMode === 'MATRIX' ? '1px solid rgba(56, 189, 248, 0.4)' : 'none',
              fontSize: '0.8rem',
              fontWeight: 600,
              cursor: 'pointer'
            }}
          >
            Tabular Matrix
          </button>
        </div>
      </div>

      {/* VIEW 1: INTERACTIVE SKILLGRAPH */}
      {viewMode === 'GRAPH' && (
        <InteractiveSkillGraph 
          skills={skills}
          highPriorityGaps={highPriorityGaps}
          mediumPriorityGaps={mediumPriorityGaps}
          transferableSkills={transferableSkills}
          targetRole={targetRole}
          alignmentScore={alignmentScore}
        />
      )}

      {/* VIEW 2: TABULAR / CARD MATRIX */}
      {viewMode === 'MATRIX' && (
        <div className="glass-panel" style={{ padding: '24px' }}>
          {/* Controls */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px', marginBottom: '20px' }}>
            <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
              {categories.map(cat => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  style={{
                    padding: '5px 12px',
                    borderRadius: '6px',
                    fontSize: '0.78rem',
                    fontWeight: 600,
                    cursor: 'pointer',
                    background: selectedCategory === cat ? 'rgba(56, 189, 248, 0.15)' : 'rgba(255, 255, 255, 0.03)',
                    color: selectedCategory === cat ? '#38bdf8' : '#94a3b8',
                    border: selectedCategory === cat ? '1px solid #38bdf8' : '1px solid rgba(255, 255, 255, 0.08)'
                  }}
                >
                  {cat}
                </button>
              ))}
            </div>

            <div style={{ position: 'relative', width: '220px' }}>
              <Search size={14} color="#94a3b8" style={{ position: 'absolute', left: '10px', top: '10px' }} />
              <input 
                type="text"
                placeholder="Search skills..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{
                  width: '100%',
                  padding: '7px 12px 7px 32px',
                  borderRadius: '6px',
                  background: 'rgba(0, 0, 0, 0.3)',
                  border: '1px solid rgba(255, 255, 255, 0.08)',
                  color: '#ffffff',
                  fontSize: '0.82rem'
                }}
              />
            </div>
          </div>

          {/* Cards Grid */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '14px' }}>
            {filteredSkills.map((skill, idx) => {
              const confidence = Math.round((skill.confidence || 0.8) * 100);

              return (
                <div 
                  key={idx}
                  style={{
                    padding: '16px 18px',
                    borderRadius: '10px',
                    background: 'rgba(255, 255, 255, 0.02)',
                    border: '1px solid rgba(255, 255, 255, 0.08)'
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
                    <div>
                      <h4 style={{ fontSize: '0.98rem', fontWeight: 700, color: '#ffffff', margin: '0 0 2px 0' }}>
                        {skill.name}
                      </h4>
                      <span style={{ fontSize: '0.72rem', color: '#64748b' }}>
                        {skill.category || 'Engineering'}
                      </span>
                    </div>
                    <span style={{
                      fontSize: '0.72rem',
                      fontWeight: 600,
                      padding: '2px 8px',
                      borderRadius: '4px',
                      background: skill.level === 'Advanced' ? 'rgba(16, 185, 129, 0.15)' : 'rgba(56, 189, 248, 0.15)',
                      color: skill.level === 'Advanced' ? '#34d399' : '#38bdf8'
                    }}>
                      {skill.level}
                    </span>
                  </div>

                  <div style={{ marginBottom: '8px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.72rem', color: '#94a3b8', marginBottom: '4px' }}>
                      <span>Evaluated Confidence</span>
                      <span style={{ fontFamily: 'var(--font-mono)', fontWeight: 600 }}>{confidence}%</span>
                    </div>
                    <div className="progress-bar-container" style={{ height: '5px' }}>
                      <div 
                        className="progress-bar-fill" 
                        style={{ width: `${confidence}%`, background: '#10b981' }} 
                      />
                    </div>
                  </div>

                  <div style={{ fontSize: '0.72rem', color: '#10b981', display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <CheckCircle2 size={12} />
                    <span>Evidence-verified in repository / assessment</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

    </div>
  );
}
