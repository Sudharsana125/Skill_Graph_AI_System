import React, { useState, useEffect } from 'react';
import { Search, X, Sparkles, ArrowRight, BookOpen, Briefcase, Zap, ShieldCheck } from 'lucide-react';

export default function CommandPalette({ isOpen, onClose, onSelectAction, onAskAssistant }) {
  const [query, setQuery] = useState('');

  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        onClose ? (!isOpen ? onClose(false) : null) : null;
      }
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const suggestions = [
    {
      title: "What skills am I missing for AI Engineer?",
      category: "Skill Gaps",
      action: () => { onAskAssistant("What skills am I missing for AI Engineer?"); onClose(); }
    },
    {
      title: "What should I learn next?",
      category: "Next Best Move",
      action: () => { onAskAssistant("What should I learn next based on my current SkillGraph?"); onClose(); }
    },
    {
      title: "Why is my Python level Intermediate?",
      category: "Evidence Audit",
      action: () => { onAskAssistant("Why is my Python level evaluated as Intermediate?"); onClose(); }
    },
    {
      title: "What projects would reduce my current skill gaps?",
      category: "Project Recommendation",
      action: () => { onAskAssistant("What projects would reduce my current skill gaps?"); onClose(); }
    },
    {
      title: "What happens if I switch my target to Data Analyst?",
      category: "Career What-If",
      action: () => { onAskAssistant("What happens if I switch my target to Data Analyst?"); onClose(); }
    },
    {
      title: "Inspect Interactive SkillGraph",
      category: "Navigation",
      action: () => { onSelectAction('twin'); onClose(); }
    }
  ];

  const filtered = suggestions.filter(s => 
    s.title.toLowerCase().includes(query.toLowerCase()) || 
    s.category.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="cmd-palette-backdrop" onClick={onClose}>
      <div className="cmd-palette-card" onClick={(e) => e.stopPropagation()}>
        {/* Search Input Bar */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          padding: '16px 20px',
          borderBottom: '1px solid rgba(255, 255, 255, 0.08)'
        }}>
          <Search size={18} color="#38bdf8" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search skills, career pathways, benchmarks, or ask AI..."
            autoFocus
            style={{
              background: 'transparent',
              border: 'none',
              outline: 'none',
              color: '#ffffff',
              fontSize: '1rem',
              width: '100%',
              fontFamily: 'var(--font-body)'
            }}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && query.trim()) {
                onAskAssistant(query);
                onClose();
              }
            }}
          />
          <button
            onClick={onClose}
            style={{ background: 'transparent', border: 'none', color: '#94a3b8', cursor: 'pointer' }}
          >
            <X size={18} />
          </button>
        </div>

        {/* Suggestion List */}
        <div style={{ padding: '12px', maxHeight: '360px', overflowY: 'auto' }}>
          <div style={{ fontSize: '0.72rem', color: '#64748b', fontWeight: 600, textTransform: 'uppercase', padding: '6px 12px' }}>
            {query ? 'Results' : 'Recommended Quick Queries & Actions'}
          </div>

          {filtered.map((item, idx) => (
            <div
              key={idx}
              onClick={item.action}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '10px 14px',
                borderRadius: '8px',
                cursor: 'pointer',
                transition: 'background 0.15s'
              }}
              onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(59, 130, 246, 0.15)'}
              onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <Sparkles size={14} color="#38bdf8" />
                <span style={{ fontSize: '0.88rem', color: '#f8fafc', fontWeight: 500 }}>
                  {item.title}
                </span>
              </div>
              <span style={{
                fontSize: '0.72rem',
                background: 'rgba(255, 255, 255, 0.05)',
                color: '#94a3b8',
                borderRadius: '6px',
                padding: '2px 8px'
              }}>
                {item.category}
              </span>
            </div>
          ))}

          {query && (
            <div
              onClick={() => { onAskAssistant(query); onClose(); }}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '12px 14px',
                marginTop: '6px',
                borderRadius: '8px',
                background: 'rgba(37, 99, 235, 0.2)',
                border: '1px solid rgba(59, 130, 246, 0.4)',
                cursor: 'pointer'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#38bdf8' }}>
                <Sparkles size={16} />
                <span style={{ fontSize: '0.9rem', fontWeight: 600 }}>
                  Ask AI Career Intelligence: "{query}"
                </span>
              </div>
              <ArrowRight size={15} color="#38bdf8" />
            </div>
          )}
        </div>

        {/* Footer */}
        <div style={{
          padding: '10px 18px',
          background: 'rgba(7, 9, 14, 0.6)',
          borderTop: '1px solid rgba(255, 255, 255, 0.05)',
          display: 'flex',
          justifyContent: 'space-between',
          fontSize: '0.74rem',
          color: '#64748b'
        }}>
          <div>Press <kbd className="kbd-badge">ESC</kbd> to close</div>
          <div>Powered by SkillGraph AI Multi-Agent RAG</div>
        </div>
      </div>
    </div>
  );
}
