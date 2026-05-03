from fastapi import (
    APIRouter,
    Depends,
    HTTPException,
    Request,
    Response,
    BackgroundTasks,
)
from sqlalchemy.ext.asyncio import AsyncSession
from fastapi.responses import JSONResponse
from config.database import get_db
from config.audit.logger import get_logger
from datetime import datetime, timedelta
from config.setting import get_settings
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
from .service import (
    register_farm,
    login_farmer,
    login_user,
    logout_user,
    Verify_farmer,
    refresh_access_token,
    resend_verification_code,
    store_refresh_token_background,
    RegisterForNewsLetter,
)

router = APIRouter(prefix="/auth", tags=["Auth"])

logger = get_logger("AUTH")

settings = get_settings()


@router.post("/register")
async def register(payload: RegisterRequest, db: AsyncSession = Depends(get_db)):
    user = await register_farm(db, payload)
    logger.info("farm registered succesfully", user_id=user.id)
    return {"message": "Registered successfully"}


@router.post("/admin/login", response_model=Token)
async def admin_login(payload: LoginRequest, db: AsyncSession = Depends(get_db)):
    return await login_user(db, payload, required_role="admin")


@router.post("/login", response_model=Token)
async def login(
    payload: LoginRequest,
    response: Response,
    background_tasks: BackgroundTasks,
    db: AsyncSession = Depends(get_db),
):
    result = await login_farmer(db, payload)

    background_tasks.add_task(
        store_refresh_token_background,
        db,
        result["user_id"],
        result["refresh_token"],
        datetime.utcnow() + timedelta(days=7),
    )

    # response = JSONResponse(content=result)

    response.set_cookie(
        key="access_token",
        value=result["access_token"],
        httponly=settings.COOKIE_HTTPONLY,
        secure=settings.cookie_secure,
        samesite=settings.cookie_samesite,
        path="/",
    )

    response.set_cookie(
        key="refresh_token",
        value=result["refresh_token"],
        httponly=settings.COOKIE_HTTPONLY,
        secure=settings.cookie_secure,
        samesite=settings.cookie_samesite,
        path="/",
    )

    # logger.info("login successful", user_id=result.id)

    return result


@router.post("/refresh")
async def refresh(
    request: Request,
    response: Response,
    db: AsyncSession = Depends(get_db),
):
    old_token = request.cookies.get("refresh_token")

    result = await refresh_access_token(db, old_token)

    # response = JSONResponse(content={"access_token": result["access_token"]})

    response.set_cookie(
        key="access_token",
        value=result["access_token"],
        httponly=settings.COOKIE_HTTPONLY,
        secure=settings.cookie_secure,
        samesite=settings.cookie_samesite,
        path="/",
    )

    response.set_cookie(
        key="refresh_token",
        value=result["refresh_token"],
        httponly=settings.COOKIE_HTTPONLY,
        secure=settings.cookie_secure,
        samesite=settings.cookie_samesite,
        path="/",
    )

    return {"access_token": result["access_token"]}


@router.post("/verification")
async def verify_otp(payload: VerifyCode, db: AsyncSession = Depends(get_db)):
    await Verify_farmer(db, payload.email, payload.otp)
    logger.info("OTP verified successfully", email=payload.email)
    return {"message": "OTP verified successfully"}


@router.post("/resend-code")
async def resend_code(payload: codeResend, db: AsyncSession = Depends(get_db)):
    otp = await resend_verification_code(db, payload.email)

    # TODO: send email here
    # send_email(payload.email, otp)

    return {"message": "Verification code resent successfully"}


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


@router.post("/newsletter/subscribe")
async def news_letter(payload: RegisterSubscribers, db: AsyncSession = Depends(get_db)):
    result = await RegisterForNewsLetter(db, payload)

    return result


# @router.post("/auth/resend-verificion-code")
