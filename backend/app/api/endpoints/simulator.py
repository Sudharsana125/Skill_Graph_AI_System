"""
SkillTwin AI — Simulator and Evolution Endpoints:
POST /simulator/what-if
POST /evolution/event
"""
from typing import List
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select

from backend.app.database.session import get_db
from backend.app.database.models import User, Profile, Skill, SkillEvolution
from backend.app.schemas.schemas import (
    WhatIfRequest,
    WhatIfCareerResultSchema,
    EvolutionEventSchema
)
from backend.app.agents.what_if_agent import what_if_agent

router = APIRouter(tags=["Simulator & Evolution"])


@router.post("/simulator/what-if", response_model=List[WhatIfCareerResultSchema])
async def simulate_what_if_careers(
    request: WhatIfRequest,
    db: AsyncSession = Depends(get_db)
):
    """
    Feature 2: Career What-If Simulator.
    Simulates readiness across alternative career pathways against the exact same current SkillTwin.
    """
    user_res = await db.execute(select(User).where(User.id == request.user_id))
    user = user_res.scalar_one_or_none()
    if not user:
        raise HTTPException(status_code=404, detail="User SkillTwin profile not found.")

    # Fetch skills
    skills_res = await db.execute(select(Skill).where(Skill.user_id == request.user_id))
    skills = skills_res.scalars().all()

    # Fetch profile for weekly hours
    prof_res = await db.execute(select(Profile).where(Profile.user_id == request.user_id))
    profile = prof_res.scalar_one_or_none()
    weekly_hours = profile.weekly_hours if profile else 10

    results = what_if_agent.simulate_careers(
        current_skills=skills,
        target_careers=request.target_careers,
        weekly_hours=weekly_hours
    )

    return results


@router.post("/evolution/event", response_model=EvolutionEventSchema)
async def log_evolution_event(
    event: EvolutionEventSchema,
    user_id: str,
    db: AsyncSession = Depends(get_db)
):
    """
    Feature 1: SkillTwin Evolution Engine.
    Logs an evolution trigger event (e.g. project completion, assessment, verified evidence).
    """
    evo_record = SkillEvolution(
        user_id=user_id,
        trigger_event=event.trigger_event,
        skill_name=event.skill_name,
        previous_level=event.previous_level,
        new_level=event.new_level,
        previous_confidence=event.previous_confidence,
        new_confidence=event.new_confidence,
        unlocked_capabilities=event.unlocked_capabilities,
        remaining_gaps_count=event.remaining_gaps_count,
        alignment_score_after=event.alignment_score_after
    )
    db.add(evo_record)
    await db.commit()
    await db.refresh(evo_record)

    return EvolutionEventSchema(
        id=evo_record.id,
        trigger_event=evo_record.trigger_event,
        skill_name=evo_record.skill_name,
        previous_level=evo_record.previous_level,
        new_level=evo_record.new_level,
        previous_confidence=evo_record.previous_confidence,
        new_confidence=evo_record.new_confidence,
        unlocked_capabilities=evo_record.unlocked_capabilities,
        remaining_gaps_count=evo_record.remaining_gaps_count,
        alignment_score_after=evo_record.alignment_score_after,
        created_at=evo_record.created_at
    )
