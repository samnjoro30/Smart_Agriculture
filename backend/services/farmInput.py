from sqlalchemy import text, select
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.orm import Session
from datetime import datetime, timedelta


async def create_cow(cow_data: dict):
    query = text('''
        INSERT INTO cows(cowname, cowage, cowlastBirth, lastMate, calf)
        VALUES( :cowname, :cowage, :cowlastBirth, :lastMate, :calf)
    
    ''')
    await db.execute(query, cow_data)
    await db.commit()