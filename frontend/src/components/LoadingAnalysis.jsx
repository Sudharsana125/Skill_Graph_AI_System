import React, { useState, useEffect } from 'react';
import { Cpu, CheckCircle2, Loader2, Sparkles, Layers } from 'lucide-react';

const ANALYSIS_STAGES = [
  { agent: "Agent 01", title: "Analyzing profile & project evidence...", detail: "Normalizing declared skills and cross-referencing code deliverables" },
  { agent: "Agent 02", title: "Understanding your target role...", detail: "Retrieving RAG benchmark competencies & market frequency data" },
  { agent: "Agent 03", title: "Mapping your skills...", detail: "Evaluating depth, recency, and practical verification indicators" },
  { agent: "Agent 03", title: "Finding your gaps...", detail: "Quantifying delta matrix across HIGH, MEDIUM, and STRONG priorities" },
  { agent: "Agent 04", title: "Building your roadmap...", detail: "Engineering 5-phase practical action milestones and capstones" },
  { agent: "Agent 05", title: "Selecting gap-targeted projects...", detail: "Tailoring portfolio builds to directly close identified deficits" },
  { agent: "Orchestrator", title: "Preparing your SkillTwin...", detail: "Persisting career twin state and computing alignment index" }
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
    }, 1200);

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
      <div className="glass-panel-glow" style={{
        maxWidth: '620px',
        width: '100%',
        padding: '48px 40px',
        borderRadius: 'var(--radius-lg)',
        textAlign: 'center',
        position: 'relative'
      }}>
        {/* Animated Cyber Core Icon */}
        <div style={{ position: 'relative', width: '90px', height: '90px', margin: '0 auto 28px' }}>
          <div style={{
            position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
            borderRadius: '50%',
            border: '2px dashed var(--accent-secondary)',
            animation: 'spinSlow 10s linear infinite'
          }} />
          <div style={{
            position: 'absolute', top: '10px', left: '10px', right: '10px', bottom: '10px',
            borderRadius: '50%',
            background: 'linear-gradient(135deg, #6366f1, #06b6d4)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            boxShadow: '0 0 35px rgba(99, 102, 241, 0.6)'
          }}>
            <Cpu size={36} color="#ffffff" className="animate-pulse-slow" />
          </div>
        </div>

        <span className="badge badge-indigo" style={{ marginBottom: '16px' }}>
          Multi-Agent Telemetry Active
        </span>

        <h2 style={{ fontSize: '1.8rem', marginBottom: '10px' }}>
          {ANALYSIS_STAGES[currentStageIdx].title}
        </h2>

        <p style={{ color: 'var(--text-muted)', fontSize: '0.92rem', marginBottom: '28px', minHeight: '44px' }}>
          <strong style={{ color: 'var(--accent-secondary)' }}>[{ANALYSIS_STAGES[currentStageIdx].agent}]</strong>: {ANALYSIS_STAGES[currentStageIdx].detail}
        </p>

        {/* Progress bar */}
        <div className="progress-bar-container" style={{ height: '10px', marginBottom: '20px' }}>
          <div className="progress-bar-fill" style={{ width: `${progressPercent}%` }} />
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', color: 'var(--text-dim)' }}>
          <span>Agent Pipeline Execution</span>
          <span>{progressPercent}% Complete</span>
        </div>

        {/* Stage Checkmarks Checklist */}
        <div style={{ 
          marginTop: '28px', 
          textAlign: 'left', 
          background: 'rgba(255,255,255,0.02)', 
          border: '1px solid var(--card-border)',
          borderRadius: 'var(--radius-md)',
          padding: '16px 20px',
          maxHeight: '180px',
          overflowY: 'auto'
        }}>
          {ANALYSIS_STAGES.map((s, idx) => {
            const isDone = idx < currentStageIdx;
            const isCurrent = idx === currentStageIdx;
            return (
              <div key={idx} style={{
                display: 'flex', alignItems: 'center', gap: '10px',
                padding: '6px 0',
                fontSize: '0.85rem',
                color: isDone ? 'var(--text-main)' : (isCurrent ? 'var(--accent-secondary)' : 'var(--text-dim)'),
                fontWeight: isCurrent ? 600 : 400
              }}>
                {isDone ? (
                  <CheckCircle2 size={16} color="var(--accent-emerald)" />
                ) : isCurrent ? (
                  <Loader2 size={16} color="var(--accent-secondary)" className="animate-spin" />
                ) : (
                  <div style={{ width: '16px', height: '16px', borderRadius: '50%', border: '1px solid var(--card-border)' }} />
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
