import React, { useState } from 'react';
import { MessageSquare, Send, X, Bot, Sparkles, User, ArrowRight } from 'lucide-react';
import { sendAssistantMessage } from '../services/api';

const QUICK_PROMPTS = [
  "Why should I learn Docker?",
  "What should I learn next?",
  "Which project should I build?",
  "How far am I from my target role?",
  "How should I pace my study at 5 hours/week?"
];

export default function AssistantDrawer({ userId, isOpen, onClose }) {
  const [messages, setMessages] = useState([
    {
      sender: "assistant",
      text: "Hello! I am your SkillTwin Career Advisor. I can explain why specific skills are required for your target role, recommend your next high-leverage project, or optimize your study pacing.",
      suggestedAction: null
    }
  ]);
  const [inputVal, setInputVal] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSend = async (textToSend) => {
    const query = (textToSend || inputVal).trim();
    if (!query || loading) return;

    // Add user message
    setMessages(prev => [...prev, { sender: "user", text: query }]);
    setInputVal("");
    setLoading(true);

    try {
      const res = await sendAssistantMessage(userId, query);
      setMessages(prev => [
        ...prev,
        {
          sender: "assistant",
          text: res.reply,
          suggestedAction: res.suggested_action
        }
      ]);
    } catch (err) {
      setMessages(prev => [
        ...prev,
        {
          sender: "assistant",
          text: "I was unable to retrieve context for that query. Please verify the backend connection and try again.",
          suggestedAction: null
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      right: 0,
      bottom: 0,
      width: '430px',
      maxWidth: '92vw',
      background: 'rgba(10, 13, 20, 0.96)',
      backdropFilter: 'blur(28px)',
      WebkitBackdropFilter: 'blur(28px)',
      borderLeft: '1px solid var(--card-border)',
      boxShadow: '-15px 0 35px rgba(0, 0, 0, 0.7)',
      zIndex: 100,
      display: 'flex',
      flexDirection: 'column'
    }}>
      {/* Drawer Header */}
      <div style={{
        padding: '20px 22px',
        borderBottom: '1px solid var(--card-border)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{
            width: '36px', height: '36px', borderRadius: '10px',
            background: 'linear-gradient(135deg, #6366f1, #06b6d4)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            boxShadow: '0 0 16px rgba(99, 102, 241, 0.4)'
          }}>
            <Bot size={19} color="#ffffff" />
          </div>
          <div>
            <div style={{ fontSize: '1.02rem', fontWeight: 700, color: '#ffffff' }}>Career Intelligence Advisor</div>
            <div style={{ fontSize: '0.72rem', color: 'var(--accent-secondary)' }}>Live Twin Context Active</div>
          </div>
        </div>
        <button
          onClick={onClose}
          style={{ background: 'transparent', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', display: 'flex', padding: '4px' }}
        >
          <X size={20} />
        </button>
      </div>

      {/* Quick Prompts */}
      <div style={{ padding: '12px 18px', borderBottom: '1px solid var(--card-border)', background: 'rgba(255, 255, 255, 0.02)' }}>
        <div style={{ fontSize: '0.7rem', color: 'var(--text-dim)', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.05em', fontWeight: 600 }}>
          Quick Questions:
        </div>
        <div style={{ display: 'flex', gap: '6px', overflowX: 'auto', paddingBottom: '4px' }}>
          {QUICK_PROMPTS.map((prompt, idx) => (
            <button
              key={idx}
              onClick={() => handleSend(prompt)}
              style={{
                fontSize: '0.76rem',
                padding: '5px 11px',
                borderRadius: 'var(--radius-full)',
                background: 'rgba(255, 255, 255, 0.05)',
                color: 'var(--text-secondary)',
                border: '1px solid var(--card-border)',
                whiteSpace: 'nowrap',
                cursor: 'pointer',
                transition: 'all 0.15s ease'
              }}
            >
              {prompt}
            </button>
          ))}
        </div>
      </div>

      {/* Chat Messages */}
      <div style={{ flex: 1, overflowY: 'auto', padding: '18px', display: 'flex', flexDirection: 'column', gap: '14px' }}>
        {messages.map((m, idx) => (
          <div key={idx} style={{
            alignSelf: m.sender === 'user' ? 'flex-end' : 'flex-start',
            maxWidth: '86%',
            display: 'flex',
            gap: '10px',
            flexDirection: m.sender === 'user' ? 'row-reverse' : 'row'
          }}>
            <div style={{
              width: '28px', height: '28px', borderRadius: '50%',
              background: m.sender === 'user' ? 'linear-gradient(135deg, #06b6d4, #3b82f6)' : 'linear-gradient(135deg, #6366f1, #8b5cf6)',
              display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0
            }}>
              {m.sender === 'user' ? <User size={14} color="#ffffff" /> : <Bot size={15} color="#ffffff" />}
            </div>

            <div style={{
              background: m.sender === 'user' ? 'rgba(6, 182, 212, 0.14)' : 'rgba(255, 255, 255, 0.04)',
              border: '1px solid var(--card-border)',
              borderRadius: '14px',
              padding: '12px 15px',
              fontSize: '0.86rem',
              color: 'var(--text-main)',
              lineHeight: 1.55
            }}>
              <div>{m.text}</div>
              {m.suggestedAction && (
                <div style={{
                  marginTop: '10px',
                  padding: '7px 11px',
                  background: 'rgba(99, 102, 241, 0.12)',
                  borderRadius: '8px',
                  fontSize: '0.78rem',
                  color: '#c7d2fe',
                  border: '1px solid rgba(99, 102, 241, 0.25)'
                }}>
                  <strong style={{ color: '#ffffff' }}>Recommended Step:</strong> {m.suggestedAction}
                </div>
              )}
            </div>
          </div>
        ))}
        {loading && (
          <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontStyle: 'italic', display: 'flex', alignItems: 'center', gap: '6px' }}>
            <Sparkles size={14} color="var(--accent-secondary)" />
            <span>Analyzing career profile context...</span>
          </div>
        )}
      </div>

      {/* Input Form */}
      <div style={{ padding: '14px 18px', borderTop: '1px solid var(--card-border)' }}>
        <form
          onSubmit={(e) => { e.preventDefault(); handleSend(); }}
          style={{ display: 'flex', gap: '8px' }}
        >
          <input
            type="text"
            placeholder="Ask about skills, projects, or roadmap..."
            value={inputVal}
            onChange={(e) => setInputVal(e.target.value)}
            style={{
              flex: 1,
              padding: '11px 15px',
              background: 'rgba(255, 255, 255, 0.05)',
              border: '1px solid var(--card-border)',
              borderRadius: 'var(--radius-sm)',
              color: '#ffffff',
              fontSize: '0.88rem',
              outline: 'none'
            }}
          />
          <button
            type="submit"
            disabled={loading || !inputVal.trim()}
            className="btn-primary"
            style={{
              padding: '0 16px',
              borderRadius: 'var(--radius-sm)',
              cursor: 'pointer'
            }}
          >
            <Send size={15} />
          </button>
        </form>
      </div>
    </div>
  );
}
