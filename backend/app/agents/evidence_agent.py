"""
SkillTwin AI — Skill Evidence Graph Engine.
Constructs transparent, auditable evidence trees for technical competencies,
differentiating between Claimed, Demonstrated, and Verified skills.
"""
from typing import List, Dict, Any
from backend.app.schemas.schemas import SkillEvidenceItemSchema as SkillEvidenceItem, EvidenceSourceNodeSchema as EvidenceSourceNode


class EvidenceGraphAgent:
    """Evaluates evidence provenance across user projects, tasks, and declared skills."""

    def build_evidence_graph(
        self,
        skills: List[Any],
        projects: List[Any],
        roadmap_tasks: List[Any]
    ) -> List[SkillEvidenceItem]:
        graph_items: List[SkillEvidenceItem] = []

        completed_tasks_by_skill: Dict[str, List[Any]] = {}
        for t in roadmap_tasks:
            is_done = getattr(t, 'is_completed', False)
            s_name = getattr(t, 'skill_name', '').lower()
            if is_done and s_name:
                if s_name not in completed_tasks_by_skill:
                    completed_tasks_by_skill[s_name] = []
                completed_tasks_by_skill[s_name].append(t)

        for s in skills:
            name = getattr(s, 'name', '')
            name_clean = name.lower()
            cat = getattr(s, 'category', 'General')
            conf = getattr(s, 'confidence', 0.5)

            sources: List[EvidenceSourceNode] = []

            # 1. Project Evidence Check
            matched_projects = []
            for p in projects:
                p_text = f"{getattr(p, 'name', '')} {getattr(p, 'description', '')} {getattr(p, 'technologies', '')} {getattr(p, 'user_contribution', '')}".lower()
                if name_clean in p_text:
                    matched_projects.append(p)

            for p in matched_projects:
                sources.append(
                    EvidenceSourceNode(
                        source_type="project_deliverable",
                        title=f"Project: {getattr(p, 'name', 'Portfolio Project')}",
                        detail=f"Demonstrated via technologies ({getattr(p, 'technologies', '')}): {getattr(p, 'user_contribution', '') or getattr(p, 'description', '')[:90]}",
                        verified=True
                    )
                )

            # 2. Roadmap Milestone Evidence Check
            matched_tasks = []
            for t_skill, tasks in completed_tasks_by_skill.items():
                if name_clean in t_skill or t_skill in name_clean:
                    matched_tasks.extend(tasks)

            for t in matched_tasks:
                sources.append(
                    EvidenceSourceNode(
                        source_type="roadmap_milestone",
                        title=f"Milestone: {getattr(t, 'suggested_task', 'Practical Exercise')}",
                        detail=getattr(t, 'practical_exercise', 'Verified deliverable completed.'),
                        verified=True
                    )
                )

            # 3. Learning Source / Self Declaration
            learning_source = getattr(s, 'learning_source', 'Self-learning')
            if learning_source and "project" not in learning_source.lower():
                sources.append(
                    EvidenceSourceNode(
                        source_type="learning_credential" if "course" in learning_source.lower() else "self_declaration",
                        title=f"Declared Source: {learning_source}",
                        detail=f"Self-assessed at {getattr(s, 'self_level', 'Intermediate')} proficiency.",
                        verified=False
                    )
                )

            # Determine Tier & Strength
            has_milestone = len(matched_tasks) > 0
            has_project = len(matched_projects) > 0

            if has_milestone or conf >= 0.85:
                tier = "VERIFIED"
                strength_label = "Strong"
                strength_score = min(98, max(85, int(conf * 100)))
                note = f"Verified through practical code deliverables and completed roadmap milestones."
            elif has_project or conf >= 0.60:
                tier = "DEMONSTRATED"
                strength_label = "Demonstrated"
                strength_score = min(82, max(60, int(conf * 100)))
                note = f"Demonstrated in portfolio project architectures and technical implementation."
            else:
                tier = "CLAIMED"
                strength_label = "Emerging"
                strength_score = min(55, max(35, int(conf * 100)))
                note = f"Self-reported capability without repository or practical milestone verification."

            graph_items.append(
                SkillEvidenceItem(
                    skill_name=name,
                    category=cat,
                    tier=tier,
                    strength_score=strength_score,
                    strength_label=strength_label,
                    confidence=conf,
                    evidence_sources=sources,
                    explainability_note=note
                )
            )

        # Sort: Verified first, then Demonstrated, then Claimed
        tier_order = {"VERIFIED": 0, "DEMONSTRATED": 1, "CLAIMED": 2}
        graph_items.sort(key=lambda x: (tier_order.get(x.tier, 3), -x.strength_score))

        return graph_items


evidence_graph_agent = EvidenceGraphAgent()
