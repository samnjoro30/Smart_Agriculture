from fastapi import APIRouter, Depends, HTTPException, Request, Response
from sqlalchemy.ext.asyncio import AsyncSession

from config.database import get_db
from config.logger import get_logger

from .schemas import RegisterRequest, LoginRequest, Token, RegisterSubscribers, codeResend, adminRegisterRequest, adminLoginRequest
from .service import register_farm, login_farmer


router = APIRouter(prefix="/auth", tags=["Auth"])

logger = get_logger(__name__)

@router.post("/register")
async def register(payload: RegisterRequest, db: AsyncSession = Depends(get_db)):
    await register_user(db, payload)
    logger.info("farm registered succesfully", user_id=user.id)
    return {"message": "Registered successfully"}


@router.post("/login", response_model=Token)
async def login(
    payload: LoginRequest,
    response: Response,
    db: AsyncSession = Depends(get_db),
):
    access_token, new_refresh_token = await login_user(db, payload)

    response.set_cookie("access_token", access, httponly=True, samesite="none", secure=True)
    response.set_cookie("refresh_token", refresh, httponly=True, samesite="none", secure=True)

    logger.info("login successful", user_id=user.id)

    return {
        "access_token": access_token,
        "refresh_token": new_refresh_token,
    }
