"""
Profile & Individual SkillTwin Data Access Endpoints:
POST /profile
GET /skills/{user_id}
GET /roadmap/{user_id}
"""
from typing import List, Optional
from pydantic import BaseModel
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select

from backend.app.database.session import get_db
from backend.app.database.models import User, Profile, Skill, Project, RoadmapTask
from backend.app.schemas.schemas import (
    ProfileInput,
    SkillInput,
    ProjectInput,
    AnalysisRequest,
    AnalyzedSkill,
    RoadmapTaskSchema,
    DashboardResponse
)
from backend.app.agents.orchestrator import orchestrator

router = APIRouter(tags=["Profile"])



@router.post("/profile")
async def create_or_update_profile(
    profile_data: ProfileInput,
    user_id: str = "default_user",
    db: AsyncSession = Depends(get_db)
):
    """Save or update user base profile."""
    user_res = await db.execute(select(User).where(User.id == user_id))
    user = user_res.scalar_one_or_none()
    if not user:
        user = User(id=user_id, name=profile_data.name)
        db.add(user)
        await db.flush()

    prof_res = await db.execute(select(Profile).where(Profile.user_id == user_id))
    prof = prof_res.scalar_one_or_none()
    if not prof:
        prof = Profile(user_id=user_id, target_role=profile_data.target_role)
        db.add(prof)

    prof.education = profile_data.education
    prof.status = profile_data.status
    prof.experience_years = profile_data.experience_years
    prof.summary = profile_data.summary
    prof.target_role = profile_data.target_role
    prof.weekly_hours = profile_data.weekly_hours
    prof.target_timeline_months = profile_data.target_timeline_months
    prof.preferred_industry = profile_data.preferred_industry
    prof.preferred_location = profile_data.preferred_location

    await db.commit()
    return {"status": "success", "user_id": user_id, "message": "Profile updated successfully."}


@router.get("/skills/{user_id}", response_model=List[AnalyzedSkill])
async def get_user_skills(user_id: str, db: AsyncSession = Depends(get_db)):
    """Fetch analyzed skills for a specific user."""
    skills_res = await db.execute(select(Skill).where(Skill.user_id == user_id))
    records = skills_res.scalars().all()
    output = []
    for s in records:
        evidence = []
        if s.evidence_json:
            try:
                evidence = json.loads(s.evidence_json)
            except Exception:
                evidence = [s.evidence_json]
        output.append(
            AnalyzedSkill(
                name=s.name,
                category=s.category,
                level=s.verified_level,
                confidence=s.confidence,
                evidence=evidence
            )
        )
    return output


@router.get("/roadmap/{user_id}", response_model=List[RoadmapTaskSchema])
async def get_user_roadmap(user_id: str, db: AsyncSession = Depends(get_db)):
    """Fetch roadmap milestones for a specific user."""
    tasks_res = await db.execute(
        select(RoadmapTask)
        .where(RoadmapTask.user_id == user_id)
        .order_by(RoadmapTask.phase_number, RoadmapTask.id)
    )
    records = tasks_res.scalars().all()
    return [
        RoadmapTaskSchema(
            id=t.id,
            phase_number=t.phase_number,
            phase_name=t.phase_name,
            week_label=t.week_label,
            skill_name=t.skill_name,
            why_it_matters=t.why_it_matters or "",
            learning_objective=t.learning_objective,
            suggested_task=t.suggested_task,
            practical_exercise=t.practical_exercise,
            estimated_hours=t.estimated_hours,
            completion_criteria=t.completion_criteria or "",
            is_completed=t.is_completed
        )
        for t in records
    ]


class LiveAddSkillRequest(BaseModel):
    user_id: str
    name: str
    category: Optional[str] = "General"
    level: Optional[str] = "Intermediate"
    learning_source: Optional[str] = "Live Real-Time Input"


class LiveSwitchRoleRequest(BaseModel):
    user_id: str
    target_role: str


