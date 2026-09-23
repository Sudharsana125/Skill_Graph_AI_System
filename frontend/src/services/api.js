/**
 * SkillTwin AI — API Client Service.
 * Connects React frontend with the FastAPI multi-agent backend.
 */

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:8000';

export async function fetchHealth() {
  const res = await fetch(`${API_BASE}/health`);
  if (!res.ok) throw new Error('Backend offline');
  return res.json();
}

export const DEFAULT_SUDHARSANA_PROFILE = {
  user_id: "demo_sudharsana_ai_engineer",
  name: "Sudharsana",
  status: "Student",
  education: "B.S. Computer Science & AI",
  target_role: "AI Engineer",
  alignment_score: 68.0,
  weekly_hours: 10,
  timeline_months: 5,
  preferred_industry: "AI / Machine Learning",
  skills: [
    { name: "Python", category: "Programming", level: "Advanced", confidence: 0.85, evidence: ["Intelligent RAG Chatbot Engine"] },
    { name: "Machine Learning", category: "AI / ML", level: "Intermediate", confidence: 0.75, evidence: ["Predictive ML Analytics Platform"] },
    { name: "RAG", category: "AI / ML", level: "Intermediate", confidence: 0.78, evidence: ["Vector embeddings chunking"] },
    { name: "LLMs", category: "AI / ML", level: "Intermediate", confidence: 0.72, evidence: ["Gemini API integration"] },
    { name: "FastAPI", category: "Development", level: "Beginner", confidence: 0.65, evidence: ["Async API endpoints"] },
    { name: "SQL", category: "Data", level: "Intermediate", confidence: 0.80, evidence: ["University Coursework"] },
    { name: "System Design", category: "Architecture", level: "Beginner", confidence: 0.50, evidence: ["Self-learning"] }
  ],
  high_priority_gaps: [
    { skill_name: "Docker & Containerization", category: "MLOps", current_level: "None", required_level: "Intermediate", gap_level: 2, priority: "HIGH", reason: "Mandatory for containerized AI deployment." },
    { skill_name: "Vector Databases (ChromaDB/Pinecone)", category: "AI / ML", current_level: "Beginner", required_level: "Advanced", gap_level: 2, priority: "HIGH", reason: "Core foundation for enterprise RAG retrieval." },
    { skill_name: "System Design for AI", category: "Architecture", current_level: "Beginner", required_level: "Intermediate", gap_level: 1, priority: "HIGH", reason: "High-throughput microservices for LLMs." },
    { skill_name: "PyTorch Deep Learning", category: "AI / ML", current_level: "Beginner", required_level: "Advanced", gap_level: 2, priority: "HIGH", reason: "Fine-tuning embedding models and transformers." }
  ],
  next_best_move: {
    task_id: 1,
    action_type: "project_build",
    title: "Complete RAG Chatbot Project",
    target_skill: "RAG",
    why_now: "This project will improve multiple skills and bring you closer to your goal.",
    skills_improved: ["Python", "LLMs", "RAG", "FastAPI"],
    estimated_effort: "4 days",
    closes_gaps: "3 skill gaps",
    difficulty: "Medium",
    practical_instruction: "Implement semantic chunking with ChromaDB vector store and FastAPI async streaming.",
    verification_deliverable: "End-to-end question answering pipeline verified with benchmark citations."
  },
  evidence_graph: [
    {
      skill_name: "Python",
      category: "Programming",
      tier: "VERIFIED",
      strength_score: 85,
      strength_label: "Strong",
      confidence: 0.85,
      evidence_sources: [
        { source_type: "resume", title: "Resume", detail: "2 mentions across coursework & portfolio", verified: true },
        { source_type: "project", title: "Projects", detail: "3 repositories including RAG engine and ML analytics", verified: true },
        { source_type: "assessment", title: "Assessments", detail: "1 completed practical coding challenge", verified: true },
        { source_type: "learning", title: "Learning", detail: "2 courses verified on asynchronous programming", verified: true }
      ],
      explainability_note: "Verified through practical code deliverables and completed roadmap milestones."
    }
  ],
  transferable_skills: [
    { source_skill: "Python", target_skill: "Data Analysis", transfer_grade: "Strongly transferable", relevance_percentage: 85, explanation: "Core syntax, loops, and data structures map directly into data wrangling.", learning_time_reduction: "70% reduction in fundamentals" },
    { source_skill: "Excel", target_skill: "Data Visualization", transfer_grade: "Transferable", relevance_percentage: 75, explanation: "Formula logic, pivoting, and charting principles directly translate into BI dashboards.", learning_time_reduction: "50% reduction in basics" },
    { source_skill: "Communication", target_skill: "Project Management", transfer_grade: "Transferable", relevance_percentage: 70, explanation: "Cross-functional stakeholder coordination and clarity map to agile leadership.", learning_time_reduction: "45% reduction in onboarding" },
    { source_skill: "Problem Solving", target_skill: "Machine Learning", transfer_grade: "Partially transferable", relevance_percentage: 60, explanation: "Algorithmic thinking and analytical debugging aid feature engineering.", learning_time_reduction: "35% reduction in conceptual training" }
  ],
  opportunities: [
    { role: "AI Intern", company: "TechCorp", type: "Internship", location: "Remote", match_score: 94 },
    { role: "Data Analyst", company: "DataWorks", type: "Internship", location: "On-site", match_score: 88 },
    { role: "ML Project Contributor", company: "Open Source", type: "Volunteer", location: "Remote", match_score: 85 }
  ],
  evolution_timeline: [
    { trigger_event: "Initial Evaluation", skill_name: "Python", previous_level: "Beginner", new_level: "Growing", previous_confidence: 0.4, new_confidence: 0.85, unlocked_capabilities: "Async APIs & vector search", remaining_gaps_count: 4, alignment_score_after: 68.0 }
  ],
  roadmap: [
    { id: 1, phase_number: 1, phase_name: "Phase 1: High-Performance Vector & RAG Foundations", week_label: "Week 1-2", skill_name: "RAG & Vector Stores", why_it_matters: "Crucial for modern AI Engineer workloads.", learning_objective: "Master vector search indexing and chunking strategies.", suggested_task: "Complete RAG Chatbot Project", practical_exercise: "Build an asynchronous FastAPI service querying ChromaDB with hybrid BM25 filtering.", estimated_hours: 10, completion_criteria: "Deploy a working endpoint passing integration tests.", is_completed: false },
    { id: 2, phase_number: 2, phase_name: "Phase 2: LLM Evaluation & Agent Loops", week_label: "Week 3-4", skill_name: "AI Agents", why_it_matters: "Autonomous systems are in high industry demand.", learning_objective: "Implement state machines and tool calling with LangGraph.", suggested_task: "Construct autonomous multi-step researcher", practical_exercise: "Create an agent that executes web queries and synthesizes reports.", estimated_hours: 12, completion_criteria: "Verified function calling schema execution.", is_completed: false },
    { id: 3, phase_number: 3, phase_name: "Phase 3: Production Deployment & Dockerization", week_label: "Week 5-6", skill_name: "Docker & MLOps", why_it_matters: "Enterprises require scalable microservices.", learning_objective: "Containerize multi-container AI systems.", suggested_task: "Containerize RAG Service with Docker Compose", practical_exercise: "Author production Dockerfile with multi-stage build and non-root execution.", estimated_hours: 10, completion_criteria: "Passing CI container image build.", is_completed: false }
  ],
  project_recommendations: [
    { id: 1, title: "Enterprise RAG Intelligence Engine", problem: "Inefficient internal document discovery across unstructured PDFs.", skills_developed: "Python, FastAPI, RAG, ChromaDB, Docker", difficulty: "Intermediate", estimated_duration: "2-3 weeks", expected_outcome: "Fully functional semantic search API with source verification.", why_matches_gaps: "Addresses critical gaps in vector databases and asynchronous service design." },
    { id: 2, title: "Autonomous Multi-Agent Career Copilot", problem: "Static career roadmaps fail to adjust to live learner progress.", skills_developed: "AI Agents, LangGraph, Python, System Design", difficulty: "Advanced", estimated_duration: "3-4 weeks", expected_outcome: "Self-correcting agent loop that recalibrates milestone pacing dynamically.", why_matches_gaps: "Proves systems engineering and autonomous agent architecture mastery." }
  ],
  job_market_frequencies: [
    { skill: "Python", frequency: 95, sample_size: 1500 },
    { skill: "Machine Learning", frequency: 88, sample_size: 1500 },
    { skill: "RAG & Vector Search", frequency: 82, sample_size: 1500 },
    { skill: "FastAPI / APIs", frequency: 76, sample_size: 1500 },
    { skill: "Docker & Containerization", frequency: 72, sample_size: 1500 },
    { skill: "System Design", frequency: 65, sample_size: 1500 }
  ],
  market_note: "Based on 1,500+ analyzed AI Engineer and Machine Learning positions across tech hubs in 2026."
};

