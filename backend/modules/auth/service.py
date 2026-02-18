import os
from datetime import datetime, timedelta

from dotenv import load_dotenv
from fastapi import APIRouter, Depends, HTTPException, Request, Response
from jose import JWTError, jwt
from sqlalchemy.ext.asyncio import AsyncSession
from starlette.status import HTTP_201_CREATED

from .models import Users, RefreshToken, NewsSubscribers
from .repository import (
    create_user,
    get_user_by_email,
    otp_verification,
    resendVerificationCode,
    reset_password_check_user,
    reset_password_update,
    revoke_refresh_token,
    store_refresh_token,
    get_refresh_token,
    verified_upate,
    create_user_newsLetter,
)

from config.security import create_access_token, create_refresh_token
from config.logger import get_logger

from utils.hashing import hash_password, verify_password
from utils.otp import generate_otp, otp_expiry

logger = get_logger(__name__)
REFRESH_TOKEN_DAYS = 7


async def register_farm(db: AsyncSession, payload):
    existing_user = await get_user_by_email(db, payload.email)
    if existing_user:
        raise HTTPException(status_code=409, detail="email already exists")

    hashed_pw = hash_password(payload.password)
    otp = generate_otp()
    expires_at = otp_expiry()

    user_dict = {
        "username": payload.username,
        "email": payload.email,
        "farmname": payload.farmname,
        "phonenumber": payload.phonenumber,
        "otp": otp,
        "otp_expires_at": expires_at,
        "is_verified": False,
        "password": hashed_pw,
    }
    user = await create_user(user_dict, db)
    return user


async def login_farmer(db: AsyncSession, payload):
    user = await get_user_by_email(db, payload.email)
    if not user or not verify_password(payload.password, user["password"]):
        logger.warning(f"login_failed_user_not_found email=payload.email")
        raise HTTPException(
            status_code=400, detail="Invalid credentials, Username not found"
        )
    if not user.get("is_verified"):
        raise HTTPException(status_code=403, detail="Account not verified")

    access_token = create_access_token(data={"sub": user.email})
    refresh_token = create_refresh_token({"sub": user.email})

    await store_refresh_token(
        db=db,
        user_id=user.id,
        token=refresh_token,
        expires_at=datetime.utcnow() + timedelta(days=7),
    )

    await db.commit()

    return {
        "access_token": access_token,
        "refresh_token": refresh_token,
    }


async def refresh_access_token(
    db: AsyncSession,
    old_refresh_token: str,
):
    if not old_refresh_token:
        raise HTTPException(status_code=401, detail="Missing refresh token")

    stored_token = await get_refresh_token(db, old_refresh_token)

    if not stored_token:
        raise HTTPException(status_code=401, detail="Invalid refresh token")

    if stored_token.is_revoked:
        raise HTTPException(status_code=401, detail="Token already revoked")

    if stored_token.expires_at < datetime.utcnow():
        raise HTTPException(status_code=401, detail="Refresh token expired")

    user = stored_token.user

    await revoke_refresh_token(db, stored_token)

    new_refresh_token = create_refresh_token({"sub": str(user.id)})
    new_access_token = create_access_token({"sub": str(user.id)})

    await store_refresh_token(
        db=db,
        user_id=user.id,
        token=new_refresh_token,
        expires_at=datetime.utcnow() + timedelta(days=REFRESH_TOKEN_DAYS),
    )

    await db.commit()

    return {
        "access_token": new_access_token,
        "refresh_token": new_refresh_token,
    }


async def Verify_farmer(db: AsyncSession, email: str, otp: str):
    user = await otp_verification(db, email)

    if not user:
        raise HTTPException(status_code=400, detail="Invalid email")

    if user.is_verified:
        raise HTTPException(status_code=400, detail="Already verified")

    if user.otp != otp:
        raise HTTPException(status_code=400, detail="Invalid OTP")

    if user.otp_expires_at < datetime.utcnow():
        raise HTTPException(status_code=400, detail="OTP expired")

    return await verified_update(db, email)


async def reset_password(db: AsyncSession, email: str, new_password: str):
    user = await reset_password_check_user(db, email)

    if not user:
        raise HTTPException(status_code=404, detail="User not found")

    hashed_pw = hash_password(new_password)
    return await reset_password_update(db, email, hashed_pw)


async def logout_user(db: AsyncSession, refresh_token: str):
    await revoke_refresh_token(db, refresh_token)
    await db.commit()


# async def RegisterForNewsLetter(request: RegisterSubscribers, db):
#     user_news = {
#         "email": request.email,
#     }
#     return await create_user_newsLetter(user_news, db)


# async def resendCode(request: codeResend, db):
#     body = await request.json()
#     email = body.get("email")

#     if not email:
#         raise HTTPException(status_code=403, detail="Must have email")

#     user = await get_user_by_email(email, db)
#     if not user or user.is_verified is True:
#         raise HTTPException(status_code=404, detail="Email not found")

#     if user.is_verified:
#         raise HTTPException(status_code=403, detail="user already verified")

#     new_otp = generate_otp()

#     return await resendVerificationCode(new_otp)
