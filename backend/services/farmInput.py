from sqlalchemy import text
from sqlalchemy.ext.asyncio import AsyncSession


async def create_cow(cow_data: dict, db: AsyncSession):
    query = text(
        """
        INSERT INTO cows(cowname, cowage, cowlastBirth, lastMate, calf)
        VALUES( :cowname, :cowage, :cowlastBirth, :lastMate, :calf)
    
    """
    )
    await db.execute(query, cow_data)
    await db.commit()
