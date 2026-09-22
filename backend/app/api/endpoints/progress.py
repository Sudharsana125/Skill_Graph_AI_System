"""
Progress tracking and dynamic profile recalculation endpoint:
POST /progress/update
"""
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession

from backend.app.database.session import get_db
from backend.app.schemas.schemas import ProgressUpdateRequest, ProgressUpdateResponse
from backend.app.agents.progress_agent import progress_agent

router = APIRouter(tags=["Progress"])


@router.post("/progress/update", response_model=ProgressUpdateResponse)
async def update_progress(
    request: ProgressUpdateRequest,
    db: AsyncSession = Depends(get_db)
):
    """
    Agent 6 invocation:
    Marks task complete, recalculates skill level, updates gaps, and adjusts career alignment.
    """
    try:
        return await progress_agent.handle_task_completion(
            db=db,
            user_id=request.user_id,
            task_id=request.task_id,
            is_completed=request.is_completed
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to update progress: {str(e)}")
