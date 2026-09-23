"""
Agent 4 — Roadmap Agent.
Synthesizes verified skill gaps, priority levels, weekly time commitments,
and target timeline into a personalized, highly relevant 5-phase practical action plan.
"""
from typing import List, Dict, Any
from backend.app.schemas.schemas import (
    SkillGapItem,
    ProfileInput,
    RoadmapOutput,
    RoadmapTaskSchema
)

# Rich curriculum knowledge base mapping specific skills to practical engineering deliverables
SKILL_CURRICULUM_REGISTRY: Dict[str, Dict[str, str]] = {
    "sql": {
        "why": "SQL is the foundational data manipulation language for relational modeling, aggregation, and querying large-scale analytical tables.",
        "objective": "Master complex analytical queries including window functions, CTEs, indexing, and query execution plan optimization.",
        "task": "Author optimized SQL queries featuring window functions (ROW_NUMBER, LAG, LEAD, RANK) and recursive CTEs over analytical datasets.",
        "exercise": "Write a schema migration and complex analytical query suite analyzing customer retention cohorts and monthly revenue metrics.",
        "criteria": "Pass all query correctness tests with execution time under 50ms and documented EXPLAIN ANALYZE plans."
    },
    "excel": {
        "why": "Excel remains the industry standard for fast financial modeling, ad-hoc pivot analysis, and executive stakeholder reporting.",
        "objective": "Master advanced formulas (XLOOKUP, INDEX/MATCH, dynamic arrays), Power Query ETL, and scenario modeling.",
        "task": "Build an automated financial model or operational tracker using Power Query for data cleansing and dynamic array formulas.",
        "exercise": "Clean messy multi-tab CSV exports with Power Query and construct an automated KPI executive summary sheet.",
        "criteria": "Fully automated refreshable workbook with dynamic formulas and zero hardcoded calculations."
    },
    "power bi": {
        "why": "Power BI connects disparate data sources into interactive executive BI dashboards with real-time slicing and DAX metrics.",
        "objective": "Master Star Schema dimensional modeling, DAX measures (CALCULATE, time intelligence), and interactive UI/UX storytelling.",
        "task": "Design an interactive enterprise KPI dashboard with DAX time-intelligence calculations (YTD, YoY Growth, Rolling 30D).",
        "exercise": "Import relational tables, establish 1-to-many relationships, write custom DAX measures, and publish interactive report views.",
        "criteria": "Operational multi-page BI dashboard with cross-filtering, tooltip cards, and verified DAX calculations."
    },
    "tableau": {
        "why": "Tableau enables deep exploratory data analysis and visual storytelling for technical and non-technical leadership.",
        "objective": "Master Level of Detail (LOD) calculations, parameters, dual-axis charts, and storytelling dashboards.",
        "task": "Construct an executive visual analytics dashboard with fixed LOD expressions and dynamic parameter controls.",
        "exercise": "Create custom cohort heatmaps, geographical distribution maps, and dynamic parameter-driven trendlines.",
        "criteria": "Published interactive Tableau workbook with sub-second filter response and clear visual storytelling."
    },
    "statistics": {
        "why": "Rigorous statistical methods prevent false discoveries in A/B testing, feature selection, and predictive modeling.",
        "objective": "Master hypothesis testing (t-tests, chi-squared, ANOVA), confidence intervals, p-values, and distribution fitting.",
        "task": "Conduct an end-to-end hypothesis testing framework on experimental conversion data with power calculations.",
        "exercise": "Write Python scripts calculating sample size requirements, conducting two-sample t-tests, and computing bootstrap confidence intervals.",
        "criteria": "Documented statistical significance report with p-values, effect sizes, and risk analysis."
    },
    "machine learning": {
        "why": "Machine learning allows systems to recognize complex non-linear patterns and predict future outcomes from historical features.",
        "objective": "Master supervised/unsupervised algorithms, cross-validation, regularization, and model evaluation metrics.",
        "task": "Implement an end-to-end scikit-learn pipeline with custom transformers, hyperparameter search, and stratified k-fold validation.",
        "exercise": "Train Random Forest, XGBoost, and Logistic Regression models on tabular data; compare ROC-AUC, Precision-Recall, and feature importances.",
        "criteria": "Reproducible Jupyter/Python pipeline achieving target baseline metric with cross-validation."
    },
    "deep learning": {
        "why": "Deep neural networks are the foundational architecture powering computer vision, speech recognition, and modern LLMs.",
        "objective": "Master backpropagation, PyTorch tensors, custom loss functions, learning rate schedulers, and transfer learning.",
        "task": "Construct, train, and evaluate a deep neural network with PyTorch using early stopping and gradient clipping.",
        "exercise": "Implement a custom PyTorch DataLoader, build a multi-layer neural network with Dropout/BatchNorm, and log training loss curves.",
        "criteria": "Trained PyTorch model achieving test set convergence with documented loss and accuracy benchmarks."
    },
    "react": {
        "why": "React powers modern interactive web applications with component reusability, virtual DOM diffing, and reactive state.",
        "objective": "Master hooks (useState, useEffect, useMemo, custom hooks), component lifecycle, and state management.",
        "task": "Construct a responsive component architecture with custom hooks, client-side caching, and optimistic UI updates.",
        "exercise": "Build an interactive web interface consuming asynchronous REST APIs with error boundaries and smooth skeleton loaders.",
        "criteria": "Accessible, responsive web UI passing Lighthouse performance tests with zero console warnings."
    },
    "javascript": {
        "why": "JavaScript is the universal language of the modern web, enabling interactive frontend experiences and server-side runtimes.",
        "objective": "Master asynchronous event loops, Promises, ES6+ array methods, closures, and DOM event delegation.",
        "task": "Build an asynchronous client consuming REST APIs with debounce search, local state caching, and error handlers.",
        "exercise": "Write clean modular ES6+ JavaScript modules handling async data fetching, DOM updates, and custom events.",
        "criteria": "Fully functional responsive client script passing all unit tests without third-party dependencies."
    },
    "typescript": {
        "why": "TypeScript adds static typing and compile-time safety to JavaScript, eliminating entire classes of runtime production bugs.",
        "objective": "Master interfaces, generics, union types, asynchronous async/await patterns, and DOM manipulation.",
        "task": "Refactor core application logic to strict TypeScript with comprehensive type interfaces and utility types.",
        "exercise": "Build a type-safe API client with generic request/response handlers and runtime schema validation.",
        "criteria": "Pass strict `tsc --noEmit` check with zero `any` types and complete unit test coverage."
    },
    "docker": {
        "why": "Docker isolates runtime dependencies and guarantees that applications run identically in local development and production cloud clusters.",
        "objective": "Master multi-stage builds, container networking, volumes, environment security, and Docker Compose orchestration.",
        "task": "Author optimized multi-stage Dockerfiles minimizing image sizes and configure a multi-container Docker Compose stack.",
        "exercise": "Containerize the application service with non-root security context, automated healthchecks, and persistent volume caching.",
        "criteria": "Production Docker image builds under 200MB and starts cleanly via `docker compose up`."
    },
    "fastapi": {
        "why": "FastAPI delivers high-performance async REST endpoints with automatic OpenAPI documentation and Pydantic validation.",
        "objective": "Master asynchronous routing, dependency injection, middleware, rate-limiting, and error handlers.",
        "task": "Implement asynchronous request handling, input validation using Pydantic, and automated OpenAPI documentation.",
        "exercise": "Construct a clean RESTful service processing structured payloads with dependency injection, JWT auth, and automated tests.",
        "criteria": "Endpoints pass integration tests with sub-100ms latency and interactive Swagger UI docs."
    },
    "rag": {
        "why": "RAG grounds LLM outputs in verified private enterprise knowledge, eliminating hallucinations and ensuring factual accuracy.",
        "objective": "Master semantic chunking, embedding generation, vector similarity search, hybrid keyword reranking, and citation synthesis.",
        "task": "Build an asynchronous vector retrieval service using ChromaDB with hybrid BM25 search and cross-encoder reranking.",
        "exercise": "Ingest unstructured PDF/Markdown documents, chunk with semantic overlap, index vectors, and retrieve top-k passages.",
        "criteria": "Verified retrieval accuracy exceeding 85% on golden benchmark questions with source citations."
    },
    "llms": {
        "why": "Large Language Models are the cognitive reasoning engines for modern generative applications and agentic workflows.",
        "objective": "Master prompt engineering, structured JSON outputs, function/tool calling schemas, token optimization, and temperature controls.",
        "task": "Design a structured prompt orchestration pipeline with dynamic few-shot examples and schema-enforced JSON validation.",
        "exercise": "Implement automated model fallbacks, retry logic with exponential backoff, and latency/token usage tracking.",
        "criteria": "Reliable 100% schema-compliant outputs validated through automated Pydantic parsers."
    },
    "ai agents": {
        "why": "Autonomous agent architectures empower LLMs to reason iteratively, invoke external APIs/tools, and solve multi-step problems.",
        "objective": "Master planning loops, tool calling schemas, state machine graphs (LangGraph), memory management, and error self-correction.",
        "task": "Construct an autonomous multi-step agent loop with tool-calling capabilities and error recovery.",
        "exercise": "Build an agent using state machines that plans sub-tasks, queries external search tools, validates outputs, and synthesizes answers.",
        "criteria": "Agent successfully executes multi-turn tool calling without infinite loops and logs full execution trace."
    },
    "mlops": {
        "why": "MLOps ensures ML models transition smoothly from experimentation to resilient 24/7 production deployment.",
        "objective": "Master model registries, automated CI/CD validation, artifact versioning, drift monitoring, and rolling deployments.",
        "task": "Build an automated ML training and deployment pipeline with model artifact versioning and drift detection.",
        "exercise": "Set up GitHub Actions to trigger automated unit testing, model evaluation benchmarking, and container registry pushing.",
        "criteria": "Automated pipeline triggers on commit, evaluates validation metric, and gates production deployment."
    },
    "system design": {
        "why": "System design skills ensure applications scale gracefully under high concurrent load with high availability and low latency.",
        "objective": "Master distributed caching, database indexing, message queues, rate limiting, and microservice decoupling.",
        "task": "Architect a scalable distributed service design addressing bottlenecks, caching strategies, and fault tolerance.",
        "exercise": "Produce an architectural design document detailing load balancing, Redis caching layers, async task queues, and DB read replicas.",
        "criteria": "Comprehensive architectural diagram and design rationale with SLA/SLO failure mode analysis."
    },
    "python": {
        "why": "Python is the dominant language for modern data science, artificial intelligence, backend engineering, and automation.",
        "objective": "Master idiomatic Python, generator functions, context managers, type hints, asynchronous asyncio routines, and pytest.",
        "task": "Build a modular, type-annotated Python package with comprehensive pytest test coverage and modern packaging.",
        "exercise": "Implement asynchronous worker routines with concurrency semaphores, exception logging, and dataclass models.",
        "criteria": "Python codebase passing ruff/flake8 linting, mypy type checks, and 90%+ pytest coverage."
    }
}


