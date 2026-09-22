"""
SkillTwin AI — Next-Best-Move Engine.
Identifies the single highest-leverage learning/project action based on active gaps,
roadmap dependencies, and weekly study capacity.
"""
from typing import List, Optional, Dict, Any
from backend.app.schemas.schemas import NextBestMoveSchema as NextBestMove


class NextMoveAgent:
    """Specialized engine determining the optimal immediate next step."""

    def determine_next_move(
        self,
        roadmap_tasks: List[Any],
        high_gaps: List[Any],
        target_role: str = "AI Engineer",
        weekly_hours: int = 10
    ) -> NextBestMove:
        # 1. Look for the first uncompleted task in the roadmap
        uncompleted_task = None
        for t in roadmap_tasks:
            is_done = getattr(t, 'is_completed', False)
            if not is_done:
                uncompleted_task = t
                break

        if uncompleted_task:
            task_id = getattr(uncompleted_task, 'id', None)
            skill = getattr(uncompleted_task, 'skill_name', 'System Design')
            suggested = getattr(uncompleted_task, 'suggested_task', 'Complete architectural exercise')
            hours = getattr(uncompleted_task, 'estimated_hours', 10)
            exercise = getattr(uncompleted_task, 'practical_exercise', 'Build and test deliverable.')
            criteria = getattr(uncompleted_task, 'completion_criteria', 'Verified functional test.')
            why = getattr(uncompleted_task, 'why_it_matters', f'{skill} is a critical requirement for {target_role}.')

            # Calculate days based on weekly capacity
            effort_days = max(1, round((hours / max(weekly_hours, 5)) * 7))

            return NextBestMove(
                task_id=task_id,
                action_type="roadmap_milestone",
                title=f"{skill}: {suggested}",
                target_skill=skill,
                why_now=f"{why} Completing this milestone directly addresses a primary benchmark gap.",
                skills_improved=[skill, "Architecture", "Hands-on Verification"],
                estimated_effort=f"{hours} hours (~{effort_days} days at {weekly_hours}h/wk)",
                impact_summary="+6.5% Alignment Gain • Upgrades skill verification level",
                practical_instruction=exercise,
                verification_deliverable=criteria
            )

        # 2. If all roadmap tasks are completed or none exist, look at highest gap
        if high_gaps:
            first_gap = high_gaps[0]
            gap_name = getattr(first_gap, 'skill_name', 'Docker')
            return NextBestMove(
                task_id=None,
                action_type="project_build",
                title=f"Build Capstone Deliverable for {gap_name}",
                target_skill=gap_name,
                why_now=f"{gap_name} remains your highest-priority benchmark gap. Building a production capstone will push your profile past 85% alignment.",
                skills_improved=[gap_name, "System Integration", "CI/CD"],
                estimated_effort=f"12 hours (~2 weeks at {weekly_hours}h/wk)",
                impact_summary="+8.0% Alignment Gain • Closes Critical Gap",
                practical_instruction=f"Build an end-to-end service demonstrating verified proficiency in {gap_name} with automated tests and a documented repository.",
                verification_deliverable="Public GitHub repo with comprehensive README, setup scripts, and working demo."
            )

        # 3. Fallback: Capstone deployment
        return NextBestMove(
            task_id=None,
            action_type="portfolio_polish",
            title="Deploy and Document Capstone Portfolio",
            target_skill="Portfolio Polish",
            why_now="All core benchmark gaps have been successfully addressed. You are in the top tier of technical readiness.",
            skills_improved=["Portfolio Presentation", "Technical Writing", "Interview Readiness"],
            estimated_effort="4 hours",
            impact_summary="Ready for Technical Screenings",
            practical_instruction="Publish your code repositories, write architectural case studies, and prepare live demo walkthroughs.",
            verification_deliverable="Live demo link and portfolio repository."
        )


next_move_agent = NextMoveAgent()
