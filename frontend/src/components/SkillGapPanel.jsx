import React, { useState, useEffect } from 'react';
import { AlertTriangle, CheckCircle2, TrendingUp, Zap, ShieldCheck, ChevronDown, ChevronRight, Brain, Target, ArrowRight } from 'lucide-react';

function GapCard({ gap, priority, animDelay = 0 }) {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setVisible(true), animDelay);
    return () => clearTimeout(t);
  }, [animDelay]);

  const config = {
    high: {
      cardClass: 'gap-card-high',
      badge: 'badge-high',
      badgeText: 'Critical',
      barColor: '#f43f5e',
      iconColor: '#f43f5e',
      threatLevel: 90,
    },
    medium: {
      cardClass: 'gap-card-medium',
      badge: 'badge-medium',
      badgeText: 'Development',
      barColor: '#f59e0b',
      iconColor: '#f59e0b',
      threatLevel: 55,
    },
    strong: {
      cardClass: 'gap-card-strong',
      badge: 'badge-strong',
      badgeText: 'Verified',
      barColor: '#10b981',
      iconColor: '#10b981',
      threatLevel: 92,
    }
  }[priority] || {};

  return (
    <div
      className={config.cardClass}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(14px)',
        transition: `opacity 0.4s ease, transform 0.4s cubic-bezier(0.16,1,0.3,1)`,
        paddingLeft: '22px'
      }}
    >
      {/* Skill Name + Badge */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
        <span style={{ fontWeight: 700, fontSize: '1rem', color: '#ffffff', lineHeight: 1.3 }}>
          {gap.skill_name}
        </span>
        <span className={config.badge}>{config.badgeText}</span>
      </div>

      {/* Level comparison */}
      <div style={{ display: 'flex', gap: '18px', fontSize: '0.8rem', color: '#94a3b8', marginBottom: '10px' }}>
        <div>
          Current: <strong style={{ color: '#cbd5e1', fontFamily: 'var(--font-mono)' }}>{gap.current_level}</strong>
        </div>
        {gap.required_level && (
          <div>
            Required: <strong style={{ color: config.barColor, fontFamily: 'var(--font-mono)' }}>{gap.required_level}</strong>
          </div>
        )}
      </div>

      {/* Reason */}
      {gap.reason && (
        <p style={{ fontSize: '0.82rem', color: '#94a3b8', lineHeight: 1.55, marginBottom: '12px' }}>
          {gap.reason}
        </p>
      )}

      {/* Threat/Match Level Bar */}
      <div style={{ marginBottom: '10px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px', fontSize: '0.7rem', color: '#64748b', fontWeight: 600 }}>
          <span style={{ textTransform: 'uppercase', letterSpacing: '0.04em' }}>
            {priority === 'strong' ? 'Match Level' : 'Gap Severity'}
          </span>
          <span style={{ fontFamily: 'var(--font-mono)', color: config.barColor }}>
            {priority === 'strong' ? config.threatLevel : (100 - config.threatLevel) + 10}%
          </span>
        </div>
        <div className="threat-bar-container">
          <div
            className="threat-bar-fill"
            style={{
              width: `${priority === 'strong' ? config.threatLevel : (100 - config.threatLevel) + 10}%`,
              background: `linear-gradient(90deg, ${config.barColor}aa, ${config.barColor})`,
            }}
          />
        </div>
      </div>

      {/* Action tag */}
      {priority !== 'strong' && (
        <div style={{
          fontSize: '0.76rem',
          color: config.barColor,
          background: `${config.barColor}10`,
          padding: '6px 12px',
          borderRadius: '8px',
          display: 'flex',
          alignItems: 'center',
          gap: '6px',
          fontWeight: 600
        }}>
          <ArrowRight size={12} />
          {priority === 'high' ? 'Address in Roadmap Phase 1-2' : 'Deepen via portfolio project'}
        </div>
      )}
    </div>
  );
}

