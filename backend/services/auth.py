#from db.postgre_db import AsyncSession
from sqlalchemy import text
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.orm import Session
from datetime import datetime, timedelta

async def get_user_by_email(email: str, db: AsyncSession):
    query = text("SELECT email, password, is_verified FROM users WHERE email = :email")
    results = await db.execute(query, {"email": email})
    row = results.fetchone()
    if row:
        return {
            "email": row.email,
            "password": row.password,
            "is_verified": row.is_verified
        }
    return None

async def create_user(user_data: dict, db: AsyncSession):
    query = text("""
        INSERT INTO users (username, email, farmname, phonenumber, otp, otp_expires_at, is_verified, password)
        VALUES (:username, :email, :farmname, :phonenumber, :otp, :otp_expires_at, :is_verified, :password)
    """)
    await db.execute(query, user_data)
    await db.commit()

async def create_user_newsLetter(user: dict, db: AsyncSession):
    query = text("""
        INSERT INTO subscribers (email)
        VALUES (:email)
    """)
    await db.execute(query, user)
    await db.commit()

async def store_refresh_token(username: str, token: str, expires_at: datetime, db: AsyncSession):
    query = text("""
        INSERT INTO refresh_tokens (username, token, expires_at)
        VALUES (:username, :token, :expires_at )
    """)
    await db.execute(query,{
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

async def otp_verification(db: AsyncSession, email:str):
    query = text("""
        SELECT id, is_verified, otp FROM users WHERE email = :email
    """)

    results = await db.execute(query,{
        "email":  email
    })
    return results.fetchone()

async def retrieve_otp(email:str, db: AsyncSession):
    query = text("""
        SELECT id, otp FROM users WHERE email= : email
    """)
    result = await db.execute(query,{
        "email": email
    })
    return result.fetchone()

async def verified_upate(db: AsyncSession, email: str ):
    query = text("""
        UPDATE users 
        SET is_verified = True, otp = null
        WHERE email = :email
    """)
    await db.execute(query, {
        "email": email
        })
    await db.commit()
    return {
        "message": "verification successful"
    }
async def reset_password_check_user(db):
    query = text("""
        SELECT id FROM user WHERE email = :email
    """)
    results = await db.execute(query,{
        "email": email
    })
    user_reset = results.fetchone
    return user_reset
async def reset_password_update(db):
    query = text("""
       UPDATE user 
       SET password = :password
       WHERE email = :email
    
    """)
    await db.execute(query,{
        "password": password,
        "email": email
    })
    await db.commit()
    
