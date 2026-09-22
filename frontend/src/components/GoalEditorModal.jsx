import React, { useState } from 'react';
import { X, Target, Clock, Calendar, Check } from 'lucide-react';

export default function GoalEditorModal({ isOpen, onClose, currentRole = "AI Engineer", weeklyHours = 10, timelineMonths = 5, onSave }) {
  const [role, setRole] = useState(currentRole);
  const [hours, setHours] = useState(weeklyHours);
  const [months, setMonths] = useState(timelineMonths);

  if (!isOpen) return null;

  const handleSave = (e) => {
    e.preventDefault();
    onSave({ targetRole: role, weeklyHours: hours, timelineMonths: months });
    onClose();
  };

  return (
    <div className="cmd-palette-backdrop" onClick={onClose}>
      <div className="cmd-palette-card" style={{ maxWidth: '520px' }} onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '18px 24px',
          borderBottom: '1px solid rgba(255, 255, 255, 0.08)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{
              width: '32px',
              height: '32px',
              borderRadius: '8px',
              background: 'rgba(56, 189, 248, 0.2)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <Target size={18} color="#38bdf8" />
            </div>
            <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#ffffff', margin: 0 }}>
              Edit Career Journey Goals
            </h3>
          </div>
          <button onClick={onClose} style={{ background: 'transparent', border: 'none', color: '#94a3b8', cursor: 'pointer' }}>
            <X size={18} />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSave} style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '18px' }}>
          <div>
            <label style={{ display: 'block', fontSize: '0.84rem', color: '#cbd5e1', fontWeight: 600, marginBottom: '6px' }}>
              Target Career Role
            </label>
            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              style={{
                width: '100%',
                padding: '10px 14px',
                background: 'rgba(255, 255, 255, 0.05)',
                border: '1px solid rgba(255, 255, 255, 0.12)',
                borderRadius: '8px',
                color: '#ffffff',
                fontSize: '0.9rem',
                outline: 'none'
              }}
            >
              <option value="AI Engineer" style={{ background: '#0f172a' }}>AI Engineer</option>
              <option value="Data Analyst" style={{ background: '#0f172a' }}>Data Analyst</option>
              <option value="ML Engineer" style={{ background: '#0f172a' }}>ML Engineer</option>
              <option value="Data Scientist" style={{ background: '#0f172a' }}>Data Scientist</option>
              <option value="Full Stack Developer" style={{ background: '#0f172a' }}>Full Stack Developer</option>
            </select>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
            <div>
              <label style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.84rem', color: '#cbd5e1', fontWeight: 600, marginBottom: '6px' }}>
                <Clock size={14} color="#38bdf8" />
                <span>Weekly Commitment</span>
              </label>
              <input
                type="number"
                min="2"
                max="60"
                value={hours}
                onChange={(e) => setHours(Number(e.target.value))}
                style={{
                  width: '100%',
                  padding: '10px 14px',
                  background: 'rgba(255, 255, 255, 0.05)',
                  border: '1px solid rgba(255, 255, 255, 0.12)',
                  borderRadius: '8px',
                  color: '#ffffff',
                  fontSize: '0.9rem',
                  outline: 'none'
                }}
              />
              <span style={{ fontSize: '0.72rem', color: '#94a3b8', marginTop: '4px', display: 'block' }}>Hours per week</span>
            </div>

            <div>
              <label style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.84rem', color: '#cbd5e1', fontWeight: 600, marginBottom: '6px' }}>
                <Calendar size={14} color="#a855f7" />
                <span>Target Timeline</span>
              </label>
              <input
                type="number"
                min="1"
                max="24"
                value={months}
                onChange={(e) => setMonths(Number(e.target.value))}
                style={{
                  width: '100%',
                  padding: '10px 14px',
                  background: 'rgba(255, 255, 255, 0.05)',
                  border: '1px solid rgba(255, 255, 255, 0.12)',
                  borderRadius: '8px',
                  color: '#ffffff',
                  fontSize: '0.9rem',
                  outline: 'none'
                }}
              />
              <span style={{ fontSize: '0.72rem', color: '#94a3b8', marginTop: '4px', display: 'block' }}>Months to target</span>
            </div>
          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '12px' }}>
            <button
              type="button"
              onClick={onClose}
              className="btn-secondary"
              style={{ padding: '8px 16px' }}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn-primary"
              style={{ padding: '8px 20px' }}
            >
              <Check size={15} />
              <span>Save Goals</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
