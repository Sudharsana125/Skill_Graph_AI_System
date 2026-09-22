"""
SkillTwin AI — Career What-If Simulator Agent.
Simulates candidate readiness across alternative career pathways against the exact same current SkillTwin.
Presents factual, unbiased comparisons without declaring a single 'best' choice.
"""
from typing import List, Dict, Any
from pydantic import BaseModel

from backend.app.rag.knowledge_base import knowledge_base
from backend.app.rag.transfer_matrix import skill_transfer_engine


from backend.app.schemas.schemas import WhatIfCareerResultSchema as WhatIfCareerResult


class WhatIfSimulatorAgent:
    """Simulates alternative career alignments against the candidate's current SkillTwin."""

    LEVEL_SCORES = {
        "None": 0, "Beginner": 1, "Intermediate": 2, "Advanced": 3
    }

    def simulate_careers(
        self,
        current_skills: List[Any],
        target_careers: List[str] = None,
        weekly_hours: int = 10
    ) -> List[WhatIfCareerResult]:
        if not target_careers:
            target_careers = [
                "AI Engineer",
                "Data Analyst",
                "ML Engineer",
                "Data Scientist",
                "Full Stack Developer"
            ]

        # Build user skill map
        user_skills_dict = {}
        for s in current_skills:
            s_name = getattr(s, 'name', '').lower()
            s_level = getattr(s, 'level', getattr(s, 'verified_level', 'Intermediate'))
            user_skills_dict[s_name] = s_level

        results: List[WhatIfCareerResult] = []

        for career in target_careers:
            benchmark = knowledge_base.get_role_benchmark(career)
            core_reqs = benchmark.get("core_skills", [])

            total_weight = 0.0
            earned_weight = 0.0
            matching_skills = []
            missing_critical = []

            for req in core_reqs:
                req_name = req["name"]
                req_clean = req_name.lower()
                importance = req.get("importance", "high")
                multiplier = 3.0 if importance == "critical" else (2.0 if importance == "high" else 1.0)
                req_target_score = self.LEVEL_SCORES.get(req.get("target_level", "intermediate").capitalize(), 2)
                total_weight += (req_target_score * multiplier)

                # Match against user skills
                matched = False
                for u_name, u_lvl in user_skills_dict.items():
                    if req_clean in u_name or u_name in req_clean:
                        user_score = self.LEVEL_SCORES.get(u_lvl.capitalize(), 1)
                        earned_weight += (min(user_score, req_target_score) * multiplier)
                        matching_skills.append(f"{req_name} ({u_lvl})")
                        matched = True
                        break

                if not matched and importance in ["critical", "high"]:
                    missing_critical.append(req_name)

            alignment = round((earned_weight / max(total_weight, 1.0)) * 100, 1)

            # Analyze transferable skills for this career
            transfer_res = skill_transfer_engine.analyze_transfers(
                current_skills=list(user_skills_dict.keys()),
                missing_skills=missing_critical
            )
            transfer_names = [f"{t.existing_skill} → {t.target_requirement}" for t in transfer_res[:3]]

            # Estimate timeline based on missing critical skills
            gap_count = len(missing_critical)
            estimated_months = max(1, min(6, round((gap_count * 12) / max(weekly_hours, 5))))

            # Project suggestion based on role
            suggestions = {
                "AI Engineer": "Containerized RAG Intelligence Microservice with Vector Store",
                "Data Analyst": "Executive KPI Dashboard & Automated SQL Pipeline",
                "ML Engineer": "End-to-End MLOps Pipeline with CI/CD Inference",
                "Data Scientist": "Customer Churn Predictive Model with Statistical Inference",
                "Full Stack Developer": "Full Stack Reactive Web Application with REST Architecture"
            }

            results.append(
                WhatIfCareerResult(
                    career_role=career,
                    category=benchmark.get("category", "Technology"),
                    description=benchmark.get("description", ""),
                    alignment_score=alignment,
                    matching_skills_count=len(matching_skills),
                    matching_skills=matching_skills[:5],
                    transferable_skills_count=len(transfer_names),
                    transferable_skills=transfer_names,
                    missing_critical_gaps=missing_critical[:4],
                    estimated_timeline_months=estimated_months,
                    recommended_focus=f"Bridge {len(missing_critical)} key gaps using transferable competencies.",
                    project_suggestion=suggestions.get(career, "Targeted Portfolio Capstone")
                )
            )

        return results


what_if_agent = WhatIfSimulatorAgent()
