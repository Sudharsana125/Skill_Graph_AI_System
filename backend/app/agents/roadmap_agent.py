"""
Agent 4 — Roadmap Agent.
Synthesizes verified skill gaps, priority levels, weekly time commitments,
and target timeline into a personalized 5-phase practical action plan.
"""
from typing import List
from backend.app.schemas.schemas import (
    SkillGapItem,
    ProfileInput,
    RoadmapOutput,
    RoadmapTaskSchema
)


class RoadmapAgent:
    """Specialized agent to engineer actionable, project-driven learning roadmaps."""

    ROLE = "Curriculum Director & Engineering Mentor"
    GOAL = "Construct milestone-based learning paths prioritizing hands-on execution over passive media consumption."

    def generate(
        self,
        profile: ProfileInput,
        gaps: List[SkillGapItem]
    ) -> RoadmapOutput:
        tasks: List[RoadmapTaskSchema] = []
        weekly_hours = profile.weekly_hours or 10

        # Sort gaps by priority: HIGH first, then MEDIUM, then LOW
        priority_order = {"HIGH": 0, "MEDIUM": 1, "LOW": 2, "STRONG": 3}
        sorted_gaps = sorted(
            [g for g in gaps if g.priority != "STRONG"],
            key=lambda x: priority_order.get(x.priority, 2)
        )

        # Build 5 phases
        # Phase 1: Foundation (Closing urgent gaps in prerequisites / infrastructure)
        phase1_skill = sorted_gaps[0].skill_name if sorted_gaps else "Modern Python & API Standards"
        tasks.append(
            RoadmapTaskSchema(
                phase_number=1,
                phase_name="Foundation & Tooling",
                week_label="Week 1-2",
                skill_name=phase1_skill,
                why_it_matters=f"Industry-standard delivery requires solid mastery of {phase1_skill} before advanced model architecture.",
                learning_objective=f"Master foundational concepts and operational workflow for {phase1_skill}.",
                suggested_task=f"Configure an automated developer environment with linting, testing, and isolated environments for {phase1_skill}.",
                practical_exercise=f"Write a multi-file modular script or config implementing {phase1_skill} best practices with unit tests.",
                estimated_hours=weekly_hours * 2,
                completion_criteria=f"Working repository demonstrating clean {phase1_skill} structure with reproducible setup.",
                is_completed=False
            )
        )

        # Phase 2: Core Skills (Frameworks and core APIs)
        phase2_skill = sorted_gaps[1].skill_name if len(sorted_gaps) > 1 else "FastAPI & Microservices"
        tasks.append(
            RoadmapTaskSchema(
                phase_number=2,
                phase_name="Core Competency Acceleration",
                week_label="Week 3-4",
                skill_name=phase2_skill,
                why_it_matters=f"{phase2_skill} is heavily demanded in 70%+ of target job openings to bridge raw algorithms with user applications.",
                learning_objective=f"Build asynchronous, production-ready endpoints and data pipelines using {phase2_skill}.",
                suggested_task=f"Implement asynchronous request handling, input validation using Pydantic, and automated OpenAPI documentation.",
                practical_exercise=f"Construct a clean RESTful service in {phase2_skill} processing structured payloads with dependency injection.",
                estimated_hours=weekly_hours * 2,
                completion_criteria="Endpoints pass integration tests with sub-100ms latency and interactive Swagger UI docs.",
                is_completed=False
            )
        )

        # Phase 3: Advanced Skills (Containerization, RAG, or System Design)
        phase3_skill = sorted_gaps[2].skill_name if len(sorted_gaps) > 2 else "Docker & Container Architecture"
        tasks.append(
            RoadmapTaskSchema(
                phase_number=3,
                phase_name="Advanced System Architecture",
                week_label="Week 5-6",
                skill_name=phase3_skill,
                why_it_matters=f"Enterprise {profile.target_role} roles evaluate your ability to handle {phase3_skill} in real deployments.",
                learning_objective=f"Architect scalable, reproducible, and isolated container pipelines using {phase3_skill}.",
                suggested_task=f"Author multi-stage container files, minimize image footprints, and configure healthcheck probes.",
                practical_exercise=f"Write a Dockerfile and docker-compose.yml linking backend APIs, vector index storage, and caching.",
                estimated_hours=weekly_hours * 2,
                completion_criteria="Container builds cleanly under 250MB and runs locally with volume persistence.",
                is_completed=False
            )
        )

        # Phase 4: Integrated Capstone Project
        tasks.append(
            RoadmapTaskSchema(
                phase_number=4,
                phase_name="Applied Capstone Build",
                week_label="Week 7-9",
                skill_name=f"Full {profile.target_role} Pipeline Integration",
                why_it_matters="Recruiters and hiring leads prioritize verifiable, end-to-end projects over fragmented tutorials.",
                learning_objective=f"Synthesize {phase1_skill}, {phase2_skill}, and {phase3_skill} into a cohesive, production-style software artifact.",
                suggested_task="Build an end-to-end career intelligence or automated agent system with retrieval augmentation and persistent storage.",
                practical_exercise="Develop and test the end-to-end prototype, measure inference times, and document architectural design decisions.",
                estimated_hours=weekly_hours * 3,
                completion_criteria="Public GitHub repo with comprehensive README, architectural diagram, and test suite.",
                is_completed=False
            )
        )

        # Phase 5: Production Deployment & Career Portfolio
        tasks.append(
            RoadmapTaskSchema(
                phase_number=5,
                phase_name="Deployment & Portfolio Showcase",
                week_label="Week 10-12",
                skill_name="Cloud Deployment & Technical Presentation",
                why_it_matters="Demonstrating live public cloud links dramatically increases interview callback conversions.",
                learning_objective="Deploy the capstone to cloud infrastructure with continuous integration and record a concise architectural demo.",
                suggested_task="Deploy backend on cloud containers (e.g. Render/AWS/GCP), attach custom domain/HTTPS, and configure CI/CD via GitHub Actions.",
                practical_exercise="Record a 3-minute technical walkthrough video explaining design tradeoffs and metrics.",
                estimated_hours=weekly_hours * 3,
                completion_criteria="Live accessible web URL and documented system architecture benchmark.",
                is_completed=False
            )
        )

        return RoadmapOutput(phases=tasks)


roadmap_agent = RoadmapAgent()
