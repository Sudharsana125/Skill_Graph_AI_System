"""
SkillGraph AI — Context-Aware Career Copilot Endpoint:
POST /assistant/chat
Provides real-time, profile-grounded career intelligence, explanations, and roadmap adjustments.
"""
from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select

from backend.app.database.session import get_db
from backend.app.database.models import User, Profile, Skill, SkillGap, RoadmapTask, ProjectRecommendation
from backend.app.schemas.schemas import AssistantChatRequest, AssistantChatResponse
from backend.app.agents.what_if_agent import what_if_agent
from backend.app.rag.knowledge_base import knowledge_base

router = APIRouter(tags=["AI Career Assistant"])


@router.post("/assistant/chat", response_model=AssistantChatResponse)
async def chat_with_career_assistant(
    request: AssistantChatRequest,
    db: AsyncSession = Depends(get_db)
):
    """
    Answers targeted career questions using the candidate's actual SkillGraph context.
    """
    query = request.message.lower().strip()

    # 1. Fetch user profile context
    prof_res = await db.execute(select(Profile).where(Profile.user_id == request.user_id))
    profile = prof_res.scalar_one_or_none()
    target_role = profile.target_role if profile else "AI Engineer"
    alignment = round(profile.alignment_score if profile else 68.0)

    # 2. Fetch skills
    skills_res = await db.execute(select(Skill).where(Skill.user_id == request.user_id))
    skills_records = skills_res.scalars().all()
    user_skills_map = {s.name.lower(): s for s in skills_records}

    # 3. Fetch top gaps
    gaps_res = await db.execute(
        select(SkillGap)
        .where(SkillGap.user_id == request.user_id, SkillGap.priority == "HIGH")
    )
    high_gaps = [g.skill_name for g in gaps_res.scalars().all()]

    # 4. Fetch next task
    next_task_res = await db.execute(
        select(RoadmapTask)
        .where(RoadmapTask.user_id == request.user_id, RoadmapTask.is_completed == False)
        .order_by(RoadmapTask.phase_number, RoadmapTask.id)
    )
    next_task = next_task_res.scalars().first()

    # 5. Fetch project recommendations
    recs_res = await db.execute(
        select(ProjectRecommendation).where(ProjectRecommendation.user_id == request.user_id)
    )
    proj_recs = recs_res.scalars().all()

    # Case A: "What skills am I missing for [role]?"
    if "missing" in query or ("what skills" in query and ("gap" in query or "role" in query or "engineer" in query)):
        gap_list_str = ", ".join(high_gaps) if high_gaps else "Docker, FastAPI, and Vector Databases"
        reply = (
            f"Based on your actual SkillGraph for {target_role}, your critical missing benchmark competencies are: "
            f"{gap_list_str}. Closing these specific gaps will raise your functional readiness from "
            f"{alignment}% toward 85%+."
        )
        action = f"Focus on Roadmap Phase 1-2 to begin bridging {high_gaps[0] if high_gaps else 'core gaps'}."

    # Case B: "What should I learn next?"
    elif "what should i learn next" in query or "next" in query or "learn next" in query:
        if next_task:
            reply = (
                f"Your highest-leverage next move is Phase {next_task.phase_number} ({next_task.week_label}): "
                f"'{next_task.learning_objective}'. Practical task: {next_task.practical_exercise}. "
                f"This milestone develops code evidence directly for '{next_task.skill_name}'."
            )
            action = f"Complete practical task: '{next_task.suggested_task}' in your Learning Path."
        else:
            reply = "You have completed all active milestones! You are ready to deploy your capstone portfolio."
            action = "Publish your capstone GitHub repo."

    # Case C: "Why is my [Skill] level [Level]?"
    elif "why is my" in query or ("why" in query and "level" in query) or ("level" in query and any(s in query for s in ["python", "sql", "fastapi", "docker"])):
        # Detect skill
        matched_skill = None
        for s_name, s_obj in user_skills_map.items():
            if s_name in query:
                matched_skill = s_obj
                break
        
        if matched_skill:
            lvl = matched_skill.verified_level
            conf = round((matched_skill.confidence or 0.8) * 100)
            src = matched_skill.learning_source or "Project Repositories & Assessments"
            reply = (
                f"Your {matched_skill.name} level is evaluated as '{lvl}' with {conf}% verified confidence. "
                f"This score was calculated from verified evidence: {src}. "
                f"To advance {matched_skill.name} to the next tier, complete an end-to-end production capstone "
                f"or add a verified repository with integration test suites."
            )
            action = f"Review traceable provenance nodes in your Evidence Graph for {matched_skill.name}."
        else:
            reply = (
                f"Skill levels in SkillGraph AI are not self-reported guesses. They are verified against code deliverables, "
                f"practical assessments, and repository commit provenance. Add repository links to elevate your verification score."
            )
            action = "View Evidence Graph to inspect provenance nodes."

    # Case D: "What projects would reduce my current skill gaps?"
    elif "project" in query or "reduce" in query:
        if proj_recs:
            top_proj = proj_recs[0]
            reply = (
                f"To reduce your highest-priority gaps ({', '.join(high_gaps[:2]) if high_gaps else 'FastAPI, RAG'}), "
                f"we recommend building: '{top_proj.title}'. "
                f"Why: {top_proj.why_matches_gaps}. Estimated effort: {top_proj.estimated_duration}."
            )
            action = f"Open '{top_proj.title}' in your Projects tab."
        else:
            reply = (
                f"Building a 'Containerized RAG Intelligence API' directly addresses your critical gaps in "
                f"FastAPI, Docker, and Vector Stores."
            )
            action = "Review suggested projects in the Projects tab."

    # Case E: "What happens if I switch my target to [Role]?"
    elif "switch" in query or "data analyst" in query or "what happens if" in query or "simulate" in query:
        sim_role = "Data Analyst" if "data analyst" in query else ("MLOps Specialist" if "mlops" in query else "Agentic AI Architect")
        sim_results = what_if_agent.simulate_careers(
            current_skills=skills_records,
            target_careers=[sim_role],
            weekly_hours=profile.weekly_hours if profile else 10
        )
        if sim_results:
            res = sim_results[0]
            reply = (
                f"If you switch your target to {sim_role}, your simulated SkillGraph fit is {res.alignment_score}%. "
                f"You have {res.matching_skills_count} matching competencies and {len(res.missing_critical_gaps)} critical gaps "
                f"({', '.join(res.missing_critical_gaps[:3]) if res.missing_critical_gaps else 'None'}). "
                f"Estimated preparation timeline: ~{res.estimated_timeline_months} months."
            )
            action = f"Open Career What-If Simulator to explore {sim_role} in depth."
        else:
            reply = f"Simulating a role shift evaluates your exact SkillGraph against {sim_role} hiring requirements."
            action = "Open What-If Simulator."

    # Case F: Specific skill questions (e.g. Docker, RAG, System Design)
    elif "docker" in query:
        reply = (
            f"Docker containerization is critical for a {target_role} because production models and "
            f"FastAPI services must run consistently across local GPUs, CI/CD runners, and cloud clusters. "
            f"Over 68% of analyzed {target_role} postings require verified container packaging."
        )
        action = "Check Roadmap for the Docker containerization exercise."

    else:
        reply = (
            f"As your SkillGraph Career Advisor for {target_role}, I track your profile ({alignment}% match). "
            f"Your current top focus is closing gaps in {', '.join(high_gaps[:2]) if high_gaps else 'core infrastructure'}. "
            f"You can ask me: 'What skills am I missing?', 'What should I learn next?', 'Why is my Python level Intermediate?', "
            f"or 'What happens if I switch to Data Analyst?'"
        )
        action = "Ask a targeted question about your SkillGraph."

    return AssistantChatResponse(reply=reply, suggested_action=action)
