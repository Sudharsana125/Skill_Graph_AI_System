"""
SkillTwin AI — Skill Transfer Intelligence Engine.
Analyzes candidate's existing competencies and identifies transferable bridges
to target role requirements, eliminating redundant learning recommendations.
"""
from typing import List, Dict, Any
from backend.app.schemas.schemas import TransferableSkillSchema as TransferableSkill


# Knowledge rules defining how technical disciplines transfer into modern requirements
TRANSFER_RULES: List[Dict[str, Any]] = [
    {
        "matches": ["python", "py"],
        "target": "Data Analysis",
        "grade": "Strongly Transferable",
        "why": "Core Python syntax, functional programming, and data structure manipulation directly transfer into exploratory analytics and metric generation.",
        "reduction": 70,
        "tip": "Focus on domain statistics rather than relearning Python syntax from scratch."
    },
    {
        "matches": ["python", "py"],
        "target": "RAG",
        "grade": "Strongly Transferable",
        "why": "Python handles chunking algorithms, document loaders, vector store API queries, and async LLM requests natively.",
        "reduction": 65,
        "tip": "Leverage your Python foundation directly into LangChain/LlamaIndex chunking scripts."
    },
    {
        "matches": ["python", "py"],
        "target": "AI Agents",
        "grade": "Strongly Transferable",
        "why": "Agent loops, stateful graphs, tool execution, and schema parsing are built with standard Python classes and async coroutines.",
        "reduction": 60,
        "tip": "Combine Python object modeling with function-calling schemas."
    },
    {
        "matches": ["machine learning", "ml"],
        "target": "Deep Learning",
        "grade": "Strongly Transferable",
        "why": "Loss functions, gradient descent optimization, overfitting regularization, and train/val/test splits directly transfer to neural network architectures.",
        "reduction": 65,
        "tip": "Transition from Scikit-Learn pipelines to PyTorch tensor operations."
    },
    {
        "matches": ["machine learning", "ml"],
        "target": "RAG",
        "grade": "Strongly Transferable",
        "why": "Vector cosine similarity, embeddings, and ranking metrics are grounded in classical ML dimensionality reduction.",
        "reduction": 60,
        "tip": "Treat semantic search as an embedding space retrieval problem."
    },
    {
        "matches": ["fastapi", "apis", "rest api"],
        "target": "Docker",
        "grade": "Transferable",
        "why": "FastAPI applications require port exposure, uvicorn entrypoints, and virtual environment isolation—the exact elements codified in a Dockerfile.",
        "reduction": 50,
        "tip": "Containerize your existing FastAPI app as your first practical Docker exercise."
    },
    {
        "matches": ["fastapi", "backend"],
        "target": "System Design",
        "grade": "Transferable",
        "why": "Routing, asynchronous workers, dependency injection, and middleware in FastAPI introduce core microservice design patterns.",
        "reduction": 45,
        "tip": "Expand single-service FastAPI architectures into distributed microservice topologies."
    },
    {
        "matches": ["sql", "postgres", "mysql"],
        "target": "Data Analysis",
        "grade": "Strongly Transferable",
        "why": "GROUP BY aggregations, window functions, and JOIN schemas map 1-to-1 to business intelligence reporting requirements.",
        "reduction": 80,
        "tip": "Connect your SQL queries directly into visualization dashboards (Power BI / Tableau)."
    },
    {
        "matches": ["sql", "databases"],
        "target": "Vector Databases",
        "grade": "Transferable",
        "why": "Database indexing, schema queries, persistence, and CRUD storage principles carry directly into ChromaDB/Pinecone indexes.",
        "reduction": 50,
        "tip": "Think of vector collections as tables where rows are indexed by high-dimensional embeddings."
    },
    {
        "matches": ["react", "javascript", "typescript"],
        "target": "Full Stack Developer",
        "grade": "Strongly Transferable",
        "why": "Client state management, REST integration, asynchronous promises, and component hierarchies translate directly into full stack workflows.",
        "reduction": 75,
        "tip": "Pair your React frontends with Node or FastAPI backends."
    },
    {
        "matches": ["git", "github"],
        "target": "MLOps",
        "grade": "Foundational",
        "why": "Branching strategies, pull requests, and commit hygiene form the foundation of automated CI/CD and model versioning pipelines.",
        "reduction": 40,
        "tip": "Upgrade from manual Git pushes to GitHub Actions automation."
    }
]


class SkillTransferEngine:
    """Evaluates transferability between candidate skills and role deficits."""

    def analyze_transfers(
        self,
        current_skills: List[str],
        missing_skills: List[str]
    ) -> List[TransferableSkill]:
        transfers: List[TransferableSkill] = []
        user_skills_clean = [s.strip().lower() for s in current_skills]
        missing_clean = [m.strip().lower() for m in missing_skills]

        seen_transfers = set()

        for rule in TRANSFER_RULES:
            # Check if user has the matching skill
            has_matching_skill = None
            for s in user_skills_clean:
                if any(match in s for match in rule["matches"]):
                    has_matching_skill = s
                    break

            if not has_matching_skill:
                continue

            # Check if target requirement is in the user's missing/gap skills or target role
            target_matches = False
            for m in missing_clean:
                if rule["target"].lower() in m or m in rule["target"].lower():
                    target_matches = True
                    break

            if target_matches or len(missing_skills) == 0:
                key = f"{has_matching_skill}->{rule['target']}"
                if key not in seen_transfers:
                    seen_transfers.add(key)
                    transfers.append(
                        TransferableSkill(
                            existing_skill=has_matching_skill.capitalize(),
                            target_requirement=rule["target"],
                            transferability_grade=rule["grade"],
                            why_it_transfers=rule["why"],
                            effort_reduction_pct=rule["reduction"],
                            learning_tip=rule["tip"]
                        )
                    )

        # Ensure at least 2 default educational transfer entries if gaps are empty
        if not transfers and len(current_skills) > 0:
            primary = current_skills[0]
            transfers.append(
                TransferableSkill(
                    existing_skill=primary,
                    target_requirement="Modern Software Architecture",
                    transferability_grade="Foundational",
                    why_it_transfers=f"Your competency in {primary} demonstrates underlying algorithmic logic, problem decomposition, and debugging fundamentals.",
                    effort_reduction_pct=50,
                    learning_tip="Apply existing procedural knowledge directly to architectural patterns."
                )
            )

        return transfers


skill_transfer_engine = SkillTransferEngine()
