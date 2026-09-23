import React, { useState } from 'react';
import { 
  User, 
  Code2, 
  FolderGit2, 
  Compass, 
  ArrowRight, 
  ArrowLeft, 
  Plus, 
  Trash2, 
  Check, 
  Sparkles,
  Zap,
  Briefcase,
  ShieldCheck,
  Cpu,
  Clock,
  ExternalLink
} from 'lucide-react';

const PRESET_CAREER_CARDS = [
  {
    role: "AI Engineer",
    category: "Generative AI & LLMs",
    demand: "96% High Demand",
    medianSalary: "$155k",
    coreSkills: ["Python", "RAG", "LLMs", "FastAPI", "Vector DBs"],
    description: "Build, evaluate, and deploy production retrieval engines and LLM systems."
  },
  {
    role: "Agentic AI Architect",
    category: "Autonomous Systems",
    demand: "94% High Demand",
    medianSalary: "$170k",
    coreSkills: ["LangGraph", "Multi-Agent Loops", "Python", "Tool Calling"],
    description: "Design autonomous multi-agent state graphs, tool orchestration, and memory."
  },
  {
    role: "MLOps Specialist",
    category: "Platform & Infrastructure",
    demand: "91% High Demand",
    medianSalary: "$150k",
    coreSkills: ["Docker", "Kubernetes", "CI/CD", "Model Serving", "Monitoring"],
    description: "Package, containerize, and monitor high-throughput model inference pipelines."
  },
  {
    role: "Full Stack AI Developer",
    category: "Product & Web AI",
    demand: "89% High Demand",
    medianSalary: "$140k",
    coreSkills: ["React", "FastAPI", "Python", "REST APIs", "Vector Search"],
    description: "Ship end-to-end intelligent web applications with modern reactive UI."
  },
  {
    role: "Data & ML Scientist",
    category: "Analytics & Modeling",
    demand: "88% High Demand",
    medianSalary: "$138k",
    coreSkills: ["Python", "SQL", "Feature Engineering", "Scikit-Learn", "Pandas"],
    description: "Extract actionable predictive insights and statistical models from complex data."
  }
];

const PRESET_SKILL_CATEGORIES = {
  "Programming": ["Python", "TypeScript", "JavaScript", "Java", "C++", "Go"],
  "AI / ML": ["Machine Learning", "RAG", "LLMs", "Vector Databases", "LangGraph", "Deep Learning", "PyTorch"],
  "Development": ["FastAPI", "React", "Docker", "REST APIs", "Git", "Node.js"],
  "Data": ["SQL", "Pandas", "PostgreSQL", "Data Analytics", "Power BI"],
  "Cloud": ["AWS", "Azure", "Docker Compose", "CI/CD"]
};

