from sqlalchemy.ext.asyncio import AsyncSession
from .model import MilkRecord
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.sql import func, case
from sqlalchemy import text, select, or_, delete


async def create_milk_record(db: AsyncSession, milk_record: MilkRecord):
    db.add(milk_record)
    await db.flush()  # Ensure the record is written to the database and ID is generated
    # wait db.refresh(milk_record)
    return milk_record


async def get_milk_records(db: AsyncSession, user_id: UUID):
    # Fetch records ordered by most recent first
    query = (
        select(MilkRecord)
        .where(MilkRecord.user_id == user_id)
        .order_by(MilkRecord.created_at.desc())
    )
    result = await db.execute(query)
    return result.scalars().all()
