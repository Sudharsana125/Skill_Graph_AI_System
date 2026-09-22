"""
Agent 2 — Career Analyzer.
Analyzes target career role, retrieves competencies from RAG Knowledge Base,
and structures required skills with importance levels.
"""
from typing import List
from backend.app.schemas.schemas import (
    CareerAnalysisOutput,
    CareerSkillRequirement,
    JobMarketStat
)
from backend.app.rag.knowledge_base import knowledge_base


class CareerAnalyzerAgent:
    """Specialized agent to assess industry benchmark standards for target careers."""

    ROLE = "Lead Technical Career Architect"
    GOAL = "Deconstruct target role into mandatory, high-priority, and architectural competencies using RAG benchmarks."

    def analyze(self, target_role: str) -> CareerAnalysisOutput:
        # Retrieve benchmark data from Knowledge Base
        benchmark = knowledge_base.get_role_benchmark(target_role)

        required_skills: List[CareerSkillRequirement] = [
            CareerSkillRequirement(
                name=skill["name"],
                category=skill["category"],
                importance=skill["importance"],
                target_level=skill["target_level"]
            )
            for skill in benchmark.get("core_skills", [])
        ]

        job_frequencies: List[JobMarketStat] = [
            JobMarketStat(
                skill=stat["skill"],
                frequency=stat["frequency"],
                sample_size=stat.get("sample_size", 100)
            )
            for stat in benchmark.get("job_market_frequencies", [])
        ]

        return CareerAnalysisOutput(
            target_role=benchmark["title"],
            category=benchmark.get("category", "Technology"),
            description=benchmark.get("description", ""),
            required_skills=required_skills,
            job_market_frequencies=job_frequencies,
            market_note=benchmark.get(
                "market_note",
                "Based on the selected job data analyzed."
            )
        )


career_analyzer_agent = CareerAnalyzerAgent()
