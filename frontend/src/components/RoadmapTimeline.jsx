import React, { useState } from 'react';
import {
  CheckCircle2,
  Circle,
  Clock,
  ChevronDown,
  ChevronUp,
  Award,
  Sparkles,
  BookOpen,
  Terminal,
  Target,
  Zap,
  ArrowRight,
} from 'lucide-react';

export default function RoadmapTimeline({ roadmap = [], onToggleTask, isUpdatingProgress, onNavigateToNext }) {
  const [expandedTaskId, setExpandedTaskId] = useState(roadmap[0]?.id || null);

  // Group tasks by phase
  const phases = {};
  roadmap.forEach(task => {
    const key = `Phase ${task.phase_number}: ${task.phase_name}`;
    if (!phases[key]) phases[key] = [];
    phases[key].push(task);
  });

  const completedCount = roadmap.filter(t => t.is_completed).length;
  const completionRate = roadmap.length > 0 ? Math.round((completedCount / roadmap.length) * 100) : 0;

  const toggleSection = (taskId) => setExpandedTaskId(prev => (prev === taskId ? null : taskId));

  return (
    <div className="stagger-1" style={{ display: 'flex', flexDirection: 'column', gap: '22px' }}>

      {/* Roadmap Header Summary */}
      <div className="glass-panel" style={{ padding: '24px 28px', background: 'linear-gradient(135deg, rgba(15,23,42,0.95), rgba(20,15,40,0.85))', borderColor: 'rgba(139,92,246,0.2)', position: 'relative', overflow: 'hidden' }}>
        {/* subtle grid background */}
        <div style={{ position: 'absolute', inset: 0, opacity: 0.4, backgroundImage: 'linear-gradient(rgba(139,92,246,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(139,92,246,0.05) 1px, transparent 1px)', backgroundSize: '24px 24px', pointerEvents: 'none' }} />
        <div style={{ position: 'relative', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
              <Target size={18} color="var(--accent-secondary)" />
              <h3 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#ffffff' }}>Personalized Action Roadmap</h3>
            </div>
            <p style={{ fontSize: '0.86rem', color: 'var(--text-muted)', maxWidth: '520px' }}>
              Targeted engineering exercises tailored to your timeline. Check off milestones to dynamically recalibrate your skill profile.
            </p>
          </div>
          <div style={{ display: 'flex', gap: '14px', flexWrap: 'wrap' }}>
            <div className="metric-card" style={{ minWidth: '100px' }}>
              <div style={{ fontSize: '0.68rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '4px', fontWeight: 600 }}>Milestones Completed</div>
              <div className="cockpit-metric-value" style={{ color: '#10b981', fontSize: '1.8rem' }}>{completedCount} <span style={{ fontSize: '0.9rem', color: 'var(--text-dim)' }}> / {roadmap.length}</span></div>
            </div>
            <div className="metric-card" style={{ minWidth: '100px' }}>
              <div style={{ fontSize: '0.68rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '4px', fontWeight: 600 }}>Progress</div>
              <div className="cockpit-metric-value" style={{ color: '#8b5cf6', fontSize: '1.8rem' }}>{completionRate}%</div>
            </div>
            <button className="btn-primary" onClick={onNavigateToNext} style={{ alignSelf: 'center' }}>
              <Zap size={14} />
              <span>Next Steps</span>
            </button>
          </div>
        </div>
      </div>

      {/* Phased Timeline List */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
        {Object.entries(phases).map(([phaseHeader, tasks], phaseIdx) => (
          <div key={phaseIdx} className="glass-panel" style={{ padding: '22px 24px', borderColor: 'rgba(139,92,246,0.18)' }}>
            <div style={{ fontSize: '0.8rem', color: 'var(--accent-secondary)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '14px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--accent-secondary)' }} />
              {phaseHeader}
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {tasks.map(task => {
                const isExpanded = expandedTaskId === task.id;
                const cardBg = task.is_completed ? 'rgba(16, 185, 129, 0.06)' : 'rgba(255, 255, 255, 0.02)';
                const borderColor = task.is_completed ? '1px solid rgba(16, 185, 129, 0.3)' : '1px solid var(--card-border)';
                return (
                  <div key={task.id} className="anim-card-glow" style={{ background: cardBg, border: borderColor, borderRadius: 'var(--radius-md)', padding: '16px 20px', transition: 'all var(--transition-normal)' }}>
                    {/* Top Row */}
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '12px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '14px', flex: 1 }}>
                        <button
                          type="button"
                          disabled={isUpdatingProgress}
                          onClick={() => onToggleTask(task.id, !task.is_completed)}
                          style={{ background: 'transparent', border: 'none', cursor: 'pointer', color: task.is_completed ? 'var(--accent-emerald)' : 'var(--text-dim)', display: 'flex', alignItems: 'center', padding: 0, transition: 'all 0.15s ease' }}
                          title={task.is_completed ? 'Completed milestone — click to uncheck' : 'Mark milestone complete to dynamically update your alignment'}
                        >
                          {task.is_completed ? <CheckCircle2 size={24} color="var(--accent-emerald)" /> : <Circle size={24} />}
                        </button>
                        <div>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
                            <span className="badge badge-indigo" style={{ fontSize: '0.68rem', padding: '2px 8px' }}>{task.week_label}</span>
                            <span style={{ fontWeight: 600, fontSize: '0.96rem', textDecoration: task.is_completed ? 'line-through' : 'none', color: task.is_completed ? 'var(--text-muted)' : 'var(--text-main)' }}>
                              {task.skill_name} — {task.suggested_task}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.78rem', color: 'var(--text-dim)' }}>
                          <Clock size={13} />
                          <span>{task.estimated_hours}h</span>
                        </div>
                        <button onClick={() => toggleSection(task.id)} style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid var(--card-border)', borderRadius: '8px', color: 'var(--text-muted)', padding: '4px 8px', cursor: 'pointer', display: 'flex', alignItems: 'center', transition: 'all 0.15s ease' }}>
                          {isExpanded ? <ChevronUp size={15} /> : <ChevronDown size={15} />}
                        </button>
                      </div>
                    </div>
                    {/* Expanded Details */}
                    {isExpanded && (
                      <div style={{ marginTop: '14px', paddingTop: '14px', borderTop: '1px solid var(--card-border)', display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '0.85rem' }}>
                        <div style={{ display: 'flex', gap: '8px', alignItems: 'flex-start' }}>
                          <BookOpen size={15} color="var(--accent-primary)" style={{ flexShrink: 0, marginTop: '3px' }} />
                          <div><strong style={{ color: '#ffffff' }}>Why it matters:</strong> <span style={{ color: 'var(--text-secondary)' }}>{task.why_it_matters}</span></div>
                        </div>
                        <div style={{ display: 'flex', gap: '8px', alignItems: 'flex-start' }}>
                          <Target size={15} color="var(--accent-secondary)" style={{ flexShrink: 0, marginTop: '3px' }} />
                          <div><strong style={{ color: '#ffffff' }}>Objective:</strong> <span style={{ color: 'var(--text-secondary)' }}>{task.learning_objective}</span></div>
                        </div>
                        <div style={{ background: 'rgba(10,14,22,0.8)', padding: '12px 16px', borderRadius: 'var(--radius-sm)', borderLeft: '3px solid var(--accent-secondary)', display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
                          <Terminal size={17} color="var(--accent-secondary)" style={{ flexShrink: 0, marginTop: '2px' }} />
                          <div>
                            <div style={{ fontWeight: 700, color: 'var(--accent-secondary)', fontSize: '0.74rem', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '4px' }}>Practical Deliverable</div>
                            <div style={{ color: 'var(--text-main)', fontFamily: 'var(--font-mono)', fontSize: '0.82rem', lineHeight: 1.5 }}>{task.practical_exercise}</div>
                          </div>
                        </div>
                        <div style={{ display: 'flex', gap: '8px', alignItems: 'flex-start', color: 'var(--text-muted)', fontSize: '0.78rem' }}>
                          <Award size={14} color="var(--accent-amber)" style={{ flexShrink: 0, marginTop: '2px' }} />
                          <div><strong>Verification Standard:</strong> {task.completion_criteria}</div>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
