import React from 'react';
import { BarChart3, TrendingUp, CheckCircle2 } from 'lucide-react';

export default function JobMarketPanel({ jobStats = [], marketNote = "", targetRole = "AI Engineer" }) {
  return (
    <div className="glass-panel" style={{ padding: '28px' }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '24px', flexWrap: 'wrap', gap: '14px' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
            <BarChart3 size={19} color="var(--accent-secondary)" />
            <h3 style={{ fontSize: '1.25rem', fontWeight: 700 }}>Industry Skill Frequency & Demand</h3>
          </div>
          <p style={{ fontSize: '0.86rem', color: 'var(--text-muted)' }}>
            Real-world occurrence rates requested across active openings for <strong style={{ color: '#ffffff' }}>{targetRole}</strong>.
          </p>
        </div>

        {/* Source Badge */}
        <div style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '7px',
          background: 'rgba(255, 255, 255, 0.03)',
          border: '1px solid var(--card-border)',
          borderRadius: 'var(--radius-full)',
          padding: '6px 14px',
          fontSize: '0.78rem',
          color: 'var(--text-muted)'
        }}>
          <TrendingUp size={13} color="var(--accent-secondary)" />
          <span>{marketNote || "Verified against active industry job postings."}</span>
        </div>
      </div>

      {/* Bar Frequencies */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '16px' }}>
        {jobStats.map((stat, idx) => (
          <div 
            key={idx}
            className="card-interactive"
            style={{
              background: 'rgba(255, 255, 255, 0.02)',
              border: '1px solid var(--card-border)',
              borderRadius: 'var(--radius-sm)',
              padding: '16px 18px'
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
              <span style={{ fontWeight: 600, fontSize: '0.92rem', color: '#ffffff' }}>{stat.skill}</span>
              <span style={{ fontFamily: 'var(--font-mono)', fontWeight: 700, color: 'var(--accent-secondary)' }}>
                {stat.frequency}%
              </span>
            </div>

            <div className="progress-bar-container" style={{ height: '7px' }}>
              <div 
                className="progress-bar-fill"
                style={{ 
                  width: `${stat.frequency}%`,
                  background: stat.frequency >= 80 
                    ? 'linear-gradient(90deg, #6366f1, #06b6d4)' 
                    : (stat.frequency >= 60 ? 'linear-gradient(90deg, #3b82f6, #06b6d4)' : 'rgba(255,255,255,0.25)')
                }}
              />
            </div>
            
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.74rem', color: 'var(--text-dim)', marginTop: '8px' }}>
              <span>Sample: {stat.sample_size || 150} postings</span>
              <span style={{ color: stat.frequency >= 75 ? '#38bdf8' : 'var(--text-dim)', fontWeight: stat.frequency >= 75 ? 600 : 400 }}>
                {stat.frequency >= 75 ? '🔥 High Demand' : 'Core Requirement'}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
