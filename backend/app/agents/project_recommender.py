"""
Agent 5 — Project Recommendation Agent.
Recommends high-impact, portfolio-grade projects specifically tailored to close
identified skill gaps with concrete engineering outcomes for the chosen target role.
"""
from typing import List, Dict, Any
from backend.app.schemas.schemas import (
    SkillGapItem,
    ProjectRecommendationOutput,
    ProjectRecommendationSchema
)

ROLE_PROJECT_CATALOG: Dict[str, List[Dict[str, str]]] = {
    "data analyst": [
        {
            "title": "Executive E-Commerce Cohort & Revenue BI Suite",
            "problem": "Leadership lacks visibility into retention cohorts, customer lifetime value (LTV), and seasonal revenue dips across multiple marketing channels.",
            "skills_developed": "SQL, Power BI / Tableau, Excel, Data Modeling, DAX",
            "difficulty": "Intermediate",
            "estimated_duration": "4-6 days",
            "expected_outcome": "Automated analytical data pipeline with Star Schema relational model, custom DAX metrics (YoY growth, churn rates), and interactive executive dashboard.",
            "why_matches_gaps": "Proves mastery of end-to-end data modeling, SQL aggregations, and business KPI storytelling demanded by top data analytics employers."
        },
        {
            "title": "Automated Financial Reconciliation & ETL Pipeline",
            "problem": "Manual monthly reconciliation across stripe transactions, bank ledgers, and CRM data causes billing delays and reporting errors.",
            "skills_developed": "Python, Pandas, SQL, Data Cleansing, Automated Reporting",
            "difficulty": "Intermediate",
            "estimated_duration": "5-7 days",
            "expected_outcome": "Reproducible Python ETL script that cleanses raw transaction dumps, identifies anomalies, and generates automated Excel/PDF variance summaries.",
            "why_matches_gaps": "Bridges core SQL strengths with automated Python data wrangling, closing high-priority gaps in data manipulation efficiency."
        },
        {
            "title": "Customer Churn Diagnostic & Segment Retention Report",
            "problem": "Product teams need statistical proof of which user behaviors and subscription tiers drive 80% of customer churn.",
            "skills_developed": "SQL, Statistical Analysis, Data Storytelling, Tableau / Power BI",
            "difficulty": "Beginner - Intermediate",
            "estimated_duration": "3-5 days",
            "expected_outcome": "Multi-page diagnostic presentation with Kaplan-Meier survival curves, cohort churn breakdown, and actionable product recommendations.",
            "why_matches_gaps": "Directly establishes competence in data storytelling, cohort segmentation, and translating quantitative data into strategic business decisions."
        }
    ],
    "data scientist": [
        {
            "title": "Predictive Customer Churn & Propensity ML Pipeline",
            "problem": "Subscription services experience churn without early warning indicators; marketing teams need probability scores to trigger automated retention campaigns.",
            "skills_developed": "Python, Scikit-Learn, Feature Engineering, SQL, XGBoost",
            "difficulty": "Intermediate",
            "estimated_duration": "6-8 days",
            "expected_outcome": "Trained classification pipeline achieving 86%+ ROC-AUC with stratified cross-validation, SHAP feature interpretability plots, and model card documentation.",
            "why_matches_gaps": "Demonstrates production feature engineering, statistical model selection, and explainable AI techniques essential for enterprise data science."
        },
        {
            "title": "Real-Time Anomaly Detection & Inference API",
            "problem": "Financial platforms require instant detection of fraudulent transaction sequences before settlement.",
            "skills_developed": "Machine Learning, Python, FastAPI, Unsupervised Learning, Isolation Forests",
            "difficulty": "Advanced",
            "estimated_duration": "7-10 days",
            "expected_outcome": "Lightweight inference API scoring transaction vectors with sub-50ms latency and automated logging of anomalous events.",
            "why_matches_gaps": "Bridges theoretical machine learning modeling with practical deployment and API integration, closing key system gaps."
        },
        {
            "title": "A/B Testing Statistical Experimentation Engine",
            "problem": "Product experimentation teams make decisions on noisy conversion data without proper power analysis and sample size verification.",
            "skills_developed": "Statistics, Hypothesis Testing, Python, Pandas, Bootstrap Resampling",
            "difficulty": "Intermediate",
            "estimated_duration": "4-5 days",
            "expected_outcome": "Interactive statistical evaluation toolkit computing minimum detectable effect, p-values, confidence bounds, and sequential testing stops.",
            "why_matches_gaps": "Validates rigorous experimental design and statistical inference foundations required for senior data scientist positions."
        }
    ],
    "full stack": [
        {
            "title": "Collaborative Real-Time Project Workspace Platform",
            "problem": "Distributed remote teams need synchronized kanban boards, live document editing, and role-based access without page refreshes.",
            "skills_developed": "React, TypeScript, FastAPI / Node.js, WebSockets, PostgreSQL, Docker",
            "difficulty": "Advanced",
            "estimated_duration": "7-10 days",
            "expected_outcome": "Full-stack web application with responsive UI, real-time WebSocket state synchronization, JWT auth, and automated database migrations.",
            "why_matches_gaps": "Proves deep competency across frontend reactive components, backend concurrency, and database transaction integrity."
        },
        {
            "title": "Modern E-Commerce Storefront with Webhooks & Payments",
            "problem": "Businesses need modern headless e-commerce storefronts with resilient inventory management and secure payment processing.",
            "skills_developed": "React, REST APIs, SQL, Docker, Tailwind CSS, Stripe API",
            "difficulty": "Intermediate",
            "estimated_duration": "5-7 days",
            "expected_outcome": "Polished responsive web application with product search filters, cart persistence, payment checkout webhooks, and admin inventory controls.",
            "why_matches_gaps": "Demonstrates commercial software development standards including third-party API webhooks, state management, and modern UI design."
        },
        {
            "title": "Enterprise Microservice API Gateway & Analytics Dashboard",
            "problem": "Microservice architectures require unified client gateways with rate limiting, logging, and interactive operational metrics.",
            "skills_developed": "Docker, FastAPI, React, SQL, System Design, JWT",
            "difficulty": "Intermediate",
            "estimated_duration": "6-8 days",
            "expected_outcome": "Containerized API gateway routing requests to backend microservices with an administrative React telemetry dashboard.",
            "why_matches_gaps": "Validates system design, containerization, and modern frontend/backend integration in a single portfolio capstone."
        }
    ],
    "mlops": [
        {
            "title": "Automated Model Training & Registry CI/CD Pipeline",
            "problem": "Data science models frequently break in production due to unversioned dependencies, unvalidated datasets, and lack of reproducible artifacts.",
            "skills_developed": "Docker, MLOps, CI/CD, GitHub Actions, Python, MLflow",
            "difficulty": "Advanced",
            "estimated_duration": "6-8 days",
            "expected_outcome": "Automated GitHub Actions pipeline that triggers on dataset updates, runs unit tests, registers validated model artifacts, and tags release images.",
            "why_matches_gaps": "Establishes core enterprise MLOps engineering practices demanded by production AI engineering organizations."
        },
        {
            "title": "High-Throughput Model Serving & Inference Gateway",
            "problem": "Production AI services must handle thousands of concurrent queries with batching, health monitoring, and graceful fallback handling.",
            "skills_developed": "Docker, Kubernetes, FastAPI, Triton / TorchServe, System Design, Prometheus",
            "difficulty": "Advanced",
            "estimated_duration": "7-10 days",
            "expected_outcome": "Containerized inference server with dynamic request batching, Prometheus latency metrics, and sub-40ms P95 response times.",
            "why_matches_gaps": "Transforms standard ML scripts into carrier-grade, highly available microservices ready for cloud deployment."
        },
        {
            "title": "Production Data Drift & Model Observability Stack",
            "problem": "Deployed models silently decay as consumer behavior evolves; engineering teams need automated alerts when input data distributions shift.",
            "skills_developed": "Python, Docker, Evidently AI / Prometheus, Cloud, Data Monitoring",
            "difficulty": "Intermediate",
            "estimated_duration": "5-7 days",
            "expected_outcome": "Automated drift detection daemon monitoring production inference logs, calculating Kolmogorov-Smirnov statistics, and sending alerts.",
            "why_matches_gaps": "Directly closes gaps in post-deployment maintenance, reliability engineering, and continuous model governance."
        }
    ],
    "agent": [
        {
            "title": "Hierarchical Multi-Agent Research & Execution Swarm",
            "problem": "Complex knowledge work requires specialized agents planning sub-tasks, querying web APIs, validating facts, and synthesizing reports in parallel.",
            "skills_developed": "Python, AI Agents, LangGraph, LLMs, Tool Use, Async IO",
            "difficulty": "Advanced",
            "estimated_duration": "7-10 days",
            "expected_outcome": "Orchestrated multi-agent state graph with specialized researcher, fact-checker, and summarizer roles delivering verified structured outputs.",
            "why_matches_gaps": "Demonstrates mastery of cutting-edge agentic state graphs, tool-calling schemas, and autonomous self-correction mechanisms."
        },
        {
            "title": "Self-Correcting Autonomous Coding & Testing Copilot",
            "problem": "Automated code generation often outputs broken syntax; agents must autonomously execute code, capture stderr, and iterate until tests pass.",
            "skills_developed": "AI Agents, Python, Docker Sandboxing, Tool Calling, LLM Evaluation",
            "difficulty": "Advanced",
            "estimated_duration": "6-8 days",
            "expected_outcome": "Sandboxed autonomous agent that generates code, runs pytest inside an isolated container, debugs errors from tracebacks, and outputs verified pull requests.",
            "why_matches_gaps": "Proves advanced knowledge of programmatic execution sandboxes, error loops, and reliability guardrails for LLMs."
        },
        {
            "title": "Enterprise Vector RAG Service with Hybrid Citation Reranking",
            "problem": "Enterprise teams need to query internal PDFs and source code with zero hallucinations, strict access controls, and transparent source citations.",
            "skills_developed": "Python, RAG, ChromaDB, FastAPI, Cross-Encoders, Docker",
            "difficulty": "Intermediate",
            "estimated_duration": "5-7 days",
            "expected_outcome": "Production RAG microservice implementing hybrid BM25 + dense vector search, reranking, and citation-backed answer generation.",
            "why_matches_gaps": "Addresses the #1 market requirement for modern generative AI and LLM software engineering roles."
        }
    ],
    "backend": [
        {
            "title": "High-Concurrency Order Processing Microservice",
            "problem": "Flash sales cause database lockups and API timeouts; backend systems require asynchronous queuing and transactional consistency.",
            "skills_developed": "Python, FastAPI, PostgreSQL, Redis, Docker, System Design",
            "difficulty": "Intermediate - Advanced",
            "estimated_duration": "6-8 days",
            "expected_outcome": "High-throughput asynchronous service utilizing Redis caching, optimistic locking, and background task queues passing 1,000 req/sec benchmarks.",
            "why_matches_gaps": "Demonstrates enterprise database optimization, distributed caching, and microservice decoupling fundamentals."
        },
        {
            "title": "Distributed Event-Driven Notification & Webhook Engine",
            "problem": "Multi-tenant platforms must reliably dispatch millions of webhooks with retry backoff, dead-letter queues, and HMAC signature security.",
            "skills_developed": "Python, Celery / RabbitMQ, FastAPI, Docker, Security, SQL",
            "difficulty": "Advanced",
            "estimated_duration": "7-10 days",
            "expected_outcome": "Resilient event-driven engine processing queued events with exponential backoff retries, signature verification, and delivery telemetry.",
            "why_matches_gaps": "Validates mastery of asynchronous message brokers, distributed worker architectures, and secure API protocols."
        },
        {
            "title": "Enterprise API Gateway with Token Bucket Rate Limiting",
            "problem": "Internal APIs require centralized authentication, request throttling, CORS protection, and standardized telemetry logging.",
            "skills_developed": "FastAPI, Docker, System Design, JWT Auth, Redis, APIs",
            "difficulty": "Intermediate",
            "estimated_duration": "5-7 days",
            "expected_outcome": "Lightweight reverse-proxy gateway enforcing token-bucket rate limiting via Redis, validating JWT bearer claims, and logging structured audit events.",
            "why_matches_gaps": "Provides proof of robust system architecture, enterprise authentication design, and defense-in-depth API security."
        }
    ]
}


