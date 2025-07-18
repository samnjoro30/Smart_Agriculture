from fastapi import APIRouter, HTTPException, Depends, Response
from model.auth import  RegisterRequest
from db.postgre_db import get_db
from services.auth import create_user, get_user_by_username
from utils.jwt import create_access_token
from utils.hashing import hash_password
from datetime import timedelta
from sqlalchemy.ext.asyncio import AsyncSession
from starlette.status import HTTP_201_CREATED
from sqlalchemy.orm import Session

router =  APIRouter()

@router.post("/login", response_model=TokenResponse)
async def login_user(login_req: LoginRequest, response: Response):
    user = get_user_by_username(login_req.username)
    
    if not user or user.password != login_req.password:
        raise HTTPException(status_code=401, detail="Invalid credentials")

    token = create_access_token({"sub": user.username})
    response.set_cookie(
        key="token",
        value=token,
        httponly=True,
        secure=True,
        samesite="Lax",
        max_age=3600
    )
    
    return {"token": token}

@router.post("/api/register", status_code= HTTP_201_CREATED)
def register_farm(payload: RegisterRequest, db: Session = Depends(get_db) ):
    if payload.password != payload.confirmPassword:
        raise HTTPException(status_code=400, detail="Passwords do not match")
    # existing_user = get_user_by_username(payload.username)
    # if existing_user:
    #     raise HTTPException(status_code=409, detail="Username already exists")
    
    hashed_pw = hash_password(payload.password)

    user_dict = {
        "username": payload.username,
        "email": payload.email,
        "farm_name": payload.farmName,
        "phone_number": payload.phoneNumber,
        "password": hashed_pw,
    }

    create_user(user_dict, db)
    return {"message": "User registered successfully"}  