"""
SkillTwin AI Agent Orchestrator.
Controls the multi-agent pipeline execution:
User Profile -> Agent 1 -> Agent 2 -> Agent 3 -> Agent 4 -> Agent 5 -> Database Persistence.
"""
import uuid
import json
from typing import Dict, Any
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select, delete

from backend.app.schemas.schemas import (
    AnalysisRequest,
    DashboardResponse,
    ProfileInput,
    SkillInput,
    ProjectInput,
    AnalyzedSkill,
    SkillGapItem,
    RoadmapTaskSchema,
    ProjectRecommendationSchema
)
from backend.app.database.models import (
    User,
    Profile,
    Skill,
    Project,
    SkillGap,
    RoadmapTask,
    ProjectRecommendation
)
from backend.app.agents.profile_analyzer import profile_analyzer_agent
from backend.app.agents.career_analyzer import career_analyzer_agent
from backend.app.agents.skill_gap_analyzer import skill_gap_analyzer_agent
from backend.app.agents.roadmap_agent import roadmap_agent
from backend.app.agents.project_recommender import project_recommender_agent
from backend.app.rag.transfer_matrix import skill_transfer_engine
from backend.app.agents.next_move_agent import next_move_agent
from backend.app.agents.evidence_agent import evidence_graph_agent
from backend.app.database.models import SkillEvolution
from backend.app.schemas.schemas import EvolutionEventSchema