class LiveAddProjectRequest(BaseModel):
    user_id: str
    name: str
    description: str
    technologies: str
    role: Optional[str] = "Lead Developer"
    github_url: Optional[str] = None
    user_contribution: Optional[str] = None


@router.post("/profile/add-skill", response_model=DashboardResponse)
async def live_add_skill(
    req: LiveAddSkillRequest,
    db: AsyncSession = Depends(get_db)
):
    """Add a skill in real-time and dynamically re-run the 6-agent calibration."""
    # 1. Fetch user & profile
    user_res = await db.execute(select(User).where(User.id == req.user_id))
    user = user_res.scalar_one_or_none()
    if not user:
        raise HTTPException(status_code=404, detail="User profile not found")

    prof_res = await db.execute(select(Profile).where(Profile.user_id == req.user_id))
    prof = prof_res.scalar_one_or_none()
    target_role = prof.target_role if prof else "AI Engineer"

    # 2. Fetch existing skills
    skills_res = await db.execute(select(Skill).where(Skill.user_id == req.user_id))
    skills_records = skills_res.scalars().all()
    skills_list = [
        SkillInput(
            name=s.name,
            category=s.category or "General",
            level=s.verified_level or "Intermediate",
            learning_source=s.learning_source or "Self-learning"
        )
        for s in skills_records
    ]

    # Check if skill already exists; if so, update level, otherwise append
    existing = next((s for s in skills_list if s.name.lower() == req.name.lower()), None)
    if existing:
        existing.level = req.level or "Intermediate"
        existing.category = req.category or existing.category
    else:
        skills_list.append(
            SkillInput(
                name=req.name.strip(),
                category=req.category or "General",
                level=req.level or "Intermediate",
                learning_source=req.learning_source or "Live Real-Time Input"
            )
        )

    # 3. Fetch existing projects
    proj_res = await db.execute(select(Project).where(Project.user_id == req.user_id))
    proj_records = proj_res.scalars().all()
    projects_list = [
        ProjectInput(
            name=p.name,
            description=p.description,
            technologies=p.technologies,
            role=p.role or "Developer",
            github_url=p.github_url,
            user_contribution=p.user_contribution
        )
        for p in proj_records
    ]

    # 4. Construct AnalysisRequest and re-execute pipeline
    profile_input = ProfileInput(
        name=user.name,
        education=prof.education if prof else "Technical Degree",
        status=prof.status if prof else "Professional",
        experience_years=prof.experience_years if prof else "1-2 years",
        summary=prof.summary if prof else "",
        target_role=target_role,
        weekly_hours=prof.weekly_hours if prof else 10,
        target_timeline_months=prof.target_timeline_months if prof else 3,
        preferred_industry=prof.preferred_industry if prof else "Technology / AI",
        preferred_location=prof.preferred_location if prof else "Remote / Global"
    )

    analysis_req = AnalysisRequest(
        profile=profile_input,
        skills=skills_list,
        projects=projects_list,
        user_id=req.user_id
    )

    return await orchestrator.execute_pipeline(analysis_req, db, user_id=req.user_id)


