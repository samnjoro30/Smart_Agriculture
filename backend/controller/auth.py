from fastapi import APIRouter, HTTPException, Depends, Response, Request
from model.auth import  RegisterRequest, Token, RegisterSubscribers, LoginRequest, codeResend
from db.postgre_db import get_db
from services.auth import create_user, get_user_by_email, store_refresh_token,  revoke_refresh_token, is_token_revoked, otp_verification, verified_upate, reset_password_check_user, reset_password_update, resendVerificationCode 
from utils.jwt import create_access_token, refresh_token
from utils.hashing import hash_password, verify_password
from datetime import timedelta
from sqlalchemy.ext.asyncio import AsyncSession
from starlette.status import HTTP_201_CREATED
from sqlalchemy.orm import Session
from datetime  import datetime, timedelta
from utils.otp import generate_otp, otp_expiry
from utils.sendOtpEmail import sendOTP
from jose import jwt, JWTError
from dotenv import load_dotenv
import os
# from slowapi import Limiter
# from slowapi.decorator import limiter
load_dotenv()

router =  APIRouter()


@router.post("/auth/refresh")
async def page_refresh_token(request: Request):
    SECRET_KEY = os.getenv("JWT")
    ALGORITHM = os.getenv("ALGORITHM")
    try:
        refresh_token_str = request.cookies.get("refresh_token")

        if not refresh_token_str:
            raise HTTPException(status_code=400, detail="Refresh token missing")

        payload = jwt.decode(refresh_token_str, SECRET_KEY, algorithms=[ALGORITHM])
        username = payload.get("sub")
        if username is None:
            raise HTTPException(status_code=401, detail="Invalid token")
        new_access_token = create_access_token({ "sub": username})
        return {
            "access_token": new_access_token,
            "token_type": "bearer"
        }
    except JWTError:
        raise HTTPException(status_code=500, detail="Expired refresh token")

@router.post("/auth/login", response_model=Token)
async def login_farmer(payload: LoginRequest, response:Response, db: AsyncSession = Depends(get_db)):
    existing_user = await get_user_by_email(payload.email, db)
    if not existing_user or not verify_password(payload.password, existing_user["password"]):
        raise HTTPException(status_code= 400, detail = "Invalid credentials, Username not found")
    if not existing_user.get("is_verified"):
        raise HTTPException(status_code=403, detail="Account not verified")

    email = existing_user["email"]
    access_token = create_access_token(data={"sub": email})
    new_refresh_token = refresh_token({"sub": email})
    expires_at = datetime.utcnow() + timedelta(hours=24)

    await store_refresh_token(email, new_refresh_token, expires_at, db)

    response.set_cookie(
        key="access_token",
        value=access_token,
        httponly=True,
        secure=True, 
        samesite="Lax"
    )
    response.set_cookie(
        key="refresh_token",
        value=new_refresh_token,
        httponly=True,
        secure=True,   
        samesite="Lax"
    )

    return {
        "access_token": access_token,
        "refresh_token": new_refresh_token,
        "token_type": "bearer",
        "message": "successful login"
    }

@router.post("/auth/register", status_code= HTTP_201_CREATED)
async def register_farm(payload: RegisterRequest, db: AsyncSession = Depends(get_db) ):
    # if payload.password != payload.confirmPassword:
    #     raise HTTPException(status_code=400, detail="Passwords do not match")
    existing_user = await get_user_by_username(payload.username, db)
    if existing_user:
        raise HTTPException(status_code=409, detail="Username already exists")
    
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

    await create_user(user_dict, db)
    
    await sendOTP(payload.email)
   
    return {
        "message": f"User registered {payload.username} successfully"
    }  

@router.post("/auth/verification")
async def Verify_farmer(request: Request, db: AsyncSession = Depends(get_db)):
    try:
        body = await request.json()
        email =  body.get("email")
        otp = body.get("otp")

        if not email or not otp:
            raise HTTPException(status_code=401, detail="otp required")
        
        user = await otp_verification(db, email)
        if not user:
            raise HTTPException(status_code=404, detail="User not found")
        
        if user.is_verified:
            raise HTTPException(status_code=400, detail="User already verified")

        if user.otp != otp:
            raise HTTPException(status_code=401, detail="Invalid otp")
        if user.otp_expires_at and datetime.utcnow() > otp_expires_at:
            raise HTTPException(status_code=401, detail="Otp has expired, try resend new otp")

        await verified_upate(db, email)

        return {
            "message": "user verified successfully"
        }
    except  Exception as e:
        raise HTTPException(status_code=500, detail= f"Serve error verifying{str(e)}")

@router.post("/auth/reset-password")
async def reset_password(request: Request, db: AsyncSession = Depends(get_db)):
    body = await request.json()
    email = body.get("email")
    newPassword = body.get("newPassword")
    confirmPassword = body.get("confirmPassword")

    if not email:
        raise HTTPException(status_code=400, detail="Email doesn't exist")
    if newPassword != confirmPassword:
        raise HTTPException(status_code=400, detail="New password and confirm password do not correspond")

    user = await reset_password_check_user(db, email)
    if not user:
        raise HTTPException(status_code=400, detail="user credentials not found")

    hash_new_password = hash_password(newPassword)
    await reset_password_update(db, email, hash_new_password)

    return {
        "message": "Password reset succesfull"
    }
    
@router.post("/auth/logout")
async def logout(request: Request, response: Response, db: AsyncSession = Depends(get_db)):
    token = request.cookies.get("refresh_token")
    if not token:
        raise HTTPException(status_code= 401, detail = "Missing token")
    
    await revoke_refresh_token(db, token)
    await db.commit()

    response.delete_cookie("access_token")
    response.delete_cookie("refresh_token")

    return {
        "message": "Logged out Successfully"
    }

@router.post("/newsletter/subscribe")
async def RegisterForNewsLetter(request: RegisterSubscribers, db: AsyncSession = Depends(get_db)):

    user_news ={
        "email": request.email,
    }

    await create_user_newsLetter(user_news, db)

    return {
        "message" : "Subscribed Successfully"
    }

@router.post('/auth/resend-verificion-code')
async def resendVerificationCode(request: codeResend, db: AsyncSession =Depends(get_db)):

    body = await request.json()
    email = body.get('email')

    if not email:
        raise HTTPException(status_code=403, detail="Must have email")
    
    user = await get_user_by_email(email, db)
    if not user or is_verified is true:
        raise HTTPException(status_code=404, detail="Email not found")

    if user.is_verified:
        raise HTTPException(status_code=403, detail="user already verified")


    new_otp = generate_otp()

    await resendVerificationCode(new_otp)

    return {
        "message": "Code resend successfull"
    }
    
