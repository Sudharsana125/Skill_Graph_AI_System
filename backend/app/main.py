"""
SkillTwin AI — FastAPI Main Application Entry Point.
Production-grade Agentic AI Career Intelligence API for InfinityX Global Hackathon 2K26.
"""
import os
from contextlib import asynccontextmanager
from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from dotenv import load_dotenv

from backend.app.database.session import init_db
from backend.app.api.endpoints import dashboard, analysis, progress, assistant, profile, simulator

load_dotenv()


@asynccontextmanager
async def lifespan(app: FastAPI):
    # Startup: Initialize Database
    await init_db()
    yield
    # Shutdown actions if any


app = FastAPI(
    title="SkillTwin AI — Agentic Career Intelligence Platform",
    description="Multi-agent career modeling, evidence-based skill verification, RAG benchmarks, and dynamic roadmaps.",
    version="1.0.0",
    lifespan=lifespan
)

# CORS setup
allowed_origins = os.getenv(
    "CORS_ORIGINS",
    "http://localhost:5173,http://localhost:3000,http://127.0.0.1:5173,http://127.0.0.1:3000"
).split(",")

app.add_middleware(
    CORSMiddleware,
    allow_origins=[origin.strip() for origin in allowed_origins] + ["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Exception handler for graceful degradation
@app.exception_handler(Exception)
async def generic_exception_handler(request: Request, exc: Exception):
    return JSONResponse(
        status_code=500,
        content={
            "error": "Internal Processing Error",
            "message": "An unexpected error occurred in the SkillTwin intelligence pipeline. Please verify input data and retry.",
            "detail": str(exc)
        }
    )


# Mount API routers
app.include_router(dashboard.router, prefix="/api")
app.include_router(analysis.router, prefix="/api")
app.include_router(progress.router, prefix="/api")
app.include_router(assistant.router, prefix="/api")
app.include_router(profile.router, prefix="/api")
app.include_router(simulator.router, prefix="/api")


@app.get("/health", tags=["System"])
async def health_check():
    return {
        "status": "healthy",
        "service": "SkillTwin AI Career Intelligence API",
        "version": "1.0.0",
        "agents_active": 6,
        "rag_knowledge_base": "operational"
    }


if __name__ == "__main__":
    import uvicorn
    uvicorn.run("backend.app.main:app", host="0.0.0.0", port=8000, reload=True)
