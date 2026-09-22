"""
Agent 6 — Progress Agent.
Dynamically recalibrates user skills, confidence scores, skill gaps,
and overall career alignment when tasks or milestones are completed.
"""
from typing import Dict, Any, Optional
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from backend.app.database.models import User, Profile, Skill, SkillGap, RoadmapTask, SkillEvolution
from backend.app.schemas.schemas import ProgressUpdateResponse


class ProgressAgent:
    """Specialized agent updating twin profile state upon task completion."""

    ROLE = "Adaptive Progress & Recalibration Engine"
    GOAL = "Recalculate dynamic digital twin skill confidence and milestone achievements in real time."

    async def handle_task_completion(
        self,
        db: AsyncSession,
        user_id: str,
        task_id: int,
        is_completed: bool = True
    ) -> ProgressUpdateResponse:
        # 1. Fetch Task
        task_query = await db.execute(
            select(RoadmapTask).where(RoadmapTask.id == task_id, RoadmapTask.user_id == user_id)
        )
        task = task_query.scalar_one_or_none()

        if not task:
            # Fallback if task ID not found
            return ProgressUpdateResponse(
                success=False,
                user_id=user_id,
                task_id=task_id,
                is_completed=is_completed,
                updated_skill_name="Unknown",
                new_skill_confidence=0.0,
                new_alignment_score=0.0,
                remaining_gaps_count=0,
                next_suggested_task=None,
                message="Task record not found."
            )

        task.is_completed = is_completed

        # 2. Find target skill to update
        skill_name = task.skill_name
        skill_query = await db.execute(
            select(Skill).where(Skill.user_id == user_id, Skill.name.ilike(f"%{skill_name}%"))
        )
        skill = skill_query.scalar_one_or_none()

        new_confidence = 0.65
        if skill:
            if is_completed:
                skill.confidence = min(0.95, round(skill.confidence + 0.15, 2))
                if skill.confidence >= 0.75:
                    skill.verified_level = "Advanced"
                elif skill.confidence >= 0.50:
                    skill.verified_level = "Intermediate"
            else:
                skill.confidence = max(0.30, round(skill.confidence - 0.15, 2))
            new_confidence = skill.confidence
        else:
            # Create the skill entry if it was previously missing
            if is_completed:
                new_skill = Skill(
                    user_id=user_id,
                    name=skill_name,
                    category="Development",
                    self_level="Intermediate",
                    verified_level="Intermediate",
                    confidence=0.70,
                    learning_source="Roadmap Practical Milestone",
                    evidence_json=f'["Completed roadmap exercise: {task.practical_exercise}"]'
                )
                db.add(new_skill)
                new_confidence = 0.70

        # 3. Update Skill Gap record
        gap_query = await db.execute(
            select(SkillGap).where(SkillGap.user_id == user_id, SkillGap.skill_name.ilike(f"%{skill_name}%"))
        )
        gap = gap_query.scalar_one_or_none()
        if gap and is_completed:
            if gap.priority == "HIGH":
                gap.priority = "MEDIUM"
                gap.gap_level = "Medium"
                gap.current_level = "Intermediate"
                gap.reason = f"Progress made via completed milestone '{task.learning_objective}'."
            elif gap.priority == "MEDIUM":
                gap.priority = "STRONG"
                gap.gap_level = "None"
                gap.current_level = "Advanced"
                gap.reason = "Target competency successfully verified via completed practical exercise."

        # 4. Recalculate Profile Alignment Score
        profile_query = await db.execute(
            select(Profile).where(Profile.user_id == user_id)
        )
        profile = profile_query.scalar_one_or_none()

        delta = 6.5 if is_completed else -6.5
        new_score = 68.0
        if profile:
            profile.alignment_score = min(98.0, max(15.0, round(profile.alignment_score + delta, 1)))
            new_score = profile.alignment_score

        # 5. Determine Next Suggested Task
        next_task_query = await db.execute(
            select(RoadmapTask)
            .where(RoadmapTask.user_id == user_id, RoadmapTask.is_completed == False)
            .order_by(RoadmapTask.phase_number, RoadmapTask.id)
        )
        next_task = next_task_query.scalars().first()
        next_suggested = (
            f"Next milestone: Phase {next_task.phase_number} ({next_task.week_label}) - {next_task.suggested_task}"
            if next_task else "All current roadmap milestones completed! Ready to deploy capstone portfolio."
        )

        # Count remaining gaps
        all_gaps_query = await db.execute(
            select(SkillGap).where(SkillGap.user_id == user_id, SkillGap.priority.in_(["HIGH", "MEDIUM"]))
        )
        remaining_count = len(all_gaps_query.scalars().all())

        # 6. Log Skill Evolution Event (Feature 1: Evolution Engine)
        if is_completed:
            previous_lvl = "Beginner" if new_confidence < 0.60 else "Intermediate"
            current_lvl = "Advanced" if new_confidence >= 0.75 else ("Intermediate" if new_confidence >= 0.50 else "Beginner")
            db.add(
                SkillEvolution(
                    user_id=user_id,
                    trigger_event=f"Completed Milestone: {task.suggested_task}",
                    skill_name=skill_name,
                    previous_level=previous_lvl,
                    new_level=current_lvl,
                    previous_confidence=round(max(0.3, new_confidence - 0.15), 2),
                    new_confidence=new_confidence,
                    unlocked_capabilities=f"{skill_name} verification deliverable, {task.learning_objective}",
                    remaining_gaps_count=remaining_count,
                    alignment_score_after=new_score
                )
            )

        await db.commit()

        return ProgressUpdateResponse(
            success=True,
            user_id=user_id,
            task_id=task_id,
            is_completed=is_completed,
            updated_skill_name=skill_name,
            new_skill_confidence=new_confidence,
            new_alignment_score=new_score,
            remaining_gaps_count=remaining_count,
            next_suggested_task=next_suggested,
            message=f"Twin updated: '{skill_name}' confidence adjusted. Career alignment now {new_score}%."
        )


progress_agent = ProgressAgent()
