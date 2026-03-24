from fastapi import APIRouter, Depends, HTTPException, Request, Response, BackgroundTasks
from sqlalchemy.ext.asyncio import AsyncSession
from config.database import get_db
from config.audit.logger import get_logger
from config.setting import get_settings
from config.security import get_current_user

from .schema import (
    LivestockCreateRequest,
)
from .service import (
    register_animals,
)


router = APIRouter(prefix="/livestock", tags=["Livestock"])

logger = get_logger("LIVESTOCK")

settings = get_settings()

@router.post("/register")
async def register(
    payload: LivestockCreateRequest, 
    db: AsyncSession = Depends(get_db), 
    current_user = Depends(get_current_user)
    ):
    animal = await register_animals(db, payload, current_user)
    logger.info("POST /livestock/register completed", status_code=201)
    return {"message": "Registered successfully"}


