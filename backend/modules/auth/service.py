import os
from datetime import datetime, timedelta

from dotenv import load_dotenv
from fastapi import APIRouter, Depends, HTTPException, Request, Response
from jose import JWTError, jwt
from sqlalchemy.ext.asyncio import AsyncSession
from starlette.status import HTTP_201_CREATED

from .models import (
    Users,
    RefreshToken,
    NewsSubscribers,
)
from .repository import (
    create_user,
    get_user_by_email,
    get_user_by_identifier,
    revoke_refresh_token,
    store_refresh_token,
    get_refresh_token,
    verified_update,
    get_subscriber_by_email,
    Create_news_letter_subscriber,
)

from config.security import create_access_token, create_refresh_token
from config.audit.logger import get_logger

from utils.hashing import hash_password, verify_password
from utils.otp import generate_otp, otp_expiry
from config.setting import get_settings
from modules.notifications.router import notify

logger = get_logger("AUTH")
settings = get_settings()
REFRESH_TOKEN_DAYS = 7


async def register_farm(db: AsyncSession, payload):
    existing_user = await get_user_by_email(db, payload.email)
    if existing_user:
        raise HTTPException(status_code=409, detail="email already exists")

    hashed_pw = await hash_password(payload.password)
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

    await db.commit()

    message = f"Your OTP for account verification is: {otp}. It expires in 10 minutes."
    await notify(
        db=db,
        user=user,
        title="Verify Your Farm Account",
        message=message,
        channels=["sms", "email"],
        notification_type="verification",
    )

    return user


async def login_user(db: AsyncSession, payload, required_role: str = None):
    user = await get_user_by_identifier(db, payload.identifier)

    if not user or not await verify_password(payload.password, user.password):
        raise HTTPException(status_code=400, detail="Invalid credentials")

    # If you want to restrict this specific endpoint to Admins only:
    if required_role and user.role != required_role:
        raise HTTPException(status_code=403, detail="Access denied: Admin only")

    # Include role in the JWT payload
    access_token = create_access_token(data={"sub": user.email, "role": user.role})
    refresh_token = create_refresh_token({"sub": user.email})

    await store_refresh_token(
        db=db,
        user_id=user.id,
        token=refresh_token,
        expires_at=datetime.utcnow() + timedelta(days=7),
    )

    await db.commit()
    # ... rest of your code ...
    return {
        "user_id": user.id,
        "role": user.role,  # Return role to frontend
        "access_token": access_token,
        "refresh_token": refresh_token,
    }


async def login_farmer(db: AsyncSession, payload):
    user = await get_user_by_identifier(db, payload.identifier)
    if not user or not await verify_password(payload.password, user.password):
        logger.warning(f"login_failed_user_not_found email=payload.email")
        raise HTTPException(
            status_code=400, detail="Invalid credentials, Username not found"
        )
    if not user.is_verified:
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
        "user_id": user.id,
        "access_token": access_token,
        "refresh_token": refresh_token,
        "token_type": "bearer",
    }


async def store_refresh_token_background(db, user_id, token, expiry):
    await store_refresh_token(db=db, user_id=user_id, token=token, expires_at=expiry)
    await db.commit()


async def refresh_access_token(
    db: AsyncSession,
    old_refresh_token: str,
):
    if not old_refresh_token:
        raise HTTPException(status_code=401, detail="No active session")

    stored_token = await get_refresh_token(db, old_refresh_token)

    if not stored_token or stored_token.is_revoked:
        raise HTTPException(status_code=401, detail="Invalid refresh token")

    if stored_token.expires_at < datetime.utcnow():
        await db.delete(stored_token)
        await db.commit()
        raise HTTPException(status_code=401, detail="Refresh token expired")

    user = stored_token.user

    new_refresh_token = create_refresh_token({"sub": str(user.id)})
    new_access_token = create_access_token({"sub": str(user.id)})

    await db.delete(stored_token)

    await store_refresh_token(
        db=db,
        user_id=user.id,
        token=new_refresh_token,
        expires_at=datetime.utcnow() + timedelta(days=settings.REFRESH_EXPIRE_DAY),
    )

    await db.commit()

    return {
        "access_token": new_access_token,
        "refresh_token": new_refresh_token,
    }


async def Verify_farmer(db: AsyncSession, email: str, otp: str):
    user = await get_user_by_email(db, email)
    print("USER TYPE:", type(user))

    if not user:
        raise HTTPException(status_code=400, detail="Invalid email")

    if user.is_verified:
        raise HTTPException(status_code=400, detail="Already verified")

    if user.otp != otp:
        raise HTTPException(status_code=400, detail="Invalid OTP")

    if user.otp_expires_at and user.otp_expires_at < datetime.utcnow():
        raise HTTPException(status_code=400, detail="OTP expired")

    user.is_verified = True
    user.otp = None
    user.otp_expires_at = None

    await db.commit()


async def resend_verification_code(db: AsyncSession, email: str):
    user = await get_user_by_email(db, email)

    if not user:
        raise HTTPException(status_code=404, detail="User not found")

    if user.is_verified:
        raise HTTPException(status_code=400, detail="Account already verified")

    # Generate new OTP
    new_otp = generate_otp()
    new_expiry = otp_expiry()

    # Update user
    user.otp = new_otp
    user.otp_expires_at = new_expiry

    await db.commit()
    await db.refresh(user)

    return new_otp


async def reset_password(db: AsyncSession, email: str, new_password: str):
    user = await reset_password_check_user(db, email)

    if not user:
        raise HTTPException(status_code=404, detail="User not found")

    hashed_pw = hash_password(new_password)
    return await reset_password_update(db, email, hashed_pw)


async def logout_user(db: AsyncSession, refresh_token: str):
    await revoke_refresh_token(db, refresh_token)
    await db.commit()


async def RegisterForNewsLetter(db: AsyncSession, payload):
    existing_subscriber = await get_subscriber_by_email(db, payload.email)

    if existing_subscriber:
        raise HTTPException(status_code=409, detail="Email already subscribed")

    subscriber = await Create_news_letter_subscriber(db, payload.email)

    await db.commit()
    return {"message": "Subscribed successfully", "id": subscriber.id}


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
