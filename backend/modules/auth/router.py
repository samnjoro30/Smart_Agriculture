from fastapi import APIRouter, Depends, HTTPException, Request, Response
from sqlalchemy.ext.asyncio import AsyncSession

from config.database import get_db
from config.logger import get_logger

from .schemas import (
    RegisterRequest,
    LoginRequest,
    Token,
    RegisterSubscribers,
    codeResend,
    adminRegisterRequest,
    adminLoginRequest,
    VerifyCode,
)
from .service import register_farm, logout_user, Verify_farmer, refresh_access_token


router = APIRouter(prefix="/auth", tags=["Auth"])

logger = get_logger(__name__)


@router.post("/register")
async def register(payload: RegisterRequest, db: AsyncSession = Depends(get_db)):
    await register_farm(db, payload)
    logger.info("farm registered succesfully", user_id=user.id)
    return {"message": "Registered successfully"}


@router.post("/login", response_model=Token)
async def login(
    payload: LoginRequest,
    response: Response,
    db: AsyncSession = Depends(get_db),
):
    result = await login_farmer(db, payload)

    response.set_cookie(
        key="access_token",
        value=result["access_token"],
        httponly=True,
        samesite="none",
        secure=True,
    )

    response.set_cookie(
        key="refresh_token",
        value=result["refresh_token"],
        httponly=True,
        samesite="none",
        secure=True,
    )

    logger.info("login successful", user_id=user.id)

    return {
        "access_token": access_token,
        "refresh_token": refresh_token,
    }


@router.post("/refresh")
async def refresh(
    request: Request,
    response: Response,
    db: AsyncSession = Depends(get_db),
):
    old_token = request.cookies.get("refresh_token")

    result = await refresh_access_token(db, old_token)

    response.set_cookie(
        key="refresh_token",
        value=result["refresh_token"],
        httponly=True,
        secure=True,
        samesite="none",
    )

    return {"access_token": result["access_token"]}


@router.post("/verification")
async def verify_otp(payload: VerifyCode, db: AsyncSession = Depends(get_db)):
    await Verify_farmer(db, payload.email, payload.otp)
    logger.info("OTP verified successfully", email=payload.email)
    return {"message": "OTP verified successfully"}


# @router.post("/auth/reset-password")


@router.post("/logout")
async def logout(
    request: Request, response: Response, db: AsyncSession = Depends(get_db)
):
    token = request.cookies.get("refresh_token")

    if token:
        await logout_user(db, token)

    response.delete_cookie("access_token")
    response.delete_cookie("refresh_token")
    logger.info("logout successful")
    return {"message": "Logged out successfully"}


# @router.post("/newsletter/subscribe")
# @router.post("/auth/resend-verificion-code")
