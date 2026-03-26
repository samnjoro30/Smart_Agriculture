

from datetime import datetime
from sqlalchemy.sql import func, case
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

async def get_animals_by_user(db: AsyncSession, user_id: int):
    result = await db.execute(
        select(Livestock).where(Livestock.user_id == user_id)
    )
    return result.scalars().all()

async def get_animal_stats(db: AsyncSession, user_id: int):
    query = (
        select(
            func.count(Livestock.id).label("totalAnimals"),
            func.avg(Livestock.age).label("average_age"),
            func.sum(case((Livestock.heatStatus == True, 1), else_=0)).label("in_heat_count"),
            func.count(Livestock.id).filter(Livestock.healthStatus != "Healthy").label("sick_count"),
            # Using func.sum with a case statement for the boolean count
            func.sum(
                case((Livestock.pregnant == True, 1), else_=0)
            ).label("pregnant")
        )
        .where(Livestock.user_id == user_id)
        #.group_by(Livestock.category)
    )

    result = await db.execute(query)
    return result.mappings().first()