export async function fetchDemoSkillTwin() {
  try {
    const res = await fetch(`${API_BASE}/api/demo`);
    if (!res.ok) {
      return DEFAULT_SUDHARSANA_PROFILE;
    }
    const json = await res.json();
    return json;
  } catch (err) {
    console.warn("Backend demo fetch fallback to local profile:", err);
    return DEFAULT_SUDHARSANA_PROFILE;
  }
}

export async function fetchDashboard(userId) {
  const res = await fetch(`${API_BASE}/api/dashboard/${userId}`);
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.detail || 'Failed to fetch dashboard state');
  }
  return res.json();
}

export async function analyzeSkillTwin(payload) {
  const res = await fetch(`${API_BASE}/api/analyze`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.detail || 'Agent pipeline analysis failed');
  }
  return res.json();
}

export async function updateTaskProgress(userId, taskId, isCompleted = true) {
  const res = await fetch(`${API_BASE}/api/progress/update`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      user_id: userId,
      task_id: taskId,
      is_completed: isCompleted
    })
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.detail || 'Progress recalibration failed');
  }
  return res.json();
}

export async function sendAssistantMessage(userId, message) {
  const res = await fetch(`${API_BASE}/api/assistant/chat`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      user_id: userId,
      message: message
    })
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.detail || 'Assistant query failed');
  }
  return res.json();
}

