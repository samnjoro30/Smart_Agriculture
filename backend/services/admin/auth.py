from sqlalchemy import text, select
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.orm import Session
from datetime import datetime, timedelta


async def create_admin(data: dict, db: AsyncSession):
    query = text("""
        INSERT INTO admins (username, email, password, role)
        VALUES (:username, :email, :password, :role)
    """)
    await db.execute(query, data)
    await db.commit()
    
async def get_admin_by_email(db: AsyncSession, email: str):
    query = text("SELECT * FROM admins WHERE email = :email")   
    result = await db.execute(query, {"email": email})
    row = result.fetchone()
    return dict(row) if row else None