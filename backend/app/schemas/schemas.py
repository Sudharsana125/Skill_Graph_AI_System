"""
Pydantic Schemas for validation across SkillTwin AI endpoints and Multi-Agent outputs.
"""
from datetime import datetime
from typing import List, Optional, Any, Dict
from pydantic import BaseModel, Field


class SkillInput(BaseModel):
    name: str
    category: str = "General"
    level: str = "Beginner"  # Beginner, Intermediate, Advanced
    learning_source: Optional[str] = "Self-learning"  # Course, Project, Internship, Self-learning, Work experience


class ProjectInput(BaseModel):
    name: str
    description: str
    technologies: str  # Comma-separated or string of tech
    role: Optional[str] = "Sole Developer"
    github_url: Optional[str] = None
    user_contribution: Optional[str] = None


class ProfileInput(BaseModel):
    name: str
    education: Optional[str] = "Computer Science Student"
    status: Optional[str] = "Student"
    experience_years: Optional[str] = "0-1 years"
    summary: Optional[str] = ""
    target_role: str = "AI Engineer"
    weekly_hours: int = Field(default=10, ge=1, le=80)
    target_timeline_months: int = Field(default=3, ge=1, le=24)
    preferred_industry: Optional[str] = "Technology / AI"
    preferred_location: Optional[str] = "Remote / Global"


class AnalysisRequest(BaseModel):
    profile: ProfileInput
    skills: List[SkillInput] = []
    projects: List[ProjectInput] = []
    user_id: Optional[str] = None



# Agent 1 Output Schema
class AnalyzedSkill(BaseModel):
    name: str
    category: str
    level: str  # Beginner, Intermediate, Advanced
    confidence: float  # 0.0 - 1.0 (estimated confidence based on evidence)
    evidence: List[str] = []


class ProfileAnalysisOutput(BaseModel):
    analyzed_skills: List[AnalyzedSkill]
    experience_summary: str
    verified_strengths: List[str] = []


# Agent 2 Output Schema
class CareerSkillRequirement(BaseModel):
    name: str
    category: str
    importance: str  # critical, high, medium
    target_level: str  # beginner, intermediate, advanced


class JobMarketStat(BaseModel):
    skill: str
    frequency: int  # percentage (e.g. 90)
    sample_size: int = 100


class CareerAnalysisOutput(BaseModel):
    target_role: str
    category: str
    description: str
    required_skills: List[CareerSkillRequirement]
    job_market_frequencies: List[JobMarketStat]
    market_note: str


# Agent 3 Output Schema
class SkillGapItem(BaseModel):
    skill_name: str
    category: str
    current_level: str
    required_level: str
    gap_level: str  # High, Medium, Low, None
    priority: str   # HIGH, MEDIUM, LOW, STRONG
    reason: str


class SkillGapAnalysisOutput(BaseModel):
    alignment_score: float  # 0 to 100 percentage
    alignment_disclaimer: str = "Skill alignment based on the selected target-role requirements."
    high_priority_gaps: List[SkillGapItem] = []
    medium_priority_gaps: List[SkillGapItem] = []
    low_priority_gaps: List[SkillGapItem] = []
    strong_areas: List[SkillGapItem] = []
    all_gaps: List[SkillGapItem] = []


# Agent 4 Output Schema
class RoadmapTaskSchema(BaseModel):
    id: Optional[int] = None
    phase_number: int
    phase_name: str
    week_label: str
    skill_name: str
    why_it_matters: str
    learning_objective: str
    suggested_task: str
    practical_exercise: str
    estimated_hours: int = 10
    completion_criteria: str
    is_completed: bool = False


class RoadmapOutput(BaseModel):
    phases: List[RoadmapTaskSchema]


# Agent 5 Output Schema
class ProjectRecommendationSchema(BaseModel):
    id: Optional[int] = None
    title: str
    problem: str
    skills_developed: str
    difficulty: str
    estimated_duration: str
    expected_outcome: str
    why_matches_gaps: str
    is_added_to_roadmap: bool = False