export async function simulateWhatIf(userId, targetCareers = null) {
  const res = await fetch(`${API_BASE}/api/simulator/what-if`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      user_id: userId,
      target_careers: targetCareers
    })
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.detail || 'What-If simulation failed');
  }
  return res.json();
}

export async function logEvolutionEvent(userId, eventData) {
  const res = await fetch(`${API_BASE}/api/evolution/event?user_id=${userId}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(eventData)
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.detail || 'Logging evolution event failed');
  }
  return res.json();
}

export async function liveAddSkill(userId, skillData) {
  const res = await fetch(`${API_BASE}/api/profile/add-skill`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      user_id: userId,
      name: skillData.name,
      category: skillData.category || "General",
      level: skillData.level || "Intermediate",
      learning_source: skillData.learning_source || "Live Real-Time Input"
    })
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.detail || 'Adding live skill failed');
  }
  return res.json();
}

export async function liveSwitchRole(userId, newRole) {
  const res = await fetch(`${API_BASE}/api/profile/switch-role`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      user_id: userId,
      target_role: newRole
    })
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.detail || 'Switching target role failed');
  }
  return res.json();
}

export async function liveAddProject(userId, projectData) {
  const res = await fetch(`${API_BASE}/api/profile/add-project`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      user_id: userId,
      ...projectData
    })
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.detail || 'Adding live project failed');
  }
  return res.json();
}
