#from db.postgre_db import AsyncSession
from sqlalchemy import text
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.orm import Session

async def get_user_by_username(username:str, db: AsyncSession):
    query = text("SELECT username, password FROM mkulima WHERE username = :username")
    results = await db.execute(query, {"username": username})
    row = results.fetchone()
    if row:
        return { "username" : row.username, "password": row.password}
    return None

async def create_user(user_data: dict, db: AsyncSession):
    query = text("""
        INSERT INTO mkulimafinest (username, email, farmname, phonenumber, password)
        VALUES (:username, :email, :farmname, :phonenumber, :password)
    """)
    await db.execute(query, user_data)
    await db.commit()