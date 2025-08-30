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

async def check_user_by_email(db: AsyncSession, email: str):
   query = text("""
       SELECT email FROM users WHERE email = :email
   """)
   results = await db.execute(query, {"email": email})
   row = results.fetchone()
   if row:
      return {
         "email": email
      }

async def UpdateEmail(db: AsyncSession, email: str):
   query = text("""
      UPDATE email FROM users WHERE email = :email
   """)
   await db.execute(query, {"email": email})
   await db.commit()

async def UpdatePhoneNumber(db: AsyncSession, phonenumber: str):
   query = text("""
      UPDATE phonenumber FROM users WHERE phonenumber = :phonenumber
   """)
   await db.execute(query, {"phonenumber": phonenumber})
   await db.commit()

