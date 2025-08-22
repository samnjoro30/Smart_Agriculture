from sqlalchemy import text
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.orm import Session
from datetime import datetime, timedelta

async def get_userProfile(db: AsyncSession, email: str):
    query = text("""
       SELECT email, username, farmname, phonenumber FROM users Where email = :email
    """)
    results = await db.execute(query, {"email": email})
    return results.mappings().first()

