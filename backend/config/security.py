import os
from datetime import datetime, timedelta
from fastapi import Depends, HTTPException, Request, status
from typing import Optional
from jose import JWTError, jwt
from sqlalchemy.ext.asyncio import AsyncSession
from .setting import settings
from .database import get_db
from modules.auth.repository import get_user_by_email

from dotenv import load_dotenv

load_dotenv()
SECRET_KEY = settings.JWT_SECRET
ALGORITHM = settings.ALGORITHM

def decode_token(token: str):
    try:
        payload = jwt.decode(
            token,
            settings.JWT_SECRET,
            algorithms=[settings.ALGORITHM],
        )
        return payload
    except JWTError:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid or expired token",
        )

def get_token_from_cookie(request: Request) -> str:
    token = request.cookies.get("access_token")

    if not token:
        raise HTTPException(
            status_code=401,
            detail="Not authenticated",
        )

    return token

async def get_current_user(
    token: str = Depends(get_token_from_cookie),
    db: AsyncSession = Depends(get_db),
):
    payload = decode_token(token)

    email: Optional[str] = payload.get("sub")

    if not email:
        raise HTTPException(status_code=401, detail="Invalid token")

    user = await get_user_by_email(email, db)

    if not user:
        raise HTTPException(status_code=401, detail="User not found")

    return user

def create_access_token(data: dict, expires_delta: timedelta = timedelta(minutes=30)):
    to_encode = data.copy()
    expire = datetime.utcnow() + expires_delta
    to_encode.update({"exp": expire})
    encoded = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded


def refresh_token(data: dict, expires_delta: timedelta = timedelta(hours=1)):
    to_encode = data.copy()
    expire = datetime.utcnow() + expires_delta
    to_encode.update({"exp": expire})
    refresh_token = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return refresh_token
