import React, { useState, useEffect } from 'react';
import { Cpu, CheckCircle2, Loader2, Sparkles, Zap, ShieldCheck } from 'lucide-react';

const ANALYSIS_STAGES = [
  { agent: "Agent 01: Profile Analyzer", title: "Parsing skill evidence & project deliverables...", detail: "Normalizing declared skills and cross-referencing code artifacts" },
  { agent: "Agent 02: Career Knowledge RAG", title: "Benchmarking target role competencies...", detail: "Retrieving industry skill distributions and market standards" },
  { agent: "Agent 03: Gap Delta Engine", title: "Computing multi-tier skill deficit matrix...", detail: "Prioritizing HIGH, MEDIUM, and STRONG competence thresholds" },
  { agent: "Agent 04: Adaptive Roadmap Agent", title: "Engineering sequenced learning sprints...", detail: "Generating 5-phase practical action milestones and deliverables" },
  { agent: "Agent 05: Project Recommender", title: "Selecting gap-targeted high-ROI projects...", detail: "Matching portfolio builds to directly eliminate skill gaps" },
  { agent: "Agent 06: Next-Best-Move Decision Engine", title: "Finalizing prescriptive career action...", detail: "Synthesizing evidence graph, transfer bridges, and live twin state" }
];

export default function LoadingAnalysis() {
  const [currentStageIdx, setCurrentStageIdx] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentStageIdx(prev => {
        if (prev < ANALYSIS_STAGES.length - 1) {
          return prev + 1;
        }
        return prev;
      });
    }, 1100);

    return () => clearInterval(interval);
  }, []);

  const progressPercent = Math.min(100, Math.round(((currentStageIdx + 1) / ANALYSIS_STAGES.length) * 100));

  return (
    <div className="container" style={{ 
      minHeight: '75vh', 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'center',
      padding: '40px 20px' 
    }}>
      <div className="glass-panel" style={{
        maxWidth: '640px',
        width: '100%',
        padding: '44px 36px',
        borderRadius: '20px',
        textAlign: 'center',
        position: 'relative',
        border: '1px solid rgba(139, 92, 246, 0.35)',
        boxShadow: '0 20px 50px rgba(0, 0, 0, 0.7), 0 0 30px rgba(139, 92, 246, 0.2)'
      }}>
        {/* Animated Cyber Core Icon */}
        <div style={{ position: 'relative', width: '84px', height: '84px', margin: '0 auto 24px' }}>
          <div style={{
            position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
            borderRadius: '50%',
            border: '2px dashed #06b6d4',
            animation: 'spin 12s linear infinite'
          }} />
          <div style={{
            position: 'absolute', top: '10px', left: '10px', right: '10px', bottom: '10px',
            borderRadius: '50%',
            background: 'linear-gradient(135deg, #8b5cf6, #06b6d4)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            boxShadow: '0 0 30px rgba(139, 92, 246, 0.6)'
          }}>
            <Cpu size={32} color="#ffffff" className="spin-animation" style={{ animationDuration: '4s' }} />
          </div>
        </div>

        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', marginBottom: '14px' }}>
          <span className="badge badge-violet" style={{ padding: '5px 12px' }}>
            <Zap size={13} style={{ marginRight: '4px' }} />
            Autonomous Multi-Agent Telemetry
          </span>
        </div>

        <h2 style={{ fontSize: '1.65rem', fontWeight: 800, color: '#ffffff', marginBottom: '8px' }}>
          {ANALYSIS_STAGES[currentStageIdx].title}
        </h2>

        <p style={{ color: 'var(--text-secondary)', fontSize: '0.88rem', marginBottom: '24px', minHeight: '40px', lineHeight: 1.4 }}>
          <strong style={{ color: '#c4b5fd' }}>[{ANALYSIS_STAGES[currentStageIdx].agent}]</strong>: {ANALYSIS_STAGES[currentStageIdx].detail}
        </p>

        {/* Progress bar */}
        <div className="progress-bar-container" style={{ height: '8px', marginBottom: '16px' }}>
          <div className="progress-bar-fill" style={{ width: `${progressPercent}%` }} />
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.78rem', color: 'var(--text-dim)', fontWeight: 600 }}>
          <span>Multi-Agent Calibration</span>
          <span style={{ color: '#34d399' }}>{progressPercent}% Complete</span>
        </div>

        {/* Stage Checkmarks Checklist */}
        <div style={{ 
          marginTop: '24px', 
          textAlign: 'left', 
          background: 'rgba(255, 255, 255, 0.02)', 
          border: '1px solid rgba(255, 255, 255, 0.08)',
          borderRadius: '12px',
          padding: '14px 18px',
          maxHeight: '190px',
          overflowY: 'auto'
        }}>
          {ANALYSIS_STAGES.map((s, idx) => {
            const isDone = idx < currentStageIdx;
            const isCurrent = idx === currentStageIdx;
            return (
              <div key={idx} style={{
                display: 'flex', alignItems: 'center', gap: '10px',
                padding: '6px 0',
                fontSize: '0.82rem',
                color: isDone ? '#ffffff' : (isCurrent ? '#c4b5fd' : 'var(--text-dim)'),
                fontWeight: isCurrent ? 700 : 400
              }}>
                {isDone ? (
                  <CheckCircle2 size={16} color="#10b981" />
                ) : isCurrent ? (
                  <Loader2 size={16} color="#8b5cf6" className="spin-animation" />
                ) : (
                  <div style={{ width: '15px', height: '15px', borderRadius: '50%', border: '1px solid rgba(255, 255, 255, 0.15)' }} />
                )}
                <span>{s.title}</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
