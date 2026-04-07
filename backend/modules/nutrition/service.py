
from datetime import datetime, timedelta

from dotenv import load_dotenv
from fastapi import APIRouter, Depends, HTTPException, Request, Response
from jose import JWTError, jwt
from sqlalchemy.ext.asyncio import AsyncSession
from starlette.status import HTTP_201_CREATED
from config.audit.logger import get_logger


from .model import (
    Feeds,
)

from .repository import (
        create_feed,
        get_all_feeds,
        update_feed,
        delete_feed,
        get_feeds_summary,
    )

logger = get_logger("NUTRITION")

async def create_feed_service(db: AsyncSession, payload, current_user):

    if payload.quantity< 0:
        raise ValueError("Quantity cannot be negative")

    feed_data = payload.model_dump(exclude_unset=True)
    feed_data["user_id"] = current_user.id
    
    feed = await create_feed(feed_data, db)

    await db.commit()
    
    return feed

async def get_all_feeds_service(db: AsyncSession, current_user):
    feeds = await get_all_feeds(db, current_user.id)
    summary = await get_feeds_summary(db, current_user.id)

    return {
        "totalValue": summary["total_value"],
        "totalItems": summary["total_items"],
        "lowStock": summary["low_stock_items"],
        "feeds": feeds
    }
   

async def update_feed_service(db: AsyncSession):
    pass

async def delete_feed_service(db: AsyncSession):
    pass