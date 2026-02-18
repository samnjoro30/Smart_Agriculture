# from db.postgre_db import AsyncSession
from datetime import datetime

from sqlalchemy import text, select
from sqlalchemy.ext.asyncio import AsyncSession
from .models import RefreshToken


async def get_user_by_email(email: str, db: AsyncSession):
    query = text("SELECT email, password, is_verified FROM users WHERE email = :email")
    results = await db.execute(query, {"email": email})
    row = results.fetchone()
    if row:
        return {
            "email": row.email,
            "password": row.password,
            "is_verified": row.is_verified,
        }
    return None


async def create_user(user_data: dict, db: AsyncSession):
    query = text(
        """
        INSERT INTO users (username, email, farmname, phonenumber, otp, otp_expires_at, is_verified, password)
        VALUES (:username, :email, :farmname, :phonenumber, :otp, :otp_expires_at, :is_verified, :password)
    """
    )
    await db.execute(query, user_data)

async def create_user_newsLetter(user: dict, db: AsyncSession):
    query = text(
        """
        INSERT INTO subscribers (email)
        VALUES (:email)
    """
    )
    await db.execute(query, user)


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


async def revoke_refresh_token(db: AsyncSession, token_obj: RefreshToken):
    token_obj.is_revoked = True
    await db.flush()


async def is_token_revoked(db: AsyncSession, token: str):
    query = text("SELECT is_revoked FROM refresh_token WHERE token = :token ")
    results = await db.execute(query, {"token": token})
    row = results.fetchone()
    return row and row.is_revoked


async def otp_verification(db: AsyncSession, email: str):
    query = text(
        """
        SELECT id, is_verified, otp FROM users WHERE email = :email
    """
    )

    results = await db.execute(query, {"email": email})
    return results.fetchone()


async def retrieve_otp(email: str, db: AsyncSession):
    query = text(
        """
        SELECT id, otp FROM users WHERE email= : email
    """
    )
    result = await db.execute(query, {"email": email})
    return result.fetchone()


async def verified_upate(db: AsyncSession, email: str):
    query = text(
        """
        UPDATE users 
        SET is_verified = True, otp = null
        WHERE email = :email
    """
    )
    await db.execute(query, {"email": email})


async def reset_password_check_user(db: AsyncSession, email: str):
    query = text(
        """
        SELECT id FROM user WHERE email = :email
    """
    )
    results = await db.execute(query, {"email": email})
    user_reset = results.fetchone
    return user_reset


async def reset_password_update(db: AsyncSession, email: str, password: str):
    query = text(
        """
       UPDATE user 
       SET password = :password
       WHERE email = :email
    
    """
    )
    await db.execute(query, {"password": password, "email": email})
    await db.commit()


async def resendVerificationCode(email: str, db: AsyncSession, otp: str):
    query = text(
        """
       UPDATE users
       SET otp = :new_otp
       WHERE email =:email
    """
    )
    await db.execute(query, {"otp": otp})
