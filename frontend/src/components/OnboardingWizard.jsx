import React, { useState } from 'react';
import { 
  User, 
  Code2, 
  FolderGit2, 
  Compass, 
  CalendarClock, 
  ArrowRight, 
  ArrowLeft, 
  Plus, 
  Trash2, 
  Check, 
  Sparkles,
  Zap
} from 'lucide-react';

const PRESET_SKILL_CATEGORIES = {
  "Programming": ["Python", "Java", "C++", "JavaScript", "TypeScript"],
  "AI / ML": ["Machine Learning", "Deep Learning", "NLP", "Generative AI", "LLMs", "RAG", "AI Agents"],
  "Development": ["FastAPI", "React", "APIs", "Docker", "Git", "Kubernetes"],
  "Data": ["SQL", "Power BI", "Excel", "Tableau", "Pandas"],
  "Cloud": ["AWS", "Azure", "GCP"]
};

const PRESET_CAREERS = [
  "AI Engineer",
  "GenAI Engineer",
  "ML Engineer",
  "Data Scientist",
  "Data Analyst",
  "Full Stack Developer",
  "Backend Developer"
];

export default function OnboardingWizard({ onSubmit, onCancel, onTryDemo }) {
  const [step, setStep] = useState(1);

  // Step 1: Basic Profile
  const [profile, setProfile] = useState({
    name: "Sudharsana",
    education: "B.Tech AI & Data Science",
    status: "Student",
    experience_years: "0-1 years",
    summary: "Aspiring AI engineer passionate about building intelligent agentic systems and scalable web APIs."
  });

  // Step 2: Skills
  const [skills, setSkills] = useState([
    { name: "Python", category: "Programming", level: "Advanced", learning_source: "Project" },
    { name: "Machine Learning", category: "AI / ML", level: "Intermediate", learning_source: "Course" },
    { name: "FastAPI", category: "Development", level: "Beginner", learning_source: "Self-learning" },
    { name: "SQL", category: "Data", level: "Intermediate", learning_source: "Course" },
    { name: "RAG", category: "AI / ML", level: "Intermediate", learning_source: "Project" }
  ]);
  const [customSkillName, setCustomSkillName] = useState("");
  const [customCategory, setCustomCategory] = useState("Programming");

  // Step 3: Projects
  const [projects, setProjects] = useState([
    {
      name: "Intelligent RAG Assistant",
      description: "Asynchronous retrieval-augmented question answering engine over enterprise PDF documentation.",
      technologies: "Python, FastAPI, Gemini API, ChromaDB, React",
      role: "Lead Developer",
      github_url: "https://github.com/sudharsana/rag-assistant",
      user_contribution: "Implemented semantic chunking, vector embedding queries with ChromaDB, and asynchronous FastAPI endpoints."
    }
  ]);

  // Step 4 & 5: Target Career & Goals
  const [targetRole, setTargetRole] = useState("AI Engineer");
  const [customRole, setCustomRole] = useState("");
  const [goal, setGoal] = useState({
    preferred_industry: "Technology & AI",
    preferred_location: "Remote / Hybrid",
    weekly_hours: 10,
    target_timeline_months: 3
  });

  // Helpers
  const handleTogglePresetSkill = (skillName, category) => {
    const exists = skills.find(s => s.name.toLowerCase() === skillName.toLowerCase());
    if (exists) {
      setSkills(skills.filter(s => s.name.toLowerCase() !== skillName.toLowerCase()));
    } else {
      setSkills([...skills, {
        name: skillName,
        category: category,
        level: "Intermediate",
        learning_source: "Self-learning"
      }]);
    }
  };

  const handleUpdateSkill = (index, field, value) => {
    const updated = [...skills];
    updated[index][field] = value;
    setSkills(updated);
  };

  const handleRemoveSkill = (index) => {
    setSkills(skills.filter((_, i) => i !== index));
  };

  const handleAddCustomSkill = () => {
    if (!customSkillName.trim()) return;
    setSkills([...skills, {
      name: customSkillName.trim(),
      category: customCategory,
      level: "Intermediate",
      learning_source: "Self-learning"
    }]);
    setCustomSkillName("");
  };

  const handleAddProject = () => {
    setProjects([...projects, {
      name: "",
      description: "",
      technologies: "",
      role: "Sole Developer",
      github_url: "",
      user_contribution: ""
    }]);
  };

  const handleUpdateProject = (index, field, value) => {
    const updated = [...projects];
    updated[index][field] = value;
    setProjects(updated);
  };

  const handleRemoveProject = (index) => {
    if (projects.length > 1) {
      setProjects(projects.filter((_, i) => i !== index));
    }
  };

  const handleFinalSubmit = () => {
    const finalRole = targetRole === "Custom" ? (customRole || "Agentic AI Engineer") : targetRole;
    const payload = {
      profile: {
        name: profile.name,
        education: profile.education,
        status: profile.status,
        experience_years: profile.experience_years,
        summary: profile.summary,
        target_role: finalRole,
        weekly_hours: parseInt(goal.weekly_hours) || 10,
        target_timeline_months: parseInt(goal.target_timeline_months) || 3,
        preferred_industry: goal.preferred_industry,
        preferred_location: goal.preferred_location
      },
      skills: skills,
      projects: projects.filter(p => p.name.trim().length > 0)
    };
    onSubmit(payload);
  };

  return (
    <div className="container" style={{ maxWidth: '880px', padding: '40px 20px 80px' }}>
      {/* Wizard Header & Stepper */}
      <div className="glass-panel" style={{ padding: '24px 30px', marginBottom: '32px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '18px' }}>
          <div>
            <span style={{ fontSize: '0.8rem', color: 'var(--accent-secondary)', fontWeight: 700, textTransform: 'uppercase' }}>
              STEP {step} OF 5
            </span>
            <h2 style={{ fontSize: '1.4rem' }}>
              {step === 1 && "Basic Profile & Experience"}
              {step === 2 && "Current Technical Competencies"}
              {step === 3 && "Project Deliverables & Evidence"}
              {step === 4 && "Target Career Pathway"}
              {step === 5 && "Timeline, Capacity & Goals"}
            </h2>
          </div>
          <button onClick={onTryDemo} className="btn-demo" style={{ fontSize: '0.8rem', padding: '6px 12px' }}>
            <Zap size={14} />
            <span>Skip with Demo</span>
          </button>
        </div>

        {/* Visual Progress Bar */}
        <div className="progress-bar-container">
          <div className="progress-bar-fill" style={{ width: `${(step / 5) * 100}%` }} />
        </div>
      </div>

      {/* STEP 1: Basic Profile */}
      {step === 1 && (
        <div className="glass-panel" style={{ padding: '36px' }}>
          <h3 style={{ marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <User size={20} color="var(--accent-primary)" />
            <span>Tell us about yourself</span>
          </h3>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '20px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '8px' }}>
                Full Name
              </label>
              <input 
                type="text" 
                value={profile.name} 
                onChange={e => setProfile({...profile, name: e.target.value})}
                style={{
                  width: '100%', padding: '12px 16px', background: 'rgba(255,255,255,0.04)',
                  border: '1px solid var(--card-border)', borderRadius: 'var(--radius-sm)',
                  color: '#ffffff', fontSize: '0.95rem'
                }}
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '8px' }}>
                Education Background
              </label>
              <input 
                type="text" 
                value={profile.education} 
                onChange={e => setProfile({...profile, education: e.target.value})}
                placeholder="e.g. B.Tech AI & Data Science"
                style={{
                  width: '100%', padding: '12px 16px', background: 'rgba(255,255,255,0.04)',
                  border: '1px solid var(--card-border)', borderRadius: 'var(--radius-sm)',
                  color: '#ffffff', fontSize: '0.95rem'
                }}
              />
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '20px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '8px' }}>
                Current Role / Status
              </label>
              <select 
                value={profile.status} 
                onChange={e => setProfile({...profile, status: e.target.value})}
                style={{
                  width: '100%', padding: '12px 16px', background: 'rgba(15,23,42,0.9)',
                  border: '1px solid var(--card-border)', borderRadius: 'var(--radius-sm)',
                  color: '#ffffff', fontSize: '0.95rem'
                }}
              >
                <option value="Student">Student</option>
                <option value="Fresh Graduate">Fresh Graduate</option>
                <option value="Early-Career Developer">Early-Career Developer</option>
                <option value="Career Transitioner">Career Transitioner</option>
              </select>
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '8px' }}>
                Years of Experience
              </label>
              <select 
                value={profile.experience_years} 
                onChange={e => setProfile({...profile, experience_years: e.target.value})}
                style={{
                  width: '100%', padding: '12px 16px', background: 'rgba(15,23,42,0.9)',
                  border: '1px solid var(--card-border)', borderRadius: 'var(--radius-sm)',
                  color: '#ffffff', fontSize: '0.95rem'
                }}
              >
                <option value="0-1 years">Beginner / 0–1 years</option>
                <option value="1-2 years">1–2 years</option>
                <option value="3+ years">3+ years</option>
              </select>
            </div>
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '8px' }}>
              Short Professional Summary
            </label>
            <textarea 
              rows={3}
              value={profile.summary} 
              onChange={e => setProfile({...profile, summary: e.target.value})}
              placeholder="Brief summary of your background and technical interests..."
              style={{
                width: '100%', padding: '12px 16px', background: 'rgba(255,255,255,0.04)',
                border: '1px solid var(--card-border)', borderRadius: 'var(--radius-sm)',
                color: '#ffffff', fontSize: '0.95rem', resize: 'vertical'
              }}
            />
          </div>
        </div>
      )}

      {/* STEP 2: Current Skills */}
      {step === 2 && (
        <div className="glass-panel" style={{ padding: '36px' }}>
          <h3 style={{ marginBottom: '10px', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Code2 size={20} color="var(--accent-secondary)" />
            <span>Select & Refine Your Current Skills</span>
          </h3>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '24px' }}>
            Click popular technologies to toggle them, or add custom skills below. For each skill, specify proficiency and learning source.
          </p>

          {/* Preset Categories */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '18px', marginBottom: '30px' }}>
            {Object.entries(PRESET_SKILL_CATEGORIES).map(([cat, skillNames]) => (
              <div key={cat}>
                <div style={{ fontSize: '0.8rem', color: 'var(--accent-secondary)', fontWeight: 700, marginBottom: '8px' }}>
                  {cat.toUpperCase()}
                </div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                  {skillNames.map(name => {
                    const isSelected = skills.some(s => s.name.toLowerCase() === name.toLowerCase());
                    return (
                      <button
                        key={name}
                        type="button"
                        onClick={() => handleTogglePresetSkill(name, cat)}
                        style={{
                          padding: '6px 14px',
                          borderRadius: 'var(--radius-full)',
                          fontSize: '0.85rem',
                          fontWeight: 500,
                          cursor: 'pointer',
                          background: isSelected ? 'var(--gradient-brand)' : 'rgba(255,255,255,0.05)',
                          color: isSelected ? '#ffffff' : 'var(--text-muted)',
                          border: isSelected ? '1px solid transparent' : '1px solid var(--card-border)',
                          transition: 'all 0.15s ease'
                        }}
                      >
                        {isSelected ? `✓ ${name}` : `+ ${name}`}
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>

          {/* Add Custom Skill */}
          <div style={{ 
            display: 'flex', gap: '12px', padding: '16px', 
            background: 'rgba(255,255,255,0.02)', borderRadius: 'var(--radius-md)', 
            border: '1px solid var(--card-border)', marginBottom: '30px', flexWrap: 'wrap' 
          }}>
            <input 
              type="text" 
              placeholder="Enter custom skill (e.g. LangGraph, ChromaDB)..."
              value={customSkillName}
              onChange={e => setCustomSkillName(e.target.value)}
              style={{
                flex: 1, minWidth: '200px', padding: '10px 14px', background: 'rgba(255,255,255,0.05)',
                border: '1px solid var(--card-border)', borderRadius: 'var(--radius-sm)', color: '#ffffff'
              }}
            />
            <select
              value={customCategory}
              onChange={e => setCustomCategory(e.target.value)}
              style={{
                padding: '10px 14px', background: 'rgba(15,23,42,0.9)',
                border: '1px solid var(--card-border)', borderRadius: 'var(--radius-sm)', color: '#ffffff'
              }}
            >
              <option value="Programming">Programming</option>
              <option value="AI / ML">AI / ML</option>
              <option value="Development">Development</option>
              <option value="Data">Data</option>
              <option value="Cloud">Cloud</option>
            </select>
            <button type="button" onClick={handleAddCustomSkill} className="btn-secondary" style={{ padding: '10px 18px' }}>
              <Plus size={16} />
              <span>Add Custom Skill</span>
            </button>
          </div>

          {/* Active Skills Table / Cards */}
          <div>
            <div style={{ fontSize: '0.9rem', fontWeight: 600, marginBottom: '12px' }}>
              Selected Skills ({skills.length}) — Configure Proficiency & Learning Source:
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', maxHeight: '320px', overflowY: 'auto', paddingRight: '6px' }}>
              {skills.map((s, idx) => (
                <div key={idx} style={{
                  display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                  background: 'rgba(255,255,255,0.03)', padding: '10px 16px',
                  borderRadius: 'var(--radius-sm)', border: '1px solid var(--card-border)',
                  gap: '12px', flexWrap: 'wrap'
                }}>
                  <div style={{ minWidth: '150px' }}>
                    <span style={{ fontWeight: 600 }}>{s.name}</span>
                    <span style={{ fontSize: '0.75rem', color: 'var(--text-dim)', display: 'block' }}>{s.category}</span>
                  </div>

                  <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                    <select
                      value={s.level}
                      onChange={e => handleUpdateSkill(idx, 'level', e.target.value)}
                      style={{
                        padding: '6px 10px', background: 'rgba(15,23,42,0.9)',
                        border: '1px solid var(--card-border)', borderRadius: 'var(--radius-sm)', color: '#ffffff', fontSize: '0.8rem'
                      }}
                    >
                      <option value="Beginner">Beginner</option>
                      <option value="Intermediate">Intermediate</option>
                      <option value="Advanced">Advanced</option>
                    </select>

                    <select
                      value={s.learning_source}
                      onChange={e => handleUpdateSkill(idx, 'learning_source', e.target.value)}
                      style={{
                        padding: '6px 10px', background: 'rgba(15,23,42,0.9)',
                        border: '1px solid var(--card-border)', borderRadius: 'var(--radius-sm)', color: '#ffffff', fontSize: '0.8rem'
                      }}
                    >
                      <option value="Course">Course</option>
                      <option value="Project">Project</option>
                      <option value="Internship">Internship</option>
                      <option value="Self-learning">Self-learning</option>
                      <option value="Work experience">Work experience</option>
                    </select>

                    <button 
                      type="button" 
                      onClick={() => handleRemoveSkill(idx)}
                      style={{ background: 'transparent', border: 'none', color: 'var(--accent-rose)', cursor: 'pointer', padding: '4px' }}
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* STEP 3: Project Experience */}
      {step === 3 && (
        <div className="glass-panel" style={{ padding: '36px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
            <div>
              <h3 style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <FolderGit2 size={20} color="var(--accent-tertiary)" />
                <span>Project Deliverables & Evidence</span>
              </h3>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                The AI agents analyze concrete deliverables as evidence to verify skill depth beyond self-declaration.
              </p>
            </div>
            <button type="button" onClick={handleAddProject} className="btn-secondary" style={{ padding: '8px 14px', fontSize: '0.85rem' }}>
              <Plus size={15} />
              <span>Add Project</span>
            </button>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            {projects.map((proj, idx) => (
              <div key={idx} style={{
                background: 'rgba(255,255,255,0.02)', border: '1px solid var(--card-border)',
                borderRadius: 'var(--radius-md)', padding: '20px', position: 'relative'
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
                  <span style={{ fontSize: '0.85rem', color: 'var(--accent-tertiary)', fontWeight: 700 }}>
                    PROJECT #{idx + 1}
                  </span>
                  {projects.length > 1 && (
                    <button 
                      type="button" 
                      onClick={() => handleRemoveProject(idx)}
                      style={{ background: 'transparent', border: 'none', color: 'var(--accent-rose)', cursor: 'pointer' }}
                    >
                      <Trash2 size={16} />
                    </button>
                  )}
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '16px' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '6px' }}>
                      Project Name *
                    </label>
                    <input 
                      type="text" 
                      value={proj.name} 
                      onChange={e => handleUpdateProject(idx, 'name', e.target.value)}
                      placeholder="e.g. Intelligent RAG Chatbot"
                      style={{
                        width: '100%', padding: '10px 14px', background: 'rgba(255,255,255,0.04)',
                        border: '1px solid var(--card-border)', borderRadius: 'var(--radius-sm)', color: '#ffffff'
                      }}
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '6px' }}>
                      Technologies Used *
                    </label>
                    <input 
                      type="text" 
                      value={proj.technologies} 
                      onChange={e => handleUpdateProject(idx, 'technologies', e.target.value)}
                      placeholder="e.g. Python, FastAPI, Gemini, ChromaDB, React"
                      style={{
                        width: '100%', padding: '10px 14px', background: 'rgba(255,255,255,0.04)',
                        border: '1px solid var(--card-border)', borderRadius: 'var(--radius-sm)', color: '#ffffff'
                      }}
                    />
                  </div>
                </div>

                <div style={{ marginBottom: '16px' }}>
                  <label style={{ display: 'block', fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '6px' }}>
                    Project Description
                  </label>
                  <textarea 
                    rows={2}
                    value={proj.description} 
                    onChange={e => handleUpdateProject(idx, 'description', e.target.value)}
                    placeholder="What problem does this project solve? High-level overview..."
                    style={{
                      width: '100%', padding: '10px 14px', background: 'rgba(255,255,255,0.04)',
                      border: '1px solid var(--card-border)', borderRadius: 'var(--radius-sm)', color: '#ffffff'
                    }}
                  />
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '16px' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '6px' }}>
                      Your Role
                    </label>
                    <input 
                      type="text" 
                      value={proj.role} 
                      onChange={e => handleUpdateProject(idx, 'role', e.target.value)}
                      placeholder="e.g. Lead Developer / Sole Contributor"
                      style={{
                        width: '100%', padding: '10px 14px', background: 'rgba(255,255,255,0.04)',
                        border: '1px solid var(--card-border)', borderRadius: 'var(--radius-sm)', color: '#ffffff'
                      }}
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '6px' }}>
                      GitHub URL (Optional)
                    </label>
                    <input 
                      type="text" 
                      value={proj.github_url} 
                      onChange={e => handleUpdateProject(idx, 'github_url', e.target.value)}
                      placeholder="https://github.com/..."
                      style={{
                        width: '100%', padding: '10px 14px', background: 'rgba(255,255,255,0.04)',
                        border: '1px solid var(--card-border)', borderRadius: 'var(--radius-sm)', color: '#ffffff'
                      }}
                    />
                  </div>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '6px' }}>
                    What did you personally implement? (Critical Evidence)
                  </label>
                  <textarea 
                    rows={2}
                    value={proj.user_contribution} 
                    onChange={e => handleUpdateProject(idx, 'user_contribution', e.target.value)}
                    placeholder="Specific modules, algorithms, endpoints, or pipelines you authored..."
                    style={{
                      width: '100%', padding: '10px 14px', background: 'rgba(255,255,255,0.04)',
                      border: '1px solid var(--card-border)', borderRadius: 'var(--radius-sm)', color: '#ffffff'
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* STEP 4: Target Career */}
      {step === 4 && (
        <div className="glass-panel" style={{ padding: '36px' }}>
          <h3 style={{ marginBottom: '10px', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Compass size={20} color="var(--accent-emerald)" />
            <span>Select Your Target Career Role</span>
          </h3>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '24px' }}>
            The Career Analyzer agent retrieves industry standards and market frequencies for this role from the RAG knowledge base.
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '16px', marginBottom: '24px' }}>
            {PRESET_CAREERS.map(role => (
              <div 
                key={role}
                onClick={() => setTargetRole(role)}
                style={{
                  padding: '18px 20px',
                  borderRadius: 'var(--radius-md)',
                  background: targetRole === role ? 'rgba(99, 102, 241, 0.18)' : 'rgba(255,255,255,0.03)',
                  border: targetRole === role ? '2px solid var(--accent-primary)' : '1px solid var(--card-border)',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between'
                }}
              >
                <span style={{ fontWeight: 600, fontSize: '0.95rem' }}>{role}</span>
                {targetRole === role && <Check size={18} color="var(--accent-primary)" />}
              </div>
            ))}

            <div 
              onClick={() => setTargetRole("Custom")}
              style={{
                padding: '18px 20px',
                borderRadius: 'var(--radius-md)',
                background: targetRole === "Custom" ? 'rgba(99, 102, 241, 0.18)' : 'rgba(255,255,255,0.03)',
                border: targetRole === "Custom" ? '2px solid var(--accent-primary)' : '1px solid var(--card-border)',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between'
              }}
            >
              <span style={{ fontWeight: 600, fontSize: '0.95rem' }}>+ Custom Career</span>
              {targetRole === "Custom" && <Check size={18} color="var(--accent-primary)" />}
            </div>
          </div>

          {targetRole === "Custom" && (
            <div style={{ marginTop: '20px' }}>
              <label style={{ display: 'block', fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '8px' }}>
                Enter Custom Career Title
              </label>
              <input 
                type="text" 
                placeholder="e.g. Agentic AI Engineer, Autonomous Robotics Lead"
                value={customRole}
                onChange={e => setCustomRole(e.target.value)}
                style={{
                  width: '100%', padding: '12px 16px', background: 'rgba(255,255,255,0.04)',
                  border: '1px solid var(--card-border)', borderRadius: 'var(--radius-sm)', color: '#ffffff'
                }}
              />
            </div>
          )}
        </div>
      )}

      {/* STEP 5: Career Goal & Constraints */}
      {step === 5 && (
        <div className="glass-panel" style={{ padding: '36px' }}>
          <h3 style={{ marginBottom: '10px', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <CalendarClock size={20} color="var(--accent-amber)" />
            <span>Timeline, Availability & Preferences</span>
          </h3>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '24px' }}>
            Where do you want to be, and how much capacity do you have? This shapes your 5-phase practical roadmap.
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '20px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '8px' }}>
                Target Role
              </label>
              <div style={{ 
                padding: '12px 16px', background: 'rgba(255,255,255,0.05)', 
                borderRadius: 'var(--radius-sm)', border: '1px solid var(--card-border)', 
                fontWeight: 600, color: 'var(--accent-secondary)' 
              }}>
                {targetRole === "Custom" ? (customRole || "Custom Career") : targetRole}
              </div>
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '8px' }}>
                Preferred Industry
              </label>
              <input 
                type="text" 
                value={goal.preferred_industry} 
                onChange={e => setGoal({...goal, preferred_industry: e.target.value})}
                placeholder="e.g. AI / Machine Learning / FinTech"
                style={{
                  width: '100%', padding: '12px 16px', background: 'rgba(255,255,255,0.04)',
                  border: '1px solid var(--card-border)', borderRadius: 'var(--radius-sm)', color: '#ffffff'
                }}
              />
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '20px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '8px' }}>
                Time Available per Week (Hours)
              </label>
              <input 
                type="number" 
                min={2} 
                max={50} 
                value={goal.weekly_hours} 
                onChange={e => setGoal({...goal, weekly_hours: e.target.value})}
                style={{
                  width: '100%', padding: '12px 16px', background: 'rgba(255,255,255,0.04)',
                  border: '1px solid var(--card-border)', borderRadius: 'var(--radius-sm)', color: '#ffffff'
                }}
              />
              <span style={{ fontSize: '0.75rem', color: 'var(--text-dim)' }}>Typically 8–15 hours for students / working developers</span>
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '8px' }}>
                Desired Timeline (Months)
              </label>
              <select
                value={goal.target_timeline_months}
                onChange={e => setGoal({...goal, target_timeline_months: e.target.value})}
                style={{
                  width: '100%', padding: '12px 16px', background: 'rgba(15,23,42,0.9)',
                  border: '1px solid var(--card-border)', borderRadius: 'var(--radius-sm)', color: '#ffffff'
                }}
              >
                <option value={1}>1 Month (Sprint)</option>
                <option value={2}>2 Months (Intensive)</option>
                <option value={3}>3 Months (Standard)</option>
                <option value={6}>6 Months (Comprehensive)</option>
              </select>
            </div>
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '8px' }}>
              Preferred Location
            </label>
            <input 
              type="text" 
              value={goal.preferred_location} 
              onChange={e => setGoal({...goal, preferred_location: e.target.value})}
              placeholder="e.g. Remote, India, US, Global"
              style={{
                width: '100%', padding: '12px 16px', background: 'rgba(255,255,255,0.04)',
                border: '1px solid var(--card-border)', borderRadius: 'var(--radius-sm)', color: '#ffffff'
              }}
            />
          </div>
        </div>
      )}

      {/* Navigation Buttons */}
      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '24px' }}>
        {step > 1 ? (
          <button 
            type="button" 
            onClick={() => setStep(step - 1)} 
            className="btn-secondary"
            id="wizard-back-btn"
          >
            <ArrowLeft size={16} />
            <span>Back</span>
          </button>
        ) : (
          <button 
            type="button" 
            onClick={onCancel} 
            className="btn-secondary"
          >
            Cancel
          </button>
        )}

        {step < 5 ? (
          <button 
            type="button" 
            onClick={() => setStep(step + 1)} 
            className="btn-primary"
            id="wizard-next-btn"
          >
            <span>Continue to Step {step + 1}</span>
            <ArrowRight size={16} />
          </button>
        ) : (
          <button 
            type="button" 
            onClick={handleFinalSubmit} 
            className="btn-primary"
            style={{ padding: '14px 28px', background: 'var(--gradient-brand)' }}
            id="wizard-generate-btn"
          >
            <Sparkles size={18} />
            <span>Generate My SkillTwin</span>
          </button>
        )}
      </div>
    </div>
  );
}
