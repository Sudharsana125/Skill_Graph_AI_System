"""
Dashboard API endpoints:
GET /dashboard/{user_id}
GET /demo (instant Alex demo profile for judges)
"""
import json
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select

from backend.app.database.session import get_db
from backend.app.database.models import (
    User,
    Profile,
    Skill,
    SkillGap,
    RoadmapTask,
    ProjectRecommendation,
    Project,
    SkillEvolution
)
from backend.app.schemas.schemas import (
    DashboardResponse,
    AnalyzedSkill,
    SkillGapItem,
    RoadmapTaskSchema,
    ProjectRecommendationSchema,
    JobMarketStat,
    EvolutionEventSchema
)
from backend.app.rag.knowledge_base import knowledge_base
from backend.app.rag.transfer_matrix import skill_transfer_engine
from backend.app.agents.next_move_agent import next_move_agent
from backend.app.agents.evidence_agent import evidence_graph_agent

router = APIRouter(tags=["Dashboard"])


async def fetch_dashboard_state(user_id: str, db: AsyncSession) -> DashboardResponse:
    user_res = await db.execute(select(User).where(User.id == user_id))
    user = user_res.scalar_one_or_none()
    if not user:
        raise HTTPException(status_code=404, detail="User SkillTwin profile not found.")

    prof_res = await db.execute(select(Profile).where(Profile.user_id == user_id))
    profile = prof_res.scalar_one_or_none()
    if not profile:
        raise HTTPException(status_code=404, detail="User profile metadata not found.")

    # Skills
    skills_res = await db.execute(select(Skill).where(Skill.user_id == user_id))
    skills_records = skills_res.scalars().all()
    skills_list = []
    for s in skills_records:
        evidence = []
        if s.evidence_json:
            try:
                evidence = json.loads(s.evidence_json)
            except Exception:
                evidence = [s.evidence_json]
        skills_list.append(
            AnalyzedSkill(
                name=s.name,
                category=s.category,
                level=s.verified_level,
                confidence=s.confidence,
                evidence=evidence
            )
        )

    # Gaps
    gaps_res = await db.execute(select(SkillGap).where(SkillGap.user_id == user_id))
    gaps_records = gaps_res.scalars().all()
    all_gaps = []
    high_priority = []
    medium_priority = []
    strong_areas = []

    for g in gaps_records:
        item = SkillGapItem(
            skill_name=g.skill_name,
            category=g.category,
            current_level=g.current_level,
            required_level=g.required_level,
            gap_level=g.gap_level,
            priority=g.priority,
            reason=g.reason or ""
        )
        all_gaps.append(item)
        if g.priority == "HIGH":
            high_priority.append(item)
        elif g.priority == "MEDIUM":
            medium_priority.append(item)
        elif g.priority == "STRONG":
            strong_areas.append(item)

    # Roadmap
    tasks_res = await db.execute(
        select(RoadmapTask)
        .where(RoadmapTask.user_id == user_id)
        .order_by(RoadmapTask.phase_number, RoadmapTask.id)
    )
    task_records = tasks_res.scalars().all()
    roadmap_list = [
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
        for t in task_records
    ]

    # Project recommendations
    recs_res = await db.execute(
        select(ProjectRecommendation).where(ProjectRecommendation.user_id == user_id)
    )
    rec_records = recs_res.scalars().all()
    recs_list = [
        ProjectRecommendationSchema(
            id=r.id,
            title=r.title,
            problem=r.problem,
            skills_developed=r.skills_developed,
            difficulty=r.difficulty,
            estimated_duration=r.estimated_duration,
            expected_outcome=r.expected_outcome,
            why_matches_gaps=r.why_matches_gaps,
            is_added_to_roadmap=r.is_added_to_roadmap
        )
        for r in rec_records
    ]

    # Benchmark Market Stats
    benchmark = knowledge_base.get_role_benchmark(profile.target_role)
    job_stats = [
        JobMarketStat(skill=stat["skill"], frequency=stat["frequency"], sample_size=stat.get("sample_size", 100))
        for stat in benchmark.get("job_market_frequencies", [])
    ]

    # Fetch projects for evidence analysis
    proj_res = await db.execute(select(Project).where(Project.user_id == user_id))
    projects_list = proj_res.scalars().all()

    # Feature 3: Skill Transfer Intelligence
    transferable = skill_transfer_engine.analyze_transfers(
        current_skills=[s.name for s in skills_list],
        missing_skills=[g.skill_name for g in high_priority]
    )

    # Feature 4: Next-Best-Move
    next_move = next_move_agent.determine_next_move(
        roadmap_tasks=roadmap_list,
        high_gaps=high_priority,
        target_role=profile.target_role,
        weekly_hours=profile.weekly_hours
    )

    # Feature 5: Skill Evidence Graph
    evidence_graph = evidence_graph_agent.build_evidence_graph(
        skills=skills_list,
        projects=projects_list,
        roadmap_tasks=roadmap_list
    )

    # Feature 1: SkillTwin Evolution Engine
    evo_res = await db.execute(
        select(SkillEvolution).where(SkillEvolution.user_id == user_id).order_by(SkillEvolution.id.desc())
    )
    evo_records = evo_res.scalars().all()
    if not evo_records:
        init_evo = SkillEvolution(
            user_id=user_id,
            trigger_event="Evidence-Backed Profile Assessment Initialized",
            skill_name="Python",
            previous_level="Beginner",
            new_level="Advanced",
            previous_confidence=0.45,
            new_confidence=0.85,
            unlocked_capabilities="Core algorithmic verification, async API handling, vector embedding ingestion",
            remaining_gaps_count=len(high_priority),
            alignment_score_after=profile.alignment_score
        )
        db.add(init_evo)
        await db.commit()
        evo_records = [init_evo]

    evolution_list = [
        EvolutionEventSchema(
            id=e.id,
            trigger_event=e.trigger_event,
            skill_name=e.skill_name,
            previous_level=e.previous_level,
            new_level=e.new_level,
            previous_confidence=e.previous_confidence,
            new_confidence=e.new_confidence,
            unlocked_capabilities=e.unlocked_capabilities,
            remaining_gaps_count=e.remaining_gaps_count,
            alignment_score_after=e.alignment_score_after,
            created_at=e.created_at
        )
        for e in evo_records
    ]

    return DashboardResponse(
        user_id=user_id,
        name=user.name,
        education=profile.education,
        status=profile.status,
        target_role=profile.target_role,
        alignment_score=profile.alignment_score,
        alignment_disclaimer="Skill alignment based on the selected target-role requirements.",
        weekly_hours=profile.weekly_hours,
        timeline_months=profile.target_timeline_months,
        preferred_industry=profile.preferred_industry,
        skills=skills_list,
        gaps=all_gaps,
        high_priority_gaps=high_priority,
        medium_priority_gaps=medium_priority,
        strong_areas=strong_areas,
        roadmap=roadmap_list,
        project_recommendations=recs_list,
        job_market_frequencies=job_stats,
        market_note=benchmark.get("market_note", "Based on the selected job data analyzed."),
        next_best_move=next_move,
        evidence_graph=evidence_graph,
        transferable_skills=transferable,
        evolution_timeline=evolution_list,
        opportunities=[
            {"role": "AI Intern", "company": "TechCorp", "type": "Internship", "location": "Remote", "match_score": 94},
            {"role": "Data Analyst", "company": "DataWorks", "type": "Internship", "location": "On-site", "match_score": 88},
            {"role": "ML Project Contributor", "company": "Open Source", "type": "Volunteer", "location": "Remote", "match_score": 85},
        ]
    )


@router.get("/dashboard/{user_id}", response_model=DashboardResponse)
async def get_dashboard(user_id: str, db: AsyncSession = Depends(get_db)):
    """Fetch complete SkillTwin dashboard state for a given user."""
    return await fetch_dashboard_state(user_id, db)


@router.get("/demo", response_model=DashboardResponse)
async def get_demo_dashboard(db: AsyncSession = Depends(get_db)):
    """Instant 1-click Demo SkillTwin profile for Alex (AI Engineer)."""
    from backend.app.agents.orchestrator import orchestrator
    return await orchestrator.get_or_create_demo_user(db)
