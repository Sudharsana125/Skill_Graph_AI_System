import React, { useState } from 'react';
import { 
  TrendingUp, 
  Sparkles, 
  CheckCircle2, 
  ArrowRight, 
  Clock, 
  Zap, 
  ShieldCheck, 
  PlusCircle, 
  RefreshCw,
  Award,
  ChevronRight
} from 'lucide-react';
import { logEvolutionEvent } from '../services/api';

export default function SkillEvolutionTimeline({ 
  timeline = [], 
  userId, 
  onEvolutionLogged 
}) {
  const [isSimulating, setIsSimulating] = useState(false);
  const [statusMsg, setStatusMsg] = useState(null);

  // Preset demo triggers for the hackathon pitch
  const demoScenarios = [
    {
      skill_name: 'LangChain & RAG Orchestration',
      trigger_event: 'Completed Multi-Agent Retrieval Benchmark Project',
      previous_level: 'Intermediate',
      new_level: 'Advanced',
      confidence_before: 0.65,
      confidence_after: 0.88,
      unlocked_capabilities: ['Multi-Index Hybrid Search', 'Agent Memory Pipelines', 'Self-Healing Tool Use'],
      remaining_gaps: ['Distributed Vector Sharding', 'Multi-Modal RAG Optimization']
    },
    {
      skill_name: 'Docker & Model Serving',
      trigger_event: 'Shipped Containerized FastAPI Model Gateway to Cloud Run',
      previous_level: 'Beginner',
      new_level: 'Intermediate',
      confidence_before: 0.40,
      confidence_after: 0.72,
      unlocked_capabilities: ['Multi-Stage Dockerfile Builds', 'Container Health Check Probes', 'Gunicorn/Uvicorn Tuning'],
      remaining_gaps: ['Kubernetes Cluster Autoscaling', 'Envoy Sidecar Mesh']
    },
    {
      skill_name: 'Vector Databases (Pinecone / Qdrant)',
      trigger_event: 'Benchmarked HNSW Index Latencies on 100k Embeddings',
      previous_level: 'Beginner',
      new_level: 'Intermediate',
      confidence_before: 0.35,
      confidence_after: 0.70,
      unlocked_capabilities: ['HNSW vs IVF Index Tuning', 'Metadata Filtering At Scale', 'Batch Upsert Concurrency'],
      remaining_gaps: ['Quantization & Memory Compression']
    }
  ];

  const handleTriggerSimulation = async (scenario) => {
    if (!userId) return;
    setIsSimulating(true);
    setStatusMsg(null);
    try {
      await logEvolutionEvent(userId, {
        trigger_event: scenario.trigger_event,
        skill_name: scenario.skill_name,
        previous_level: scenario.previous_level,
        new_level: scenario.new_level,
        confidence_before: scenario.confidence_before,
        confidence_after: scenario.confidence_after,
        unlocked_capabilities: scenario.unlocked_capabilities,
        remaining_gaps: scenario.remaining_gaps
      });
      setStatusMsg(`Evolved ${scenario.skill_name}: ${scenario.previous_level} → ${scenario.new_level}!`);
      if (onEvolutionLogged) {
        onEvolutionLogged();
      }
    } catch (err) {
      console.error('Failed to log evolution:', err);
      setStatusMsg('Failed to record evolution event.');
    } finally {
      setIsSimulating(false);
      setTimeout(() => setStatusMsg(null), 5000);
    }
  };

  const sortedTimeline = [...timeline].reverse();

  return (
    <div>
      {/* Header & Subtitle */}
      <div style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'flex-start', 
        flexWrap: 'wrap', 
        gap: '16px',
        marginBottom: '24px' 
      }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
            <span className="badge badge-indigo">
              <TrendingUp size={13} style={{ marginRight: '5px' }} />
              Dynamic Twin Recalibration
            </span>
            <span style={{ fontSize: '0.8rem', color: 'var(--text-dim)' }}>
              {timeline.length} Recorded Milestone{timeline.length !== 1 ? 's' : ''}
            </span>
          </div>
          <h2 style={{ fontSize: '1.6rem', fontWeight: 800 }}>
            SkillTwin Evolution Engine
          </h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.92rem', maxWidth: '680px' }}>
            Your SkillTwin is an active, living representation. As you verify projects, complete roadmaps, and submit deliverables, the system automatically shifts your competency thresholds, confidence scores, and capability boundaries.
          </p>
        </div>

        {/* Quick Simulation Bar */}
        <div className="glass-panel" style={{ padding: '16px 20px', maxWidth: '420px', width: '100%' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '10px' }}>
            <Zap size={16} color="var(--accent-secondary)" />
            <span style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-main)' }}>
              Simulate Live Evolution Trigger
            </span>
          </div>
          <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginBottom: '12px', lineHeight: 1.4 }}>
            Click a real-world trigger to witness your SkillTwin recalculate its state in real time:
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {demoScenarios.map((scenario, idx) => (
              <button
                key={idx}
                disabled={isSimulating}
                onClick={() => handleTriggerSimulation(scenario)}
                className="btn-secondary"
                style={{ 
                  justifyContent: 'space-between', 
                  padding: '8px 12px', 
                  fontSize: '0.82rem',
                  textAlign: 'left' 
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Sparkles size={14} color="var(--accent-secondary)" />
                  <span style={{ fontWeight: 600 }}>{scenario.skill_name}</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <span style={{ fontSize: '0.74rem', color: 'var(--accent-emerald)', fontFamily: 'var(--font-mono)' }}>
                    +{Math.round((scenario.confidence_after - scenario.confidence_before) * 100)}%
                  </span>
                  <ChevronRight size={14} color="var(--text-dim)" />
                </div>
              </button>
            ))}
          </div>

          {statusMsg && (
            <div style={{ 
              marginTop: '10px', 
              padding: '8px 12px', 
              borderRadius: 'var(--radius-xs)', 
              background: 'rgba(16, 185, 129, 0.12)', 
              border: '1px solid rgba(16, 185, 129, 0.3)',
              color: '#34d399',
              fontSize: '0.8rem',
              display: 'flex',
              alignItems: 'center',
              gap: '6px'
            }}>
              <CheckCircle2 size={14} />
              <span>{statusMsg}</span>
            </div>
          )}
        </div>
      </div>

      {/* Timeline Stream */}
      <div style={{ position: 'relative', marginTop: '30px' }}>
        {/* Continuous vertical line */}
        <div style={{
          position: 'absolute',
          top: '20px',
          bottom: '20px',
          left: '23px',
          width: '2px',
          background: 'linear-gradient(180deg, #6366f1 0%, rgba(6, 182, 212, 0.4) 50%, rgba(255, 255, 255, 0.05) 100%)',
          zIndex: 0
        }} />

        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', position: 'relative', zIndex: 1 }}>
          {sortedTimeline.length === 0 ? (
            <div className="glass-panel" style={{ padding: '36px', textAlign: 'center' }}>
              <Clock size={32} color="var(--text-muted)" style={{ margin: '0 auto 12px' }} />
              <h3 style={{ fontSize: '1.1rem', marginBottom: '6px' }}>No Evolution Events Yet</h3>
              <p style={{ color: 'var(--text-dim)', fontSize: '0.88rem' }}>
                Complete an action item or simulate an event above to start logging your growth milestones.
              </p>
            </div>
          ) : (
            sortedTimeline.map((event, index) => {
              const confBefore = Math.round((event.confidence_before || 0) * 100);
              const confAfter = Math.round((event.confidence_after || 0) * 100);
              const confDelta = confAfter - confBefore;

              return (
                <div 
                  key={event.id || index}
                  className="glass-panel card-interactive"
                  style={{
                    marginLeft: '48px',
                    padding: '22px 24px',
                    position: 'relative'
                  }}
                >
                  {/* Timeline Node Dot */}
                  <div style={{
                    position: 'absolute',
                    left: '-36px',
                    top: '26px',
                    width: '22px',
                    height: '22px',
                    borderRadius: '50%',
                    background: index === 0 ? 'var(--accent-secondary)' : '#6366f1',
                    border: '3px solid var(--bg-primary)',
                    boxShadow: index === 0 ? '0 0 12px rgba(6, 182, 212, 0.8)' : '0 0 8px rgba(99, 102, 241, 0.5)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                    <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#fff' }} />
                  </div>

                  {/* Header Row: Trigger & Timestamp */}
                  <div style={{ 
                    display: 'flex', 
                    justifyContent: 'space-between', 
                    alignItems: 'center', 
                    flexWrap: 'wrap', 
                    gap: '10px',
                    marginBottom: '14px' 
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <span className={`badge ${index === 0 ? 'badge-cyan' : 'badge-indigo'}`}>
                        {event.event_type || 'EVOLUTION'}
                      </span>
                      <span style={{ fontSize: '0.88rem', fontWeight: 600, color: 'var(--text-secondary)' }}>
                        {event.trigger_event}
                      </span>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--text-dim)', fontSize: '0.78rem' }}>
                      <Clock size={13} />
                      <span>{event.created_at ? new Date(event.created_at).toLocaleDateString() : 'Recent'}</span>
                    </div>
                  </div>

                  {/* Evolution Transition Grid */}
                  <div style={{ 
                    display: 'grid', 
                    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
                    gap: '16px',
                    background: 'rgba(0, 0, 0, 0.25)',
                    padding: '16px 18px',
                    borderRadius: 'var(--radius-sm)',
                    border: '1px solid var(--card-border)',
                    marginBottom: '16px'
                  }}>
                    {/* Skill Evolved */}
                    <div>
                      <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                        Skill Recalibrated
                      </span>
                      <div style={{ fontSize: '1.05rem', fontWeight: 700, color: 'var(--text-main)', marginTop: '2px' }}>
                        {event.skill_name}
                      </div>
                    </div>

                    {/* Competency Level Transition */}
                    <div>
                      <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                        Competency Shift
                      </span>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '4px' }}>
                        <span style={{ 
                          fontSize: '0.82rem', 
                          padding: '2px 8px', 
                          borderRadius: '4px', 
                          background: 'rgba(255, 255, 255, 0.08)',
                          color: 'var(--text-secondary)' 
                        }}>
                          {event.previous_level}
                        </span>
                        <ArrowRight size={14} color="var(--accent-secondary)" />
                        <span style={{ 
                          fontSize: '0.82rem', 
                          padding: '2px 8px', 
                          borderRadius: '4px', 
                          background: 'rgba(16, 185, 129, 0.15)',
                          border: '1px solid rgba(16, 185, 129, 0.3)',
                          color: '#34d399',
                          fontWeight: 700 
                        }}>
                          {event.new_level}
                        </span>
                      </div>
                    </div>

                    {/* Confidence Score Delta */}
                    <div>
                      <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                        Confidence Index
                      </span>
                      <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px', marginTop: '2px' }}>
                        <span style={{ fontSize: '1.1rem', fontWeight: 800, fontFamily: 'var(--font-mono)' }}>
                          {confAfter}%
                        </span>
                        {confDelta > 0 && (
                          <span style={{ fontSize: '0.8rem', color: '#10b981', fontWeight: 700, fontFamily: 'var(--font-mono)' }}>
                            +{confDelta}%
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Capabilities & Remaining Gaps */}
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '14px' }}>
                    {/* Unlocked Capabilities */}
                    {event.unlocked_capabilities && event.unlocked_capabilities.length > 0 && (
                      <div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '8px' }}>
                          <CheckCircle2 size={14} color="var(--accent-emerald)" />
                          <span style={{ fontSize: '0.78rem', fontWeight: 700, color: '#34d399', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                            Unlocked Capabilities
                          </span>
                        </div>
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                          {event.unlocked_capabilities.map((cap, i) => (
                            <span 
                              key={i} 
                              style={{ 
                                fontSize: '0.78rem', 
                                padding: '3px 9px', 
                                borderRadius: 'var(--radius-xs)', 
                                background: 'rgba(16, 185, 129, 0.1)', 
                                border: '1px solid rgba(16, 185, 129, 0.2)',
                                color: 'var(--text-main)'
                              }}
                            >
                              ✓ {cap}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Remaining Gaps to Next Tier */}
                    {event.remaining_gaps && event.remaining_gaps.length > 0 && (
                      <div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '8px' }}>
                          <Sparkles size={14} color="var(--accent-amber)" />
                          <span style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--accent-amber)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                            Next Horizon Focus
                          </span>
                        </div>
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                          {event.remaining_gaps.map((gap, i) => (
                            <span 
                              key={i} 
                              style={{ 
                                fontSize: '0.78rem', 
                                padding: '3px 9px', 
                                borderRadius: 'var(--radius-xs)', 
                                background: 'rgba(245, 158, 11, 0.08)', 
                                border: '1px solid rgba(245, 158, 11, 0.2)',
                                color: 'var(--text-secondary)'
                              }}
                            >
                              • {gap}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}
