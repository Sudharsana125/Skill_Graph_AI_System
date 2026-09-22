"""
Agent 3 — Skill Gap Analyzer.
Performs rigorous gap delta analysis comparing verified user skills against
target career benchmark requirements.
"""
from typing import List, Dict
from backend.app.schemas.schemas import (
    AnalyzedSkill,
    CareerSkillRequirement,
    SkillGapItem,
    SkillGapAnalysisOutput
)


class SkillGapAnalyzerAgent:
    """Specialized agent comparing candidate competencies against target benchmarks."""

    ROLE = "Lead Competency Gap Diagnostician"
    GOAL = "Quantify deficits between current verified competencies and career role standards."

    LEVEL_SCORES = {
        "None": 0,
        "Beginner": 1,
        "Intermediate": 2,
        "Advanced": 3
    }

    def analyze(
        self,
        current_skills: List[AnalyzedSkill],
        required_skills: List[CareerSkillRequirement]
    ) -> SkillGapAnalysisOutput:
        user_skill_map: Dict[str, AnalyzedSkill] = {
            s.name.lower(): s for s in current_skills
        }

        high_priority_gaps: List[SkillGapItem] = []
        medium_priority_gaps: List[SkillGapItem] = []
        low_priority_gaps: List[SkillGapItem] = []
        strong_areas: List[SkillGapItem] = []
        all_gaps: List[SkillGapItem] = []

        total_weight = 0.0
        earned_weight = 0.0

        for req in required_skills:
            req_name_clean = req.name.lower()
            importance_multiplier = 3.0 if req.importance == "critical" else (2.0 if req.importance == "high" else 1.0)
            total_weight += (self.LEVEL_SCORES.get(req.target_level.capitalize(), 2) * importance_multiplier)

            user_skill = None
            for s_name, s_obj in user_skill_map.items():
                if req_name_clean in s_name or s_name in req_name_clean:
                    user_skill = s_obj
                    break

            if user_skill:
                curr_lvl = user_skill.level
                curr_score = self.LEVEL_SCORES.get(curr_lvl, 1)
                req_score = self.LEVEL_SCORES.get(req.target_level.capitalize(), 2)
                earned_weight += (min(curr_score, req_score) * importance_multiplier)

                score_diff = req_score - curr_score

                if score_diff <= 0:
                    item = SkillGapItem(
                        skill_name=req.name,
                        category=req.category,
                        current_level=curr_lvl,
                        required_level=req.target_level.capitalize(),
                        gap_level="None",
                        priority="STRONG",
                        reason=f"Current {curr_lvl.lower()} capability meets or exceeds required {req.target_level.lower()} benchmark."
                    )
                    strong_areas.append(item)
                    all_gaps.append(item)
                elif score_diff == 1:
                    item = SkillGapItem(
                        skill_name=req.name,
                        category=req.category,
                        current_level=curr_lvl,
                        required_level=req.target_level.capitalize(),
                        gap_level="Medium",
                        priority="MEDIUM",
                        reason=f"Solid starting foundation in {req.name}, needs hands-on advancement to {req.target_level.lower()} level."
                    )
                    medium_priority_gaps.append(item)
                    all_gaps.append(item)
                else:
                    item = SkillGapItem(
                        skill_name=req.name,
                        category=req.category,
                        current_level=curr_lvl,
                        required_level=req.target_level.capitalize(),
                        gap_level="High",
                        priority="HIGH",
                        reason=f"Significant gap in critical competency {req.name}. Needs dedicated practical focus."
                    )
                    high_priority_gaps.append(item)
                    all_gaps.append(item)
            else:
                # Completely missing skill
                req_score = self.LEVEL_SCORES.get(req.target_level.capitalize(), 2)
                prio = "HIGH" if req.importance in ["critical", "high"] else "LOW"
                item = SkillGapItem(
                    skill_name=req.name,
                    category=req.category,
                    current_level="None",
                    required_level=req.target_level.capitalize(),
                    gap_level="High",
                    priority=prio,
                    reason=f"Unrepresented in current profile. Essential requirement for {req.category} in this career."
                )
                if prio == "HIGH":
                    high_priority_gaps.append(item)
                else:
                    low_priority_gaps.append(item)
                all_gaps.append(item)

        # Base foundational software readiness (30%) + weighted target competencies (65.2%)
        raw_alignment = 30.0 + ((earned_weight / total_weight) * 65.2) if total_weight > 0 else 50.0
        final_alignment = round(min(98.0, max(15.0, raw_alignment)), 1)

        return SkillGapAnalysisOutput(
            alignment_score=final_alignment,
            alignment_disclaimer="Skill alignment based on the selected target-role requirements.",
            high_priority_gaps=high_priority_gaps,
            medium_priority_gaps=medium_priority_gaps,
            low_priority_gaps=low_priority_gaps,
            strong_areas=strong_areas,
            all_gaps=all_gaps
        )


skill_gap_analyzer_agent = SkillGapAnalyzerAgent()
