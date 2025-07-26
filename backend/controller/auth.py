from fastapi import APIRouter, HTTPException, Depends, Response, Request
from model.auth import  RegisterRequest, Token
from db.postgre_db import get_db
from services.auth import create_user, get_user_by_username, store_refresh_token,  revoke_refresh_token, is_token_revoked, otp_verification, verified_upate, reset_password_check_user, reset_password_update  
from utils.jwt import create_access_token, refresh_token
from utils.hashing import hash_password, verify_password
from datetime import timedelta
from sqlalchemy.ext.asyncio import AsyncSession
from starlette.status import HTTP_201_CREATED
from sqlalchemy.orm import Session
from datetime  import datetime, timedelta
from utils.otp import generate_otp, otp_expiry
# from slowapi import Limiter
# from slowapi.decorator import limiter

router =  APIRouter()

@router.post("/auth/refresh")
async def refresh_token(request: Request):
    try:
        body = await request.json()
        refresh_token = body.get("refresh_token")

        payload = jwt.decode(refresh_token, SECRET_KEY, algorithm=ALGORITHM)
        username = payload.get("sub")
        if username is None:
            raise HTTPException(status_code=401, detail="Invalid token")
        new_access_token = create_access_token({ "sub": username})
        return {
            "access_token": new_access_token,
            "token_type": "bearer"
        }
    except JWTError:
        raise HTTPException(status_code=500, details="Expired refresh token")

@router.post("/auth/login", response_model=Token)
async def login_farmer(payload: RegisterRequest, db: AsyncSession = Depends(get_db)):
    existing_user = await get_user_by_username(payload.username, db)
    if not existing_user or not verify_password(payload.password, existing_user["password"]):
        raise HTTPException(status_code= 400, details = "Invalid credentials, Username not found")
    hashed_password = None

    username = existing_user["username"]
    access_token = create_access_token(data={"sub": username})
    refresh_token = refresh_token(data={"sub": username})
    expires_at = datetime.utcnow() + timedelta(hours=24)

    

    await store_refresh_token(username, refresh_token, expires_at, db)

    return {
        "access_token": access_token,
        "refresh_token": refresh_token,
        "token_type": "bearer",
    }

@router.post("/auth/register", status_code= HTTP_201_CREATED)
async def register_farm(payload: RegisterRequest, db: AsyncSession = Depends(get_db) ):
    if payload.password != payload.confirmPassword:
        raise HTTPException(status_code=400, detail="Passwords do not match")
    existing_user = await get_user_by_username(payload.username, db)
    if existing_user:
        raise HTTPException(status_code=409, detail="Username already exists")
    
    hashed_pw = hash_password(payload.password)
    otp = generate_otp()
    expires_at = otp_expiry

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

    await create_user(user_dict, db)
    return {
        "message": "User registered {username} successfully"
    }  

@router.post("/auth/verify")
async def Verify_farmer(request: Request, db: AsyncSession = Depends(get_db)):
    try:
        body = await request.json
        email =  body.get("email")
        otp = body.get("otp")

        if not email or not otp:
            raise HTTPException(status_code=401, details="otp required")

        if user.otp != otp:
            raise HTTPException(status_code=401, details="")
        if user.otp_expires_at and datetime.utcnow > otp_expires_at:
            raise HTTPException(status_code=401, details="Otp has expired, try resend new otp")

        await verified_upate(db, email)

        return {
            "message": " user verified successfully"
        }
    except  Exception as e:
        raise HTTPException(status_code=500, details= f"Serve error verifying{str(e)}")

@router.post("/auth/reset-password")
async def reset_password(request: Request, db: AsyncSession = Depends(get_db)):
    body = await request.json()
    email = body.get("email")
    newPassword = body.get("newPassword")
    confirmPassword = body.get("confirmPassword")

    if not email:
        raise HTTPException(status_code=400, details="Email doesn't exist")
    if newPassword != confirmPassword:
        raise HTTPException(status_code=400, details="New password and confirm password do not correspond")

    user = await reset_password_check_user(db, email)
    if not user:
        raise HTTPException(status_code=400, details="user credentials not found")

    hash_new_password = hash_password(newPassword)
    await reset_password_update(db, email, hash_new_password)

    return {
        "message": "Password reset succesfull"
    }

    
@router.post("/auth/logout")
async def logout(request: Request, db: AsyncSession = Depends(get_db)):
    body = await request.json()
    token = body.get("refresh_token")
    if not token:
        raise HTTPException(status_code= 401, details = "Missing token")
    
    await revoke_refresh_token(db, token)
    await db.commit()

    return {
        "message": "Logged out Successfully"
    }

