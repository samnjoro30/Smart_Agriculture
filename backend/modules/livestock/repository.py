

from datetime import datetime

from sqlalchemy import text, select, or_
from sqlalchemy.ext.asyncio import AsyncSession
from .model import Livestock


async def get_animal_by_tag(db: AsyncSession, tag: str):
    result = await db.execute(
        select(Livestock).where(Livestock.tag == tag)
    )
    return result.scalar_one_or_none()

async def create_animal(animal_data: dict, db: AsyncSession):
    new_animal = Livestock(**animal_data)
    db.add(new_animal)
    await db.flush()  # Ensure the new animal is assigned an ID
    return new_animal

    