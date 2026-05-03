
from datetime import datetime, timedelta

from dotenv import load_dotenv
from fastapi import APIRouter, Depends, HTTPException, Request, Response
from jose import JWTError, jwt
from sqlalchemy.ext.asyncio import AsyncSession
from starlette.status import HTTP_201_CREATED
from config.audit.logger import get_logger


from .model import (
    Feeds,
    FeedPurchase,
    FeedUsage,
)

from .repository import FeedRepository

logger = get_logger("NUTRITION")

class FeedService:

    @staticmethod
    async def create_feed_service(db: AsyncSession, payload, current_user):

        if payload.quantity< 0:
            raise ValueError("Quantity cannot be negative")

        feed_data = payload.model_dump(exclude_unset=True)
        feed_data["user_id"] = current_user.id
    
        feed = await FeedRepository.create_feed(feed_data, db)

        await db.commit()
    
        return feed
    
    @staticmethod
    async def purchase_feed_service(db: AsyncSession, feed_id, quantity, total_cost, current_user):
        feed = await FeedRepository.get_feed(db, feed_id, current_user.id)
        if not feed:
            raise HTTPException(status_code=404, detail="Feed not found")
        
        purchase = FeedPurchase(
            feed_id=feed.id,
            quantity=feed.quantity,
            total_cost=feed.quantity * feed.costPerUnit,
            purchased_at=feed.createdAt
        )
        feed.quantity += quantity

        await FeedRepository.create_purchase(db, purchase)
        return feed

    @staticmethod
    async def usage_feed(db: AsyncSession, feed_id, quantity, current_user):
        feed = await FeedRepository.get_feed(db, feed_id, livestock_id, quantity, current_user.id)
        if not feed:
            raise HTTPException(status_code=404, detail="Feed not found")
        
        if feed.quantity < quantity:
            raise HTTPException(status_code=400, detail="Insufficient feed stock")
        
        usage = FeedUsage(
            feed_id=feed.id,
            livestock_id=livestock_id,
            quantity=quantity,
            used_at=datetime.utcnow()
        )

        feed.quantity -= quantity

        await FeedRepository.create_usage(db, usage)

        await db.commit()
        return usage

    @staticmethod
    async def get_all_feeds_service(db: AsyncSession, current_user):
        feeds = await FeedRepository.get_all_feeds(db, current_user.id)
        summary = await FeedRepository.get_feeds_summary(db, current_user.id)

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