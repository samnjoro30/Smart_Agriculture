#from db.postgre_db import AsyncSession
from sqlalchemy import text
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.orm import Session
from datetime import datetime, timedelta

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

async def store_refresh_token():
    query = text("""
        INSERT INTO refresh_tokens (username, token, expires_at)
        VALUES (:username, :token, :expires_at )
    """)
    await db.execute(query,,{
        "username": username,
        "token": token,
        "expires_at": expires_at
    })
    await db.commit()

async def revoke_refresh_token(db, token: str):
    query = text("UPDATE refresh_tokens SET is_revoked = TRUE WHERE token = :token")
    await db.execute(query, {
        "token": token
    })

async def is_token_revoked(db, token: str):
    query= text("SELECT is_revoked FROM refresh_token WHERE token = :token ")
    results = await db.execute(query, {
        "token": token
    })
    row = results.fetchone()

    return row and row.is_revoked

async def otp_verification(db):
    query = text("""
        SELECT id, is_verified, otp, FROM mkulimefinest WHERE username = :username
    """)

    results = await db.execute(query,{
        "username":  username
    })
    user  = results.fetchone()
    return user

async def verified_upate(db):
    query = text("""
        UPDATE mkulimafinest 
        SET is_verified = True, otp = null
        WHERE username = :username
    """)
    await db.execute(query, {
        "username": username
        })
    await db.commit()
    return {
        "message": "verification successful"
    }