export default function SkillGapPanel({
  highPriorityGaps = [],
  mediumPriorityGaps = [],
  strongAreas = [],
  onNavigateToRoadmap
}) {
  const [expandedSections, setExpandedSections] = useState({ high: true, medium: true, strong: false });
  const totalGaps = highPriorityGaps.length + mediumPriorityGaps.length;
  const readinessScore = strongAreas.length > 0
    ? Math.round((strongAreas.length / (strongAreas.length + totalGaps)) * 100)
    : 0;

  const toggleSection = (key) => setExpandedSections(prev => ({ ...prev, [key]: !prev[key] }));

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }} className="stagger-1">

      {/* Hero Banner */}
      <div
        className="glass-panel scan-effect"
        style={{
          padding: '24px 28px',
          background: 'linear-gradient(135deg, rgba(15, 23, 42, 0.95) 0%, rgba(20, 15, 40, 0.85) 100%)',
          borderColor: 'rgba(139, 92, 246, 0.2)',
          position: 'relative',
          overflow: 'hidden'
        }}
      >
        {/* Background subtle grid */}
        <div style={{
          position: 'absolute', inset: 0, opacity: 0.4,
          backgroundImage: 'linear-gradient(rgba(139,92,246,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(139,92,246,0.05) 1px, transparent 1px)',
          backgroundSize: '24px 24px',
          pointerEvents: 'none'
        }} />

        <div style={{ position: 'relative', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '20px' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
              <Brain size={18} color="#8b5cf6" />
              <span style={{ fontSize: '0.74rem', color: '#8b5cf6', fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase' }}>
                AI Competency Diagnostics
              </span>
            </div>
            <h2 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#ffffff', letterSpacing: '-0.02em', marginBottom: '6px' }}>
              Skill Gap Intelligence Report
            </h2>
            <p style={{ fontSize: '0.86rem', color: '#94a3b8', maxWidth: '520px' }}>
              Benchmarked against verified industry hiring requirements. Each gap is weighted by market demand frequency.
            </p>
          </div>

          {/* Readiness Metrics */}
          <div style={{ display: 'flex', gap: '14px', flexWrap: 'wrap' }}>
            <div className="metric-card" style={{ minWidth: '100px' }}>
              <div style={{ fontSize: '0.68rem', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '4px', fontWeight: 600 }}>
                Critical Gaps
              </div>
              <div className="cockpit-metric-value" style={{ color: '#f43f5e', fontSize: '1.8rem' }}>
                {highPriorityGaps.length}
              </div>
            </div>
            <div className="metric-card" style={{ minWidth: '100px' }}>
              <div style={{ fontSize: '0.68rem', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '4px', fontWeight: 600 }}>
                Dev Areas
              </div>
              <div className="cockpit-metric-value" style={{ color: '#f59e0b', fontSize: '1.8rem' }}>
                {mediumPriorityGaps.length}
              </div>
            </div>
            <div className="metric-card" style={{ minWidth: '100px' }}>
              <div style={{ fontSize: '0.68rem', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '4px', fontWeight: 600 }}>
                Strengths
              </div>
              <div className="cockpit-metric-value" style={{ color: '#10b981', fontSize: '1.8rem' }}>
                {strongAreas.length}
              </div>
            </div>
            <button
              onClick={onNavigateToRoadmap}
              className="btn-primary"
              style={{ padding: '10px 20px', fontSize: '0.84rem', alignSelf: 'center' }}
            >
              <Zap size={14} />
              <span>View Roadmap</span>
            </button>
          </div>
        </div>
      </div>

      {/* HIGH PRIORITY GAPS */}
      {highPriorityGaps.length > 0 && (
        <div className="glass-panel stagger-2" style={{ padding: '20px 22px', borderColor: 'rgba(244, 63, 94, 0.18)' }}>
          <button
            onClick={() => toggleSection('high')}
            style={{
              width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
              background: 'none', border: 'none', cursor: 'pointer', padding: '0 0 16px 0',
              borderBottom: expandedSections.high ? '1px solid rgba(244, 63, 94, 0.15)' : 'none',
              marginBottom: expandedSections.high ? '18px' : '0',
              transition: 'border-bottom 0.2s'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <div style={{
                width: '32px', height: '32px', borderRadius: '8px',
                background: 'rgba(244, 63, 94, 0.15)',
                border: '1px solid rgba(244, 63, 94, 0.3)',
                display: 'flex', alignItems: 'center', justifyContent: 'center'
              }}>
                <AlertTriangle size={15} color="#f43f5e" />
              </div>
              <div style={{ textAlign: 'left' }}>
                <div style={{ fontSize: '1rem', fontWeight: 700, color: '#fda4af' }}>
                  Critical Benchmark Gaps
                </div>
                <div style={{ fontSize: '0.76rem', color: '#64748b' }}>
                  {highPriorityGaps.length} skills blocking target role match
                </div>
              </div>
              <span className="badge-high" style={{ marginLeft: '8px' }}>{highPriorityGaps.length} HIGH</span>
            </div>
            <ChevronDown
              size={18}
              color="#94a3b8"
              style={{ transform: expandedSections.high ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.25s' }}
            />
          </button>

          {expandedSections.high && (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '14px' }}>
              {highPriorityGaps.map((gap, i) => (
                <GapCard key={i} gap={gap} priority="high" animDelay={i * 60} />
              ))}
            </div>
          )}
        </div>
      )}

      {/* MEDIUM PRIORITY GAPS */}
      {mediumPriorityGaps.length > 0 && (
        <div className="glass-panel stagger-3" style={{ padding: '20px 22px', borderColor: 'rgba(245, 158, 11, 0.18)' }}>
          <button
            onClick={() => toggleSection('medium')}
            style={{
              width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
              background: 'none', border: 'none', cursor: 'pointer', padding: '0 0 16px 0',
              borderBottom: expandedSections.medium ? '1px solid rgba(245, 158, 11, 0.15)' : 'none',
              marginBottom: expandedSections.medium ? '18px' : '0',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <div style={{
                width: '32px', height: '32px', borderRadius: '8px',
                background: 'rgba(245, 158, 11, 0.15)',
                border: '1px solid rgba(245, 158, 11, 0.3)',
                display: 'flex', alignItems: 'center', justifyContent: 'center'
              }}>
                <TrendingUp size={15} color="#f59e0b" />
              </div>
              <div style={{ textAlign: 'left' }}>
                <div style={{ fontSize: '1rem', fontWeight: 700, color: '#fcd34d' }}>
                  Secondary Development Areas
                </div>
                <div style={{ fontSize: '0.76rem', color: '#64748b' }}>
                  {mediumPriorityGaps.length} skills to deepen for competitive edge
                </div>
              </div>
              <span className="badge-medium" style={{ marginLeft: '8px' }}>{mediumPriorityGaps.length} MED</span>
            </div>
            <ChevronDown
              size={18}
              color="#94a3b8"
              style={{ transform: expandedSections.medium ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.25s' }}
            />
          </button>

          {expandedSections.medium && (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '14px' }}>
              {mediumPriorityGaps.map((gap, i) => (
                <GapCard key={i} gap={gap} priority="medium" animDelay={i * 60} />
              ))}
            </div>
          )}
        </div>
      )}

      {/* STRONG AREAS */}
      {strongAreas.length > 0 && (
        <div className="glass-panel stagger-4" style={{ padding: '20px 22px', borderColor: 'rgba(16, 185, 129, 0.18)' }}>
          <button
            onClick={() => toggleSection('strong')}
            style={{
              width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
              background: 'none', border: 'none', cursor: 'pointer', padding: '0 0 16px 0',
              borderBottom: expandedSections.strong ? '1px solid rgba(16, 185, 129, 0.15)' : 'none',
              marginBottom: expandedSections.strong ? '18px' : '0',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <div style={{
                width: '32px', height: '32px', borderRadius: '8px',
                background: 'rgba(16, 185, 129, 0.15)',
                border: '1px solid rgba(16, 185, 129, 0.3)',
                display: 'flex', alignItems: 'center', justifyContent: 'center'
              }}>
                <ShieldCheck size={15} color="#10b981" />
              </div>
              <div style={{ textAlign: 'left' }}>
                <div style={{ fontSize: '1rem', fontWeight: 700, color: '#6ee7b7' }}>
                  Verified Benchmark Strengths
                </div>
                <div style={{ fontSize: '0.76rem', color: '#64748b' }}>
                  {strongAreas.length} skills already meeting or exceeding industry bar
                </div>
              </div>
              <span className="badge-strong" style={{ marginLeft: '8px' }}>{strongAreas.length} STRONG</span>
            </div>
            <ChevronDown
              size={18}
              color="#94a3b8"
              style={{ transform: expandedSections.strong ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.25s' }}
            />
          </button>

          {expandedSections.strong && (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '14px' }}>
              {strongAreas.map((gap, i) => (
                <GapCard key={i} gap={gap} priority="strong" animDelay={i * 60} />
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
