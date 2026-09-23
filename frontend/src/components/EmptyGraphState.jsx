import React from 'react';
import { 
  PlusCircle, 
  Briefcase, 
  Target, 
  FileText, 
  Sparkles, 
  Cpu, 
  Play, 
  ArrowRight,
  ShieldCheck,
  Zap,
  Layers
} from 'lucide-react';

export default function EmptyGraphState({ 
  onAddSkills, 
  onAddProject, 
  onSetCareerGoal, 
  onUploadResume, 
  onLoadDemo 
}) {
  return (
    <div style={{
      maxWidth: '860px',
      margin: '40px auto',
      padding: '48px 32px',
      background: 'rgba(15, 23, 42, 0.65)',
      border: '1px solid rgba(255, 255, 255, 0.08)',
      borderRadius: '16px',
      boxShadow: '0 20px 48px rgba(0, 0, 0, 0.5)',
      textAlign: 'center',
      backdropFilter: 'blur(12px)'
    }}>
      
      {/* Icon & Status */}
      <div style={{
        width: '64px',
        height: '64px',
        borderRadius: '16px',
        background: 'rgba(56, 189, 248, 0.1)',
        border: '1px solid rgba(56, 189, 248, 0.3)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        margin: '0 auto 20px',
        color: '#38bdf8'
      }}>
        <Cpu size={32} />
      </div>

      <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', marginBottom: '12px' }}>
        <span className="live-pulse"></span>
        <span style={{ fontSize: '0.78rem', color: '#94a3b8', fontWeight: 600, letterSpacing: '0.04em', textTransform: 'uppercase' }}>
          Zero Unverified Placeholders
        </span>
      </div>

      <h2 style={{
        fontSize: 'clamp(1.8rem, 3vw, 2.4rem)',
        fontWeight: 800,
        color: '#ffffff',
        letterSpacing: '-0.02em',
        marginBottom: '12px',
        lineHeight: 1.2
      }}>
        Your SkillGraph is waiting to be built.
      </h2>

      <p style={{
        color: '#94a3b8',
        fontSize: '1rem',
        maxWidth: '580px',
        margin: '0 auto 36px',
        lineHeight: 1.6
      }}>
        SkillGraph AI does not invent fake credentials or generic templates. Provide your actual competencies, completed projects, and career ambition to generate an evidence-verified intelligence graph.
      </p>

      {/* 4 Action Cards for Real Profile Creation */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
        gap: '14px',
        marginBottom: '36px',
        textAlign: 'left'
      }}>
        <div 
          onClick={onAddSkills}
          className="card-interactive"
          style={{
            padding: '20px',
            background: 'rgba(255, 255, 255, 0.02)',
            border: '1px solid rgba(255, 255, 255, 0.08)',
            borderRadius: '12px',
            cursor: 'pointer',
            transition: 'all 0.18s ease'
          }}
        >
          <div style={{ width: '36px', height: '36px', borderRadius: '8px', background: 'rgba(56, 189, 248, 0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#38bdf8', marginBottom: '12px' }}>
            <PlusCircle size={20} />
          </div>
          <h4 style={{ fontSize: '0.96rem', fontWeight: 700, color: '#f8fafc', marginBottom: '4px' }}>
            Add Skills
          </h4>
          <p style={{ fontSize: '0.78rem', color: '#94a3b8', lineHeight: 1.4 }}>
            Input technical competencies, frameworks, and self-ratings.
          </p>
        </div>

        <div 
          onClick={onAddProject}
          className="card-interactive"
          style={{
            padding: '20px',
            background: 'rgba(255, 255, 255, 0.02)',
            border: '1px solid rgba(255, 255, 255, 0.08)',
            borderRadius: '12px',
            cursor: 'pointer',
            transition: 'all 0.18s ease'
          }}
        >
          <div style={{ width: '36px', height: '36px', borderRadius: '8px', background: 'rgba(16, 185, 129, 0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#10b981', marginBottom: '12px' }}>
            <Briefcase size={20} />
          </div>
          <h4 style={{ fontSize: '0.96rem', fontWeight: 700, color: '#f8fafc', marginBottom: '4px' }}>
            Add Project
          </h4>
          <p style={{ fontSize: '0.78rem', color: '#94a3b8', lineHeight: 1.4 }}>
            Link GitHub repositories and practical deliverables as proof.
          </p>
        </div>

        <div 
          onClick={onSetCareerGoal}
          className="card-interactive"
          style={{
            padding: '20px',
            background: 'rgba(255, 255, 255, 0.02)',
            border: '1px solid rgba(255, 255, 255, 0.08)',
            borderRadius: '12px',
            cursor: 'pointer',
            transition: 'all 0.18s ease'
          }}
        >
          <div style={{ width: '36px', height: '36px', borderRadius: '8px', background: 'rgba(139, 92, 246, 0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#c084fc', marginBottom: '12px' }}>
            <Target size={20} />
          </div>
          <h4 style={{ fontSize: '0.96rem', fontWeight: 700, color: '#f8fafc', marginBottom: '4px' }}>
            Set Career Goal
          </h4>
          <p style={{ fontSize: '0.78rem', color: '#94a3b8', lineHeight: 1.4 }}>
            Select target role to benchmark required industry capabilities.
          </p>
        </div>

        <div 
          onClick={onUploadResume}
          className="card-interactive"
          style={{
            padding: '20px',
            background: 'rgba(255, 255, 255, 0.02)',
            border: '1px solid rgba(255, 255, 255, 0.08)',
            borderRadius: '12px',
            cursor: 'pointer',
            transition: 'all 0.18s ease'
          }}
        >
          <div style={{ width: '36px', height: '36px', borderRadius: '8px', background: 'rgba(245, 158, 11, 0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#f59e0b', marginBottom: '12px' }}>
            <FileText size={20} />
          </div>
          <h4 style={{ fontSize: '0.96rem', fontWeight: 700, color: '#f8fafc', marginBottom: '4px' }}>
            Upload Resume
          </h4>
          <p style={{ fontSize: '0.78rem', color: '#94a3b8', lineHeight: 1.4 }}>
            Extract experience, coursework, and verifiable citations.
          </p>
        </div>
      </div>

      {/* Primary CTA & Separated Controlled Demo Option */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '16px',
        flexWrap: 'wrap',
        paddingTop: '20px',
        borderTop: '1px solid rgba(255, 255, 255, 0.08)'
      }}>
        <button 
          onClick={onAddSkills}
          className="btn-primary" 
          style={{ padding: '12px 28px', fontSize: '0.95rem' }}
          id="empty-state-start-btn"
        >
          <Sparkles size={16} />
          <span>Launch Profile Builder Wizard</span>
          <ArrowRight size={16} />
        </button>

        {onLoadDemo && (
          <button 
            onClick={onLoadDemo}
            className="btn-demo" 
            style={{ padding: '12px 22px', fontSize: '0.92rem' }}
            id="empty-state-demo-btn"
          >
            <Play size={14} fill="currentColor" />
            <span>Load Controlled Demo Profile (AI Engineer)</span>
          </button>
        )}
      </div>

      <div style={{ marginTop: '16px', fontSize: '0.74rem', color: '#64748b' }}>
        Controlled Demo data is strictly isolated and clearly badged.
      </div>
    </div>
  );
}
