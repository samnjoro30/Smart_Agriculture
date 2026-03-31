from fastapi import APIRouter, Depends, HTTPException, Request, Response, BackgroundTasks
from sqlalchemy.ext.asyncio import AsyncSession
from fastapi.responses import JSONResponse
from config.database import get_db
from config.audit.logger import get_logger
from datetime import datetime, timedelta
from config.setting import get_settings
from config.security import get_current_user

from .schemas import (
    FeedBase,
    FeedCreate,
    FeedUpdate,
    FeedOut,
)

from .service import (
    create_feed_service,
    get_all_feeds_service,
    get_feed_by_id_service,
    update_feed_service,
    delete_feed_service,
)

router = APIRouter(prefix="/nutrition", tags=["Nutrition"])

logger = get_logger("NUTRITION")

settings = get_settings()

@router.post("/feeds-register")
async def create_feed(
    db: AsyncSession = Depends(get_db),
    current_user = Depends(get_current_user),
    payload: FeedBase
    ):

    feeds = await create_feed_service(db, payload, current_user)
    logger.info("POST /nutrition/feeds-register completed", status_code=201)
    return {
        "message": "Create feed endpoint"
    }

@router.get("/feeds-listing")
async def get_all_feeds(
    db: AsyncSession = Depends(get_db),
    current_user = Depends(get_current_user)
    ):

    feeds = await get_all_feeds_service(db, current_user)

    return {
        "feeds": feeds
    }