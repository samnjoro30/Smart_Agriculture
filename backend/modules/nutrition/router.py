from fastapi import (
    APIRouter,
    Depends,
    HTTPException,
    Request,
    Response,
    BackgroundTasks,
)
from sqlalchemy.ext.asyncio import AsyncSession
from fastapi.responses import JSONResponse
from config.database import get_db
from config.audit.logger import get_logger
from datetime import datetime, timedelta
from config.setting import get_settings
from config.security import get_current_user

from .schema import (
    FeedCreate,
    FeedUpdate,
    FeedOut,
    FeedStockResponse,
)

from .service import FeedService

router = APIRouter(prefix="/nutrition", tags=["Nutrition"])

logger = get_logger("NUTRITION")

settings = get_settings()


@router.post("/feeds-register")
async def create_feed(
    payload: FeedCreate,
    db: AsyncSession = Depends(get_db),
    current_user=Depends(get_current_user),
):

    feeds = await FeedService.create_feed_service(db, payload, current_user)
    logger.info("POST /nutrition/feeds-register completed", status_code=201)
    return {
        "message": "Create feed successfully",
    }


@router.get("/feeds-listing", response_model=FeedStockResponse)
async def get_all_feeds(
    db: AsyncSession = Depends(get_db), current_user=Depends(get_current_user)
):

    feeds = await FeedService.get_all_feeds_service(db, current_user)

    return {"feeds": feeds}


@router.get("/feeds-stock")
async def get_feeds_stock(
    db: AsyncSession = Depends(get_db), current_user=Depends(get_current_user)
):

    feeds_stock = await FeedService.get_all_feeds_service(db, current_user)

    return feeds_stock
