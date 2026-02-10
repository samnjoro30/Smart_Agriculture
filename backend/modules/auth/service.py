import os
from datetime import datetime, timedelta

from dotenv import load_dotenv
from fastapi import APIRouter, Depends, HTTPException, Request, Response
from jose import JWTError, jwt
from sqlalchemy.ext.asyncio import AsyncSession
from starlette.status import HTTP_201_CREATED

from .models import Users, RefreshToken, NewsSubscribers 
from .repository import create_user, get_user_by_email, otp_verification, resendVerificationCode, reset_password_check_user, reset_password_update, revoke_refresh_token, store_refresh_token, verified_upate, create_user_newsLetter

from config.security import create_access_token, refresh_token
from config.logger import get_logger

from utils.hashing import hash_password, verify_password
from utils.otp import generate_otp, otp_expiry

logger = get_logger(__name__)

async def register_farm(payload, db):
    existing_user = await get_user_by_email(payload.email, db)
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

    return await create_user(user_dict, db)

async def login_farmer(db, payload):
    existing_user = await get_user_by_email(db, payload.email)
    if not existing_user or not verify_password(
        payload.password, existing_user["password"]
    ):
        logger.warning("login_failed_user_not_found", email=payload.email)
        raise HTTPException(
            status_code=400, detail="Invalid credentials, Username not found"
        )
    if not existing_user.get("is_verified"):
        raise HTTPException(status_code=403, detail="Account not verified")

    access_token = create_access_token(data={"sub": existing_user.email})
    new_refresh_token = refresh_token({"sub": existing_user.email})
    #expires_at = datetime.utcnow() + timedelta(hours=24)

    #await store_refresh_token(email, new_refresh_token, expires_at, db)

    return access_token, new_refresh_token

async def page_refresh_token(request: Request):
    SECRET_KEY = os.getenv("JWT_REFRESH")
    ALGORITHM = os.getenv("ALGORITHM")
    try:
        refresh_token_str = request.cookies.get("refresh_token")

        if not refresh_token_str:
            raise HTTPException(status_code=400, detail="Refresh token missing")

        payload = jwt.decode(refresh_token_str, SECRET_KEY, algorithms=[ALGORITHM])
        username = payload.get("sub")
        if username is None:
            raise HTTPException(status_code=401, detail="Invalid token")
        new_access_token = create_access_token({"sub": username})
        return {"access_token": new_access_token, "token_type": "bearer"}
    except JWTError:
        raise HTTPException(status_code=500, detail="Expired refresh token")
