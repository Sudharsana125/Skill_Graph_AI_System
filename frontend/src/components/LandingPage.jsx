import React from 'react';
import { 
  ArrowRight, 
  Play, 
  Layers, 
  Target, 
  GitBranch, 
  Compass, 
  Sparkles, 
  ShieldCheck, 
  Briefcase,
  CheckCircle2,
  TrendingUp,
  Zap,
  GitCompare,
  Cpu
} from 'lucide-react';

export default function LandingPage({ onStartOnboarding, onTryDemo }) {
  return (
    <div style={{ paddingBottom: '70px' }}>
      {/* Hero Section */}
      <section style={{ position: 'relative', padding: '64px 0 40px', overflow: 'hidden' }}>
        <div className="container" style={{ textAlign: 'center', position: 'relative', zIndex: 10 }}>
          
          {/* Status Badge */}
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', marginBottom: '20px' }}>
            <span className="badge badge-indigo" style={{ padding: '5px 12px', fontSize: '0.75rem' }}>
              <Zap size={13} style={{ marginRight: '4px' }} />
              Autonomous Career Intelligence
            </span>
          </div>

          {/* Main Headline */}
          <h1 style={{ 
            fontSize: 'clamp(2.2rem, 4.5vw, 3.8rem)', 
            lineHeight: 1.15, 
            maxWidth: '880px', 
            margin: '0 auto 16px',
            letterSpacing: '-0.025em',
            fontWeight: 800
          }}>
            Real-time skill verification. <br />
            <span className="text-gradient">Zero guesswork on what to learn next.</span>
          </h1>

          {/* Concise Subtitle */}
          <p style={{ 
            fontSize: 'clamp(1rem, 1.5vw, 1.15rem)', 
            color: 'var(--text-secondary)', 
            maxWidth: '620px', 
            margin: '0 auto 28px',
            lineHeight: 1.5 
          }}>
            SkillTwin AI builds an evidence-backed model of your engineering skills, maps transfer bridges, and recalculates your roadmap with every completed project.
          </p>

          {/* Call to Actions */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '14px', flexWrap: 'wrap' }}>
            <button 
              onClick={onTryDemo} 
              className="btn-demo" 
              style={{ fontSize: '0.96rem', padding: '12px 24px' }}
              id="hero-demo-btn"
            >
              <Play size={15} fill="currentColor" />
              <span>Launch Live Demo Profile</span>
            </button>

            <button 
              onClick={onStartOnboarding} 
              className="btn-primary" 
              style={{ fontSize: '0.96rem', padding: '12px 24px' }}
              id="hero-build-btn"
            >
              <span>Build My Profile</span>
              <ArrowRight size={16} />
            </button>
          </div>

          {/* Live System Metrics Bar */}
          <div style={{ 
            marginTop: '44px', 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
            gap: '14px',
            maxWidth: '900px',
            margin: '44px auto 0'
          }}>
            <div className="glass-panel" style={{ padding: '16px 20px', textAlign: 'left' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                <span className="live-pulse"></span>
                <span style={{ fontSize: '0.74rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.04em', fontWeight: 600 }}>
                  Real-Time Engine
                </span>
              </div>
              <div style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--text-main)' }}>
                Dynamic Calibration
              </div>
              <p style={{ fontSize: '0.78rem', color: 'var(--text-dim)', marginTop: '2px' }}>
                Instant score updates per deliverable
              </p>
            </div>

            <div className="glass-panel" style={{ padding: '16px 20px', textAlign: 'left' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                <ShieldCheck size={15} color="#10b981" />
                <span style={{ fontSize: '0.74rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.04em', fontWeight: 600 }}>
                  Evidence Graph
                </span>
              </div>
              <div style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--text-main)' }}>
                Code-Verified Proof
              </div>
              <p style={{ fontSize: '0.78rem', color: 'var(--text-dim)', marginTop: '2px' }}>
                Separates verified proof from claims
              </p>
            </div>

            <div className="glass-panel" style={{ padding: '16px 20px', textAlign: 'left' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                <GitCompare size={15} color="#0284c7" />
                <span style={{ fontSize: '0.74rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.04em', fontWeight: 600 }}>
                  Career Simulator
                </span>
              </div>
              <div style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--text-main)' }}>
                Multi-Path "What-If"
              </div>
              <p style={{ fontSize: '0.78rem', color: 'var(--text-dim)', marginTop: '2px' }}>
                Zero-cost comparison across roles
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Feature Section: 3 Core Pillars */}
      <section className="container" style={{ marginTop: '20px' }}>
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', 
          gap: '18px' 
        }}>
          {/* Pillar 1 */}
          <div className="glass-panel card-interactive" style={{ padding: '26px' }}>
            <div style={{
              width: '42px',
              height: '42px',
              borderRadius: '10px',
              background: 'rgba(37, 99, 235, 0.12)',
              border: '1px solid rgba(37, 99, 235, 0.3)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: '16px'
            }}>
              <Zap size={20} color="#3b82f6" />
            </div>
            <h3 style={{ fontSize: '1.18rem', marginBottom: '8px', fontWeight: 700 }}>
              Next-Best-Move Engine
            </h3>
            <p style={{ fontSize: '0.86rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
              Avoid analysis paralysis. The system isolates the single highest-impact action with clear deliverables and projected alignment gains.
            </p>
          </div>

          {/* Pillar 2 */}
          <div className="glass-panel card-interactive" style={{ padding: '26px' }}>
            <div style={{
              width: '42px',
              height: '42px',
              borderRadius: '10px',
              background: 'rgba(16, 185, 129, 0.12)',
              border: '1px solid rgba(16, 185, 129, 0.3)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: '16px'
            }}>
              <Cpu size={20} color="#10b981" />
            </div>
            <h3 style={{ fontSize: '1.18rem', marginBottom: '8px', fontWeight: 700 }}>
              Skill Transfer Intelligence
            </h3>
            <p style={{ fontSize: '0.86rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
              Leverage what you already know. Existing competencies in Python, SQL, and APIs map directly to LLM orchestration, cutting ramp-up time by ~60%.
            </p>
          </div>

          {/* Pillar 3 */}
          <div className="glass-panel card-interactive" style={{ padding: '26px' }}>
            <div style={{
              width: '42px',
              height: '42px',
              borderRadius: '10px',
              background: 'rgba(2, 132, 199, 0.12)',
              border: '1px solid rgba(2, 132, 199, 0.3)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: '16px'
            }}>
              <TrendingUp size={20} color="#0284c7" />
            </div>
            <h3 style={{ fontSize: '1.18rem', marginBottom: '8px', fontWeight: 700 }}>
              SkillTwin Evolution
            </h3>
            <p style={{ fontSize: '0.86rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
              Your profile evolves dynamically. As you submit code milestones, your skill graph upgrades and unlocks higher-tier career benchmarks.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
