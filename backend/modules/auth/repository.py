#from db.postgre_db import AsyncSession
from datetime import datetime

from sqlalchemy import text, select
from sqlalchemy.ext.asyncio import AsyncSession
from .models import RefreshToken, Users


async def get_user_by_email(db: AsyncSession, email: str):
    result = await db.execute(
        select(Users).where(Users.email == email)
    )
    return result.scalar_one_or_none()


async def create_user(user_data: dict, db: AsyncSession):
    user = Users(**user_data)   
    db.add(user)                
    await db.flush()            
    await db.refresh(user)      
    return user


async def store_refresh_token(
    db: AsyncSession, user_id, token: str, expires_at: datetime
):
    refresh = RefreshToken(
        user_id=user_id,
        token=token,
        expires_at=expires_at,
    )

    db.add(refresh)
    await db.flush()
    return refresh
    # query = text(
    #     """
    #     INSERT INTO refresh_token (username, token, expires_at)
    #     VALUES (:username, :token, :expires_at )
    # """
    # )
    # await db.execute(
    #     query, {"username": username, "token": token, "expires_at": expires_at}
    # )
    # await db.commit()


async def get_refresh_token(db: AsyncSession, token: str):
    result = await db.execute(select(RefreshToken).where(RefreshToken.token == token))
    return result.scalar_one_or_none()


async def revoke_refresh_token(db: AsyncSession, token: str):
    result = await db.execute(
        select(RefreshToken).where(RefreshToken.token == token)
    )

    token_obj = result.scalars().first() 

    if token_obj:
        token_obj.is_revoked = True

async def verified_update(user: Users):
    user.is_verified = True
    user.otp = None



