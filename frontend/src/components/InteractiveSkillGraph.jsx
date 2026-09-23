import React, { useState, useMemo } from 'react';
import { 
  CheckCircle2, 
  AlertTriangle, 
  Sparkles, 
  Zap, 
  ShieldCheck, 
  ExternalLink, 
  X, 
  Filter, 
  ZoomIn, 
  ZoomOut, 
  Maximize2,
  Layers,
  ArrowRight,
  GitBranch,
  Info
} from 'lucide-react';

export default function InteractiveSkillGraph({ 
  skills = [], 
  highPriorityGaps = [], 
  mediumPriorityGaps = [],
  transferableSkills = [],
  targetRole = 'AI Engineer',
  alignmentScore = 68,
  onNodeClick = null
}) {
  const [filterMode, setFilterMode] = useState('ALL'); // 'ALL', 'VERIFIED', 'GAPS', 'TRANSFERABLE'
  const [activeNode, setActiveNode] = useState(null);
  const [hoveredNode, setHoveredNode] = useState(null);
  const [zoomLevel, setZoomLevel] = useState(1);

  // Group verified skills and gaps into standard industry domain clusters
  const domainClusters = useMemo(() => {
    // Standard domain categories based on target role
    let domains = [
      { id: 'foundations', title: 'Core & Languages', color: '#38bdf8' },
      { id: 'ml_ai', title: 'Machine Learning & Models', color: '#818cf8' },
      { id: 'llm_rag', title: 'Generative AI & LLMs', color: '#c084fc' },
      { id: 'deployment_ops', title: 'Production & Systems', color: '#34d399' }
    ];

    if (targetRole.toLowerCase().includes('data analyst')) {
      domains = [
        { id: 'foundations', title: 'Data Querying & SQL', color: '#38bdf8' },
        { id: 'ml_ai', title: 'Statistical Analysis', color: '#818cf8' },
        { id: 'llm_rag', title: 'BI & Visualization', color: '#c084fc' },
        { id: 'deployment_ops', title: 'Data Pipelines & ETL', color: '#34d399' }
      ];
    } else if (targetRole.toLowerCase().includes('full stack') || targetRole.toLowerCase().includes('backend')) {
      domains = [
        { id: 'foundations', title: 'Languages & Runtimes', color: '#38bdf8' },
        { id: 'ml_ai', title: 'APIs & Microservices', color: '#818cf8' },
        { id: 'llm_rag', title: 'Databases & Caching', color: '#c084fc' },
        { id: 'deployment_ops', title: 'DevOps & Cloud', color: '#34d399' }
      ];
    }

    const domainMapping = (name, cat = '') => {
      const lower = (name + ' ' + cat).toLowerCase();
      if (lower.includes('python') || lower.includes('sql') || lower.includes('typescript') || lower.includes('javascript') || lower.includes('git') || lower.includes('c++')) {
        return 'foundations';
      }
      if (lower.includes('rag') || lower.includes('llm') || lower.includes('langchain') || lower.includes('prompt') || lower.includes('vector') || lower.includes('openai') || lower.includes('agent')) {
        return 'llm_rag';
      }
      if (lower.includes('docker') || lower.includes('kubernetes') || lower.includes('ci/cd') || lower.includes('fastapi') || lower.includes('api') || lower.includes('mlops') || lower.includes('aws') || lower.includes('system design')) {
        return 'deployment_ops';
      }
      return 'ml_ai';
    };

    // Build node list
    const nodes = [];
    const verifiedNames = new Set();

    // 1. Verified user skills
    skills.forEach(s => {
      verifiedNames.add(s.name.toLowerCase());
      const dom = domainMapping(s.name, s.category);
      nodes.push({
        id: `skill-${s.name}`,
        name: s.name,
        domainId: dom,
        status: 'VERIFIED',
        level: s.level || 'Intermediate',
        confidence: s.confidence || 0.8,
        evidenceCount: s.evidence ? (Array.isArray(s.evidence) ? s.evidence.length : 1) : 1,
        evidence: s.evidence || ['Profile & Practical Verification'],
        isVerified: true
      });
    });

    // 2. Critical gaps
    highPriorityGaps.forEach(g => {
      const lower = g.skill_name.toLowerCase();
      if (!verifiedNames.has(lower)) {
        const dom = domainMapping(g.skill_name, g.category);
        nodes.push({
          id: `gap-${g.skill_name}`,
          name: g.skill_name,
          domainId: dom,
          status: 'CRITICAL_GAP',
          currentLevel: g.current_level || 'None',
          targetLevel: g.required_level || 'Intermediate',
          reason: g.reason || 'Core industry prerequisite for role',
          isGap: true,
          priority: 'HIGH'
        });
      }
    });

    // 3. Medium gaps
    mediumPriorityGaps.forEach(g => {
      const lower = g.skill_name.toLowerCase();
      if (!verifiedNames.has(lower) && !nodes.some(n => n.name.toLowerCase() === lower)) {
        const dom = domainMapping(g.skill_name, g.category);
        nodes.push({
          id: `medgap-${g.skill_name}`,
          name: g.skill_name,
          domainId: dom,
          status: 'DEVELOPING_GAP',
          currentLevel: g.current_level || 'None',
          targetLevel: g.required_level || 'Intermediate',
          reason: g.reason || 'Secondary competency benchmark',
          isGap: true,
          priority: 'MEDIUM'
        });
      }
    });

    // 4. Transferable skills
    transferableSkills.forEach(t => {
      const targetName = t.target_skill_requirement || t.target_requirement || '';
      if (targetName) {
        const existingNode = nodes.find(n => n.name.toLowerCase() === targetName.toLowerCase());
        if (existingNode) {
          existingNode.isTransferable = true;
          existingNode.transferSource = t.source_skill || t.existing_skill;
          existingNode.transferReason = t.why_it_transfers;
          existingNode.transferSavings = t.effort_reduction_percentage;
        } else {
          const dom = domainMapping(targetName);
          nodes.push({
            id: `transfer-${targetName}`,
            name: targetName,
            domainId: dom,
            status: 'TRANSFERABLE',
            targetLevel: 'Intermediate',
            isTransferable: true,
            transferSource: t.source_skill || t.existing_skill,
            transferReason: t.why_it_transfers,
            transferSavings: t.effort_reduction_percentage
          });
        }
      }
    });

    return { domains, nodes };
  }, [skills, highPriorityGaps, mediumPriorityGaps, transferableSkills, targetRole]);

  // Filter nodes
  const visibleNodes = useMemo(() => {
    return domainClusters.nodes.filter(node => {
      if (filterMode === 'VERIFIED') return node.status === 'VERIFIED';
      if (filterMode === 'GAPS') return node.status === 'CRITICAL_GAP' || node.status === 'DEVELOPING_GAP';
      if (filterMode === 'TRANSFERABLE') return node.isTransferable || node.status === 'TRANSFERABLE';
      return true;
    });
  }, [domainClusters.nodes, filterMode]);

  // Handle node selection
  const handleSelectNode = (node) => {
    setActiveNode(node);
    if (onNodeClick) onNodeClick(node);
  };

  return (
    <div className="glass-panel" style={{ padding: '24px', position: 'relative', overflow: 'hidden' }}>
      
      {/* Graph Toolbar Header */}
      <div style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center', 
        flexWrap: 'wrap', 
        gap: '14px',
        marginBottom: '20px',
        borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
        paddingBottom: '16px'
      }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
            <GitBranch size={18} color="#38bdf8" />
            <h3 style={{ fontSize: '1.2rem', fontWeight: 700, color: '#f8fafc', letterSpacing: '-0.02em' }}>
              Interactive SkillGraph & Dependency Network
            </h3>
            <span style={{ 
              fontSize: '0.72rem', 
              background: 'rgba(56, 189, 248, 0.12)', 
              color: '#38bdf8', 
              border: '1px solid rgba(56, 189, 248, 0.3)',
              borderRadius: '9999px',
              padding: '2px 8px',
              fontWeight: 600
            }}>
              {visibleNodes.length} Active Nodes
            </span>
          </div>
          <p style={{ fontSize: '0.84rem', color: '#94a3b8' }}>
            Target architecture for <strong style={{ color: '#ffffff' }}>{targetRole}</strong> mapped into verified competencies, critical gaps, and transferable bridges.
          </p>
        </div>

        {/* Filter Chips & Zoom Controls */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
          <div style={{ display: 'flex', gap: '4px', background: 'rgba(0, 0, 0, 0.3)', padding: '3px', borderRadius: '8px', border: '1px solid rgba(255, 255, 255, 0.08)' }}>
            {[
              { id: 'ALL', label: 'All Nodes' },
              { id: 'VERIFIED', label: 'Verified (Green)' },
              { id: 'GAPS', label: 'Gaps (Red)' },
              { id: 'TRANSFERABLE', label: 'Transferable (Cyan)' }
            ].map(btn => (
              <button
                key={btn.id}
                onClick={() => setFilterMode(btn.id)}
                style={{
                  background: filterMode === btn.id ? 'rgba(255, 255, 255, 0.12)' : 'transparent',
                  color: filterMode === btn.id ? '#ffffff' : '#94a3b8',
                  border: 'none',
                  padding: '4px 10px',
                  borderRadius: '6px',
                  fontSize: '0.76rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                  transition: 'all 0.15s'
                }}
              >
                {btn.label}
              </button>
            ))}
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
            <button
              onClick={() => setZoomLevel(prev => Math.min(1.3, prev + 0.1))}
              className="btn-secondary"
              style={{ padding: '6px', minWidth: '32px', height: '32px' }}
              title="Zoom In"
            >
              <ZoomIn size={14} />
            </button>
            <button
              onClick={() => setZoomLevel(prev => Math.max(0.7, prev - 0.1))}
              className="btn-secondary"
              style={{ padding: '6px', minWidth: '32px', height: '32px' }}
              title="Zoom Out"
            >
              <ZoomOut size={14} />
            </button>
            <button
              onClick={() => setZoomLevel(1)}
              className="btn-secondary"
              style={{ padding: '6px 8px', fontSize: '0.74rem', height: '32px' }}
              title="Reset View"
            >
              Reset
            </button>
          </div>
        </div>
      </div>

      {/* Main Visual Network Diagram Canvas */}
      <div 
        style={{
          position: 'relative',
          background: 'radial-gradient(ellipse at 50% 20%, rgba(15, 23, 42, 0.8) 0%, rgba(8, 11, 17, 0.95) 100%)',
          borderRadius: '12px',
          border: '1px solid rgba(255, 255, 255, 0.08)',
          minHeight: '440px',
          overflow: 'hidden',
          padding: '24px 16px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          transform: `scale(${zoomLevel})`,
          transformOrigin: 'top center',
          transition: 'transform 0.2s ease'
        }}
      >
        {/* Subtle Network Grid Background */}
        <div 
          style={{
            position: 'absolute',
            inset: 0,
            backgroundImage: 'radial-gradient(rgba(255, 255, 255, 0.06) 1px, transparent 1px)',
            backgroundSize: '24px 24px',
            opacity: 0.6,
            pointerEvents: 'none'
          }}
        />

        {/* 1. TOP APEX NODE: TARGET CAREER */}
        <div style={{ position: 'relative', zIndex: 10, marginBottom: '32px' }}>
          <div 
            onClick={() => setActiveNode({
              name: targetRole,
              status: 'CAREER_TARGET',
              alignment: alignmentScore,
              description: `Target benchmark destination. Functional profile readiness is currently ${alignmentScore}%.`
            })}
            style={{
              background: 'linear-gradient(135deg, rgba(37, 99, 235, 0.2) 0%, rgba(79, 70, 229, 0.25) 100%)',
              border: '2px solid rgba(96, 165, 250, 0.6)',
              borderRadius: '14px',
              padding: '12px 24px',
              textAlign: 'center',
              boxShadow: '0 0 28px rgba(59, 130, 246, 0.3)',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
              backdropFilter: 'blur(8px)'
            }}
          >
            <div style={{ fontSize: '0.72rem', color: '#93c5fd', textTransform: 'uppercase', letterSpacing: '0.06em', fontWeight: 700, marginBottom: '2px' }}>
              Target Career Benchmark
            </div>
            <div style={{ fontSize: '1.25rem', fontWeight: 800, color: '#ffffff' }}>
              {targetRole}
            </div>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', marginTop: '6px', fontSize: '0.76rem', color: '#6ee7b7' }}>
              <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#10b981' }}></span>
              <span>{alignmentScore}% Functional Match</span>
            </div>
          </div>
        </div>

        {/* 2. CLUSTER DOMAINS & SKILL NODES */}
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: `repeat(${domainClusters.domains.length}, minmax(180px, 1fr))`, 
          gap: '20px', 
          width: '100%', 
          maxWidth: '1100px',
          position: 'relative',
          zIndex: 10
        }}>
          {domainClusters.domains.map((domain) => {
            const domainNodes = visibleNodes.filter(n => n.domainId === domain.id);

            return (
              <div 
                key={domain.id}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '12px',
                  background: 'rgba(255, 255, 255, 0.02)',
                  border: '1px solid rgba(255, 255, 255, 0.06)',
                  borderRadius: '12px',
                  padding: '14px 12px',
                  position: 'relative'
                }}
              >
                {/* Domain Header Pill */}
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  paddingBottom: '8px',
                  borderBottom: '1px solid rgba(255, 255, 255, 0.06)'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: domain.color }} />
                    <span style={{ fontSize: '0.8rem', fontWeight: 700, color: '#f1f5f9' }}>
                      {domain.title}
                    </span>
                  </div>
                  <span style={{ fontSize: '0.7rem', color: '#64748b', fontFamily: 'var(--font-mono)' }}>
                    {domainNodes.length}
                  </span>
                </div>

                {/* Nodes inside this Domain */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', minHeight: '120px' }}>
                  {domainNodes.length === 0 ? (
                    <div style={{ padding: '24px 0', textAlign: 'center', color: '#64748b', fontSize: '0.74rem' }}>
                      No nodes active in filter
                    </div>
                  ) : (
                    domainNodes.map(node => {
                      const isVerified = node.status === 'VERIFIED';
                      const isCriticalGap = node.status === 'CRITICAL_GAP';
                      const isDevelopingGap = node.status === 'DEVELOPING_GAP';
                      const isTransferable = node.isTransferable || node.status === 'TRANSFERABLE';
                      const isSelected = activeNode?.name === node.name;

                      // Visual styling based on state
                      let borderColor = 'rgba(255, 255, 255, 0.12)';
                      let bgColor = 'rgba(255, 255, 255, 0.03)';
                      let tagColor = '#94a3b8';
                      let icon = null;

                      if (isVerified) {
                        borderColor = 'rgba(16, 185, 129, 0.4)';
                        bgColor = 'rgba(16, 185, 129, 0.08)';
                        tagColor = '#34d399';
                        icon = <CheckCircle2 size={13} color="#10b981" />;
                      } else if (isCriticalGap) {
                        borderColor = 'rgba(244, 63, 94, 0.45)';
                        bgColor = 'rgba(244, 63, 94, 0.08)';
                        tagColor = '#fda4af';
                        icon = <AlertTriangle size={13} color="#f43f5e" />;
                      } else if (isDevelopingGap) {
                        borderColor = 'rgba(245, 158, 11, 0.4)';
                        bgColor = 'rgba(245, 158, 11, 0.08)';
                        tagColor = '#fcd34d';
                        icon = <Info size={13} color="#f59e0b" />;
                      } else if (isTransferable) {
                        borderColor = 'rgba(6, 182, 212, 0.45)';
                        bgColor = 'rgba(6, 182, 212, 0.08)';
                        tagColor = '#38bdf8';
                        icon = <Zap size={13} color="#06b6d4" />;
                      }

                      return (
                        <div
                          key={node.id}
                          onClick={() => handleSelectNode(node)}
                          onMouseEnter={() => setHoveredNode(node)}
                          onMouseLeave={() => setHoveredNode(null)}
                          style={{
                            padding: '9px 12px',
                            borderRadius: '8px',
                            background: isSelected ? 'rgba(56, 189, 248, 0.15)' : bgColor,
                            border: isSelected ? '1.5px solid #38bdf8' : `1px solid ${borderColor}`,
                            borderStyle: (isCriticalGap || isDevelopingGap) ? 'dashed' : 'solid',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            transition: 'all 0.16s ease',
                            boxShadow: isSelected ? '0 0 16px rgba(56, 189, 248, 0.25)' : 'none'
                          }}
                        >
                          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            {icon}
                            <div>
                              <div style={{ fontSize: '0.84rem', fontWeight: 600, color: '#f8fafc', lineHeight: 1.1 }}>
                                {node.name}
                              </div>
                              <div style={{ fontSize: '0.68rem', color: tagColor, marginTop: '2px' }}>
                                {isVerified ? `Level: ${node.level}` : (isCriticalGap ? 'Critical Gap' : (isTransferable ? 'Transferable Bridge' : 'Developing'))}
                              </div>
                            </div>
                          </div>

                          {/* Quick Badge */}
                          {isVerified && (
                            <span style={{ fontSize: '0.66rem', color: '#10b981', background: 'rgba(16, 185, 129, 0.12)', padding: '2px 6px', borderRadius: '4px', fontWeight: 700 }}>
                              ✓ Proven
                            </span>
                          )}
                          {isCriticalGap && (
                            <span style={{ fontSize: '0.66rem', color: '#f43f5e', background: 'rgba(244, 63, 94, 0.12)', padding: '2px 6px', borderRadius: '4px', fontWeight: 700 }}>
                              Gap
                            </span>
                          )}
                          {isTransferable && (
                            <span style={{ fontSize: '0.66rem', color: '#38bdf8', background: 'rgba(6, 182, 212, 0.12)', padding: '2px 6px', borderRadius: '4px', fontWeight: 700 }}>
                              Bridge
                            </span>
                          )}
                        </div>
                      );
                    })
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Legend strip at bottom */}
        <div style={{ 
          marginTop: '24px', 
          display: 'flex', 
          alignItems: 'center', 
          gap: '16px', 
          flexWrap: 'wrap', 
          fontSize: '0.74rem', 
          color: '#94a3b8',
          position: 'relative',
          zIndex: 10
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#10b981' }} />
            <span>Verified Current Skill</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#f43f5e', border: '1px dashed #f43f5e' }} />
            <span>Critical Target Gap</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#06b6d4' }} />
            <span>Transferable Knowledge Bridge</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#f59e0b' }} />
            <span>Secondary In-Progress</span>
          </div>
        </div>
      </div>

      {/* 3. SLIDE-OUT NODE INSPECTOR PANEL */}
      {activeNode && (
        <div 
          style={{
            position: 'absolute',
            top: '80px',
            right: '24px',
            width: '340px',
            background: 'rgba(15, 23, 42, 0.98)',
            border: '1px solid rgba(56, 189, 248, 0.3)',
            borderRadius: '12px',
            boxShadow: '0 12px 36px rgba(0, 0, 0, 0.6)',
            padding: '20px',
            zIndex: 100,
            backdropFilter: 'blur(16px)',
            animation: 'fadeIn 0.18s ease'
          }}
        >
          {/* Header */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '14px' }}>
            <div>
              <span style={{ 
                fontSize: '0.68rem', 
                textTransform: 'uppercase', 
                letterSpacing: '0.05em', 
                color: activeNode.status === 'VERIFIED' ? '#34d399' : (activeNode.status === 'CRITICAL_GAP' ? '#f43f5e' : '#38bdf8'),
                fontWeight: 700 
              }}>
                {activeNode.status} NODE
              </span>
              <h4 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#ffffff', marginTop: '2px' }}>
                {activeNode.name}
              </h4>
            </div>
            <button
              onClick={() => setActiveNode(null)}
              style={{ background: 'transparent', border: 'none', color: '#94a3b8', cursor: 'pointer' }}
            >
              <X size={18} />
            </button>
          </div>

          {/* Contextual Panel: WHY, WHAT, HOW, NEXT */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', fontSize: '0.82rem' }}>
            
            {/* 1. WHY */}
            <div style={{ background: 'rgba(255, 255, 255, 0.03)', borderRadius: '8px', padding: '10px 12px', borderLeft: '3px solid var(--accent-cyan)' }}>
              <div style={{ fontSize: '0.7rem', color: 'var(--accent-cyan)', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.04em', marginBottom: '3px' }}>
                1. WHY (Role Strategic Relevance)
              </div>
              <div style={{ color: 'var(--text-secondary)', lineHeight: 1.45, fontSize: '0.8rem' }}>
                {activeNode.status === 'VERIFIED' && `Crucial pillar for ${targetRole}. Evaluated as a proven capability with high production utility.`}
                {(activeNode.status === 'CRITICAL_GAP' || activeNode.status === 'DEVELOPING_GAP') && (activeNode.reason || `Essential market requirement for ${targetRole} to clear technical screening benchmarks.`)}
                {activeNode.isTransferable && `High-value transferable asset. Accelerates mastery of adjacent requirements without starting from scratch.`}
              </div>
            </div>

            {/* 2. WHAT */}
            <div style={{ background: 'rgba(255, 255, 255, 0.03)', borderRadius: '8px', padding: '10px 12px', borderLeft: '3px solid var(--accent-violet)' }}>
              <div style={{ fontSize: '0.7rem', color: 'var(--accent-violet)', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.04em', marginBottom: '6px' }}>
                2. WHAT (Level & Gap Assessment)
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', marginBottom: '6px' }}>
                <div style={{ background: 'rgba(0,0,0,0.25)', padding: '6px 8px', borderRadius: '6px' }}>
                  <div style={{ fontSize: '0.68rem', color: 'var(--text-muted)' }}>Current Level</div>
                  <div style={{ fontWeight: 700, color: activeNode.status === 'VERIFIED' ? '#34d399' : '#f43f5e' }}>
                    {activeNode.level || activeNode.currentLevel || 'None'}
                  </div>
                </div>
                <div style={{ background: 'rgba(0,0,0,0.25)', padding: '6px 8px', borderRadius: '6px' }}>
                  <div style={{ fontSize: '0.68rem', color: 'var(--text-muted)' }}>Target Benchmark</div>
                  <div style={{ fontWeight: 700, color: '#38bdf8' }}>
                    {activeNode.targetLevel || 'Intermediate / Adv'}
                  </div>
                </div>
              </div>
              <div style={{ fontSize: '0.76rem', color: activeNode.status === 'VERIFIED' ? '#34d399' : '#fbbf24', fontWeight: 600 }}>
                {activeNode.status === 'VERIFIED' ? '✓ Target Level Satisfied (Verified)' : '⚠ 1-2 Level Gap to Bridge'}
              </div>
            </div>

            {/* 3. HOW */}
            <div style={{ background: 'rgba(255, 255, 255, 0.03)', borderRadius: '8px', padding: '10px 12px', borderLeft: '3px solid #10b981' }}>
              <div style={{ fontSize: '0.7rem', color: '#10b981', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.04em', marginBottom: '6px' }}>
                3. HOW (Evidence & Provenance)
              </div>
              {activeNode.status === 'VERIFIED' ? (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                  {(Array.isArray(activeNode.evidence) ? activeNode.evidence : [activeNode.evidence]).map((ev, i) => (
                    <div key={i} style={{ padding: '5px 8px', background: 'rgba(16, 185, 129, 0.08)', borderRadius: '4px', color: '#d1fae5', fontSize: '0.75rem' }}>
                      ✓ {typeof ev === 'string' ? ev : (ev.title || 'Verified Artifact')}
                    </div>
                  ))}
                  <div style={{ fontSize: '0.72rem', color: 'var(--text-dim)', marginTop: '2px' }}>
                    Confidence Score: {Math.round((activeNode.confidence || 0.8) * 100)}%
                  </div>
                </div>
              ) : activeNode.isTransferable ? (
                <div style={{ fontSize: '0.76rem', color: '#bae6fd', lineHeight: 1.4 }}>
                  Bridges from <strong>{activeNode.transferSource}</strong> saving ~{activeNode.transferSavings || '50%'} ramp-up time.
                </div>
              ) : (
                <div style={{ fontSize: '0.76rem', color: 'var(--text-muted)' }}>
                  No verified commits or repo artifacts logged yet.
                </div>
              )}
            </div>

            {/* 4. NEXT */}
            <div style={{ background: 'rgba(255, 255, 255, 0.03)', borderRadius: '8px', padding: '10px 12px', borderLeft: '3px solid var(--accent-amber)' }}>
              <div style={{ fontSize: '0.7rem', color: 'var(--accent-amber)', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.04em', marginBottom: '4px' }}>
                4. NEXT (Recommended Action)
              </div>
              <div style={{ color: '#f8fafc', fontSize: '0.78rem', lineHeight: 1.45, marginBottom: '8px' }}>
                {activeNode.status === 'VERIFIED' 
                  ? `Integrate ${activeNode.name} into end-to-end portfolio architecture to maintain high confidence.`
                  : `Implement hands-on practical deliverable closing the ${activeNode.name} gap.`}
              </div>
              <button
                onClick={() => {
                  alert(`[Simulated Action] Leveling up ${activeNode.name} would boost your ${targetRole} readiness by +6.5%!`);
                }}
                className="btn-primary"
                style={{
                  width: '100%',
                  padding: '7px 12px',
                  fontSize: '0.78rem',
                  borderRadius: '6px',
                  background: 'linear-gradient(135deg, var(--accent-amber) 0%, var(--accent-violet) 100%)',
                  boxShadow: '0 2px 10px rgba(245, 158, 11, 0.25)'
                }}
              >
                <Zap size={13} />
                <span>Simulate Progression for {activeNode.name}</span>
              </button>
            </div>

          </div>
        </div>
      )}
    </div>
  );
}
