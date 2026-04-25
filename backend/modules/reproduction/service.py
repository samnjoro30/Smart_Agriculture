

from datetime import datetime, timedelta, timezone

from dotenv import load_dotenv
from fastapi import APIRouter, Depends, HTTPException, Request, Response
from jose import JWTError, jwt
from sqlalchemy.ext.asyncio import AsyncSession
from starlette.status import HTTP_201_CREATED
import uuid 

from .repository import (
    create_milk_record,
    get_milk_records,
)
from modules.livestock.repository import get_animal_by_tag
from .model import MilkRecord


from config.security import create_access_token, create_refresh_token
from config.audit.logger import get_logger

logger = get_logger("REPRODUCTION")

async def record_milk_production(db: AsyncSession, payload, current_user):
    
    actual_cow_uuid = None
    # 1. Validation Logic
    if payload.session == "individual":
        if not payload.cow_tag:
            raise ValueError("cow tag is required for individual session")

        cow = await get_animal_by_tag(db, payload.cow_tag, current_user.id)
        
        if not cow:
            raise ValueError(f"No cow found with Tag: {payload.cow_tag}")
        

        actual_cow_uuid = cow.id

    if payload.liters <= 0:
        raise ValueError("Liters must be greater than 0")

        # Recalculate (never trust frontend fully)
    total_revenue = payload.liters * payload.pricePerLiter

    #milk_record_data = payload.model_dump(exclude_unset=True)
    milk_record = MilkRecord(
        id = uuid.uuid4(),
        user_id=current_user.id,
        cow_id=actual_cow_uuid,
        liters=payload.liters,
        price_per_liter=payload.pricePerLiter,
        total_revenue=total_revenue,
        session=payload.session,
    )

    created_record = await create_milk_record(db, milk_record)

    await db.commit()
    logger.info(
        "Milk production record created",
        cow_id=created_record.cow_id,
        liters=created_record.liters,
        total_revenue=created_record.total_revenue,
        user_id=current_user.id
    )

    return created_record

async def fetch_milk_production_history(db: AsyncSession, current_user):
    records = await get_milk_records(db, current_user.id)
    
    total_liters = sum(r.liters for r in records)
    total_revenue = sum(r.total_revenue for r in records)
    
    return {
        "total_liters": total_liters,
        "total_revenue": total_revenue,
        "record_count": len(records),
        "records": records
    }