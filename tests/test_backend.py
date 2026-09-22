"""
SkillTwin AI — Comprehensive Backend Verification Test.
Tests all 6 specialized agents, RAG benchmark retrieval, SQLite persistence,
and dynamic progress recalibration.
"""
import asyncio
import sys
import os

# Add root directory to python path
sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), "..")))

from backend.app.database.session import init_db, AsyncSessionLocal
from backend.app.schemas.schemas import AnalysisRequest, ProfileInput, SkillInput, ProjectInput
from backend.app.agents.orchestrator import orchestrator
from backend.app.agents.progress_agent import progress_agent
from backend.app.rag.knowledge_base import knowledge_base


async def run_tests():
    print("==================================================")
    print("      SkillTwin AI Backend System Verification     ")
    print("==================================================")

    # 1. Test Database Initialization
    print("[1/5] Initializing SQLite database...")
    await init_db()
    print("[PASS] SQLite database initialized successfully.")

    # 2. Test RAG Knowledge Base Retrieval
    print("[2/5] Testing RAG Knowledge Base for 'AI Engineer'...")
    benchmark = knowledge_base.get_role_benchmark("AI Engineer")
    assert benchmark is not None, "Benchmark must exist"
    assert len(benchmark["core_skills"]) > 5, "Core skills should be populated"
    print(f"[PASS] RAG Knowledge Base retrieved {len(benchmark['core_skills'])} competencies and market frequencies.")

    # 3. Test Full Pipeline Execution (Agents 1 through 5 + DB Persistence)
    print("[3/5] Testing Orchestrated Multi-Agent Pipeline (Agents 1-5)...")
    async with AsyncSessionLocal() as db:
        test_request = AnalysisRequest(
            profile=ProfileInput(
                name="Test Alex",
                education="B.Tech Computer Science",
                status="Student",
                experience_years="0-1 years",
                summary="Aspiring AI Engineer with ML and FastAPI background.",
                target_role="AI Engineer",
                weekly_hours=10,
                target_timeline_months=3
            ),
            skills=[
                SkillInput(name="Python", category="Programming", level="Advanced", learning_source="Project"),
                SkillInput(name="Machine Learning", category="AI / ML", level="Intermediate", learning_source="Course"),
                SkillInput(name="FastAPI", category="Development", level="Beginner", learning_source="Self-learning"),
                SkillInput(name="SQL", category="Data", level="Intermediate", learning_source="Course")
            ],
            projects=[
                ProjectInput(
                    name="Smart Document RAG",
                    description="RAG search engine using Python, FastAPI and ChromaDB vector index.",
                    technologies="Python, FastAPI, ChromaDB, LangChain",
                    role="Sole Developer",
                    user_contribution="Engineered chunking pipeline and FastAPI endpoints."
                )
            ]
        )

        result = await orchestrator.execute_pipeline(test_request, db, user_id="test_user_alex")

        assert result.user_id == "test_user_alex"
        assert result.alignment_score > 0
        assert len(result.skills) >= 4
        assert len(result.roadmap) == 5
        assert len(result.project_recommendations) >= 3
        print(f"[PASS] Multi-Agent Pipeline completed: Initial Alignment = {result.alignment_score}%")
        print(f"[PASS] Generated {len(result.roadmap)} roadmap phases and {len(result.project_recommendations)} targeted project recommendations.")

        # 4. Test Agent 6: Progress Agent Recalibration
        print("[4/5] Testing Agent 6: Dynamic Progress Recalibration on task completion...")
        first_task = result.roadmap[0]
        assert first_task.id is not None, "Roadmap task must have DB ID"

        progress_res = await progress_agent.handle_task_completion(
            db=db,
            user_id="test_user_alex",
            task_id=first_task.id,
            is_completed=True
        )

        assert progress_res.success is True
        assert progress_res.new_alignment_score > result.alignment_score
        print(f"[PASS] Progress Agent updated '{progress_res.updated_skill_name}': New Alignment = {progress_res.new_alignment_score}%")
        print(f"[PASS] Suggested Next Step: {progress_res.next_suggested_task}")

        # 5. Test Demo Seeding
        print("[5/10] Testing Instant Demo Seeding...")
        demo_state = await orchestrator.get_or_create_demo_user(db)
        assert demo_state.user_id == "demo_alex_ai_engineer"
        assert demo_state.alignment_score >= 50.0
        print(f"[PASS] Demo Profile seeded successfully with {demo_state.alignment_score}% alignment.")

        # 6. Test Next-Best-Move Engine
        print("[6/10] Testing Feature 4: Next-Best-Move Engine...")
        assert demo_state.next_best_move is not None, "Next best move must be computed"
        assert len(demo_state.next_best_move.title) > 5
        print(f"[PASS] Next-Best-Move: '{demo_state.next_best_move.title}' ({demo_state.next_best_move.impact_summary})")

        # 7. Test Skill Evidence Graph
        print("[7/10] Testing Feature 5: Skill Evidence Graph Engine...")
        assert len(demo_state.evidence_graph) > 0, "Evidence graph must contain analyzed skills"
        tiers = {item.tier for item in demo_state.evidence_graph}
        print(f"[PASS] Evidence Graph populated with {len(demo_state.evidence_graph)} items across tiers: {tiers}")

        # 8. Test Skill Transfer Intelligence
        print("[8/10] Testing Feature 3: Skill Transfer Intelligence...")
        assert len(demo_state.transferable_skills) > 0, "Transferable skills must be identified"
        first_trans = demo_state.transferable_skills[0]
        print(f"[PASS] Skill Transfer: '{first_trans.existing_skill}' -> '{first_trans.target_requirement}' ({first_trans.transferability_grade})")

        # 9. Test Career What-If Simulator
        print("[9/10] Testing Feature 2: Career What-If Simulator...")
        from backend.app.agents.what_if_agent import what_if_agent
        sim_res = what_if_agent.simulate_careers(
            current_skills=demo_state.skills,
            target_careers=["AI Engineer", "Data Analyst", "ML Engineer"]
        )
        assert len(sim_res) == 3, "Simulator must evaluate all 3 requested careers"
        for career_eval in sim_res:
            assert career_eval.alignment_score > 0
            print(f"  - What-If {career_eval.career_role}: {career_eval.alignment_score}% (Matching: {career_eval.matching_skills_count}, Transfers: {career_eval.transferable_skills_count})")
        print("[PASS] Career What-If Simulator successfully evaluated comparative career paths.")

        # 10. Test SkillTwin Evolution Engine
        print("[10/10] Testing Feature 1: SkillTwin Evolution Engine...")
        assert len(demo_state.evolution_timeline) > 0, "Evolution timeline must record history"
        latest_evo = demo_state.evolution_timeline[0]
        print(f"[PASS] Skill Evolution logged: '{latest_evo.trigger_event}' on {latest_evo.skill_name} -> {latest_evo.new_level}")

    print("\n==================================================")
    print(" ALL 10 TESTS & 5 NEW ENHANCEMENTS PASSING (100%)")
    print("==================================================")


if __name__ == "__main__":
    asyncio.run(run_tests())