@router.post("/profile/switch-role", response_model=DashboardResponse)
async def live_switch_role(
    req: LiveSwitchRoleRequest,
    db: AsyncSession = Depends(get_db)
):
    """Switch target role dynamically and recalibrate gaps, alignment score, and roadmap."""
    user_res = await db.execute(select(User).where(User.id == req.user_id))
    user = user_res.scalar_one_or_none()
    if not user:
        raise HTTPException(status_code=404, detail="User profile not found")

    prof_res = await db.execute(select(Profile).where(Profile.user_id == req.user_id))
    prof = prof_res.scalar_one_or_none()

    skills_res = await db.execute(select(Skill).where(Skill.user_id == req.user_id))
    skills_records = skills_res.scalars().all()
    skills_list = [
        SkillInput(
            name=s.name,
            category=s.category or "General",
            level=s.verified_level or "Intermediate",
            learning_source=s.learning_source or "Self-learning"
        )
        for s in skills_records
    ]

    proj_res = await db.execute(select(Project).where(Project.user_id == req.user_id))
    proj_records = proj_res.scalars().all()
    projects_list = [
        ProjectInput(
            name=p.name,
            description=p.description,
            technologies=p.technologies,
            role=p.role or "Developer",
            github_url=p.github_url,
            user_contribution=p.user_contribution
        )
        for p in proj_records
    ]

    profile_input = ProfileInput(
        name=user.name,
        education=prof.education if prof else "Technical Degree",
        status=prof.status if prof else "Professional",
        experience_years=prof.experience_years if prof else "1-2 years",
        summary=prof.summary if prof else "",
        target_role=req.target_role.strip(),
        weekly_hours=prof.weekly_hours if prof else 10,
        target_timeline_months=prof.target_timeline_months if prof else 3,
        preferred_industry=prof.preferred_industry if prof else "Technology / AI",
        preferred_location=prof.preferred_location if prof else "Remote / Global"
    )

    analysis_req = AnalysisRequest(
        profile=profile_input,
        skills=skills_list,
        projects=projects_list,
        user_id=req.user_id
    )

    return await orchestrator.execute_pipeline(analysis_req, db, user_id=req.user_id)


@router.post("/profile/add-project", response_model=DashboardResponse)
async def live_add_project(
    req: LiveAddProjectRequest,
    db: AsyncSession = Depends(get_db)
):
    """Add a new project in real-time, verifying evidence nodes and updating intelligence."""
    user_res = await db.execute(select(User).where(User.id == req.user_id))
    user = user_res.scalar_one_or_none()
    if not user:
        raise HTTPException(status_code=404, detail="User profile not found")

    prof_res = await db.execute(select(Profile).where(Profile.user_id == req.user_id))
    prof = prof_res.scalar_one_or_none()
    target_role = prof.target_role if prof else "AI Engineer"

    skills_res = await db.execute(select(Skill).where(Skill.user_id == req.user_id))
    skills_records = skills_res.scalars().all()
    skills_list = [
        SkillInput(
            name=s.name,
            category=s.category or "General",
            level=s.verified_level or "Intermediate",
            learning_source=s.learning_source or "Self-learning"
        )
        for s in skills_records
    ]

    proj_res = await db.execute(select(Project).where(Project.user_id == req.user_id))
    proj_records = proj_res.scalars().all()
    projects_list = [
        ProjectInput(
            name=p.name,
            description=p.description,
            technologies=p.technologies,
            role=p.role or "Developer",
            github_url=p.github_url,
            user_contribution=p.user_contribution
        )
        for p in proj_records
    ]

    # Append new project
    projects_list.append(
        ProjectInput(
            name=req.name.strip(),
            description=req.description.strip(),
            technologies=req.technologies.strip(),
            role=req.role or "Lead Developer",
            github_url=req.github_url,
            user_contribution=req.user_contribution or req.description
        )
    )

    profile_input = ProfileInput(
        name=user.name,
        education=prof.education if prof else "Technical Degree",
        status=prof.status if prof else "Professional",
        experience_years=prof.experience_years if prof else "1-2 years",
        summary=prof.summary if prof else "",
        target_role=target_role,
        weekly_hours=prof.weekly_hours if prof else 10,
        target_timeline_months=prof.target_timeline_months if prof else 3,
        preferred_industry=prof.preferred_industry if prof else "Technology / AI",
        preferred_location=prof.preferred_location if prof else "Remote / Global"
    )

    analysis_req = AnalysisRequest(
        profile=profile_input,
        skills=skills_list,
        projects=projects_list,
        user_id=req.user_id
    )

    return await orchestrator.execute_pipeline(analysis_req, db, user_id=req.user_id)