export default function OnboardingWizard({ onSubmit, onCancel, onTryDemo, initialStep = 1 }) {
  const [step, setStep] = useState(initialStep || 1);

  // Step 1: Real User Identity & Career Ambition (Clean real-time state, no hardcoded names!)
  const [profile, setProfile] = useState({
    name: "",
    education: "",
    status: "Student", // Student, Transitioner, Early Career, Experienced
    experience_years: "0-1 years",
    summary: ""
  });

  const [targetRole, setTargetRole] = useState("AI Engineer");
  const [customRole, setCustomRole] = useState("");
  const [weeklyHours, setWeeklyHours] = useState(10);
  const [timelineMonths, setTimelineMonths] = useState(4);

  // Step 2: Interactive Skills
  const [skills, setSkills] = useState([
    { name: "Python", category: "Programming", level: "Intermediate", learning_source: "Projects" },
    { name: "SQL", category: "Data", level: "Intermediate", learning_source: "Coursework" }
  ]);
  const [activeSkillCategory, setActiveSkillCategory] = useState("Programming");
  const [customSkillName, setCustomSkillName] = useState("");

  // Step 3: Projects & Proof
  const [projects, setProjects] = useState([
    {
      name: "",
      description: "",
      technologies: "",
      role: "Lead Developer",
      github_url: "",
      user_contribution: ""
    }
  ]);

  // Skill management helpers
  const handleTogglePresetSkill = (skillName, category) => {
    const exists = skills.find(s => s.name.toLowerCase() === skillName.toLowerCase());
    if (exists) {
      setSkills(skills.filter(s => s.name.toLowerCase() !== skillName.toLowerCase()));
    } else {
      setSkills([...skills, {
        name: skillName,
        category: category,
        level: "Intermediate",
        learning_source: "Self-Project"
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
      category: activeSkillCategory,
      level: "Intermediate",
      learning_source: "Self-Project"
    }]);
    setCustomSkillName("");
  };

  // Project management helpers
  const handleAddProject = () => {
    setProjects([...projects, {
      name: "",
      description: "",
      technologies: "",
      role: "Lead Developer",
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

  const handleQuickLoadSampleProject = () => {
    setProjects([
      {
        name: "Intelligent Vector RAG Search Service",
        description: "Asynchronous semantic search engine over technical documentation with citation grounding.",
        technologies: "Python, FastAPI, ChromaDB, Gemini API",
        role: "Lead Developer",
        github_url: "https://github.com/developer/rag-search-service",
        user_contribution: "Implemented chunking logic, vector similarity queries, and async FastAPI streaming endpoints."
      }
    ]);
  };

  const handleFinalSubmit = () => {
    const finalRole = targetRole === "Custom" ? (customRole || "AI Engineer") : targetRole;
    const finalName = profile.name.trim() || "Emerging Engineer";
    const finalEducation = profile.education.trim() || "Computer Science / Tech";
    
    // Filter out completely blank projects
    const validProjects = projects.filter(p => p.name.trim().length > 0);
    const finalProjects = validProjects.length > 0 ? validProjects : [
      {
        name: "Independent Portfolio Project",
        description: "Applied skills in algorithmic logic, web APIs, and data structures.",
        technologies: skills.map(s => s.name).slice(0, 4).join(", ") || "Python, SQL",
        role: "Sole Developer",
        github_url: "",
        user_contribution: "Authored core application logic and test cases."
      }
    ];

    const payload = {
      profile: {
        name: finalName,
        education: finalEducation,
        status: profile.status,
        experience_years: profile.experience_years,
        summary: profile.summary.trim() || `Aspiring ${finalRole} focused on high-impact projects and verifiable skills.`,
        target_role: finalRole,
        weekly_hours: parseInt(weeklyHours) || 10,
        target_timeline_months: parseInt(timelineMonths) || 4,
        preferred_industry: "Technology / AI",
        preferred_location: "Remote / Hybrid"
      },
      skills: skills.length > 0 ? skills : [
        { name: "Python", category: "Programming", level: "Intermediate", learning_source: "Self-Project" },
        { name: "SQL", category: "Data", level: "Intermediate", learning_source: "Coursework" }
      ],
      projects: finalProjects
    };

    onSubmit(payload);
  };

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '36px 20px 80px' }}>
      
      {/* Top Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '28px', flexWrap: 'wrap', gap: '14px' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
            <span className="badge badge-violet">Interactive Setup</span>
            <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>Step {step} of 3</span>
          </div>
          <h1 style={{ fontSize: '1.85rem', fontWeight: 800, color: '#ffffff' }}>
            {step === 1 && "Define Identity & Target Ambition"}
            {step === 2 && "Configure Real Skill Matrix"}
            {step === 3 && "Attach Project Proof & Verification"}
          </h1>
        </div>

        <div style={{ display: 'flex', gap: '10px' }}>
          <button 
            onClick={onTryDemo}
            className="btn-demo"
            style={{ padding: '8px 16px', fontSize: '0.82rem' }}
            id="onboarding-try-demo-btn"
          >
            <Zap size={14} />
            <span>Load Sample AI Profile</span>
          </button>
          <button 
            onClick={onCancel}
            className="btn-secondary"
            style={{ padding: '8px 16px', fontSize: '0.82rem' }}
          >
            Cancel
          </button>
        </div>
      </div>

      {/* 3-Step Interactive Stepper Bar */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px', marginBottom: '32px' }}>
        {[
          { num: 1, label: "Identity & Target Role", desc: "Select career path" },
          { num: 2, label: "Skill Inventory", desc: "Add current capabilities" },
          { num: 3, label: "Project Evidence", desc: "Code proof & repos" }
        ].map((s) => (
          <div 
            key={s.num}
            onClick={() => setStep(s.num)}
            style={{
              background: step === s.num ? 'rgba(139, 92, 246, 0.16)' : 'rgba(255, 255, 255, 0.03)',
              border: step === s.num ? '1px solid #8b5cf6' : '1px solid rgba(255, 255, 255, 0.08)',
              borderRadius: '12px',
              padding: '12px 16px',
              cursor: 'pointer',
              transition: 'all 0.2s ease'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <div style={{
                width: '24px',
                height: '24px',
                borderRadius: '50%',
                background: step === s.num ? '#8b5cf6' : (step > s.num ? '#10b981' : 'rgba(255, 255, 255, 0.1)'),
                color: '#ffffff',
                fontSize: '0.74rem',
                fontWeight: 700,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                {step > s.num ? <Check size={13} /> : s.num}
              </div>
              <div>
                <div style={{ fontSize: '0.86rem', fontWeight: 700, color: step === s.num ? '#ffffff' : 'var(--text-secondary)' }}>
                  {s.label}
                </div>
                <div style={{ fontSize: '0.72rem', color: 'var(--text-dim)' }}>
                  {s.desc}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Main Grid: Form Work Area on Left, Live Twin Preview Card on Right */}
      <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 0.6fr', gap: '28px', alignItems: 'start' }}>
        
        {/* LEFT WORK AREA */}
        <div className="glass-panel" style={{ padding: '28px' }}>

          {/* STEP 1: IDENTITY & TARGET ROLE CARDS */}
          {step === 1 && (
            <div>
              {/* Basic Fields */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '22px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '6px' }}>
                    Your Name *
                  </label>
                  <input 
                    type="text"
                    value={profile.name}
                    onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                    placeholder="e.g. Alex Chen"
                    style={{
                      width: '100%',
                      background: 'rgba(255, 255, 255, 0.05)',
                      border: '1px solid rgba(255, 255, 255, 0.12)',
                      borderRadius: '8px',
                      padding: '10px 14px',
                      color: '#ffffff',
                      fontSize: '0.9rem',
                      outline: 'none'
                    }}
                    id="input-user-name"
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '6px' }}>
                    Current Background / Degree
                  </label>
                  <input 
                    type="text"
                    value={profile.education}
                    onChange={(e) => setProfile({ ...profile, education: e.target.value })}
                    placeholder="e.g. B.S. Computer Science / Bootcamp"
                    style={{
                      width: '100%',
                      background: 'rgba(255, 255, 255, 0.05)',
                      border: '1px solid rgba(255, 255, 255, 0.12)',
                      borderRadius: '8px',
                      padding: '10px 14px',
                      color: '#ffffff',
                      fontSize: '0.9rem',
                      outline: 'none'
                    }}
                    id="input-user-education"
                  />
                </div>
              </div>

              {/* Status Selector Pills */}
              <div style={{ marginBottom: '24px' }}>
                <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '8px' }}>
                  Current Professional Stage
                </label>
                <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                  {['Student', 'Career Switcher', 'Junior Engineer', 'Mid / Senior Dev'].map((st) => (
                    <button
                      key={st}
                      type="button"
                      onClick={() => setProfile({ ...profile, status: st })}
                      style={{
                        background: profile.status === st ? 'rgba(139, 92, 246, 0.22)' : 'rgba(255, 255, 255, 0.04)',
                        border: profile.status === st ? '1px solid #8b5cf6' : '1px solid rgba(255, 255, 255, 0.08)',
                        color: profile.status === st ? '#ffffff' : 'var(--text-muted)',
                        padding: '7px 16px',
                        borderRadius: '8px',
                        fontSize: '0.82rem',
                        fontWeight: 600,
                        cursor: 'pointer',
                        transition: 'all 0.18s'
                      }}
                    >
                      {st}
                    </button>
                  ))}
                </div>
              </div>

              {/* TARGET CAREER CARDS (INTERACTIVE!) */}
              <div style={{ marginBottom: '24px' }}>
                <label style={{ display: 'block', fontSize: '0.86rem', fontWeight: 700, color: '#ffffff', marginBottom: '10px' }}>
                  Select Your Target Dream Role
                </label>
                
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '12px' }}>
                  {PRESET_CAREER_CARDS.map((card) => {
                    const isSelected = targetRole === card.role;
                    return (
                      <div
                        key={card.role}
                        onClick={() => setTargetRole(card.role)}
                        style={{
                          background: isSelected ? 'rgba(139, 92, 246, 0.14)' : 'rgba(255, 255, 255, 0.03)',
                          border: isSelected ? '1.5px solid #8b5cf6' : '1px solid rgba(255, 255, 255, 0.08)',
                          borderRadius: '12px',
                          padding: '14px',
                          cursor: 'pointer',
                          transition: 'all 0.2s ease',
                          boxShadow: isSelected ? '0 0 20px rgba(139, 92, 246, 0.25)' : 'none'
                        }}
                      >
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                          <span className="badge badge-cyan" style={{ fontSize: '0.64rem' }}>{card.demand}</span>
                          <span style={{ fontSize: '0.74rem', color: '#34d399', fontWeight: 700 }}>{card.medianSalary}</span>
                        </div>
                        <div style={{ fontSize: '0.94rem', fontWeight: 700, color: '#ffffff', marginBottom: '4px' }}>
                          {card.role}
                        </div>
                        <div style={{ fontSize: '0.76rem', color: 'var(--text-secondary)', marginBottom: '8px', lineHeight: 1.4 }}>
                          {card.description}
                        </div>
                        <div style={{ display: 'flex', gap: '4px', flexWrap: 'wrap' }}>
                          {card.coreSkills.slice(0, 3).map(sk => (
                            <span key={sk} style={{ fontSize: '0.66rem', color: 'var(--text-muted)', background: 'rgba(255, 255, 255, 0.06)', padding: '2px 6px', borderRadius: '4px' }}>
                              {sk}
                            </span>
                          ))}
                        </div>
                      </div>
                    );
                  })}

                  {/* Custom Role Card */}
                  <div
                    onClick={() => setTargetRole("Custom")}
                    style={{
                      background: targetRole === "Custom" ? 'rgba(139, 92, 246, 0.14)' : 'rgba(255, 255, 255, 0.03)',
                      border: targetRole === "Custom" ? '1.5px solid #8b5cf6' : '1px solid rgba(255, 255, 255, 0.08)',
                      borderRadius: '12px',
                      padding: '14px',
                      cursor: 'pointer',
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'center'
                    }}
                  >
                    <div style={{ fontSize: '0.92rem', fontWeight: 700, color: '#ffffff', marginBottom: '6px' }}>
                      Custom Target Role
                    </div>
                    {targetRole === "Custom" ? (
                      <input 
                        type="text"
                        value={customRole}
                        onChange={(e) => setCustomRole(e.target.value)}
                        placeholder="e.g. LLM Security Engineer"
                        style={{
                          background: 'rgba(255, 255, 255, 0.08)',
                          border: '1px solid #8b5cf6',
                          borderRadius: '6px',
                          padding: '6px 10px',
                          color: '#ffffff',
                          fontSize: '0.82rem',
                          outline: 'none'
                        }}
                      />
                    ) : (
                      <div style={{ fontSize: '0.76rem', color: 'var(--text-muted)' }}>
                        Define any specialized or niche career title
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Time Commitment Sliders */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                    <label style={{ fontSize: '0.82rem', fontWeight: 600, color: 'var(--text-secondary)' }}>Weekly Time Commitment</label>
                    <span style={{ fontSize: '0.86rem', fontWeight: 700, color: '#c4b5fd' }}>{weeklyHours} hrs / week</span>
                  </div>
                  <input 
                    type="range"
                    min="4"
                    max="40"
                    step="2"
                    value={weeklyHours}
                    onChange={(e) => setWeeklyHours(e.target.value)}
                    style={{ width: '100%', accentColor: '#8b5cf6' }}
                  />
                </div>

                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                    <label style={{ fontSize: '0.82rem', fontWeight: 600, color: 'var(--text-secondary)' }}>Target Timeline</label>
                    <span style={{ fontSize: '0.86rem', fontWeight: 700, color: '#38bdf8' }}>{timelineMonths} Months</span>
                  </div>
                  <input 
                    type="range"
                    min="1"
                    max="12"
                    value={timelineMonths}
                    onChange={(e) => setTimelineMonths(e.target.value)}
                    style={{ width: '100%', accentColor: '#06b6d4' }}
                  />
                </div>
              </div>
            </div>
          )}

          {/* STEP 2: INTERACTIVE SKILL MATRIX */}
          {step === 2 && (
            <div>
              <div style={{ marginBottom: '18px' }}>
                <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#ffffff', marginBottom: '4px' }}>
                  Select Skills You Currently Possess
                </h3>
                <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)' }}>
                  Click skill pills to toggle them into your SkillTwin. You can adjust proficiency level below.
                </p>
              </div>

              {/* Category Filter Chips */}
              <div style={{ display: 'flex', gap: '8px', marginBottom: '16px', flexWrap: 'wrap' }}>
                {Object.keys(PRESET_SKILL_CATEGORIES).map(cat => (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => setActiveSkillCategory(cat)}
                    style={{
                      background: activeSkillCategory === cat ? 'rgba(139, 92, 246, 0.25)' : 'rgba(255, 255, 255, 0.04)',
                      border: activeSkillCategory === cat ? '1px solid #8b5cf6' : '1px solid rgba(255, 255, 255, 0.08)',
                      color: activeSkillCategory === cat ? '#ffffff' : 'var(--text-muted)',
                      padding: '6px 14px',
                      borderRadius: '8px',
                      fontSize: '0.78rem',
                      fontWeight: 600,
                      cursor: 'pointer'
                    }}
                  >
                    {cat}
                  </button>
                ))}
              </div>

              {/* Preset Skills for Active Category */}
              <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '24px' }}>
                {PRESET_SKILL_CATEGORIES[activeSkillCategory].map(skillName => {
                  const isAdded = skills.some(s => s.name.toLowerCase() === skillName.toLowerCase());
                  return (
                    <button
                      key={skillName}
                      type="button"
                      onClick={() => handleTogglePresetSkill(skillName, activeSkillCategory)}
                      style={{
                        background: isAdded ? 'rgba(16, 185, 129, 0.18)' : 'rgba(255, 255, 255, 0.03)',
                        border: isAdded ? '1px solid #10b981' : '1px solid rgba(255, 255, 255, 0.1)',
                        color: isAdded ? '#34d399' : 'var(--text-secondary)',
                        padding: '6px 14px',
                        borderRadius: '9999px',
                        fontSize: '0.8rem',
                        fontWeight: 600,
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '6px',
                        transition: 'all 0.18s'
                      }}
                    >
                      {isAdded ? <Check size={13} /> : <Plus size={13} />}
                      <span>{skillName}</span>
                    </button>
                  );
                })}
              </div>

              {/* Add Custom Skill Row */}
              <div style={{ display: 'flex', gap: '10px', marginBottom: '28px' }}>
                <input 
                  type="text"
                  value={customSkillName}
                  onChange={(e) => setCustomSkillName(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleAddCustomSkill()}
                  placeholder="Or type custom skill (e.g., ChromaDB, Next.js, Redis)..."
                  style={{
                    flex: 1,
                    background: 'rgba(255, 255, 255, 0.05)',
                    border: '1px solid rgba(255, 255, 255, 0.12)',
                    borderRadius: '8px',
                    padding: '8px 14px',
                    color: '#ffffff',
                    fontSize: '0.85rem',
                    outline: 'none'
                  }}
                />
                <button
                  type="button"
                  onClick={handleAddCustomSkill}
                  className="btn-primary"
                  style={{ padding: '8px 16px', fontSize: '0.82rem' }}
                >
                  <Plus size={14} />
                  <span>Add</span>
                </button>
              </div>

              {/* Added Skills Config List */}
              <div style={{ borderTop: '1px solid rgba(255, 255, 255, 0.08)', paddingTop: '20px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                  <h4 style={{ fontSize: '0.9rem', fontWeight: 700, color: '#ffffff' }}>
                    Active Skills in Your Twin ({skills.length})
                  </h4>
                  <span style={{ fontSize: '0.74rem', color: 'var(--text-dim)' }}>Select level & evidence source</span>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', maxHeight: '280px', overflowY: 'auto' }}>
                  {skills.map((sk, idx) => (
                    <div 
                      key={sk.name + idx}
                      style={{
                        background: 'rgba(255, 255, 255, 0.03)',
                        border: '1px solid rgba(255, 255, 255, 0.07)',
                        borderRadius: '10px',
                        padding: '10px 14px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        gap: '12px'
                      }}
                    >
                      <div style={{ minWidth: '140px' }}>
                        <div style={{ fontWeight: 700, fontSize: '0.88rem', color: '#f8fafc' }}>{sk.name}</div>
                        <div style={{ fontSize: '0.7rem', color: 'var(--text-dim)' }}>{sk.category}</div>
                      </div>

                      {/* Level Selector */}
                      <select
                        value={sk.level}
                        onChange={(e) => handleUpdateSkill(idx, 'level', e.target.value)}
                        style={{
                          background: 'rgba(14, 18, 28, 0.9)',
                          border: '1px solid rgba(255, 255, 255, 0.12)',
                          color: '#38bdf8',
                          fontSize: '0.78rem',
                          borderRadius: '6px',
                          padding: '4px 8px',
                          outline: 'none'
                        }}
                      >
                        <option value="Beginner">Beginner</option>
                        <option value="Intermediate">Intermediate</option>
                        <option value="Advanced">Advanced</option>
                      </select>

                      {/* Source Selector */}
                      <select
                        value={sk.learning_source}
                        onChange={(e) => handleUpdateSkill(idx, 'learning_source', e.target.value)}
                        style={{
                          background: 'rgba(14, 18, 28, 0.9)',
                          border: '1px solid rgba(255, 255, 255, 0.12)',
                          color: '#cbd5e1',
                          fontSize: '0.78rem',
                          borderRadius: '6px',
                          padding: '4px 8px',
                          outline: 'none'
                        }}
                      >
                        <option value="Coursework">Academic / Course</option>
                        <option value="Self-Project">Personal Project</option>
                        <option value="Production Repo">Production / Work</option>
                      </select>

                      <button
                        type="button"
                        onClick={() => handleRemoveSkill(idx)}
                        style={{
                          background: 'transparent',
                          border: 'none',
                          color: '#f43f5e',
                          cursor: 'pointer',
                          padding: '4px'
                        }}
                        title="Remove skill"
                      >
                        <Trash2 size={15} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* STEP 3: PROJECT PROOF & EVIDENCE */}
          {step === 3 && (
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '18px' }}>
                <div>
                  <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#ffffff', marginBottom: '4px' }}>
                    Project Deliverables & Repository Proof
                  </h3>
                  <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)' }}>
                    Our Evidence Graph Agent extracts tangible skill verification from real project deliverables.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={handleQuickLoadSampleProject}
                  className="btn-demo"
                  style={{ padding: '6px 14px', fontSize: '0.76rem' }}
                >
                  <span>Quick-Fill Sample Project</span>
                </button>
              </div>

              {projects.map((proj, idx) => (
                <div 
                  key={idx}
                  style={{
                    background: 'rgba(255, 255, 255, 0.025)',
                    border: '1px solid rgba(255, 255, 255, 0.08)',
                    borderRadius: '12px',
                    padding: '18px',
                    marginBottom: '16px'
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                    <span style={{ fontSize: '0.82rem', fontWeight: 700, color: '#c4b5fd' }}>
                      Project #{idx + 1}
                    </span>
                    {projects.length > 1 && (
                      <button
                        type="button"
                        onClick={() => handleRemoveProject(idx)}
                        style={{ background: 'transparent', border: 'none', color: '#f43f5e', cursor: 'pointer' }}
                      >
                        <Trash2 size={14} />
                      </button>
                    )}
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 0.8fr', gap: '14px', marginBottom: '12px' }}>
                    <div>
                      <label style={{ display: 'block', fontSize: '0.78rem', color: 'var(--text-muted)', marginBottom: '4px' }}>
                        Project Title *
                      </label>
                      <input 
                        type="text"
                        value={proj.name}
                        onChange={(e) => handleUpdateProject(idx, 'name', e.target.value)}
                        placeholder="e.g. Autonomous Multi-Source RAG Assistant"
                        style={{
                          width: '100%',
                          background: 'rgba(255, 255, 255, 0.05)',
                          border: '1px solid rgba(255, 255, 255, 0.1)',
                          borderRadius: '8px',
                          padding: '8px 12px',
                          color: '#ffffff',
                          fontSize: '0.85rem',
                          outline: 'none'
                        }}
                      />
                    </div>

                    <div>
                      <label style={{ display: 'block', fontSize: '0.78rem', color: 'var(--text-muted)', marginBottom: '4px' }}>
                        GitHub / Repo Link (Optional)
                      </label>
                      <input 
                        type="text"
                        value={proj.github_url}
                        onChange={(e) => handleUpdateProject(idx, 'github_url', e.target.value)}
                        placeholder="https://github.com/..."
                        style={{
                          width: '100%',
                          background: 'rgba(255, 255, 255, 0.05)',
                          border: '1px solid rgba(255, 255, 255, 0.1)',
                          borderRadius: '8px',
                          padding: '8px 12px',
                          color: '#ffffff',
                          fontSize: '0.85rem',
                          outline: 'none'
                        }}
                      />
                    </div>
                  </div>

                  <div style={{ marginBottom: '12px' }}>
                    <label style={{ display: 'block', fontSize: '0.78rem', color: 'var(--text-muted)', marginBottom: '4px' }}>
                      Technologies Used (Comma Separated) *
                    </label>
                    <input 
                      type="text"
                      value={proj.technologies}
                      onChange={(e) => handleUpdateProject(idx, 'technologies', e.target.value)}
                      placeholder="e.g. Python, FastAPI, ChromaDB, Gemini API, Docker"
                      style={{
                        width: '100%',
                        background: 'rgba(255, 255, 255, 0.05)',
                        border: '1px solid rgba(255, 255, 255, 0.1)',
                        borderRadius: '8px',
                        padding: '8px 12px',
                        color: '#38bdf8',
                        fontSize: '0.85rem',
                        outline: 'none'
                      }}
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '0.78rem', color: 'var(--text-muted)', marginBottom: '4px' }}>
                      Key Deliverables / Implementation Summary
                    </label>
                    <textarea 
                      value={proj.description}
                      onChange={(e) => handleUpdateProject(idx, 'description', e.target.value)}
                      placeholder="Describe what you built, architecture decisions, or benchmark outcomes..."
                      rows="2"
                      style={{
                        width: '100%',
                        background: 'rgba(255, 255, 255, 0.05)',
                        border: '1px solid rgba(255, 255, 255, 0.1)',
                        borderRadius: '8px',
                        padding: '8px 12px',
                        color: '#ffffff',
                        fontSize: '0.82rem',
                        outline: 'none',
                        resize: 'none'
                      }}
                    />
                  </div>
                </div>
              ))}

              <button
                type="button"
                onClick={handleAddProject}
                className="btn-secondary"
                style={{ width: '100%', padding: '10px', fontSize: '0.84rem' }}
              >
                <Plus size={15} />
                <span>Add Another Project Deliverable</span>
              </button>
            </div>
          )}

          {/* Stepper Bottom Controls */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '32px', borderTop: '1px solid rgba(255, 255, 255, 0.08)', paddingTop: '20px' }}>
            {step > 1 ? (
              <button
                type="button"
                onClick={() => setStep(step - 1)}
                className="btn-secondary"
                style={{ padding: '9px 18px', fontSize: '0.84rem' }}
              >
                <ArrowLeft size={15} />
                <span>Back</span>
              </button>
            ) : <div />}

            {step < 3 ? (
              <button
                type="button"
                onClick={() => setStep(step + 1)}
                className="btn-primary"
                style={{ padding: '10px 22px', fontSize: '0.88rem' }}
              >
                <span>Continue</span>
                <ArrowRight size={16} />
              </button>
            ) : (
              <button
                type="button"
                onClick={handleFinalSubmit}
                className="btn-primary"
                style={{ padding: '12px 28px', fontSize: '0.94rem' }}
                id="submit-skilltwin-btn"
              >
                <Sparkles size={16} />
                <span>Generate My Real SkillTwin</span>
                <ArrowRight size={17} />
              </button>
            )}
          </div>
        </div>

        {/* RIGHT SIDE: LIVE TWIN READINESS PREVIEW CARD */}
        <div className="glass-panel" style={{ padding: '24px', position: 'sticky', top: '24px', border: '1px solid rgba(139, 92, 246, 0.3)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '14px' }}>
            <span className="live-pulse"></span>
            <span style={{ fontSize: '0.74rem', color: '#c4b5fd', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.04em' }}>
              Live Readiness Model
            </span>
          </div>

          <div style={{ fontSize: '1.25rem', fontWeight: 800, color: '#ffffff', marginBottom: '2px' }}>
            {profile.name.trim() ? profile.name : "Your SkillTwin"}
          </div>
          <div style={{ fontSize: '0.82rem', color: '#38bdf8', fontWeight: 600, marginBottom: '16px' }}>
            Target: {targetRole === "Custom" ? (customRole || "Specialized Engineer") : targetRole}
          </div>

          {/* Quick Metrics */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginBottom: '18px' }}>
            <div style={{ background: 'rgba(255, 255, 255, 0.03)', borderRadius: '10px', padding: '10px' }}>
              <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>Inventory Count</div>
              <div style={{ fontSize: '1.1rem', fontWeight: 800, color: '#34d399' }}>{skills.length} Skills</div>
            </div>
            <div style={{ background: 'rgba(255, 255, 255, 0.03)', borderRadius: '10px', padding: '10px' }}>
              <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>Weekly Pace</div>
              <div style={{ fontSize: '1.1rem', fontWeight: 800, color: '#fbbf24' }}>{weeklyHours} hrs</div>
            </div>
          </div>

          {/* Skills Breakdown Tags */}
          <div style={{ marginBottom: '18px' }}>
            <div style={{ fontSize: '0.74rem', color: 'var(--text-muted)', marginBottom: '8px' }}>
              Mapped Competencies:
            </div>
            <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
              {skills.slice(0, 6).map(sk => (
                <span key={sk.name} style={{
                  background: 'rgba(139, 92, 246, 0.12)',
                  border: '1px solid rgba(139, 92, 246, 0.25)',
                  color: '#c4b5fd',
                  fontSize: '0.7rem',
                  padding: '2px 8px',
                  borderRadius: '6px',
                  fontWeight: 600
                }}>
                  {sk.name}
                </span>
              ))}
              {skills.length > 6 && (
                <span style={{ fontSize: '0.7rem', color: 'var(--text-dim)', alignSelf: 'center' }}>
                  +{skills.length - 6} more
                </span>
              )}
            </div>
          </div>

          {/* 6-Agent Guarantee */}
          <div style={{
            background: 'rgba(16, 185, 129, 0.06)',
            border: '1px solid rgba(16, 185, 129, 0.2)',
            borderRadius: '10px',
            padding: '12px',
            fontSize: '0.76rem',
            color: '#cbd5e1',
            lineHeight: 1.4
          }}>
            <div style={{ fontWeight: 700, color: '#34d399', marginBottom: '2px' }}>
              Autonomous 6-Agent Pipeline:
            </div>
            Extracts evidence, benchmarks live market role requirements, and delivers your actionable Next Best Move.
          </div>
        </div>
      </div>
    </div>
  );
}
