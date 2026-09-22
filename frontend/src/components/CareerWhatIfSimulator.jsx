import React, { useState, useEffect } from 'react';
import { 
  Compass, 
  Sparkles, 
  ArrowRight, 
  CheckCircle2, 
  AlertCircle, 
  Clock, 
  GitCompare, 
  TrendingUp, 
  RefreshCw,
  Plus,
  Layers,
  ChevronRight
} from 'lucide-react';
import { simulateWhatIf } from '../services/api';

const DEFAULT_CAREERS = [
  'AI Engineer',
  'Data Analyst',
  'Machine Learning Engineer',
  'Data Scientist',
  'Full Stack Developer'
];

export default function CareerWhatIfSimulator({ userId, currentRole }) {
  const [selectedCareers, setSelectedCareers] = useState(DEFAULT_CAREERS.slice(0, 3));
  const [simulationResults, setSimulationResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [customInput, setCustomInput] = useState('');

  const runSimulation = async (careersToTest) => {
    if (!userId) return;
    setIsLoading(true);
    setError(null);
    try {
      const res = await simulateWhatIf(userId, careersToTest);
      setSimulationResults(Array.isArray(res) ? res : (res.results || []));
    } catch (err) {
      console.error('What-If simulation failed:', err);
      setError('Could not run simulator. Verify backend connection.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (userId) {
      runSimulation(selectedCareers);
    }
  }, [userId]);

  const toggleCareer = (career) => {
    let updated;
    if (selectedCareers.includes(career)) {
      if (selectedCareers.length === 1) return;
      updated = selectedCareers.filter(c => c !== career);
    } else {
      if (selectedCareers.length >= 4) {
        updated = [...selectedCareers.slice(1), career];
      } else {
        updated = [...selectedCareers, career];
      }
    }
    setSelectedCareers(updated);
    runSimulation(updated);
  };

  const handleAddCustom = (e) => {
    e.preventDefault();
    const clean = customInput.trim();
    if (!clean) return;
    if (!selectedCareers.includes(clean)) {
      const updated = selectedCareers.length >= 4 ? [...selectedCareers.slice(1), clean] : [...selectedCareers, clean];
      setSelectedCareers(updated);
      runSimulation(updated);
    }
    setCustomInput('');
  };

  return (
    <div>
      {/* Header */}
      <div style={{ marginBottom: '18px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
          <span className="badge badge-cyan">
            <GitCompare size={12} style={{ marginRight: '4px' }} />
            Multi-Track Simulator
          </span>
          <span className="live-pulse"></span>
          <span style={{ fontSize: '0.74rem', color: 'var(--text-dim)' }}>Instant Benchmark</span>
        </div>
        <h2 style={{ fontSize: '1.45rem', fontWeight: 800 }}>
          Career Fit Matrix
        </h2>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.86rem' }}>
          Test your skill match across multiple career tracks simultaneously in real-time.
        </p>
      </div>

      {/* Trajectory Selectors Bar */}
      <div className="glass-panel" style={{ padding: '14px 18px', marginBottom: '20px' }}>
        <div style={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center', 
          flexWrap: 'wrap', 
          gap: '12px' 
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 600, textTransform: 'uppercase' }}>
              Compare Roles:
            </span>
            {DEFAULT_CAREERS.map((career) => {
              const isSelected = selectedCareers.includes(career);
              const isCurrent = currentRole && career.toLowerCase() === currentRole.toLowerCase();
              return (
                <button
                  key={career}
                  onClick={() => toggleCareer(career)}
                  className={`btn-secondary ${isSelected ? 'active' : ''}`}
                  style={{
                    padding: '5px 12px',
                    fontSize: '0.8rem',
                    borderRadius: 'var(--radius-xs)',
                    borderColor: isSelected ? '#3b82f6' : 'var(--card-border)'
                  }}
                >
                  <span>{career}</span>
                  {isCurrent && (
                    <span style={{ fontSize: '0.64rem', padding: '1px 4px', borderRadius: '3px', background: 'rgba(37, 99, 235, 0.3)', color: '#93c5fd', marginLeft: '4px' }}>
                      Current
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          {/* Quick Add Custom */}
          <form onSubmit={handleAddCustom} style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
            <input 
              type="text"
              placeholder="Add role (e.g. MLOps)..."
              value={customInput}
              onChange={(e) => setCustomInput(e.target.value)}
              style={{
                background: 'rgba(0, 0, 0, 0.35)',
                border: '1px solid var(--card-border)',
                borderRadius: 'var(--radius-xs)',
                padding: '6px 10px',
                fontSize: '0.8rem',
                color: 'var(--text-main)',
                width: '160px'
              }}
            />
            <button 
              type="submit" 
              className="btn-secondary" 
              style={{ padding: '6px 10px', fontSize: '0.8rem' }}
              disabled={!customInput.trim() || isLoading}
            >
              <Plus size={13} />
              <span>Add</span>
            </button>
          </form>
        </div>
      </div>

      {/* Simulator Results */}
      {isLoading ? (
        <div className="glass-panel" style={{ padding: '36px', textAlign: 'center' }}>
          <RefreshCw size={24} color="#3b82f6" className="spin-animation" style={{ margin: '0 auto 8px' }} />
          <p style={{ color: 'var(--text-dim)', fontSize: '0.84rem' }}>Calculating benchmark fit...</p>
        </div>
      ) : error ? (
        <div className="glass-panel" style={{ padding: '18px', textAlign: 'center' }}>
          <p style={{ color: '#f87171', fontSize: '0.84rem' }}>{error}</p>
        </div>
      ) : (
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: `repeat(auto-fit, minmax(280px, 1fr))`, 
          gap: '16px' 
        }}>
          {simulationResults.map((item, idx) => {
            const careerName = item.career_role || item.career_title || 'Career Track';
            const criticalGaps = item.missing_critical_gaps || item.critical_gaps || [];
            const isHigh = item.alignment_score >= 70;
            const isMed = item.alignment_score >= 45 && item.alignment_score < 70;
            const scoreColor = isHigh ? '#10b981' : isMed ? '#38bdf8' : '#f87171';
            const feasibilityBadge = isHigh 
              ? { text: 'High Direct Fit', cls: 'badge-emerald' }
              : isMed 
                ? { text: 'Moderate Pivot', cls: 'badge-indigo' }
                : { text: 'Substantial Ramp-Up', cls: 'badge-amber' };

            return (
              <div 
                key={careerName || idx} 
                className="glass-panel card-interactive" 
                style={{ 
                  padding: '20px',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between'
                }}
              >
                <div>
                  {/* Top Bar: Title & Score */}
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
                    <div>
                      <span className={`badge ${feasibilityBadge.cls}`} style={{ marginBottom: '4px' }}>
                        {feasibilityBadge.text}
                      </span>
                      <h3 style={{ fontSize: '1.12rem', fontWeight: 700 }}>
                        {careerName}
                      </h3>
                    </div>

                    <div style={{ textAlign: 'right' }}>
                      <div style={{ fontSize: '1.6rem', fontWeight: 800, fontFamily: 'var(--font-mono)', color: scoreColor, lineHeight: 1 }}>
                        {item.alignment_score}%
                      </div>
                      <span style={{ fontSize: '0.68rem', color: 'var(--text-dim)', textTransform: 'uppercase' }}>
                        Fit Index
                      </span>
                    </div>
                  </div>

                  {/* Progress Bar */}
                  <div className="progress-bar-container" style={{ marginBottom: '14px', height: '5px' }}>
                    <div 
                      className="progress-bar-fill" 
                      style={{ 
                        width: `${item.alignment_score}%`,
                        background: isHigh ? 'var(--gradient-emerald)' : isMed ? 'var(--gradient-primary)' : '#f59e0b' 
                      }} 
                    />
                  </div>

                  {/* Stat Counters */}
                  <div style={{ 
                    display: 'grid', 
                    gridTemplateColumns: '1fr 1fr', 
                    gap: '8px', 
                    padding: '10px', 
                    background: 'rgba(0, 0, 0, 0.25)', 
                    borderRadius: 'var(--radius-xs)',
                    marginBottom: '12px'
                  }}>
                    <div>
                      <span style={{ fontSize: '0.68rem', color: 'var(--text-muted)' }}>Ramp-Up</span>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '4px', marginTop: '2px' }}>
                        <Clock size={12} color="#38bdf8" />
                        <span style={{ fontSize: '0.88rem', fontWeight: 700, fontFamily: 'var(--font-mono)' }}>
                          {item.estimated_timeline_months} Months
                        </span>
                      </div>
                    </div>

                    <div>
                      <span style={{ fontSize: '0.68rem', color: 'var(--text-muted)' }}>Transferable</span>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '4px', marginTop: '2px' }}>
                        <Sparkles size={12} color="#93c5fd" />
                        <span style={{ fontSize: '0.88rem', fontWeight: 700, fontFamily: 'var(--font-mono)' }}>
                          {item.transferable_skills?.length || 0} Skills
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Matching Direct Skills */}
                  <div style={{ marginBottom: '10px' }}>
                    <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.04em', fontWeight: 600 }}>
                      Matching Skills ({item.matching_skills?.length || 0}):
                    </span>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px', marginTop: '4px' }}>
                      {item.matching_skills && item.matching_skills.length > 0 ? (
                        item.matching_skills.slice(0, 4).map((skill, i) => (
                          <span 
                            key={i} 
                            style={{ 
                              fontSize: '0.72rem', 
                              padding: '2px 6px', 
                              borderRadius: 'var(--radius-xs)', 
                              background: 'rgba(16, 185, 129, 0.1)', 
                              border: '1px solid rgba(16, 185, 129, 0.25)',
                              color: '#34d399'
                            }}
                          >
                            ✓ {skill}
                          </span>
                        ))
                      ) : (
                        <span style={{ fontSize: '0.72rem', color: 'var(--text-dim)' }}>None</span>
                      )}
                    </div>
                  </div>

                  {/* Priority Deficits */}
                  <div>
                    <span style={{ fontSize: '0.7rem', color: '#f87171', textTransform: 'uppercase', letterSpacing: '0.04em', fontWeight: 600 }}>
                      Gaps to Target ({criticalGaps.length}):
                    </span>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px', marginTop: '4px' }}>
                      {criticalGaps.length > 0 ? (
                        criticalGaps.slice(0, 3).map((gap, i) => (
                          <span 
                            key={i} 
                            style={{ 
                              fontSize: '0.72rem', 
                              padding: '2px 6px', 
                              borderRadius: 'var(--radius-xs)', 
                              background: 'rgba(239, 68, 68, 0.08)', 
                              border: '1px solid rgba(239, 68, 68, 0.2)',
                              color: '#fca5a5'
                            }}
                          >
                            • {gap}
                          </span>
                        ))
                      ) : (
                        <span style={{ fontSize: '0.72rem', color: 'var(--text-dim)' }}>Zero critical gaps</span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
