import React from 'react';
import { Zap, Clock, TrendingUp, CheckCircle2, Terminal, ArrowRight, ShieldCheck } from 'lucide-react';

export default function NextBestMoveCard({ nextMove, onCompleteMove, isUpdating }) {
  if (!nextMove) return null;

  return (
    <div className="glass-panel card-interactive" style={{
      padding: '20px 24px',
      marginBottom: '20px',
      background: 'linear-gradient(135deg, rgba(37, 99, 235, 0.08) 0%, rgba(2, 132, 199, 0.04) 100%)',
      borderColor: 'rgba(37, 99, 235, 0.35)',
      borderRadius: 'var(--radius-md)',
      position: 'relative'
    }}>
      {/* Header Bar */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px', flexWrap: 'wrap', gap: '8px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{
            width: '26px',
            height: '26px',
            borderRadius: '6px',
            background: 'linear-gradient(135deg, #2563eb, #0284c7)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <Zap size={14} color="#ffffff" fill="currentColor" />
          </span>
          <span style={{ fontSize: '0.78rem', fontWeight: 700, letterSpacing: '0.05em', color: '#93c5fd', textTransform: 'uppercase' }}>
            Next Best Move
          </span>
          <span className="live-pulse" style={{ marginLeft: '4px' }}></span>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '5px', fontSize: '0.75rem', color: 'var(--text-muted)' }}>
            <Clock size={12} />
            <span>{nextMove.estimated_effort}</span>
          </div>
          <span className="badge badge-indigo">{nextMove.target_skill}</span>
        </div>
      </div>

      {/* Main Content Grid */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '18px' }}>
        <div style={{ flex: 1, minWidth: '280px' }}>
          <h3 style={{ fontSize: '1.15rem', marginBottom: '4px', fontWeight: 700, color: '#ffffff' }}>
            {nextMove.title}
          </h3>

          <p style={{ fontSize: '0.84rem', color: 'var(--text-secondary)', lineHeight: 1.45, marginBottom: '10px' }}>
            {nextMove.why_now}
          </p>

          {/* Practical Deliverable Box */}
          <div style={{
            background: 'rgba(0, 0, 0, 0.35)',
            borderLeft: '3px solid #3b82f6',
            borderRadius: 'var(--radius-xs)',
            padding: '8px 12px',
            display: 'flex',
            gap: '8px',
            alignItems: 'center'
          }}>
            <Terminal size={14} color="#38bdf8" style={{ flexShrink: 0 }} />
            <div style={{ fontSize: '0.78rem', fontFamily: 'var(--font-mono)', color: 'var(--text-main)' }}>
              <strong>Deliverable:</strong> {nextMove.practical_instruction}
            </div>
          </div>
        </div>

        {/* Action Button & Impact */}
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-end',
          justifyContent: 'center',
          gap: '8px',
          minWidth: '200px'
        }}>
          <div style={{
            textAlign: 'right',
            background: 'rgba(16, 185, 129, 0.08)',
            border: '1px solid rgba(16, 185, 129, 0.25)',
            padding: '6px 12px',
            borderRadius: 'var(--radius-xs)',
            width: '100%'
          }}>
            <span style={{ fontSize: '0.68rem', color: '#34d399', textTransform: 'uppercase', fontWeight: 700, letterSpacing: '0.04em', display: 'block' }}>
              Projected Impact
            </span>
            <span style={{ fontSize: '0.82rem', fontWeight: 700, color: '#ffffff' }}>
              {nextMove.impact_summary}
            </span>
          </div>

          {nextMove.task_id && (
            <button
              onClick={() => onCompleteMove(nextMove.task_id)}
              disabled={isUpdating}
              className="btn-primary"
              style={{ width: '100%', padding: '10px 16px', fontSize: '0.86rem', whiteSpace: 'nowrap' }}
              title="Click to execute this action and immediately recalibrate in real-time"
            >
              {isUpdating ? (
                <span>Recalibrating in Real-Time...</span>
              ) : (
                <>
                  <CheckCircle2 size={15} />
                  <span>Execute Move & Recalibrate</span>
                </>
              )}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
