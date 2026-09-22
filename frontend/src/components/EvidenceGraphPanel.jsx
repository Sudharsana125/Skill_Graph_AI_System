import React, { useState } from 'react';
import { 
  ShieldCheck, 
  FlaskConical, 
  FileText, 
  ChevronDown, 
  ChevronRight, 
  Search, 
  CheckCircle2, 
  AlertTriangle, 
  ExternalLink,
  Layers,
  Award,
  Filter
} from 'lucide-react';

export default function EvidenceGraphPanel({ evidenceGraph = [] }) {
  const [filterTier, setFilterTier] = useState('ALL');
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedSkills, setExpandedSkills] = useState({});

  const toggleExpand = (skillName) => {
    setExpandedSkills(prev => ({
      ...prev,
      [skillName]: !prev[skillName]
    }));
  };

  const verifiedCount = evidenceGraph.filter(s => s.verification_tier === 'VERIFIED').length;
  const demonstratedCount = evidenceGraph.filter(s => s.verification_tier === 'DEMONSTRATED').length;
  const claimedCount = evidenceGraph.filter(s => s.verification_tier === 'CLAIMED').length;

  const filteredSkills = evidenceGraph.filter(item => {
    const matchesTier = filterTier === 'ALL' || item.verification_tier === filterTier;
    const matchesQuery = item.skill_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         (item.category && item.category.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesTier && matchesQuery;
  });

  return (
    <div>
      {/* Header */}
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
            <span className="badge badge-emerald">
              <ShieldCheck size={13} style={{ marginRight: '5px' }} />
              Verifiable Provenance Graph
            </span>
            <span style={{ fontSize: '0.8rem', color: 'var(--text-dim)' }}>
              {evidenceGraph.length} Total Evaluated Competencies
            </span>
          </div>
          <h2 style={{ fontSize: '1.6rem', fontWeight: 800 }}>
            Skill Evidence Graph & Provenance Audit
          </h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.92rem', maxWidth: '700px' }}>
            Employers and engineering leads do not trust unsubstantiated keyword resumes. SkillTwin AI separates self-reported claims from demonstrated experience and code-verified artifacts with traceable evidence nodes.
          </p>
        </div>

        {/* Verification Tier Summary Card */}
        <div className="glass-panel" style={{ padding: '14px 20px', minWidth: '320px' }}>
          <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em', fontWeight: 600 }}>
            Audit Breakdown
          </span>
          <div style={{ display: 'flex', gap: '16px', marginTop: '8px' }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#10b981' }} />
                <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Verified</span>
              </div>
              <span style={{ fontSize: '1.4rem', fontWeight: 800, fontFamily: 'var(--font-mono)', color: '#10b981' }}>
                {verifiedCount}
              </span>
            </div>

            <div style={{ borderLeft: '1px solid var(--card-border)', paddingLeft: '16px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#06b6d4' }} />
                <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Demonstrated</span>
              </div>
              <span style={{ fontSize: '1.4rem', fontWeight: 800, fontFamily: 'var(--font-mono)', color: '#06b6d4' }}>
                {demonstratedCount}
              </span>
            </div>

            <div style={{ borderLeft: '1px solid var(--card-border)', paddingLeft: '16px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#f59e0b' }} />
                <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Claimed</span>
              </div>
              <span style={{ fontSize: '1.4rem', fontWeight: 800, fontFamily: 'var(--font-mono)', color: '#f59e0b' }}>
                {claimedCount}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Controls Bar: Search & Filters */}
      <div className="glass-panel" style={{ padding: '14px 18px', marginBottom: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
        {/* Tier Filters */}
        <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
          {[
            { key: 'ALL', label: `All (${evidenceGraph.length})` },
            { key: 'VERIFIED', label: `Verified (${verifiedCount})` },
            { key: 'DEMONSTRATED', label: `Demonstrated (${demonstratedCount})` },
            { key: 'CLAIMED', label: `Claimed (${claimedCount})` }
          ].map(tab => (
            <button
              key={tab.key}
              onClick={() => setFilterTier(tab.key)}
              className={`btn-secondary ${filterTier === tab.key ? 'active' : ''}`}
              style={{
                padding: '6px 12px',
                fontSize: '0.8rem',
                borderColor: filterTier === tab.key ? 'var(--accent-secondary)' : 'var(--card-border)',
                background: filterTier === tab.key ? 'rgba(6, 182, 212, 0.15)' : 'rgba(255, 255, 255, 0.03)',
                color: filterTier === tab.key ? '#38bdf8' : 'var(--text-secondary)'
              }}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Search */}
        <div style={{ position: 'relative', width: '220px' }}>
          <Search size={14} color="var(--text-dim)" style={{ position: 'absolute', left: '10px', top: '10px' }} />
          <input 
            type="text"
            placeholder="Search skills..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{
              width: '100%',
              padding: '7px 12px 7px 32px',
              borderRadius: 'var(--radius-xs)',
              background: 'rgba(0, 0, 0, 0.3)',
              border: '1px solid var(--card-border)',
              color: 'var(--text-main)',
              fontSize: '0.82rem'
            }}
          />
        </div>
      </div>

      {/* Skills Grid */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
        {filteredSkills.length === 0 ? (
          <div className="glass-panel" style={{ padding: '36px', textAlign: 'center' }}>
            <p style={{ color: 'var(--text-dim)', fontSize: '0.88rem' }}>
              No skills found matching this criteria.
            </p>
          </div>
        ) : (
          filteredSkills.map((skill, index) => {
            const isVerified = skill.verification_tier === 'VERIFIED';
            const isDemonstrated = skill.verification_tier === 'DEMONSTRATED';
            const strengthPct = Math.round((skill.evidence_strength || 0) * 100);
            const isExpanded = !!expandedSkills[skill.skill_name];

            const tierBadge = isVerified ? {
              cls: 'badge-emerald',
              icon: <ShieldCheck size={12} style={{ marginRight: '4px' }} />,
              text: 'VERIFIED ARTIFACT'
            } : isDemonstrated ? {
              cls: 'badge-cyan',
              icon: <FlaskConical size={12} style={{ marginRight: '4px' }} />,
              text: 'DEMONSTRATED'
            } : {
              cls: 'badge-amber',
              icon: <FileText size={12} style={{ marginRight: '4px' }} />,
              text: 'CLAIMED (UNVERIFIED)'
            };

            const meterColor = isVerified ? '#10b981' : isDemonstrated ? '#06b6d4' : '#f59e0b';

            return (
              <div 
                key={skill.skill_name || index}
                className="glass-panel card-interactive"
                style={{ padding: '18px 22px' }}
              >
                {/* Main Card Header */}
                <div style={{ 
                  display: 'flex', 
                  justifyContent: 'space-between', 
                  alignItems: 'center', 
                  flexWrap: 'wrap', 
                  gap: '12px' 
                }}>
                  {/* Skill Name & Badges */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <div style={{
                      width: '38px',
                      height: '38px',
                      borderRadius: '10px',
                      background: isVerified ? 'rgba(16, 185, 129, 0.15)' : isDemonstrated ? 'rgba(6, 182, 212, 0.15)' : 'rgba(245, 158, 11, 0.12)',
                      border: `1px solid ${meterColor}44`,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: meterColor
                    }}>
                      {isVerified ? <ShieldCheck size={20} /> : isDemonstrated ? <FlaskConical size={20} /> : <FileText size={20} />}
                    </div>

                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '2px' }}>
                        <span style={{ fontSize: '1.05rem', fontWeight: 700, color: 'var(--text-main)' }}>
                          {skill.skill_name}
                        </span>
                        <span className={`badge ${tierBadge.cls}`} style={{ fontSize: '0.68rem', padding: '2px 7px' }}>
                          {tierBadge.icon}
                          {tierBadge.text}
                        </span>
                      </div>
                      <span style={{ fontSize: '0.76rem', color: 'var(--text-dim)' }}>
                        Category: {skill.category || 'Engineering'} • {skill.evidence_sources?.length || 0} Traceable Provenance Node{skill.evidence_sources?.length !== 1 ? 's' : ''}
                      </span>
                    </div>
                  </div>

                  {/* Strength Meter & Expand Button */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                    {/* Strength Gauge */}
                    <div style={{ width: '130px', textAlign: 'right' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
                        <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>Strength</span>
                        <span style={{ fontSize: '0.8rem', fontWeight: 800, fontFamily: 'var(--font-mono)', color: meterColor }}>
                          {strengthPct}%
                        </span>
                      </div>
                      <div className="progress-bar-container" style={{ height: '5px' }}>
                        <div 
                          className="progress-bar-fill" 
                          style={{ width: `${strengthPct}%`, background: meterColor }} 
                        />
                      </div>
                    </div>

                    {/* Expand/Collapse Toggle */}
                    <button
                      onClick={() => toggleExpand(skill.skill_name)}
                      className="btn-secondary"
                      style={{ padding: '6px 12px', fontSize: '0.78rem' }}
                    >
                      <span>Audit Tree</span>
                      {isExpanded ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
                    </button>
                  </div>
                </div>

                {/* Collapsible Evidence Sources Audit Tree */}
                {isExpanded && (
                  <div style={{ 
                    marginTop: '16px', 
                    paddingTop: '16px', 
                    borderTop: '1px solid var(--card-border)',
                    animation: 'fadeIn 0.2s ease'
                  }}>
                    <span style={{ fontSize: '0.74rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.04em', fontWeight: 600, display: 'block', marginBottom: '10px' }}>
                      Traceable Provenance Nodes:
                    </span>

                    {skill.evidence_sources && skill.evidence_sources.length > 0 ? (
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                        {skill.evidence_sources.map((source, sIdx) => {
                          const isArtifact = source.source_type === 'PROJECT_DELIVERABLE' || source.source_type === 'ROADMAP_COMPLETION';
                          return (
                            <div 
                              key={sIdx}
                              style={{ 
                                padding: '10px 14px', 
                                borderRadius: 'var(--radius-xs)', 
                                background: 'rgba(0, 0, 0, 0.25)', 
                                border: '1px solid var(--card-border)',
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                flexWrap: 'wrap',
                                gap: '8px'
                              }}
                            >
                              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                {isArtifact ? (
                                  <CheckCircle2 size={16} color="var(--accent-emerald)" />
                                ) : (
                                  <AlertTriangle size={16} color="var(--accent-amber)" />
                                )}
                                <div>
                                  <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', fontWeight: 600 }}>
                                    {source.description}
                                  </span>
                                  <div style={{ display: 'flex', gap: '8px', fontSize: '0.72rem', color: 'var(--text-dim)', marginTop: '2px' }}>
                                    <span>Type: {source.source_type.replace(/_/g, ' ')}</span>
                                    <span>•</span>
                                    <span>Recorded: {source.date_recorded ? new Date(source.date_recorded).toLocaleDateString() : 'Active'}</span>
                                  </div>
                                </div>
                              </div>

                              <span style={{ 
                                fontSize: '0.72rem', 
                                fontFamily: 'var(--font-mono)', 
                                padding: '2px 7px', 
                                borderRadius: '4px',
                                background: isArtifact ? 'rgba(16, 185, 129, 0.12)' : 'rgba(245, 158, 11, 0.1)',
                                color: isArtifact ? '#34d399' : '#fbbf24',
                                border: `1px solid ${isArtifact ? 'rgba(16, 185, 129, 0.25)' : 'rgba(245, 158, 11, 0.2)'}`
                              }}>
                                {source.verification_status}
                              </span>
                            </div>
                          );
                        })}
                      </div>
                    ) : (
                      <div style={{ padding: '12px', background: 'rgba(0, 0, 0, 0.2)', borderRadius: 'var(--radius-xs)', color: 'var(--text-dim)', fontSize: '0.8rem' }}>
                        No external audit nodes logged for this claim yet. Complete a project milestone to verify.
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
