from fastapi import APIRouter, HTTPException, Depends, Response, Resquest
from model.auth import  RegisterRequest, Token
from db.postgre_db import get_db
from services.auth import create_user, get_user_by_username
from utils.jwt import create_access_token, refresh_token
from utils.hashing import hash_password, verify_password
from datetime import timedelta
from sqlalchemy.ext.asyncio import AsyncSession
from starlette.status import HTTP_201_CREATED
from sqlalchemy.orm import Session
from datetime  import datetime, timedelta

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
    access_token = create_access_token(data={"sub": username})
    refresh_token = refresh_token(data={"sub": username})
    expires_at = datetime.utcnow() + timedelta(hours=24)

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

    user_dict = {
        "username": payload.username,
        "email": payload.email,
        "farmname": payload.farmname,
        "phonenumber": payload.phonenumber,
        "password": hashed_pw,
    }

    await create_user(user_dict, db)
    return {"message": "User registered successfully"}  

@router.post("/auth/verify")
async def Verify_farmer(request: Request, db: AsyncSession = Depends(get_db)):
    try:
        body = await request.json
        username =  body.get("username")
        otp = body.get("otp")

        if not username or otp:
            raise HTTPException(status_code=401, details="otp required")
        

@router.post("/auth/logout")
async def logout(request: Resquest, db: AsyncSession = Depends=(get_db)):
    body = await request.json()
    token = body.get("refresh_token")
    if not token:
        raise HTTPException(status_code= 401, details = "Missing token")
    
    await revoke_refresh_token(db, token)

    return {
        "message": "Logged out Successfully"
    }


