import React, { useState, useEffect } from 'react';
import { 
  ArrowRight, 
  Play, 
  Zap, 
  ShieldCheck, 
  GitCompare, 
  TrendingUp, 
  CheckCircle2, 
  Sparkles,
  GitBranch,
  Layers,
  Cpu,
  Target,
  Clock,
  ChevronRight,
  Flame,
  Check,
  Code2,
  ExternalLink,
  Activity,
  Workflow,
  Search,
  BookOpen
} from 'lucide-react';

export default function LandingPage({ onStartOnboarding, onTryDemo }) {
  // Hero Live Interactive Graph State
  const [activeHeroNode, setActiveHeroNode] = useState('next_action');

  // Section 1: Capability Network Active Skill
  const [activeCapabilitySkill, setActiveCapabilitySkill] = useState('Python');

  // Section 2: Gaps active role tab
  const [activeGapRole, setActiveGapRole] = useState('AI Engineer');

  // Section 3: Transfer active mapping
  const [activeTransferPair, setActiveTransferPair] = useState(0);

  // Section 4: Next Move simulation completed state
  const [isSimulatedCompleted, setIsSimulatedCompleted] = useState(false);

  // Section 5: Evolution Before/After state
  const [evolutionStage, setEvolutionStage] = useState('after'); // 'before' | 'after'

  // Interactive Capability Network Data
  const capabilitySkills = {
    'Python': {
      category: 'Core Programming',
      level: 'Advanced (Level 4/5)',
      confidence: '92%',
      evidenceCount: '4 Proven Sources',
      projects: ['Intelligent RAG Assistant', 'Async Fast API Engine'],
      description: 'Production async routines, vector embeddings handling, and typing.'
    },
    'SQL': {
      category: 'Data Engineering',
      level: 'Intermediate (Level 3/5)',
      confidence: '85%',
      evidenceCount: '2 Verified Schemas',
      projects: ['Analytics Data Warehouse'],
      description: 'Complex aggregations, window functions, and indexing.'
    },
    'FastAPI': {
      category: 'API & Microservices',
      level: 'Intermediate (Level 3/5)',
      confidence: '80%',
      evidenceCount: '2 REST APIs',
      projects: ['Intelligent RAG Assistant'],
      description: 'Pydantic v2 validation, OAuth security, and async background tasks.'
    },
    'RAG': {
      category: 'Generative AI',
      level: 'Intermediate (Level 3/5)',
      confidence: '88%',
      evidenceCount: '3 Live Deployments',
      projects: ['Chroma Vector Store Search'],
      description: 'Hybrid sparse-dense retrieval, chunking, and context reranking.'
    }
  };

  // Section 2: Gap Transitions Data
  const gapTransitionsByRole = {
    'AI Engineer': [
      { skill: 'Docker & Containerization', current: 'None', target: 'Intermediate', priority: 'HIGH', impact: '+6.5% Market Alignment', reason: 'Essential for production deployment of model inference containers.' },
      { skill: 'Vector DBs (Chroma/Pinecone)', current: 'Beginner', target: 'Intermediate', priority: 'HIGH', impact: '+5.0% Market Alignment', reason: 'Required for high-throughput semantic embedding indexes.' },
      { skill: 'LangGraph & Multi-Agent Loops', current: 'None', target: 'Intermediate', priority: 'MEDIUM', impact: '+4.5% Market Alignment', reason: 'Industry standard for non-deterministic state machines.' }
    ],
    'Agentic AI Architect': [
      { skill: 'LangGraph State Graphs', current: 'Beginner', target: 'Advanced', priority: 'HIGH', impact: '+9.0% Market Alignment', reason: 'Core architecture for hierarchical agent supervisor networks.' },
      { skill: 'Tool Calling & Schema Guardrails', current: 'Intermediate', target: 'Advanced', priority: 'HIGH', impact: '+7.5% Market Alignment', reason: 'Strict JSON-mode validation preventing hallucinations.' },
      { skill: 'Distributed Memory Stores', current: 'None', target: 'Intermediate', priority: 'MEDIUM', impact: '+5.0% Market Alignment', reason: 'Persistent thread checkpoints and Redis vector state.' }
    ],
    'MLOps Specialist': [
      { skill: 'Kubernetes Inference Clusters', current: 'None', target: 'Intermediate', priority: 'HIGH', impact: '+8.5% Market Alignment', reason: 'Horizontal pod autoscaling based on GPU utilization.' },
      { skill: 'CI/CD Model Registries (MLflow)', current: 'Beginner', target: 'Intermediate', priority: 'HIGH', impact: '+6.5% Market Alignment', reason: 'Automated evaluation pipelines on GitHub PRs.' },
      { skill: 'Prometheus & Drift Monitoring', current: 'None', target: 'Intermediate', priority: 'MEDIUM', impact: '+5.0% Market Alignment', reason: 'Continuous data drift and latency anomaly alerts.' }
    ]
  };

  // Section 3: Skill Transfer Bridges Data
  const transferBridges = [
    {
      sourceSkill: 'Python Backend (FastAPI)',
      targetDomain: 'Autonomous AI Agents',
      transferScore: '86% Transferable',
      reusedConcepts: ['Async event loops', 'Pydantic schemas', 'HTTP/WebSocket streaming'],
      remainingToLearn: 'LangGraph state transitions & Tool-calling decorators',
      timeSaved: 'Saved ~3 weeks of foundational learning'
    },
    {
      sourceSkill: 'SQL & Relational Modeling',
      targetDomain: 'Vector & Hybrid Retrieval',
      transferScore: '82% Transferable',
      reusedConcepts: ['Query filtering syntax', 'Index strategies', 'Entity relationship modeling'],
      remainingToLearn: 'Cosine similarity, HNSW graphs, and semantic embeddings',
      timeSaved: 'Saved ~2.5 weeks of data structure ramp-up'
    },
    {
      sourceSkill: 'Software Testing (Pytest)',
      targetDomain: 'LLM Evaluation & Guardrails',
      transferScore: '78% Transferable',
      reusedConcepts: ['Deterministic test suites', 'Assertion frameworks', 'Mocking external dependencies'],
      remainingToLearn: 'Ragas evaluation metrics, BLEU/ROUGE, and hallucination scoring',
      timeSaved: 'Saved ~2 weeks of evaluation setup'
    }
  ];

  return (
    <div style={{ paddingBottom: '100px', position: 'relative', overflow: 'hidden' }}>
      
      {/* Dynamic Ambient Background Illumination */}
      <div 
        style={{
          position: 'absolute',
          top: '-160px',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '850px',
          height: '520px',
          background: 'radial-gradient(circle, var(--accent-violet) 0%, rgba(6, 182, 212, 0.12) 45%, transparent 75%)',
          filter: 'blur(100px)',
          opacity: 0.25,
          pointerEvents: 'none'
        }}
      />

      {/* ==========================================================================
          HERO: SKILLGRAPH AI WITH LIVE ANIMATED NETWORK
          ========================================================================== */}
      <section style={{ position: 'relative', paddingTop: '48px', paddingBottom: '40px', textAlign: 'center' }}>
        <div className="container" style={{ position: 'relative', zIndex: 10 }}>
          
          {/* Identity Tag */}
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', marginBottom: '18px' }}>
            <span className="shimmer-badge">
              <Activity size={13} style={{ marginRight: '4px' }} />
              SKILLGRAPH AI
            </span>
            <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)', fontWeight: 600 }}>
              Living Career Intelligence System
            </span>
          </div>

          {/* Punchy Concise Statement */}
          <h1 style={{ 
            fontSize: 'clamp(2.4rem, 5.2vw, 4.2rem)', 
            lineHeight: 1.1, 
            maxWidth: '960px', 
            margin: '0 auto 16px',
            letterSpacing: '-0.035em',
            fontWeight: 800
          }}>
            Understand Your True Capability. <br />
            <span className="text-gradient">Continuously Determine Your Next Best Move.</span>
          </h1>

          <p style={{ 
            fontSize: 'clamp(1rem, 1.3vw, 1.15rem)', 
            color: 'var(--text-secondary)', 
            maxWidth: '680px', 
            margin: '0 auto 28px',
            lineHeight: 1.55
          }}>
            SkillGraph AI connects real project evidence, benchmarks target careers, reveals high-confidence transferable bridges, and recalibrates your roadmap with every step.
          </p>

          {/* Action CTAs */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '14px', flexWrap: 'wrap', marginBottom: '40px' }}>
            <button 
              onClick={onStartOnboarding} 
              className="btn-primary" 
              style={{ fontSize: '1rem', padding: '13px 28px', borderRadius: '12px' }}
              id="hero-create-skillgraph-btn"
            >
              <Sparkles size={16} />
              <span>Create Your SkillGraph</span>
              <ArrowRight size={17} />
            </button>

            <button 
              onClick={onTryDemo} 
              className="btn-demo" 
              style={{ fontSize: '0.96rem', padding: '13px 24px', borderRadius: '12px' }}
              id="hero-demo-launch-btn"
            >
              <Play size={14} fill="currentColor" />
              <span>Launch Live Intelligence Cockpit</span>
            </button>
          </div>

          {/* ==========================================================================
              LIVE ANIMATED REPRESENTATION OF THE SKILLGRAPH
              Career Target -> Skill Network -> Current Capability -> Skill Gaps -> Next Action
              ========================================================================== */}
          <div 
            className="anim-card-glow"
            style={{
              maxWidth: '940px',
              margin: '0 auto',
              padding: '24px 28px',
              textAlign: 'left',
              border: '1.5px solid var(--card-border-hover)',
              background: 'linear-gradient(180deg, rgba(14, 18, 28, 0.95) 0%, rgba(9, 12, 20, 0.98) 100%)'
            }}
          >
            {/* Top Interactive Status */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '10px', marginBottom: '20px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span className="live-pulse"></span>
                <span style={{ fontSize: '0.72rem', textTransform: 'uppercase', letterSpacing: '0.06em', color: 'var(--accent-cyan)', fontWeight: 700 }}>
                  Live Interactive SkillGraph Stream
                </span>
              </div>
              <span style={{ fontSize: '0.75rem', color: 'var(--text-dim)' }}>
                Hover or click nodes to inspect active state
              </span>
            </div>

            {/* Visual Connected Network Flow */}
            <div style={{ 
              display: 'grid', 
              gridTemplateColumns: 'repeat(5, 1fr)', 
              gap: '12px', 
              position: 'relative',
              alignItems: 'stretch'
            }}>
              
              {/* Node 1: Career Target */}
              <div 
                onClick={() => setActiveHeroNode('target')}
                style={{
                  background: activeHeroNode === 'target' ? 'rgba(139, 92, 246, 0.2)' : 'rgba(255, 255, 255, 0.03)',
                  border: activeHeroNode === 'target' ? '1.5px solid var(--accent-violet)' : '1px solid rgba(255, 255, 255, 0.08)',
                  borderRadius: '12px',
                  padding: '14px',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  boxShadow: activeHeroNode === 'target' ? '0 0 20px rgba(139, 92, 246, 0.3)' : 'none'
                }}
              >
                <div style={{ fontSize: '0.68rem', color: 'var(--accent-violet)', fontWeight: 700, textTransform: 'uppercase', marginBottom: '4px' }}>
                  1. Target Goal
                </div>
                <div style={{ fontSize: '0.92rem', fontWeight: 800, color: '#ffffff', marginBottom: '4px' }}>
                  AI Engineer
                </div>
                <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>
                  13 Benchmark Requirements
                </div>
              </div>

              {/* Node 2: Skill Network */}
              <div 
                onClick={() => setActiveHeroNode('network')}
                style={{
                  background: activeHeroNode === 'network' ? 'rgba(56, 189, 248, 0.2)' : 'rgba(255, 255, 255, 0.03)',
                  border: activeHeroNode === 'network' ? '1.5px solid #38bdf8' : '1px solid rgba(255, 255, 255, 0.08)',
                  borderRadius: '12px',
                  padding: '14px',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  boxShadow: activeHeroNode === 'network' ? '0 0 20px rgba(56, 189, 248, 0.3)' : 'none'
                }}
              >
                <div style={{ fontSize: '0.68rem', color: '#38bdf8', fontWeight: 700, textTransform: 'uppercase', marginBottom: '4px' }}>
                  2. Skill Network
                </div>
                <div style={{ fontSize: '0.92rem', fontWeight: 800, color: '#ffffff', marginBottom: '4px' }}>
                  6 Clustered Nodes
                </div>
                <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>
                  Python, SQL, RAG, ML, APIs
                </div>
              </div>

              {/* Node 3: Current Capability */}
              <div 
                onClick={() => setActiveHeroNode('capability')}
                style={{
                  background: activeHeroNode === 'capability' ? 'rgba(16, 185, 129, 0.2)' : 'rgba(255, 255, 255, 0.03)',
                  border: activeHeroNode === 'capability' ? '1.5px solid #10b981' : '1px solid rgba(255, 255, 255, 0.08)',
                  borderRadius: '12px',
                  padding: '14px',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  boxShadow: activeHeroNode === 'capability' ? '0 0 20px rgba(16, 185, 129, 0.3)' : 'none'
                }}
              >
                <div style={{ fontSize: '0.68rem', color: '#10b981', fontWeight: 700, textTransform: 'uppercase', marginBottom: '4px' }}>
                  3. Capabilities
                </div>
                <div style={{ fontSize: '0.92rem', fontWeight: 800, color: '#ffffff', marginBottom: '4px' }}>
                  Verified Proof
                </div>
                <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>
                  2 Code Repos & Schemas
                </div>
              </div>

              {/* Node 4: Skill Gaps */}
              <div 
                onClick={() => setActiveHeroNode('gaps')}
                style={{
                  background: activeHeroNode === 'gaps' ? 'rgba(244, 63, 94, 0.2)' : 'rgba(255, 255, 255, 0.03)',
                  border: activeHeroNode === 'gaps' ? '1.5px solid #f43f5e' : '1px solid rgba(255, 255, 255, 0.08)',
                  borderRadius: '12px',
                  padding: '14px',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  boxShadow: activeHeroNode === 'gaps' ? '0 0 20px rgba(244, 63, 94, 0.3)' : 'none'
                }}
              >
                <div style={{ fontSize: '0.68rem', color: '#f43f5e', fontWeight: 700, textTransform: 'uppercase', marginBottom: '4px' }}>
                  4. Gaps Identified
                </div>
                <div style={{ fontSize: '0.92rem', fontWeight: 800, color: '#ffffff', marginBottom: '4px' }}>
                  2 Critical Gaps
                </div>
                <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>
                  Docker & Vector Storage
                </div>
              </div>

              {/* Node 5: Next Best Move */}
              <div 
                onClick={() => setActiveHeroNode('next_action')}
                style={{
                  background: activeHeroNode === 'next_action' ? 'rgba(245, 158, 11, 0.25)' : 'rgba(255, 255, 255, 0.03)',
                  border: activeHeroNode === 'next_action' ? '1.5px solid var(--accent-amber)' : '1px solid rgba(255, 255, 255, 0.08)',
                  borderRadius: '12px',
                  padding: '14px',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  boxShadow: activeHeroNode === 'next_action' ? '0 0 25px rgba(245, 158, 11, 0.4)' : 'none'
                }}
              >
                <div style={{ fontSize: '0.68rem', color: 'var(--accent-amber)', fontWeight: 700, textTransform: 'uppercase', marginBottom: '4px' }}>
                  5. Next Action
                </div>
                <div style={{ fontSize: '0.92rem', fontWeight: 800, color: '#fbbf24', marginBottom: '4px' }}>
                  Deploy RAG API
                </div>
                <div style={{ fontSize: '0.72rem', color: '#fde68a' }}>
                  +5.5% Score Recalibration
                </div>
              </div>

            </div>

            {/* Contextual Intelligence Insight Strip for selected node */}
            <div style={{
              marginTop: '16px',
              padding: '12px 18px',
              borderRadius: '8px',
              background: 'rgba(0, 0, 0, 0.4)',
              border: '1px solid rgba(255, 255, 255, 0.08)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              fontSize: '0.82rem',
              color: 'var(--text-secondary)'
            }}>
              <div>
                {activeHeroNode === 'target' && (
                  <span><strong>AI Engineer:</strong> 94% market demand frequency, requiring advanced Python, RAG pipelines, FastAPI services, and containerized deployments.</span>
                )}
                {activeHeroNode === 'network' && (
                  <span><strong>Topological Graph:</strong> Skills are mapped into functional subgraphs with prerequisite dependencies and bridge weights.</span>
                )}
                {activeHeroNode === 'capability' && (
                  <span><strong>Evidence Verification:</strong> Python (Advanced, 92% confidence) and SQL (Intermediate, 85% confidence) verified from user repository commits.</span>
                )}
                {activeHeroNode === 'gaps' && (
                  <span><strong>Critical Gaps:</strong> Containerization (Docker) and Vector Databases are currently blocking 80%+ readiness for target roles.</span>
                )}
                {activeHeroNode === 'next_action' && (
                  <span><strong>Prescribed Next Action:</strong> Building a containerized Chroma/FastAPI microservice directly eliminates both critical gaps simultaneously.</span>
                )}
              </div>
              <button 
                onClick={onStartOnboarding}
                style={{
                  background: 'transparent',
                  border: 'none',
                  color: 'var(--accent-cyan)',
                  fontWeight: 700,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px',
                  whiteSpace: 'nowrap',
                  paddingLeft: '14px'
                }}
              >
                <span>Try In Cockpit</span>
                <ChevronRight size={14} />
              </button>
            </div>

          </div>

        </div>
      </section>

      {/* ==========================================================================
          SECTION 1: "UNDERSTAND YOUR CURRENT CAPABILITY"
          Interactive Skill Network with real evidence inspection
          ========================================================================== */}
      <section className="container" style={{ marginTop: '70px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '32px', alignItems: 'center' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
              <span className="badge badge-emerald">Step 1 • Diagnostic</span>
              <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>Proven Competence</span>
            </div>
            <h2 style={{ fontSize: 'clamp(1.8rem, 3.2vw, 2.4rem)', fontWeight: 800, color: '#ffffff', letterSpacing: '-0.02em', marginBottom: '14px' }}>
              Understand your current capability.
            </h2>
            <p style={{ fontSize: '0.96rem', color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: '22px' }}>
              No generic self-ratings. SkillGraph AI parses your projects and code repositories, assigning confidence metrics backed by verifiable evidence nodes.
            </p>

            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '20px' }}>
              {Object.keys(capabilitySkills).map(sk => (
                <button
                  key={sk}
                  onClick={() => setActiveCapabilitySkill(sk)}
                  style={{
                    background: activeCapabilitySkill === sk ? 'rgba(16, 185, 129, 0.2)' : 'rgba(255, 255, 255, 0.04)',
                    border: activeCapabilitySkill === sk ? '1.5px solid #10b981' : '1px solid rgba(255, 255, 255, 0.08)',
                    color: activeCapabilitySkill === sk ? '#34d399' : 'var(--text-muted)',
                    padding: '8px 16px',
                    borderRadius: '8px',
                    fontSize: '0.84rem',
                    fontWeight: 600,
                    cursor: 'pointer',
                    transition: 'all 0.2s ease'
                  }}
                >
                  {sk}
                </button>
              ))}
            </div>
          </div>

          {/* Interactive Inspection Card */}
          <div className="anim-card-glow" style={{ padding: '26px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
              <div>
                <span className="badge badge-cyan" style={{ marginBottom: '6px' }}>
                  {capabilitySkills[activeCapabilitySkill].category}
                </span>
                <h3 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#ffffff', margin: '4px 0 2px' }}>
                  {activeCapabilitySkill}
                </h3>
                <div style={{ fontSize: '0.82rem', color: '#34d399', fontWeight: 700 }}>
                  Verified Level: {capabilitySkills[activeCapabilitySkill].level}
                </div>
              </div>
              <div style={{ textAlign: 'right' }}>
                <div style={{ fontSize: '1.4rem', fontWeight: 900, color: '#34d399', fontFamily: 'var(--font-mono)' }}>
                  {capabilitySkills[activeCapabilitySkill].confidence}
                </div>
                <div style={{ fontSize: '0.72rem', color: 'var(--text-dim)' }}>
                  Model Confidence
                </div>
              </div>
            </div>

            <p style={{ fontSize: '0.86rem', color: 'var(--text-secondary)', lineHeight: 1.5, marginBottom: '16px' }}>
              {capabilitySkills[activeCapabilitySkill].description}
            </p>

            <div style={{ background: 'rgba(0, 0, 0, 0.3)', borderRadius: '10px', padding: '14px', border: '1px solid rgba(255, 255, 255, 0.06)' }}>
              <div style={{ fontSize: '0.76rem', color: 'var(--text-dim)', textTransform: 'uppercase', fontWeight: 700, marginBottom: '8px' }}>
                Extracted Project Evidence:
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                {capabilitySkills[activeCapabilitySkill].projects.map(proj => (
                  <div key={proj} style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.84rem', color: '#f8fafc' }}>
                    <ShieldCheck size={14} color="#10b981" />
                    <span>{proj}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ==========================================================================
          SECTION 2: "SEE WHAT'S MISSING"
          Skill-gap transitions with role toggle
          ========================================================================== */}
      <section className="container" style={{ marginTop: '90px' }}>
        <div style={{ textAlign: 'center', maxWidth: '720px', margin: '0 auto 36px' }}>
          <span className="badge badge-rose" style={{ marginBottom: '8px' }}>Step 2 • Gap Detection</span>
          <h2 style={{ fontSize: 'clamp(1.8rem, 3.2vw, 2.4rem)', fontWeight: 800, color: '#ffffff', letterSpacing: '-0.02em', marginBottom: '10px' }}>
            See what's missing.
          </h2>
          <p style={{ fontSize: '0.96rem', color: 'var(--text-secondary)', lineHeight: 1.55 }}>
            Real benchmark comparison across verified openings. SkillGraph identifies high-impact gaps with surgical precision.
          </p>

          {/* Role Filter Chips */}
          <div style={{ display: 'flex', justifyContent: 'center', gap: '8px', marginTop: '16px' }}>
            {Object.keys(gapTransitionsByRole).map(role => (
              <button
                key={role}
                onClick={() => setActiveGapRole(role)}
                style={{
                  padding: '7px 16px',
                  borderRadius: '8px',
                  background: activeGapRole === role ? 'rgba(244, 63, 94, 0.2)' : 'rgba(255, 255, 255, 0.04)',
                  border: activeGapRole === role ? '1px solid #f43f5e' : '1px solid rgba(255, 255, 255, 0.08)',
                  color: activeGapRole === role ? '#fda4af' : 'var(--text-muted)',
                  fontSize: '0.82rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                  transition: 'all 0.18s ease'
                }}
              >
                {role}
              </button>
            ))}
          </div>
        </div>

        {/* Gap Transition Rows */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px' }}>
          {gapTransitionsByRole[activeGapRole].map(gap => (
            <div 
              key={gap.skill} 
              className="anim-card-glow" 
              style={{ padding: '20px', borderColor: 'rgba(244, 63, 94, 0.3)' }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                <span className="badge badge-rose" style={{ fontSize: '0.68rem' }}>{gap.priority} PRIORITY GAP</span>
                <span style={{ fontSize: '0.76rem', color: '#f43f5e', fontWeight: 700 }}>{gap.impact}</span>
              </div>
              <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#ffffff', marginBottom: '6px' }}>
                {gap.skill}
              </h3>
              
              {/* Level Transition Pill */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', margin: '10px 0 12px' }}>
                <span style={{ fontSize: '0.74rem', background: 'rgba(255, 255, 255, 0.06)', padding: '2px 8px', borderRadius: '4px', color: 'var(--text-muted)' }}>
                  Current: {gap.current}
                </span>
                <ArrowRight size={13} color="var(--text-dim)" />
                <span style={{ fontSize: '0.74rem', background: 'rgba(244, 63, 94, 0.15)', color: '#fda4af', padding: '2px 8px', borderRadius: '4px', fontWeight: 700 }}>
                  Target: {gap.target}
                </span>
              </div>

              <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', lineHeight: 1.45, margin: 0 }}>
                {gap.reason}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ==========================================================================
          SECTION 3: "FIND WHAT YOU CAN TRANSFER"
          Connected skill mappings showing bridges
          ========================================================================== */}
      <section className="container" style={{ marginTop: '90px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '32px', alignItems: 'center' }}>
          
          {/* Interactive Transfer Bridge Visual */}
          <div className="anim-card-glow" style={{ padding: '26px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
              <span className="badge badge-cyan">Bridge Architecture</span>
              <span style={{ fontSize: '0.86rem', color: '#38bdf8', fontWeight: 800 }}>
                {transferBridges[activeTransferPair].transferScore}
              </span>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '18px' }}>
              <div style={{ background: 'rgba(255, 255, 255, 0.04)', borderRadius: '10px', padding: '12px', flex: 1, textAlign: 'center' }}>
                <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Source Competency</div>
                <div style={{ fontSize: '0.94rem', fontWeight: 700, color: '#f8fafc', marginTop: '2px' }}>
                  {transferBridges[activeTransferPair].sourceSkill}
                </div>
              </div>

              <div style={{ padding: '0 12px', color: '#38bdf8' }}>
                <Workflow size={22} />
              </div>

              <div style={{ background: 'rgba(6, 182, 212, 0.12)', border: '1px solid rgba(6, 182, 212, 0.3)', borderRadius: '10px', padding: '12px', flex: 1, textAlign: 'center' }}>
                <div style={{ fontSize: '0.72rem', color: '#38bdf8', textTransform: 'uppercase' }}>Target Application</div>
                <div style={{ fontSize: '0.94rem', fontWeight: 700, color: '#ffffff', marginTop: '2px' }}>
                  {transferBridges[activeTransferPair].targetDomain}
                </div>
              </div>
            </div>

            <div style={{ background: 'rgba(0, 0, 0, 0.35)', borderRadius: '10px', padding: '14px', marginBottom: '14px' }}>
              <div style={{ fontSize: '0.74rem', color: '#34d399', fontWeight: 700, textTransform: 'uppercase', marginBottom: '6px' }}>
                Directly Reused Concepts:
              </div>
              <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                {transferBridges[activeTransferPair].reusedConcepts.map(c => (
                  <span key={c} style={{ background: 'rgba(16, 185, 129, 0.12)', color: '#34d399', fontSize: '0.74rem', padding: '2px 8px', borderRadius: '4px' }}>
                    {c}
                  </span>
                ))}
              </div>
            </div>

            <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', lineHeight: 1.45 }}>
              <strong style={{ color: '#ffffff' }}>What Remains to Learn:</strong> {transferBridges[activeTransferPair].remainingToLearn}
            </div>

            <div style={{ marginTop: '12px', paddingTop: '10px', borderTop: '1px solid rgba(255, 255, 255, 0.06)', fontSize: '0.76rem', color: '#fbbf24', fontWeight: 600 }}>
              ⚡ {transferBridges[activeTransferPair].timeSaved}
            </div>
          </div>

          {/* Copy description on right */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
              <span className="badge badge-cyan">Step 3 • Bridge Mapping</span>
              <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>Zero Redundancy</span>
            </div>
            <h2 style={{ fontSize: 'clamp(1.8rem, 3.2vw, 2.4rem)', fontWeight: 800, color: '#ffffff', letterSpacing: '-0.02em', marginBottom: '14px' }}>
              Find what you can transfer.
            </h2>
            <p style={{ fontSize: '0.96rem', color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: '22px' }}>
              You don't start from zero when switching careers or targeting advanced AI roles. SkillGraph computes mathematical semantic overlaps to repurpose your existing engineering strengths.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {transferBridges.map((b, idx) => (
                <div 
                  key={b.sourceSkill}
                  onClick={() => setActiveTransferPair(idx)}
                  style={{
                    background: activeTransferPair === idx ? 'rgba(6, 182, 212, 0.15)' : 'rgba(255, 255, 255, 0.03)',
                    border: activeTransferPair === idx ? '1px solid #06b6d4' : '1px solid rgba(255, 255, 255, 0.07)',
                    borderRadius: '10px',
                    padding: '12px 16px',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    transition: 'all 0.18s ease'
                  }}
                >
                  <span style={{ fontSize: '0.86rem', fontWeight: 600, color: activeTransferPair === idx ? '#ffffff' : 'var(--text-secondary)' }}>
                    {b.sourceSkill} → {b.targetDomain}
                  </span>
                  <span style={{ fontSize: '0.78rem', color: '#38bdf8', fontWeight: 700 }}>
                    {b.transferScore}
                  </span>
                </div>
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* ==========================================================================
          SECTION 4: "KNOW YOUR NEXT MOVE"
          Interactive Next Best Move with simulated completion loop
          ========================================================================== */}
      <section className="container" style={{ marginTop: '90px' }}>
        <div style={{ textAlign: 'center', maxWidth: '720px', margin: '0 auto 36px' }}>
          <span className="badge badge-amber" style={{ marginBottom: '8px' }}>Step 4 • Autonomous Action</span>
          <h2 style={{ fontSize: 'clamp(1.8rem, 3.2vw, 2.4rem)', fontWeight: 800, color: '#ffffff', letterSpacing: '-0.02em', marginBottom: '10px' }}>
            Know your next move.
          </h2>
          <p style={{ fontSize: '0.96rem', color: 'var(--text-secondary)', lineHeight: 1.55 }}>
            No paralyzing lists of 40 courses. SkillGraph AI prescribes exactly one highest-ROI milestone quest to unlock readiness.
          </p>
        </div>

        <div style={{ maxWidth: '820px', margin: '0 auto' }}>
          <div className="quest-interactive-card">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '14px', marginBottom: '14px' }}>
              <div>
                <span className="shimmer-badge" style={{ marginBottom: '8px' }}>
                  <Flame size={13} style={{ marginRight: '4px' }} />
                  {isSimulatedCompleted ? 'Completed Quest • Recalibrating Graph' : 'Active Milestone Sprint • +5.5% Readiness Boost'}
                </span>
                <h3 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#ffffff', margin: '6px 0 4px' }}>
                  Containerize RAG Microservice & Deploy Vector Cache
                </h3>
                <div style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>
                  Estimated effort: 3-4 days • Closes Docker & Vector DB gaps simultaneously
                </div>
              </div>

              <button
                onClick={() => setIsSimulatedCompleted(!isSimulatedCompleted)}
                style={{
                  background: isSimulatedCompleted ? '#10b981' : 'var(--gradient-amber)',
                  color: '#ffffff',
                  border: 'none',
                  borderRadius: '10px',
                  padding: '10px 20px',
                  fontSize: '0.88rem',
                  fontWeight: 700,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  boxShadow: '0 4px 15px rgba(245, 158, 11, 0.35)',
                  transition: 'all 0.2s ease'
                }}
              >
                {isSimulatedCompleted ? (
                  <>
                    <CheckCircle2 size={16} />
                    <span>Completed! Reset</span>
                  </>
                ) : (
                  <>
                    <Zap size={16} />
                    <span>Simulate Complete</span>
                  </>
                )}
              </button>
            </div>

            {/* Checklist of deliverables */}
            <div style={{ background: 'rgba(0, 0, 0, 0.35)', borderRadius: '10px', padding: '16px', border: '1px solid rgba(255, 255, 255, 0.06)' }}>
              <div style={{ fontSize: '0.76rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 700, marginBottom: '10px' }}>
                Required Code Deliverables:
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '8px' }}>
                {[
                  { text: 'Multi-stage Dockerfile for FastAPI + UV', done: isSimulatedCompleted },
                  { text: 'ChromaDB persistent collection volume mount', done: isSimulatedCompleted },
                  { text: 'Semantic similarity test assertion suite', done: isSimulatedCompleted }
                ].map(item => (
                  <div key={item.text} style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.82rem', color: item.done ? '#34d399' : 'var(--text-secondary)' }}>
                    <div style={{
                      width: '18px',
                      height: '18px',
                      borderRadius: '50%',
                      background: item.done ? '#10b981' : 'rgba(255, 255, 255, 0.1)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: '#ffffff'
                    }}>
                      {item.done ? <Check size={11} /> : null}
                    </div>
                    <span>{item.text}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Feedback Loop Explanation */}
            {isSimulatedCompleted && (
              <div style={{
                marginTop: '16px',
                padding: '12px 16px',
                background: 'rgba(16, 185, 129, 0.12)',
                border: '1px solid rgba(16, 185, 129, 0.3)',
                borderRadius: '8px',
                fontSize: '0.82rem',
                color: '#34d399',
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}>
                <Sparkles size={16} />
                <span>
                  <strong>Autonomous Loop Triggered:</strong> Deliverables verified → Docker gap eliminated → Overall alignment score boosted to 78% → Next action updated to Multi-Agent State Machines.
                </span>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ==========================================================================
          SECTION 5: "WATCH YOUR SKILLGRAPH EVOLVE"
          Before / After skill evolution comparison
          ========================================================================== */}
      <section className="container" style={{ marginTop: '90px' }}>
        <div style={{ textAlign: 'center', maxWidth: '720px', margin: '0 auto 36px' }}>
          <span className="badge badge-violet" style={{ marginBottom: '8px' }}>Step 5 • Continuous Evolution</span>
          <h2 style={{ fontSize: 'clamp(1.8rem, 3.2vw, 2.4rem)', fontWeight: 800, color: '#ffffff', letterSpacing: '-0.02em', marginBottom: '10px' }}>
            Watch your SkillGraph evolve.
          </h2>
          <p style={{ fontSize: '0.96rem', color: 'var(--text-secondary)', lineHeight: 1.55 }}>
            See how your career trajectory moves from baseline potential to enterprise production readiness.
          </p>

          {/* Before / After toggle */}
          <div style={{ display: 'inline-flex', background: 'rgba(255, 255, 255, 0.05)', padding: '4px', borderRadius: '10px', marginTop: '14px', border: '1px solid rgba(255, 255, 255, 0.08)' }}>
            <button
              onClick={() => setEvolutionStage('before')}
              style={{
                background: evolutionStage === 'before' ? 'rgba(255, 255, 255, 0.15)' : 'transparent',
                color: evolutionStage === 'before' ? '#ffffff' : 'var(--text-muted)',
                border: 'none',
                borderRadius: '8px',
                padding: '6px 18px',
                fontSize: '0.82rem',
                fontWeight: 600,
                cursor: 'pointer'
              }}
            >
              Initial Baseline
            </button>
            <button
              onClick={() => setEvolutionStage('after')}
              style={{
                background: evolutionStage === 'after' ? 'var(--accent-violet)' : 'transparent',
                color: '#ffffff',
                border: 'none',
                borderRadius: '8px',
                padding: '6px 18px',
                fontSize: '0.82rem',
                fontWeight: 600,
                cursor: 'pointer'
              }}
            >
              After 3 Sprints (Production Ready)
            </button>
          </div>
        </div>

        {/* Evolution Comparison Matrix */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '20px' }}>
          
          <div className="anim-card-glow" style={{ padding: '22px' }}>
            <div style={{ fontSize: '0.74rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 700 }}>
              Career Readiness Index
            </div>
            <div style={{ fontSize: '2.4rem', fontWeight: 900, color: evolutionStage === 'after' ? '#10b981' : '#f59e0b', fontFamily: 'var(--font-mono)', margin: '6px 0' }}>
              {evolutionStage === 'after' ? '82%' : '48%'}
            </div>
            <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', margin: 0 }}>
              {evolutionStage === 'after' ? 'Matches competitive mid-level AI Engineer criteria.' : 'Baseline student profile with unverified gaps.'}
            </p>
          </div>

          <div className="anim-card-glow" style={{ padding: '22px' }}>
            <div style={{ fontSize: '0.74rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 700 }}>
              Code-Verified Evidence Nodes
            </div>
            <div style={{ fontSize: '2.4rem', fontWeight: 900, color: '#38bdf8', fontFamily: 'var(--font-mono)', margin: '6px 0' }}>
              {evolutionStage === 'after' ? '14 Nodes' : '4 Nodes'}
            </div>
            <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', margin: 0 }}>
              {evolutionStage === 'after' ? 'Dockerfiles, test suites, API contracts, vector indexes.' : 'Basic classroom script files.'}
            </p>
          </div>

          <div className="anim-card-glow" style={{ padding: '22px' }}>
            <div style={{ fontSize: '0.74rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 700 }}>
              High-Priority Gaps Remaining
            </div>
            <div style={{ fontSize: '2.4rem', fontWeight: 900, color: evolutionStage === 'after' ? '#34d399' : '#f43f5e', fontFamily: 'var(--font-mono)', margin: '6px 0' }}>
              {evolutionStage === 'after' ? '0 Critical' : '3 Critical'}
            </div>
            <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', margin: 0 }}>
              {evolutionStage === 'after' ? 'All blocking deployment capabilities verified.' : 'Missing vector DBs, containerization, and async queues.'}
            </p>
          </div>

        </div>
      </section>

      {/* ==========================================================================
          FINAL LAUNCH CTA SECTION
          ========================================================================== */}
      <section className="container" style={{ marginTop: '100px', textAlign: 'center' }}>
        <div 
          className="anim-card-glow" 
          style={{ 
            padding: '50px 24px', 
            background: 'linear-gradient(180deg, rgba(139, 92, 246, 0.12) 0%, rgba(6, 182, 212, 0.06) 100%)',
            borderColor: 'rgba(139, 92, 246, 0.35)',
            maxWidth: '850px',
            margin: '0 auto'
          }}
        >
          <h2 style={{ fontSize: 'clamp(2rem, 3.8vw, 2.8rem)', fontWeight: 800, color: '#ffffff', letterSpacing: '-0.025em', marginBottom: '14px' }}>
            Ready to Build Your Live SkillGraph?
          </h2>
          <p style={{ fontSize: '1.05rem', color: 'var(--text-secondary)', maxWidth: '580px', margin: '0 auto 28px', lineHeight: 1.55 }}>
            Join forward-thinking engineers navigating the AI revolution with verifiable evidence, transferable bridges, and autonomous next best moves.
          </p>

          <div style={{ display: 'flex', justifyContent: 'center', gap: '14px', flexWrap: 'wrap' }}>
            <button 
              onClick={onStartOnboarding} 
              className="btn-primary" 
              style={{ fontSize: '1rem', padding: '14px 32px', borderRadius: '12px' }}
              id="final-create-skillgraph-btn"
            >
              <Sparkles size={16} />
              <span>Create Your SkillGraph Now</span>
              <ArrowRight size={17} />
            </button>
            <button 
              onClick={onTryDemo} 
              className="btn-demo" 
              style={{ fontSize: '0.96rem', padding: '14px 26px', borderRadius: '12px' }}
              id="final-demo-cockpit-btn"
            >
              <Play size={14} fill="currentColor" />
              <span>Explore Live Demo Cockpit</span>
            </button>
          </div>
        </div>
      </section>

    </div>
  );
}
