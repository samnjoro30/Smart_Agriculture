from fastapi import APIRouter, Depends, HTTPException, Request, Response, BackgroundTasks
from sqlalchemy.ext.asyncio import AsyncSession
from config.database import get_db
from config.audit.logger import get_logger
from config.setting import get_settings
from config.security import get_current_user
from .tasks import update_livestock_ages

from .schema import (
    LivestockCreateRequest,
)
from .service import (
    register_animals,
    get_animals_listing,
    get_animal_by_tag_id,
    get_stats,
    update_livestock_ages_service,
)


router = APIRouter(prefix="/livestock", tags=["Livestock"])

logger = get_logger("LIVESTOCK")

settings = get_settings()

@router.post("/test-age-update")
async def trigger_age_update():
    # .delay() sends the task to the Message Broker (Redis)
    task = update_livestock_ages.delay()
    return {"task_id": task.id, "status": "Task sent to worker!"}

@router.post("/register")
async def register(
    payload: LivestockCreateRequest, 
    db: AsyncSession = Depends(get_db), 
    current_user = Depends(get_current_user)
    ):
    animal = await register_animals(db, payload, current_user)
    logger.info("POST /livestock/register completed", status_code=201)
    return {"message": "Registered successfully"}

@router.get("/animals-listing")
async def get_all_animals(db: AsyncSession = Depends(get_db), current_user = Depends(get_current_user)):

    listing = await get_animals_listing(db, current_user)

    return {"listing": listing}

@router.get("/stats")
async def get_stats_livestock(
    db: AsyncSession = Depends(get_db), 
    current_user = Depends(get_current_user)
    ):

    stats = await get_stats(db, current_user)

    return {"stats": stats}

@router.get("/animal/{tag}")
async def get_animal_by_tag_by(
    tag: str, 
    db: AsyncSession = Depends(get_db), 
    current_user = Depends(get_current_user)
    ):

    animal = await get_animal_by_tag_id(db, tag, current_user)

    if not animal:
        raise HTTPException(status_code=404, detail="Animal not found")

    return {"animal": animal}

