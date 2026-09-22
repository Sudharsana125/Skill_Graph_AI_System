"""
Analysis API endpoints executing the multi-agent pipeline and sub-agents:
POST /analyze
POST /career/analyze
POST /skills/gap
POST /roadmap
POST /projects/recommend
"""
from typing import List
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from pydantic import BaseModel

from backend.app.database.session import get_db
from backend.app.schemas.schemas import (
    AnalysisRequest,
    DashboardResponse,
    CareerAnalysisOutput,
    SkillGapAnalysisOutput,
    RoadmapOutput,
    ProjectRecommendationOutput,
    AnalyzedSkill,
    CareerSkillRequirement,
    SkillGapItem,
    ProfileInput
)
from backend.app.agents.orchestrator import orchestrator
from backend.app.agents.career_analyzer import career_analyzer_agent
from backend.app.agents.skill_gap_analyzer import skill_gap_analyzer_agent
from backend.app.agents.roadmap_agent import roadmap_agent
from backend.app.agents.project_recommender import project_recommender_agent

router = APIRouter(tags=["Analysis"])


class CareerAnalyzeRequest(BaseModel):
    target_role: str


class SkillGapRequest(BaseModel):
    current_skills: List[AnalyzedSkill]
    required_skills: List[CareerSkillRequirement]


class RoadmapRequest(BaseModel):
    profile: ProfileInput
    gaps: List[SkillGapItem]


class ProjectRecommendRequest(BaseModel):
    target_role: str
    gaps: List[SkillGapItem]


@router.post("/analyze", response_model=DashboardResponse)
async def analyze_full_profile(
    request: AnalysisRequest,
    db: AsyncSession = Depends(get_db)
):
    """Executes the complete 6-Agent pipeline from profile to actionable SkillTwin."""
    try:
        return await orchestrator.execute_pipeline(request, db, user_id=request.user_id)
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Pipeline analysis error: {str(e)}")



@router.post("/career/analyze", response_model=CareerAnalysisOutput)
async def analyze_career(request: CareerAnalyzeRequest):
    """Agent 2 standalone: Analyze benchmark requirements for target career."""
    return career_analyzer_agent.analyze(request.target_role)


@router.post("/skills/gap", response_model=SkillGapAnalysisOutput)
async def analyze_skill_gap(request: SkillGapRequest):
    """Agent 3 standalone: Compare verified skills against target career requirements."""
    return skill_gap_analyzer_agent.analyze(request.current_skills, request.required_skills)


@router.post("/roadmap", response_model=RoadmapOutput)
async def generate_roadmap(request: RoadmapRequest):
    """Agent 4 standalone: Generate personalized 5-phase practical roadmap."""
    return roadmap_agent.generate(request.profile, request.gaps)


@router.post("/projects/recommend", response_model=ProjectRecommendationOutput)
async def recommend_projects(request: ProjectRecommendRequest):
    """Agent 5 standalone: Recommend targeted projects to close skill gaps."""
    return project_recommender_agent.recommend(request.target_role, request.gaps)
