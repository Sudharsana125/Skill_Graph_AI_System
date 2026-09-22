"""
Agent 1 — Profile Analyzer.
Analyzes declared skills, project evidence, user contributions, and experience.
Normalizes skill names and estimates evidence-backed confidence scores.
"""
from typing import List, Dict, Any
from backend.app.schemas.schemas import SkillInput, ProjectInput, ProfileInput, ProfileAnalysisOutput, AnalyzedSkill


class ProfileAnalyzerAgent:
    """Specialized agent to evaluate user competencies against project evidence."""

    ROLE = "Senior Technical Talent Evaluator"
    GOAL = "Analyze declared skills and cross-reference with project contributions to establish realistic skill confidence."

    def analyze(
        self,
        profile: ProfileInput,
        skills: List[SkillInput],
        projects: List[ProjectInput]
    ) -> ProfileAnalysisOutput:
        analyzed_skills: List[AnalyzedSkill] = []
        verified_strengths: List[str] = []

        # Aggregate project evidence tokens
        project_text_corpus = " ".join([
            f"{p.name} {p.description} {p.technologies} {p.user_contribution or ''}"
            for p in projects
        ]).lower()

        # Skill normalization mapping
        normalization_map = {
            "py": "Python", "python3": "Python", "fastapi": "FastAPI",
            "reactjs": "React", "react.js": "React", "rag": "RAG",
            "llm": "LLMs", "llms": "LLMs", "ml": "Machine Learning",
            "machine learning": "Machine Learning", "deep learning": "Deep Learning",
            "docker": "Docker", "k8s": "Kubernetes", "sql": "SQL",
            "postgres": "SQL", "postgresql": "SQL", "aws": "Cloud (AWS)",
            "azure": "Cloud (Azure)", "gcp": "Cloud (GCP)", "git": "Git",
            "system design": "System Design", "powerbi": "Power BI", "tableau": "Tableau"
        }

        seen_skills = set()

        for s in skills:
            norm_name = normalization_map.get(s.name.strip().lower(), s.name.strip())
            if norm_name in seen_skills:
                continue
            seen_skills.add(norm_name)

            evidence_items: List[str] = []
            base_confidence = 0.5

            # Self-declared level baseline
            declared = s.level.capitalize()
            if declared == "Advanced":
                base_confidence = 0.70
            elif declared == "Intermediate":
                base_confidence = 0.55
            else:
                base_confidence = 0.35

            # Evidence 1: Learning source weight
            if s.learning_source:
                src = s.learning_source.lower()
                if "work" in src or "internship" in src:
                    base_confidence += 0.15
                    evidence_items.append(f"Applied in professional environment: {s.learning_source}")
                elif "project" in src:
                    base_confidence += 0.10
                    evidence_items.append(f"Self-directed implementation in: {s.learning_source}")
                elif "course" in src:
                    base_confidence += 0.05
                    evidence_items.append(f"Structured curriculum completion: {s.learning_source}")
                else:
                    evidence_items.append(f"Self-taught exploration: {s.learning_source}")

            # Evidence 2: Cross-referencing against concrete project deliverables
            skill_query = norm_name.lower().split()[0]
            matched_projects = []
            for p in projects:
                p_text = f"{p.name} {p.description} {p.technologies} {p.user_contribution or ''}".lower()
                if skill_query in p_text or norm_name.lower() in p_text:
                    matched_projects.append(p.name)

            if matched_projects:
                proj_boost = min(0.20, len(matched_projects) * 0.10)
                base_confidence += proj_boost
                evidence_items.append(
                    f"Demonstrated in verified project work: {', '.join(matched_projects[:2])}"
                )
            else:
                evidence_items.append("Declared without explicit code repository or project deliverable evidence")

            # Final estimated confidence capped at 0.95
            final_confidence = round(min(0.95, max(0.20, base_confidence)), 2)

            # Determine verified proficiency level
            if final_confidence >= 0.75:
                verified_level = "Advanced"
                verified_strengths.append(norm_name)
            elif final_confidence >= 0.50:
                verified_level = "Intermediate"
            else:
                verified_level = "Beginner"

            analyzed_skills.append(
                AnalyzedSkill(
                    name=norm_name,
                    category=s.category or "Development",
                    level=verified_level,
                    confidence=final_confidence,
                    evidence=evidence_items
                )
            )

        # Experience summary synthesis
        experience_summary = (
            f"Candidate displays foundational background as {profile.status or 'Student'} "
            f"({profile.education or 'Technical degree'}) with {len(projects)} referenced project(s). "
            f"{len(verified_strengths)} skill(s) supported by concrete implementation evidence."
        )

        return ProfileAnalysisOutput(
            analyzed_skills=analyzed_skills,
            experience_summary=experience_summary,
            verified_strengths=verified_strengths
        )


profile_analyzer_agent = ProfileAnalyzerAgent()