class ProjectRecommendationOutput(BaseModel):
    recommendations: List[ProjectRecommendationSchema]


# Feature 1: SkillTwin Evolution Engine
class EvolutionEventSchema(BaseModel):
    id: Optional[int] = None
    trigger_event: str
    skill_name: str
    previous_level: str
    new_level: str
    previous_confidence: float = 0.5
    new_confidence: float = 0.7
    unlocked_capabilities: Optional[str] = None
    remaining_gaps_count: int = 0
    alignment_score_after: float = 0.0
    created_at: Optional[datetime] = None


# Feature 2: Career What-If Simulator
class WhatIfCareerResultSchema(BaseModel):
    career_role: str
    category: str
    description: str
    alignment_score: float
    matching_skills_count: int
    matching_skills: List[str]
    transferable_skills_count: int
    transferable_skills: List[str]
    missing_critical_gaps: List[str]
    estimated_timeline_months: int
    recommended_focus: str
    project_suggestion: str


class WhatIfRequest(BaseModel):
    user_id: str
    target_careers: Optional[List[str]] = None


# Feature 3: Skill Transfer Intelligence
class TransferableSkillSchema(BaseModel):
    existing_skill: str
    target_requirement: str
    transferability_grade: str
    why_it_transfers: str
    effort_reduction_pct: int
    learning_tip: str


# Feature 4: Next-Best-Move Engine
class NextBestMoveSchema(BaseModel):
    task_id: Optional[int] = None
    action_type: str
    title: str
    target_skill: str
    why_now: str
    skills_improved: List[str]
    estimated_effort: str
    impact_summary: str
    practical_instruction: str
    verification_deliverable: str


# Feature 5: Skill Evidence Graph
class EvidenceSourceNodeSchema(BaseModel):
    source_type: str
    title: str
    detail: str
    verified: bool


class SkillEvidenceItemSchema(BaseModel):
    skill_name: str
    category: str
    tier: str
    strength_score: int
    strength_label: str
    confidence: float
    evidence_sources: List[EvidenceSourceNodeSchema]
    explainability_note: str


class OpportunityItem(BaseModel):
    role: str
    company: str
    type: str
    location: str
    match_score: Optional[int] = 88


# Full SkillTwin Dashboard Payload
class DashboardResponse(BaseModel):
    user_id: str
    name: str
    education: Optional[str]
    status: Optional[str]
    target_role: str
    alignment_score: float
    alignment_disclaimer: str = "Skill alignment based on the selected target-role requirements."
    weekly_hours: int
    timeline_months: int
    preferred_industry: Optional[str]
    skills: List[AnalyzedSkill]
    gaps: List[SkillGapItem]
    high_priority_gaps: List[SkillGapItem]
    medium_priority_gaps: List[SkillGapItem]
    strong_areas: List[SkillGapItem]
    roadmap: List[RoadmapTaskSchema]
    project_recommendations: List[ProjectRecommendationSchema]
    job_market_frequencies: List[JobMarketStat]
    market_note: str
    next_best_move: Optional[NextBestMoveSchema] = None
    evidence_graph: List[SkillEvidenceItemSchema] = []
    transferable_skills: List[TransferableSkillSchema] = []
    evolution_timeline: List[EvolutionEventSchema] = []
    opportunities: List[OpportunityItem] = []


# Agent 6 Progress Update Schema
class ProgressUpdateRequest(BaseModel):
    user_id: str
    task_id: int
    is_completed: bool = True


class ProgressUpdateResponse(BaseModel):
    success: bool
    user_id: str
    task_id: int
    is_completed: bool
    updated_skill_name: str
    new_skill_confidence: float
    new_alignment_score: float
    remaining_gaps_count: int
    next_suggested_task: Optional[str] = None
    message: str


# Assistant Chat
class AssistantChatRequest(BaseModel):
    user_id: str
    message: str


class AssistantChatResponse(BaseModel):
    reply: str
    suggested_action: Optional[str] = None
