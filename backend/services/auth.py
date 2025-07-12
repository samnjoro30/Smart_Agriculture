#from db.postgre_db import AsyncSession
from sqlalchemy import text
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.orm import Session

def get_user_by_username(username: str):
    conn = get_db()
    cur = conn.cursor()
    cur.execute("SELECT username, password FROM users WHERE username = %s", (username,))
    row = cur.fetchone()
    conn.close()
    if row:
        return {"username": row[0], "password": row[1]}
    return None

def create_user(user_data: dict, db: Session):
    query = text("""
        INSERT INTO users (username, email, farm_name, phone_number, password)
        VALUES (:username, :email, :farm_name, :phone_number, :password)
    """)
    db.execute(query, user_data)
    db.commit()