from db.postgre_db import AsyncSessionLocal
from sqlalchemy import text
from sqlalchemy.ext.asyncio import AsyncSession

# def get_user_by_username(username: str):
#     conn = get_db()
#     cur = conn.cursor()
#     cur.execute("SELECT username, password FROM users WHERE username = %s", (username,))
#     row = cur.fetchone()
#     conn.close()
#     if row:
#         return {"username": row[0], "password": row[1]}
#     return None

async def create_user(user_data: dict):
    async with AsyncSessionLocal() as db:
       
        query = text("""
        
            INSERT INTO users (username, email, farm_name, phone_number, password )
            VALUES ( :username, :email, :farm_name, :phone_number, :password)
    
        """)
        await db.execute(query, user_data)
        await db.commit()