class RoadmapAgent:
    """Specialized agent to engineer actionable, project-driven learning roadmaps."""

    ROLE = "Curriculum Director & Engineering Mentor"
    GOAL = "Construct milestone-based learning paths prioritizing hands-on execution over passive media consumption."

    def _get_skill_curriculum(self, skill_name: str, target_role: str) -> Dict[str, str]:
        """Lookup or dynamically synthesize curriculum tasks tailored to the exact skill."""
        s_clean = skill_name.strip().lower()

        # Check direct or substring matches
        for key, curr in SKILL_CURRICULUM_REGISTRY.items():
            if key in s_clean or s_clean in key:
                return curr

        # Dynamic fallback for niche or custom skills
        return {
            "why": f"Mastering {skill_name} is essential to fulfill modern technical benchmarks for {target_role}.",
            "objective": f"Gain hands-on proficiency in core concepts, operational patterns, and industry tooling for {skill_name}.",
            "task": f"Build a practical implementation script or module demonstrating core capabilities of {skill_name}.",
            "exercise": f"Design and test a standalone component utilizing {skill_name} best practices with clean documentation.",
            "criteria": f"Working repository demonstrating clean {skill_name} structure with reproducible setup and test coverage."
        }

    def generate(
        self,
        profile: ProfileInput,
        gaps: List[SkillGapItem]
    ) -> RoadmapOutput:
        tasks: List[RoadmapTaskSchema] = []
        weekly_hours = profile.weekly_hours or 10
        role = profile.target_role or "AI Engineer"
        role_lower = role.lower()

        # Sort gaps by priority: HIGH first, then MEDIUM, then LOW
        priority_order = {"HIGH": 0, "MEDIUM": 1, "LOW": 2, "STRONG": 3}
        sorted_gaps = sorted(
            [g for g in gaps if g.priority != "STRONG"],
            key=lambda x: priority_order.get(x.priority, 2)
        )

        # -------------------------------------------------------------
        # Phase 1: Foundation (First primary deficit)
        # -------------------------------------------------------------
        phase1_skill = sorted_gaps[0].skill_name if sorted_gaps else "Core Engineering Foundations"
        c1 = self._get_skill_curriculum(phase1_skill, role)
        tasks.append(
            RoadmapTaskSchema(
                phase_number=1,
                phase_name=f"Phase 1: {phase1_skill} Foundations",
                week_label="Week 1-2",
                skill_name=phase1_skill,
                why_it_matters=c1["why"],
                learning_objective=c1["objective"],
                suggested_task=c1["task"],
                practical_exercise=c1["exercise"],
                estimated_hours=weekly_hours * 2,
                completion_criteria=c1["criteria"],
                is_completed=False
            )
        )

        # -------------------------------------------------------------
        # Phase 2: Core Competency (Second priority deficit)
        # -------------------------------------------------------------
        if len(sorted_gaps) > 1:
            phase2_skill = sorted_gaps[1].skill_name
        else:
            if "data" in role_lower or "analy" in role_lower:
                phase2_skill = "SQL & Data Modeling"
            elif "full" in role_lower or "web" in role_lower:
                phase2_skill = "REST APIs & Modern Web Frameworks"
            else:
                phase2_skill = "System Design & Architecture"

        c2 = self._get_skill_curriculum(phase2_skill, role)
        tasks.append(
            RoadmapTaskSchema(
                phase_number=2,
                phase_name=f"Phase 2: {phase2_skill} Deep-Dive",
                week_label="Week 3-4",
                skill_name=phase2_skill,
                why_it_matters=c2["why"],
                learning_objective=c2["objective"],
                suggested_task=c2["task"],
                practical_exercise=c2["exercise"],
                estimated_hours=weekly_hours * 2,
                completion_criteria=c2["criteria"],
                is_completed=False
            )
        )

        # -------------------------------------------------------------
        # Phase 3: Advanced Systems (Third priority deficit or specialized layer)
        # -------------------------------------------------------------
        if len(sorted_gaps) > 2:
            phase3_skill = sorted_gaps[2].skill_name
        else:
            if "data" in role_lower or "analy" in role_lower:
                phase3_skill = "Interactive BI Dashboards & KPIs"
            elif "full" in role_lower or "web" in role_lower:
                phase3_skill = "Database Architecture & Optimization"
            elif "mlops" in role_lower:
                phase3_skill = "CI/CD & Model Serving"
            else:
                phase3_skill = "Production Architecture"

        c3 = self._get_skill_curriculum(phase3_skill, role)
        tasks.append(
            RoadmapTaskSchema(
                phase_number=3,
                phase_name=f"Phase 3: {phase3_skill} Specialization",
                week_label="Week 5-6",
                skill_name=phase3_skill,
                why_it_matters=c3["why"],
                learning_objective=c3["objective"],
                suggested_task=c3["task"],
                practical_exercise=c3["exercise"],
                estimated_hours=weekly_hours * 2,
                completion_criteria=c3["criteria"],
                is_completed=False
            )
        )

        # -------------------------------------------------------------
        # Phase 4: Applied Capstone Build (Tailored strictly to target_role!)
        # -------------------------------------------------------------
        if "data analyst" in role_lower or "business intelligence" in role_lower:
            capstone_skill = "End-to-End Enterprise BI & Executive Analytics Suite"
            capstone_task = "Build an end-to-end executive business intelligence suite with SQL data modeling, automated ETL cleansing, and interactive Power BI/Tableau reports."
            capstone_exercise = "Ingest multi-source transactional sales data, design normalized dimensional Star Schema, write custom DAX/LOD measures, and present key cohort churn insights."
            capstone_criteria = "Public repository containing clean SQL DDL/DML scripts, automated refresh instructions, and interactive multi-tab BI dashboard."
        elif "data scientist" in role_lower:
            capstone_skill = "Production Machine Learning & Predictive Analytics Pipeline"
            capstone_task = "Construct an end-to-end predictive machine learning model with statistical feature engineering, hyperparameter search, and automated validation."
            capstone_exercise = "Engineer domain features from raw datasets, train XGBoost/Random Forest classifiers with cross-validation, and build an interactive Streamlit inference demo."
            capstone_criteria = "Reproducible GitHub repository with model weights, automated testing, ROC-AUC benchmarks, and interactive demo link."
        elif "full stack" in role_lower or "web developer" in role_lower:
            capstone_skill = "Full-Stack SaaS Platform Architecture"
            capstone_task = "Build an end-to-end full-stack web application featuring reactive UI components, secure RESTful backend APIs, and transactional database persistence."
            capstone_exercise = "Implement user authentication, relational schema migrations, responsive frontend views with React, and automated Docker containerization."
            capstone_criteria = "Deployable full-stack repository with automated migrations, integration tests, and responsive web user interface."
        elif "mlops" in role_lower:
            capstone_skill = "Automated Model CI/CD & Production Serving Stack"
            capstone_task = "Construct an automated ML model deployment and monitoring pipeline with containerized inference, model registry tracking, and drift alerts."
            capstone_exercise = "Set up GitHub Actions CI/CD to validate model benchmarks, build minimal Docker inference containers, and deploy automated healthcheck telemetry."
            capstone_criteria = "Clean GitOps repository with passing CI/CD pipelines, container registry tags, and live endpoint latency benchmarks."
        elif "agent" in role_lower or "genai" in role_lower:
            capstone_skill = "Autonomous Multi-Agent Orchestration Swarm"
            capstone_task = "Build a multi-agent state machine where specialized autonomous agents collaborate, use tools, validate schema outputs, and synthesize research."
            capstone_exercise = "Implement state graphs with LangGraph, integrate external search tools, manage conversation state memory, and stream structured deliverables."
            capstone_criteria = "Working multi-agent repository with executable test suite, visual state graph diagram, and structured execution traces."
        else: # AI Engineer default
            capstone_skill = "Enterprise Vector RAG & AI Agent Intelligence Engine"
            capstone_task = "Build an asynchronous enterprise retrieval-augmented generation engine querying private technical documents with hybrid vector search."
            capstone_exercise = "Implement semantic chunking, vector indexing in ChromaDB, async FastAPI streaming endpoints, and source citation grounding."
            capstone_criteria = "Public GitHub repo with comprehensive README, architectural diagram, and passing integration test suite."

        tasks.append(
            RoadmapTaskSchema(
                phase_number=4,
                phase_name=f"Phase 4: Applied {role} Capstone",
                week_label="Week 7-9",
                skill_name=capstone_skill,
                why_it_matters=f"Hiring leads for {role} prioritize verified, end-to-end practical deliverables over theoretical certifications.",
                learning_objective=f"Synthesize {phase1_skill}, {phase2_skill}, and {phase3_skill} into a cohesive, production-grade deliverable.",
                suggested_task=capstone_task,
                practical_exercise=capstone_exercise,
                estimated_hours=weekly_hours * 3,
                completion_criteria=capstone_criteria,
                is_completed=False
            )
        )

        # -------------------------------------------------------------
        # Phase 5: Production Deployment & Technical Presentation
        # -------------------------------------------------------------
        if "data" in role_lower or "analy" in role_lower:
            phase5_task = "Publish interactive executive report views, document executive business insights, and prepare a 3-minute video walkthrough of the analytical dashboard."
            phase5_criteria = "Live accessible report link and documented stakeholder executive summary deck."
        else:
            phase5_task = "Deploy backend service to cloud infrastructure (Render/AWS/GCP), attach custom domain with HTTPS, and configure automated GitHub Actions CI/CD."
            phase5_criteria = "Live accessible web URL and documented system architecture benchmark."

        tasks.append(
            RoadmapTaskSchema(
                phase_number=5,
                phase_name="Phase 5: Production Deployment & Showcase",
                week_label="Week 10-12",
                skill_name="Cloud Deployment & Professional Showcase",
                why_it_matters=f"Demonstrating verified, publicly accessible links for your {role} capstone dramatically increases interview callback conversions.",
                learning_objective="Deploy the capstone to live production infrastructure and record a concise technical architectural demo.",
                suggested_task=phase5_task,
                practical_exercise="Record a 3-minute technical walkthrough video explaining design tradeoffs, metrics, and real-world impact.",
                estimated_hours=weekly_hours * 2,
                completion_criteria=phase5_criteria,
                is_completed=False
            )
        )

        return RoadmapOutput(phases=tasks)


roadmap_agent = RoadmapAgent()