class ProjectRecommenderAgent:
    """Specialized agent designing gap-targeted engineering portfolio deliverables."""

    ROLE = "Portfolio & Applied Project Director"
    GOAL = "Recommend projects targeting intersectional skill deficits to provide undeniable evidence of competency."

    def recommend(
        self,
        target_role: str,
        gaps: List[SkillGapItem]
    ) -> ProjectRecommendationOutput:
        role_lower = (target_role or "AI Engineer").lower()
        unmet_skills = [g.skill_name for g in gaps if g.priority in ["HIGH", "MEDIUM"]]
        gap_summary = ", ".join(unmet_skills[:3]) if unmet_skills else "Core Architecture"

        # Determine best role catalog match
        selected_catalog = None
        if "data analyst" in role_lower or "business intelligence" in role_lower:
            selected_catalog = ROLE_PROJECT_CATALOG["data analyst"]
        elif "data scientist" in role_lower:
            selected_catalog = ROLE_PROJECT_CATALOG["data scientist"]
        elif "full stack" in role_lower or "web developer" in role_lower:
            selected_catalog = ROLE_PROJECT_CATALOG["full stack"]
        elif "mlops" in role_lower or "infrastructure" in role_lower:
            selected_catalog = ROLE_PROJECT_CATALOG["mlops"]
        elif "agent" in role_lower or "genai" in role_lower:
            selected_catalog = ROLE_PROJECT_CATALOG["agent"]
        elif "backend" in role_lower:
            selected_catalog = ROLE_PROJECT_CATALOG["backend"]
        elif "data" in role_lower:
            selected_catalog = ROLE_PROJECT_CATALOG["data analyst"]
        else: # Default to AI Engineer / Agent track
            selected_catalog = ROLE_PROJECT_CATALOG["agent"]

        recommendations: List[ProjectRecommendationSchema] = []
        for proj in selected_catalog:
            recommendations.append(
                ProjectRecommendationSchema(
                    title=proj["title"],
                    problem=proj["problem"],
                    skills_developed=proj["skills_developed"],
                    difficulty=proj["difficulty"],
                    estimated_duration=proj["estimated_duration"],
                    expected_outcome=proj["expected_outcome"],
                    why_matches_gaps=f"Directly accelerates your target role competency for {target_role} by closing key deficits in {gap_summary}.",
                    is_added_to_roadmap=False
                )
            )

        return ProjectRecommendationOutput(recommendations=recommendations)


project_recommender_agent = ProjectRecommenderAgent()
