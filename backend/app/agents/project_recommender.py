"""
Agent 5 — Project Recommendation Agent.
Recommends high-impact, portfolio-grade projects specifically tailored to close
identified skill gaps with concrete engineering outcomes.
"""
from typing import List
from backend.app.schemas.schemas import (
    SkillGapItem,
    ProjectRecommendationOutput,
    ProjectRecommendationSchema
)


class ProjectRecommenderAgent:
    """Specialized agent designing gap-targeted engineering portfolio deliverables."""

    ROLE = "Portfolio & Applied Project Director"
    GOAL = "Recommend projects targeting intersectional skill deficits to provide undeniable evidence of competency."

    def recommend(
        self,
        target_role: str,
        gaps: List[SkillGapItem]
    ) -> ProjectRecommendationOutput:
        recommendations: List[ProjectRecommendationSchema] = []

        # Find high and medium gaps
        unmet_skills = [g.skill_name for g in gaps if g.priority in ["HIGH", "MEDIUM"]]
        gap_names_lower = [s.lower() for s in unmet_skills]

        # Recommendation 1: Cloud-Native RAG & Microservice API
        recommendations.append(
            ProjectRecommendationSchema(
                title="Containerized RAG Intelligence API",
                problem="Enterprise teams need to query private documentation securely with low latency without leaking data to public LLMs.",
                skills_developed="FastAPI, Docker, RAG, Vector Search, Pydantic",
                difficulty="Intermediate",
                estimated_duration="5-7 days",
                expected_outcome="Fully dockerized RESTful API with automated Swagger docs, ChromaDB persistent storage, and sub-150ms semantic retrieval.",
                why_matches_gaps=f"Directly closes verified gaps in {', '.join([s for s in ['Docker', 'FastAPI', 'RAG'] if s.lower() in gap_names_lower] or ['API Architecture', 'Containers'])}.",
                is_added_to_roadmap=False
            )
        )

        # Recommendation 2: Autonomous Multi-Agent Workflow Engine
        recommendations.append(
            ProjectRecommendationSchema(
                title="Autonomous Research & Synthesis Multi-Agent Swarm",
                problem="Synthesizing unstructured market intelligence requires specialized agents performing parallel search, validation, and structured extraction.",
                skills_developed="Python, AI Agents, Tool Use, LLMs, Async IO",
                difficulty="Advanced",
                estimated_duration="1-2 weeks",
                expected_outcome="Orchestrated multi-agent system executing specialized roles with structured JSON schema outputs and telemetry logging.",
                why_matches_gaps=f"Provides undeniable proof of competency in {', '.join([s for s in ['AI Agents', 'LLMs', 'System Design'] if s.lower() in gap_names_lower] or ['Advanced AI Engineering'])}.",
                is_added_to_roadmap=False
            )
        )

        # Recommendation 3: Production MLOps & Real-Time Inference Gateway
        recommendations.append(
            ProjectRecommendationSchema(
                title="Production Model Monitoring & Gateway Pipeline",
                problem="Deployed AI models silently drift over time; engineering teams need automated health checks, rate limiting, and observability.",
                skills_developed="Docker, System Design, Cloud Deployment, Python, Prometheus/Logging",
                difficulty="Intermediate",
                estimated_duration="7-10 days",
                expected_outcome="Resilient proxy service with health telemetry, graceful fallbacks, structured logging, and containerized deployment.",
                why_matches_gaps=f"Transforms theoretical knowledge of {', '.join([s for s in ['Docker', 'System Design', 'Cloud'] if s.lower() in gap_names_lower] or ['Production Systems'])} into production-grade artifacts.",
                is_added_to_roadmap=False
            )
        )

        return ProjectRecommendationOutput(recommendations=recommendations)


project_recommender_agent = ProjectRecommenderAgent()