class AgentOrchestrator:
    """Master orchestrator for the multi-agent career intelligence pipeline."""

    async def execute_pipeline(
        self,
        request: AnalysisRequest,
        db: AsyncSession,
        user_id: str = None
    ) -> DashboardResponse:
        if not user_id:
            user_id = f"user_{uuid.uuid4().hex[:10]}"

        # Step 1: Ensure User exists in DB
        user_query = await db.execute(select(User).where(User.id == user_id))
        user_obj = user_query.scalar_one_or_none()
        if not user_obj:
            user_obj = User(id=user_id, name=request.profile.name)
            db.add(user_obj)
            await db.flush()

        # Step 2: Agent 1 — Profile Analyzer
        profile_analysis = profile_analyzer_agent.analyze(
            profile=request.profile,
            skills=request.skills,
            projects=request.projects
        )

        # Step 3: Agent 2 — Career Analyzer (RAG backed)
        career_analysis = career_analyzer_agent.analyze(
            target_role=request.profile.target_role
        )

        # Step 4: Agent 3 — Skill Gap Analyzer
        gap_analysis = skill_gap_analyzer_agent.analyze(
            current_skills=profile_analysis.analyzed_skills,
            required_skills=career_analysis.required_skills
        )

        # Step 5: Agent 4 — Roadmap Agent
        roadmap_result = roadmap_agent.generate(
            profile=request.profile,
            gaps=gap_analysis.all_gaps
        )

        # Step 6: Agent 5 — Project Recommender Agent
        project_recs = project_recommender_agent.recommend(
            target_role=request.profile.target_role,
            gaps=gap_analysis.all_gaps
        )

        # Step 7: Persist results cleanly into Database
        # Clean up old records for this user if re-running
        await db.execute(delete(Profile).where(Profile.user_id == user_id))
        await db.execute(delete(Skill).where(Skill.user_id == user_id))
        await db.execute(delete(Project).where(Project.user_id == user_id))
        await db.execute(delete(SkillGap).where(SkillGap.user_id == user_id))
        await db.execute(delete(RoadmapTask).where(RoadmapTask.user_id == user_id))
        await db.execute(delete(ProjectRecommendation).where(ProjectRecommendation.user_id == user_id))

        # Save Profile
        new_profile = Profile(
            user_id=user_id,
            education=request.profile.education,
            status=request.profile.status,
            experience_years=request.profile.experience_years,
            summary=request.profile.summary,
            target_role=request.profile.target_role,
            weekly_hours=request.profile.weekly_hours,
            target_timeline_months=request.profile.target_timeline_months,
            preferred_industry=request.profile.preferred_industry,
            preferred_location=request.profile.preferred_location,
            alignment_score=gap_analysis.alignment_score
        )
        db.add(new_profile)

        # Save Skills
        for s in profile_analysis.analyzed_skills:
            db.add(
                Skill(
                    user_id=user_id,
                    name=s.name,
                    category=s.category,
                    self_level=s.level,
                    verified_level=s.level,
                    confidence=s.confidence,
                    learning_source="Analysis Pipeline",
                    evidence_json=json.dumps(s.evidence)
                )
            )

        # Save Projects
        for p in request.projects:
            db.add(
                Project(
                    user_id=user_id,
                    name=p.name,
                    description=p.description,
                    technologies=p.technologies,
                    role=p.role,
                    github_url=p.github_url,
                    user_contribution=p.user_contribution
                )
            )

        # Save Skill Gaps
        for g in gap_analysis.all_gaps:
            db.add(
                SkillGap(
                    user_id=user_id,
                    skill_name=g.skill_name,
                    category=g.category,
                    current_level=g.current_level,
                    required_level=g.required_level,
                    gap_level=g.gap_level,
                    priority=g.priority,
                    reason=g.reason
                )
            )

        # Save Roadmap Tasks
        db_tasks = []
        for t in roadmap_result.phases:
            db_task = RoadmapTask(
                user_id=user_id,
                phase_number=t.phase_number,
                phase_name=t.phase_name,
                week_label=t.week_label,
                skill_name=t.skill_name,
                why_it_matters=t.why_it_matters,
                learning_objective=t.learning_objective,
                suggested_task=t.suggested_task,
                practical_exercise=t.practical_exercise,
                estimated_hours=t.estimated_hours,
                completion_criteria=t.completion_criteria,
                is_completed=t.is_completed
            )
            db.add(db_task)
            db_tasks.append(db_task)

        # Save Project Recommendations
        db_recs = []
        for pr in project_recs.recommendations:
            db_rec = ProjectRecommendation(
                user_id=user_id,
                title=pr.title,
                problem=pr.problem,
                skills_developed=pr.skills_developed,
                difficulty=pr.difficulty,
                estimated_duration=pr.estimated_duration,
                expected_outcome=pr.expected_outcome,
                why_matches_gaps=pr.why_matches_gaps,
                is_added_to_roadmap=pr.is_added_to_roadmap
            )
            db.add(db_rec)
            db_recs.append(db_rec)

        await db.commit()

        # Re-attach generated database IDs for tasks and recommendations
        for idx, t in enumerate(roadmap_result.phases):
            t.id = db_tasks[idx].id
        for idx, pr in enumerate(project_recs.recommendations):
            pr.id = db_recs[idx].id

        # Feature 3: Skill Transfer Intelligence
        transferable = skill_transfer_engine.analyze_transfers(
            current_skills=[s.name for s in profile_analysis.analyzed_skills],
            missing_skills=[g.skill_name for g in gap_analysis.high_priority_gaps]
        )

        # Feature 4: Next-Best-Move Engine
        next_move = next_move_agent.determine_next_move(
            roadmap_tasks=roadmap_result.phases,
            high_gaps=gap_analysis.high_priority_gaps,
            target_role=request.profile.target_role,
            weekly_hours=request.profile.weekly_hours
        )

        # Feature 5: Skill Evidence Graph
        evidence_graph = evidence_graph_agent.build_evidence_graph(
            skills=profile_analysis.analyzed_skills,
            projects=request.projects,
            roadmap_tasks=roadmap_result.phases
        )

        # Feature 1: Seed Initial SkillTwin Evolution
        init_evo = SkillEvolution(
            user_id=user_id,
            trigger_event="Evidence-Backed Profile Assessment Initialized",
            skill_name=profile_analysis.analyzed_skills[0].name if profile_analysis.analyzed_skills else "Python",
            previous_level="Beginner",
            new_level=profile_analysis.analyzed_skills[0].level if profile_analysis.analyzed_skills else "Intermediate",
            previous_confidence=0.45,
            new_confidence=profile_analysis.analyzed_skills[0].confidence if profile_analysis.analyzed_skills else 0.75,
            unlocked_capabilities="Verified baseline competencies & practical project proof",
            remaining_gaps_count=len(gap_analysis.high_priority_gaps),
            alignment_score_after=gap_analysis.alignment_score
        )
        db.add(init_evo)
        await db.commit()

        evolution_list = [
            EvolutionEventSchema(
                id=init_evo.id,
                trigger_event=init_evo.trigger_event,
                skill_name=init_evo.skill_name,
                previous_level=init_evo.previous_level,
                new_level=init_evo.new_level,
                previous_confidence=init_evo.previous_confidence,
                new_confidence=init_evo.new_confidence,
                unlocked_capabilities=init_evo.unlocked_capabilities,
                remaining_gaps_count=init_evo.remaining_gaps_count,
                alignment_score_after=init_evo.alignment_score_after,
                created_at=init_evo.created_at
            )
        ]

        return DashboardResponse(
            user_id=user_id,
            name=request.profile.name,
            education=request.profile.education,
            status=request.profile.status,
            target_role=request.profile.target_role,
            alignment_score=gap_analysis.alignment_score,
            alignment_disclaimer="Skill alignment based on the selected target-role requirements.",
            weekly_hours=request.profile.weekly_hours,
            timeline_months=request.profile.target_timeline_months,
            preferred_industry=request.profile.preferred_industry,
            skills=profile_analysis.analyzed_skills,
            gaps=gap_analysis.all_gaps,
            high_priority_gaps=gap_analysis.high_priority_gaps,
            medium_priority_gaps=gap_analysis.medium_priority_gaps,
            strong_areas=gap_analysis.strong_areas,
            roadmap=roadmap_result.phases,
            project_recommendations=project_recs.recommendations,
            job_market_frequencies=career_analysis.job_market_frequencies,
            market_note=career_analysis.market_note,
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

    async def get_or_create_demo_user(self, db: AsyncSession) -> DashboardResponse:
        """Instant demo profile for Sudharsana targeting AI Engineer (Hackathon Spec)."""
        demo_user_id = "demo_sudharsana_ai_engineer"

        # Check if already seeded in DB
        user_query = await db.execute(select(User).where(User.id == demo_user_id))
        user = user_query.scalar_one_or_none()

        if user:
            # Load from DB
            from backend.app.api.endpoints.dashboard import fetch_dashboard_state
            return await fetch_dashboard_state(demo_user_id, db)

        # Otherwise synthesize demo payload for Sudharsana
        demo_request = AnalysisRequest(
            profile=ProfileInput(
                name="Sudharsana",
                education="B.S. Computer Science & AI",
                status="Student",
                experience_years="0-1 years",
                summary="Passionate student building AI Engineer capabilities with Python, ML, LLMs, and RAG architectures.",
                target_role="AI Engineer",
                weekly_hours=10,
                target_timeline_months=5,
                preferred_industry="AI / Machine Learning",
                preferred_location="Remote / Hybrid"
            ),
            skills=[
                SkillInput(name="Python", category="Programming", level="Advanced", learning_source="Course & Projects"),
                SkillInput(name="SQL", category="Data", level="Intermediate", learning_source="University Coursework"),
                SkillInput(name="Machine Learning", category="AI / ML", level="Intermediate", learning_source="Academic Projects"),
                SkillInput(name="RAG", category="AI / ML", level="Intermediate", learning_source="Independent Projects"),
                SkillInput(name="FastAPI", category="Development", level="Beginner", learning_source="Self-learning"),
                SkillInput(name="Git", category="Development", level="Intermediate", learning_source="Team Projects")
            ],
            projects=[
                ProjectInput(
                    name="Intelligent RAG Chatbot Engine",
                    description="Engineered an asynchronous retrieval-augmented generation app querying knowledge base using Gemini API, FastAPI, and vector store.",
                    technologies="Python, FastAPI, LLMs, RAG, ChromaDB",
                    role="Lead Developer",
                    github_url="https://github.com/sudharsana/rag-chatbot-demo",
                    user_contribution="Implemented vector chunking pipeline, semantic search with hybrid filtering, and FastAPI REST endpoint."
                ),
                ProjectInput(
                    name="Predictive ML Analytics Platform",
                    description="Constructed end-to-end data processing pipeline and interactive visualization for enterprise customer retention analysis.",
                    technologies="Python, SQL, Pandas, Scikit-Learn, Streamlit",
                    role="Sole Developer",
                    github_url="https://github.com/sudharsana/sales-ml-dashboard",
                    user_contribution="Authored SQL feature queries, trained Random Forest classifier with 84% ROC-AUC, and built KPI metrics."
                )
            ]
        )

        return await self.execute_pipeline(demo_request, db, user_id=demo_user_id)


orchestrator = AgentOrchestrator()
